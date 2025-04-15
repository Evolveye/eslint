import { ESLintUtils } from "@typescript-eslint/utils";
import findTokenIndex from "../utils/findTokenIndex.js";
import checkSpaces from "../utils/checkSpaces.js";
import { messages } from "../utils/CommonData.js";
const createRule = ESLintUtils.RuleCreator(() => `https://github.com/Evolveye/eslint`);
export default createRule({
    name: `space-in-arrow-functions-parens`,
    meta: {
        type: `layout`,
        docs: {
            description: `Enforce or disallow spacing inside arrow function parentheses`,
        },
        schema: [{ type: `string`, enum: [`always`, `never`] }],
        messages: messages.messagesForParens,
        fixable: `whitespace`,
    },
    defaultOptions: [`always`],
    create(context, [option]) {
        const insertSpaces = option === `never` ? false : true;
        return {
            ArrowFunctionExpression(node) {
                const tokens = context.sourceCode.getTokens(node);
                const firstParenIndex = findTokenIndex(`(`, tokens, 0, 2);
                if (firstParenIndex === undefined)
                    return;
                checkSpaces({ context, code: context.sourceCode, insertSpaces }, tokens, node.params, firstParenIndex);
            },
        };
    },
});
