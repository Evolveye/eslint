import { InvalidTestCase, ValidTestCase } from "@typescript-eslint/rule-tester"
import { MessageIds, Options } from "../src/rules/double-spaces-in-for"


export const validCases:ValidTestCase<Options>[] = [
  { code:`for (let i;  (i = /reg/.exec( "" )););` },
  { code:`for ( let i = 0;  i < 1;  ++i );` },
  { code:`for (let i = 0;   i < 1;   ++i);` },
  { code:`for (let i = 0;  i < 1;  ++i);` },
  { code:`let i;for (i=0;  true;);` },
  { code:`for (;  true;  );` },
  { code:`for (;  true; );` },
  { code:`for (; true;);` },
  { code:`for (;true;);` },
  { code:`for (;;);` },
]

export const invalidCases:InvalidTestCase<MessageIds, Options>[] = [
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
    code: `let i;for (i=0;true;);`,
    output: `let i;for (i=0;  true;);`,
  },
  {
    errors: [ { messageId:`missingSpaceAfterFirstSemi` } ],
    code: `let i;for (i=0; true;);`,
    output: `let i;for (i=0;  true;);`,
  },
  {
    errors: [ { messageId:`missingSpaceAfterFirstSemi` } ],
    code: `let i;for (; true;  1);`,
    output: `let i;for (;  true;  1);`,
  },
]
