# Release History

## 1.1.1 (2020-04-02)

- The generic argument `PageT` now has default type of `T[]`. (PR #7569)

## 1.1.0 (2020-02-28)

- Added new generic argument to `PagedAsyncIterableIterator` for custom `PageSettings` for services that use client-driven paging or other paging patterns.

## 1.0.0 (2019-10-29)

This release marks the general availability of the `@azure/core-paging` package.

## 1.0.0-preview.2 (2019-09-09)

Updates `PagedAsyncIterableIterator.next` return type to be compatible with TypeScript 3.6.x. (PR #4928)
