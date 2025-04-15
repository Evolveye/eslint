import { ESLintUtils } from "@typescript-eslint/utils";
import findTokenIndex from "../utils/findTokenIndex.js";
import { messages } from "../utils/CommonData.js";

export type Options = [`always` | `never`]
export type MessageIds = keyof typeof messages.messagesForSemi;

const createRule = ESLintUtils.RuleCreator( () => `https://github.com/Evolveye/eslint` )

export default createRule<Options,MessageIds>({
  name: `double-spaces-in-for`,
  meta: {
    type: `layout`,
    docs: {
      description: `Enforces two spaces after each semicolon in for-loops`,
    },
    fixable: `whitespace`,
    schema: [ { type:`string`, enum:[ `always`, `never` ] } ],
    messages: messages.messagesForSemi,
  },

  defaultOptions: ['always'],

  create( context ) {
    return {
      ForStatement( node ) {
        const loopCode = context.sourceCode.getText( node )
        const tokens = context.sourceCode.getTokens( node );
        const semi1Index = findTokenIndex( ';', tokens, 2, Infinity );

        if (semi1Index === undefined) return;

        const semi1 = tokens[semi1Index];
        const tokenAfterSemi1 = context.sourceCode.getTokenAfter( semi1 );
        if (!tokenAfterSemi1 || tokenAfterSemi1.value === ';') return;

        const semi2 = context.sourceCode.getTokenAfter( semi1, {
          filter: tok => tok.value === ';',
        } );
        if (!semi2) return;

        const spacesAfterSemi1 = tokenAfterSemi1.range[0] - semi1.range[1];
        const tokenAfterSemi2 = context.sourceCode.getTokenAfter( semi2 );
        if (!tokenAfterSemi2) return

        if (spacesAfterSemi1 < 2 && (semi1Index > 2 || tokenAfterSemi2.value !== `)`)) {
          context.report({
            node,
            loc: {
              start: semi1.loc.end,
              end: tokenAfterSemi1.loc.start,
            },
            messageId: 'missingSpaceAfterFirstSemi',
            fix: fixer => fixer.insertTextAfterRange(
              semi1.range,
              ' '.repeat( 2 - spacesAfterSemi1 )
            ),
          });
        }

        const spacesAfterSemi2 = tokenAfterSemi2.range[0] - semi2.range[1];

        if (spacesAfterSemi2 < 2 && tokenAfterSemi2.value !== `)`) {
          context.report({
            node,
            loc: {
              start: semi2.loc.end,
              end: tokenAfterSemi2.loc.start,
            },
            messageId: 'missingSpaceAfterSecondSemi',
            fix: fixer => fixer.insertTextAfterRange(
              semi2.range,
              ' '.repeat( 2 - spacesAfterSemi2 )
            ),
          });
        }
      },
    };
  },
});