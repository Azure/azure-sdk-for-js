# Release History

## 0.2.0 (2025-05-03)

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
