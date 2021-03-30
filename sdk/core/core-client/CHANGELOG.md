# Release History

## 1.1.0 (2021-03-30)

### Breaking Changes

- If the response body is empty and the mapper for it says it is nullable, then a null is returned.
- Updated @azure/core-tracing to version `1.0.0-preview.11`. See [@azure/core-tracing CHANGELOG](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/core/core-tracing/CHANGELOG.md) for details about breaking changes with tracing.

## 1.0.0 (2021-03-15)

GA release of this package.

## 1.0.0-beta.2 (2021-03-10)

- [Breaking] Removed `createSpanFunction` and `SpanConfig`. These have been moved into
  `@azure/core-tracing`.

## 1.0.0-beta.1 (2021-02-04)

- First release of package, see README.md for details.
- Changes from related functionality in `core-http`:
  - Replace URLBuilder with runtime-supported URL primitive.
  - Rewrite `ServiceClient` on top of `core-rest-pipeline` and remove unused codepaths.
  - Remove `_response` on operation results and replace with `onResponse` callback.
