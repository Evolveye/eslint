import { ESLintUtils } from "@typescript-eslint/utils";
import findTokenIndex from "../utils/findTokenIndex.js";
import checkSpaces from "../utils/checkSpaces.js";
import { messages } from "../utils/CommonData.js";

export type Options = [`always` | `never`]
export type MessageIds = keyof typeof messages.messagesForParens;

const createRule = ESLintUtils.RuleCreator( () => `https://github.com/Evolveye/eslint` )

export default createRule<Options,MessageIds>({
  name: `space-in-loops-and-ifs`,
  meta: {
    type: `layout`,
    docs: {
      description: `Require or disallow spacing inside parentheses of if statements and loops`,
    },
    fixable: `whitespace`,
    schema: [ { type:`string`, enum:[ `always`, `never` ] } ],
    messages: messages.messagesForParens,
  },

  defaultOptions: [`never`],

  create( context, [option] ) {
    const insertSpaces = option === `always`;
    const sourceCode = context.sourceCode;

    return {
      IfStatement( node ) {
        const tokens = sourceCode.getTokens( node );
        checkSpaces(
          { context, code: sourceCode, insertSpaces },
          tokens,
          node.test,
          1,
        );
      },

      ForOfStatement( node ) {
        const tokens = sourceCode.getTokens( node );
        const firstParenIndex = findTokenIndex( `(`, tokens, 1 );
        if (firstParenIndex === undefined) return

        console.log({
          code:sourceCode.getText( node ),
          tokens:tokens,
          right:node.right,
          firstParenIndex,
       })
        checkSpaces(
          { context, code: sourceCode, insertSpaces },
          tokens,
          node.right,
          firstParenIndex,
        );
      },

      ForInStatement( node ) {
        const tokens = sourceCode.getTokens( node );
        checkSpaces(
          { context, code: sourceCode, insertSpaces },
          tokens,
          node.right,
          1,
        );
      },

      ForStatement( node ) {
        if (node.update === null) return

        const tokens = sourceCode.getTokens( node );
        const firstParenIndex = findTokenIndex( `(`, tokens, 1 );
        if (firstParenIndex === undefined) return

        checkSpaces(
          { context, code: sourceCode, insertSpaces },
          tokens,
          node.update,
          firstParenIndex,
        );
      },

      WhileStatement( node ) {
        checkSpaces(
          { context, code: sourceCode, insertSpaces },
          sourceCode.getTokens( node ),
          node.test,
          1,
        );
      },
    };
  },
});