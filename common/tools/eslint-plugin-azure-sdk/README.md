# eslint-plugin-azure-sdk

An ESLint plugin enforcing [design guidelines for the JavaScript/TypeScript Azure SDK](https://azure.github.io/azure-sdk/typescript_introduction.html).

## Installing and Building

**Note**: This is an internal package that can only be used within the azure-sdk-for-js monorepo.

To enable `@azure/eslint-plugin-azure-sdk`, you'll need to add it to the list of `devDependencies` in your `package.json`:

```javascript
{
  ...,
  "devDependencies": {
    ...,
    "@azure/eslint-plugin-azure-sdk": "^3.0.0",
    ...
  },
  ...
}
```

The ESLint plugin must be built from source as part of your package's depdendencies. The fastest way to build a single package and its dependencies is to run the command `pnpm build --filter=<package name>...`. For example, to rebuild the Form Recognizer package and all of its dependencies, we run `pnpm build --filter @azure/ai-form-recognizer...`. This will rebuild `eslint-plugin-azure-sdk` if necessary and make it available for use by the package's NPM scripts.

**You must rebuild `eslint-plugin-azure-sdk` after making changes to its own source files,** either using `pnpm build` as described above, or by entering the `common/tools/eslint-plugin-azure-sdk` directory (this directory) and running `pnpm build`. Since the plugin is linked internally as part of our monorepo, the package does not need to be installed again after it is rebuilt.

See [the contribution guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) for more details about contributing to the azure-sdk-for-js repository.

## Configuration

This plugin uses ESLint's [flat config](https://eslint.org/docs/latest/use/configure/configuration-files) format. Create an `eslint.config.mjs` file at the root of your package directory.

### Basic Usage

The simplest way to use this plugin is with the `config()` helper function:

```javascript
// eslint.config.mjs
import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config();
```

### With Custom Rules

You can pass custom configurations to extend or override the recommended settings:

```javascript
// eslint.config.mjs
import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    rules: {
      "@azure/azure-sdk/ts-config-moduleresolution": "off",
    },
  },
]);
```

### Available Configs

- `azsdkEslint.configs.recommended` - Recommended rules for Azure SDK packages
- `azsdkEslint.configs.recommendedTypeChecked` - Recommended rules with type-checked linting enabled
- `azsdkEslint.configs.recommendedStrict` - Opt-in stricter rules to catch hard-to-maintain code patterns. Includes `eslint-plugin-sonarjs` recommended rules plus structural caps (cognitive-complexity, max-lines-per-function, etc.) and additional code-smell rules.
- `azsdkEslint.configs.recommendedStrictTypeChecked` - Same as `recommendedStrict` plus type-checked rules (requires TypeScript project configuration).
- `azsdkEslint.configs.internal` - Configuration for internal/utility packages

### Opt-in Strict Preset

The `recommendedStrict` and `recommendedStrictTypeChecked` presets layer additional maintainability and code-smell rules on top of `recommended`. They are intended for new packages or as part of an incremental cleanup effort. **These presets are intentionally noisy on existing code** — treat findings as a backlog rather than blocking CI until you've triaged them.

> **Scope:** the strict delta only applies to files under any `src/` directory (`**/src/**`). Tests, samples, perf/stress harnesses, and build scripts intentionally bend many of these rules (long test functions, parameter mutation in mocks, deep sample scenarios), so the strict preset deliberately leaves them alone and only the underlying `recommended` rules apply there.

#### Usage

```js
// eslint.config.mjs
import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default [...azsdkEslint.configs.recommendedStrictTypeChecked];
```

Alternatively, use the `configStrict()` convenience helper (mirrors `config()` but based on `recommendedStrict`):

```js
// eslint.config.mjs
import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.configStrict();
```

#### Peer dependency

The strict preset requires `eslint-plugin-sonarjs` (peer dependency — add it explicitly to your `devDependencies` if not already present transitively):

```json
{
  "devDependencies": {
    "eslint-plugin-sonarjs": "^3.0.2"
  }
}
```

#### Rule categories added by the strict preset

- **Structural caps** — `max-lines-per-function`, `max-classes-per-file`, `@typescript-eslint/max-params`, `sonarjs/cognitive-complexity`
- **Anti "clever one-liner"** — `no-nested-ternary`, `no-unneeded-ternary`, `no-implicit-coercion`, `no-lonely-if`, `no-else-return`
- **Mutation / scoping** — `no-param-reassign` (kept at `warn`, tightened to flag property mutation), `@typescript-eslint/prefer-readonly` (type-checked)
- **Switch / control flow** — `curly: all`, `default-case`, `default-case-last`, `@typescript-eslint/consistent-return`, `@typescript-eslint/switch-exhaustiveness-check` (type-checked)
- **Imports** — `@typescript-eslint/consistent-type-imports` (promoted to error), `@typescript-eslint/no-import-type-side-effects`, `@typescript-eslint/no-deprecated` (type-checked). Note: core `no-duplicate-imports` is intentionally NOT enabled — it doesn't understand the type-only vs value-only distinction and would flag legitimately separate imports. `@typescript-eslint/consistent-type-imports` is the TypeScript-aware replacement.
- **Errors thrown / caught** — `no-empty` (no allowEmptyCatch), `@typescript-eslint/only-throw-error`, `@typescript-eslint/use-unknown-in-catch-callback-variable`, `@typescript-eslint/prefer-promise-reject-errors` (type-checked)
- **Async safety** — `no-await-in-loop` (warn), `no-promise-executor-return`, `require-atomic-updates`, `@typescript-eslint/return-await` (type-checked)
- **Dead / redundant code** — `no-useless-rename`, `no-useless-return`, `no-useless-concat`, `@typescript-eslint/no-unnecessary-condition`, `@typescript-eslint/no-unnecessary-type-arguments`, `@typescript-eslint/no-unnecessary-template-expression` (type-checked)
- **sonarjs code-smell rules** — Full `sonarjs/recommended` config with select high-noise rules silenced (`no-duplicate-string`, `no-commented-code`, `todo-tag`, `assertions-in-tests`)

### Custom Entry Point

If the main TypeScript entrypoint to your package is not in `src/index.ts`, set `settings.main` in your configuration:

```javascript
// eslint.config.mjs
import azsdkEslint from "@azure/eslint-plugin-azure-sdk";

export default azsdkEslint.config([
  {
    settings: {
      main: "index.ts",
    },
  },
]);
```

Some rules (see table below) are fixable using the `--fix` ESLint option (added in `1.3.0`).

## Supported Rules

### Key

| Symbol                    | Meaning                     |
| ------------------------- | --------------------------- |
| :triangular_flag_on_post: | Error                       |
| :warning:                 | Warning                     |
| :heavy_multiplication_x:  | Off                         |
| :heavy_check_mark:        | Fixable and autofix-enabled |
| :x:                       | Not fixable                 |

### Rules

| Rule                                                                                                                                                                                      | Default                   | Fixable            | Release |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------ | ------- |
| [**github-source-headers**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/github-source-headers.md)                                 | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-apisurface-standardized-verbs**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-apisurface-standardized-verbs.md)           | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-apisurface-supportcancellation**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-apisurface-supportcancellation.md)         | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-doc-internal**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-doc-internal.md)                                             | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-doc-internal-private-member**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-doc-internal-private-member.md)               | :triangular_flag_on_post: | :x:                | `3.1.0` |
| [**ts-error-handling**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-error-handling.md)                                         | :heavy_multiplication_x:  | :x:                | `1.1.0` |
| [**ts-modules-only-named**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-modules-only-named.md)                                 | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-naming-drop-noun**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-naming-drop-noun.md)                                     | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-naming-options**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-naming-options.md)                                         | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-naming-subclients**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-naming-subclients.md)                                   | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-no-const-enums**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-no-const-enums.md)                                         | :warning:                 | :heavy_check_mark: | `1.1.0` |
| [**ts-no-window**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-no-window.md)                                                   | :triangular_flag_on_post: | :heavy_check_mark: | `3.1.0` |
| [**ts-package-json-approved-dependencies**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-approved-dependencies.md) | :triangular_flag_on_post: | :x:                | `3.1.0` |
| [**ts-package-json-author**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-author.md)                               | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-bugs**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-bugs.md)                                   | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-engine-is-present**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-engine-is-present.md)         | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-package-json-files-required**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-files-required.md)               | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-package-json-homepage**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-homepage.md)                           | :triangular_flag_on_post: | :x:                | `1.0.0` |
| [**ts-package-json-keywords**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-keywords.md)                           | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-license**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-license.md)                             | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-main-is-cjs**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-main-is-cjs.md)                     | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-package-json-name**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-name.md)                                   | :triangular_flag_on_post: | :x:                | `1.0.0` |
| [**ts-package-json-repo**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-repo.md)                                   | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-required-scripts**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-required-scripts.md)           | :triangular_flag_on_post: | :x:                | `1.0.0` |
| [**ts-package-json-sdktype**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-sdktype.md)                             | :triangular_flag_on_post: | :x:                | `3.1.0` |
| [**ts-package-json-sideeffects**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-sideeffects.md)                     | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-types**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-types.md)                                 | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-pagination-list**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-pagination-list.md)                                       | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-use-interface-parameters**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-use-interface-parameters.md)                     | :warning:                 | :x:                | `1.1.0` |
| [**ts-use-promises**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-use-promises.md)                                             | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-versioning-semver**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-versioning-semver.md)                                   | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-use-cjs-polyfill**](https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-use-cjs-polyfill.md)                                     | :triangular_flag_on_post: | :x:                | `1.1.0` |
