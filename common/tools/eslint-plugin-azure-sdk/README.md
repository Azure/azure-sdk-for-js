# eslint-plugin-azure-sdk

An ESLint plugin enforcing [design guidelines for the JavaScript/TypeScript Azure SDK](https://azure.github.io/azure-sdk/typescript_introduction.html).

## Installation

You'll first need to install [ESLint](http://eslint.org):

```shell
npm i eslint --save-dev
```

Next, install `@azure/eslint-plugin-azure-sdk`:

```shell
npm install @azure/eslint-plugin-azure-sdk --save-dev
```

## Usage

The `azure-sdk-for-js` repository contains a base `.eslintrc.json` file at the root of the `sdk` directory.

To enable `@azure/eslint-plugin-azure-sdk`, you'll need to add another `.eslintrc.json` file at the same location as your `package.json` file as follows: (note that the path to the base `.eslintrc.json` file may be different)

```json
{
  "plugins": ["@azure/azure-sdk"],
  "extends": ["../../.eslintrc.json", "plugin:@azure/azure-sdk/recommended"],
  "parserOptions": {
    "createDefaultProgram": true
  }
}
```

If the main TypeScript entrypoint to your package is not in `src/index.ts`, set `settings.main` in your `.eslintrc` configuration file to the entrypoint as follows (for example, if the entrypoint is `index.ts`):

```json
{
  "plugins": ["@azure/azure-sdk"],
  "extends": ["../../.eslintrc.json", "plugin:@azure/azure-sdk/recommended"],
  "parserOptions": {
    "createDefaultProgram": true
  },
  "settings": {
    "main": "index.ts"
  }
}
```

If you need to modify or disable specific rules, you can do so in the `rules` section of your `.eslintrc` configuration file. For example, if you are not targeting Node, disable `ts-config-moduleresolution` as follows:

```json
{
  "plugins": ["@azure/azure-sdk"],
  "extends": ["../../.eslintrc.json", "plugin:@azure/azure-sdk/recommended"],
  "parserOptions": {
    "createDefaultProgram": true
  },
  "rules": {
    "@azure/azure-sdk/ts-config-moduleresolution": "off"
  }
}
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

| Rule                                                                                                                                      | Default                   | Fixable            | Release |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------ | ------- |
| [**github-source-headers**]https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/github-source-headers.md)                                           | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-apisurface-standardized-verbs**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-apisurface-standardized-verbs.md)                     | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-apisurface-supportcancellation**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-apisurface-supportcancellation.md)                   | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-config-allowsyntheticdefaultimports**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-allowsyntheticdefaultimports.md)         | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-declaration**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-declaration.md)                                           | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-esmoduleinterop**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-esmoduleinterop.md)                                   | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-exclude**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-exclude.md)                                                   | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-forceconsistentcasinginfilenames**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-forceconsistentcasinginfilenames.md) | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-importhelpers**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-importhelpers.md)                                       | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-lib**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-lib.md)                                                           | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-module**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-module.md)                                                     | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-moduleresolution**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-moduleresolution.md)                                 | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-config-no-experimentaldecorators**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-no-experimentaldecorators.md)               | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-sourcemap**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-sourcemap.md)                                               | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-strict**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-strict.md)                                                     | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-config-target**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-config-target.md)                                                     | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-doc-internal**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-doc-internal.md)                                                       | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-error-handling**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-error-handling.md)                                                   | :heavy_multiplication_x:  | :x:                | `1.1.0` |
| [**ts-modules-only-named**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-modules-only-named.md)                                           | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-naming-drop-noun**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-naming-drop-noun.md)                                               | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-naming-options**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-naming-options.md)                                                   | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-naming-subclients**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-naming-subclients.md)                                             | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-no-const-enums**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-no-const-enums.md)                                                   | :warning:                 | :heavy_check_mark: | `1.1.0` |
| [**ts-no-namespaces**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-no-namespaces.md)                                                     | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-package-json-author**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-author.md)                                         | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-bugs**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-bugs.md)                                             | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-engine-is-present**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-engine-is-present.md)                   | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-package-json-files-required**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-files-required.md)                         | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-package-json-homepage**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-homepage.md)                                     | :triangular_flag_on_post: | :x:                | `1.0.0` |
| [**ts-package-json-keywords**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-keywords.md)                                     | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-license**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-license.md)                                       | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-main-is-cjs**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-main-is-cjs.md)                               | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-package-json-module**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-module.md)                                         | :triangular_flag_on_post: | :heavy_check_mark: | `1.1.0` |
| [**ts-package-json-name**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-name.md)                                             | :triangular_flag_on_post: | :x:                | `1.0.0` |
| [**ts-package-json-repo**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-repo.md)                                             | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-required-scripts**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-required-scripts.md)                     | :triangular_flag_on_post: | :x:                | `1.0.0` |
| [**ts-package-json-sideeffects**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-sideeffects.md)                               | :triangular_flag_on_post: | :heavy_check_mark: | `1.0.0` |
| [**ts-package-json-types**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-package-json-types.md)                                           | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-pagination-list**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-pagination-list.md)                                                 | :triangular_flag_on_post: | :x:                | `1.2.0` |
| [**ts-use-interface-parameters**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-use-interface-parameters.md)                               | :warning:                 | :x:                | `1.1.0` |
| [**ts-use-promises**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-use-promises.md)                                                       | :triangular_flag_on_post: | :x:                | `1.1.0` |
| [**ts-versioning-semver**](https://github.com/Azure/azure-sdk-for-js/blob/master/common/tools/eslint-plugin-azure-sdk/docs/rules/ts-versioning-semver.md)                                             | :triangular_flag_on_post: | :x:                | `1.1.0` |
