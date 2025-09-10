# Release History

## 2.5.1 (2025-09-11)

### Other Changes

- Upgrade `@azure/*` dependencies to latest versions.

## 2.5.0 (2025-07-10)

### Other Changes

- Update `engines` to `"node": ">=20.0.0"`. Please refer to our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more information on our supported Node.js versions.

## 2.4.0 (2025-05-01)

### Other Changes

- Depend on `@typespec/ts-http-runtime`. [PR #33948](https://github.com/Azure/azure-sdk-for-js/pull/33948)

## 2.3.5 (2025-04-07)

### Features Added

- `asNodeStream` now returns a `NodeJSReadableStream` which can be canceled by calling the `destroy` method.

### Other Changes

- Handling REST errors that don't have a response body.

## 2.3.4 (2025-03-06)

### Bugs Fixed

- `asNodeStream` and `asBrowserStream` now throw when called in the incorrect environment instead of returning the wrong type of stream. PR [#33138](https://github.com/Azure/azure-sdk-for-js/pull/33138)

## 2.3.3 (2025-02-06)

### Bugs Fixed

- Handle error responses with no body without causing a `TypeError`. PR [#32566](https://github.com/Azure/azure-sdk-for-js/pull/32566)
- Content-Type header now defaults to `application/json` instead of `application/json; charset=UTF-8` to conform to the HTTP standard. PR [#32672](https://github.com/Azure/azure-sdk-for-js/pull/32672)

## 2.3.2 (2025-01-10)

### Bugs Fixed

- Allow dashes (`-`) in path parameter identifiers. PR [#31731](https://github.com/Azure/azure-sdk-for-js/pull/31731)

## 2.3.1 (2024-10-10)

### Bugs Fixed

- Allow `number` path parameters. PR [#31352](https://github.com/Azure/azure-sdk-for-js/pull/31352/files)

## 2.3.0 (2024-10-03)

### Features Added

- Add support for `allowReserved` (in query and path parameters) and `explode` (in query parameters only). PR [#31058](https://github.com/Azure/azure-sdk-for-js/pull/31058/files)

## 2.2.0 (2024-07-11)

### Other Changes

- Update serialization to not serialize Uint8Array if the content type is "application/json".

## 2.1.0 (2024-06-27)

### Features Added

- The `onResponse` callback will now be called when the underlying request results in an error. In this scenario, the error to be thrown will be provided as the second argument to the callback.

## 2.0.0 (2024-04-25)

### Breaking Changes

- Changed the format accepted for `multipart/form-data` requests.

## 1.4.0 (2024-04-09)

### Features Added

- Support accept in headers.

### Other Changes

- Revert TypeScript output target to ES2017.

## 1.3.1 (2024-03-20)

### Other Changes

- Add top-level `browser` field to `package.json` as fallback for legacy bundlers that do not support the `exports` field.

## 1.3.0 (2024-03-12)

### Features Added

- Allow customers to set request content type by `option.contentType` or `content-type` request headers.

### Bugs Fixed

- Set the content-type as `undefined` if it's a non-json string in the body and we are unknown of the content-type, but remain to be `application/json` if it's json string.

### Other Changes

- Migrated the codebase to ESM. This change is internal and should not affect customers.
- Migrated unit tests to vitest.

## 1.2.0 (2024-02-01)

### Features Added

- Add a new property endpoint in ClientOptions and mark the baseUri as deprecated to encourage people to use endpoint.

### Bugs Fixed

- Fixed an issue where `multipart/form-data` requests with an array of files as a parameter would not work if any of the files were supplied as a `Uint8Array`.

### Other Changes

- Upgrade dependency `@azure/abort-controller` to `^2.0.0`.

## 1.1.7 (2024-01-02)

### Bugs Fixed

- Fix serialization of binary data in `multipart/form-data` requests and in binary request bodies.
- Fix the issue where onResponse is not called when `asNodeStream` or `asBrowserStream` are called.

## 1.1.6 (2023-11-30)

### Features Added

- Add an overload for `createRestError` to accept `PathUncheckedResponse` only.

## 1.1.5 (2023-11-20)

### Bugs Fixed

- Keeps request body of raw bytes for requests with `application/octet-stream` content type.

## 1.1.4 (2023-07-06)

### Features Added

- Add `timeout`, `onUploadProgress`, `onDownloadProgress`, `abortSignal`, `tracingOptions`, `onResponse` in the `RequestParameters` for better RLC user experience.
- Add `OperationOptions` for better modular user experience.
- Correctly handle `allowInsecureConnection` handling when `undefined` is passed in `RequestParameters`. See https://github.com/Azure/autorest.typescript/issues/1916 for details.

## 1.1.3 (2023-05-04)

### Features Added

- Add loggingOptions in ClientOptions for logger support.

## 1.1.2 (2023-04-06)

### Bugs Fixed

- fix unexpected url encoding when apiVersionPolicy applies and even if we have passed the skipUrlEncoding as true in the request.

## 1.1.1 (2023-03-02)

### Bug Fixed

- Fix issue where multiple parameters within same path segment are not replaced correctly [24997](https://github.com/Azure/azure-sdk-for-js/pull/24997)

## 1.1.0 (2023-02-02)

### Features Added

- Add basic types from cadl azure core.

## 1.0.1 (2023-01-05)

### Fixes

- Fix the `api-version` precedence issue in apiVersionPolicy. [23990](https://github.com/Azure/azure-sdk-for-js/pull/23990)

## 1.0.0 (2022-08-04)

- Releasing the first stable version of @azure-rest/client

### Fixes

- Fix the duplicate `api-version` issue in apiVersionPolicy

## 1.0.0-beta.10 (2022-06-07)

### Fixes

- Fix to avoid skip `JSON.stringify` when the body is already a string. [20753](https://github.com/Azure/azure-sdk-for-js/pull/20753)

### Other Changes

- Create new pipeline using @azure/core-rest-pipeline's `createPipelineFromOptions`, instead of a custom pipeline. [#21949](https://github.com/Azure/azure-sdk-for-js/pull/21949)
- Fix URL encoding for query parameters. [#20972](https://github.com/Azure/azure-sdk-for-js/pull/20972)

## 1.0.0-beta.9 (2022-04-07)

### Features Added

- Handle Binary and FormData content. [#18753](https://github.com/Azure/azure-sdk-for-js/pull/18753)
- Support custom base url with path parameters. [#19463](https://github.com/Azure/azure-sdk-for-js/pull/19463)
- Added new `ClientOptions` member `additionalPolicies` to allow passing custom pipeline policies to client constructors. [#20175](https://github.com/Azure/azure-sdk-for-js/pull/20175)

## 1.0.0-beta.8 (2021-11-04)

### Other Changes

- Add options skipUrlEncoding to support skip path parameter encoding. [#18381](https://github.com/Azure/azure-sdk-for-js/pull/18381)
- Adding more robust handling of request and response body. [#18478](https://github.com/Azure/azure-sdk-for-js/pull/18478)

## 1.0.0-beta.7 (2021-09-02)

### Other Changes

- Create pipeline from scratch excluding tracingPolicy to decrease bundle size. [#17015](https://github.com/Azure/azure-sdk-for-js/pull/17015)
- Allow number and boolean as input headers. [#17358](https://github.com/Azure/azure-sdk-for-js/pull/17358)

## 1.0.0-beta.6 (2021-08-05)

### Fixes

- Fixed exported types [#15898](https://github.com/Azure/azure-sdk-for-js/pull/15898)

## 1.0.0-beta.5 (2021-06-24)

### Features Added

- Expose client option to set `allowInsecureConnection` to support http. [#15831](https://github.com/Azure/azure-sdk-for-js/pull/15831)
- Add new createRestError which takes a response to create a RestError. [#15831](https://github.com/Azure/azure-sdk-for-js/pull/15831)

## 1.0.0-beta.4 (2021-05-27)

- Update @azure/core-rest-pipeline dependency to GA. [#15435](https://github.com/Azure/azure-sdk-for-js/pull/15435)

## 1.0.0-beta.3 (2021-05-26)

- Set Date in query string parameters as ISO string. [#15209](https://github.com/Azure/azure-sdk-for-js/pull/15209)

## 1.0.0-beta.2 (2021-05-12)

- Add CertificateCredential to support client certificate authentication. [#15172](https://github.com/Azure/azure-sdk-for-js/pull/15172)

## 1.0.0-beta.1 (2021-04-22)

- First release of package, see README.md for details.
