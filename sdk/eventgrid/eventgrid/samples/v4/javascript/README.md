---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-event-grid
urlFragment: eventgrid-javascript
---

# Azure Event Grid client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Event Grid in some common scenarios.

| **File Name**                                                           | **Description**                                               |
| ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| [consumeEventsFromServiceBusQueue.js][consumeeventsfromservicebusqueue] | Consume events delivered by Event Grid to a Service Bus Queue |
| [sendEventGridEvent.js][sendeventgridevent]                             | Send events to Event Grid using the Event Grid Schema.        |
| [sendCloudEvent.js][sendcloudevent]                                     | Send events to Event Grid using the Cloud Events 1.0 Schema.  |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Event Grid Custom Topic, configured to use the Event Grid Schema][createinstance_azureeventgridcustomtopic,configuredtousetheeventgridschema]
- [Azure Event Grid Custom Topic, configured to use the Cloud Event 1.0 Schema][createinstance_azureeventgridcustomtopic,configuredtousethecloudevent1.0schema]
- [Azure Service Bus Queue][createinstance_azureservicebusqueue]

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
node consumeEventsFromServiceBusQueue.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SERVICE_BUS_CONNECTION_STRING="<service bus connection string>" SERVICE_BUS_QUEUE_NAME="<service bus queue name>" node consumeEventsFromServiceBusQueue.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[consumeeventsfromservicebusqueue]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventgrid/eventgrid/samples/v4/javascript/consumeEventsFromServiceBusQueue.js
[sendeventgridevent]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventgrid/eventgrid/samples/v4/javascript/sendEventGridEvent.js
[sendcloudevent]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventgrid/eventgrid/samples/v4/javascript/sendCloudEvent.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/eventgrid
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureeventgridcustomtopic,configuredtousetheeventgridschema]: https://docs.microsoft.com/azure/event-grid/scripts/event-grid-cli-create-custom-topic
[createinstance_azureeventgridcustomtopic,configuredtousethecloudevent1.0schema]: https://docs.microsoft.com/azure/event-grid/scripts/event-grid-cli-create-custom-topic
[createinstance_azureservicebusqueue]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-quickstart-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventgrid/eventgrid/README.md
