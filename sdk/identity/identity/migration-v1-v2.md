# Migrate from v1 to v2 of @azure/identity

Version 2 of the `@azure/identity` package includes the best parts of version 1, plus several improvements.

If you're moving from version 1 to version 2, you're in the right place. In this document we will show you what needs to be updated.

For the full set of changes and bug fixes, please refer to our [changelog](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/CHANGELOG.md#200-2021-10-12)

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

If you're using the `VisualStudioCodeCredential`, you likely have `keytar` in your dependencies. Our version 2 of Identity does not have any binary dependency. We have moved these to new Plugin packages. To continue using the `VisualStudioCodeCredential`, please install the [`@azure/identity-vscode`](https://www.npmjs.com/package/@azure/identity-vscode) package.

To read more about our plugins, visit our [New Plugins API](#new-plugins-api) section.
## Update the handling of authentication errors

For our version 2 of Identity, we've renamed the error `CredentialUnavailable` to `CredentialUnavailableError`, to align with the naming convention used for error classes in the Azure SDKs in JavaScript.

We're also now ensuring error handling can be done through checking the name of the error, instead of using `instanceof`.

If you were intercepting authentication errors, make sure to update your error handling code, as follows:

```diff
  // Assuming you're using the `DefaultAzureCredential`:
  const credential = new DefaultAzureCredential();

  // Assuming you're using the `KeyClient` from `@azure/keyvault-keys`:
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

  // Or, if intercepting authentication errors directly from getToken:
  try {
    const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
-    if (error instanceof CredentialUnavailable) {
+    if (error.name === `CredentialUnavailableError`) {
      console.error("Authentication error", error);
    }
  }
```

Our version 2 of the Identity package also includes a new error named `AuthenticationRequiredError`. This error will show up when a credential fails to authenticate by re-using the credentials stored in the cache. This error may show up if you use the new capabilities of our `DeviceCodeCredential` and `InteractiveBrowserCredential`, which now allow developers to control when to prompt users for interactive authentication [(read more in the section below)](#controlling-interactive-authentication).

Finally, errors and logged exceptions will now point to the new [troubleshooting guidelines](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/Troubleshooting.md).

## Controlling interactive authentication

For our version 2 of Identity, we have made special changes to `InteractiveBrowserCredential` and `DeviceCodeCredential`. The new `disableAutomaticAuthentication` option on the constructors of these credentials will allow you to control when to prompt users to authenticate interactively.
  - If defined, this option stops the `getToken()` method from requesting user input in case the credential is unable to authenticate silently.
  - If `getToken()` fails to authenticate without user interaction, a new `AuthenticationRequired` error will be thrown. You may use this error to identify scenarios when manual authentication needs to be triggered (with `authenticate()`, as described below).

We have also added a new method to these credentials called `authenticate()`, which is similar to `getToken()`, but it doesn't read the `disableAutomaticAuthentication` option described above.
  - `authenticate()` returns an `AuthenticationRecord` which can be passed on the constructor options of `InteractiveBrowserCredential` and `DeviceCodeCredential` to initialize a credential that won't require user interaction until the underlying token expires.
  - `authenticate()` might succeed and still return `undefined` if we're unable to pick just one account record from the cache. This could happen if the cache is being used by more than one credential, or if multiple users have authenticated using the same Client ID and Tenant ID. To ensure consistency on a program with many users, keep track of the authentication records, and provide them in the constructors of new credentials on initialization.

To store the `AuthenticationRecord` as a string, and then re-use it in the future, version 2 of the Identity package now provides two new methods: `serializeAuthenticationRecord` and `deserializeAuthenticationRecord`.

The following example shows how to use the `DeviceCodeCredential` with the new `@azure/identity-cache-persistence` plugin. We are setting the `disableAutomaticAuthentication` option on the `DeviceCodeCredential` to manually trigger the user interaction. Then, we're using the new `@azure/identity-cache-persistence` plugin to enable sharing the same persistence cache between credential instances, and finally we're sharing the resulting `authenticationRecord` from a first `authenticate()` call with a new instance of the same credential to skip further user interactions on the next `getToken()` call.

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
    // To prevent getToken from requesting user interaction:
    disableAutomaticAuthentication: true,
    // To be able to re-use the account, the Token Cache must also have been provided.
    tokenCachePersistenceOptions
  });

  // Because automatic authentication has been disabled,
  // calls to firstCredential.getToken() will throw the `AuthenticationRequiredError`.
  // // await firstCredential.getToken(`https://servicebus.azure.net/.default`);

  const account = await firstCredential.authenticate(`https://servicebus.azure.net/.default`);

  // This is only relevant to show how one would store the account information as a string.
  accountCache = serializeAuthenticationRecord(account);

  // The `account` variable could be used directly, but to showcase the serialization, we will deserialize the `accountCache` string variable.

  const secondCredential = new DeviceCodeCredential({
    // To prevent getToken from requesting user interaction:
    disableAutomaticAuthentication: true,
    // authenticationRecord: account // could also be used
    authenticationRecord: deserializeAuthenticationRecord(accountCache),
    // To be able to re-use the account, the Token Cache must also have been provided.
    tokenCachePersistenceOptions
  });

  // This getToken call won't fail, since it will use the already retrieved credential from the shared cache.
  const accessToken = await secondCredential.getToken(`https://servicebus.azure.net/.default`)
  console.log({ accessToken });
}

