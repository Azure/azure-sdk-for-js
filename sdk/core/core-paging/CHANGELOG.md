# Release History

## 1.6.3 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.6.2 (2024-04-09)

### Other Changes

- Revert TypeScript output target to ES2017.

## 1.6.1 (2024-03-20)

### Other Changes

- Add top-level `browser` field to `package.json` as fallback for legacy bundlers that do not support the `exports` field.

## 1.6.0 (2024-03-12)

### Other Changes

- Migrated the codebase to ESM. This change is internal and should not affect customers.
- Migrated unit tests to vitest.

## 1.5.0 (2023-02-02)

### Features Added

- Add basic types from cadl azure core.

## 1.4.0 (2022-11-03)

### Features Added

- Add `toElements` function to convert a page to a list of elements

### Other Changes

- Allow `PagedResault.getPage()` to return `undefined`, indicating no more pages left. This avoids having to return a page of empty array in the scenario where the total number of elements is unknown, service doesn't indicate whether there are more results, and we rely on service returning empty result to know that enumeration is done.

## 1.3.0 (2022-05-18)

### Other Changes

- The default implementation of `byPage` now supports using the continuationToken option as a URL for the page to get first.

## 1.2.1 (2022-01-06)

### Bugs Fixed

- Use a TS v3.4-friendly iterator protocol [PR# 19507](https://github.com/Azure/azure-sdk-for-js/pull/19507). Fixed [Issue 19394](https://github.com/Azure/azure-sdk-for-js/issues/19394)

## 1.2.0 (2021-08-30)

### Features Added

- Add `getPagedAsyncIterator` that does the heavy lifting to build a paged async iterator.

## 1.1.3 (2020-09-30)

- Also pack `esm` build in addition to `commonjs` build. This fixes the warning about `core-paging` in Angular 10 applications [Issue 11550](https://github.com/Azure/azure-sdk-for-js/issues/11550).

## 1.1.2 (2020-09-02)

- Provided down-leveled type declaration files to support older TypeScript versions 3.1 to 3.6.
  [PR 10599](https://github.com/Azure/azure-sdk-for-js/pull/10599)

## 1.1.1 (2020-04-02)

- The generic argument `PageT` now has default type of `T[]`. (PR #7569)

## 1.1.0 (2020-02-28)

- Added new generic argument to `PagedAsyncIterableIterator` for custom `PageSettings` for services that use client-driven paging or other paging patterns.

## 1.0.0 (2019-10-29)

This release marks the general availability of the `@azure/core-paging` package.

## 1.0.0-preview.2 (2019-09-09)

Updates `PagedAsyncIterableIterator.next` return type to be compatible with TypeScript 3.6.x. (PR #4928)
