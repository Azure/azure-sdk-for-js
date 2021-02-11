# ts-package-json-required-scripts

Requires `scripts` in `package.json` to be contain `"build"` and `"test"`.

## Examples

### Good

```json
{
  "scripts": {
    "build": "...",
    "test": "..."
  }
}
```

```json
{
  "scripts": {
    "build": "...",
    "lint": "...",
    "test": "..."
  }
}
```

### Bad

```json
{
  "scripts": {
    "build": "..."
  }
}
```

```json
{
  "scripts": {}
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-required-scripts)
