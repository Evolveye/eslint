import { PreRequiredData } from "./CommonData.js";
import { TSESTree } from "@typescript-eslint/utils";
export default function checkSpaces(preRequiredData: PreRequiredData, tokens: TSESTree.Token[], parensData: TSESTree.Node | TSESTree.Token | (TSESTree.Node | TSESTree.Token)[], firstTokenIndex: number): void;
