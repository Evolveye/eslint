// See: https://astexplorer.net

const { messagesForParens, messagesForSemi, checkSpaces, findTokenIndex } = require( `./utils.js` )

module.exports = {
  "space-in-arrow-functions-parens": {
    meta: {
      docs: { description:`` },
      schema: [ { "enum":[ `always`, `never` ] } ],
      messages: messagesForParens,
      fixable: `whitespace`,
    },
    create( context ) {
      const code = context.getSourceCode()
      const insertSpaces = context.options[ 0 ] === `never` ? false : true

      return {
        ArrowFunctionExpression( node ) {
          const tokens = context.getTokens( node )
          const firstParenIndex = findTokenIndex( `(`, tokens, 0, 2 )

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
      messages: messagesForParens,
      fixable: `whitespace`,
    },
    create( context ) {
      const code = context.getSourceCode()
      const insertSpaces = context.options[ 0 ] === `never` ? false : true

      return {
        FunctionDeclaration( node ) {
          const tokens = context.getTokens( node )
          const firstParenIndex = findTokenIndex( `(`, tokens, 2 )

          checkSpaces(
            { context, code, insertSpaces },
            tokens,
            node.params,
            firstParenIndex,
          )
        },

        FunctionExpression( node ) {
          const tokens = context.getTokens( node )
          const firstParenIndex = findTokenIndex( `(`, tokens, 0 )

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
      messages: messagesForParens,
      fixable: `whitespace`,
    },
    create( context ) {
      const code = context.getSourceCode()
      const insertSpaces = context.options[ 0 ] === `never` ? false : true

      return {
        CallExpression( node ) {
          const tokens = context.getTokens( node )
          const firstParenIndex = findTokenIndex( `(`, tokens, 1 )

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
      messages: messagesForParens,
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
          const firstParenIndex = findTokenIndex( `(`, tokens, 1 )

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
          const firstParenIndex = findTokenIndex( `(`, tokens, 1 )

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


  "double-spaces-in-for": {
    meta: {
      docs: { description:`` },
      schema: [ { "enum":[ `always`, `never` ] } ],
      messages: messagesForSemi,
      fixable: `whitespace`,
    },
    create( context ) {
      return {
        ForStatement( node ) {
          const tokens = context.getTokens( node )
          const semi1Index = findTokenIndex( `;`, tokens, 2, Infinity )

          if (!semi1Index) return

          const semi1 = tokens[ semi1Index ]
          const tokenAfterSemi1 = context.getTokenAfter( semi1 )

          if (tokenAfterSemi1.value === `;`) return

          const spacesAfterSemi1 = tokenAfterSemi1.range[ 0 ] - semi1.range[ 1 ]

          const semi2 = context.getTokenAfter( semi1, {
            filter: ({ value }) => value === `;`,
          } )
          const tokenAfterSemi2 = context.getTokenAfter( semi2 )

          if (spacesAfterSemi1 < 2 && (semi1Index > 2 || tokenAfterSemi2.value !== `)`)) {
            const locEnd = tokenAfterSemi1.loc.start === semi1.loc.end
              ? tokenAfterSemi1.loc.start + 1
              : tokenAfterSemi1.loc.start

            context.report({
              loc: {
                start: semi1.loc.end,
                end: locEnd,
              },
              messageId: `missingSpaceAfterFirstSemi`,
              fix: fixer => fixer.insertTextAfterRange(
                semi1.range, ` `.repeat( 2 - spacesAfterSemi1 ),
              ),
            })
          }

          if (tokenAfterSemi2.value === `)`) return

          const spacesAfterSemi2 = tokenAfterSemi2.range[ 0 ] - semi2.range[ 1 ]

          if (spacesAfterSemi2 < 2) {
            const locEnd = tokenAfterSemi2.loc.start === semi2.loc.end
              ? tokenAfterSemi2.loc.start + 1
              : tokenAfterSemi2.loc.start

            context.report({
              loc: {
                start: semi2.loc.end,
                end: locEnd,
              },
              messageId: `missingSpaceAfterSecondSemi`,
              fix: fixer => fixer.insertTextAfterRange(
                semi2.range, ` `.repeat( 2 - spacesAfterSemi2 ),
              ),
            })
          }
        },
      }
    },
  },
}
