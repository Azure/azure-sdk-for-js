# Release History

## 4.14.0-beta.2 (2026-02-10)

### Breaking Changes

- Renamed `enableAzureKubernetesTokenProxy` in `WorkloadIdentityCredentialOptions` to `enableAzureProxy`. [#36728](https://github.com/Azure/azure-sdk-for-js/pull/36728)

### Bugs Fixed

- Fixed an issue where `AzureDeveloperCliCredential` error messages included raw JSON output from `azd auth token` instead of clean, user-friendly messages. The credential now parses the JSON stderr output to extract and display only the error message. [#37268](https://github.com/Azure/azure-sdk-for-js/pull/37268)
- Fixed an issue where `IdentityClient` does not pass response in expected format for MSAL in empty response situations with additional logging. [#36906](https://github.com/Azure/azure-sdk-for-js/pull/36906)

### Other Changes

- Refactored and cleaned up `MsalClientOptions` to eliminate nested property duplication, replaced `getIdentityClientAuthorityHost` with `getAuthorityHost`, and removed deprecated `isNode` in favor of `isNodeLike`. [#36731](https://github.com/Azure/azure-sdk-for-js/pull/36731)

## 4.14.0-beta.1 (2025-11-06)

### Features Added

- Added Kubernetes token proxy support (identity binding mode) to `WorkloadIdentityCredential`. When enabled via the `enableAzureKubernetesTokenProxy ` option, the credential redirects token requests to an AKS-provided proxy to work around Entra ID's limit on federated identity credentials per managed identity. This feature is opt-in and only available when using `WorkloadIdentityCredential` directly (not supported by `DefaultAzureCredential` or `ManagedIdentityCredential`). [#36218](https://github.com/Azure/azure-sdk-for-js/pull/36218)

## 4.13.0 (2025-10-07)

### Features Added

- When `AZURE_TOKEN_CREDENTIALS` is set to only `ManagedIdentityCredential`, `DefaultAzureCredential` does not issue a probe request and performs retries with exponential backoff. [#36047](https://github.com/Azure/azure-sdk-for-js/pull/36047)

### Bugs Fixed

- Fixed an issue where `ManagedIdentityCredential` will make an additional probe request in the `getToken` call. [#36047](https://github.com/Azure/azure-sdk-for-js/pull/36047)

## 4.12.0 (2025-09-09)

### Features Added

- Added a new `requiredEnvVars` option to `DefaultAzureCredential` that can accept a single environment variable or an array of environment variables. All specified variables must be set (and non-empty) before credential instantiation. If any variable is missing or empty, an error is thrown listing all missing variables. [#35832](https://github.com/Azure/azure-sdk-for-js/pull/35832)
- Introduced a new `DefaultAzureCredentialEnvVars` union type that represents the environment variables supported in `DefaultAzureCredential`. This type is used to specify the required environment variable(s) in the option bag for `DefaultAzureCredential` via `requiredEnvVars`. [#35832](https://github.com/Azure/azure-sdk-for-js/pull/35832)

### Bugs Fixed

- Fixed an issue where `AzureDeveloperCliCredential` would time out during token requests when `azd` prompts for user interaction. This issue commonly occurred in environments where the `AZD_DEBUG` environment variable was set, causing the Azure Developer CLI to display additional prompts that interfered with automated token acquisition. [#35637](https://github.com/Azure/azure-sdk-for-js/pull/35637)
- Fixed an issue where `VisualStudioCodeCredential` will show interactive authentication when the plugin is set but the broker is not available. [#35837](https://github.com/Azure/azure-sdk-for-js/pull/35837)

### Other Changes

- `AzureCliCredential`, `AzurePowerShellCredential`, and `AzureDeveloperCliCredential` now raise `CredentialUnavailableError` when `claims` are provided to `getToken`, as these credentials do not support claims challenges. The error message includes instructions for handling claims authentication scenarios. [#35493](https://github.com/Azure/azure-sdk-for-js/pull/35493) & [#35855](https://github.com/Azure/azure-sdk-for-js/pull/35855)

## 4.11.1 (2025-08-05)

### Bugs Fixed

- Fixed an issue in which `AzurePowerShellCredential` command is not parsed correctly. [#35469](https://github.com/Azure/azure-sdk-for-js/pull/35469)

## 4.11.0 (2025-08-05)

- All the features shipped as part of 4.11.0-beta.1 will be GA with this version. The most important features include single credential selection in `DefaultAzureCredential` via `AZURE_TOKEN_CREDENTIALS` environment variable, broker authentication support through `VisualStudioCodeCredential`, and signed-in Windows account support in `DefaultAzureCredential`.

### Bugs Fixed

- Fixed deprecation warnings in `AzureCliCredential` and `AzureDeveloperCliCredential`. [#34878](https://github.com/Azure/azure-sdk-for-js/pull/34878)
- Fixed an issue where `InteractiveBrowserCredential` did not resolve correctly on Mac OS. [#35406](https://github.com/Azure/azure-sdk-for-js/pull/35406)

## 4.11.0-beta.1 (2025-07-17)

### Features Added

- `VisualStudioCodeCredential` has been restored and now supports **broker authentication** using the Azure account signed in via Visual Studio Code. The credential has been added to `DefaultAzureCredential` [#35150](https://github.com/Azure/azure-sdk-for-js/pull/35150)
- `DefaultAzureCredential` now supports authentication with the currently signed-in Windows account when the `@azure/identity-broker` package is installed and configured with `useIdentityPlugin`. This auth mechanism is added at the end of the `DefaultAzureCredential` credential chain. [#35213](https://github.com/Azure/azure-sdk-for-js/pull/35213)
- Added support for more `AZURE_TOKEN_CREDENTIALS` environment variable values to specify a single credential type to use in `DefaultAzureCredential`. In addition to `dev` and `prod`, possible values now include `VisualStudioCodeCredential`, `EnvironmentCredential`, `WorkloadIdentityCredential`, `ManagedIdentityCredential`, `AzureDeveloperCliCredential`, `AzurePowershellCredential` and `AzureCliCredential` - each for the corresponding credential type. [#34966](https://github.com/Azure/azure-sdk-for-js/pull/34966)

### Other Changes

- Added HTTP 410 status code handling to `ManagedIdentityCredential` retry policy with minimum 70-second total retry duration to meet Azure IMDS service requirements. [#34981](https://github.com/Azure/azure-sdk-for-js/pull/34981)

## 4.10.2 (2025-07-02)

### Bugs Fixed

- Fixed an issue in `AzurePowerShellCredential` where `-AsPlainText` is not supported in the `ConvertFrom-SecureString` cmdlet in older versions. [#34902](https://github.com/Azure/azure-sdk-for-js/pull/34902)

### Other Changes

- Added support to specify `subscription` ID or name on `AzureCliCredential` error message. [#34801](https://github.com/Azure/azure-sdk-for-js/pull/34801)

## 4.10.1 (2025-06-12)

### Bugs Fixed

- Fixed the bug in interactive authentication request to account for the correct user login prompt based on the login hint provided, in case there are multiple accounts present in the browser flow. [#34321](https://github.com/Azure/azure-sdk-for-js/pull/34321)
- Fixed the typing for `WorkloadIdentityCredential.getToken` to better represent the runtime behavior. [#34786](https://github.com/Azure/azure-sdk-for-js/pull/34786)

## 4.10.0 (2025-05-14)

### Features Added

- Added support for the `AZURE_TOKEN_CREDENTIALS` environment variable to `DefaultAzureCredential`, which allows for choosing between 'deployed service' and 'developer tools' credentials. Valid values are 'dev' for developer tools and 'prod' for deployed service. [#34301](https://github.com/Azure/azure-sdk-for-js/pull/34301)

### Other Changes

- Added deprecation warnings for username password usage in `EnvironmentCredential` constructor to warn the users. `UsernamePassword` authentication doesn't support Multi-Factor Authentication (MFA), and MFA will enabled soon on all tenants. For more details, see [Planning for mandatory MFA](https://aka.ms/mfaforazure). [#34054](https://github.com/Azure/azure-sdk-for-js/pull/34054)

## 4.9.1 (2025-04-17)

### Bugs Fixed

- Update the order for conditional exports so that the most specific conditions are listed first. [#33914](https://github.com/Azure/azure-sdk-for-js/pull/33914)
- Fix a bug in which `self.location` is undefined in specific environment. [#33914](https://github.com/Azure/azure-sdk-for-js/pull/33914)

## 4.9.0 (2025-04-16)

### Features Added

- Add `workerd` conditional exports support for Cloudflare environment. [#32422](https://github.com/Azure/azure-sdk-for-js/pull/32422)

### Other Changes

- Marked `VisualStudioCodeCredential`, `VisualStudioCodeCredentialOptions` and `VSCodeCredentialFinder` as deprecated. [#33413](https://github.com/Azure/azure-sdk-for-js/pull/33413)
- Upgraded version of `@azure/msal-node` to v3.5.0 that has [a bug fix](https://github.com/AzureAD/microsoft-authentication-library-for-js/pull/7631) for Azure Machine Learning Managed Identity. [#33792](https://github.com/Azure/azure-sdk-for-js/pull/33792)

## 4.8.0 (2025-03-11)

### Features Added

- `ManagedIdentityCredential` will now log the configured user-assigned managed identity ID. [#33144](https://github.com/Azure/azure-sdk-for-js/pull/33144)

### Other Changes

- Deprecated `UsernamePasswordCredential` and `UsernamePasswordCredentialOptions`, as the credential doesn't support multifactor authentication (MFA). MFA will soon be enforced on all Microsoft Entra tenants. For more details, see [Planning for mandatory MFA](https://aka.ms/mfaforazure). [#33136](https://github.com/Azure/azure-sdk-for-js/pull/33136) and [#33312](https://github.com/Azure/azure-sdk-for-js/pull/33312)
- For `AzureCliCredential` and `AzureDeveloperCliCredential`, if system root environment variable is not found on the Windows platform, the system root variable is set to the appropriate value with a warning logged as opposed to throwing an error. [#33178](https://github.com/Azure/azure-sdk-for-js/pull/33178)

## 4.7.0 (2025-02-18)

### Features Added

- Added `subscription` property in `AzureCliCredentialOptions`. [#31451](https://github.com/Azure/azure-sdk-for-js/pull/31451)

### Bugs Fixed

- Fixed the logic to return authority without the scheme and tenant ID [#31540](https://github.com/Azure/azure-sdk-for-js/pull/31540)
- Fixed an issue where an incorrect tenant ID was presented in multi-tenant authentication errors [#32505](https://github.com/Azure/azure-sdk-for-js/pull/32505)
- `ManagedIdentityCredential` now throws an error when attempting to pass a user-assigned Managed Identity in a ServiceFabric environment instead of silently ignoring it. [#32841](https://github.com/Azure/azure-sdk-for-js/pull/32841)
- Fixed the bug in silent authentication behavior to happen only in scenarios where an account is present either in the persistent cache (if tokenCachePersistence is enabled and authentication record is provided) or the in-memory cache, instead of silently picking up the first account found in token cache. [#32134](https://github.com/Azure/azure-sdk-for-js/pull/32134)
- Fixed the bug in interactive authentication request to account for the correct user login prompt based on the login hint provided, in case there are multiple accounts present. [#32134](https://github.com/Azure/azure-sdk-for-js/pull/32134)
- Incorporated the [fix by @azure/msal-node (v 3.2.1)](https://github.com/AzureAD/microsoft-authentication-library-for-js/pull/7469) for silent authentication to do token lookup in persistent cache.

### Other Changes

- Mark `AzureAuthorityHosts.AZURE_GERMANY` deprecated as the Germany cloud closed in 2021. [#31519](https://github.com/Azure/azure-sdk-for-js/pull/31519)
- Native ESM support has been added, and this package will now emit both CommonJS and ESM. [#31647](https://github.com/Azure/azure-sdk-for-js/pull/31647)

## 4.6.0 (2025-01-16)

### Other Changes

- Update `@azure/msal-browser` to 4.x [#32565](https://github.com/Azure/azure-sdk-for-js/pull/32565)

## 4.5.0 (2024-10-15)

### Features Added

- Added Proof-of-Possession via Signed HTTP Request (SHR) support to `AccessToken` and `GetTokenOptions` for native broker scenarios in `InteractiveBrowserCredential` to be used with plugin `@azure/identity-broker` [#30961](https://github.com/Azure/azure-sdk-for-js/pull/30961).

### Bugs Fixed

- Fixed the request sent in AzurePipelinesCredential so it doesn't result in a redirect response when an invalid system access token is provided [#31209](https://github.com/Azure/azure-sdk-for-js/pull/31209).

### Other Changes

- Allow certain response headers to be logged in `AzurePipelinesCredential` for diagnostics and include them in the error message [#31209](https://github.com/Azure/azure-sdk-for-js/pull/31209)

## 4.5.0-beta.3 (2024-09-18)

### Features Added

- Added support for the field `refreshAfterTimestamp` in `AccessToken` [#30402](https://github.com/Azure/azure-sdk-for-js/pull/30402)
- Added support for providing an object ID to `ManagedIdentityCredential`. [#30771](https://github.com/Azure/azure-sdk-for-js/pull/30771)
- Added support for token cache persistence via the `CredentialTokenPersistence` options to the `ClientAssertionCredential`. [#31129](https://github.com/Azure/azure-sdk-for-js/pull/31129)

### Bugs Fixed

- `ManagedIdentityCredential` now throws an error when attempting to pass a user-assigned Managed Identity in a CloudShell environment instead of silently ignoring it. [#30955](https://github.com/Azure/azure-sdk-for-js/pull/30955)
- Fixed an issue where cross-tenant federation did not read the AZURE_AUTHORITY_HOST environment in all scenarios. [#31134](https://github.com/Azure/azure-sdk-for-js/pull/31134)

## 4.5.0-beta.2 (2024-08-13)

### Features Added

- Added support in `EnvironmentCredential` and `DefaultAzureCredential` for `AZURE_CLIENT_SEND_CERTIFICATE_CHAIN` environment variable to configure subject name / issuer authentication. [#30570](https://github.com/Azure/azure-sdk-for-js/pull/30570)
- Added support for `AsSecureString` in `AzurePowerShellCredential`. [#30720](https://github.com/Azure/azure-sdk-for-js/pull/30720)

### Bugs Fixed

- Fixed an issue where an incorrect error message was returned when the service responds with a 400 status code. [#30532](https://github.com/Azure/azure-sdk-for-js/pull/30532)
- Improved error messages for credential parameter validation. [#30610](https://github.com/Azure/azure-sdk-for-js/pull/30610)

### Other Changes

- ManagedIdentityCredential errors will now include the underlying error cause under the `cause` property. [#30532](https://github.com/Azure/azure-sdk-for-js/pull/30532)

## 4.4.1 (2024-07-30)

### Bugs Fixed

- Improved error messages for `AzurePipelinesCredential` for Authentication Failed scenarios. [#30387](https://github.com/Azure/azure-sdk-for-js/pull/30387)
- Improved token parsing for `AzurePowerShellCredential` even with warning messages. [#30508](https://github.com/Azure/azure-sdk-for-js/pull/30508)

### Other Changes

- `ManagedIdentityCredential` migrated to use [MSAL](https://www.npmjs.com/package/@azure/msal-node) for handling the majority of the managed identity implementation. [#30172](https://github.com/Azure/azure-sdk-for-js/pull/30172)

## 4.5.0-beta.1 (2024-07-17)

### Other Changes

- `ManagedIdentityCredential` migrated to use [MSAL](https://www.npmjs.com/package/@azure/msal-node) for handling the majority of the managed identity implementation. [#30172](https://github.com/Azure/azure-sdk-for-js/pull/30172)

## 4.4.0 (2024-07-16)

### Features Added

- `OnBehalfOfCredential` now supports taking clientAssertion callback `getAssertion`. [#29711](https://github.com/Azure/azure-sdk-for-js/pull/29711)

### Bugs Fixed

- Fixed an issue where cross-tenant federation did not honor the request's tenant ID. [#30266](https://github.com/Azure/azure-sdk-for-js/pull/30266)

### Other Changes

- `OnBehalfOfCredential` migrated to use MSALClient internally instead of MSALNode flow. This is an internal refactoring and should not result in any behavioral changes. [#29890](https://github.com/Azure/azure-sdk-for-js/pull/29890)
- `InteractiveBrowserCredential` migrated to use MSALClient internally instead of MSALNode flow in Node. This is an internal refactoring and should not result in any behavioral changes. [#29894](https://github.com/Azure/azure-sdk-for-js/pull/29894)

## 4.3.0 (2024-06-18)

### Features Added

- Added `AzurePipelinesCredential` for supporting workload identity federation in Azure Pipelines with service connections.

## 4.3.0-beta.2 (2024-06-10)

### Bugs Fixed

- Managed identity bug fixes

## 4.2.1 (2024-06-10)

### Bugs Fixed

- Managed identity bug fixes

## 4.3.0-beta.1 (2024-05-08)

### Features Added

- Introducing a new credential `AzurePipelinesCredential` for supporting workload identity federation in Azure Pipelines with service connections. [#29392](https://github.com/Azure/azure-sdk-for-js/pull/29392)

### Bug Fixes

- `ClientSecretCredential`, `ClientCertificateCredential`, and `ClientAssertionCredential` no longer try silent authentication unnecessarily as per the MSAL guidelines. For more information please refer to [the Entra documentation on token caching](https://learn.microsoft.com/entra/identity-platform/msal-acquire-cache-tokens#recommended-call-pattern-for-public-client-applications). [#29405](https://github.com/Azure/azure-sdk-for-js/pull/29405)

### Other Changes

- `DeviceCodeCredential` migrated to use MSALClient internally instead of MSALNode flow. This is an internal refactoring and should not result in any behavioral changes. [#29405](https://github.com/Azure/azure-sdk-for-js/pull/29405)
- `UsernamePasswordCredential` migrated to use MSALClient internally instead of MSALNode flow. This is an internal refactoring and should not result in any behavioral changes. [#29656](https://github.com/Azure/azure-sdk-for-js/pull/29656)
- `AuthorizationCodeCredential` migrated to use MSALClient internally instead of MSALNode flow. This is an internal refactoring and should not result in any behavioral changes. [#29831](https://github.com/Azure/azure-sdk-for-js/pull/29831)

## 4.2.0 (2024-04-30)

### Features Added

- Adds support for `getBearerTokenProvider` that returns a callback function to get a token for a given scope. This is useful for scenarios where an explicit Entra token is needed without having to worry about the token refreshing details.

### Other Changes

- `ClientSecretCredential`, `ClientCertificateCredential`, and `ClientAssertionCredential` migrated to use MSALClient internally instead of MSALNode flow. This is an internal refactoring and should not result in any behavioral changes. [#28873](https://github.com/Azure/azure-sdk-for-js/pull/28873)

## 4.1.0 (2024-04-09)

### Features Added

- `InteractiveBrowserCredential`: Added support for using the default broker account. [#28979](https://github.com/Azure/azure-sdk-for-js/pull/28979).

### Breaking Changes

- IMDS probing retry configuration updated for `DefaultAzureCredential` and `ManagedIdentityCredential`, with `maxRetryCount` increased to 5. For more information, see [BREAKING_CHANGES.md](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/BREAKING_CHANGES.md#410).

### Bugs Fixed

- msal cache files are properly named when the user does not pass in a custom file name [#29039](https://github.com/Azure/azure-sdk-for-js/pull/29039)
- Allow IMDS probing retry options in `ManagedIdentityCredential` and `DefaultAzureCredential` to be overridden by customers.

## 4.1.0-beta.1 (2024-02-06)

### Features Added

- `AzureCliCredential`: Added support for the new response field which represents token expiration timestamp as time zone agnostic value. ([#28333](https://github.com/Azure/azure-sdk-for-js/pull/28333))

### Bugs Fixed

- `new DefaultAzureCredential()` will no longer throw when one of the credentials in the chain fails to instantiate. Any creation errors will be logged when `getToken` is called. [#28264](https://github.com/Azure/azure-sdk-for-js/pull/28264)

## 4.0.1 (2024-01-18)

### Bugs Fixed

- Initialize Public Client Application in the Interactive Browser Credential, as required by @azure/msal-browser v3 fixed in [#28292](https://github.com/Azure/azure-sdk-for-js/pull/28292).

## 3.4.1 (2023-11-13)

### Bugs Fixed

- Fixed regressions introduced by 3.4.0 [#27761](https://github.com/Azure/azure-sdk-for-js/pull/27761)

## 4.0.0 (2023-11-07)

### Features Added

- All the features shipped as part of 4.0.0-beta.1 will be GA with this version. The most important features being the browser customization for success/ error messages and the support of brokered authentication on Windows OS, such as WAM.

### Breaking Changes

- Starting with v4.0.0 of `@azure/identity`, Node.js v20 will be supported and Node.js v16 will no longer be supported.

## 3.4.0 (2023-11-07)

## Features Added

- Upgraded version of @azure/msal-node to v2.5.0 to support all versions of Node.js - Node 16, Node 18 and Node 20.

## 4.0.0-beta.1 (2023-10-26)

### Features Added

- Added `brokerOptions` in `InteractiveBrowserCredential` for authentication broker support such as WAM. This feature works along with the new `@azure/identity-broker` plugin package. Note that this feature is only available in node.
- Added support for MSA passthrough in the `brokerOptions` of `InteractiveBrowserCredential`. Note this is only available for legacy 1st party applications.
- Added `BrowserCustomizationOptions` for success and error messages in the `InteractiveBrowserCredential`.

### Breaking Changes

- The `redirectUri` is no longer a required option for `InteractiveBrowserCredential` on Node.js. There's no API change, but this is a behavior change.

## 3.3.2 (2023-10-17)

### Bugs Fixed

- Ensure `AzurePowershellCredential` calls PowerShell with the `-NoProfile` and "-NonInteractive" flag to avoid loading user profiles for more consistent behavior. ([#27023](https://github.com/Azure/azure-sdk-for-js/pull/27023))
- Fixed browser bundling for Azure Developer CLI credential. ([Identity] update mapping for browser for azd (#27097))
- `ManagedIdentityCredential` will fall through to the next credential in the chain in the case that Docker Desktop returns a 403 response when attempting to access the IMDS endpoint.([#27050](https://github.com/Azure/azure-sdk-for-js/pull/27050))

### Other Changes

- The default IMDS probe request timeout in `ManagedIdentityCredential` has been increased to 1 second from 0.3 seconds to reduce the likelihood of false negatives.
- Fixed links to documentation.
- Further improvements to tenant and scope validation.

## 3.3.1 (2023-10-10)

### Bug Fixes

- Bug fixes for developer credentials

## 3.3.0 (2023-08-14)

### Features Added

- Enabled support for logging [personally identifiable information](https://github.com/AzureAD/microsoft-authentication-library-for-dotnet/wiki/PII), required for customer support through the `enableUnsafeSupportLogging` option on `loggingOptions` under `TokenCredentialOptions`.
- Continuous Access Evaluation (CAE) is now configurable per-request by setting the `enable_cae` keyword argument to `True` in `get_token`. This applies to user credentials and service principal credentials. ([#26614](https://github.com/Azure/azure-sdk-for-js/pull/26614))

### Breaking Changes

- CP1 client capabilities for CAE is no longer always-on by default for user credentials. This capability will now be configured as-needed in each `getToken` request by each SDK. ([#26614](https://github.com/Azure/azure-sdk-for-js/pull/26614))
  - Suffixes are now appended to persistent cache names to indicate whether CAE or non-CAE tokens are stored in the cache. This is to prevent CAE and non-CAE tokens from being mixed/overwritten in the same cache. This could potentially cause issues if you are trying to share the same cache between applications that are using different versions of the Azure Identity library as each application would be reading from a different cache file.
  - Since CAE is no longer always enabled for user-credentials, the `AZURE_IDENTITY_DISABLE_CP1` environment variable is no longer supported.

## 3.2.4 (2023-07-21)

### Bug Fixes

- Fixed a bug related to [Managed Identity Credential intermixing wrong scopes](https://github.com/Azure/azure-sdk-for-js/pull/26566) for successive `getToken()` calls.

## 3.2.3 (2023-06-20)

### Bug Fixes

- Dependency Upgrades of MSAL libraries to the latest versions for incorporating underlying [bug fix](https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/4879#issuecomment-1462949837) to resolve [this issue](https://github.com/Azure/azure-sdk-for-js/issues/23331).

### Other Changes

#### Behavioral breaking change

- Moved `AzureDeveloperCliCredential` to the end of the `DefaultAzureCredential` chain.

## 3.2.2 (2023-05-15)

### Bug Fixes

- Remove console logging in `processMultitenantRequest` for tenant id and resolved tenant.

## 3.2.1 (2023-05-10)

### Bug Fixes

- Fixed a bug in `WorkloadIdentity Credential`, to incorporate the case where the options can be `undefined` in a conditional check.
  Related issue [#25827](https://github.com/Azure/azure-sdk-for-js/issues/25827) with the fix [#25829](https://github.com/Azure/azure-sdk-for-js/pull/25829).

## 3.2.0 (2023-05-09)

### Breaking Changes

- Renamed `developerCredentialTimeOutInMs` to `processTimeoutInMs` in `DefaultAzureCredentialOptions`.
- Renamed `federatedTokenFilePath` to `tokenFilePath` under `WorkloadIdentityOptions`.

## 3.2.0-beta.2 (2023-04-13)

### Features Added

- Added configurable process timeout for dev-time credentials - `AzureCLI Credential`, `AzurePowershell Credential` and `AzureDeveloperCLI Credential`.

### Bugs Fixed

- Fixed a bug in `WorkloadIdentity Credential`, to incorporate the case where the options can be `undefined` in a conditional check. Related issue [#25089](https://github.com/Azure/azure-sdk-for-js/issues/25089) with the fix [#25119](https://github.com/Azure/azure-sdk-for-js/pull/25119).
- Exported `WorkloadIdentityDefaultCredentialOptions` which was previously not publicly exported in `index.ts`.

## 3.1.4 (2023-04-11)

### Bugs Fixed

- Added a workaround of fetching all accounts from token cache to fix the issue of silent authentication not taking place when authenticationRecord is passed. For reference, see [issue](https://github.com/Azure/azure-sdk-for-js/issues/24349).

## 3.2.0-beta.1 (2023-02-28)

### Features Added

- Added support to disable instance discovery on Microsoft Entra credentials.
- Added `AzureDeveloperCliCredential` [#24180](https://github.com/Azure/azure-sdk-for-js/pull/24180) and added it to the `DefaultAzureCredential` [#24826](https://github.com/Azure/azure-sdk-for-js/pull/24826) auth flow
- Added support for `WokloadIdentityCredential`[#24830](https://github.com/Azure/azure-sdk-for-js/pull/24830), added it to `DefaultAzureCredential` auth flow and replaced the in-house implementation of `Token Exchange MSI` in `ManagedIdentity` with `WorkloadIdentityCredential`.

## 3.1.3 (2023-01-12)

### Other Changes

- Upgraded versions of @azure/msal-node, @azure/msal-common and @azure/msal-browser to remove any dependency versions that were depending on old version of jsonwebtoken which had a [security issue](https://nvd.nist.gov/vuln/detail/CVE-2022-23529)

## 3.1.2 (2022-12-05)

### Bugs Fixed

- Fixed bug in `ManagedIdentity Credential` where "expiresInSeconds" was taking the absolute timestamp instead of relative expiration time period in seconds.

### Other Changes

- Enable msal logging based on log level specified by user for Azure SDK.
- Upgraded version dependencies on msal libraries, since they have additional logging added.

## 3.1.1 (2022-11-18)

### Bugs Fixed

- Fixed bug to update "expiresOnTimestamp" field in Managed Identity to be in seconds and not milliseconds.

## 3.1.0 (2022-11-08)

### Other Changes

- Docs improvements for cross-language alignment

## 3.0.1 (2022-11-07)

### Bugs Fixed

- Fixed bug to enable `additionallyAllowedTenants` to pass through to MSAL Flow.

## 3.1.0-beta.1 (2022-10-13)

### Features Added

- Added Token Caching support to Managed Identity Credential

## 3.0.0 (2022-09-19)

### Features Added

- Added `additionallyAllowedTenants` to the following credential options to force explicit opt-in behavior for multi-tenant authentication via the options property bag to the following:
  - `AuthorizationCodeCredentialOptions`
  - `AzureApplicationCredentialOptions`
  - `AzureCliCredentialOptions`
  - `AzurePowerShellCredentialOptions`
  - `ClientAssertionCredentialOptions`
  - `ClientCertificateCredentialOptions`
  - `ClientSecretCredentialOptions`
  - `DefaultAzureCredentialOptions`
  - `DeviceCodeCredentialOptions`
  - `EnvironmentCredentialOptions`
  - `InteractiveCredentialOptions`
  - `OnBehalfOfCredentialOptions`
  - `UsernamePasswordCredentialOptions`
  - `VisualStudioCodeCredentialOptions`

### Breaking Changes

- Credential types supporting multi-tenant authentication will now throw an error if the requested tenant ID doesn't match the credential's tenant ID, and is not included in the `additionallyAllowedTenants` option. Applications must now explicitly add additional tenants to the `additionallyAllowedTenants` list, or add `"*"` to list, to enable acquiring tokens from tenants other than the originally specified tenant ID. See [BREAKING_CHANGES.md](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/BREAKING_CHANGES.md).

### Bugs Fixed

- Changed the way token expiration for managed identity tokens is calculated to handle different server formats. See [PR #23232](https://github.com/Azure/azure-sdk-for-js/pull/23232)

## 3.0.0-beta.1 (2022-08-24)

### Features Added

- Added support in `EnvironmentCredential` to read a certificate password from an environment variable `AZURE_CLIENT_CERTIFICATE_PASSWORD`
- Added samples for supporting Microsoft Entra authentication in Azure Redis Cache

### Breaking Changes

- Removed `VisualStudioCodeCredential` from `DefaultAzureCredential` token chain. [Issue 20500](https://github.com/Azure/azure-sdk-for-js/issues/20500) tracks this.

## 2.1.0 (2022-07-08)

### Features Added

- Added support for new credential `ClientAssertionCredential`, which accepts a callback function for the signed JWT assertion for a client certificate. See [MSAL Client Assertion for more information](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md).

### Bugs Fixed

- Fixed a bug that would break the AzureCliCredential if the Azure CLI reported a warning. See: [21075](https://github.com/Azure/azure-sdk-for-js/issues/21075).
- Fixed a bug in `AuthorizationCodeCredential` where the tenant id was not being used. The `common` tenant was the only tenant being used by this credential.
- Fixed a bug in `AuthorizationCodeCredential` where the public client was not being used. Due to this bug, without passing in the client secret, this credential would fail.
- Fixed a bug in `DefaultAzureCredential` and `AzureCLICredential` where the errors thrown by the latter credential were not of type `CredentialUnavailableError`. This caused only the error of `AzureCLICredential` being thrown and the other chained errors of `DefaultAzureCredential` were not thrown. See: [22066](https://github.com/Azure/azure-sdk-for-js/issues/22066)

### Other Changes

- Upgraded to `@azure/core-tracing` version `^1.0.0`.
- Improved the errors displayed on the `AzureCliCredential`.

## 2.0.5 (2022-06-22)

### Bugs Fixed

- Fixed a bug in `InteractiveBrowserCredential` for Mac OS where the [app was not getting closed](https://github.com/Azure/azure-sdk-for-js/issues/21726) after the authorization succeeded.

## 2.1.0-beta.2 (2022-03-22)

### Features Added

- Added stronger types to the `DefaultAzureCredential` and `ManagedIdentityCredential` constructors so that TypeScript users will trigger a type error by providing both a Managed Identity client ID and resource ID to the same credential instance.
- Added stronger types to the `ClientCertificateCredential` and `OnBehalfOfCredential` constructors so that TypeScript users will trigger a type error by providing both a Client certificate and certificate path to the same credential instance.
- Added support for App Service 2019 resource in Managed Identity Credential.
- All of our credentials now support a new option on their constructor: `loggingOptions`, which allows configuring the logging options of the HTTP pipelines.
- Within the new `loggingOptions` we have also added `allowLoggingAccountIdentifiers`, a property that if set to true logs information specific to the authenticated account after each successful authentication, including: the Client ID, the Tenant ID, the Object ID of the authenticated user, and if possible the User Principal Name.

### Bugs Fixed

- Fixed a bug that caused [Continuous Access Enforcement (CAE)](https://learn.microsoft.com/entra/identity/conditional-access/concept-continuous-access-evaluation) and [Conditional Access authentication context](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/granular-conditional-access-for-sensitive-data-and-actions/ba-p/1751775) authentication to fail with newer versions of MSAL.

## 2.1.0-beta.1 (2022-03-02)

### Features Added

- Added support for specifying a custom `resourceId` when creating a `ManagedIdentityCredential` or `DefaultAzureCredential`.
  - In some scenarios where a user-assigned managed identity is required, the identity may be known by an ARM resource ID, but not a client ID (such as when user-assigned identities are created using an ARM template). The `resourceId` option allows an app to select its managed identity by its ARM resource ID to support such scenarios.
  - If `resourceId` is provided, the managed identity providers for Azure App Service (2017), Azure Arc, Azure Cloud Shell, Azure Service Fabric and Token Exchange authentication will log a warning since this parameter is not supported by the identity endpoints in those services. The authentication attempts will be sent, but the parameter will be ignored by the service.
- Added `clientId` to the optional parameters of the `ManagedIdentityCredential`.
- Updated the Troubleshoot guide to have error codes and error messages for the Identity Customer Service Support.

## 2.0.4 (2022-02-18)

### Bugs Fixed

- Fixed a regression in version 2.0.3 in which providing an options bag, but _not_ a client ID, to the `ManagedIdentityCredential` constructor would discard the `options` parameter.

## 2.0.3 (2022-02-16)

### Features Added

- Added log warning for non-support of user assigned identity in Managed Identity credentials in Cloud Shell environments.

### Bugs Fixed

- Fixed bug that duplicated the tenant Id on the URI of outgoing requests when passing an `authorityHost` ending with a tenant Id.
- `ManagedIdentityCredential` now won't retry when it tries to ping the IMDS endpoint.
- Now we are specifying the maximum number of retries to 3 to ensure that maximum retries won't change without notice.

## 2.0.2 (2022-02-03)

### Features Added

- Improved the error message when `InteractiveBrowserCredential` is used with an unavailable port (such as when no `redirectUri` is provided, and the port `80` is busy) and when no browser is available.

### Bugs Fixed

- Challenge claims now are properly being passed through to the outgoing token requests.
- The `ManagedIdentityCredential` now properly parses expiration dates from token exchange requests.

### Other Changes

- Moved the `@types/stoppable` dependency to the `devDependencies`.

## 2.0.1 (2021-10-28)

### Features Added

- The `ManagedIdentityCredential` now supports the Service Fabric environment.

### Bugs Fixed

- Fixed a bug that caused the `AzureCliCredential` to fail on Windows. Issue [18268](https://github.com/Azure/azure-sdk-for-js/issues/18268).

## 2.0.0 (2021-10-15)

After multiple beta releases over the past year, we're proud to announce the general availability of version 2 of the `@azure/identity` package. This version includes the best parts of v1, plus several improvements.

This changelog entry showcases the changes that have been made from version 1 of this package. See the [v1-to-v2 migration guide](https://github.com/Azure/azure-sdk-for-js/blob/e24cd753e1b84bc8959d8e1f55bfa9176cab88a9/sdk/identity/identity/migration-v1-v2.md) for details on how to upgrade your application to use the version 2 of `@azure/identity`. For information on troubleshooting the Identity package, see the [troubleshooting guide](https://aka.ms/azsdk/js/identity/troubleshoot).

### Features Added

#### Plugin API

Identity v2 provides a top-level `useIdentityPlugin` function, which allows using two new plugin packages:

- [@azure/identity-vscode](https://www.npmjs.com/package/@azure/identity-vscode), which provides the dependencies of `VisualStudioCodeCredential` and enables it.
  - If the `@azure/identity-vscode` plugin isn't used through the `useIdentityPlugin` function, the `VisualStudioCodeCredential` exposed by Identity v2 will throw a `CredentialUnavailableError`.
- [@azure/identity-cache-persistence](https://www.npmjs.com/package/@azure/identity-cache-persistence), which provides persistent token caching.

Most credentials on Identity v2 now support the persistent token caching feature. Such credentials include the property [tokenCachePersistenceOptions](https://learn.microsoft.com/javascript/api/@azure/identity/tokencachepersistenceoptions) in the constructor options which can be used to enable this feature.

The following example showcases how to enable persistence caching by first enabling the `@azure/identity-cache-persistence` plugin with `useIdentityPlugin(cachePersistencePlugin)`, and then passing the `tokenCachePersistenceOptions` through the constructor of the `DeviceCodeCredential`:

```ts
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
import { useIdentityPlugin, DeviceCodeCredential } from "@azure/identity";

useIdentityPlugin(cachePersistencePlugin);

async function main() {
  const credential = new DeviceCodeCredential({
    tokenCachePersistenceOptions: {
      enabled: true,
    },
  });
}
```

#### New credentials

Identity v2 includes two new credential types:

- `AzurePowerShellCredential`, which re-uses any account previously authenticated with the `Az.Account` PowerShell module.
- `OnBehalfOfCredential`, which enables the [On-Behalf-Of authentication flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-on-behalf-of-flow).

#### New features in all credentials

Identity v2 enables:

- Support for claims challenges resulting from [Continuous Access Enforcement (CAE)](https://learn.microsoft.com/entra/identity/conditional-access/concept-continuous-access-evaluation) and [Conditional Access authentication context](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/granular-conditional-access-for-sensitive-data-and-actions/ba-p/1751775).
  - By default, credentials of Identity v2 will produce tokens that can be used to trigger the challenge authentication flows. After these tokens expire, the next HTTP requests to Azure will fail, but the response will contain information to re-authenticate.
  - To disable this behavior, set the environment variable `AZURE_IDENTITY_DISABLE_CP1` to any value. For more about claims challenges, see [Claims challenges, claims requests, and client capabilities](https://learn.microsoft.com/entra/identity-platform/claims-challenge).
- Support for multi-tenant authentication on all credentials except `ManagedIdentityCredential`.
  - At the moment, applications needing multi-tenancy support will need to call to the credentials' `getToken` directly, sending the new `tenantId` property.
  - A sample with more context will be provided in a future date.
  - To disable it, set the environment variable `AZURE_IDENTITY_DISABLE_MULTITENANTAUTH`. For more about multitenancy, see [Identity management in multitenant apps](https://learn.microsoft.com/azure/architecture/multitenant-identity/).

#### New features in InteractiveBrowserCredential and DeviceCodeCredential

You can now control when the credential requests user input with the new `disableAutomaticAuthentication` option added to the options you pass to the credential constructors.

- When enabled, this option stops the `getToken()` method from requesting user input in case the credential is unable to authenticate silently.
- If `getToken()` fails to authenticate without user interaction, and `disableAutomaticAuthentication` has been set to true, a new error will be thrown: `AuthenticationRequired`. You may use this error to identify scenarios when manual authentication needs to be triggered (with `authenticate()`, as described in the next point).

A new method `authenticate()` is added to these credentials which is similar to `getToken()`, but it does not read the `disableAutomaticAuthentication` option described above.

- Use this to get an `AuthenticationRecord` which you can then use to create new credentials that will re-use the token information.
- The `AuthenticationRecord` object has a `serialize()` method that allows an authenticated account to be stored as a string and re-used in another credential at any time. Use the new helper function `deserializeAuthenticationRecord` to de-serialize this string.
- `authenticate()` might succeed and still return `undefined` if we're unable to pick just one account record from the cache. This might happen if the cache is being used by more than one credential, or if multiple users have authenticated using the same Client ID and Tenant ID. To ensure consistency on a program with many users, please keep track of the `AuthenticationRecord` and provide them in the constructors of the credentials on initialization.

Learn more via the below samples

- [Samples around controlling user interaction](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#control-user-interaction).
- [Samples around persisting user authentication data](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#persist-user-authentication-data).

#### New features in ManagedIdentityCredential

In Identity v2, the `ManagedIdentityCredential` retries with exponential back-off when a request for a token fails with a 404 status code. This change only applies to environments with available IMDS endpoints.

Azure Service Fabric support hasn't been added on the initial version 2 of Identity. Subscribe to [issue #12420](https://github.com/Azure/azure-sdk-for-js/issues/12420) for updates on this feature.

#### Other features

- `ClientCertificateCredential` now optionally accepts a configuration object as its third constructor parameter, instead of the PEM certificate path. This new object, called `ClientCertificateCredentialPEMConfiguration`, can contain either the PEM certificate path with the `certificatePath` property, or the contents of the PEM certificate with the `certificate` property..
- The Node.js version of `InteractiveBrowserCredential` has [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636) enabled by default.
- `InteractiveBrowserCredential` has a new `loginHint` constructor option, which allows a username to be pre-selected for interactive logins.
- In `AzureCliCredential`, we allow specifying a `tenantId` in the parameters through the `AzureCliCredentialOptions`.
- A new error, named `AuthenticationRequiredError`, has been added. This error shows up when a credential fails to authenticate silently.
- Errors and logged exceptions may point to the new [troubleshooting guidelines](https://aka.ms/azsdk/js/identity/troubleshoot).
- On all of the credentials we're providing, the initial authentication attempt in the lifetime of your app will include an additional request to first discover relevant endpoint metadata information from Azure.

### Breaking changes

#### Breaking changes from v1

- For `ClientCertificateCredential` specifically, the validity of the PEM certificate is evaluated on `getToken` and not on the constructor.
- We have also renamed the error `CredentialUnavailable` to `CredentialUnavailableError`, to align with the naming convention used for error classes in the Azure SDKs in JavaScript.
- In v1 of Identity some `getToken` calls could resolve with `null` in the case the authentication request succeeded with a malformed output. In v2, issues with the `getToken` method will always throw errors.
- Breaking changes to InteractiveBrowserCredential
  - The `InteractiveBrowserCredential` will use the [Auth Code Flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-implicit-grant-flow) to better support browsers with enhanced security restrictions. Learn how to migrate in the [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/e24cd753e1b84bc8959d8e1f55bfa9176cab88a9/sdk/identity/identity/migration-v1-v2.md). Read more about the latest `InteractiveBrowserCredential` [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).
  - The default client ID used for `InteractiveBrowserCredential` was viable only in Node.js and not for the browser. Therefore, on v2 client ID is a required parameter when using this credential in browser apps.
  - Identity v2 also removes the `postLogoutRedirectUri` from the options to the constructor for `InteractiveBrowserCredential`. This option wasn't being used. Instead of using this option, use MSAL directly. For more information, see [Authenticating with the @azure/msal-browser Public Client](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-the-azuremsal-browser-public-client).
  - In Identity v2, `VisualStudioCodeCredential` throws a `CredentialUnavailableError` unless the new [@azure/identity-vscode](https://www.npmjs.com/package/@azure/identity-vscode) plugin is used.

- Standardizing the tracing span names to be `<className>.<operationName>` over `<className>-<operationName>`

#### Breaking Changes from 2.0.0-beta.4

- Removed the `allowMultiTenantAuthentication` option from all of the credentials. Multi-tenant authentication is now enabled by default. On Node.js, it can be disabled with the `AZURE_IDENTITY_DISABLE_MULTITENANTAUTH` environment variable.
- Removed support for specific Azure regions on `ClientSecretCredential` and `ClientCertificateCredential. This feature will be added back on the next beta.

#### Breaking Changes from 2.0.0-beta.6

- Stopped exporting the `ApplicationCredential` from the package. This will be re-introduced in the future.
- Removed the `CredentialPersistenceOptions` from `DefaultAzureCredential` and `EnvironmentCredential`.
- Merged the configuration and the options bag on the `OnBehalfOfCredential` into a single options bag.
- `AuthenticationRequiredError` (introduced in 2.0.0-beta.1) now has its parameters into a single options bag.
- `AuthenticationRequiredError` (introduced in 2.0.0-beta.1) now has its parameters in a single options bag, `AuthenticationRequiredErrorOptions`.
- `InteractiveBrowserCredentialOptions` has been renamed to `InteractiveBrowserCredentialNodeOptions`, and `InteractiveBrowserCredentialBrowserOptions` has been named `InteractiveBrowserCredentialInBrowserOptions`.

### Bugs Fixed

- `ClientSecretCredential`, `ClientCertificateCredential`, and `UsernamePasswordCredential` throw if the required parameters aren't provided (even in JavaScript).
- Fixed a bug that caused `AzureCliCredential` to fail when a custom tenant ID was provided.
- Caught up with the bug fixes for Azure POD Identity that were implemented on version 1.5.1.

### Other Changes

Identity v2 no longer includes native dependencies (neither ordinary, peer, nor optional dependencies). Previous distributions of `@azure/identity` included an optional dependency on `keytar`, which caused issues for some users in restrictive environments.

Identity v2 for JavaScript now also depends on the latest available versions of `@azure/msal-common`, `@azure/msal-node`, and `@azure/msal-browser`. Our goal is to always be up-to-date with the MSAL versions.

## 2.0.0-beta.6 (2021-09-09)

### Features Added

- Added the `OnBehalfOfCredential`, which allows users to authenticate through the [On-Behalf-Of authentication flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-on-behalf-of-flow).
- `ManagedIdentityCredential` now supports token exchange authentication.

### Breaking Changes

- `ClientCertificateCredential` now evaluates the validity of the PEM certificate path on `getToken` and not on the constructor.

#### Breaking Changes from 2.0.0-beta.5

- The property named `selectedCredential` that was added to `ChainedTokenCredential` and `DefaultAzureCredential` has been removed, since customers reported that logging was enough.
- Changed the name of the "extension" API to the "plugin" API to reduce confusion between this package and VS Code extensions. The function `useIdentityExtension` was renamed to `useIdentityPlugin`, and "extension packages" are now known as "plugin packages".
- Renamed the `allowUnencryptedStorage` property of `TokenCachePersistenceOptions` to `unsafeAllowUnencryptedStorage` to make it clear that enabling the unencrypted storage feature is not generally safe for production use.

### Bugs Fixed

- `ClientSecretCredential`, `ClientCertificateCredential` and `UsernamePasswordCredential` now throw if the required parameters are not provided (even in JavaScript).
- Fixed a bug introduced on 2.0.0-beta.5 that caused the `ManagedIdentityCredential` to fail authenticating in Arc environments. Since our new core disables unsafe requests by default, we had to change the security settings for the first request of the Arc MSI, which retrieves the file path where the authentication value is stored since this request generally happens through an HTTP endpoint.
- Fixed bug on the `AggregateAuthenticationError`, which caused an inconsistent error message on the `ChainedTokenCredential`, `DefaultAzureCredential` and `ApplicationCredential`.

### Other Changes

- The errors thrown by the `ManagedIdentityCredential` have been improved.

## 1.5.2 (2021-09-01)

- Fixed a bug introduced on 1.5.0 that caused the `ManagedIdentityCredential` to fail authenticating in Arc environments. Since our new core disables unsafe requests by default, we had to change the security settings for the first request of the Arc MSI, which retrieves the file path where the authentication value is stored since this request generally happens through an HTTP endpoint.

## 1.5.1 (2021-08-12)

- Fixed how we verify the IMDS endpoint is available. Now, besides skipping the `Metadata` header, we skip the URL query. Both will ensure that all the known IMDS endpoints return as early as possible.
- Added support for the `AZURE_POD_IDENTITY_AUTHORITY_HOST` environment variable. If present, the IMDS endpoint initial verification will be skipped.

## 2.0.0-beta.5 (2021-08-10)

### Features Added

- This release adds support by default for CP1 client capabilities, enabling all credentials to respond to claims challenges that occur due to insufficient claims. Claims challenges, for example, can occur due to requirements of [Continuous Access Enforcement (CAE)](https://learn.microsoft.com/entra/identity/conditional-access/concept-continuous-access-evaluation) and [Conditional Access authentication context](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/granular-conditional-access-for-sensitive-data-and-actions/ba-p/1751775). You may optionally disable this behavior by setting the environment variable `AZURE_IDENTITY_DISABLE_CP1` (to any value). You can read more about client capabilities, CAE, and Conditional Access on [the Microsoft Documentation](https://learn.microsoft.com/entra/identity-platform/claims-challenge).
- `ChainedTokenCredential` and `DefaultAzureCredential` now expose a property named `selectedCredential`, which will store the selected credential once any of the available credentials succeeds.
- Implementation of `ApplicationCredential` for use by applications which call into Microsoft Graph APIs and which have issues using `DefaultAzureCredential`. This credential is based on `EnvironmentCredential` and `ManagedIdentityCredential`.

### Breaking Changes

> These changes do not impact the API of stable versions such as 1.6.0.
> Only code written against a beta version such as 1.7.0b1 may be affected.

- Renamed `AZURE_POD_IDENTITY_TOKEN_URL` to `AZURE_POD_IDENTITY_AUTHORITY_HOST`.

### Bugs Fixed

- With this release, we've migrated from using `@azure/core-http` to `@azure/core-rest-pipeline` for the handling of HTTP requests. See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move. This removes our dependency on `node-fetch` and along with it issues we have seen in using this dependency in specific environments like Kubernetes pods.

## 1.5.0 (2021-07-19)

- With this release, we've migrated from using `@azure/core-http` to `@azure/core-rest-pipeline` for the handling of HTTP requests. See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move. This removes our dependency on `node-fetch` and along with it issues we have seen in using this dependency in specific environments like Kubernetes pods.

## 1.4.0 (2021-07-09)

- With this release, we drop support for Node.js versions that have reached the end of life, like Node.js 8. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated the default timeout of the first request of the IMDS MSI from half a second to three seconds to compensate for the slowness caused by `node-fetch` for initial requests in specific environments, like Kubernetes pods.
- Upgraded `@azure/core-http` to version `^2.0.0`, and `@azure/core-tracing` to version `1.0.0-preview.12`.

- Upgraded the `AuthorizationCodeCredential` to use the latest `@azure/msal-node`.

## 2.0.0-beta.4 (2021-07-07)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Introduced an extension API through a top-level method `useIdentityExtension`. The function accepts an "extension" as an argument, which is a function accepting a `context`. The extension context is an internal part of the Azure Identity API, so it has an `unknown` type. Two new packages are designed to be used with this API:
  - `@azure/identity-vscode`, which provides the dependencies of `VisualStudioCodeCredential` and enables it (see more below).
  - `@azure/identity-cache-persistence`, which provides persistent token caching (same as was available in version 2.0.0-beta.2, but now provided through a secondary extension package).
- Reintroduced a stub implementation of `VisualStudioCodeCredential`. If the `@azure/identity-vscode` extension is not used, then it will throw a `CredentialUnavailableError` (similar to how it previously behaved if the `keytar` package was not installed). The extension now provides the underlying implementation of `VisualStudioCodeCredential` through dependency injection.
- Reintroduced the `TokenCachePersistenceOptions` property on most credential constructor options. This property must be present with an `enabled` property set to true to enable persistent token caching for a credential instance. Credentials that do not support persistent token caching do not have this property.
- Added support to `ManagedIdentityCredential` for Bridge to Kubernetes local development authentication.
- Enabled PKCE on `InteractiveBrowserCredential` for Node.js. [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636) is a security feature that mitigates authentication code interception attacks.
- Added `LoginHint` property to `InteractiveBrowserCredentialOptions` which allows a user name to be pre-selected for interactive logins. Setting this option skips the account selection prompt and immediately attempts to login with the specified account.
- Added regional STS support to client credential types.
  - Added the `RegionalAuthority` type, that allows specifying Azure regions.
  - Added `regionalAuthority` property to `ClientSecretCredentialOptions` and `ClientCertificateCredentialOptions`.
  - If instead of a region, `AutoDiscoverRegion` is specified as the value for `regionalAuthority`, MSAL will be used to attempt to discover the region.
  - A region can also be specified through the `AZURE_REGIONAL_AUTHORITY_NAME` environment variable.
- `AzureCliCredential` and `AzurePowerShellCredential` now allow specifying a `tenantId`.
- All credentials except `ManagedIdentityCredential` support enabling multi tenant authentication via the `allowMultiTenantAuthentication` option.

### Breaking Changes

- Removed the protected method `getAzureCliAccessToken` from the public API of the `AzureCliCredential`. While it will continue to be available as part of v1, we won't be supporting this method as part of v2's public API.

### Key Bugs Fixed

- Fixed an issue in which `InteractiveBrowserCredential` on Node would sometimes cause the process to not respond if there was no browser available.
- Fixed an issue in which the `AZURE_AUTHORITY_HOST` environment variable was not properly picked up in Node.js.

## 2.0.0-beta.3 (2021-05-12)

### New features

- Azure Identity for JavaScript no longer carries any native dependencies (neither ordinary, peer, nor optional dependencies). Previous distributions of `@azure/identity` carried an optional dependency on `keytar`, which caused issues for some users in restrictive environments.
- Updated the `@azure/msal-node` dependency to version `^1.0.2`, which allows cancelling of an ongoing `getToken()` operation on `DeviceCodeCredential`.
- Fixed issue with the logging of success messages on the `DefaultAzureCredential` and the `ChainedTokenCredential`. These messages will now mention the internal credential that succeeded.
- `AuthenticationRequiredError` (introduced in 2.0.0-beta.1) now has the same impact on `ChainedTokenCredential` as the `CredentialUnavailableError` which is to allow the next credential in the chain to be tried.
- `ManagedIdentityCredential` now retries with exponential back-off when a request for a token fails with a 404 status code on environments with available IMDS endpoints.
- Added an `AzurePowerShellCredential` which will use the authenticated user session from the `Az.Account` PowerShell module. This credential will attempt to use PowerShell Core by calling `pwsh`, and on Windows it will fall back to Windows PowerShell (`powershell`) if PowerShell Core is not available.

### Breaking changes from 2.0.0-beta.1

- Removed `VisualStudioCodeCredential`, since it requires us to list [keytar](https://www.npmjs.com/package/keytar) as an optional dependency. `keytar` contains machine-code components that are difficult to build in certain environments, so this credential will be offered through a separate extension package in the future.
- Removed token persistence through `@azure/msal-node-extensions`, as its machine-code components have the same problems as `keytar`. This functionality will similarly be reintroduced through a separate extension package in the future.
- Removed `authenticationRecord`, `disableAutomaticAuthentication` and `authenticate()` from the credential `UsernamePasswordCredential`. While MSAL does support this, allowing `authenticationRecord` arguably could result in users authenticating through an account other than the one they're specifying with the username and the password.

## 2.0.0-beta.2 (2021-04-06)

- Breaking change: Renamed errors `CredentialUnavailable` to `CredentialUnavailableError`, and `AuthenticationRequired` to `AuthenticationRequiredError`, to align with the naming convention used for error classes in the Azure SDKs in JavaScript.
- Added `clientId` to the `AuthenticationRecord` type, alongsides the `tenantId` that this interface already had. Together they can be used to re-authenticate after recovering a previously serialized `AuthenticationRecord`.
- The `serialize()` method on the `AuthenticationRecord` object that allows an authenticated account to be stored as a string and re-used in another credential at any time, is removed in favor of a standalone function `serializeAuthenticationRecord` similar to how we have the `deserializeAuthenticationRecord` function.
- `serializeAuthenticationRecord` now serializes into a JSON string with camel case properties. This makes it re-usable across languages.
- Removed the interface `PersistentCredentialOptions` (introduced in `2.0.0-beta.1`) and instead inlined the options for the persistent cache feature in the options of individual credentials.
- Added properties `scopes` and `getTokenOptions` to the AuthenticationRequired error. These properties hold the values used by the `getToken()` method on your credential to fetch the access token. You should pass these to the `authenticate()` method on your credential if you wanted to do manual authentication after catching the `AuthenticationRequired` error.
- `InteractiveBrowserCredential` no longer supports [Implicit Grant Flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-implicit-grant-flow) and will only support [Auth Code Flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) instead. Therefore the `flow` option introduced in `1.2.4-beta.1` has been removed. More information from the documentation on Implicit Grant Flow:

> With the plans for [third party cookies to be removed from browsers](https://learn.microsoft.com/entra/identity-platform/reference-third-party-cookies-spas), the **implicit grant flow is no longer a suitable authentication method**. The [silent SSO features](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-implicit-grant-flow#getting-access-tokens-silently-in-the-background) of the implicit flow do not work without third party cookies, causing applications to break when they attempt to get a new token. We strongly recommend that all new applications use the authorization code flow that now supports single page apps in place of the implicit flow, and that [existing single page apps begin migrating to the authorization code flow](https://learn.microsoft.com/entra/identity-platform/migrate-spa-implicit-to-auth-code) as well.

## 1.3.0 (2021-04-05)

### Tracing Changes

- Updated @azure/core-tracing to version `1.0.0-preview.11`. See [@azure/core-tracing CHANGELOG](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-tracing/CHANGELOG.md) for details about breaking changes with tracing.

## 2.0.0-beta.1 (2021-03-24)

This update marks the preview for the first major version update of the `@azure/identity` package since the first stable version was released in October, 2019. This is mainly driven by the improvements we are making for the `InteractiveBrowserCredential` when used in browser applications by updating it to use the new `@azure/msal-browser` which is replacing the older `msal` package.

### Breaking changes

- Changes to `InteractiveBrowserCredential`
  - When used in browser applications, the `InteractiveBrowserCredential` has been updated to use the [Auth Code Flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-implicit-grant-flow) by default to better support browsers with enhanced security restrictions. Please note that this credential always used the Auth Code Flow when used in Node.js applications. Read more on this in our [docs on Interactive Browser Credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).
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
- Changes to `InteractiveBrowserCredential` and `DeviceCodeCredential`:
  - You can now control when the credential requests user input with the new `disableAutomaticAuthentication` option added to the options you pass to the credential constructors.
    - When enabled, this option stops the `getToken()` method from requesting user input in case the credential is unable to authenticate silently.
    - If `getToken()` fails to authenticate without user interaction, and `disableAutomaticAuthentication` has been set to true, a new error will be thrown: `AuthenticationRequired`. You may use this error to identify scenarios when manual authentication needs to be triggered (with `authenticate()`, as described in the next point).
  - A new method `authenticate()` is added to these credentials which is similar to `getToken()`, but it does not read the `disableAutomaticAuthentication` option described above.
    - Use this to get an `AuthenticationRecord` which you can then use to create new credentials that will re-use the token information.
    - The `AuthenticationRecord` object has a `serialize()` method that allows an authenticated account to be stored as a string and re-used in another credential at any time. Use the new helper function `deserializeAuthenticationRecord` to de-serialize this string.
    - `authenticate()` might succeed and still return `undefined` if we're unable to pick just one account record from the cache. This might happen if the cache is being used by more than one credential, or if multiple users have authenticated using the same Client ID and Tenant ID. To ensure consistency on a program with many users, please keep track of the `AuthenticationRecord` and provide them in the constructors of the credentials on initialization.

### Other changes

- Updated the `@azure/msal-node` dependency to `^1.0.0`.
- `DefaultAzureCredential`'s implementation for browsers is simplified to throw the `BrowserNotSupportedError` in its constructor. Previously, we relied on getting the same error from trying to instantiate the different credentials that `DefaultAzureCredential` supports in Node.js.
  - As before, please use only the `InteractiveBrowserCredential` in your browser applications.
- For the `InteractiveBrowserCredential` for node, replaced the use of the `express` module with a native http server for Node, shrinking the resulting identity module considerably.

## 1.2.4 (2021-03-08)

This release doesn't have the changes from `1.2.4-beta.1`.

- Bug fix: Now if the `managedIdentityClientId` optional parameter is provided to `DefaultAzureCredential`, it will be properly passed through to the underlying `ManagedIdentityCredential`. Related to customer issue: [13872](https://github.com/Azure/azure-sdk-for-js/issues/13872).
- Bug fix: `ManagedIdentityCredential` now also properly handles `EHOSTUNREACH` errors. Fixes issue [13894](https://github.com/Azure/azure-sdk-for-js/issues/13894).

## 1.2.4-beta.1 (2021-02-12)

- Breaking Change: Updated `InteractiveBrowserCredential` to use the Auth Code Flow with PKCE rather than Implicit Grant Flow by default in the browser, to better support browsers with enhanced security restrictions. A new file was added to provide more information about this credential [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).

## 1.2.3 (2021-02-09)

- Fixed Azure Stack support for the Node.js version of the `InteractiveBrowserCredential`. Fixes issue [11220](https://github.com/Azure/azure-sdk-for-js/issues/11220).
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

- Introduced the `AuthorizationCodeCredential` for performing the [authorization code flow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-auth-code-flow) with Microsoft Entra ID ([PR #5356](https://github.com/Azure/azure-sdk-for-js/pull/5356))
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

For release notes and more information please visit <https://aka.ms/azsdk/releases/july2019preview>

- Introduced the following credential types:
  - `DefaultAzureCredential`.
  - `EnvironmentCredential`.
  - `ManagedIdentityCredential`.
  - `ClientSecretCredential`.
  - `ClientCertificateCredential`.
  - `ChainedTokenCredential`.
