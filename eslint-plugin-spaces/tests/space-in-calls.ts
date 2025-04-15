import { InvalidTestCase, ValidTestCase } from "@typescript-eslint/rule-tester"
import { MessageIds, Options } from "../src/rules/space-in-calls"


export const validCases:ValidTestCase<Options>[] = [
    // { code:`fn()` },
    // { code:`fn({ c:3 })` },
    // { code:`fn( 1, 2, { c:3 } )` },
    // { code:`fn(  1, 2, something[ 2 ] )` },
    // { code:`obj.method( 404 )` },
    // { code:`obj.methodA( 1 ).methodB( 2 )` },
    { code:`obj.methodA( 1 ).methodB({ b })` },
    // { code:`obj.methodA({ a }).methodB({ b })` },
]

export const invalidCases:InvalidTestCase<MessageIds, Options>[] = [
    {
      errors: [ { messageId:`undesirableSpaceInParens` } ],
      code: `fn( )`,
      output: `fn()`,
    },
    {
      errors: [ { messageId:`undesirableSpaceInParens` } ],
      code: `fn(   )`,
      output: `fn()`,
    },
    {
      errors: [ { messageId:`undesirableSpaceInParens` } ],
      code: `obj.method(   )`,
      output: `obj.method()`,
    },


    // options: [ `always` ]
    {
      errors: [ { messageId:`missingSpaceStart` }, { messageId:`missingSpaceEnd` } ],
      code: `fn(c)`,
      output: `fn( c )`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `fn(c )`,
      output: `fn( c )`,
    },
    {
      errors: [ { messageId:`missingSpaceEnd` } ],
      code: `fn( c)`,
      output: `fn( c )`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `fn({ c }, a )`,
      output: `fn( { c }, a )`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `fn(a, { c } )`,
      output: `fn( a, { c } )`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `obj.method(a, { c } )`,
      output: `obj.method( a, { c } )`,
    },


    // options: [ `never` ]
    {
      errors: [ { messageId:`undesirableSpaceStart` }, { messageId:`undesirableSpaceEnd` } ],
      code: `fn( { c } )`,
      output: `fn({ c })`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `fn( { c })`,
      output: `fn({ c })`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceEnd` } ],
      code: `fn({ c } )`,
      output: `fn({ c })`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `fn( { c }, a)`,
      output: `fn({ c }, a)`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `fn( a, { c })`,
      output: `fn(a, { c })`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `obj.method( a, { c })`,
      output: `obj.method(a, { c })`,
      options: [ `never` ],
    },
]
