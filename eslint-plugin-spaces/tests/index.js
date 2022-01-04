const { RuleTester } = require( `eslint` )

const rules = require( `../rules.js` )
const tester = new RuleTester({ parserOptions:{ ecmaVersion:2015 } })
const testsNames = [
  `space-in-arrow-functions-parens`,
  `space-in-functions-parens`,
  `space-in-constructors`,
  `space-in-calls`,
  `space-in-loops-and-ifs`,
  `double-spaces-in-for`,
]
const testsDataset = testsNames.map( name => ({
  name,
  rule: rules[ name ],
  test: require( `./${name}.js` ),
}) )

testsDataset.forEach( ({ name, rule, test }) => {
  tester.run( name, rule, test )
} )
