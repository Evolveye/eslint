import { RuleModule } from "@typescript-eslint/utils/ts-eslint"
import { InvalidTestCase, RuleTester, ValidTestCase } from "@typescript-eslint/rule-tester"
import rules, { RuleName } from "../src/index.js"
import {parser} from 'typescript-eslint'
import { describe, it, beforeAll, afterAll, beforeEach, afterEach } from "vitest";

// Rejestrowanie metod testowych dla RuleTester
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.afterAll = afterAll;
// RuleTester.beforeAll = beforeAll;
// RuleTester.beforeEach = beforeEach;
// RuleTester.afterEach = afterEach;

const tester = new RuleTester({
  languageOptions:{
    parser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: `module`,
      ecmaFeatures: {
        jsx: true,
      },
    },
  }
})
const testsNames:RuleName[] = [
  `space-in-arrow-functions-parens`,
  `space-in-functions-parens`,
  `space-in-constructors`,
  `space-in-calls`,
  `space-in-loops-and-ifs`,
  `space-around-jsx-children`,
  `double-spaces-in-for`,
]
const testsDataset = await Promise.all( testsNames.map( async name => ({
  name,
  rule: rules.rules[ name ] as RuleModule<string, unknown[]>,
  test: await import( `./${name}.js` ) as {
    validCases: ValidTestCase<string[]>[],
    invalidCases: InvalidTestCase<string,string[]>[]
  },
}) ) )

testsDataset.forEach( ({ name, rule, test }) => {
  // console.log( ` ` )

  // try {
    console.log( name, rule, { valid:test.validCases, invalid:test.invalidCases } )
    tester.run( name, rule, { valid:test.validCases, invalid:test.invalidCases } )
  //   console.log( `  - Passed!` )
  // } catch (err) {
  //   console.log( err )
  // }

  // console.log( ` ` )
} )
