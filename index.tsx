const something = []
const obj = {
  fnExp1() {},
  fnExp2<T>( a:T ) {},
  fnExp3: a => this,
}



const arrow_params = ({ abc },  a) => true
const arrow_obj = ([ abc ]) => true
const arrow_empty = () => true
const arrow_var = a => true
const arrow = (a, b) =>
  obj.fnExp3( 123 ) ?? true



class ClassA { constructor( a ) {} }
class ClassB {}



function * fnGen( a, b, { c } ) {}
function fnObj({ c }) {}
function fnArr([ a ]) {}
function fn( a, b, { c } ) {}
function fnNothing() {}



fnObj({ c:3 })
fnArr([ 3 ])
fn( 1, 2, { c:3 } )
fnNothing()
fn( 1, 2, something[ 2 ] )
obj.fnExp2( 123 )
obj.fnExp3( 1 ).fnExp2({ a:1 })



if (something[ 0 ]) { /* */ }
if (!arrow( 1, 2 )) { /* */ }

for (const value of [ 1, 2, 3 ]);
for (const value in {});
for (let i = 0;  i < 1;  ++i);
for (let i;  (i = /reg/.exec( `` )););

while (false);



class X {
  method1( a, { c } ) {}
  method2({ c }) {}
  method3 = a => {}
}



const jsx = (
  <article>
    <span about="" accessKey="" aria-activedescendant="" />
    <span
      about=""
      accessKey=""
      aria-activedescendant=""
    >
      abc
    </span>
    <span>abc {123} def</span>
  </article>
)



const instanceA = new ClassA( 1 )
const instanceB = new ClassB()
const instanceC = new obj.fnExp2( 1 )
