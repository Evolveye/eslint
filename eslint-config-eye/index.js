//
// TODO rule for spacing after variable creation
// TODO remove space before/after default param value
//

module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: [ `eslint:recommended` ],
  parser: `@typescript-eslint/parser`,
  plugins: [
    `react`,
    `import`,
    `spaces`,
    `@typescript-eslint`,
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: `module`,
    babelOptions: {
      configFile: `${__dirname}/.babelrc`,
    },
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  rules: {
    //* TYPESCRIPT RULES
    "@typescript-eslint/explicit-module-boundary-types":  [ `off` ],
    '@typescript-eslint/indent':                          [ `error`, 2, { SwitchCase:1 } ],
    "@typescript-eslint/keyword-spacing":                 [ `error`, { before:true, after:true } ],
    "@typescript-eslint/member-delimiter-style":          [ `error`, { multiline:{ delimiter:`none`, requireLast:true }, singleline:{ delimiter:`semi`, requireLast:false } } ],
    "@typescript-eslint/method-signature-style":          [ `error`, `property` ],
    // "@typescript-eslint/naming-convention":               [ `error`, ],
    "@typescript-eslint/no-explicit-any":                 [ `error`, { fixToUnknown:true, ignoreRestArgs:false } ],
    "@typescript-eslint/no-extra-non-null-assertion":     [ `error` ],
    // '@typescript-eslint/no-for-in-array':                 [ `error` ],
    "@typescript-eslint/no-non-null-assertion":           [ `off` ],
    "@typescript-eslint/no-redeclare":                    [ `off` ],
    "@typescript-eslint/no-unused-vars":                  [ `warn` ],
    "@typescript-eslint/quotes":                          [ `error`, `backtick` ],
    "@typescript-eslint/type-annotation-spacing":         [ `error`, { before:false, after:true, overrides:{ arrow:{ before:true, after:true }, parameter:{ before:false, after:false } } } ],
    // */


    //* SPACES RULES
    "spaces/double-spaces-in-for":            [ `error` ],
    "spaces/space-in-arrow-functions-parens": [ `error`, `never` ],
    "spaces/space-in-calls":                  [ `error`, `always` ],
    "spaces/space-in-constructors":           [ `error`, `always` ],
    "spaces/space-in-functions-parens":       [ `error`, `always` ],
    "spaces/space-in-loops-and-ifs":          [ `error`, `never` ],
    // */


    //* REACT RULES
    "react/jsx-closing-bracket-location": [ `error`, `line-aligned` ],
    "react/jsx-curly-brace-presence":     [ `error`, { props:`never`, children:`never` } ],
    "react/jsx-curly-newline":            [ `error`, { multiline:`require`, singleline:`forbid` } ],
    "react/jsx-curly-spacing":            [ `error`, { when:`never`, children:true } ],
    "react/jsx-first-prop-new-line":      [ `error`, `multiline-multiprop` ],
    "react/jsx-fragments":                [ `error`, `syntax` ],
    "react/jsx-indent":                   [ `error`, 2 ],
    "react/jsx-no-target-blank":          [ `error`, { enforceDynamicLinks:`always` } ],
    "react/jsx-no-useless-fragment":      [ `error` ],
    "react/jsx-props-no-multi-spaces":    [ `error` ],
    "react/jsx-tag-spacing":              [ `error`, { closingSlash:`never`, beforeSelfClosing:`always`, afterOpening:`never`, beforeClosing:`never` } ],
    "react/jsx-uses-react":               [ `error` ],
    "react/jsx-uses-vars":                [ `error` ],
    // "react/jsx-max-props-per-line":       [ `error`, { maximum:2, when:`always` } ],
    "react/jsx-wrap-multilines":          [ `error` ],
    "react/no-children-prop":             [ `off` ],
    // */


    //* STANDARD ESLINT RULES
    // "indent":                         [ `error`, 2, { SwitchCase:1 } ],
    "array-bracket-newline":          [ `error`, { multiline:true } ],
    "array-bracket-spacing":          [ `error`, `always` ],
    "arrow-parens":                   [ `error`, `as-needed` ],
    "arrow-spacing":                  [ `error`, { before:true, after:true } ],
    "block-spacing":                  [ `error` ],
    "comma-dangle":                   [ `error`, `always-multiline` ],
    "comma-spacing":                  [ `error`, { before:false, after:true } ],
    "computed-property-spacing":      [ `error`, `always`, { enforceForClassMembers:false } ],
    "eol-last":                       [ `error`, `always` ],
    "func-call-spacing":              [ `error`, `never` ],
    "import/order":                   [ `error`, { alphabetize:{ order:`desc` }, groups:[ `builtin`, `external`, `internal`, `parent`, `index`, `sibling`, `object`, `type` ] } ],
    "key-spacing":                    [ `error`, { singleLine:{ afterColon:false }, multiLine:{ mode:`minimum` } } ],
    // "keyword-spacing":                [ `error`, { before:true, after:true } ],
    "linebreak-style":                [ `off` ],
    "no-async-promise-executor":      [ `off` ],
    "no-compare-neg-zero":            [ `off` ],
    "no-constant-condition":          [ `off` ],
    "no-fallthrough":                 [ `off` ],
    "no-redeclare":                   [ `off` ],
    "no-return-await":                [ `error` ],
    "no-unreachable":                 [ `off` ],
    "no-unused-vars":                 [ `off` ],
    "no-whitespace-before-property":  [ `error` ],
    // "quotes":                         [ `error`, `backtick` ],
    "object-curly-spacing":           [ `error`, `always` ],
    "prefer-template":                [ `off` ],
    "semi":                           [ `error`, `never` ],
    // "sort-keys":                      [ `error` ],
    "space-before-blocks":            [ `error`, `always` ],
    "space-before-function-paren":    [ `error`, `never` ],
    "space-infix-ops":                [ `error` ],
    // "implicit-arrow-linebreak":       [ `error`, `beside` ],
    "space-unary-ops":                [ `error`, { words:true, nonwords:false } ],
    "spaced-comment":                 [ `error`, `always`, { block:{ balanced:true, exceptions:[ `\\` ] }, line:{ markers:[ `/` ] } } ],
    "template-tag-spacing":           [ `error`, `never` ],
    // */
  },
}
