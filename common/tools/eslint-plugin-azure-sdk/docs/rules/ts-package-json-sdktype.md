# ts-package-json-sdktype

Requires the existence of the `sdk-type` field and be either 'client', 'mgmt', or 'utility'.

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

```json
{
  "sdk-type": "utility"
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
  "sdk-type": true
}
```

```json
{
  "not-sdk-type": "client"
}
```

```json
{
  "outer": {
    "sdk-type": "client"
  }
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.
