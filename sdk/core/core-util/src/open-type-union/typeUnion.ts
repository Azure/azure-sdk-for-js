// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */

declare const Unknown: unique symbol;
export type Extensible<T, Default> = T | UnknownVariant<Default>;
type UnknownVariant<Default> = Default extends object ? UnknownObject<Default> : typeof Unknown;
type UnknownObject<Default extends object> = {
  [K in keyof Default]: UnknownVariant<Default[K]>;
};

type Foo = Extensible<"foo" | "bar", string>;
type FooUnion = Extensible<FooType | BarType, { kind: string }>;

// All of these operations return with the kind "baz", a kind that's yet to be introduced when
// this client is generated. The generated code casts whatever comes on the wire.
function operation(): Foo {
  return "baz" as Foo;
}

function operation2(): FooUnion {
  return { kind: "baz", baz: true } as unknown as FooUnion;
}

function operation3(): FooType | BarType {
  return { kind: "baz", baz: true } as unknown as FooType | BarType;
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
  const foo: Foo = "Adding a variant doesn't break this assignment" as "foo" | "bar";
  // @ts-expect-error
  // Type 'Foo' is not assignable to type '"foo" | "bar"'.
  //  Type 'unique symbol' is not assignable to type '"foo" | "bar"'.
  const bar: "foo" | "bar" =
    "This assignment never works, even if there are no variants in the enum" as Foo;
};

() => {
  const result = operation();
  if (result === "foo") {
    // Can be coerced to the specific variant with a type guard
    const foo: "foo" = result;
  } else {
    // Even though the kind should default to something like `string`, we don't have a way to
    // inform the type system of that fact.
    // @ts-expect-error
    // Type 'string | typeof Unknown' is not assignable to type 'string'.
    //  Type 'typeof Unknown' is not assignable to type 'string'.
    const foo: string = result;
    // Even if it's the last variant, `result` isn't a "bar" until it goes through a type guard.
    // @ts-expect-error
    // Type '"bar" | unique symbol' is not assignable to type '"bar"'.
    //  Type 'unique symbol' is not assignable to type '"bar"'.
    const foo2: "bar" = result;
    // If the user expects a shape that's unknown at generation time, they can use a type cast
    if ((result as string) === "baz") {
      const foo3: "baz" = result as "baz";
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
    // Even though the kind should default to something like `string`, we don't have a way to
    // inform the type system of that fact.
    // @ts-expect-error
    // Type 'string | typeof Unknown' is not assignable to type 'string'.
    //  Type 'typeof Unknown' is not assignable to type 'string'.
    const kind: string = result.kind;
    // Even if it's the last variant, `result` isn't a "bar" until it goes through a type guard.
    // @ts-expect-error
    // Property 'bar' does not exist on type 'BarType | UnknownObject<{ kind: string; }>'.
    //  Property 'bar' does not exist on type 'UnknownObject<{ kind: string; }>'.
    const bar2: number = result.bar;
    // If the user expects a shape that's unknown at generation time, they can use a type cast
    if ((result.kind as string) === "baz") {
      const baz: boolean = (result as unknown as BazType).baz;
    }
  }
};

() => {
  const result = operation3();
  if (result.kind === "foo") {
    // Some sanity checks for assignability
    const fooKindLiteralType: { kind: "foo"; foo: string } = result;
    const fooKind: FooType = result;
    const kind: "foo" = result.kind;
  } else {
    // Exactly the same as above, but suppose the user somehow knows this is a "baz" even though
    // it's not an extensible enum
    const baz: { kind: "baz"; baz: string } = result as unknown as {
      kind: "baz";
      baz: string;
    };
  }
};

// Some constructed types don't cause problems
function good(foo: Foo): Exclude<Foo, "foo"> | undefined {
  if (foo === "foo") {
    return;
  }
  return foo;
}

// A user could easily fall into this trap. We shouldn't make it easy for them to construct their
// own extensible unions with our unique symbol. Avoid exposing the symbol type, or any generics
// that allow someone to extend it.
function bad(foo: Foo): Extensible<"bar", string> | undefined {
  if (foo === "foo") {
    return;
  }
  // Error expected when `Foo` is extended with `"baz"`.
  // Type '"bar" | "baz" | unique symbol' is not assignable to type 'Extensible<"bar", string> | undefined'.
  //  Type '"baz"' is not assignable to type 'Extensible<"bar", string> | undefined'.
  return foo;
}

// Assume the user names this symbol with the same name. Unique symbols have a type that's unique
// to their instance, so unless we export the symbol, the user has no way to access its type
// directly. This means that there's no way to make this compile in userland without a cast. But
// some users...
declare const DeterminedUser: unique symbol;
function niceTry(foo: Foo): "bar" | typeof DeterminedUser | undefined {
  if (foo === "foo") {
    return;
  }
  // @ts-expect-error
  // Type '"bar" | unique symbol' is not assignable to type '"bar" | unique symbol | undefined'.
  //  Type 'unique symbol' is not assignable to type '"bar" | unique symbol | undefined'.
  return foo;
}

// ...will find a way to shoot themselves in the foot. We'll need to think about how users might
// construct edge cases like this in normal use, and how much type magic we care to entertain
// before we stop supporting it.
type Footgun<T> = T extends string ? never : T;
type Pebkac = Footgun<Foo>;
function why(foo: Foo): "bar" | Pebkac | undefined {
  if (foo === "foo") {
    return;
  }
  // Error expected when `Foo` is extended with `"baz"`.
  // Type '"bar" | "baz" | unique symbol' is not assignable to type '"bar" | unique symbol | undefined'.
  //  Type '"baz"' is not assignable to type '"bar" | unique symbol | undefined'.
  return foo;
}
