# ts-config-sourcemap

Requires `compilerOptions.sourceMap` and `compilerOptions.declarationMap` in `tsconfig.json` to be set to `true`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "compilerOptions": {
    "declarationMap": true,
    "sourceMap": true
  }
}
```

### Bad

```json
{
  "compilerOptions": {
    "declarationMap": false,
    "sourceMap": true
  }
}
```

````json
{
    "compilerOptions": {
        "sourceMap": true
    }
}
```

```json
{
    "compilerOptions": {}
}
````

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-config-sourcemap)
