## Azure Synapse Managed Private Endpoints client library for JavaScript

This package contains an isomorphic SDK for Managed Private Endpoints.

## Getting started

### Install the package

```bash
npm install @azure/synapse-managed-private-endpoints
```

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript

## Key concepts

## Examples

```ts
import { ManagedPrivateEndpointsClient } from "@azure/synapse-managed-private-endpoints";
import { DefaultAzureCredential } from "@azure/identity";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();

  let client = new ManagedPrivateEndpointsClient(
    credential,
    "https://mysynapse.dev.azuresynapse.net"
  );
  let list = await client.managedPrivateEndpoints.list("myvnet");
  for await (let item of list) {
    console.log("item:", item);
  }
}
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcdn%2Farm-cdn%2FREADME.png)

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

In the future, you'll find additional code samples here.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fkeyvault%2Fkeyvault-keys%2FREADME.png)
