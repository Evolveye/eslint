module.exports = {
  valid: [
    { code:`fn()` },
    { code:`fn({ c:3 })` },
    { code:`fn( 1, 2, { c:3 } )` },
    { code:`fn(  1, 2, something[ 2 ] )` },
  ],
  invalid: [
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
  ],
}
