# Release History

## 0.3.1 (2025-09-11)

### Other Changes

- Improve RestError logging by including only essential agent information in the request [#35839](https://github.com/Azure/azure-sdk-for-js/pull/35839)
- Avoid regex for matching log level [#34247](https://github.com/Azure/azure-sdk-for-js/pull/34247)
- Upgrade `@azure/*` dependencies to latest versions.

## 0.3.0 (2025-07-10)

### Other Changes

- Update `engines` to `"node": ">=20.0.0"`. Please refer to our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more information on our supported Node.js versions.

## 0.2.3 (2025-06-10)

### Features Added

- Added `authSchemes` to `PipelineRequestOptions`. [#34587](https://github.com/Azure/azure-sdk-for-js/pull/34587)

### Bugs Fixed

- Fix an issue where `AZURE_LOG_LEVEL` environment variable is not properly respected. [#34444](https://github.com/Azure/azure-sdk-for-js/pull/34444)

## 0.2.2 (2025-05-01)

### Features Added

- Add an optional `requestOverrides` property to `PipelineRequest` and `PipelineRequestOptions`.

### Other Changes

- Add `internal/` subpath. This subpath contains internal definitions that are for private use only; stability is not guaranteed.

## 0.2.1 (2025-04-08)

### Bugs Fixed

- Fix an issue where insecure connection setting was not properly propagated through the client options.

## 0.2.0 (2025-03-25)

### Features Added

- Add support for multiple authentication schemes through the new `authSchemes` property in `ClientOptions`
- Add new authentication types: `ApiKeyAuthScheme`, `BasicAuthScheme`, `BearerAuthScheme`, `OAuth2AuthScheme`
- Add new credential types: `OAuth2TokenCredential`, `BearerTokenCredential`, `BasicCredential`, `ApiKeyCredential`, and `ClientCredential`

### Breaking Changes

- Remove `TokenCredential` and `KeyCredential` interfaces for new authentication schemes support
- Change `ClientOptions` to use `authSchemes` and `credential` instead of the previous `credentials` property
- Update to use standard `AbortSignal` instead of custom `AbortSignalLike` interface

## 0.1.0 (2024-12-03)

### Features Added

- Initial release of the `@typespec/ts-http-runtime` package.
