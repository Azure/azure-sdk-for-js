# ts-no-const-enums

Recommends against the usage of TypeScript's const enums.

This rule is fixable using the `--fix` option.

## Examples

### Good

```ts
enum Directions {
  North,
  East,
  South,
  West
}
```

### Bad

```ts
const enum Directions {
  North,
  East,
  South,
  West
}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-no-const-enums)
