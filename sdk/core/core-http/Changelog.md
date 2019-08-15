# Changelog

## 1.0.0-preview.2 - 2019-08-05

- Removed `ServiceClientCredentials` type from `credentials` parameter of `ServiceClient` ([PR #4367](https://github.com/Azure/azure-sdk-for-js/pull/4367)).  Credential implementations are now standardized on `@azure/core-auth`'s `TokenCredential` interface and provided by `@azure/identity`.
- Added an `AccessTokenCache` so that access tokens can be cached across pipeline instances ([PR #4174](https://github.com/Azure/azure-sdk-for-js/pull/4174)).
- Fixed the issue preventing `ServiceClient` from correctly setting the scope's resource URI when creating a `BearerTokenAuthenticationPolicy` ([PR #4335](https://github.com/Azure/azure-sdk-for-js/pull/4335)).
- Migrated over `AxiosHttpClient` fixes from `@azure/ms-rest-js` ([PR #4106](https://github.com/Azure/azure-sdk-for-js/pull/4106)).

## 1.0.0-preview.1 - 2019-06-25

- Forked `@azure/ms-rest-js` to `@azure/core-http` to form the base HTTP pipeline of the Azure SDK TypeScript/JavaScript libraries.
- Added `TokenCredential` to define a simple interface for credentials that provided bearer tokens
- Added `BearerTokenAuthenticationPolicy` which can use a `TokenCredential` implementation to perform bearer token authentication against Azure services
