# ts-config-moduleresolution

Requires `compilerOptions.moduleResolution` in `tsconfig.json` to be set to `"node"`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

### Bad

```json
{
  "compilerOptions": {
    "moduleResolution": "classic"
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

If you aren't targeting Node.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-config-moduleresolution)
