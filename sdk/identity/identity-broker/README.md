# Azure Identity plugin for brokered authentication

This package provides a plugin to the Azure Identity library for JavaScript ([`@azure/identity`](https://npmjs.com/package/@azure/identity)) that enables using an authentication broker such as [WAM](https://learn.microsoft.com/entra/identity-platform/scenario-desktop-acquire-token-wam).

An authentication broker is an application that runs on a user’s machine that manages the authentication handshakes and token maintenance for connected accounts. Currently, only the Windows authentication broker, Web Account Manager (WAM), is supported.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-broker) | [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-broker/samples) | [API reference documentation](https://learn.microsoft.com/javascript/api/overview/azure/identity-broker-readme?view=azure-node-latest) | [Microsoft Entra ID documentation] (https://learn.microsoft.com/entra/identity/)

## Getting started

```ts snippet:getting_started
import { useIdentityPlugin } from "@azure/identity";
import { nativeBrokerPlugin } from "@azure/identity-broker";

useIdentityPlugin(nativeBrokerPlugin);
```

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/nodejs/).

> Note: For local development with `@azure/identity-broker`, you may need to install additional tools. [node-gyp](https://github.com/nodejs/node-gyp) is used to compile [addons](https://nodejs.org/api/addons.html) for accessing system APIs. Installation requirements are listed in the [node-gyp README](https://github.com/nodejs/node-gyp#installation).

On Linux, the library uses `libsecret` so you may need to install it. Depending on your distribution, you will need to run the following command:

- Debian/Ubuntu: `sudo apt-get install libsecret-1-dev`
- Red Hat-based: `sudo yum install libsecret-devel`
- Arch Linux: `sudo pacman -S libsecret`

> [!NOTE] 
> Brokered authentication is currently only supported on Windows. Linux and macOS aren't yet supported.

### Install the package

This package is designed to be used with Azure Identity for JavaScript. Install both `@azure/identity` and this package using `npm`:

```sh
npm install --save @azure/identity
npm install --save @azure/identity-broker
```

#### Supported environments

Azure Identity plugins for JavaScript support stable (even numbered) versions of Node.js starting from v18. While the plugins may run in other Node.js versions, no support is guaranteed. `@azure/identity-broker` **does not** support browser environments.

## Key concepts

If this is your first time using `@azure/identity` or Microsoft Entra ID, we recommend that you read [Using `@azure/identity` with Microsoft Entra ID](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/using-azure-identity.md) first. This document will give you a deeper understanding of the platform and how to configure your Azure account correctly.

### Parent window handles

When authenticating with the broker via `InteractiveBrowserCredential`, a parent window handle is required to ensure that the authentication dialog is shown correctly over the requesting window. In the context of graphical user interfaces on devices, a window handle is a unique identifier that the operating system assigns to each window. For the Windows operating system, this handle is an integer value that serves as a reference to a specific window.

## Microsoft account (MSA) passthrough

Microsoft accounts (MSA) are personal accounts created by users to access Microsoft services. MSA passthrough is a legacy configuration which enables users to get tokens to resources which normally don't accept MSA logins. This feature is only available to first-party applications. Users authenticating with an application that is configured to use MSA passthrough can set `legacyEnableMsaPassthrough` to `true` inside `InteractiveBrowserCredentialNodeOptions.brokerOptions` to allow these personal accounts to be listed by WAM.

## Redirect URIs

Microsoft Entra applications rely on redirect URIs to determine where to send the authentication response after a user has logged in. To enable brokered authentication through WAM, a redirect URI matching the following pattern should be registered to the application:

```
ms-appx-web://Microsoft.AAD.BrokerPlugin/{client_id}
```

### Azure Identity plugins

As of `@azure/identity` version 2.0.0, the Identity client library for JavaScript includes a plugin API. This package (`@azure/identity-broker`) exports a plugin object that you must pass as an argument to the top-level `useIdentityPlugin` function from the `@azure/identity` package. Enable native broker in your program as follows:

```ts snippet:using_plugins
import { useIdentityPlugin, InteractiveBrowserCredential } from "@azure/identity";
import { nativeBrokerPlugin } from "@azure/identity-broker";

useIdentityPlugin(nativeBrokerPlugin);

const credential = new InteractiveBrowserCredential({
  brokerOptions: {
    enabled: true,
    parentWindowHandle: new Uint8Array(0), // This should be a handle to the parent window
  },
});
```

After calling `useIdentityPlugin`, the native broker plugin is registered to the `@azure/identity` package and will be available on the `InteractiveBrowserCredential` that supports WAM broker authentication. This credential has `brokerOptions` in the constructor options.

**Notes**: As of `@azure/identity` version 4.11.0-beta.1, `DefaultAzureCredential` provides support to sign-in via the Windows Web Account Manager. Enable native broker in your program as follows:

```ts snippet:using_plugins_dac
import { useIdentityPlugin, DefaultAzureCredential } from "@azure/identity";
import { nativeBrokerPlugin } from "@azure/identity-broker";

useIdentityPlugin(nativeBrokerPlugin);

const credential = new DefaultAzureCredential();
```

## Examples

Once the plugin is registered, you can enable WAM broker authentication by passing `brokerOptions` with an `enabled` property set to `true` to a credential constructor. In the following example, we use the `InteractiveBrowserCredential`.

```ts snippet:usage_example
import { useIdentityPlugin, InteractiveBrowserCredential } from "@azure/identity";
import { nativeBrokerPlugin } from "@azure/identity-broker";

useIdentityPlugin(nativeBrokerPlugin);

const credential = new InteractiveBrowserCredential({
  brokerOptions: {
    enabled: true,
    parentWindowHandle: new Uint8Array(0), // This should be a handle to the parent window
  },
});

// We'll use the Microsoft Graph scope as an example
const scope = "https://graph.microsoft.com/.default";

// Print out part of the access token
console.log((await credential.getToken(scope)).token.substring(0, 10), "...");
```

For a complete example of using an Electron app for retrieving a window handle, see [this sample](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-broker/samples/v1/typescript/src/index.ts).

### Use the default account for sign-in

When the `useDefaultBrokerAccount` option is set to `true`, the credential will attempt to silently use the default broker account. If using the default account fails, the credential will fall back to interactive authentication.

```ts snippet:use_default_account
import { useIdentityPlugin, InteractiveBrowserCredential } from "@azure/identity";
import { nativeBrokerPlugin } from "@azure/identity-broker";

useIdentityPlugin(nativeBrokerPlugin);

const credential = new InteractiveBrowserCredential({
  brokerOptions: {
    enabled: true,
    useDefaultBrokerAccount: true,
    parentWindowHandle: new Uint8Array(0), // This should be a handle to the parent window
  },
});

// We'll use the Microsoft Graph scope as an example
const scope = "https://graph.microsoft.com/.default";

// Print out part of the access token
console.log((await credential.getToken(scope)).token.substr(0, 10), "...");
```

## Troubleshooting

See the Azure Identity [troubleshooting guide][https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/TROUBLESHOOTING.md] for details on how to diagnose various failure scenarios.

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:logging
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

### Provide feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

If you'd like to contribute to this library, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
