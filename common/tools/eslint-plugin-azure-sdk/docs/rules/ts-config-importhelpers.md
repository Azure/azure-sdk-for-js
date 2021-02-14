# ts-config-importhelpers

Requires `compilerOptions.importHelpers` in `tsconfig.json` to be set to `true`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "compilerOptions": {
    "importHelpers": true
  }
}
```

### Bad

```json
{
  "compilerOptions": {
    "importHelpers": false
  }
}
```

```json
{
  "compilerOptions": {}
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-config-importhelpers)
