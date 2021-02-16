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

tester.run( `space-in-functions-parens`, rules[ `space-in-functions-parens` ], {
  valid: [
    { code:`function fnObj() {}` },
    { code:`function fnObj( c ) {}` },
    { code:`function fnObj( { c } ) {}` },
    { code:`function * fnObj(   { c } ) {}` },
  ],
  invalid: [
    {
      errors: [ { messageId:`undesirableSpaceInParens` } ],
      code: `function fnObj( ) {}`,
      output: `function fnObj() {}`,
    },
    {
      errors: [ { messageId:`undesirableSpaceInParens` } ],
      code: `function fnObj(   ) {}`,
      output: `function fnObj() {}`,
    },


    // options: [ `always` ]
    {
      errors: [ { messageId:`missingSpaceStart` }, { messageId:`missingSpaceEnd` } ],
      code: `function fnObj({ c }) {}`,
      output: `function fnObj( { c } ) {}`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `function fnObj({ c } ) {}`,
      output: `function fnObj( { c } ) {}`,
    },
    {
      errors: [ { messageId:`missingSpaceEnd` } ],
      code: `function fnObj( { c }) {}`,
      output: `function fnObj( { c } ) {}`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `function fnObj({ c }, a ) {}`,
      output: `function fnObj( { c }, a ) {}`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `function fnObj(a, { c } ) {}`,
      output: `function fnObj( a, { c } ) {}`,
    },


    // options: [ `never` ]
    {
      errors: [ { messageId:`undesirableSpaceStart` }, { messageId:`undesirableSpaceEnd` } ],
      code: `function fnObj( { c } ) {}`,
      output: `function fnObj({ c }) {}`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `function fnObj( { c }) {}`,
      output: `function fnObj({ c }) {}`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceEnd` } ],
      code: `function fnObj({ c } ) {}`,
      output: `function fnObj({ c }) {}`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `function fnObj( { c }, a) {}`,
      output: `function fnObj({ c }, a) {}`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `function fnObj( a, { c }) {}`,
      output: `function fnObj(a, { c }) {}`,
      options: [ `never` ],
    },
  ],
} )
