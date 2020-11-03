---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-event-hubs
urlFragment: event-hubs-typescript-express-node
---

# Azure Event Hubs client library express samples for Typescript

This sample programs show how to use the JavaScript client libraries for Azure Event Hubs to send events in the node express framework. Classical scenairo is building an async web service to server http payload and ingest event into downstream eventHub.

| **File Name**                     | **Description**                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [eventProducer.ts][eventproducer] | Demonstrates how the send() function can be used to send events to an Event Hub instance. Support batch send and time trigger. |
| [index.ts][index]                 | Express Http server entry point. Receive http payload and use eventProducer to ingest payload to eventHub.                     |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0 and run in express.

You need [an Azure subscription][freesub] and [an Azure Event Hub resource][azhubacct] to run these sample programs.

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Create a bundle JavaScript file that can be ran in the browser:

```bash
npm run build
```

3. Serve the node service on http://localhost:8080:

```bash
npm start
```

4. Call local http server

```bash
curl http://localhost:8080 -json {'hello': 'world'}
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[eventproducer]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/expressSample/src/eventProducer.ts
[index]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples/expressSample/src/index.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/event-hubs
