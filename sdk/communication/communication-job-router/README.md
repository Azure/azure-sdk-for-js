# Azure Communication Services (ACS) Job Router SDK for JavaScript

This package contains the JavaScript SDK for the Azure Communication Services (ACS) Job Router Service.

## Getting Started

### Key Concepts

Refer to our [Job Router key concepts documentation](https://learn.microsoft.com/azure/communication-services/concepts/router/concepts) to better understand Job Router.

### Prerequisites

- An [Azure subscription][azure_sub].
- An Azure Communication Services (ACS) resource.
  - If you need to create an ACS resource, you can use the [Azure Portal][azure_portal], [Azure PowerShell][azure_powershell], or the [Azure CLI][azure_cli].

### Installing

```bash
npm install @azure/communication-job-router
```

### Browser support

To use Azure SDK libraries on a website, you need to convert your code to work inside the browser. You do this using a tool called a **bundler**. Refer to our [bundling documentation](https://aka.ms/AzureSDKBundling) to better understand bundling.

## Tutorial: Route jobs to workers using the Azure Communication Services (ACS) Job Router SDK

In this tutorial, you will learn:

- How to create a queue.
- How to create workers and assign them to a queue.
- How to route jobs to workers.
- How to subscribe to and handle Job Router events.
- How to complete and close jobs.

## Setting Up

### (Optional) Install an IDE

Install an IDE such as [VSCode](https://code.visualstudio.com/download) or [Webstorm](https://www.jetbrains.com/webstorm/download/).

### Install NodeJS

Install [NodeJS](https://github.com/nodejs/release#release-schedule).

### Start a NodeJS Express server

In a shell (cmd, PowerShell, Bash, etc.), create a folder called `RouterQuickStart` and inside this folder execute `npx express-generator`. This will generate a simple Express project that will listen on `port 3000`.

#### Example

```sh
mkdir RouterQuickStart
cd RouterQuickStart
npx express-generator
npm install
DEBUG=routerquickstart:* npm start
```

### Have an ACS Resource

Create an ACS resource in the [Azure Portal](https://ms.portal.azure.com/#home) or use an existing resource.

### Install the Azure ACS Job Router SDK

In the `RouterQuickStart` folder, install the ACS Job Router SDK by executing `npm install @azure/communication-job-router --save`.

## Routing Jobs

### Construct Job Router Clients

First we need to construct a `jobRouterAdministrationClient` and a `jobRouterClient`.

- `jobRouterAdministrationClient` provides methods for Classification Policies, Distribution Policies, Exception Policies, and Queues.
- `jobRouterClient` provides methods for Jobs and Workers.

```js
const {
  JobRouterClient,
  JobRouterAdministrationClient,
} = require("@azure/communication-job-router");

const acsConnectionString =
  "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
const jobRouterClient = new JobRouterClient(acsConnectionString);
const jobRouterAdministrationClient = new JobRouterAdministrationClient(acsConnectionString);
```

### Create a Distribution Policy

This policy determines which workers will receive job offers as jobs are distributed off their queues.

```js
const distributionPolicy = await jobRouterAdministrationClient.createDistributionPolicy(
  "default-distribution-policy-id",
  {
    name: "Default Distribution Policy",
    offerExpiresAfterSeconds: 30,
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 3,
    },
  }
);
```

### Create a Classification Policy

This policy classifies jobs upon creation.

- Refer to our [rules documentation](https://learn.microsoft.com/azure/communication-services/concepts/router/router-rule-concepts?pivots=programming-language-javascript#rule-engine-types) to better understand prioritization rules.

```js
const classificationPolicy = await jobRouterAdministrationClient.createClassificationPolicy("default-classification-policy-id", {
  name: "Default Classification Policy",
  fallbackQueueId: salesQueueResponse.id,
  queueSelectors: [{
    kind: "static",
    labelSelector: { key: "department", labelOperator: "equal", value: "xbox" }
  }],
  workerSelectors: [{
    kind: "static",
    labelSelector: { key: "english", labelOperator: "greaterThan", value: 5 }
  }],
  prioritizationRule: {
    kind: "expression-rule",
    language: "powerFx",
    expression: "If(job.department = \"xbox\", 2, 1)"
  }
});
```

### Create a Queue

This queue offers jobs to workers according to our previously created distribution policy.

```js
const salesQueueResponse = await jobRouterAdministrationClient.createQueue("sales-queue-id", {
  name: "Sales",
  distributionPolicyId: distributionPolicy.id,
  labels: {
    department: "xbox",
  },
});
```

### Create Workers

These workers are assigned to our previously created "Sales" queue and have some labels.

- setting `availableForOffers` to `true` means these workers are ready to accept job offers.
- refer to our [labels documentation](https://learn.microsoft.com/azure/communication-services/concepts/router/concepts#labels) to better understand labels and label selectors.

```js
  // Create worker "Alice".
  const workerAliceId = "773accfb-476e-42f9-a202-b211b41a4ea4";
  const workerAliceResponse = await jobRouterClient.createWorker(workerAliceId, {
    totalCapacity: 120,
    labels: {
      Xbox: 5,
      german: 4,
      name: "Alice"
    },
    queueAssignments: { [salesQueueResponse.id]: {} },
    availableForOffers: true
  });

// Create worker "Bob".
const workerBobId = "21837c88-6967-4078-86b9-1207821a8392";
const workerBobResponse = await jobRouterClient.createWorker(workerBobId, {
  totalCapacity: 100,
  labels: {
    xbox: 5,
    english: 3,
    name: "Bob"
  },
  queueAssignments: { [salesQueueResponse.id]: {} },
  availableForOffers: true
});

```

### Job Lifecycle

Refer to our [job lifecycle documentation](https://learn.microsoft.com/azure/communication-services/concepts/router/concepts#job-lifecycle) to better understand the lifecycle of a job.

### Create a Job

This job is enqueued on our previously created "Sales" queue.

```js
const job = await jobRouterClient.createJob("job-id", {
  // e.g. callId or chat threadId
  channelReference: "66e4362e-aad5-4d71-bb51-448672ebf492",
  channelId: "voice",
  priority: 2,
  queueId: salesQueueResponse.id,
});
```

### (Optional) Create Job With a Classification Policy

This job will be classified with our previously created classification policy. It also has a label.

```js
const classificationJob = await jobRouterClient.createJob("classification-job-id", {
  // e.g. callId or chat threadId
  channelReference: "66e4362e-aad5-4d71-bb51-448672ebf492",
  channelId: "voice",
  classificationPolicyId: classificationPolicy.id,
  labels: {
    department: "xbox",
  },
});
```

## Events

Job Router events are delivered via Azure Event Grid. Refer to our [Azure Event Grid documentation](https://docs.microsoft.com/azure/event-grid/overview) to better understand Azure Event Grid.

In the previous example:

- The job gets enqueued to the “Sales" queue.
- A worker is selected to handle the job, a job offer is issued to that worker, and a `RouterWorkerOfferIssued` event is sent via Azure Event Grid.

Example `RouterWorkerOfferIssued` JSON shape:

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
    "offerTimeUtc": "2023-08-17T02:43:30.3847144Z",
    "expiryTimeUtc": "2023-08-17T02:44:30.3847674Z",
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
  "eventTime": "2023-08-17T00:55:25.1736293Z"
}
```

### Subscribing to Events

One way to subscribe to ACS Job Router events is through the Azure Portal.

1. Navigate to your ACS resource in the Azure Portal and open the “Events” blade.
2. Add an event subscription for the “RouterWorkerOfferIssued” event.
3. Select an appropriate means to receive the event (e.g. Webhook, Azure Functions, Service Bus).

Refer to our ["subscribe to Job Router events" documentation](https://learn.microsoft.com/azure/communication-services/how-tos/router-sdk/subscribe-events) to better understand subscribing to Job Router events.

The route in your NodeJS application that receives events may look something like this:

```js
app.post('/event', (req, res) => {
    req.body.forEach(eventGridEvent => {
        // Deserialize the event data into the appropriate type
        if (eventGridEvent.eventType === "Microsoft.EventGrid.SubscriptionValidationEvent") {
            res.send({ validationResponse: eventGridEvent.data.validationCode };
        } else if (eventGridEvent.eventType === "Microsoft.Azure.CommunicationServices.RouterWorkerOfferIssued") {
           // RouterWorkerOfferIssued handling logic;
        } else if ...
    });
    ...
});
```

### Accept or Decline the Job Offer

Once you receive a `RouterWorkerOfferIssued` event you can accept or decline the job offer.

- `workerid` - The id of the worker accepting the job offer.
- `offerId` - The id of the offer being accepted or declined.

```js
const acceptResponse = await jobRouterClient.acceptJobOffer(workerId, offerId);
// or
const declineResponse = await jobRouterClient.declineJobOffer(workerId, offerId);
```

### Complete the Job

The `assignmentId` received from the previous step's response is required to complete the job.

```js
await jobRouterClient.completeJob(jobId, assignmentId);
```

### Close the Job

Once the worker has completed the wrap-up phase of the job the `jobRouterClient` can close the job and attach a disposition code to it for future reference.

```js
await jobRouterClient.closeJob(jobId, assignmentId, { dispositionCode: "Resolved" });
```

## Next steps

Take a look at the
[samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/)
directory for additional detailed examples of using this SDK.

## Contributing

If you'd like to contribute to this SDK, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com
[azure_powershell]: https://docs.microsoft.com/powershell/module/az.communication/new-azcommunicationservice
