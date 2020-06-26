# ts-package-json-repo

Requires `repository` in `package.json` to be set to `"github:Azure/azure-sdk-for-js"`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "repository": "github:Azure/azure-sdk-for-js"
}
```

### Bad

```json
{
  "repository": "github:Azure/azure-sdk-for-java"
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-repo)
