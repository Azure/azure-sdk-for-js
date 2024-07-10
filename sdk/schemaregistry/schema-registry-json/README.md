# Azure Schema Registry Json Serializer client library for JavaScript

Azure Schema Registry is a schema repository service hosted by Azure Event Hubs,
providing schema storage, versioning, and management. This package provides an
Json serializer capable of serializing and deserializing payloads containing
Json-serialized data.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry-json)
- [Package (npm)](https://www.npmjs.com/package/@azure/schema-registry-json)
- [API Reference Documentation](https://aka.ms/schemaregistryjson-js-api)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry-json/samples)

## Getting started

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Prerequisites

- An [Azure subscription][azure_sub]
- An existing [Schema Registry resource](https://aka.ms/schemaregistry)

### Install the `@azure/schema-registry-json` package

Install the Azure Text Analytics client library for JavaScript with `npm`:

```bash
npm install @azure/schema-registry-json
```

## Key concepts

### JsonSchemaSerializer

Provides API to serialize to and deserialize from JSON wrapped in a message
with a content type field containing the schema ID. Uses
`SchemaRegistryClient` from the [@azure/schema-registry](https://www.npmjs.com/package/@azure/schema-registry) package
to get schema IDs from schema definition or vice versa. The provided API has internal cache to avoid calling the schema registry service when possible.

### Messages

By default, the serializer will create messages structured as follows:

- `data`: a byte array containing JSON data.

- `contentType`: a string of the following format `application/json+<Schema ID>` where
  the `application/json` part signals that this message has a Json-serialized payload
  and the `<Schema Id>` part is the Schema ID the Schema Registry service assigned
  to the schema used to serialize this payload.

Not all messaging services are supporting the same message structure. To enable
integration with such services, the serializer can act on custom message structures
by setting the `messageAdapter` option in the constructor with a corresponding
message producer and consumer. Azure messaging client libraries export default
adapters for their message types.

## Examples

### Serialize and deserialize an `@azure/event-hubs`'s `EventData`

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const { createEventDataAdapter } = require("@azure/event-hubs");
const { SchemaRegistryClient } = require("@azure/schema-registry");
const { JsonSchemaSerializer } = require("@azure/schema-registry-json");

async function main(){
  const client = new SchemaRegistryClient(
    "<fully qualified namespace>",
    new DefaultAzureCredential()
  );
  const serializer = new JsonSchemaSerializer(client, {
    groupName: "<group>",
    messageAdapter: createEventDataAdapter(),
  });

  // Example Json schema
  const schema = JSON.stringify({  
    $schema: "http://json-schema.org/draft-04/schema#",
    $id: "person",
    title: "Student",
    description: "A student in the class",
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the student",
      },
    },
    required: ["name"]
  });

  // Example value that matches the Json schema above
  const value = { name: "Bob" };

  // Serialize value to a message
  const message = await serializer.serialize(value, schema);

  // Deserialize a message to value
  const deserializedValue = await serializer.deserialize(message);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

```

The serializer doesn't check whether the deserialized value matches the schema 
but provides an option to implement such validation. The application can pass a 
validation callback function as one of the options to the deserialize method where schema validation can be implemented.
To see how the validation might be implemented, please checkout the [`schemaRegistryJsonWithValidation`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry-json/samples-dev/schemaRegistryJsonWithValidation.ts)
sample.

## Troubleshooting

The Json serializer communicates with the [Schema Registry][schema_registry] service as needed to register or query schemas and those service calls could throw a [RestError][resterror]. Furthermore, errors of type `Error` will be thrown when serialization or deserialization fails. The `cause` property will contain the underlying error that was thrown from the JSON parser.

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
[samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry-json/samples)
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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fschemaregistry%2Fschema-registry-json%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[resterror]: https://docs.microsoft.com/javascript/api/@azure/core-rest-pipeline/resterror?view=azure-node-latest
[schema_registry]: https://docs.microsoft.com/javascript/api/overview/azure/schema-registry-readme?view=azure-node-latest
