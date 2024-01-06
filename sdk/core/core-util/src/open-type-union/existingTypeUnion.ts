// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */

enum KnownFoo {
  foo = "foo",
  bar = "bar",
}

type Foo = string;
type FooUnion = FooType | BarType;

// All of these operations return with the kind "baz", a kind that's yet to be introduced when
// this client is generated. The generated code casts whatever comes on the wire.
function operation(): Foo {
  return "baz" as Foo;
}

function operation2(): FooUnion {
  return { kind: "baz", baz: true } as unknown as FooType;
}
interface FooBase {
  kind: Foo;
}

interface FooType extends FooBase {
  kind: "foo";
  foo: string;
}

interface BarType extends FooBase {
  kind: "bar";
  bar: number;
}

interface BazType {
  kind: "baz";
  baz: boolean;
}

// userland

// Table stakes: is it an extensible enum

() => {
  const foo: Foo = "Adding a variant doesn't break this assignment" as KnownFoo;
  // @ts-expect-error
  // Type 'string' is not assignable to type '"foo" | "bar"'.
  const bar: "foo" | "bar" =
    "This assignment never works, even if there are no variants in the enum" as Foo;
};

() => {
  const result = operation();
  if (result === "foo") {
    // Can be coerced to the specific variant with a type guard
    const foo: "foo" = result;
  } else {
    // The result type is `string`, which `kind` is constrained to even when unknown.
    const foo: string = result;
    // Even if it's the last variant, `result` isn't a "bar" until it goes through a type guard.
    // @ts-expect-error
    // Type 'string' is not assignable to type '"bar"'.
    const foo2: "bar" = result;
    // If the user expects a shape that's unknown at generation time, the process is
    // straightforward for them.
    if (result === "baz") {
      const foo3: "baz" = result;
    }
  }
};

() => {
  const result = operation2();
  if (result.kind === "foo") {
    // Can be coerced to the specific variant with a type guard
    const foo: "foo" = result.kind;
    const foo2: string = result.foo;
  } else {
    // This union isn't extensible, so we can both use the discriminator or a wide string type.
    const kind: "foo" | "bar" = result.kind;
    // This union isn't extensible, so the compiler can infer that `result` has `BarType` type.
    const bar2: number = result.bar;
    // If the user expects a shape that's unknown at generation time, they can use a type cast
    if ((result.kind as string) === "baz") {
      const baz: boolean = (result as unknown as BazType).baz;
    }
  }
};
