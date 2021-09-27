# Migrate from v1 to v2 of @azure/identity

Version 2 of the `@azure/identity` package includes the best parts of version 1, plus several improvements. In this document, we'll expand upon the changes.

For the full set of changes and bug fixes, please refer to our changelog: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/Troubleshooting.md

## Table of contents

- [Dependency changes](#dependency-changes)
- [Errors](#errors)
- [New credentials](#new-credentials)
- [Changes to existing credentials](#changes-to-existing-credentials)
  - [Changes to all credentials in general](#changes-to-all-credentials-in-general)
  - [Changes to the interactive credentials](#changes-to-the-interactive-credentials)
  - [Changes to ClientSecretCredential and ClientCertificateCredential](#changes-to-clientsecretcredential-and-clientcertificatecredential)
  - [Changes to the ManagedIdentityCredential](#changes-to-the-managedidentitycredential)
  - [Changes to the InteractiveBrowserCredential](#changes-to-the-interactivebrowsercredential)
  - [Changes to the AzureCliCredential](#changes-to-the-azureclicredential)
  - [Changes to the DeviceCodeCredential](#changes-to-the-devicecodecredential)
  - [Changes to the VisualStudioCodeCredential](#changes-to-the-visualstudiocodecredential)
- [Plugins](#plugins)
  - [Persistent token cache plugin](#persistent-token-cache-plugin)
  - [VisualStudioCodeCredential plugin](#visualstudiocodecredential-plugin)
- [Troubleshooting](#troubleshooting)
- [Provide feedback](#provide-feedback)
- [Contributing](#contributing)

## Dependency changes

Version 2 of Azure Identity for JavaScript no longer includes native dependencies (neither ordinary, peer, nor optional dependencies). Previous distributions of `@azure/identity` included an optional dependency on `keytar`, which caused issues for some users in restrictive environments.

Version 2 of Azure Identity for JavaScript now also depends on the latest available versions of `@azure/msal-common`, `@azure/msal-node`, and `@azure/msal-browser`. Our goal is to always be up-to-date with the MSAL versions.

Using the latest MSAL changes how credentials behave in the following ways:

- The initial authentication attempt in the lifetime of your application will include an additional request to first discover relevant endpoint metadata information from Azure.
- On the browser, the `InteractiveBrowserCredential` will now use the [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) to better support browsers with enhanced security restrictions.
  - To migrate to our version 2 of the `InteractiveBrowserCredential`, your Azure Active Directory App Registration needs to change. You can either create a [new app registration](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#create-the-app-registration), or you can [update your existing app registration to support the Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#redirect-uri-msaljs-20-with-auth-code-flow).
  - Read more on this in our [docs on Interactive Browser Credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).

## Errors

For our version 2 of Identity, we've renamed the error `CredentialUnavailable` to `CredentialUnavailableError`, to align with the naming convention used for error classes in the Azure SDKs in JavaScript.

We've also introduced a new error, named `AuthenticationRequiredError`. This error will show up when a credential fails to authenticate silently and has the same impact on `ChainedTokenCredential` as the `CredentialUnavailableError`, which is to allow the next credential in the chain to be tried.

Most importantly, errors and logged exceptions may now point to the new [troubleshooting guidelines](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/Troubleshooting.md).

## New credentials

As of October 2021, version 2 of the `@azure/identity` package includes three new credential types. More will be added in the future.

- `AzurePowerShellCredential`, which will use the authenticated user session from the `Az.Account` PowerShell module. This credential will attempt to use PowerShell Core by calling `pwsh`, and on Windows it will fall back to Windows PowerShell (`powershell`) if PowerShell Core is not available.
- `ApplicationCredential`, for use by applications which call into Microsoft Graph APIs and which have issues using `DefaultAzureCredential`. This credential is based on `EnvironmentCredential` and `ManagedIdentityCredential`.
- `OnBehalfOfCredential`, which allows users to authenticate through the [On-Behalf-Of authentication flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow).

## Changes to existing credentials

For our version 2 of the Identity SDK for JavaScript and TypeScript, we've also included several improvements to our existing credentials.

### Changes to all credentials in general

For `@azure/identity` version 2.0.0, we've made some changes across credentials that will differ from the experience provided by our version one package. These changes are as follows:

- Once any of the Node.js credentials of `@azure/identity` version 2.0.0 is initialized, it will now do a first request to discover relevant endpoint metadata information from Azure.
- We've added CP1 client capabilities by default, enabling all credentials to respond to claims challenges that occur due to insufficient claims. Claims challenges, for example, can occur due to requirements of [Continuous Access Enforcement (CAE)](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation) and [Conditional Access authentication context](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/granular-conditional-access-for-sensitive-data-and-actions/ba-p/1751775). You may optionally disable this behavior by setting the environment variable `AZURE_IDENTITY_DISABLE_CP1` (to any value). You can read more about client capabilities, CAE, and Conditional Access on [the Microsoft Documentation](https://docs.microsoft.com/azure/active-directory/develop/claims-challenge).
- All credentials except `ManagedIdentityCredential` support enabling multitenant authentication via the `allowMultiTenantAuthentication` option. If this option is set to `true` on any of the relevant credentials constructor, credentials will allow swapping the tenant ID originally specified in the constructor for a tenant ID received in the `GetTokenOptions`. For more about multitenancy, see [Identity management in multitenant applications](https://docs.microsoft.com/azure/architecture/multitenant-identity/).
- When a token is unavailable, some credentials had the promise returned by the `getToken` method resolve with `null`; others had the `getToken` method throw the `CredentialUnavailable` error. This behavior is now made consistent across all credentials to throw the `CredentialUnavailable` error.
  - This change has no bearing on the user if all they ever did was create the credentials and pass it to the Azure SDKs.
  - This change affects only those users who called the `getToken()` method directly and did not handle resulting errors.

### Changes to the interactive credentials

For our version 2 of Identity, we've made special changes to `InteractiveBrowserCredential`, `DeviceCodeCredential`, and `UsernamePasswordCredential`.

- You can now control when the credential requests user input with the new `disableAutomaticAuthentication` option added to the options you pass to the credential constructors.
  - When enabled, this option stops the `getToken()` method from requesting user input in case the credential is unable to authenticate silently.
  - If `getToken()` fails to authenticate without user interaction, and `disableAutomaticAuthentication` has been set to `true`, a new `AuthenticationRequired` error will be thrown. You may use this error to identify scenarios when manual authentication needs to be triggered (with `authenticate()`, as described in the next point).
- A new method `authenticate()` is added to these credentials, which is similar to `getToken()`, but it doesn't read the `disableAutomaticAuthentication` option described above.
  - Use this to get an `AuthenticationRecord` which you can then use to create new credentials that will reuse the token information.
  - `authenticate()` might succeed and still return `undefined` if we're unable to pick just one account record from the cache. This might happen if the cache is being used by more than one credential, or if multiple users have authenticated using the same Client ID and Tenant ID. To ensure consistency on a program with many users, keep track of the `AuthenticationRecord` and provide them in the constructors of the credentials on initialization.
- We've also provided two new methods: `serializeAuthenticationRecord` and `deserializeAuthenticationRecord`. They allow an authenticated account retrieved by the `authenticate()` method to be stored as a string and reused in another credential at any time.

A sample using the `DeviceCodeCredential` follows. Keep in mind that this example uses the `@azure/identity-cache-persistence` package, which is discussed in the [plugins](#plugins) section:

```ts
import { DeviceCodeCredential, serializeAuthenticationRecord,  deserializeAuthenticationRecord, useIdentityPlugin } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";

useIdentityPlugin(cachePersistencePlugin);

// An in-memory example of how the account information can be saved in a serialized way.
let accountCache: string;

async function main() {
  // First we need to configure our shared persistence layer
  const tokenCachePersistenceOptions: TokenCachePersistenceOptions = {
    enabled: true,
    name: "my-shared-persistence"
  };

 const firstCredential = new DeviceCodeCredential({
    // To be able to re-use the account, the Token Cache must also have been provided.
    tokenCachePersistenceOptions
  });

  const account = await firstCredential.authenticate(`https://servicebus.azure.net/.default`);

  accountCache = serializeAuthenticationRecord(account);
  
  // The `account` variable could be used directly, but to showcase the serialization, we will deserialize the `accountCache` string variable.

  const secondCredential = new DeviceCodeCredential({
    // authenticationRecord: account // could also be used
    authenticationRecord: deserializeAuthenticationRecord(accountCache),
    // To be able to re-use the account, the Token Cache must also have been provided.
    tokenCachePersistenceOptions
  });

  // This getToken method will use the already retrieved credential. It will retrieve it from the cache, and it won't prompt users to authenticate using the typical device code interactive flow.
  const accessToken = await secondCredential.getToken(`https://servicebus.azure.net/.default`)
  console.log({ accessToken });
}

main();
```

### Changes to ClientSecretCredential and ClientCertificateCredential

For our version 2 of the `@azure/identity` package, we've added regional STS support to the `ClientSecretCredential` and the `ClientCertificateCredential`. First, we've added a new enum type called `RegionalAuthority`, which contains values for all of the possible regions supported by Azure. Then, we've added a new property called `regionalAuthority` to the `ClientSecretCredentialOptions` and the `ClientCertificateCredentialOptions`, however the Azure region can also be specified through the `AZURE_REGIONAL_AUTHORITY_NAME` environment variable. If instead of a region, `AutoDiscoverRegion` is specified as the value for `regionalAuthority`, MSAL will be used to attempt to discover the region.

For `ClientCertificateCredential` specifically, now the validity of the PEM certificate is evaluated on `getToken` and not on the constructor.

### Changes to the ManagedIdentityCredential

For our version 2 of the Identity package, the `ManagedIdentityCredential` now retries with exponential back-off when a request for a token fails with a 404 status code on environments with available IMDS endpoints. Besides that, the `ManagedIdentityCredential` now also supports token exchange authentication.

### Changes to the InteractiveBrowserCredential

`InteractiveBrowserCredential` no longer supports [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) and will only support [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) instead. More information from the documentation on Implicit Grant Flow:

> With the plans for [third party cookies to be removed from browsers](https://docs.microsoft.com/azure/active-directory/develop/reference-third-party-cookies-spas), the **implicit grant flow is no longer a suitable authentication method**. The [silent SSO features](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow#getting-access-tokens-silently-in-the-background) of the implicit flow do not work without third party cookies, causing applications to break when they attempt to get a new token. We strongly recommend that all new applications use the authorization code flow that now supports single page apps in place of the implicit flow, and that [existing single page apps begin migrating to the authorization code flow](https://docs.microsoft.com/azure/active-directory/develop/migrate-spa-implicit-to-auth-code) as well.

Besides that:

- The default client ID used for `InteractiveBrowserCredential` was viable only in Node.js and not for the browser. Therefore, client Id is now a required parameter when constructing this credential in browser applications.
- The browser-specific constructor options like `loginStyle` will now show up only when used in browser applications as these were never applicable to Node.js.
- Removed the `postLogoutRedirectUri` from the options to the constructor for `InteractiveBrowserCredential`. This option was not being used since we don't have a way for users to log out yet.
- Enabled PKCE on `InteractiveBrowserCredential` for Node.js. [Proof Key for Code Exchange (PKCE)](https://datatracker.ietf.org/doc/html/rfc7636) is a security feature that mitigates authentication code interception attacks.
- Added `LoginHint` property to `InteractiveBrowserCredentialOptions` which allows a user name to be pre-selected for interactive logins. Setting this option skips the account selection prompt and immediately attempts to log in with the specified account.

### Changes to the AzureCliCredential

For the version 2 of the Identity package, the `AzureCliCredential` now allow specifying a `tenantId`.

### Changes to the DeviceCodeCredential

For the version 2 of the Identity package, we have removed the protected method `getAzureCliAccessToken` from the public API of the `AzureCliCredential`. This method was only used internally, and is now obsolete.

### Changes to the VisualStudioCodeCredential

For the version `2.0.0` of the `@azure/identity` package, we have moved the `VisualStudioCodeCredential` implementation from the public API into its own plugin package. On the public API, we've left only a stub of the original credential, that if used will throw a `CredentialUnavailableError` with information on how to enable it. Moving this credential away from the main package allow us to remove the `keytar` dependency, so now we can provide a main Identity package with no binary dependencies. Information on the new plugin package comes in the following section, [plugins](#plugins).

## Plugins

As part of the Identity 2.0 release, we've released two new packages:

- `@azure/identity-cache-persistence` &mdash; Provides persistent token caching.
- `@azure/identity-vscode` &mdash; Provides the dependencies of `VisualStudioCodeCredential` and enables it through dependency injection.

These packages are called _plugins_. They're meant to extend the public API of the main `@azure/identity` package, once enabled in your app.

With this release, we've introduced a top-level method `useIdentityPlugin`. The function accepts a "plugin" as an argument, which is a function accepting a `context`. The plugin context is an internal part of the Azure Identity API, so it has an `unknown` type.

Let's explore these two plugins in more detail.

### Persistent token cache plugin

The new [`@azure/identity-cache-persistence`](https://npmjs.com/package/@azure/identity-cache-persistence) package provides a plugin to the Azure Identity library for JavaScript that enables persistent token caching. Token cache persistence allows the built-in token cache to persist across sessions using a secure storage system provided by the local operating system.

This package exports a plugin object that you must pass as an argument to the top-level `useIdentityPlugin` function from the `@azure/identity` package. Enable token cache persistence in your app as follows:

```javascript
import { useIdentityPlugin } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";

useIdentityPlugin(cachePersistencePlugin);
```

After calling `useIdentityPlugin`, the persistent token cache plugin is registered to the `@azure/identity` package. The plugin will be available on all credentials that support persistent token caching (those that have `tokenCachePersistenceOptions` in their constructor options).

Once the plugin is registered, you can enable token cache persistence by passing `tokenCachePersistenceOptions` with an `enabled` property set to `true` to a credential constructor. In the following example, we use the `DeviceCodeCredential`, since persistent caching of its tokens allows you to skip the interactive device-code authentication flow if a cached token is available.

```javascript
import { useIdentityPlugin, DeviceCodeCredential } from "@azure/identity";
import { cachePersistencePlugin } from "@azure/identity-cache-persistence";

useIdentityPlugin(cachePersistencePlugin);

async function main() {
  const credential = new DeviceCodeCredential({
    tokenCachePersistenceOptions: {
      enabled: true
    }
  });

  // We'll use the Microsoft Graph scope as an example
  const scope = "https://graph.microsoft.com/.default";

  // Print out part of the access token
  console.log((await credential.getToken(scope)).token.substr(0, 10), "...");
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
```

### VisualStudioCodeCredential plugin

The new [`@azure/identity-vscode`](https://npmjs.com/package/@azure/identity-vscode) package enables authentication through the [Azure Account](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) extension for Visual Studio Code. This plugin provides the dependencies of the `VisualStudioCodeCredential` in `@azure/identity` and allows using the `DefaultAzureCredential` to authenticate with the account used in the Visual Studio Code extension.

This package exports a plugin object that you must pass as an argument to the top-level `useIdentityPlugin` function from the `@azure/identity` package. Enable token cache persistence in your app as follows:

```javascript
import { useIdentityPlugin } from "@azure/identity";
import { vsCodePlugin } from "@azure/identity-vscode";

useIdentityPlugin(vsCodePlugin);
```

After calling `useIdentityPlugin`, the `VisualStudioCodeCredential` from the `@azure/identity` package will be enabled. If this plugin isn't used, `VisualStudioCodeCredential` will throw a `CredentialUnavailableError` and be unavailable as part of `DefaultAzureCredential`.

Once the plugin is registered, you can use `VisualStudioCodeCredential` in a similar fashion to the other credential classes in `@azure/identity`:

```javascript
import { useIdentityPlugin, VisualStudioCodeCredential } from "@azure/identity";
import { vsCodePlugin } from "@azure/identity-vscode";

useIdentityPlugin(vsCodePlugin);

async function main() {
  const credential = new VisualStudioCodeCredential();

  // The graph.microsoft.com scope is used as an example
  const scope = "https://graph.microsoft.com/.default";

  // Print out part of the access token
  console.log((await credential.getToken(scope)).token.substr(0, 10), "...");
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
```

You can also use `DefaultAzureCredential`, which will attempt to authenticate using the "Azure Account" extension for Visual Studio Code if it's available:

```javascript
import { useIdentityPlugin, DefaultAzureCredential } from "@azure/identity";
import { vsCodePlugin } from "@azure/identity-vscode";

useIdentityPlugin(vsCodePlugin);

async function main() {
  // With the plugin enabled above, `DefaultAzureCredential` will use
  // Visual Studio Code's "Azure Account" extension to authenticate if
  // it is available.
  const credential = new DefaultAzureCredential();

  // This will print a JWT access_token and its expiration timestamp
  // The graph.microsoft.com scope is used as an example
  console.log("Token:", await credential.getToken("https://graph.microsoft.com/.default"));
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
```

## Troubleshooting

As part of our version 2 release, we're now providing a Troubleshooting Guide. This guide will be improved over time to include solutions to many common problems, as we discover them, and as they get reported to us by our customers. Upon throwing errors and exception logs, we're now pointing users to this troubleshooting guide. This guide is available through the following link: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/Troubleshooting.md

## Provide feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

To contribute to this library, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
