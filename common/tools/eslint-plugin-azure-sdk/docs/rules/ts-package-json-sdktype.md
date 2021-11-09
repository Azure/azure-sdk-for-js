# ts-package-json-sdktype

Requires the existence of the `sdk-type` field and be either 'client' or 'mgmt'.

## Examples

### Good

```json
{
  "sdk-type": "client"
}
```

```json
{
  "sdk-type": "mgmt"
}
```

### Bad

```json
{
  "sdk-type": "invalid"
}
```

```json
{
  "sdk-type": 1
}
```

```json
{
  "not-sdk-type": "client"
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.
