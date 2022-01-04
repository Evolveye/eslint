module.exports = {
  valid: [
    { code:`new Class()` },
    { code:`new Class( 1 )` },
  ],
  invalid: [
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
  ],
}
