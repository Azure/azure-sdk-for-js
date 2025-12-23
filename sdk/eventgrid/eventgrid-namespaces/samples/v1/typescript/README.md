---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-event-grid
urlFragment: eventgrid-namespaces-typescript
---

# Azure Event Grid client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Event Grid in some common scenarios.

| **File Name**                                 | **Description**                           |
| --------------------------------------------- | ----------------------------------------- |
| [namespaceActivities.ts][namespaceactivities] | Publish and Receive events to Event Grid. |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

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

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/namespaceActivities.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env EVENT_GRID_NAMESPACES_ENDPOINT="<event grid namespaces endpoint>" EVENT_GRID_NAMESPACES_KEY="<event grid namespaces key>" EVENT_SUBSCRIPTION_NAME="<event subscription name>" TOPIC_NAME="<topic name>" node dist/namespaceActivities.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[namespaceactivities]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventgrid/eventgrid-namespaces/samples/v1/typescript/src/namespaceActivities.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/eventgrid-namespaces
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureeventgridcustomtopic,configuredtousetheeventgridschema]: https://learn.microsoft.com/azure/event-grid/scripts/event-grid-cli-create-custom-topic
[createinstance_azureeventgridcustomtopic,configuredtousethecloudevent1.0schema]: https://learn.microsoft.com/azure/event-grid/scripts/event-grid-cli-create-custom-topic
[createinstance_azureservicebusqueue]: https://learn.microsoft.com/azure/service-bus-messaging/service-bus-quickstart-portal
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventgrid/eventgrid-namespaces/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
