import { InvalidTestCase, ValidTestCase } from "@typescript-eslint/rule-tester"
import { MessageIds, Options } from "../src/rules/space-around-jsx-children"


export const validCases:ValidTestCase<Options>[] = [
    {
      code: `<p> valid body </p>`,
    },
    {
      code: `<p> {1} </p>`,
    },
    {
      code: `<p>valid body</p>`,
      options: [ `never` ],
    },
    {
      code: `<p>{1}</p>`,
      options: [ `never` ],
    },
]
export const invalidCases:InvalidTestCase<MessageIds, Options>[] = [
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
    {
      errors: [ { messageId:`missingSpaceStart` } ],
      code: `<p>{1} </p>`,
      output: `<p> {1} </p>`,
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
    {
      errors: [ { messageId:`undesirableSpaceEnd` } ],
      code: `<p>{1} </p>`,
      output: `<p>{1}</p>`,
      options: [ `never` ],
    },
]
