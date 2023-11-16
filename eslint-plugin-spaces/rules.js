// See: https://astexplorer.net

/** @typedef {import("eslint").Rule.RuleModule} RuleModule */
/** @typedef {import("eslint").Rule.Node} Node */

const {
  messagesForParens,
  messagesForSemi,
  checkSpaces,
  findTokenIndex,
  validateSpacesInCtx,
} = require( `./utils.js` )

/** @type {Record<string,RuleModule>} */
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
          const firstParenIndex = node.callee?.type === `MemberExpression`
            ? findTokenIndex( `(`, tokens, tokens.indexOf( context.getTokenAfter( node.callee ) ) )
            : findTokenIndex( `(`, tokens, 1 )

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


  "space-in-constructors": {
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
        NewExpression( node ) {
          const tokens = context.getTokens( node )
          const firstParenIndex = node.callee?.type === `MemberExpression`
            ? findTokenIndex( `(`, tokens, tokens.indexOf( context.getTokenAfter( node.callee ) ) )
            : findTokenIndex( `(`, tokens, 1 )

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

  "space-around-jsx-children": {
    meta: {
      docs: { description:`` },
      schema: [ { "enum":[ `always`, `never` ] } ],
      messages: messagesForParens,
      fixable: `whitespace`,
    },
    create( context ) {

      const insertSpaces = context.options[ 0 ] === `never` ? false : true

      return {
        /** @param {Node} node */
        JSXElement( node ) {
          const isInline = !node.openingElement.selfClosing
            && node.openingElement.loc.end.line === node.closingElement.loc.start.line

          if (!isInline || !node.children.length) return

          /** @type {Node} */ const firstChildren = node.children[ 0 ]
          /** @type {Node} */ const lastChildren = node.children[ node.children.length - 1 ]

          const leftTrimLength = `raw` in firstChildren
            ? firstChildren.raw.length - firstChildren.raw.trimStart().length
            : node.openingElement.loc.end.column - firstChildren.loc.start.column
          const rightTrimLength = `raw` in lastChildren
            ? lastChildren.raw.length - lastChildren.raw.trimEnd().length
            : lastChildren.loc.end.column - node.closingElement.loc.start.column

          if (insertSpaces) {
            if (!leftTrimLength) context.report({
              loc: {
                start: {
                  line: firstChildren.loc.start.line,
                  column: firstChildren.loc.start.column - 1,
                },
                end: {
                  line: firstChildren.loc.start.line,
                  column: firstChildren.loc.start.column + 1,
                },
              },
              messageId: `missingSpaceStart`,
              fix: fixer => fixer.insertTextBefore( firstChildren, ` ` ),
            })

            if (!rightTrimLength) context.report({
              loc: {
                start: {
                  line: lastChildren.loc.end.line,
                  column: lastChildren.loc.end.column - 1,
                },
                end: {
                  line: lastChildren.loc.end.line,
                  column: lastChildren.loc.end.column + 1,
                },
              },
              messageId: `missingSpaceEnd`,
              fix: fixer => fixer.insertTextAfter( lastChildren, ` ` ),
            })
          } else {
            if (leftTrimLength) context.report({
              loc: {
                start: firstChildren.loc.start,
                end: {
                  line: firstChildren.loc.start.line,
                  column: firstChildren.loc.start.column + leftTrimLength,
                },
              },
              messageId: `undesirableSpaceStart`,
              fix: fixer => fixer.removeRange([ firstChildren.range[ 0 ], firstChildren.range[ 0 ] + leftTrimLength ]),
            })

            if (rightTrimLength) context.report({
              loc: {
                start: {
                  line: lastChildren.loc.end.line,
                  column: lastChildren.loc.end.column - rightTrimLength,
                },
                end: lastChildren.loc.end,
              },
              messageId: `undesirableSpaceEnd`,
              fix: fixer => fixer.removeRange([ lastChildren.range[ 1 ] - rightTrimLength, lastChildren.range[ 1 ] ]),
            })
          }
        },
      }
    },
  },
}
