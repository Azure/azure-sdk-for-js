# ts-package-json-keywords

Requires `keywords` in `package.json` to include `"azure"` and `"cloud"`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "keywords": ["azure", "cloud"]
}
```

```json
{
  "keywords": ["azure", "cloud", "sdk"]
}
```

### Bad

```json
{
  "keywords": ["azure"]
}
```

```json
{
  "keywords": []
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-keywords)
