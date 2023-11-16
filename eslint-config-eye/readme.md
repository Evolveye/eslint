# Let's respect our eyes -- eslint code style config

This package provides configured eslint rules mostly for me -- Evolveye.
If you are interested in this code style, or if you want to propose changes -- 
feel free to [start new discussion](https://github.com/Evolveye/eslint/discussions).


```tsx
declare const React

export type TypeA = { propA: number, propB: number}
export type TypeB = {
  propA: string
  propB: number

  func: (arg:string) => number
}



class ClassA {}
class ClassB<T=number> {
  a: T
  b: string = ``

  constructor( a:T ) {
    const b:number | null = (1 + 2) + 3
    const c = [ 1 ]

    this.a = a
  }
  method1( a:T, { propA }:TypeA ): void {}
  method2({ c }) {}
  method3 = a => {}
  method4 = (a = 1) => {}
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
function fnObj({ c }): void {}
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
    <span>abc</span>
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
```



## Preconfigured babel and react


I wanted to create one module that could set all dependencies by itself.
And this is it! This config is setting up the JSX and the Babel parser for JavaScript classes
(private fields, static fields, arrow methods).

Also, I made some custom rules. You can find them [here](../eslint-plugin-spaces)
