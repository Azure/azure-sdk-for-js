# ts-catch-error-any

Discourage usage of `any` as the catch variable type. Users should narrow the type of a catch variable before processing it, or justify the usage of `any` suppress this rule explicitly.

Starting from TypeScript v4.4, the catch variables' type now defaults to `unknown`. It is more correct and forces users to test against arbitrary values. See the following TypeScript doc for more details:

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-4.html#defaulting-to-the-unknown-type-in-catch-variables---useunknownincatchvariables

## Examples

### Good

    {
      code: "try {} catch (e: unknown) {}",
    },
    {
      code: "try {} catch (e: RestError) {}",
    },
    {
      code: "try {} catch (e: Error) {}",
    },

```ts
try {
} catch (e: unknown) {
  if (error instanceof Error) {
  }
}
```

```ts
try {
} catch (e: RestError) {}
```

```ts
try {
} catch (e: Error) {}
```

### Bad

```ts
try {
} catch (e: any) {
  assert.equal(e.message, "some error");
}
```

## When to turn off

If your SDK doesn't intend to support cancellation.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-apisurface-supportcancellation)
