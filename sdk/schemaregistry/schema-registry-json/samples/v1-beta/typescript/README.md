# Azure Schema Registry client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for Azure Schema Registry in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                     |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [schemaRegistryJsonSample.ts][schemaregistryjsonsample]                       | Demonstrates the use of JsonSerializer to create messages with json-serialized payload using schema from Schema Registry.                                                                           |
| [schemaRegistryJsonWithValidation.ts][schemaregistryjsonwithvalidation]       | Demonstrates the use of JsonSerializer to create messages with json-serialized payload using schema from Schema Registry with validation using a third party library.                               |
| [withEventHubsBufferedProducerClient.ts][witheventhubsbufferedproducerclient] | Demonstrates the use of JsonSerializer to create messages with json-serialized payload using schema from Schema Registry and send them to an Event Hub using the EventHub Buffered Producer Client. |
| [withEventHubsConsumerClient.ts][witheventhubsconsumerclient]                 | Demonstrates the use of JsonSerializer to deserialize messages with json-serialized payload received from the Event Hub Consumer Client.                                                            |
| [withEventHubsProducerClient.ts][witheventhubsproducerclient]                 | Demonstrates the use of JsonSerializer to create messages with json-serialized payload using schema from Schema Registry and send them to an Event Hub using the EventHub Producer Client.          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/schemaRegistryJsonSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SCHEMA_REGISTRY_ENDPOINT="<schema registry endpoint>" SCHEMA_REGISTRY_GROUP="<schema registry group>" node dist/schemaRegistryJsonSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[schemaregistryjsonsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry-json/samples/v1-beta/typescript/src/schemaRegistryJsonSample.ts
[schemaregistryjsonwithvalidation]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry-json/samples/v1-beta/typescript/src/schemaRegistryJsonWithValidation.ts
[witheventhubsbufferedproducerclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry-json/samples/v1-beta/typescript/src/withEventHubsBufferedProducerClient.ts
[witheventhubsconsumerclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry-json/samples/v1-beta/typescript/src/withEventHubsConsumerClient.ts
[witheventhubsproducerclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/schemaregistry/schema-registry-json/samples/v1-beta/typescript/src/withEventHubsProducerClient.ts
[apiref]: https://aka.ms/schemaregistryjson-js-api
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureschemaregistryresource]: https://aka.ms/schemaregistry
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/schemaregistry/schema-registry-json/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
