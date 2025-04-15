import { ESLintUtils } from "@typescript-eslint/utils";
import { messages } from "../utils/CommonData.js";
export type Options = [`always` | `never`];
export type MessageIds = keyof typeof messages.messagesForSemi;
declare const _default: ESLintUtils.RuleModule<"missingSpaceAfterFirstSemi" | "missingSpaceAfterSecondSemi", Options, unknown, ESLintUtils.RuleListener>;
export default _default;
