# Release History

## 2.0.0-beta.2 (Unreleased)


## 2.0.0-beta.1 (2021-03-24)

This update marks the preview for the first major version update of the `@azure/identity` package since the first stable version was released in October, 2019. This is mainly driven by the improvements we are making for the `InteractiveBrowserCredential` when used in browser applications by updating it to use the new `@azure/msal-browser` which is replacing the older `msal` package.

### Breaking changes

- Changes to `InteractiveBrowserCredential` 
  - When used in browser applications, the `InteractiveBrowserCredential` has been updated to use the [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) by default to better support browsers with enhanced security restrictions. Please note that this credential always used the Auth Code Flow when used in Node.js applications. Read more on this in our [docs on Interactive Browser Credential](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/interactive-browser-credential.md).
  - The default client ID used for `InteractiveBrowserCredential` was viable only in Node.js and not for the browser. Therefore, client Id is now a required parameter when constructing this credential in browser applications.
  - The `loginStyle` and `flow` options to the constructor for `InteractiveBrowserCredential` will now show up only when used in browser applications as these were never applicable to Node.js
  - Removed the `postLogoutRedirectUri` from the options to the constructor for `InteractiveBrowserCredential`. This option was not being used since we don't have a way for users to log out yet.
- When a token is not available, some credentials had the promise returned by the `getToken` method resolve with `null`, others had the `getToken` method throw the `CredentialUnavailable` error. This behavior is now made consistent across all credentials to throw the `CredentialUnavailable` error.
  - This change has no bearing on the user if all they ever did was create the credentials and pass it to the Azure SDKs.
  - This change affects only those users who called the `getToken()` method directly and did not handle resulting errors.
- The constructor for `DeviceCodeCredential` always had multiple optional parameters and no required ones. As per our guidelines, this has now been simplified to take a single optional bag of parameters.

### New features

