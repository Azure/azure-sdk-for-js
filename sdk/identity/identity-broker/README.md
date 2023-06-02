# Azure Identity plugin for brokered authentication

This package provides a plugin to the Azure Identity library for JavaScript ([`@azure/identity`](https://npmjs.com/package/@azure/identity)) that enables using an authentication broker such as [WAM](https://learn.microsoft.com/azure/active-directory/develop/scenario-desktop-acquire-token-wam).

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-broker) | [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-broker/samples-dev)

## Getting started

```typescript
import { nativeBrokerPlugin } from "@azure/identity-broker";
import { useIdentityPlugin } from "@azure/identity";

useIdentityPlugin(nativeBrokerPlugin);
```

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/nodejs/).

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

### Azure Identity plugins

As of `@azure/identity` version 2.0.0, the Identity client library for JavaScript includes a plugin API. This package (`@azure/identity-broker`) exports a plugin object that you must pass as an argument to the top-level `useIdentityPlugin` function from the `@azure/identity` package. Enable native broker in your program as follows:

```typescript
import { nativeBrokerPlugin } from "@azure/identity-broker";
import { useIdentityPlugin, InteractiveBrowserCredential } from "@azure/identity";

useIdentityPlugin(nativeBrokerPlugin);

const credential = new InteractiveBrowserCredential({
  brokerOptions: {
    enabled: true,
    },
  });
```

After calling `useIdentityPlugin`, the native broker plugin is registered to the `@azure/identity` package and will be available on the `InteractiveBrowserCredential` that supports WAM broker authentication. This credential has `brokerOptions` in the constructor options.

## Examples

Once the plugin is registered, you can enable WAM broker authentication by passing `brokerOptions` with an `enabled` property set to `true` to a credential constructor. In the following example, we use the `InteractiveBrowserCredential`.

```typescript
import { nativeBrokerPlugin } from "@azure/identity-broker";
import { useIdentityPlugin, InteractiveBrowserCredential } from "@azure/identity";

useIdentityPlugin(nativeBrokerPlugin);

async function main() {
  const credential = new InteractiveBrowserCredential({
    brokerOptions: {
      enabled: true,
    },
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

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```typescript
import { setLogLevel } from ("@azure/logger");

setLogLevel("info");
```

## Next steps

### Provide feedback

If you encounter bugs or have suggestions, please [open an issue](https://github.com/Azure/azure-sdk-for-js/issues).

## Contributing

If you'd like to contribute to this library, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2FREADME.png)
