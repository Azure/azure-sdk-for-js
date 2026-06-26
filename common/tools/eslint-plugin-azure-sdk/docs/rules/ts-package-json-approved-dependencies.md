# ts-package-json-approved-dependencies

Prevents shipped libraries from taking unapproved third-party runtime
dependencies.

Only packages with `"sdk-type": "client"` or `"sdk-type": "mgmt"` are checked.
Samples, tests, perf tests, and utility/tooling packages are out of scope, and
only the `dependencies` field is checked — `devDependencies` and
`peerDependencies` are ignored.

A runtime dependency is allowed when it is either:

- first-party — its name starts with `@azure/`, `@azure-rest/`, `@azure-tools/`,
  `@microsoft/`, or `@typespec/`; or
- listed in the central allow-list at
  [`eng/approved-third-party-dependencies.yml`](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/approved-third-party-dependencies.yml),
  either under `allowed` (available to every package) or under an `exceptions`
  entry that names the package.

Allow-list entries are usually exact package names, but a **scope wildcard** of
the form `@scope/*` is also supported and matches every package published under
that npm scope. Scope wildcards work in both `allowed` and `exceptions`. For
example, `"@opentelemetry/*"` under `allowed` approves every `@opentelemetry/...`
package for every shipped library.

To take a new third-party runtime dependency, get it approved and then add it to
the allow-list. See
[dependency management](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/dependency-management.md#adding-a-new-third-party-runtime-dependency).

## Examples

### Good

```json
{
  "name": "@azure/example",
  "sdk-type": "client",
  "dependencies": {
    "@azure/core-rest-pipeline": "^1.0.0",
    "tslib": "^2.6.2"
  }
}
```

### Bad

```json
{
  "name": "@azure/example",
  "sdk-type": "client",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

## When to turn off

This rule should not be turned off. New third-party runtime dependencies in
shipped libraries require approval.

## Options

- `"configPath"`: overrides the location of the allow-list file. Intended for
  testing; in the monorepo the file is resolved relative to the repository root
  automatically.
