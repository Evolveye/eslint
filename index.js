require( `./custom_rules/tests.js` )

const something = []

//*
const arrow_params = ({ abc },  a) => true
const arrow_obj = ({ abc }) => true
const arrow_empty = () => true
const arrow_var = a => true
const arrow = (a, b) => true

//*
function fnObj( { c } ) {}
function fn( a, b, { c } ) {}

//*
fnObj( { c:3 } )
fn( 1, 2, { c:3 } )
fn( 1, 2, something[ 2 ] )

//*
if (something[ 0 ]);
if (arrow());

for (const value of [ 1, 2, 3 ]);

// */
