module.exports = {
  valid: [
    { code:`function fnObj() {}` },
    { code:`function fnObj( c ) {}` },
    { code:`function fnObj({ c }) {}` },
    { code:`function * fnObj( c ) {}` },
    { code:`class X { method() {} }` },
    { code:`class X { method( c ) {} }` },
    { code:`class X { method({ c }) {} }` },
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
    {
      errors: [ { messageId:`undesirableSpaceInParens` } ],
      code: `class X { method(  ) {} }`,
      output: `class X { method() {} }`,
    },


    // options: [ `always` ]
    {
      errors: [ { messageId:`missingSpaceStart` }, { messageId:`missingSpaceEnd` } ],
      code: `function fnObj(c) {}`,
      output: `function fnObj( c ) {}`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `function fnObj(c ) {}`,
      output: `function fnObj( c ) {}`,
    },
    {
      errors: [ { messageId:`missingSpaceEnd` } ],
      code: `function fnObj( c) {}`,
      output: `function fnObj( c ) {}`,
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
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `class X { method(a, { c } ) {} }`,
      output: `class X { method( a, { c } ) {} }`,
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
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `class X { method( a, { c }) {} }`,
      output: `class X { method(a, { c }) {} }`,
      options: [ `never` ],
    },
  ],
}
