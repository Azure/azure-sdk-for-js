# Azure Schema Registry client library for JavaScript

Azure Schema Registry is a schema repository service hosted by Azure Event Hubs,
providing schema storage, versioning, and management. The registry is leveraged
by serializers to reduce payload size while describing payload structure with
schema identifiers rather than full schemas.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry)
- [Package (npm)](https://www.npmjs.com/package/@azure/schema-registry)
- [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/schema-registry)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry/samples)

## Getting started

- [LTS versions of Node.js](https://nodejs.org/about/releases/)

### Prerequisites

- An [Azure subscription][azure_sub]
- An existing [Schema Registry resource](https://aka.ms/schemaregistry)

### Install the `@azure/schema-registry` package

Install the Azure Text Analytics client library for JavaScript with `npm`:

```bash
npm install @azure/schema-registry
```

### Create and authenticate a `SchemaRegistryClient`

To create a client object to access the Schema Registry API, you will need the
`endpoint` of your Schema Registry resource and a `credential`. The Schema
Registry client uses Azure Active Directory credentials to authenticate.

You can authenticate with Azure Active Directory using the [Azure Identity
library][azure_identity]. To use the
[DefaultAzureCredential][defaultazurecredential] provider shown below, or other
credential providers provided with the Azure SDK, please install the
`@azure/identity` package:

```bash
npm install @azure/identity
```

Set the values of the client ID, tenant ID, and client secret of the AAD
application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`,
`AZURE_CLIENT_SECRET`.

```js
const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");

const client = new SchemaRegistryClient("<endpoint>", new DefaultAzureCredential());
```

## Key concepts

### SchemaRegistryClient

`SchemaRegistryClient` provides the API for storing and retrieving schemas in
schema registry.

### SchemaRegistry serializers

- [@azure/schema-registry-avro](https://www.npmjs.com/package/@azure/schema-registry-avro)
  is a separate package that uses `SchemaRegistryClient` to pair schema ID along
  with Avro Binary Encoding.

## Examples

### Register a schema

`registerSchema` sends a request to the service to register a schema, and then keeps
a copy of the schema and its service ID in a local private cache.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");

const client = new SchemaRegistryClient("<endpoint>", new DefaultAzureCredential());

const description = {
  name: "<name>",
  groupName: "<group name>",
  serializationType: "<serialization type>"
  content: "<schema content>"
}

const registered = await client.registerSchema(description);
console.log(registered.id);
```

### Get ID of existing schema

`getSchemaId` will send a request to the service only if the local cache did not have the schema.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");

const client = new SchemaRegistryClient("<endpoint>", new DefaultAzureCredential());

const description = {
  name: "<name>",
  groupName: "<group name>",
  serializationType: "<serialization type>"
  content: "<schema content>"
}

const found = await client.getSchemaId(description);
if (found) {
  console.log(`Got schema ID=${found.id}`);
}
```

### Get content of existing schema by ID

Similarly to `getSchemaId`, `getSchema` will send a request to the service only if the local cache did not have the schema ID.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");

const client = new SchemaRegistryClient("<endpoint>", new DefaultAzureCredential());
const foundSchema = await client.getSchema("<id>");
if (foundSchema) {
  console.log(`Got schema content=${foundSchema.content}`);
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to
see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment
variable to `info`. Alternatively, logging can be enabled at runtime by calling
`setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry/samples)
directory for detailed examples on how to use this library.

## Contributing

This project welcomes contributions and suggestions. Most contributions require
you to agree to a Contributor License Agreement (CLA) declaring that you have
the right to, and actually do, grant us the rights to use your contribution. For
details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether
you need to provide a CLA and decorate the PR appropriately (e.g., label,
comment). Simply follow the instructions provided by the bot. You will only need
to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of
Conduct](https://opensource.microsoft.com/codeofconduct/). For more information
see the [Code of Conduct
FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact
[opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional
questions or comments.

If you'd like to contribute to this library, please read the [contributing
guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to
learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fschemaregistry%2Fschema-registry%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[cognitive_auth]: https://docs.microsoft.com/azure/cognitive-services/authentication
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
