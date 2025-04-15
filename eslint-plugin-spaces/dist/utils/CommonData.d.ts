import { RuleContext, SourceCode } from "@typescript-eslint/utils/ts-eslint";
export type PreRequiredData = {
    context: RuleContext<string, unknown[]>;
    code: SourceCode;
    insertSpaces: boolean;
};
export declare const messages: {
    messagesForParens: {
        missingSpaceStart: string;
        missingSpaceEnd: string;
        undesirableSpaceStart: string;
        undesirableSpaceEnd: string;
        undesirableSpaceInParens: string;
    };
    messagesForSemi: {
        missingSpaceAfterFirstSemi: string;
        missingSpaceAfterSecondSemi: string;
    };
    messagesForJsx: {
        missingSpaceStart: string;
        missingSpaceEnd: string;
        undesirableSpaceStart: string;
        undesirableSpaceEnd: string;
    };
};
