## 1.0.1 - 2019-12-04

Fixes the [bug 6271](https://github.com/Azure/azure-sdk-for-js/issues/6271) that can occur with angular prod builds due to triple-slash directives.
([PR 6344](https://github.com/Azure/azure-sdk-for-js/pull/6344))

## 1.0.0 - 2019-10-29

This release marks the general availability of the `@azure/abort-controller` package.

Removed the browser bundle. A browser-compatible library can still be created through the use of a bundler such as Rollup, Webpack, or Parcel.
([#5860](https://github.com/Azure/azure-sdk-for-js/pull/5860))

## 1.0.0-preview.2 - 2019-09-09

Listeners attached to an `AbortSignal` now receive an event with the type `abort`. (PR #4756)
