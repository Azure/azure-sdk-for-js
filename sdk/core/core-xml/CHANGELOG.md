# Release History

## 1.4.3 (2024-08-01)

### Other Changes

- Adding React-Native support at top level [PR #30493](https://github.com/Azure/azure-sdk-for-js/pull/30493)

## 1.4.2 (2024-04-09)

### Other Changes

- Revert TypeScript output target to ES2017.

## 1.4.1 (2024-03-20)

### Other Changes

- Add top-level `browser` field to `package.json` as fallback for legacy bundlers that do not support the `exports` field.

## 1.4.0 (2024-03-12)

### Other Changes

- Migrated the codebase to ESM. This change is internal and should not affect customers.
- Migrated unit tests to vitest.

## 1.3.4 (2023-06-20)

### Other Changes

- Bump dependency `fast-xml-parser` version to `^4.2.4` to address security issue https://security.snyk.io/vuln/SNYK-JS-FASTXMLPARSER-5668858

## 1.3.3 (2023-03-02)

### Other Changes

- port https://github.com/Azure/ms-rest-js/pull/475 [PR # 24962](https://github.com/Azure/azure-sdk-for-js/pull/24962)

## 1.3.2 (2023-01-05)

### Other Changes

- Fix excess escaping of nested XML entities. [PR #24356](https://github.com/Azure/azure-sdk-for-js/pull/24356)

## 1.3.1 (2022-11-21)

### Bugs Fixed

- Support for CDATA in browser XML now fixed

## 1.3.0 (2022-08-04)

### Features Added

- Add support for CDATA secions with the `cdataPropName`
- Add support for exempting nodes from parsing with `stopNodes`.

### Other Changes

- Address Trusted Types compliance issue.

## 1.2.1 (2022-05-05)

### Bugs Fixed

- Add a `react-native` mapping to use `fast-xml-parser` for xml building/parsing as it is already in our dependency list. With this customers don't need to polyfill the DOM api for XML processing.

## 1.2.0 (2022-02-03)

### Other Changes

- Fix root version node handling difference with fxp v3. [#20035](https://github.com/Azure/azure-sdk-for-js/pull/20035)
- Upgrade to `fast-xml-parser` to v4 [PR# 19898](https://github.com/Azure/azure-sdk-for-js/pull/19898)

## 1.1.0 (2022-01-06)

### Other Changes

- Migrate to depend on `fast-xml-parser` for XML parsing/building [PR# #17792](https://github.com/Azure/azure-sdk-for-js/pull/17792)

## 1.0.0 (2021-08-05)

GA release of this package.

## 1.0.0-beta.1 (2021-02-04)

- First release of package. Exported XML helpers for client packages that need XML support, see README.md for details.
