# ts-config-target

Requires `compilerOptions.target` in `tsconfig.json` to be set to a valid ECMAScript standard.

A valid ECMAScript standard is defined as any ECMASCript standard other than ES3 and ESNext

## Examples

### Good

```json
{
  "compilerOptions": {
    "target": "es6"
  }
}
```

### Bad

```json
{
  "compilerOptions": {
    "target": "es3"
  }
}
```

```json
{
  "compilerOptions": {
    "target": "esnext"
  }
}
```

```json
{
  "compilerOptions": {
    "target": 6
  }
}
```

```json
{
  "compilerOptions": {}
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-config-target)
