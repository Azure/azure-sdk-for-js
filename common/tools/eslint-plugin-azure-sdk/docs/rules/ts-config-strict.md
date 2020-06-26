# ts-config-strict

Requires `compilerOptions.strict` in `tsconfig.json` to be set to `false`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "compilerOptions": {
    "strict": false
  }
}
```

### Bad

```json
{
  "compilerOptions": {
    "strict": true
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

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-config-strict)
