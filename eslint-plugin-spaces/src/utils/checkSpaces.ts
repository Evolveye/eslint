import {PreRequiredData} from "./CommonData.js"
import { TSESTree } from "@typescript-eslint/utils"
import validateSpacesInCtx from "./validateSpacesInCtx.js"

export default function checkSpaces( preRequiredData:PreRequiredData, tokens:TSESTree.Token[], parensData:TSESTree.Node | TSESTree.Token | (TSESTree.Node | TSESTree.Token)[], firstTokenIndex:number ) {
  if (!parensData) return

  const { context } = preRequiredData
  const openParenToken = tokens[ firstTokenIndex ]
  const tokenAfterOpen = tokens[ firstTokenIndex + 1 ]

  if (!openParenToken || openParenToken.value !== `(`) return

  // Handles "()" parens
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

  // handles "({ ... })", "([ ... ])" cases
  if (Array.isArray( parensData )) {
    const paramASTTypes = [ `ObjectExpression`, `ObjectPattern`, `ArrayExpression`, `ArrayPattern` ]
    if (parensData.length == 1 && paramASTTypes.includes( parensData[ 0 ].type )) {
      preRequiredData.insertSpaces = false
    }
  }

  let a:TSESTree.Node | TSESTree.Token, b:TSESTree.Node | TSESTree.Token

  a = openParenToken
  b = tokenAfterOpen
  validateSpacesInCtx( preRequiredData, a, b, `open` )

  b = Array.isArray( parensData ) ? parensData[ parensData.length - 1 ] : parensData
  const tokenAfterB = context.sourceCode.getTokenAfter( b, { filter:token => token.value === `)` } )
  if (!tokenAfterB) return
  b = tokenAfterB
  const tokenBeforeB = context.sourceCode.getTokenBefore( b )
  if (!tokenBeforeB) return
  a = tokenBeforeB
  validateSpacesInCtx( preRequiredData, a, b, `close` )
}