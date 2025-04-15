import { ESLintUtils } from "@typescript-eslint/utils";
import findTokenIndex from "../utils/findTokenIndex.js";
import checkSpaces from "../utils/checkSpaces.js";
import { messages } from "../utils/CommonData.js";

export type Options = [`always` | `never`]
export type MessageIds = keyof typeof messages.messagesForParens;

const createRule = ESLintUtils.RuleCreator( () => `https://github.com/Evolveye/eslint` )

export default createRule<Options,MessageIds>({
  name: `space-in-functions-parens`,
  meta: {
    type: `layout`,
    docs: {
      description: `Require or disallow spacing inside function parentheses`,
    },
    fixable: `whitespace`,
    schema: [{ type:`string`, enum: [ `always`, `never`] }],
    messages: messages.messagesForParens,
  },
  defaultOptions: [ `always` ],

  create( context, [ option ] ) {
    const insertSpaces = option === `always`;
    const sourceCode = context.sourceCode;

    return {
      FunctionDeclaration( node ) {
        const tokens = sourceCode.getTokens( node );
        const firstParenIndex = findTokenIndex( "(", tokens, 2 );
        if (firstParenIndex === undefined) return

        checkSpaces(
          { context, code: sourceCode, insertSpaces },
          tokens,
          node.params,
          firstParenIndex,
        );
      },

      FunctionExpression( node ) {
        const tokens = sourceCode.getTokens( node );
        const firstParenIndex = findTokenIndex( "(", tokens, 0 );
        if (firstParenIndex === undefined) return

        checkSpaces(
          { context, code: sourceCode, insertSpaces },
          tokens,
          node.params,
          firstParenIndex,
        );
      },
    };
  },
});
