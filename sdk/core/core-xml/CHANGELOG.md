# Release History

## 1.2.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.2.1 (2022-05-05)

### Bugs Fixed

- Add a `react-native` mapping to use `fast-xml-parser` for xml building/parsing as it is already in our dependency list.  With this customers don't need to polyfill the DOM api for XML processing.

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
