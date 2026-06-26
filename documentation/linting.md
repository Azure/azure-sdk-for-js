We use recommended rules from `eslint`, `typescript-eslint`, and a set of our custom rules to ensure our code adhere to the Azure SDK design guidelines and have high quality.

In this document, we describe how to address common linting issues for a package.

# Azure SDK eslint plugin

Our custom linting rules and recommended configurations is hosted in the `@azure/eslint-plugin-azure-sdk` package. You MUST build it first before linting any SDK packages.

- `pnpm install`
- `pnpm turbo build --filter=@azure/eslint-plugin-azure-sdk...`

It also gets built as a dependency of any SDK packages.

# Linting a package

This is done by running `pnpm lint` under the package directory.

1. `cd sdk/<service-directory>/<package-directory>` if your current directory is not the package directory yet.
2. `pnpm lint`

# Fixing linting issues

You should NEVER turn off a rule in `@azure/eslint-plugin-azure-sdk` to resolve linting issues.

Some linting rules provide auto fixer. To use them, run `pnpm lint:fix` under the package directory.

For linting issues that `lint:fix` script could not resolve, you will need to examine the code and fix the issues accordingly.

For documentation on `eslint` rules, refer to https://eslint.org/docs/latest/rules/.

For documentation on `typescript-eslint` rules, refer to https://typescript-eslint.io/rules/

For a generated package whose name starts with `@azure/arm-` or `@azure-rest/`, there might be "tsdoc/syntax" warnings because generated code files often contains some characters in reference docs that are not recommended in TSDoc. We should NEVER fix auto-generated files. You can add rules to suppress the "tsdoc/syntax" rules in the package's ESLint configuration file eslint.config.mjs. Create that file by using one from other packages as a template but do not copy rules that don't apply.

# No dynamic module loading in production source

The shared config bans dynamic module loaders in `src/**` via the core
`no-restricted-syntax` rule: `createRequire(...)`, aliasing the global `require`
(`const r = require; r("pkg")`), and dynamic `import()` with a non-literal specifier
(`import(expr)`). These patterns load a module outside the static module
graph, so bundlers, api-extractor, and dependency linting can't see the dependency — which
lets a package acquire an **undeclared or dev-only runtime dependency** that resolves in the
monorepo but fails (often silently) for consumers.

What to do instead:

- Declare the package as a regular runtime `dependency` and `import` it statically with a
  literal specifier.
- If the functionality you need already exists behind an `@azure/core-*` abstraction, prefer
  routing through that abstraction instead of reaching for the underlying package directly.

This rule is a **core** ESLint rule (not an `@azure/eslint-plugin-azure-sdk` rule), so unlike
the plugin rules it **may** be disabled for a genuinely approved advanced case (e.g. a
platform shim). When you must, disable it on the specific line with a justification comment,
and emit an `@azure/logger` diagnostic if the load can fail (never a bare `catch {}`):

```ts
// eslint-disable-next-line no-restricted-syntax -- platform shim: <why this is unavoidable>
const mod = createRequire(import.meta.url)("optional-pkg");
```

**Known gap (accepted):** this rule covers the dynamic-loader mechanism. A plain
`import x from "dev-only-pkg"` from `src/**`, or a TS type query like
`typeof import("dev-only-pkg")`, is a dependency-declaration problem rather than a loader
problem; see the "Dev vs Runtime Boundary" section of
`.github/instructions/reviewer/dependencies.instructions.md`.

