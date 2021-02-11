# ts-config-lib

Requires `compilerOptions.lib` in `tsconfig.json` to be set to an empty array.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "compilerOptions": {
    "lib": []
  }
}
```

### Bad

```json
{
  "compilerOptions": {
    "lib": "exnext"
  }
}
```

```json
{
  "compilerOptions": {
    "lib": ["esnext", "dom"]
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

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-config-lib)
