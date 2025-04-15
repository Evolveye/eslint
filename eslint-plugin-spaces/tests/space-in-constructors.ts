import { InvalidTestCase, ValidTestCase } from "@typescript-eslint/rule-tester"
import { MessageIds, Options } from "../src/rules/space-in-constructors"


export const validCases:ValidTestCase<Options>[] = [
    { code:`new Class()` },
    { code:`new Class( 1 )` },
]

export const invalidCases:InvalidTestCase<MessageIds, Options>[] = [
    {
      errors: [ { messageId:`undesirableSpaceInParens` } ],
      code: `new Class(  )`,
      output: `new Class()`,
    },
    {
      errors: [ { messageId:`undesirableSpaceEnd` } ],
      code: `new Class( 1  )`,
      output: `new Class( 1 )`,
    },
    // {
    //   errors: [ { messageId:`undesirableSpaceEnd` } ],
    //   code: `new Class(  1 )`,
    //   output: `new Class( 1 )`,
    // },
]
