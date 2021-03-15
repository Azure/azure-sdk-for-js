# Release History

## 1.0.0 (2021-03-15)

GA release of this package.

- Fix serialization of body of false ([#14218](https://github.com/Azure/azure-sdk-for-js/pull/14218))
- Set custom headers after serializing headers ([#14268](https://github.com/Azure/azure-sdk-for-js/pull/14268))
- Allow setting empty query parameter values ([#14260](https://github.com/Azure/azure-sdk-for-js/pull/14260))

## 1.0.0-beta.2 (2021-03-10)

- [Breaking] Removed `createSpanFunction` and `SpanConfig`. These have been moved into
  `@azure/core-tracing`.

## 1.0.0-beta.1 (2021-02-04)

- First release of package, see README.md for details.
- Changes from related functionality in `core-http`:
  - Replace URLBuilder with runtime-supported URL primitive.
  - Rewrite `ServiceClient` on top of `core-rest-pipeline` and remove unused codepaths.
  - Remove `_response` on operation results and replace with `onResponse` callback.
