module.exports = {
  valid: [
    {
      code: `<p> valid body </p>`,
    },
    {
      code: `<p>valid body</p>`,
      options: [ `never` ],
    },
  ],
  invalid: [
    // options: [ `always` ]
    {
      errors: [ { messageId:`missingSpaceStart` }, { messageId:`missingSpaceEnd` } ],
      code: `<p>invalid body</p>`,
      output: `<p> invalid body </p>`,
    },
    {
      errors: [ { messageId:`missingSpaceEnd` } ],
      code: `<p> body</p>`,
      output: `<p> body </p>`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `<p>body </p>`,
      output: `<p> body </p>`,
    },


    // options: [ `never` ]
    {
      errors: [ { messageId:`undesirableSpaceStart` }, { messageId:`undesirableSpaceEnd` } ],
      code: `<p> body </p>`,
      output: `<p>body</p>`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `<p> body</p>`,
      output: `<p>body</p>`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceEnd` } ],
      code: `<p>body </p>`,
      output: `<p>body</p>`,
      options: [ `never` ],
    },
  ],
}
