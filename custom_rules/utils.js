function validateSpacesInCtx(preRequiredData, a, b, undesirableErr, missingErr) {
  const { context, code, insertSpaces } = preRequiredData

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


function checkSpaces(preRequiredData, openParenToken, tokenAfterOpen) {
  const { context, node } = preRequiredData
  const { params } = node

  if (openParenToken.value != `(`) return
  if (tokenAfterOpen.value == `)`) {
    if (openParenToken.range[ 1 ] != tokenAfterOpen.range[ 0 ] ) context.report({
      loc: {
        start: openParenToken.loc.end,
        end: tokenAfterOpen.loc.start,
      },
      messageId: `undesirableSpaceInParens`,
      fix: fixer => fixer.removeRange( [
        openParenToken.range[ 1 ],
        tokenAfterOpen.range[ 0 ],
      ] ),
    } )

    return
  }

  let a, b

  a = openParenToken
  b = tokenAfterOpen
  validateSpacesInCtx( preRequiredData, a, b, `undesirableSpaceStart`, `missingSpaceStart` )

  a = params[ params.length - 1 ]
  b = context.getTokenAfter( a )
  validateSpacesInCtx( preRequiredData, a, b, `undesirableSpaceEnd`, `missingSpaceEnd` )
}


module.exports = {
  messages: {
    missingSpaceStart: `Missing space after parens open`,
    missingSpaceEnd: `Missing space before parens close`,
    undesirableSpaceStart: `Undesirable space after parens open`,
    undesirableSpaceEnd: `Undesirable space before parens close`,
    undesirableSpaceInParens: `Undesirable space between parens without params`,
  },

  validateSpacesInCtx,
  checkSpaces,
}
