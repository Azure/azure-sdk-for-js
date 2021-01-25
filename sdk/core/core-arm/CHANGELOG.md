# Release History

## 1.0.0-preview.8 (Unreleased)

## 1.0.0-preview.7 (2019-10-29)

- Updated to use the latest version of `@azure/core-http` package.

## 1.0.0-preview.6 (2019-10-22)

- Updated to use the latest version of `@azure/core-http` package

## 1.0.0-preview.4 (2019-10-07)

- Updated to use the latest version of the `@azure/core-http` library.

## 1.0.0-preview.3 (2019-09-09)

- Reintroduces `ServiceClientCredentials` type to `credentials` parameter of
  `AzureServiceClient` ([PR #4773](https://github.com/Azure/azure-sdk-for-js/pull/4773)).

## 1.0.0-preview.2 (2019-08-05)

- Removed `ServiceClientCredentials` type from `credentials` parameter of `AzureServiceClient` ([PR #4367](https://github.com/Azure/azure-sdk-for-js/pull/4367)). Credential implementations are now standardized on `@azure/core-auth`'s `TokenCredential` interface and provided by `@azure/identity`.

## 1.0.0-preview.1 (2019-07-10)

- Forked `@azure/ms-rest-azure-js` to `@azure/core-arm` to add the Azure HTTP pipeline layer for Azure SDK TypeScript/JavaScript libraries.
