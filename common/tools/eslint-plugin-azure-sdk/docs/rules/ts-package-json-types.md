# ts-package-json-types

Requires inclusion of type declarations in the package.

In practice, this means `types` in `package.json` must be set to a path pointing to a `.d.ts` file.

## Examples

### Good

```json
{
  "types": "types/index.d.ts"
}
```

### Bad

```json
{
  "types": "types/index.ts"
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-types)
