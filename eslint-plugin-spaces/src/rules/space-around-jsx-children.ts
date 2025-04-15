import { ESLintUtils } from "@typescript-eslint/utils";
import { messages } from "../utils/CommonData.js";

export type Options = [`always` | `never`]
export type MessageIds = keyof typeof messages.messagesForJsx;

const createRule = ESLintUtils.RuleCreator( () => `https://github.com/Evolveye/eslint` )

export default createRule<Options,MessageIds>({
  name: 'space-around-jsx-children',
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce or disallow spacing around inline JSX children',
    },
    fixable: 'whitespace',
    schema: [ { type:`string`, enum:[ `always`, `never` ] } ],
    messages: messages.messagesForJsx,
  },

  defaultOptions: ['always'],

  create( context, [spacingOption] ) {
    const insertSpaces = spacingOption === 'always';

    return {
      JSXElement( node ) {
        const { openingElement, closingElement, children } = node;

        const isInline =
          !openingElement.selfClosing &&
          openingElement.loc.end.line === closingElement?.loc.start.line;

        if (!isInline || children.length === 0) return;

        const firstChild = children[0];
        const lastChild = children[children.length - 1];

        const sourceCode = context.getSourceCode();
        const rawFirst = sourceCode.getText( firstChild );
        const rawLast = sourceCode.getText( lastChild );

        const leftTrimLength = rawFirst.length - rawFirst.trimStart().length;
        const rightTrimLength = rawLast.length - rawLast.trimEnd().length;

        if (insertSpaces) {
          if (leftTrimLength === 0) {
            context.report({
              node: firstChild,
              messageId: 'missingSpaceStart',
              fix: fixer => fixer.insertTextBefore( firstChild, ' ' ),
            });
          }

          if (rightTrimLength === 0) {
            context.report({
              node: lastChild,
              messageId: 'missingSpaceEnd',
              fix: fixer => fixer.insertTextAfter( lastChild, ' ' ),
            });
          }
        } else {
          if (leftTrimLength > 0) {
            context.report({
              node: firstChild,
              messageId: 'undesirableSpaceStart',
              fix: fixer => fixer.removeRange([
                firstChild.range[0],
                firstChild.range[0] + leftTrimLength,
              ]),
            });
          }

          if (rightTrimLength > 0) {
            context.report({
              node: lastChild,
              messageId: 'undesirableSpaceEnd',
              fix: fixer => fixer.removeRange([
                lastChild.range[1] - rightTrimLength,
                lastChild.range[1],
              ]),
            });
          }
        }
      },
    };
  },
});