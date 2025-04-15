import { ESLintUtils } from "@typescript-eslint/utils";
import { messages } from "../utils/CommonData.js";
export type Options = [`always` | `never`];
export type MessageIds = keyof typeof messages.messagesForJsx;
declare const _default: ESLintUtils.RuleModule<"missingSpaceStart" | "missingSpaceEnd" | "undesirableSpaceStart" | "undesirableSpaceEnd", Options, unknown, ESLintUtils.RuleListener>;
export default _default;
