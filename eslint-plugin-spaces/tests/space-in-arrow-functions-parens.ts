import { InvalidTestCase, ValidTestCase } from "@typescript-eslint/rule-tester"
import { MessageIds, Options } from "../src/rules/space-in-arrow-functions-parens"


export const validCases:ValidTestCase<Options>[] = [
    { code:`const arrow_obj = a => true` },
    { code:`const arrow_obj = () => true` },
    { code:`const arrow_obj = ({ abc }) => true` },
    { code:`const arrow_obj = ( { abc }, a ) => true` },
]

export const invalidCases:InvalidTestCase<MessageIds, Options>[] = [
    {
      errors: [ { messageId:`undesirableSpaceInParens` } ],
      code: `const arrow_obj = ( ) => true`,
      output: `const arrow_obj = () => true`,
    },
    {
      errors: [ { messageId:`undesirableSpaceInParens` } ],
      code: `const arrow_obj = (   ) => true`,
      output: `const arrow_obj = () => true`,
    },


    // options: [ `always` ]
    {
      errors: [ { messageId:`missingSpaceStart` }, { messageId:`missingSpaceEnd` } ],
      code: `const arrow_obj = (a) => true`,
      output: `const arrow_obj = ( a ) => true`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `const arrow_obj = (a ) => true`,
      output: `const arrow_obj = ( a ) => true`,
    },
    {
      errors: [ { messageId:`missingSpaceEnd` } ],
      code: `const arrow_obj = ( a) => true`,
      output: `const arrow_obj = ( a ) => true`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `const arrow_obj = ({ abc }, a ) => true`,
      output: `const arrow_obj = ( { abc }, a ) => true`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `const arrow_obj = (a, { abc } ) => true`,
      output: `const arrow_obj = ( a, { abc } ) => true`,
    },


    // options: [ `never` ]
    {
      errors: [ { messageId:`undesirableSpaceStart` }, { messageId:`undesirableSpaceEnd` } ],
      code: `const arrow_obj = ( { abc } ) => true`,
      output: `const arrow_obj = ({ abc }) => true`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `const arrow_obj = ( { abc }) => true`,
      output: `const arrow_obj = ({ abc }) => true`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceEnd` } ],
      code: `const arrow_obj = ({ abc } ) => true`,
      output: `const arrow_obj = ({ abc }) => true`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `const arrow_obj = ( { abc }, a) => true`,
      output: `const arrow_obj = ({ abc }, a) => true`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `const arrow_obj = ( a, { abc }) => true`,
      output: `const arrow_obj = (a, { abc }) => true`,
      options: [ `never` ],
    },
]
