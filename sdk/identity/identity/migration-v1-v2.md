# Migrate from v1 to v2 of @azure/identity

[v2changelog]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/CHANGELOG.md#200-2021-10-12
[plugins]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/CHANGELOG.md#200-2021-10-12#new-plugins-api
[npm-keytar]: https://www.npmjs.com/package/keytar
[npm-vscode]: https://www.npmjs.com/package/@azure/identity-vscode

Version 2 of the `@azure/identity` package includes the best parts of version 1, plus several improvements.

If you're moving from version 1 to version 2, you're in the right place. In this document we will show you what needs to be updated.

For the full set of changes and bug fixes, please refer to our [changelog][v2changelog]

## Table of contents

- [Update package.json](#update-package-json)
- [Update authentication error handling](#update-authentication-error-handling)
- [Update dependencies for Visual Studio Code authentication](#update-visual-studio-code-authentication)
- [Update app registration for browser authentication](#update-app-registration-for-browser-authentication)
- [Update ClientCertificateCredential error handling](#update-clientcertificatecredential-error-handling)
- [Expect errors, not null returns](#expect-errors-not-null-returns)
- [Troubleshooting](#troubleshooting)
- [Provide feedback](#provide-feedback)
- [Contributing](#contributing)

## Update package.json

Run the following command to update to Identity v2:

```bash
npm install --save @azure/identity@^2.0.0
```

The *package.json* file key-value pair now resembles the following:

```diff
  "dependencies": {
-     "@azure/identity": "^1.5.2",
+     "@azure/identity": "^2.0.0",
  }
```

## Update authentication error handling

For our version 2 of Identity, we've renamed the error `CredentialUnavailable` to `CredentialUnavailableError`, to align with the naming convention used for error classes in the Azure SDKs in JavaScript.

Identity v2 also ensures error handling can be done through checking the name of the error, instead of using `instanceof`.

If you are catching authentication errors, the following example shows the changes needed to migrate from v1 to v2:

```diff
  // Assuming you use the `DefaultAzureCredential`:
  const credential = new DefaultAzureCredential();

  const client = new KeyClient(`https://name.vault.azure.net`, credential);
  // Assuming you use the `KeyClient` from `@azure/keyvault-keys`:

  // If catching authentication errors coming from an SDK client:
  try {
    await client.createKey("key1", "RSA");
  } catch(error) {
-    if (error instanceof CredentialUnavailable) {
+    if (error.name === `CredentialUnavailableError`) {
      console.error("Authentication error", error);
    }
  }

  // Or, if catching authentication errors directly from getToken:
  try {
    const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
-    if (error instanceof CredentialUnavailable) {
+    if (error.name === `CredentialUnavailableError`) {
      console.error("Authentication error", error);
    }
  }
```

## Update dependencies for Visual Studio Code authentication

If you use the `VisualStudioCodeCredential`, you likely have [keytar][npm-keytar] in your dependencies. `keytar` is a popular native machine-code (NMC) dependency in the Node.js ecosystem. NMC dependencies were removed from `@azure/identity` and put into individual packages. To use the `VisualStudioCodeCredential` with Identity v2, install the [`@azure/identity-vscode`][npm-vscode] package:

```bash
npm install --save-dev @azure/identity-vscode
```

Then load the Visual Studio Code plugin in your code as follows:

```diff
import {
  VisualStudioCodeCredential, 
+   useIdentityPlugin
} from "@azure/identity";

+ import { vsCodePlugin } from "@azure/identity-vscode";
+ useIdentityPlugin(vsCodePlugin);
```

After the plugin has been enabled, the `VisualStudioCodeCredential` will continue to work as usual on Identity v2.

## Update app registration for browser authentication

On the browser, the `InteractiveBrowserCredential` now uses the [Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) with [PKCE](https://tools.ietf.org/html/rfc7636) rather than [Implicit Grant Flow](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-implicit-grant-flow) to better support browsers with enhanced security restrictions.

To migrate to v2 of the `InteractiveBrowserCredential`, your Azure Active Directory App Registration needs to change. Take one of the following actions:

- Create a [new app registration](https://docs.microsoft.com/azure/active-directory/develop/scenario-spa-app-registration#create-the-app-registration).
- [Update your existing app registration to support the Auth Code Flow](https://docs.microsoft.com/azure/active-directory/develop/migrate-spa-implicit-to-auth-code).

For more information, see [Interactive Browser Credential documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/interactive-browser-credential.md).

## Update ClientCertificateCredential error handling

On version 1 of Identity, if a path to an invalid PEM certificate is provided to the constructor of `ClientCertificateCredential`, the constructor will throw immediately. On version 2, this validation will only happen on the `getToken` method.

This change won't be visible unless you were catching certificate errors through the constructor call of this credential, in which case you'll need to change your code to do the error handling on the `getToken` call.

The following code shows the change needed to catch certificate path errors on Identity v2:

```diff
+ const credential = new ClientCertificateCredential(tenantId, clientId, certificatePath);
try {
-   const credential = new ClientCertificateCredential(tenantId, clientId, certificatePath);
+   const accessToken = await credential.getToken("https://graph.microsoft.com/.default");
} catch(error) {
  // Invalid certificate path.
}
```

## Expect errors, not null returns

On v1, credentials like the `ClientSecretCredential` were implemented to return null in the edge case that the authentication requests succeeded with a malformed response. This scenario is not an expected behavior from the Azure services, so v2 throw an error if this case is ever encountered.

This change affects only those users who expected null returns from `getToken()`. Users who only used Identity credentials through the Azure SDKs are not impacted.

Here's how you would migrate from v1 to v2 if you ever expected a null return from a direct call to any getToken method:

```diff
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);

+ try {
const result = await credential.getToken("https://graph.microsoft.com/.default");
- if (result === null) {
+ } catch(e) {
  console.error("The authentication failed");
}
```

## Troubleshooting

As part of our version 2 release, we're providing a Troubleshooting Guide. This guide includes solutions to many common problems our users have encountered, and we will keep it updated to include more information as we continue to improve our software. Upon throwing errors and exception logs, we're now pointing users to this troubleshooting guide. This guide is available through the following link: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/Troubleshooting.md

## Provide feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

To contribute to this library, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
