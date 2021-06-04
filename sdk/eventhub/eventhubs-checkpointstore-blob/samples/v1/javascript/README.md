---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-event-hubs
urlFragment: eventhubs-checkpointstore-blob-javascript
---

# Azure Event Hubs client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Event Hubs in some common scenarios.

| **File Name**                                                                 | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [createCustomPipeline.js][createcustompipeline]                               | Demonstrates how to create a custom `Pipeline` that the Storage Blob Container Client uses to change the API version used when communicating with the service. This may be useful in environments like Azure Stack which supports an older version of Storage service than is officially supported by the Storage Blob SDK.                                                                                                                                                                                                                |
| [receiveEventsUsingCheckpointStore.js][receiveeventsusingcheckpointstore]     | Demonstrates how to use the EventHubConsumerClient to process events from all partitions of a consumer group in an Event Hubs instance, as well as checkpointing along the way. Checkpointing using a durable store allows your application to be more resilient. When you restart your application after a crash (or an intentional stop), your application can continue consuming events from where it last checkpointed.                                                                                                                |
| [receiveEventsWithApiSpecificStorage.js][receiveeventswithapispecificstorage] | Demonstrates how to use the EventHubConsumerClient to process events from all partitions of a consumer group in an Event Hubs instance, as well as checkpointing along the way. This sample uses the `createCustomPipeline` function to override the targetted version of the Storage service. Checkpointing using a durable store allows your application to be more resilient. When you restart your application after a crash (or an intentional stop), your application can continue consuming events from where it last checkpointed. |

## Prerequisites

The sample programs are compatible with Node.js >=12.0.0.

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Event Hub][createinstance_azureeventhub]
- [Azure Storage Account][createinstance_azurestorageaccount]

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
node createCustomPipeline.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node createCustomPipeline.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createcustompipeline]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples/v1/javascript/createCustomPipeline.js
[receiveeventsusingcheckpointstore]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples/v1/javascript/receiveEventsUsingCheckpointStore.js
[receiveeventswithapispecificstorage]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples/v1/javascript/receiveEventsWithApiSpecificStorage.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/eventhubs-checkpointstore-blob
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureeventhub]: https://docs.microsoft.com/azure/event-hubs/event-hubs-create
[createinstance_azurestorageaccount]: https://docs.microsoft.com/azure/storage/common/storage-account-overview
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/eventhubs-checkpointstore-blob/README.md
