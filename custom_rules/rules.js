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
          const tokens = context.getTokens( node )

          checkSpaces(
            { context, code, insertSpaces, node },
            tokens[ 0 ],
            tokens[ 1 ],
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
            { context, code, insertSpaces, node },
            tokens[ firstParenIndex ],
            tokens[ firstParenIndex + 1 ],
          )
        },
      }
    },
  },
}
