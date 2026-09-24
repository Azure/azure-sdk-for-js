# ts-package-json-sideeffects

Requires `sideEffects` in `package.json` to be `true` for `sdk-type: provisioning` and `false` for other SDK types. Provisioning resources register constructors and shapes at load time.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "sdk-type": "client",
  "sideEffects": false
}
```

```json
{
  "sdk-type": "provisioning",
  "sideEffects": true
}
```

### Bad

```json
{
  "sdk-type": "client",
  "sideEffects": true
}
```

```json
{
  "sdk-type": "provisioning",
  "sideEffects": false
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-sideeffects)
