# Migrate from v1 to v2 of @azure/identity

[v2changelog]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/CHANGELOG.md#200-2021-10-12
[plugins]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/CHANGELOG.md#200-2021-10-12#plugin-api
[npm-keytar]: https://www.npmjs.com/package/keytar
[npm-vscode]: https://www.npmjs.com/package/@azure/identity-vscode

The `@azure/identity` v2 package includes the best parts of v1, plus several improvements. This document outlines the steps needed to migrate from v1 to v2. For the full set of changes and bug fixes, refer to the [changelog][v2changelog].

## Table of contents

- [Update packages](#update-packages)
  - [Update Identity package](#update-identity-package)
  - [Update dependencies for Visual Studio Code authentication](#update-dependencies-for-visual-studio-code-authentication)
- [Update error handling](#update-error-handling)
  - [Update authentication error handling](#update-authentication-error-handling)
  - [Update error handling code for getToken calls](#update-error-handling-code-for-gettoken-calls)
  - [Update ClientCertificateCredential error handling](#update-clientcertificatecredential-error-handling)
- [Update app registration for browser authentication](#update-app-registration-for-browser-authentication)
- [Troubleshooting](#troubleshooting)
- [Provide feedback](#provide-feedback)
- [Contributing](#contributing)

## Update packages

### Update Identity package

Run the following command to update to Identity v2:

```bash
npm install --save @azure/identity@^2.0.0
```

The *package.json* file key-value pair now resembles the following:

```diff
  "dependencies": {
-    "@azure/identity": "^1.5.2",
+    "@azure/identity": "^2.0.0",
  }
```

### Update dependencies for Visual Studio Code authentication

If you use the `VisualStudioCodeCredential`, you likely have [keytar][npm-keytar] in your dependencies. `keytar` is a popular native machine-code dependency in the Node.js ecosystem. NMC dependencies were removed from `@azure/identity` and put into individual packages. To use the `VisualStudioCodeCredential` with Identity v2, complete the following steps:

1. Install the [@azure/identity-vscode][npm-vscode] package:

  ```bash
  npm install --save-dev @azure/identity-vscode
  ```

2. Enable the Visual Studio Code plugin:

  ```diff
  import {
    VisualStudioCodeCredential, 
  + useIdentityPlugin
  } from "@azure/identity";

  + import { vsCodePlugin } from "@azure/identity-vscode";
  + useIdentityPlugin(vsCodePlugin);
  ```

The `VisualStudioCodeCredential` will now work as it did in Identity v1.

## Update error handling

### Update authentication error handling

For Identity v2, the `CredentialUnavailable` error was renamed to `CredentialUnavailableError`. This change was done to align with the naming convention used for error classes in the Azure SDKs in JavaScript.

Identity v2 also supports error handling via checking the name of the error, instead of using `instanceof`.

If you're catching authentication errors, the following example shows the changes needed to migrate from v1 to v2:

```diff
  const credential = new DefaultAzureCredential();
  const client = new KeyClient(`https://name.vault.azure.net`, credential);

  // If catching authentication errors coming from an SDK client:
  try {
    await client.createKey("key1", "RSA");
  } catch(error) {
-   if (error instanceof CredentialUnavailable) {
+   if (error.name === `CredentialUnavailableError`) {
      console.error("Authentication error", error);
    }
  }

  // Or, if catching authentication errors directly from getToken:
  try {
    const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
-   if (error instanceof CredentialUnavailable) {
+   if (error.name === `CredentialUnavailableError`) {
      console.error("Authentication error", error);
    }
  }
```

### Update error handling code for getToken calls

In Identity v1, credentials like `ClientSecretCredential` were implemented to return `null` in the edge case that the authentication requests succeeded with a malformed response. This scenario isn't an expected behavior from the Azure services. Consequently, v2 throws an error if this case is ever encountered.

This change affects only users who expected a `null` return value from `getToken()`. Users who only used Identity credentials through the Azure SDKs aren't impacted.

If you expected a `null` return value from a direct call to `getToken`, apply the following change:

```diff
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

+ try {
const result = await credential.getToken("https://graph.microsoft.com/.default");
- if (result === null) {
+ } catch(e) {
  console.error("The authentication failed");
}
```

### Update ClientCertificateCredential error handling

In Identity v1, if a path to an invalid PEM certificate is provided to the constructor of `ClientCertificateCredential`, the constructor throws immediately. In v2, this validation only happens on the `getToken` method.

This change won't be visible unless you were catching certificate errors through the constructor call of this credential. In that case, you'll need to change your code to do the error handling on the `getToken` call.

The following code shows the change needed to catch certificate path errors on Identity v2:

```diff
+ const credential = new ClientCertificateCredential(tenantId, clientId, certificatePath);
try {
- const credential = new ClientCertificateCredential(tenantId, clientId, certificatePath);
+ const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
} catch(error) {
  // Invalid certificate path.
}
```

## Update app registration for browser authentication

On the browser, the `InteractiveBrowserCredential` now uses the [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) to better support browsers with enhanced security restrictions.

To migrate to v2 of the `InteractiveBrowserCredential`, your Azure Active Directory app registration needs to change. Take one of the following actions:

- Create a [new app registration](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#create-the-app-registration).
- [Update your existing app registration to support the Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/migrate-spa-implicit-to-auth-code).

For more information, see [Interactive Browser Credential documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).

## Troubleshooting

As part of the v2 release, a [troubleshooting guide](https://aka.ms/azsdk/js/identity/troubleshoot) is provided. This guide includes solutions to many common problems users have encountered. In v2, errors and exception logs link to this troubleshooting guide.

## Provide feedback

If you encounter bugs or have suggestions, [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

To contribute to this library, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
