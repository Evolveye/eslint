/** @typedef {import("eslint").Rule.RuleContext} RuleContext */
/** @typedef {import("eslint").Rule.RuleModule} RuleModule */
/** @typedef {import("eslint").Rule.Node} Node */
/** @typedef {import("eslint").AST.Token} Token */
/** @typedef {import("eslint").SourceCode} SourceCode */

/**
 * @typedef {object} PreRequiredData
 * @property {RuleContext} context
 * @property {SourceCode} code
 * @property {boolean} insertSpaces
 * @property {Node} parensData
 */


/**
 * @param {PreRequiredData} preRequiredData
 * @param {Token} a
 * @param {Token} b
 * @param {"open" | "close"} openOrClose
 */
function validateSpacesInCtx( preRequiredData, a, b, openOrClose ) {
  const { context, code, insertSpaces } = preRequiredData
  const undesirableErr = `undesirableSpace${openOrClose === `open` ? `Start` : `End`}`
  const missingErr = `missingSpace${openOrClose === `open` ? `Start` : `End`}`

  if (code.isSpaceBetween( a, b )) {
    if (!insertSpaces) {
      context.report({
        loc: {
          start: a.loc.end,
          end: b.loc.start,
        },
        messageId: undesirableErr,
        fix: fixer => fixer.removeRange([ a.range[ 1 ], b.range[ 0 ] ]),
      })
    } else {
      if (a.loc.end.column < b.loc.start.column - 1) {
        context.report({
          loc: {
            start: { line:a.loc.end.line, column:a.loc.end.column + 1 },
            end: b.loc.start,
          },
          messageId: undesirableErr,
          fix: fixer => fixer.removeRange([ a.range[ 1 ] + 1, b.range[ 0 ] ]),
        })
      }
    }
  } else if (insertSpaces) {
    context.report({
      loc: openOrClose === `open` ? a.loc : b.loc,
      messageId: missingErr,
      fix: fixer => fixer.insertTextAfterRange( a.range, ` ` ),
    })
  }
}


/**
 * @param {PreRequiredData} preRequiredData
 * @param {Token[]} tokens
 * @param {Node} parensData
 * @param {number} firstTokenIndex
 */
function checkSpaces( preRequiredData, tokens, parensData, firstTokenIndex ) {
  if (!parensData) return

  const { context } = preRequiredData
  const openParenToken = tokens[ firstTokenIndex ]
  const tokenAfterOpen = tokens[ firstTokenIndex + 1 ]

  if (!openParenToken || openParenToken.value !== `(`) return
  if (tokenAfterOpen.value === `)`) {
    if (openParenToken.range[ 1 ] != tokenAfterOpen.range[ 0 ]) context.report({
      loc: {
        start: openParenToken.loc.end,
        end: tokenAfterOpen.loc.start,
      },
      messageId: `undesirableSpaceInParens`,
      fix: fixer => fixer.removeRange([
        openParenToken.range[ 1 ],
        tokenAfterOpen.range[ 0 ],
      ]),
    })

    return
  }

  const paramASTTypes = [ `ObjectExpression`, `ObjectPattern`, `ArrayExpression`, `ArrayPattern` ]
  if (Array.isArray( parensData )) {
    if (parensData.length == 1 && paramASTTypes.includes( parensData[ 0 ].type )) {
      preRequiredData.insertSpaces = false
    }
  }
  // if (Array.isArray( parensData ) && parensData.length == 1 && paramASTTypes.includes( parensData[ 0 ].type )) {
  //   preRequiredData.insertSpaces = false
  // }

  let a, b

  a = openParenToken
  b = tokenAfterOpen
  validateSpacesInCtx( preRequiredData, a, b, `open` )

  b = Array.isArray( parensData ) ? parensData[ parensData.length - 1 ] : parensData
  b = context.getTokenAfter( b, { filter:token => token.value === `)` } )
  a = context.getTokenBefore( b )
  validateSpacesInCtx( preRequiredData, a, b, `close` )
}


/**
 * @param {string} tokenValue
 * @param {Token[]} tokens
 * @param {number} startFrom
 * @param {number} maxSearchIndex
 */
function findTokenIndex( tokenValue, tokens, startFrom = 0, maxSearchIndex = (startFrom + 5) ) {
  const max = tokens.length > maxSearchIndex
    ? maxSearchIndex
    : tokens.length

  for (let i = startFrom;  i < max;  ++i) {
    if (tokens[ i ].value != tokenValue) continue

    return i
  }
}


module.exports = {
  messagesForParens: {
    missingSpaceStart: `Missing space after parens open`,
    missingSpaceEnd: `Missing space before parens close`,
    undesirableSpaceStart: `Undesirable space after parens open`,
    undesirableSpaceEnd: `Undesirable space before parens close`,
    undesirableSpaceInParens: `Undesirable space between parens without params`,
  },
  messagesForSemi: {
    missingSpaceAfterFirstSemi: `Missing spaces (2 or more) after first loop semicolon`,
    missingSpaceAfterSecondSemi: `Missing spaces (2 or more) after second loop semicolon`,
  },
  messagesForJsx: {
    missingSpaceStart: `Missing space after tag open`,
    missingSpaceEnd: `Missing space before tag close`,
    undesirableSpaceStart: `Undesirable space after tag open`,
    undesirableSpaceEnd: `Undesirable space before tag close`,
  },

  validateSpacesInCtx,
  checkSpaces,
  findTokenIndex,
}
