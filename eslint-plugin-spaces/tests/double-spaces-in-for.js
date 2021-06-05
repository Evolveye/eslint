module.exports = {
  valid: [
    { code:`for (let i;  (i = /reg/.exec( "" )););` },
    { code:`for ( let i = 0;  i < 1;  ++i );` },
    { code:`for (let i = 0;   i < 1;   ++i);` },
    { code:`for (let i = 0;  i < 1;  ++i);` },
    { code:`for (i=0;  true;);` },
    { code:`for (;  true;  );` },
    { code:`for (;  true; );` },
    { code:`for (; true;);` },
    { code:`for (;true;);` },
    { code:`for (;;);` },
  ],
  invalid: [
    {
      errors: [ { messageId:`missingSpaceAfterFirstSemi` }, { messageId:`missingSpaceAfterSecondSemi` } ],
      code: `for (let i = 0; i < 1; ++i);`,
      output: `for (let i = 0;  i < 1;  ++i);`,
    },
    {
      errors: [ { messageId:`missingSpaceAfterFirstSemi` } ],
      code: `for (let i = 0; i < 1;  ++i);`,
      output: `for (let i = 0;  i < 1;  ++i);`,
    },
    {
      errors: [ { messageId:`missingSpaceAfterSecondSemi` } ],
      code: `for (let i = 0;  i < 1; ++i);`,
      output: `for (let i = 0;  i < 1;  ++i);`,
    },
    {
      errors: [ { messageId:`missingSpaceAfterFirstSemi` } ],
      code: `for (i=0;true;);`,
      output: `for (i=0;  true;);`,
    },
    {
      errors: [ { messageId:`missingSpaceAfterFirstSemi` } ],
      code: `for (i=0; true;);`,
      output: `for (i=0;  true;);`,
    },
    {
      errors: [ { messageId:`missingSpaceAfterFirstSemi` } ],
      code: `for (; true;  1);`,
      output: `for (;  true;  1);`,
    },
  ],
}
