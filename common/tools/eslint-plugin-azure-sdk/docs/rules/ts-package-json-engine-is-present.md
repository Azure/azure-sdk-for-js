# ts-package-json-engine-is-present

Requires support for all Node LTS version.

Currently, this requires `engines` in `package.json` to contain an entry for `node` set to `">=12.0.0"` unless a `nodeVersionOverride` value is present.

This rule is fixable using the `--fix` option.

## Examples

### Good

```json
{
  "engines": {
    "node": ">=12.0.0"
  }
}
```

### Bad

```json
{
  "engine": {
    "node": ">=12.0.0"
  }
}
```

```json
{
  "engine": ">=6.0.0"
}
```

```json
{
  "engine": ">=10.0.0"
}
```

```json
{}
```

## When to turn off

Only if the rule breaks.

## Options

This rule as an object option:

- `"nodeVersionOverride"`: allow providing a custom supported node version if an external dependency enforces it

### nodeVersionOverride

Example of **correct** code for this rule with the `{ "nodeVersionOverride": ">=10.0.0" }` option:

```json
{
  "engines": {
    "node": ">=10.0.0"
  }
}
```

## [Source](https://azure.github.io/azure-sdk/typescript_implementation.html#ts-package-json-engine-is-present)

Also encompasses [ts-node-support](https://azure.github.io/azure-sdk/typescript_design.html#ts-node-support), as the rules are similar enough to not exist separately for linting purposes.
