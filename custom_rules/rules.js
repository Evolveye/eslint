// See: https://astexplorer.net

module.exports = {
  "space-in-arrow-functions-parens": {
    meta: {
      fixable: `whitespace`,
      docs: {
        description: ``,
      },
      schema: [],
      messages: {
        spaceStart: `Missing space after parens open`,
        spaceEnd: `Missing space before parens close`,
      },
    },
    create( context ) {
      const code = context.getSourceCode()

      return {
        ArrowFunctionExpression( node ) {
          const { params, range } = node
          const tokens = context.getTokens( node )

          let a, b

          if (params.length === 0) return
          if (tokens[ 0 ].value != `(`) return

          // console.log( tokens[ 0 ] )

          a = tokens[ 0 ]
          b = tokens[ 1 ]
          if (!code.isSpaceBetween( a, b )) {
            context.report({
              loc: a.loc,
              messageId: `spaceStart`,
              fix: fixer => fixer.insertTextAfterRange( a.range, ` ` ),
            })
          }

          a = params[ params.length - 1 ]
          b = context.getTokenAfter( a )
          if (!code.isSpaceBetween( a, b )) {
            context.report({
              loc: b.loc,
              messageId: `spaceEnd`,
              fix: fixer => fixer.insertTextBeforeRange( b.range, ` ` ),
            } )
          }


          return

          // console.log( { range, params:params.map( ({ range }) => range ) } )
        },
      }
    },
  },
}
