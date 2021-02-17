// See: https://astexplorer.net

const { messages, checkSpaces, findParenIndex } = require( `./utils.js` )

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
          const tokens = context.getTokens( node )
          const firstParenIndex = findParenIndex( tokens, 0 )

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
          const firstParenIndex = findParenIndex( tokens, 2 )

          checkSpaces(
            { context, code, insertSpaces },
            tokens,
            node.params,
            firstParenIndex,
          )
        },

        FunctionExpression( node ) {
          const tokens = context.getTokens( node )
          const firstParenIndex = findParenIndex( tokens, 0 )

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
          const firstParenIndex = findParenIndex( tokens, 1 )

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
          const firstParenIndex = findParenIndex( tokens, 1 )

          checkSpaces(
            { context, code, insertSpaces },
            tokens,
            node.right,
            firstParenIndex,
          )
        },

        ForInStatement( node ) {
          checkSpaces(
            { context, code, insertSpaces },
            context.getTokens( node ),
            node.right,
            1,
          )
        },

        ForStatement( node ) {
          const tokens = context.getTokens( node )
          const firstParenIndex = findParenIndex( tokens, 1 )

          checkSpaces(
            { context, code, insertSpaces },
            tokens,
            node.update,
            firstParenIndex,
          )
        },

        WhileStatement( node ) {
          checkSpaces(
            { context, code, insertSpaces },
            context.getTokens( node ),
            node.test,
            1,
          )
        },
      }
    },
  },
}
