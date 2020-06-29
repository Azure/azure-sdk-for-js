# ts-package-json-sideeffects

Requires `sideEffects` in `package.json` to be set to `false`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "sideEffects": false
}
```

### Bad

```json
{
  "sideEffects": true
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-sideeffects)
