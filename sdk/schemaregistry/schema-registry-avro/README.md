# Azure Schema Registry Avro serializer client library for JavaScript

Azure Schema Registry is a schema repository service hosted by Azure Event Hubs,
providing schema storage, versioning, and management. This package provides an
Avro serializer capable of serializing and deserializing payloads containing
Schema Registry schema identifiers and Avro-encoded data.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry-avro)
- [Package (npm)](https://www.npmjs.com/package/@azure/schema-registry-avro)
- [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/schema-registry-avro)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry-avro/samples)

## Getting started

- [LTS versions of Node.js](https://nodejs.org/about/releases/)

### Prerequisites

- An [Azure subscription][azure_sub]
- An existing [Schema Registry resource](https://aka.ms/schemaregistry)

### Install the `@azure/schema-registry-avro` package

Install the Azure Text Analytics client library for JavaScript with `npm`:

```bash
npm install @azure/schema-registry-avro
```

## Key concepts

### SchemaRegistryAvroSerializer

Provides API to serialize to and deserialize from Avro Binary Encoding plus a
header with schema ID. Uses
`SchemaRegistryClient` from the [@azure/schema-registry](https://www.npmjs.com/package/@azure/schema-registry) package
to get schema IDs from schema definition or vice versa. The provided API has internal cache to avoid calling the schema registry service when possible.

### Message format

The same format is used by schema registry serializers across Azure SDK languages.

Messages are encoded as follows:

- 4 bytes: Format Indicator

  - Currently always zero to indicate format below.

- 32 bytes: Schema ID

  - UTF-8 hexadecimal representation of GUID.
  - 32 hex digits, no hyphens.
  - Same format and byte order as string from Schema Registry service.

- Remaining bytes: Avro payload (in general, format-specific payload)

  - Avro Binary Encoding
  - NOT Avro Object Container File, which includes the schema and defeats the
    purpose of this serialzer to move the schema out of the message payload and
    into the schema registry.

## Examples

### Serialize and deserialize

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { SchemaRegistryAvroSerializer } = require("@azure/schema-registry-avro");

const client = new SchemaRegistryClient("<endpoint>", new DefaultAzureCredential());
const serializer = new SchemaRegistryAvroSerializer(client, { groupName: "<group>" });

// Example Avro schema
const schema = JSON.stringify({
  type: "record",
  name: "Rating",
  namespace: "my.example",
  fields: [{ name: "score", type: "int" }]
});

// Example value that matches the Avro schema above
const value = { score: 42 };

// Serialize value to buffer
const buffer = await serializer.serialize(value, schema);

// Deserialize buffer to value
const deserializedValue = await serializer.deserialize(buffer);
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
[samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry-avro/samples)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fschemaregistry%2Fschema-registry-avro%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[cognitive_auth]: https://docs.microsoft.com/azure/cognitive-services/authentication
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
