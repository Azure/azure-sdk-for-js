## Azure Identity Extension for Token Cache Persistence

This package provides an extension to the Azure Identity library for JavaScript ([`@azure/identity`](https://npmjs.com/package/@azure/identity)) that enables persistent token caching. Token cache persistence allows the built-in token cache to persist across sessions using a secure storage system provided by the local Operating System.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity-cache-persistence) | [Samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity-cache-persistence/samples-dev)

## Getting started

### Install the package

This package is designed to be used with Azure Identity for JavaScript. Install both `@azure/identity` and this package using `npm`:

```sh
$ npm install --save @azure/identity
$ npm install --save @azure/identity-cache-persistence
```

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/).

#### Supported Environments

Azure Identity extensions for JavaScript support stable (even numbered) versions of Node.js starting from v12. While it may run in other Node versions, no support is guaranteed. `@azure/identity-cache-persistence` **does not** support browser environments.

## Key concepts

If this is your first time using `@azure/identity` or the Microsoft identity platform (Azure Active Directory), we recommend that you read [Using `@azure/identity` with Microsoft Identity Platform](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/using-azure-identity.md) first. This document will give you a deeper understanding of the platform and how to configure your Azure account correctly.

### Azure Identity Extensions

As of `@azure/identity` version 2.0.0, the Identity client library for JavaScript includes an extension API. This package (`@azure/identity-cache-persistence`) exports an extension object that you must pass as an argument to the top-level `useIdentityExtension` function from the `@azure/identity` package. Enable token cache persistence in your program as follows:

```typescript
import { useIdentityExtension } from "@azure/identity";
import { cachePersistenceExtension } from "@azure/identity-cache-persistence";

useIdentityExtension(cachePersistenceExtension);
```

After calling `useIdentityExtension`, the persistent token cache extension is registered to the `@azure/identity` package and will be available on all credentials that support persistent token caching (those that have `tokenCachePersistenceOptions` in their constructor options).

## Examples

Once the extension is registered, you can enable token cache persistence by passing `tokenCachePersistenceOptions` with an `enabled` property set to `true` to a credential constructor. In the following example, we use the `DeviceCodeCredential`, since persistent caching of its tokens allows you to skip the interactive device-code authentication flow if a cached token is available.

```typescript
import { useIdentityExtension, DeviceCodeCredential } from "@azure/identity";
import { cachePersistenceExtension } from "@azure/identity-cache-persistence";

useIdentityExtension(cachePersistenceExtension);

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fidentity%2Fidentity%2FREADME.png)
