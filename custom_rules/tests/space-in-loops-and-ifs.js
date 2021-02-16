module.exports = {
  valid: [
    { code:`for ( let i = 0;  i < 1;  ++i );` },
    { code:`for ( const x of [] );` },
    { code:`for ( const x in {} );` },
    { code:`while ( 1 );` },
    { code:`if ( 1 );` },
  ],
  invalid: [
    // options: [ `always` ]
    {
      errors: [ { messageId:`missingSpaceStart` }, { messageId:`missingSpaceEnd` } ],
      code: `for (let i = 0;  i < 1;  ++i);`,
      output: `for ( let i = 0;  i < 1;  ++i );`,
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `while (1 );`,
      output: `while ( 1 );`,
    },
    {
      errors: [ { messageId:`missingSpaceEnd` } ],
      code: `if ( 1);`,
      output: `if ( 1 );`,
    },


    // options: [ `never` ]
    {
      errors: [ { messageId:`undesirableSpaceStart` }, { messageId:`undesirableSpaceEnd` } ],
      code: `for ( let i = 0;  i < 1;  ++i );`,
      output: `for (let i = 0;  i < 1;  ++i);`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceStart` } ],
      code: `while ( 1);`,
      output: `while (1);`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceEnd` } ],
      code: `if (1 );`,
      output: `if (1);`,
      options: [ `never` ],
    },
  ],
}
