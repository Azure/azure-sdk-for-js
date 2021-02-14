# ts-config-module

Requires `compilerOptions.module` in `tsconfig.json` to be set to `"es6"`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "compilerOptions": {
    "module": "es6"
  }
}
```

### Bad

```json
{
  "compilerOptions": {
    "module": "es5"
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

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-config-module)
