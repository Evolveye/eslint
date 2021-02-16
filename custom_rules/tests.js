const rules = require( `./rules.js` )
const { RuleTester } = require( `eslint` )
// import rules from "../rules.cjs"
// import { RuleTester } from "eslint"

const tester = new RuleTester( { parserOptions:{ ecmaVersion:2015 } } )

tester.run( `space-in-arrow-functions-parens`, rules[ `space-in-arrow-functions-parens` ], {
  valid: [
    { code:`const arrow_obj = a => true` },
    { code:`const arrow_obj = () => true` },
    { code:`const arrow_obj = ( { abc } ) => true` },
    { code:`const arrow_obj = (  { abc }, a   ) => true` },
  ],
  invalid: [
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
      code: `const arrow_obj = ({ abc }) => true`,
      output: `const arrow_obj = ( { abc } ) => true`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `const arrow_obj = ({ abc } ) => true`,
      output: `const arrow_obj = ( { abc } ) => true`,
    },
    {
      errors: [ { messageId:`missingSpaceEnd` } ],
      code: `const arrow_obj = ( { abc }) => true`,
      output: `const arrow_obj = ( { abc } ) => true`,
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
  ],
} )
