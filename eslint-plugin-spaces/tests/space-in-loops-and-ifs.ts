import { InvalidTestCase, ValidTestCase } from "@typescript-eslint/rule-tester"
import { MessageIds, Options } from "../src/rules/space-in-loops-and-ifs"


export const validCases:ValidTestCase<Options>[] = [
    // Default option [ `never` ]
    { code:`for (let i = 0;  i < 1;  ++i);` },
    { code:`for (const x of []);` },
    { code:`for (const x in {});` },
    { code:`while (0);` },
    { code:`if (1) {}` },

    // options [ `always` ]
    { options:[`always`], code:`for ( let i = 0;  i < 1;  ++i );` },
    { options:[`always`], code:`for ( const x of [] );` },
    { options:[`always`], code:`for ( const x in {} );` },
    { options:[`always`], code:`while ( 0 );` },
    { options:[`always`], code:`if ( 1 );` },

    // options [ `never` ]
    { options:[`never`], code:`for (let i = 0;  i < 1;  ++i);` },
    { options:[`never`], code:`for (const x of []);` },
    { options:[`never`], code:`for (const x in {});` },
    { options:[`never`], code:`while (0);` },
    { options:[`never`], code:`if (1) {}` },
  ]

  export const invalidCases:InvalidTestCase<MessageIds, Options>[] = [
    // options: [ `always` ]
    {
      errors: [ { messageId:`missingSpaceStart` }, { messageId:`missingSpaceEnd` } ],
      code: `for (let i = 0;  i < 1;  ++i);`,
      output: `for ( let i = 0;  i < 1;  ++i );`,
      options: [ `always` ],
    },
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `while (0 );`,
      output: `while ( 0 );`,
      options: [ `always` ],
    },
    {
      errors: [ { messageId:`missingSpaceEnd` } ],
      code: `if ( 1);`,
      output: `if ( 1 );`,
      options: [ `always` ],
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
      code: `while ( 0);`,
      output: `while (0);`,
      options: [ `never` ],
    },
    {
      errors: [ { messageId:`undesirableSpaceEnd` } ],
      code: `if (1 );`,
      output: `if (1);`,
      options: [ `never` ],
    },
]