# More spaces!


```js
const something = []
const obj = {
  fnExp1() {},
  fnExp2( a ) {},
  fnExp3: a => {},
}



const arrow_params = ({ abc },  a) => true
const arrow_obj = ({ abc }) => true
const arrow_empty = () => true
const arrow_var = a => true
const arrow = (a, b) => true



function * fnGen( a, b, { c } ) {}
function fnObj({ c }) {}
function fn( a, b, { c } ) {}



fnObj({ c:3 })
fn( 1, 2, { c:3 } )
fn( 1, 2, something[ 2 ] )
something.method( 123 )



if (something[ 0 ]);
if (arrow());

for (const value of [ 1, 2, 3 ]);
for (const value in {});
for (let i = 0;  i < 1;  ++i);

while (false);



class X {
  method1( a, { c } ) {}
  method2({ c }) {}
  method3 = a => {}
}
```
