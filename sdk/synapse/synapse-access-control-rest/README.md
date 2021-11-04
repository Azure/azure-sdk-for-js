## Azure Synapse Access Control REST client library for JavaScript

This package contains an isomorphic REST Client SDK for Azure Synapse Access Control.

**Please rely heavily on the [service's documentation][synapse_product_documentation] and our [REST client docs][rest_client] to use this library**

## Getting started

### Install the package

```bash
npm install @azure-rest/synapse-access-control
```

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

## Key concepts

## Examples

```ts
import AccessControl, { paginate } from "@azure-rest/synapse-access-control";
import { DefaultAzureCredential } from "@azure/identity";

export async function main(): Promise<void> {
  const client = AccessControl("<endpoint>", new DefaultAzureCredential());
  const initialResponse = await client.path("/roleAssignments").get();

  if (initialResponse.status !== "200") {
    throw initialResponse.body.error;
  }

  const assignments = paginate(client, initialResponse);

  for await (const assignment of assignments) {
    console.log(assignment.id);
  }
}
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

In the future, you'll find additional code samples here.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fsynapse%2Faccess-control-rest%2FREADME.png)

[synapse_product_documentation]: https://docs.microsoft.com/rest/api/synapse/data-plane/role-assignments/create-role-assignment
[rest_client]: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md
