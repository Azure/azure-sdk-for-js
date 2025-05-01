# Release History

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
