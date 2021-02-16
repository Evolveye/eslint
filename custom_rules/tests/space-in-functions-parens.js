module.exports = {
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
}
