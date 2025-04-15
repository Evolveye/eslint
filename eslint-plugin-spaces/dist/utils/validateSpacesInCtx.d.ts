import { TSESTree } from "@typescript-eslint/utils";
import { PreRequiredData } from "./CommonData.js";
export default function validateSpacesInCtx(preRequiredData: PreRequiredData, a: TSESTree.Node | TSESTree.Token, b: TSESTree.Node | TSESTree.Token, openOrClose: `open` | `close`): void;
