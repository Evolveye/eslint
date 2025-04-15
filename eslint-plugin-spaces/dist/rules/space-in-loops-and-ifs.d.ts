import { ESLintUtils } from "@typescript-eslint/utils";
import { messages } from "../utils/CommonData.js";
export type Options = [`always` | `never`];
export type MessageIds = keyof typeof messages.messagesForParens;
declare const _default: ESLintUtils.RuleModule<"undesirableSpaceInParens" | "missingSpaceStart" | "missingSpaceEnd" | "undesirableSpaceStart" | "undesirableSpaceEnd", Options, unknown, ESLintUtils.RuleListener>;
export default _default;
