# Release History

## 1.1.0 (2020-08-11)

### Changes since 1.0.*

- With 1.1.0, new developer credentials are now available: `VisualStudioCodeCredential` and `AzureCliCredential`.
  - `VisualStudioCodeCredential` allows developers to log into Azure using the credentials available after logging in through the Azure Account extension in Visual Studio Code.
  - `AzureCliCredential` allows developers to log into Azure using the login credentials after an "az login" call.
- Both `VisualStudioCodeCredential` and `AzureCliCredential` may be used directly or indirectly as part of `DefaultAzureCredential`.
- Added the ability to configure the Managed Identity with a user-assigned client ID via a new option available in the `DefaultAzureCredential` constructor options: `managedIdentityClientId`.
- Made a list of known authorities is now available via a new top-level constant: `AzureAuthorityHosts`.
- Introduced the `CredentialUnavailable` error, which allows developers to differentiate between a credential not being available and an error happening during authentication.

### Changes since the latest 1.1-preview

- Renamed the `VSCodeCredential` to `VisualStudioCodeCredential`, and its options parameter from `VSCodeCredentialOptions` to `VisualStudioCodeCredentialOptions`.
- Tenant information is now loaded from the Visual Studio Code settings file when the `VisualStudioCodeCredential` is used.
- Added `managedIdentityClientId` to optionally pass in a user-assigned client ID for the `ManagedIdentityCredential`.

## 1.1.0-preview.5 (2020-07-22)

