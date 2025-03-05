## Azure Synapse Access Control REST client library for JavaScript

This package contains an isomorphic REST Client SDK for Azure Synapse Access Control.

**Please rely heavily on the [service's documentation][synapse_product_documentation] and our [REST client docs][rest_client] to use this library**

## Getting started

### Install the package

```bash
npm install @azure-rest/synapse-access-control
```

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

## Key concepts

## Examples

```ts snippet:ReadmeSampleCreateClient_Node
import AccessControl, { isUnexpected, paginate } from "@azure-rest/synapse-access-control";
import { DefaultAzureCredential } from "@azure/identity";

const client = AccessControl("<endpoint>", new DefaultAzureCredential());

const initialResponse = await client.path("/roleAssignments").get();
if (isUnexpected(initialResponse)) {
  throw initialResponse.body.error;
}

const assignments = paginate(client, initialResponse);
for await (const assignment of assignments) {
  console.log(`Role Assignment ID: ${assignment.id}`);
}
```

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

## Troubleshooting

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

## Next steps

In the future, you'll find additional code samples here.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

[synapse_product_documentation]: https://learn.microsoft.com/rest/api/synapse/data-plane/role-assignments/create-role-assignment
[rest_client]: https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md