- Changes to `InteractiveBrowserCredential`, `DeviceCodeCredential`, `ClientSecretCredential`, `ClientCertificateCredential` and `UsernamePasswordCredential`:
  - Migrated to use the latest MSAL. This update improves caching of tokens, significantly reducing the number of network requests.
  - Added the feature of persistence caching of credentials. This is driven by the new `tokenCachePersistenceOptions` option available in the options you pass to the credential constructors.
     - For now, to use this feature, users will need to install `@azure/msal-node-extensions` [1.0.0-alpha.6](https://www.npmjs.com/package/@azure/msal-node-extensions/v/1.0.0-alpha.6) on their own. This experience will be improved in the next update.
    - This feature uses DPAPI on Windows, it tries to use the Keychain on OSX and the Keyring on Linux.
    - To learn more on the usage, please refer to our docs on the `TokenCachePersistenceOptions` interface.
    - **IMPORTANT:** As part of this beta, this feature is only supported in Node 10, 12 and 14.
- Changes to `InteractiveBrowserCredential`, `DeviceCodeCredential`, and `UsernamePasswordCredential`:
  - You can now control when the credential requests user input with the new `disableAutomaticAuthentication` option added to the options you pass to the credential constructors.
    - When enabled, this option stops the `getToken()` method from requesting user input in case the credential is unable to authenticate silently.
    - If `getToken()` fails to authenticate without user interaction, and `disableAutomaticAuthentication` has been set to true, a new error will be thrown: `AuthenticationRequired`. You may use this error to identify scenarios when manual authentication needs to be triggered (with `authenticate()`, as described in the next point).
  - A new method `authenticate()` is added to these credentials which is similar to `getToken()`, but it does not read the `disableAutomaticAuthentication` option described above.
    - Use this to get an `AuthenticationRecord` which you can then use to create new credentials that will re-use the token information.
    - The `AuthenticationRecord` object has a `serialize()` method that allows an authenticated account to be stored as a string and re-used in another credential at any time. Use the new helper function `deserializeAuthenticationRecord` to de-serialize this string.
    - `authenticate()` might succeed and still return `undefined` if we're unable to pick just one account record from the cache. This might happen if the cache is being used by more than one credential, or if multiple users have authenticated using the same Client ID and Tenant ID. To ensure consistency on a program with many users, please keep track of the `AuthenticationRecord` and provide them in the constructors of the credentials on initialization.

### Other changes

- Updated the `@azure/msal-node` dependency to `^1.0.0`.
- `DefaultAzureCredential`'s implementation for browsers is simplified to throw the `BrowserNotSupportedError` in its constructor. Previously, we relied on getting the same error from trying to instantiate the different  credentials that `DefaultAzureCredential` supports in Node.js.
  - As before, please use only the `InteractiveBrowserCredential` in your browser applications.
- For the `InteractiveBrowserCredential` for node, replaced the use of the `express` module with a native http server for Node, shrinking the resulting identity module considerably.



## 1.2.4 (2021-03-08)

This release doesn't have the changes from `1.2.4-beta.1`.

- Bug fix: Now if the `managedIdentityClientId` optional parameter is provided to `DefaultAzureCredential`, it will be properly passed through to the underlying `ManagedIdentityCredential`. Related to customer issue: [13872](https://github.com/Azure/azure-sdk-for-js/issues/13872).
- Bug fix: `ManagedIdentityCredential` now also properly handles `EHOSTUNREACH` errors. Fixes issue [13894](https://github.com/Azure/azure-sdk-for-js/issues/13894).

## 1.2.4-beta.1 (2021-02-12)

- Breaking Change: Updated `InteractiveBrowserCredential` to use the Auth Code Flow with PKCE rather than Implicit Grant Flow by default in the browser, to better support browsers with enhanced security restrictions. A new file was added to provide more information about this credential [here](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/identity/identity/interactive-browser-credential.md).

## 1.2.3 (2021-02-09)

- Fixed Azure Stack support for the NodeJS version of the `InteractiveBrowserCredential`. Fixes issue [11220](https://github.com/Azure/azure-sdk-for-js/issues/11220).
- The 'keytar' dependency has been updated to the latest version.
- No longer overrides global Axios defaults. This includes an update in `@azure/identity`'s source, and an update of the `@azure/msal-node` dependency. Fixes issue [13343](https://github.com/Azure/azure-sdk-for-js/issues/13343).

## 1.2.2 (2021-01-12)

- Upgrading to the msal-node dependency due to a severe vulnerability in Axios. Link to the documented vulnerability: [link](https://npmjs.com/advisories/1594). Fixes issue [13088](https://github.com/Azure/azure-sdk-for-js/issues/13088).

## 1.2.1 (2021-01-07)

- Upgrading to Axios 0.21.1 due to a severe vulnerability in Axios. Link to the documented vulnerability: [link](https://npmjs.com/advisories/1594). Fixes issue [13088](https://github.com/Azure/azure-sdk-for-js/issues/13088).

## 1.2.0 (2020-11-11)

### Changes since 1.1.\*

- With 1.2, we've added support for Azure Arc to our Managed Identity credential.
- We've also added an Interactive Browser credential for Node, which spawns the user's browser and connects via
  a browser-based auth code flow. This is powered by the Microsoft Authentication Library (MSAL)
- We've moved `DeviceCodeCredential` to also use the Microsoft Authentication Library (MSAL)
- Identity now supports Subject Name/Issuer (SNI) as part of authentication for ClientCertificateCredential.
- Added Active Directory Federation Services authority host support to the node credentials.
- `ManagedIdentityCredential` has been aligned with other languages, and now treats expected errors properly.
- Added support for multiple clouds on `VisualStudioCodeCredential`.

### Changes since the latest 1.2-beta

- `ManagedIdentityCredential` now only checks for available MSIs once per class instance.
- `ManagedIdentityCredential` now supports Azure Arc environments.
- `ManagedIdentityCredential` now supports Azure Service Fabric environments.
- Added authority host for multiple clouds on `VisualStudioCodeCredential`, and specified `AzureCloud` as the default cloud name.
- `DeviceCodeCredential` now has both of its constructor parameters, `tenantId` and `clientId`, as optional parameters. The default value of `tenantId` is "organizations", and the Azure CLI's client ID is the default value of `clientId`.
- We've removed the persistent cache support from the previous beta.

## 1.2.0-beta.2 (2020-10-06)

- `DeviceCodeCredential` now by default shows the Device Code message on the console. This can still be overwritten with a custom behavior by specifying a function as the third parameter, `userPromptCallback`.
- Added support for multiple clouds on `VisualStudioCodeCredential`. Fixes customer issue [11452](https://github.com/Azure/azure-sdk-for-js/issues/11452).
- `ManagedIdentityCredential` has been aligned with other languages, now treating expected errors properly. This fixes customer issue [11451](https://github.com/Azure/azure-sdk-for-js/issues/11451).
- `InteractiveBrowserCredential` authentication now uses the silent flow if the user provides a cache and authentication record for lookup.
- Added Active Directory Federation Services authority host support to the node credentials.
- Reverted a change in 1.2.0-beta.1 which moved `@rollup/plugin-json` from `devDependencies` to `dependencies`. `@rollup/plugin-json` was placed as a dependency due to an oversight, and it is not a necessary dependency for `@azure/identity`.

## 1.2.0-beta.1 (2020-09-08)

- A new `InteractiveBrowserCredential` for node which will spawn a web server, start a web browser, and allow the user to interactively authenticate with the browser.
- With 1.2.0-beta.1, Identity will now use [MSAL](https://www.npmjs.com/package/@azure/msal-node) to perform authentication. With this beta, DeviceCodeCredential and a new InteractiveBrowserCredential for node are powered by MSAL.
- Identity now supports Subject Name/Issuer (SNI) as part of authentication for ClientCertificateCredential
- Upgraded App Services MSI API version

## 1.1.0 (2020-08-11)

### Changes since 1.0.\*

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

- Introduced the `AuthorizationCodeCredential` for performing the [authorization code flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with AAD ([PR #5356](https://github.com/Azure/azure-sdk-for-js/pull/5356))
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
