import { ESLintUtils } from "@typescript-eslint/utils";
import findTokenIndex from "../utils/findTokenIndex.js";
import checkSpaces from "../utils/checkSpaces.js";
import { messages } from "../utils/CommonData.js";
const createRule = ESLintUtils.RuleCreator(() => `https://github.com/Evolveye/eslint`);
export default createRule({
    name: `space-in-calls`,
    meta: {
        type: `layout`,
        docs: {
            description: `Require or disallow spacing inside parentheses of function calls`,
        },
        fixable: `whitespace`,
        schema: [{ type: `string`, enum: [`always`, `never`] }],
        messages: messages.messagesForParens,
    },
    defaultOptions: [`always`],
    create(context, [option]) {
        const insertSpaces = option === `always`;
        const sourceCode = context.sourceCode;
        return {
            CallExpression(node) {
                const tokens = sourceCode.getTokens(node);
                const firstParenIndex = node.callee.type === `MemberExpression`
                    ? findTokenIndex(`(`, tokens, tokens.indexOf(sourceCode.getTokenAfter(node.callee)))
                    : findTokenIndex(`(`, tokens, 1);
                if (firstParenIndex === undefined)
                    return;
                checkSpaces({ context, code: sourceCode, insertSpaces }, tokens, node.arguments, firstParenIndex);
            },
        };
    },
});
