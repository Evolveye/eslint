module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true,
  },
  extends: [ `eslint:recommended` ],
  parser: `@babel/eslint-parser`,
  plugins: [
    `react`,
    `spaces`,
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
    "spaces/space-in-arrow-functions-parens": [ `error`, `never` ],
    "spaces/space-in-functions-parens": [ `error`, `always` ],
    "spaces/space-in-calls": [ `error`, `always` ],
    "spaces/space-in-loops-and-ifs": [ `error`, `never` ],
    "spaces/double-spaces-in-for": [ `error` ],

    "react/jsx-uses-vars": [ `error` ],
    "react/jsx-uses-react": [ `error` ],
    "react/jsx-closing-bracket-location": [ `error`, `line-aligned` ],
    "react/jsx-curly-brace-presence": [ `error`, { props:`never`, children:`never` } ],
    "react/jsx-curly-newline": [ `error`, { multiline:`require`, singleline:`forbid` } ],
    "react/jsx-curly-spacing": [ `error`, { when:`never`, children:true } ],
    "react/jsx-first-prop-new-line": [ `error`, `multiline-multiprop` ],
    "react/jsx-fragments": [ `error`, `syntax` ],
    "react/jsx-no-useless-fragment": [ `error` ],
    "react/jsx-max-props-per-line": [ `error`, { maximum:2, when:`always` } ],
    "react/jsx-no-target-blank": [ `error`, { enforceDynamicLinks:`always` } ],
    "react/jsx-one-expression-per-line": [ `error`, { allow:`single-child` } ],
    "react/jsx-props-no-multi-spaces": [ `error` ],
    "react/jsx-space-before-closing": [ `error`, `always` ],
    "react/jsx-wrap-multilines": [ `error` ],

    "indent": [ `error`, 2 ],
    "linebreak-style": [ `error`, `windows` ],
    "quotes": [ `error`, `backtick` ],
    "semi": [ `error`, `never` ],
    "object-curly-spacing": [ `error`, `always` ],
    "prefer-template": [ `error` ],
    "no-unused-vars": [ `warn` ],
    "space-before-function-paren": [ `error`, `never` ],
    "space-before-blocks": [ `error`, `always` ],
    "func-call-spacing": [ `error`, `never` ],
    "implicit-arrow-linebreak": [ `error`, `beside` ],
    "key-spacing": [ `error`, { singleLine:{ afterColon:false } } ],
    "array-bracket-spacing": [ `error`, `always` ],
    "array-bracket-newline": [ `error`, { multiline:true } ],
    "block-spacing": [ `error` ],
    "no-whitespace-before-property": [ `error` ],
    "space-unary-ops": [ `error`, { words:true, nonwords:false } ],
    "spaced-comment": [ `error`, `always` ],
    "comma-dangle": [ `error`, `always-multiline` ],
    "eol-last": [ `error`, `always` ],
    "computed-property-spacing": [ `error`, `always`, { enforceForClassMembers:false } ],
    "arrow-spacing": [ `error`, { before:true, after:true } ],
    "template-tag-spacing": [ `error`, `never` ],
    "no-constant-condition": [ `off` ],
    "no-return-await": [ `error` ],
  },
}
