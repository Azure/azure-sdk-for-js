# Migrate from v1 to v2 of @azure/identity

Version 2 of the `@azure/identity` package includes the best parts of version 1, plus several improvements.

If you're moving from version 1 to version 2, you're in the right place. In this document we will show you what needs to be updated.

For the full set of changes and bug fixes, please refer to our changelog: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/CHANGELOG.md

## Table of contents

- [Update your package.json](#update-your-package-json)
- [Update the handling of authentication errors](#update-the-handling-of-authentication-errors).
- [Controlling interactive authentication](#controlling-interactive-authentication).
- [Changes to your browser authentication flow](#changes-to-your-browser-authentication-flow).
- [Asynchronous verification of certificates on ClientCertificateCredential](#asynchronous-verification-of-certificates-on-clientcertificatecredential).
- [Other changes to existing credentials](#other-changes-to-existing-credentials).
- [New Plugins API](#new-plugins-api)
  - [Persistent token cache plugin](#persistent-token-cache-plugin)
  - [VisualStudioCodeCredential plugin](#visualstudiocodecredential-plugin)
- [Troubleshooting](#troubleshooting)
- [Provide feedback](#provide-feedback)
- [Contributing](#contributing)

## Update your package.json

First, make sure to update your package.json to point to the version 2 of Identity:

```diff
  "dependencies": {
-     "@azure/identity": "^1.5.2",
+     "@azure/identity": "^2.0.0"
  }
```

If you used to use the `VisualStudioCodeCredential`, you might have `keytar` in your dependencies. If you want to continue using this credential, you will need to install a new package: [`@azure/identity-vscode`](https://www.npmjs.com/package/@azure/identity-vscode). This plugin package now provides the underlying implementation of `VisualStudioCodeCredential` through dependency injection. You can read more in our [New Plugins API](#new-plugins-api) section.

## Update the handling of authentication errors

For our version 2 of Identity, we've renamed the error `CredentialUnavailable` to `CredentialUnavailableError`, to align with the naming convention used for error classes in the Azure SDKs in JavaScript.

We're also now ensuring error handling can be done through checking the name of the error, instead of using `instanceof`.

If you were intercepting authentication errors, make sure to update your error handling code, as follows:

```diff
  // Assuming you're using the DefaultAzureCredential
  const credential = new DefaultAzureCredential();

  // Assuming you're using the `KeyClient` from @azure/keyvault-keys
  const client = new KeyClient(`https://name.vault.azure.net`, credential);

  // If intercepting authentication errors coming from an SDK client:
  try {
    await client.createKey("key1", "RSA");
  } catch(error) {
-    if (error instanceof CredentialUnavailable) {
+    if (error.name === `CredentialUnavailableError`) {
      console.error("Authentication error", error);
    }
  }

  // If intercepting authentication errors directly from getToken:
  try {
    const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
-    if (error instanceof CredentialUnavailable) {
+    if (error.name === `CredentialUnavailableError`) {
      console.error("Authentication error", error);
    }
  }
```

We've also introduced a new error, named `AuthenticationRequiredError`. This error will show up when a credential fails to authenticate by re-using the credentials stored in the cache. This is particularly relevant if one decides to have more direct [control of the interactive authentication](#controlling-interactive-authentication) of those credentials that require user interaction, like `DeviceCodeCredential` and `InteractiveBrowserCredential`.

Errors and logged exceptions may now point to the new [troubleshooting guidelines](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/Troubleshooting.md).

## Controlling interactive authentication

For our version 2 of Identity, we've made special changes to `InteractiveBrowserCredential`, `DeviceCodeCredential`, and `UsernamePasswordCredential`.

You can now control when the credential requests user input with the new `disableAutomaticAuthentication` option added to the options you pass to the credential constructors.
  - When enabled, this option stops the `getToken()` method from requesting user input in case the credential is unable to authenticate silently.
  - If `getToken()` fails to authenticate without user interaction, and `disableAutomaticAuthentication` has been set to `true`, a new `AuthenticationRequired` error will be thrown. You may use this error to identify scenarios when manual authentication needs to be triggered (with `authenticate()`, as described in the next point).

We have also added a new method to these credentials called `authenticate()`, which is similar to `getToken()`, but it doesn't read the `disableAutomaticAuthentication` option described above.
  - `authenticate()` returns an `AuthenticationRecord` which can be reuse the token information on new credentials.
  - `authenticate()` might succeed and still return `undefined` if we're unable to pick just one account record from the cache. This might happen if the cache is being used by more than one credential, or if multiple users have authenticated using the same Client ID and Tenant ID. To ensure consistency on a program with many users, keep track of the `AuthenticationRecord` and provide them in the constructors of the credentials on initialization.

To store the `AuthenticationRecord` as a string, and then re-use it in the future, we have provided two new methods: `serializeAuthenticationRecord` and `deserializeAuthenticationRecord`.

A sample using the `DeviceCodeCredential` follows. Keep in mind that this example uses the `@azure/identity-cache-persistence` package, which is discussed in the section for our [New Plugins API](#new-plugins-api) section:

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

## Changes to your browser authentication flow

On the browser, the `InteractiveBrowserCredential` will now use the [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) to better support browsers with enhanced security restrictions.

To migrate to our version 2 of the `InteractiveBrowserCredential`, your Azure Active Directory App Registration needs to change. You can either create a [new app registration](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#create-the-app-registration), or you can [update your existing app registration to support the Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/migrate-spa-implicit-to-auth-code).

Read more on this in our [docs on Interactive Browser Credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).

Besides that, we have removed the `postLogoutRedirectUri` from the options to the constructor for `InteractiveBrowserCredential`. This option was not being used since we don't have a way for users to log out yet. If you were using this option, we recommend using MSAL directly to unlock all of the possible features related to browser authentication. You can read more through this link: [Authenticating with the @azure/msal-browser Public Client](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-the-azuremsal-browser-public-client).

## Asynchronous verification of credentials on ClientCertificateCredential

On version 1 of Identity, if a path to an invalid PEM certificate is provided to the constructor of `ClientCertificateCredential`, the constructor will throw immediately. On version 2, this validation will only happen on the `getToken` method.

This change will not be visible unless you were counting on verifying possible PEM certificate errors through the constructor call of this credential, in which case you will need to change your code to do the error handling on the `getToken` call.

```diff
-   try {
-     const credential = new ClientCertificateCredential(tenantId, clientId, certificatePath);
-   } catch(error) {
-     // Invalid credential path.
-   }
+   const credential = new ClientCertificateCredential(tenantId, clientId, certificatePath);
+   try {
+     const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
+   } catch(error) {
+     // Invalid credential path.
+   }
```

## Other changes to existing credentials

For `@azure/identity` version 2.0.0, we've made some changes across credentials that will differ from the experience provided by our version one package. These changes are as follows:

- Once any of the Node.js credentials of `@azure/identity` version 2.0.0 is initialized, it will now do a first request to discover relevant endpoint metadata information from Azure.
- When a token is unavailable, some credentials had the promise returned by the `getToken` method resolve with `null`; others had the `getToken` method throw the `CredentialUnavailable` error. This behavior is now made consistent across all credentials to throw the `CredentialUnavailable` error.
  - This change has no bearing on the user if all they ever did was create the credentials and pass it to the Azure SDKs.
  - This change affects only those users who called the `getToken()` method directly and did not handle resulting errors.
- For the version 2 of the Identity package, we have removed the protected method `getAzureCliAccessToken` from the public API of the `AzureCliCredential`. This method was only used internally, and is now obsolete.

## New Plugins API

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
