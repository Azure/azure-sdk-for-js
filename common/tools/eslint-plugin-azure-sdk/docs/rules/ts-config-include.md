> docs\rules\ts-config-include.md

# ts-config-include

Requires `include` in `tsconfig.json` to at least include `src/**/*.ts`, `test/**/*.ts`, and `samples-dev/**/*.ts`.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "include": ["src/**/*.ts", "test/**/*.ts", "samples-dev/**/*.ts"]
}
```

```json
{
  "include": ["src/**/*.ts", "test/**/*.ts", "samples-dev/**/*.ts", "other/*.ts"]
}
```

### Bad

```json
{
  "include": ["src/**/*.ts", "test/**/*.ts"]
}
```

```json
{
  "include": []
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## [Source](https://azure.github.io/azure-sdk/typescript_design.html#ts-config-include)
