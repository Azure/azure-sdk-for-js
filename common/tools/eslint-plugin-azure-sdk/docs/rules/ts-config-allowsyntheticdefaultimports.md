# ts-config-allowsyntheticdefaultimports

Requires `compilerOptions.allowSyntheticDefaultImports` in `tsconfig.json` to be set to `true`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true
  }
}
```

### Bad

```json
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": false
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

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-config-allowsyntheticdefaultimports)
