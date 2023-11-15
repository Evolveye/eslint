const { RuleTester } = require( `eslint` )

const rules = require( `../rules.js` )
const tester = new RuleTester({
  parser: require.resolve( `@typescript-eslint/parser` ),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
})
const testsNames = [
  `space-in-arrow-functions-parens`,
  `space-in-functions-parens`,
  `space-in-constructors`,
  `space-in-calls`,
  `space-in-loops-and-ifs`,
  `space-around-jsx-children`,
  `double-spaces-in-for`,
]
const testsDataset = testsNames.map( name => ({
  name,
  rule: rules[ name ],
  test: require( `./${name}.js` ),
}) )

testsDataset.forEach( ({ name, rule, test }) => {
  console.log( ` ` )

  try {
    console.log( ` Testing ${name}...` )
    tester.run( name, rule, test )
    console.log( `  - Passed!` )
  } catch (err) {
    console.log( err )
  }

  console.log( ` ` )
} )
