# Release History

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
