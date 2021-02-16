// See: https://astexplorer.net

const { messages, checkSpaces } = require( `./utils.js` )

module.exports = {
  "space-in-arrow-functions-parens": {
    meta: {
      docs: { description:`` },
      schema: [ { "enum":[ `always`, `never` ] } ],
      messages,
      fixable: `whitespace`,
    },
    create( context ) {
      const code = context.getSourceCode()
      const insertSpaces = context.options[ 0 ] === `never` ? false : true

      return {
        ArrowFunctionExpression( node ) {
          checkSpaces(
            { context, code, insertSpaces },
            context.getTokens( node ),
            node.params,
            0,
          )
        },
      }
    },
  },


  "space-in-functions-parens": {
    meta: {
      docs: { description:`` },
      schema: [ { "enum":[ `always`, `never` ] } ],
      messages,
      fixable: `whitespace`,
    },
    create( context ) {
      const code = context.getSourceCode()
      const insertSpaces = context.options[ 0 ] === `never` ? false : true

      return {
        FunctionDeclaration( node ) {
          const tokens = context.getTokens( node )
          let firstParenIndex = 0

          for (let i = 0;  i < tokens.length;  ++i) {
            if (tokens[ i ].value != `(`) continue

            firstParenIndex = i

            break
          }

          checkSpaces(
            { context, code, insertSpaces },
            tokens,
            node.params,
            firstParenIndex,
          )
        },
      }
    },
  },


  "space-in-calls": {
    meta: {
      docs: { description:`` },
      schema: [ { "enum":[ `always`, `never` ] } ],
      messages,
      fixable: `whitespace`,
    },
    create( context ) {
      const code = context.getSourceCode()
      const insertSpaces = context.options[ 0 ] === `never` ? false : true

      return {
        CallExpression( node ) {
          const tokens = context.getTokens( node )
          let firstParenIndex = 0

          for (let i = 0;  i < tokens.length;  ++i) {
            if (tokens[ i ].value != `(`) continue

            firstParenIndex = i

            break
          }

          checkSpaces(
            { context, code, insertSpaces, parensData:node.arguments },
            tokens,
            node.arguments,
            firstParenIndex,
          )
        },
      }
    },
  },


  "space-in-loops-and-ifs": {
    meta: {
      docs: { description:`` },
      schema: [ { "enum":[ `always`, `never` ] } ],
      messages,
      fixable: `whitespace`,
    },
    create( context ) {
      const code = context.getSourceCode()
      const insertSpaces = context.options[ 0 ] === `never` ? false : true

      return {
        IfStatement( node ) {
          checkSpaces(
            { context, code, insertSpaces },
            context.getTokens( node ),
            node.test,
            1,
          )
        },
        ForOfStatement( node ) {
          const tokens = context.getTokens( node )
          let firstParenIndex = 0

          for (let i = 0;  i < tokens.length;  ++i) {
            if (tokens[ i ].value != `(`) continue

            firstParenIndex = i

            break
          }

          checkSpaces(
            { context, code, insertSpaces },
            tokens,
            node.right,
            firstParenIndex,
          )
        },
        ForInStatement( node ) {
          const tokens = context.getTokens( node )
          let firstParenIndex = 0

          for (let i = 0;  i < tokens.length;  ++i) {
            if (tokens[ i ].value != `(`) continue

            firstParenIndex = i

            break
          }

          checkSpaces(
            { context, code, insertSpaces },
            tokens,
            node.right,
            firstParenIndex,
          )
        },
        ForStatement( node ) {
          const tokens = context.getTokens( node )
          let firstParenIndex = 0

          for (let i = 0;  i < tokens.length;  ++i) {
            if (tokens[ i ].value != `(`) continue

            firstParenIndex = i

            break
          }

          checkSpaces(
            { context, code, insertSpaces },
            tokens,
            node.update,
            firstParenIndex,
          )
        },
        WhileStatement( node ) {
          const tokens = context.getTokens( node )
          let firstParenIndex = 0

          for (let i = 0;  i < tokens.length;  ++i) {
            if (tokens[ i ].value != `(`) continue

            firstParenIndex = i

            break
          }

          checkSpaces(
            { context, code, insertSpaces },
            tokens,
            node.test,
            firstParenIndex,
          )
        },
      }
    },
  },
}
