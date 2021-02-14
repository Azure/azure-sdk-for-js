# ts-package-json-bugs

Requires `bugs` in `package.json` to be set to `"https://github.com/Azure/azure-sdk-for-js/issues"`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "bugs": {
    "url": "https://github.com/Azure/azure-sdk-for-js/issues"
  }
}
```

### Bad

```json
{
  "bugs": {
    "url": "https://github.com/Azure/azure-sdk-for-java/issues"
  }
}
```

```json
{
  "bugs": {}
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-bugs)
