const rules = require( `./rules.js` )
const { RuleTester } = require( `eslint` )
// import rules from "../rules.cjs"
// import { RuleTester } from "eslint"

const errors = [ { messageId:`unexpected` } ]
const tester = new RuleTester( { parserOptions:{ ecmaVersion:2015 } } )

tester.run( `space-in-arrow-functions-parens`, rules[ `space-in-arrow-functions-parens` ], {
  valid: [
    { errors, code:`const arrow_obj = a => true` },
    // { errors, code:`const arrow_obj = () => true` },
    // { errors, code:`const arrow_obj = ( { abc } ) => true` },
    // { errors, code:`const arrow_obj = (  { abc }, a   ) => true` },
  ],
  invalid: [
    { errors, code:`const arrow_obj = ({ abc }) => true` },
    // { errors, code:`const arrow_obj = ( { abc }) => true` },
    // { errors, code:`const arrow_obj = ({ abc } ) => true` },
    { errors, code:`const arrow_obj = ({ abc }, a ) => true` },
  ],
} )
