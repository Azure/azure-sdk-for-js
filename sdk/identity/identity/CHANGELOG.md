# Release History

## 2.0.5 (2022-06-22)

### Bugs Fixed

- Fixed a bug in `InteractiveBrowserCredential` for Mac OS where the [app was not getting closed](https://github.com/Azure/azure-sdk-for-js/issues/21726) after the authorization succeeded.
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

This changelog entry showcases the changes that have been made from version 1 of this package. See the [v1-to-v2 migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/migration-v1-v2.md) for details on how to upgrade your application to use the version 2 of `@azure/identity`. For information on troubleshooting the Identity package, see the [troubleshooting guide](https://aka.ms/azsdk/js/identity/troubleshoot).

### Features Added

#### Plugin API

Identity v2 provides a top-level `useIdentityPlugin` function, which allows using two new plugin packages:

- [@azure/identity-vscode](https://www.npmjs.com/package/@azure/identity-vscode), which provides the dependencies of `VisualStudioCodeCredential` and enables it.
  - If the `@azure/identity-vscode` plugin isn't used through the `useIdentityPlugin` function, the `VisualStudioCodeCredential` exposed by Identity v2 will throw a `CredentialUnavailableError`.
- [@azure/identity-cache-persistence](https://www.npmjs.com/package/@azure/identity-cache-persistence), which provides persistent token caching.

Most credentials on Identity v2 now support the persistent token caching feature. Such credentials include the property [tokenCachePersistenceOptions](https://docs.microsoft.com/javascript/api/@azure/identity/tokencachepersistenceoptions) in the constructor options which can be used to enable this feature.

The following example showcases how to enable persistence caching by first enabling the `@azure/identity-cache-persistence` plugin with `useIdentityPlugin(cachePersistencePlugin)`, and then passing the `tokenCachePersistenceOptions` through the constructor of the `DeviceCodeCredential`:

```ts
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";
import { useIdentityPlugin, DeviceCodeCredential } from "@azure/identity";

useIdentityPlugin(cachePersistencePlugin);

async function main() {
  const credential = new DeviceCodeCredential({
    tokenCachePersistenceOptions: {
      enabled: true
    }
  });
}
```

#### New credentials

Identity v2 includes two new credential types:

- `AzurePowerShellCredential`, which re-uses any account previously authenticated with the `Az.Account` PowerShell module.
- `OnBehalfOfCredential`, which enables the [On-Behalf-Of authentication flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).

#### New features in all credentials

Identity v2 enables:

- Support for claims challenges resulting from [Continuous Access Enforcement (CAE)](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation) and [Conditional Access authentication context](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/granular-conditional-access-for-sensitive-data-and-actions/ba-p/1751775).
  - By default, credentials of Identity v2 will produce tokens that can be used to trigger the challenge authentication flows. After these tokens expire, the next HTTP requests to Azure will fail, but the response will contain information to re-authenticate.
  - To disable this behavior, set the environment variable `AZURE_IDENTITY_DISABLE_CP1` to any value. For more about claims challenges, see [Claims challenges, claims requests, and client capabilities](https://docs.microsoft.com/azure/active-directory/develop/claims-challenge).
- Support for multi-tenant authentication on all credentials except `ManagedIdentityCredential`.
  - At the moment, applications needing multi-tenancy support will need to call to the credentials' `getToken` directly, sending the new `tenantId` property.
  - A sample with more context will be provided in a future date.
  - To disable it, set the environment variable `AZURE_IDENTITY_DISABLE_MULTITENANTAUTH`. For more about multitenancy, see [Identity management in multitenant apps](https://docs.microsoft.com/azure/architecture/multitenant-identity/).

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
  - The `InteractiveBrowserCredential` will use the [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) to better support browsers with enhanced security restrictions. Learn how to migrate in the [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/migration-v1-v2.md). Read more about the latest `InteractiveBrowserCredential` [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).
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

- Added the `OnBehalfOfCredential`, which allows users to authenticate through the [On-Behalf-Of authentication flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).
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

- This release adds support by default for CP1 client capabilities, enabling all credentials to respond to claims challenges that occur due to insufficient claims. Claims challenges, for example, can occur due to requirements of [Continuous Access Enforcement (CAE)](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation) and [Conditional Access authentication context](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/granular-conditional-access-for-sensitive-data-and-actions/ba-p/1751775). You may optionally disable this behavior by setting the environment variable `AZURE_IDENTITY_DISABLE_CP1` (to any value). You can read more about client capabilities, CAE, and Conditional Access on [the Microsoft Documentation](https://docs.microsoft.com/azure/active-directory/develop/claims-challenge).
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
- `InteractiveBrowserCredential` no longer supports [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) and will only support [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) instead. Therefore the `flow` option introduced in `1.2.4-beta.1` has been removed. More information from the documentation on Implicit Grant Flow:

> With the plans for [third party cookies to be removed from browsers](https://docs.microsoft.com/azure/active-directory/develop/reference-third-party-cookies-spas), the **implicit grant flow is no longer a suitable authentication method**. The [silent SSO features](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow#getting-access-tokens-silently-in-the-background) of the implicit flow do not work without third party cookies, causing applications to break when they attempt to get a new token. We strongly recommend that all new applications use the authorization code flow that now supports single page apps in place of the implicit flow, and that [existing single page apps begin migrating to the authorization code flow](https://docs.microsoft.com/azure/active-directory/develop/migrate-spa-implicit-to-auth-code) as well.

## 1.3.0 (2021-04-05)

### Tracing Changes

- Updated @azure/core-tracing to version `1.0.0-preview.11`. See [@azure/core-tracing CHANGELOG](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-tracing/CHANGELOG.md) for details about breaking changes with tracing.

## 2.0.0-beta.1 (2021-03-24)

This update marks the preview for the first major version update of the `@azure/identity` package since the first stable version was released in October, 2019. This is mainly driven by the improvements we are making for the `InteractiveBrowserCredential` when used in browser applications by updating it to use the new `@azure/msal-browser` which is replacing the older `msal` package.

### Breaking changes

- Changes to `InteractiveBrowserCredential`
  - When used in browser applications, the `InteractiveBrowserCredential` has been updated to use the [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) by default to better support browsers with enhanced security restrictions. Please note that this credential always used the Auth Code Flow when used in Node.js applications. Read more on this in our [docs on Interactive Browser Credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).
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
