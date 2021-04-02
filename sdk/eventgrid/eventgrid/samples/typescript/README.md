---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-event-grid
urlFragment: eventgrid-typescript
---

# Azure Event Grid client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Event Grid in some common scenarios.

| **File Name**                                         | **Description**                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [sendEventGridEvent.ts][sendeventgridevent]           | Send events to Event Grid using the Event Grid Schema                                                |
| [sendCloudEvent.ts][sendcloudevent]                   | Send events to Event Grid using the Cloud Events 1.0 Schema                                          |
| [consumeEventsFromServiceBusQueue.ts][consumefromsb]  | Consume events delivered by Event Grid to a Service Bus Queue                                        |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0, except for the samples that use the async for await syntax, which require a Node.js >= 10.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Event Grid topic][azeventgrid] to run these sample programs. Samples retrieve credentials to access the Event Grid endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

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

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Not all environment variables are required. Read the relevant sample sources and the `sample.env` file to determine which ones are required. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like:

```bash
node dist/sendEventGridEvent.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sendeventgridevent]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventgrid/eventgrid/samples/typescript/src/sendEventGridEvent.ts
[sendcloudevent]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventgrid/eventgrid/samples/typescript/src/sendCloudEvent.ts
[consumefromsb]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventgrid/eventgrid/samples/typescript/src/consumeEventsFromServiceBusQueue.ts
[apiref]: https://azure.github.io/azure-sdk-for-js/eventgrid.html
[azeventgrid]: https://azure.microsoft.com/services/event-grid/
[freesub]: https://azure.microsoft.com/free/
[typescript]: https://www.typescriptlang.org/docs/home.html
