# Azure Communication Job Router client sdk for JavaScript

This package contains a JS SDK for Azure Communication Services for Job Router.

## Getting started

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal], the [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-job-router
```

### Browser support

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Tutorial: Route customer support requests to workers using the Azure Communication Services (ACS) Router SDK

In this tutorial, you will learn:

- How to create a queue.
- How to create workers and associate them with a queue.
- How to route incoming jobs to queues.

### Key concepts

[Job Router key concepts](https://learn.microsoft.com/azure/communication-services/concepts/router/concepts)

## Setting Up

### Install an IDE

Install IDE such as [VSCode](https://code.visualstudio.com/download) or [Webstorm](https://www.jetbrains.com/webstorm/download/) if you haven't (Optional)

### Install NodeJS

Install [NodeJS](https://github.com/nodejs/release#release-schedule)

### Create a new NodeJS Express server

In a console window (such as cmd, PowerShell, or Bash), create a new folder named `RouterQuickStart` and use `npx express-generator` to create a new Express app in the current folder. This will create a simple "Hello World" Express project that will listen on port `3000`, as follows:

```sh
mkdir RouterQuickStart
cd RouterQuickStart
npx express-generator
npm install
DEBUG=routerquickstart:* npm start
```

### Create an ACS resource on Azure

Create a new Azure Communication service resource on Azure https://ms.portal.azure.com/#home or use existing resource.

### Install the Azure Communication Services Router SDK

In the application directory, install the Azure Communication Services Router client library for JavaScript package by using the `npm install --save` command
`npm install @azure/communication-job-router`

## Examples

### Initialize Router Client

First we need to initialize a Router client.

```js
const { RouterClient } = require("@azure/communication-job-router");

const acsConnectionString =
  "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
const routerClient = new RouterClient(acsConnectionString);
const routerAdministrationClient = new RouterAdministrationClient(acsConnectionString);
```

## Configure Queue and Workers

### Configure distribution policy

Create a distribution policy that will determine which workers will receive jobs as they are distributed off the queues.

```js
const distributionPolicy = await routerAdministrationClient.createDistributionPolicy("Default", {
  name: "Default Distribution Policy",
  offerTTL: { seconds: 30 },
  mode: {
    objectType: "longest-idle",
    minConcurrentOffers: 1,
    maxConcurrentOffers: 3,
  },
});
```

### Create a queue

Then we create a sales queue with various labels.

```js
const salesQueueResponse = await routerAdministrationClient.createQueue("Sales", {
  name: "Sales",
  distributionPolicyId: distributionPolicy.Id,
  labels: {
    Department: "Xbox",
  },
});
```

### Register workers

Register workers “Bob” and “Alice” with various labels.

```js
// Create worker Bob
const workerId = "21837c88-6967-4078-86b9-1207821a8392";
const bobWorkerResponse = await routerClient.createWorker(workerId, {
  totalCapacityScore: 100,
  labels: {
    Xbox: 5,
    English: 3
    name: "Bob"
  },
  queueAssignments: { [salesQueueResponse.Id]: {} },
  availableForOffers: true
});

// Create worker Alice
const workerAliceId = "773accfb-476e-42f9-a202-b211b41a4ea4";
const aliceWorkerResponse = await routerClient.createWorker(workerAliceId, {
  totalCapacityScore: 120,
  labels: {
    Xbox: 5,
    name: "Alice",
    German: 4
  },
  queueAssignments: { [salesQueueResponse.Id]: {} },
  availableForOffers: true
});
```

### Creating a job

If your application can determine the correct queue, labels and/or priority, you can directly create a job with these values.

```js
await routerClient.createJob("asdaccfb-476e-42f9-a202-b211b41a4ea4", {
  channelReference: "66e4362e-aad5-4d71-bb51-448672ebf492",
  channelId: "Voice",
  priority: 2,
  queueId: salesQueueResponse.Id,
});
```

### Configure classification policy

Create a classification policy that will house queue selectors, prioritization rule and worker selectors in order to classify incoming job.

```js
const classificationPolicy = await routerAdministrationClient.createClassificationPolicy("Default", {
  name: "Default Classification Policy",
  fallbackQueueId: salesQueueResponse.Id,
  queueSelectors: [{
    kind: "static",
    labelSelector: { key: "Department", labelOperator: "equal", value: "Xbox" }
  }],
  workerSelectors: [{
    kind: "static",
    labelSelector: { key: "english", labelOperator: "greaterThan", value: 5 }
  }],
  prioritizationRule: {
    kind: "expression-rule",
    language: "powerFx";
    expression: "If(job.department = \"xbox\", 2, 1)"
  }
});
```

### Creating Job via using classification policy

```js
await routerClient.createJob("fdw2rcfb-476e-42f9-a202-b211b41a4ea4", {
  // e.g. callId or chat threadId
  channelReference: "a7c54dc6-c545-4151-a195-41e9e35b17c6",
  channelId: "Voice",
  classificationPolicyId: classificationPolicy.Id,
  labels: {
    department: "xbox",
  },
});
```

### Receive events for jobs in queue

Communication Services Router events are delivered to customers via Azure Event Grid. See [subscribe events](https://learn.microsoft.com/azure/communication-services/how-tos/router-sdk/subscribe-events) on how to setup and handle Router events.
In above example, the incoming call gets routed to “Sales Queue” queue and a worker is matched to handle the job and an OfferIssued event will arrive at event grid with matched worker information.
Once you setup to handle events by following steps in above link. Job events will be sent to your endpoint. Json payload of a sample event looks like this:

```json
{
  "id": "1027db4a-17fe-4a7f-ae67-276c3120a29f",
  "topic": "/subscriptions/{subscription-id}/resourceGroups/{group-name}/providers/Microsoft.Communication/communicationServices/{communication-services-resource-name}",
  "subject": "worker/{worker-id}/job/{job-id}",
  "data": {
    "workerId": "w100",
    "jobId": "7f1df17b-570b-4ae5-9cf5-fe6ff64cc712",
    "channelReference": "test-abc",
    "channelId": "FooVoiceChannelId",
    "queueId": "625fec06-ab81-4e60-b780-f364ed96ade1",
    "offerId": "525fec06-ab81-4e60-b780-f364ed96ade1",
    "offerTimeUtc": "2021-06-23T02:43:30.3847144Z",
    "expiryTimeUtc": "2021-06-23T02:44:30.3847674Z",
    "jobPriority": 5,
    "jobLabels": {
      "Locale": "en-us",
      "Segment": "Enterprise",
      "Token": "FooToken"
    },
    "jobTags": {
      "Locale": "en-us",
      "Segment": "Enterprise",
      "Token": "FooToken"
    }
  },
  "eventType": "Microsoft.Communication.RouterWorkerOfferIssued",
  "dataVersion": "1.0",
  "metadataVersion": "1",
  "eventTime": "2022-02-17T00:55:25.1736293Z"
}
```

### Subscribing to events

1. Navigate to your Azure Communication Services resource in the Azure portal and open the “Events” blade.
2. Add an event subscription for the “Router OfferIssued” event and set it to go to a WebHook endpoint within your application. Other options for receiving the events include Azure Functions, Service Bus, etc. See [EventGrid documentation](https://docs.microsoft.com/azure/event-grid/overview) for details.
3. The route in your NodeJS application that receives these notifications may look something like this:

```js
app.post('/event', (req, res) => {
    req.body.forEach(eventGridEvent => {
        // Deserialize the event data into the appropriate type based on event type using if/elif/else
        if (eventGridEvent.eventType == "Microsoft.EventGrid.SubscriptionValidationEvent") {
            res.send({ validationResponse: eventGridEvent.data.validationCode };
        } else if (eventGridEvent.eventType == "Microsoft.Azure.CommunicationServices.RouterWorkerOfferIssued") {
           // Got RouterWorkerOfferIssued event;
        } else ...
    });
    ...
});
```

### Accept Job

Once you receive an OfferIssued event, you can accept or decline the Job with the following SDK call, passing in the worker's ACS identity so that they can be added to the job.

```js
await routerClient.acceptJobOffer(workerId, offerId);
```

### Complete Job

Once the worker has accepted the job, the response will include an assignment ID. This can in turn be used to complete the job once a resolution has been reached, which will transition the job into a "wrap-up" state.

```js
await routerClient.completeJob(jobId, assignmentId);
```

### Close Job

Once the worker has completed the wrap-up phase of the job the worker can finally close the job and attach a disposition code to it for future reference.

```js
await routerClient.closeJob(jobId, assignmentId, { dispositionCode: "Resolved" });
```

## Next steps

Please take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/communication/)
directory for detailed examples on how to use this library.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
