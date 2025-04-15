import spaceInArrowFunctionsParens from "./rules/space-in-arrow-functions-parens.js";
import spaceInFunctionsParens from "./rules/space-in-functions-parens.js";
import spaceInCalls from "./rules/space-in-calls.js";
import spaceInConstructors from "./rules/space-in-constructors.js";
import spaceInLoopsAndIfs from "./rules/space-in-loops-and-ifs.js";
import doubleSpacesInFor from "./rules/double-spaces-in-for.js";
import spaceAroundJsxChildren from "./rules/space-around-jsx-children.js";

export type RuleName = keyof typeof rules

export const rules = {
  "space-in-arrow-functions-parens": spaceInArrowFunctionsParens,
  "space-in-functions-parens": spaceInFunctionsParens,
  "space-in-calls": spaceInCalls,
  "space-in-constructors": spaceInConstructors,
  "space-in-loops-and-ifs": spaceInLoopsAndIfs,
  "double-spaces-in-for": doubleSpacesInFor,
  "space-around-jsx-children": spaceAroundJsxChildren,
};

export default {
  rules,
};
