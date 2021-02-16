// See: https://astexplorer.net

module.exports = {
  "space-in-arrow-functions-parens": {
    meta: {
      fixable: `whitespace`,
      docs: {
        description: ``,
      },
      schema: [ { "enum":[ `always`, `never` ] } ],
      messages: {
        missingSpaceStart: `Missing space after parens open`,
        missingSpaceEnd: `Missing space before parens close`,
        undesirableSpaceStart: `Undesirable space after parens open`,
        undesirableSpaceEnd: `Undesirable space before parens close`,
        undesirableSpaceInParens: `Undesirable space between parens without params`,
      },
    },
    create( context ) {
      const code = context.getSourceCode()
      const insertSpaces = context.options[ 0 ] === `never` ? false : true
      const validateSpaces = (a, b, undesirableErr, missingErr) => {
        if (code.isSpaceBetween( a, b )) {
          if (!insertSpaces) context.report({
            loc: {
              start: a.loc.end,
              end: b.loc.start,
            },
            messageId: undesirableErr,
            fix: fixer => fixer.removeRange( [ a.range[ 1 ], b.range[ 0 ] ] ),
          } )
        } else if (insertSpaces) {
          context.report({
            loc: a.loc,
            messageId: missingErr,
            fix: fixer => fixer.insertTextAfterRange( a.range, ` ` ),
          })
        }
      }

      return {
        ArrowFunctionExpression( node ) {
          const { params } = node
          const tokens = context.getTokens( node )

          let a, b

          if (tokens[ 0 ].value != `(`) return
          if (tokens[ 1 ].value == `)`) {
            const open = tokens[ 0 ]
            const close = tokens[ 1 ]

            if (open.range[ 1 ] != close.range[ 0 ] ) context.report({
              loc: {
                start: open.loc.end,
                end: close.loc.start,
              },
              messageId: `undesirableSpaceInParens`,
              fix: fixer => fixer.removeRange( [ open.range[ 1 ], close.range[ 0 ] ] ),
            } )

            return
          }

          a = tokens[ 0 ]
          b = tokens[ 1 ]
          validateSpaces( a, b, `undesirableSpaceStart`, `missingSpaceStart` )

          a = params[ params.length - 1 ]
          b = context.getTokenAfter( a )
          validateSpaces( a, b, `undesirableSpaceEnd`, `missingSpaceEnd` )

          // console.log( { range, params:params.map( ({ range }) => range ) } )
        },
      }
    },
  },
  "space-in-functions-parens": {
    meta: {
      fixable: `whitespace`,
      docs: {
        description: ``,
      },
      schema: [ { "enum":[ `always`, `never` ] } ],
      messages: {
        missingSpaceStart: `Missing space after parens open`,
        missingSpaceEnd: `Missing space before parens close`,
        undesirableSpaceStart: `Undesirable space after parens open`,
        undesirableSpaceEnd: `Undesirable space before parens close`,
        undesirableSpaceInParens: `Undesirable space between parens without params`,
      },
    },
    create( context ) {
      const code = context.getSourceCode()
      const insertSpaces = context.options[ 0 ] === `never` ? false : true
      const validateSpaces = (a, b, undesirableErr, missingErr) => {
        if (code.isSpaceBetween( a, b )) {
          if (!insertSpaces) context.report({
            loc: {
              start: a.loc.end,
              end: b.loc.start,
            },
            messageId: undesirableErr,
            fix: fixer => fixer.removeRange( [ a.range[ 1 ], b.range[ 0 ] ] ),
          } )
        } else if (insertSpaces) {
          context.report({
            loc: a.loc,
            messageId: missingErr,
            fix: fixer => fixer.insertTextAfterRange( a.range, ` ` ),
          })
        }
      }

      return {
        FunctionDeclaration( node ) {
          const { params } = node
          const tokens = context.getTokens( node )

          let a, b

          let firstParenIndex = 0

          for (let i = 0;  i < tokens.length;  ++i) {
            if (tokens[ i ].value != `(`) continue

            firstParenIndex = i

            break
          }

          // console.log( firstParenIndex, tokens[ firstParenIndex ] )

          if (tokens[ firstParenIndex ].value != `(`) return
          if (tokens[ firstParenIndex + 1 ].value == `)`) {
            const open = tokens[ firstParenIndex ]
            const close = tokens[ firstParenIndex + 1 ]

            if (open.range[ 1 ] != close.range[ 0 ] ) context.report({
              loc: {
                start: open.loc.end,
                end: close.loc.start,
              },
              messageId: `undesirableSpaceInParens`,
              fix: fixer => fixer.removeRange( [ open.range[ 1 ], close.range[ 0 ] ] ),
            } )

            return
          }

          a = tokens[ firstParenIndex ]
          b = tokens[ firstParenIndex + 1 ]
          validateSpaces( a, b, `undesirableSpaceStart`, `missingSpaceStart` )

          a = params[ params.length - 1 ]
          b = context.getTokenAfter( a )
          validateSpaces( a, b, `undesirableSpaceEnd`, `missingSpaceEnd` )

          // console.log( { range, params:params.map( ({ range }) => range ) } )
        },
      }
    },
  },
}
