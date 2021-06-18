## Azure Identity Extension for Visual Studio Code Authentication

This package provides an extension to the Azure Identity library for JavaScript ([`@azure/identity`](https://npmjs.com/package/@azure/identity)) that enables authentication through the "Azure Account" extension for Visual Studio Code. This extension provides the dependencies of the `VisualStudioCodeCredential` in `@azure/identity` and enables it for use on its own or as part of `DefaultAzureCredential`.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-vscode) | [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-vscode/samples-dev)

## Getting started

### Install the package

This package is designed to be used with Azure Identity for JavaScript. Install both `@azure/identity` and this package using `npm`:

```sh
$ npm install --save @azure/identity
$ npm install --save @azure/identity-vscode
```

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/).
- Install [Visual Studio Code](https://aka.ms/vscode) and the ["Azure Account" extension][azaccountext]

#### Supported Environments

Azure Identity extensions for JavaScript support stable (even numbered) versions of Node.js starting from v12. While it may run in other Node versions, no support is guaranteed. `@azure/identity-vscode` **does not** support browser environments.

## Key concepts

If this is your first time using `@azure/identity` or the Microsoft identity platform (Azure Active Directory), we recommend that you read [Using `@azure/identity` with Microsoft Identity Platform](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/using-azure-identity.md) first. This document will give you a deeper understanding of the platform and how to configure your Azure account correctly.

### Azure Identity Extensions

As of `@azure/identity` version 2.0.0, the Identity client library for JavaScript includes an extension API. This package (`@azure/identity-vscode`) exports an extension object that you must pass as an argument to the top-level `useIdentityExtension` function from the `@azure/identity` package. Enable authentication through the "Azure Account" extension for Visual Studio Code as follows:

```typescript
import { useIdentityExtension } from "@azure/identity";
import { vsCodeExtension } from "@azure/identity-vscode";

useIdentityExtension(vsCodeExtension);
```

After calling `useIdentityExtension`, the `VisualStudioCodeCredential` from the `@azure/identity` package will be enabled. If this extension is not used, then `VisualStudioCodeCredential` will throw a `CredentialUnavailableError`, and it will not be available as part of `DefaultAzureCredential`.

### Visual Studio Code Authentication

`VisualStudioCodeCredential` uses the authentication session from the ["Azure Accounts" extension][azaccountext]. To use this credential, you must sign in to your Azure account using the extension. To do so, open Visual Studio Code, ensure that the extension is installed, and sign in using the menu (Ctrl+Shift+P), and select the "Azure: Sign In" option to open a browser window and sign in to Azure. Alternatively, you can select "Azure: Sign In with Device Code" to use the device code flow.

After signing in, you may need to select a subscription (for example, if you have multiple Azure subscriptions), and you can change the active subscription by using the menu to select the "Azure: Select Subscriptions" entry.

## Examples

Once the extension is registered, you can use `VisualStudioCodeCredential` in a similar fashion to the other credential classes in `@azure/identity`:

```typescript
import { useIdentityExtension, VisualStudioCodeCredential } from "@azure/identity";
import { vsCodeExtension } from "@azure/identity-vscode";

useIdentityExtension(vsCodeExtension);

async function main() {
  const credential = new VisualStudioCodeCredential();

  // This will print a JWT access_token and its expiration timestamp
  // The graph.microsoft.com scope is used as an example
  console.log("Token:", await credential.getToken("https://graph.microsoft.com/.default"));
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
```

You can also use `DefaultAzureCredential`, which will attempt to authenticate using the "Azure Account" extension for Visual Studio Code if it is available:

```typescript
import { useIdentityExtension, DefaultAzureCredential } from "@azure/identity";
import { vsCodeExtension } from "@azure/identity-vscode";

useIdentityExtension(vsCodeExtension);

async function main() {
  // With the extension enabled above, `DefaultAzureCredential` will use
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

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

### Provide Feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

[azaccountext]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2FREADME.png)
