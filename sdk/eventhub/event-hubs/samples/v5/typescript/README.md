---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-event-hubs
urlFragment: event-hubs-typescript
---

# Azure Event Hubs client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Event Hubs in some common scenarios.

| **File Name**                                                           | **Description**                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [sendBufferedEvents.ts][sendbufferedevents]                             | Demonstrates how to send events to an Event Hub using the `EventHubBufferedProducerClient`. This sample is different from the one in `sendEvent.ts` in that the client manages batching of events and sending after a given amount of time or after a given amount of events are in a batch instead of you managing the same explicitly. |
| [sendEvents.ts][sendevents]                                             | Demonstrates how to send events to an Event Hub.                                                                                                                                                                                                                                                                                         |
| [sendEventsToSpecificPartition.ts][sendeventstospecificpartition]       | Demonstrates how to send events to a specific partition in an Event Hub.                                                                                                                                                                                                                                                                 |
| [receiveEvents.ts][receiveevents]                                       | Demonstrates how to use the EventHubConsumerClient to process events from all partitions of a consumer group in an Event Hub.                                                                                                                                                                                                            |
| [usingAadAuth.ts][usingaadauth]                                         | Demonstrates how to instantiate EventHubsClient using AAD token credentials obtained from using service principal secrets.                                                                                                                                                                                                               |
| [iothubConnectionString.ts][iothubconnectionstring]                     | Demonstrates how to convert an IoT Hub connection string to an Event Hubs connection string that points to the built-in messaging endpoint.                                                                                                                                                                                              |
| [iothubConnectionStringWebsockets.ts][iothubconnectionstringwebsockets] | Demonstrates how to convert an IoT Hub connection string to an Event Hubs connection string that points to the built-in messaging endpoint using WebSockets.                                                                                                                                                                             |
| [useWithIotHub.ts][usewithiothub]                                       | Demonstrates how to use the EventHubConsumerClient to receive messages from an IoT Hub.                                                                                                                                                                                                                                                  |
| [websockets.ts][websockets]                                             | Demonstrates how to connect to Azure Event Hubs over websockets to work over an HTTP proxy.                                                                                                                                                                                                                                              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Event Hub][createinstance_azureeventhub]

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
node dist/sendBufferedEvents.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env EVENTHUB_CONNECTION_STRING="<eventhub connection string>" EVENTHUB_NAME="<eventhub name>" node dist/sendBufferedEvents.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sendbufferedevents]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/sendBufferedEvents.ts
[sendevents]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/sendEvents.ts
[sendeventstospecificpartition]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/sendEventsToSpecificPartition.ts
[receiveevents]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/receiveEvents.ts
[usingaadauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/usingAadAuth.ts
[iothubconnectionstring]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/iothubConnectionString.ts
[iothubconnectionstringwebsockets]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/iothubConnectionStringWebsockets.ts
[usewithiothub]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/useWithIotHub.ts
[websockets]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/websockets.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/event-hubs
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureeventhub]: https://docs.microsoft.com/azure/event-hubs/event-hubs-create
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