main();
```

To read more about our plugins, visit our [New Plugins API](#new-plugins-api) section.

## Changes to your browser authentication flow

On the browser, the `InteractiveBrowserCredential` will now use the [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) to better support browsers with enhanced security restrictions.

To migrate to our version 2 of the `InteractiveBrowserCredential`, your Azure Active Directory App Registration needs to change. You can either create a [new app registration](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#create-the-app-registration), or you can [update your existing app registration to support the Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/migrate-spa-implicit-to-auth-code).

Read more on this in our [Interactive Browser Credential documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).

We have also removed the `postLogoutRedirectUri` from the options to the constructor for `InteractiveBrowserCredential`. This option was not being used. If you were looking to use this option, we recommend using MSAL directly to unlock all of the possible features related to browser authentication. You can read more through this link: [Authenticating with the @azure/msal-browser Public Client](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-the-azuremsal-browser-public-client).

## Asynchronous verification of credentials on ClientCertificateCredential

On version 1 of Identity, if a path to an invalid PEM certificate is provided to the constructor of `ClientCertificateCredential`, the constructor will throw immediately. On version 2, this validation will only happen on the `getToken` method.

This change will not be visible unless you were counting on verifying possible PEM certificate errors through the constructor call of this credential, in which case you will need to change your code to do the error handling on the `getToken` call.

```diff
+   const credential = new ClientCertificateCredential(tenantId, clientId, certificatePath);
  try {
-     const credential = new ClientCertificateCredential(tenantId, clientId, certificatePath);
+     const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
  } catch(error) {
    // Invalid credential path.
  }
```

## Other changes to existing credentials

For `@azure/identity` version 2, we have made some changes across credentials that will differ from the experience provided by our version 1. These changes are:

- Upon initialization, any of the Node.js credentials of `@azure/identity` version 2.0.0 will do a first request to discover relevant cloud metadata from Azure. This will happen only once per credential.
- On Identity version 1, the `getToken` methods of some credentials were expected to resolve with `null`. On version 2, null is never returned by any `getToken` call. If a credential is unable to return a token, it will throw either the `CredentialUnavailableError` if there was a problem satisfying the necessary conditions to authenticate, or the `AuthenticationRequiredError` if the credential is expecting the developer to trigger interactive authentication by calling to the new `authenticate()` method.
  - This change affects only those users who called the `getToken()` method directly and did not handle resulting errors.
  - Users who only used Identity credentials through the Azure SDKs are not impacted.

## New Plugins API

As part of the Identity 2.0 release, we've released two new packages:

- `@azure/identity-cache-persistence`, which provides persistent token caching.
- `@azure/identity-vscode`, which provides the dependencies of `VisualStudioCodeCredential` and enables it through dependency injection.

Identity version 2 includes a new top-level method `useIdentityPlugin`, which accepts a "plugin" as an argument. When enabled, plugins will extend the public API of the main `@azure/identity` package through dependency injection.

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

As part of our version 2 release, we're providing a Troubleshooting Guide. This guide includes solutions to many common problems our users have encountered, and we will keep it updated to include more information as we continue to improve our software. Upon throwing errors and exception logs, we're now pointing users to this troubleshooting guide. This guide is available through the following link: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/Troubleshooting.md

## Provide feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

To contribute to this library, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