- Make the keytar dependency optional, allowing for building and running on platforms not supported by keytar [PR #10142](https://github.com/Azure/azure-sdk-for-js/pull/10142)
- DefaultAzureCredential and VSCodeCredential can now take a tenant id as part of the options object
- KnownAuthorityHosts has been renamed to AzureAuthorityHosts

## 1.1.0-preview.4 (2020-06-09)

- Switch to using CredentialUnavailable to differentiate from expected and unexpected errors during DefaultAzureCredential startup. [PR #8172](https://github.com/Azure/azure-sdk-for-js/pull/8127)
- Make all developer credentials public as well as the list used by DefaultAzureCredential [PR #9274](https://github.com/Azure/azure-sdk-for-js/pull/9274)

## 1.1.0-preview.3 (2020-05-05)

- Add ability to read AZURE_AUTHORITY_HOST from environment ([PR #8226](https://github.com/Azure/azure-sdk-for-js/pull/8226) [PR #8343](https://github.com/Azure/azure-sdk-for-js/pull/8343))
- Update to OpenTelemetry 0.6 ([PR #7998](https://github.com/Azure/azure-sdk-for-js/pull/7998))
- Set expires_on at a higher precedence for IMDS ([PR #8591](https://github.com/Azure/azure-sdk-for-js/pull/8591))

## 1.1.0-preview.2 (2020-04-07)

- Make KnownAuthorityHosts constants available
- Extended DefaultAzureCredential with an experimental credential that uses the login credential from VSCode's Azure Account extension

## 1.1.0-preview1 (2020-03-10)

- Extended DefaultAzureCredential with an experimental credential that uses the login credential from Azure CLI
- Fix tracing to set correct span attributes ([PR #6565](https://github.com/Azure/azure-sdk-for-js/pull/6565)).

## 1.0.2 (2019-12-03)

- Fixed an issue where an authorization error occurs due to wrong access token being returned by the MSI endpoint when using a user-assigned managed identity with `ManagedIdentityCredential` ([PR #6134](https://github.com/Azure/azure-sdk-for-js/pull/6134))
- Fixed an issue in `EnvironmentCredential` where authentication silently fails when one or more of the expected environment variables is not present ([PR #6313](https://github.com/Azure/azure-sdk-for-js/pull/6313))
- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`

## 1.0.0 (2019-10-29)

- This release marks the general availability of the `@azure/identity` package.
- `EnvironmentCredential` now looks for additional environment variables: ([PR #5743](https://github.com/Azure/azure-sdk-for-js/pull/5743))
  - `AZURE_CLIENT_CERTIFICATE_PATH` to configure `ClientCertificateCredential`
  - `AZURE_USERNAME` and `AZURE_PASSWORD` to configure `UsernamePasswordCredential`
- `GetTokenOptions` now extends the interface `OperationOptions` ([PR #5899](https://github.com/Azure/azure-sdk-for-js/pull/5899))
- `TokenCredentialOptions` now extends the interface `PipelineOptions` ([PR #5711](https://github.com/azure/azure-sdk-for-js/pull/5711))
- Renamed `IdentityClientOptions` to `TokenCredentialOptions` ([PR #5797](https://github.com/Azure/azure-sdk-for-js/pull/5797))
- Removed the browser bundle. A browser-compatible library can still be created through the use of a bundler such as Rollup, Webpack, or Parcel
  ([PR #5863](https://github.com/Azure/azure-sdk-for-js/pull/5863))

## 1.0.0-preview.6 (2019-10-22)

- Renamed `DeviceCodeDetails` to `DeviceCodeInfo` and improved casing of the fields in the `ErrorResponse` type ([PR #5662](https://github.com/Azure/azure-sdk-for-js/pull/5662))
- Improved the constructor signatures for `AuthorizationCodeCredential`, `DeviceCodeCredential`, `InteractiveBrowserCredential` and `managedIdentityCredential` so that it's clearer which parameters are optional and what additional values they accept ([PR #5668](https://github.com/Azure/azure-sdk-for-js/pull/5668))
- Added logging for authentication flows via the new `@azure/logger` package ([PR #5611](https://github.com/Azure/azure-sdk-for-js/pull/5611))
- Fixed an issue in `DeviceCodeCredential` where an unexpected authentication error could cause an infinite polling loop ([PR #5430](https://github.com/Azure/azure-sdk-for-js/pull/5430))
- Improved the details that appear in the `AggregateAuthenticationError` ([PR #5409](https://github.com/Azure/azure-sdk-for-js/pull/5409))

## 1.0.0-preview.5 (2019-10-08)

- Update `@azure/core-tracing` dependency to resolve an issue when running in Internet Explorer 11 ([PR #5472](https://github.com/Azure/azure-sdk-for-js/pull/5472))

## 1.0.0-preview.4 (2019-10-07)

- Introduced the `AuthorizationCodeCredential` for performing the [authorization code flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow) with AAD ([PR #5356](https://github.com/Azure/azure-sdk-for-js/pull/5356))
- Fixed an issue preventing the `ManagedIdentityCredential` from working inside of Azure Function Apps ([PR #5144](https://github.com/Azure/azure-sdk-for-js/pull/5144))
- Added tracing to `IdentityClient` and credential implementations ([PR #5283](https://github.com/Azure/azure-sdk-for-js/pull/5283))
- Improved the exception message for `AggregateAuthenticationError` so that errors thrown from `DefaultAzureCredential` are now more actionable ([PR #5409](https://github.com/Azure/azure-sdk-for-js/pull/5409))

## 1.0.0-preview.3 (2019-09-09)

- Fixed a ping timeout issue. The timeout is now configurable. ([PR #4941](https://github.com/Azure/azure-sdk-for-js/pull/4941))
- Fixed IMDS endpoint detection false positive ([PR #4909](https://github.com/Azure/azure-sdk-for-js/pull/4909))

## 1.0.0-preview.2 (2019-08-05)

- Introduced the following credential types:
  - `DeviceCodeCredential`.
  - `InteractiveBrowserCredential`.
  - `UsernamePasswordCredential`.
- This library can now be used in the browser! The following credential types supported in browser builds:
  - `ClientSecretCredential`.
  - `UsernamePasswordCredential`.
  - `InteractiveBrowserCredential`.

## 1.0.0-preview.1 (2019-06-27)

For release notes and more information please visit https://aka.ms/azsdk/releases/july2019preview

- Introduced the following credential types:
  - `DefaultAzureCredential`.
  - `EnvironmentCredential`.
  - `ManagedIdentityCredential`.
  - `ClientSecretCredential`.
  - `ClientCertificateCredential`.
  - `ChainedTokenCredential`.
