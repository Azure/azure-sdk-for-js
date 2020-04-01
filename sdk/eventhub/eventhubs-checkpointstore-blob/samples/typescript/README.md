---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-event-hubs
  - azure-storage
urlFragment: eventhubs-checkpointstore-blob-typescript
---

# Azure Event Hubs client library samples with persistent checkpointing for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Event Hubs in some common scenarios.

| **File Name**                                                | **Description**                                                                                                                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [receiveEventsUsingCheckpointStore.ts][checkpointing]        | Demonstrates how to use the BlobCheckpointStore with EventHubConsumerClient to process events from all partitions of a consumer group in an Event Hubs instance. |
| [receiveEventsWithApiSpecificStorage.ts][apispecificstorage] | Demonstrates how to use a specific Azure Storage Blobs API version with BlobCheckpointStore.                                                                     |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub], [an Azure Event Hub resource][azhubacct] and [an Azure Storage account][azstorage] to run these sample programs. The IOT Hub sample additionally requires an [IOT Hub resource][aziothub]. Samples retrieve credentials to access the event hub from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser requires some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the sample file you plan to run to use the correct credentials to access the Azure services.

3. Compile the samples

```bash
npm run build
```

4. Run whichever samples you like (note that some samples may require additional setup):

```bash
node dist/receiveEventsUsingCheckpointStore.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[azstorage]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[apiref]: https://docs.microsoft.com/javascript/api/@azure/event-hubs
[checkpointing]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples/typescript/src/receiveEventsUsingCheckpointStore.ts
[apispecificstorage]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples/typescript/src/receiveEventsWithApiSpecificStorage.ts
[azhubacct]: https://docs.microsoft.com/azure/event-hubs/event-hubs-node-get-started-send
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
