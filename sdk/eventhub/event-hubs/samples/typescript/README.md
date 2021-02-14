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

| **File Name**                                                             | **Description**                                                                                                                                                                         |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [sendEvents.ts][sendevents]                                               | demonstrates how the send() function can be used to send events to Event Hubs                                                                                                           |
| [useWithIotHub.ts][usewithiothub]                                         | demonstrates how to use the `EventHubClient` with an `IotHub` instance                                                                                                                  |
| [websockets.ts][websockets]                                               | demonstrates how to use WebSockets enable Event Hubs to work over an HTTP proxy and in environments where the standard AMQP port 5671 is blocked (see the sample for more information)  |
| [usingAadAuth.ts][usingaadauth]                                           | demonstrates how to instantiate EventHubsClient using AAD token credentials obtained from using Service Principal Secrets                                                               |
| [receiveEvents.ts][receiveevents]                                         | demonstrates how to use the EventHubConsumerClient to process events from all partitions of a consumer group in an Event Hubs instance.                                                 |

**Note**: `EventHubConsumerClient` supports checkpointing using the `@azure/eventhubs-checkpointstore-blob` and `@azure/storage-blob` packages. For an example that demonstrates how to use this functionality, see the [receiveEventsUsingCheckpointStore][checkpointing] sample in the `@azure/eventhubs-checkpointstore-blob` repository.

## Prerequisites

The samples are compatible with Node.js >= 8.0.0, except for the samples that use the async `for await` syntax, which require a Node.js >= 10.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Event Hub resource][azhubacct] to run these sample programs. The IOT Hub sample additionally requires an [IOT Hub resource][aziothub]. Samples retrieve credentials to access the event hub from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser requires some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/sendEvents.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env EVENTHUB_NAME="<hub name>" EVENTHUB_CONNECTION_STRING="<connection string>" node dist/sendEvents.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sendevents]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/typescript/src/sendEvents.ts
[usewithiothub]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/typescript/src/useWithIotHub.ts
[websockets]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/typescript/src/websockets.ts
[usingaadauth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/typescript/src/usingAadAuth.ts
[receiveevents]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/typescript/src/receiveEvents.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/event-hubs
[checkpointing]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples/typescript/src/receiveEventsUsingCheckpointStore.ts
[azhubacct]: https://docs.microsoft.com/azure/event-hubs/event-hubs-node-get-started-send
[aziothub]: https://docs.microsoft.com/azure/iot-hub/iot-hub-node-node-module-twin-getstarted
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
