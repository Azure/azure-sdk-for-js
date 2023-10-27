# ts-package-json-main-is-cjs

Requires `main` in `package.json` to be point to a CommonJS or UMD module. In this case, its assumed that it points to `"dist/index.js"` or `"dist/index.cjs"`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "main": "dist/index.js"
}
```

### Good

```json
{
  "main": "dist/index.cjs"
}
```

### Bad

```json
{
  "main": "dist/src/index.js"
}
```

```json
{
  "main": "dist-esm/src/index.js"
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-main-is-cjs)
