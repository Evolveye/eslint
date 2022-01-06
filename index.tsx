export type Type = {
  propA:string
  propB: number

  func: (arg:string) => number
}



class ClassA {}
class ClassB<T=number   > {
  a:T
  b: string = ``

  constructor( a:T ) {
    this.a = a
  }
  method1( a, { c } ) {}
  method2({ c }) {}
  method3 = a => {}
}



const something = []
const obj = {
  fnExp1() {},
  fnExp2<T>( a:T ) {},
  fnExp3: a => obj,
}



const arrow_params = ({ abc },  a) => true
const arrow_obj = ([ abc ]) => true
const arrow_empty = () => true
const arrow_var = a => true
const arrow = (a, b) =>
  obj.fnExp3( 123 ) ?? true



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



switch (true) {
  case true: 1
  default: 2
}

if (something[ 0 ]) { /* */ }
if (!arrow( 1, 2 )) { /* */ }

for (const value of [ 1, 2, 3 ]);
for (const prop in {});
for (let i = 0;  i < 1;  ++i);
for (let i;  (i = /reg/.exec( `` )););

while (false);



const jsx = (
  <article>
    <span about="" accessKey="" aria-activedescendant="" />
    123
    <span
      about=""
      accessKey=""
      aria-activedescendant=""
      children="abc"
    />
    <span>abc {123} def</span>
  </article>
)

function Component() {
  return (
    <p>text</p>
  )
}



const instanceA = new ClassA()
const instanceB = new ClassB<number>( 1 )
const instanceC = new obj.fnExp2( 1 )
