# ts-package-json-name

Requires `name` in `package.json` to be set to `"@azure/<service-name>"`, with the service name in kebab-case.

## Examples

### Good

```json
{
  "name": "@azure/service-bus"
}
```

### Bad

```json
{
  "name": "@microsoft/service-bus"
}
```

```json
{
  "name": "service-bus"
}
```

```json
{
  "name": "@azure/serviceBus"
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-name)
