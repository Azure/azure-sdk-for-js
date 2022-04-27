# Azure Schema Registry client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Schema Registry in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                     |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [schemaRegistryAvroSample.js][schemaregistryavrosample]                       | Demonstrates the use of AvroSerializer to create messages with avro-serialized payload using schema from Schema Registry.                                                                           |
| [withEventHubsBufferedProducerClient.js][witheventhubsbufferedproducerclient] | Demonstrates the use of AvroSerializer to create messages with avro-serialized payload using schema from Schema Registry and send them to an Event Hub using the EventHub Buffered Producer Client. |
| [withEventHubsConsumerClient.js][witheventhubsconsumerclient]                 | Demonstrates the use of AvroSerializer to deserialize messages with avro-serialized payload received from the Event Hub Consumer Client.                                                            |
| [withEventHubsProducerClient.js][witheventhubsproducerclient]                 | Demonstrates the use of AvroSerializer to create messages with avro-serialized payload using schema from Schema Registry and send them to an Event Hub using the EventHub Producer Client.          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Schema Registry resource][createinstance_azureschemaregistryresource]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node schemaRegistryAvroSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SCHEMA_REGISTRY_ENDPOINT="<schema registry endpoint>" SCHEMA_REGISTRY_GROUP="<schema registry group>" node schemaRegistryAvroSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[schemaregistryavrosample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry-avro/samples/v1-beta/javascript/schemaRegistryAvroSample.js
[witheventhubsbufferedproducerclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry-avro/samples/v1-beta/javascript/withEventHubsBufferedProducerClient.js
[witheventhubsconsumerclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry-avro/samples/v1-beta/javascript/withEventHubsConsumerClient.js
[witheventhubsproducerclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry-avro/samples/v1-beta/javascript/withEventHubsProducerClient.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/schema-registry-avro
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureschemaregistryresource]: https://aka.ms/schemaregistry
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry-avro/README.md
