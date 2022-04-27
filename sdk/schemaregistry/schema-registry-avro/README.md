# Azure Schema Registry Avro Encoder client library for JavaScript

Azure Schema Registry is a schema repository service hosted by Azure Event Hubs,
providing schema storage, versioning, and management. This package provides an
Avro encoder capable of encoding and decoding payloads containing
Avro-encoded data.

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

### AvroEncoder

Provides API to encode to and decode from Avro Binary Encoding wrapped in a message
with a content type field containing the schema ID. Uses
`SchemaRegistryClient` from the [@azure/schema-registry](https://www.npmjs.com/package/@azure/schema-registry) package
to get schema IDs from schema definition or vice versa. The provided API has internal cache to avoid calling the schema registry service when possible.

### Messages

By default, the encoder will create messages structured as follows:

- `body`: a byte array containing data in the Avro Binary Encoding. Note that it
  is NOT Avro Object Container File. The latter includes the schema and creating
  it defeats the purpose of using this encoder to move the schema out of the
  message payload and into the schema registry.

- `contentType`: a string of the following format `avro/binary+<Schema ID>` where
  the `avro/binary` part signals that this message has an Avro-encoded payload
  and the `<Schema Id>` part is the Schema ID the Schema Registry service assigned
  to the schema used to encode this payload.

Not all messaging services are supporting the same message structure. To enable
integration with such services, the encoder can act on custom message structures
by setting the `messageAdapter` option in the constructor with a corresponding
message producer and consumer. Azure messaging client libraries export default
adapters for their message types.

### Backward Compatibility

The encoder v1.0.0-beta.5 and under encodes data into binary arrays. Starting from
v1.0.0-beta.6, the encoder returns messages instead that contain the encoded payload.
For a smooth transition to using the newer versions, the encoder also supports
decoding messages with payloads that follow the old format where the schema ID
is part of the payload.

This backward compatibility is temporary and will be removed in v1.0.0.

## Examples

### Encode and decode an `@azure/event-hubs`'s `EventData`

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { createEventDataAdapter } = require("@azure/event-hubs");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { AvroEncoder } = require("@azure/schema-registry-avro");

const client = new SchemaRegistryClient(
  "<fully qualified namespace>",
  new DefaultAzureCredential()
);
const encoder = new AvroEncoder(client, {
  groupName: "<group>",
  messageAdapter: createEventDataAdapter(),
});

// Example Avro schema
const schema = JSON.stringify({
  type: "record",
  name: "Rating",
  namespace: "my.example",
  fields: [{ name: "score", type: "int" }],
});

// Example value that matches the Avro schema above
const value = { score: 42 };

// Encode value to a message
const message = await encoder.encodeMessageData(value, schema);

// Decode a message to value
const decodedValue = await encoder.decodeMessageData(message);
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
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
