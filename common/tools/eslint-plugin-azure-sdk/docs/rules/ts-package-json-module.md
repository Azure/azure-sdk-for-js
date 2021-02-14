# ts-package-json-module

Requires `module` in `package.json` to be set to the ES6 entrypoint of the package. It is assumed that this is `"dist-esm/src/index.js"`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "module": "dist-esm/src/index.js"
}
```

### Bad

```json
{
  "module": "dist-esm/src/lib/index.js"
}
```

```json
{
  "module": "dist/index.js"
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-module)
