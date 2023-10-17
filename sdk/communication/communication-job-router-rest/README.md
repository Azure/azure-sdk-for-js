# AzureCommunicationRoutingService REST client library for JavaScript

Azure Communication Routing Service

**Please rely heavily on our [REST client docs](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) to use this library**

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/communication/communication-job-router-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/communication-job-router)

## Getting started

### Currently supported environments

- LTS versions of Node.js

### Prerequisites

- You must have an [Azure subscription](https://azure.microsoft.com/free/) to use this package.

### Have an ACS Resource

Create an ACS resource in the [Azure Portal](https://ms.portal.azure.com/#home) or use an existing resource.


### Install the `@azure-rest/communication-job-router` package

Install the AzureCommunicationRoutingService REST client REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/communication-job-router
```

### Create and authenticate a `AzureCommunicationRoutingServiceClient`

To use an [Azure Active Directory (AAD) token credential](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/samples/AzureIdentityExamples.md#authenticating-with-a-pre-fetched-access-token),
provide an instance of the desired credential type obtained from the
[@azure/identity](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) library.

To authenticate with AAD, you must first `npm` install [`@azure/identity`](https://www.npmjs.com/package/@azure/identity) 

After setup, you can choose which type of [credential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#credentials) from `@azure/identity` to use.
As an example, [DefaultAzureCredential](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential)
can be used to authenticate the client.

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables:
AZURE_CLIENT_ID, AZURE_TENANT_ID, AZURE_CLIENT_SECRET

## Tutorial: Route jobs to workers using the Azure Communication Services (ACS) Job Router Rest SDK

In this tutorial, you will learn:

- How to create a queue.
- How to create workers and assign them to a queue.
- How to route jobs to workers.
- How to subscribe to and handle Job Router events.
- How to complete and close jobs.

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

### Install the Azure ACS Job Router SDK

In the `RouterQuickStart` folder, install the ACS Job Router SDK by executing `npm install @azure-rest/communication-job-router --save`.

## Routing Jobs

### Construct Job Router Client

First we need to construct a `AzureCommunicationRoutingServiceClient`.

```js
const {
  createClient,
} = require("@azure-rest/communication-job-router");

const acsConnectionString =
  "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
const jobRouterClient : AzureCommunicationRoutingServiceClient =
  createClient(connectionString);
```

### Create a Distribution Policy

This policy determines which workers will receive job offers as jobs are distributed off their queues.

```js
const result = await routerClient.path("/routing/distributionPolicies/{id}", id).patch({
  contentType: "application/merge-patch+json",
  body: {
    name: "distribution-policy-123",
    offerExpiresAfterSeconds: 30,
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 3,
    },
  }
})
```

### Create a Classification Policy

This policy classifies jobs upon creation.

- Refer to our [rules documentation](https://learn.microsoft.com/azure/communication-services/concepts/router/router-rule-concepts?pivots=programming-language-javascript#rule-engine-types) to better understand prioritization rules.

```js
const classificationPolicyId = "classification-policy-123";
const salesQueueId = "queue-123";
const result = await routerClient.path("/routing/classificationPolicies/{id}", classificationPolicyId).patch({
  contentType: "application/merge-patch+json",
  body: {
    name: "Default Classification Policy",
    fallbackQueueId: salesQueueId,
    queueSelectors: [
      {
        kind: "static",
        queueSelector: { key: "department", labelOperator: "equal", value: "xbox" }
      },
    ],
    workerSelectors: [{
      kind: "static",
      workerSelector: { key: "english", labelOperator: "greaterThan", value: 5 }
    }],
    prioritizationRule: {
      kind: "expression-rule",
      language: "powerFx",
      expression: "If(job.department = \"xbox\", 2, 1)"
    }
  }
});
```

### Create a Queue

This queue offers jobs to workers according to our previously created distribution policy.

```js
await routerClient.path("/routing/queues/{id}", salesQueueId).patch({
  contentType: "application/merge-patch+json",
  body: {
    distributionPolicyId: "distribution-policy-123",
    name: "Main",
    labels: {},
    exceptionPolicyId: "exception-policy-123",
  }
})
```

### Create Workers

These workers are assigned to our previously created "Sales" queue and have some labels.

- setting `availableForOffers` to `true` means these workers are ready to accept job offers.
- refer to our [labels documentation](https://learn.microsoft.com/azure/communication-services/concepts/router/concepts#labels) to better understand labels and label selectors.

```js
  // Create worker "Alice".
const workerAliceId = "773accfb-476e-42f9-a202-b211b41a4ea4";
const workerAliceResponse = await routerClient.path("/routing/workers/{workerId}", workerAliceId).patch({
  contentType: "application/merge-patch+json",
  body: {
    totalCapacity: 120,
    queueAssignments: {
      [salesQueueResponse.id]: {}
    },
    labels: {
      Xbox: 5,
      german: 4,
      name: "Alice"
    },
    channelConfigurations: {
      CustomChatChannel: {
        capacityCostPerJob: 10,
      },
      CustomVoiceChannel: {
        capacityCostPerJob: 100,
      },
    },
  }
})

// Create worker "Bob".
const workerBobId = "21837c88-6967-4078-86b9-1207821a8392";
const workerBobResponse = await routerClient.path("/routing/workers/{workerId}", workerBobId).patch({
  contentType: "application/merge-patch+json",
  body: {
    totalCapacity: 100,
    queueAssignments: {
      [salesQueueResponse.id]: {}
    },
    labels: {
      Xbox: 5,
      english: 3,
      name: "Alice"
    },
    channelConfigurations: {
      CustomChatChannel: {
        capacityCostPerJob: 10,
      },
      CustomVoiceChannel: {
        capacityCostPerJob: 100,
      },
    },
  }
})
```

### Job Lifecycle

Refer to our [job lifecycle documentation](https://learn.microsoft.com/azure/communication-services/concepts/router/concepts#job-lifecycle) to better understand the lifecycle of a job.

### Create a Job

This job is enqueued on our previously created "Sales" queue.

```js
const jobId = "router-job-123";
const result = await routerClient.path("/routing/jobs/{id}", jobId).patch({
  contentType: "application/merge-patch+json",
  body: {
    channelReference: "66e4362e-aad5-4d71-bb51-448672ebf492",
    channelId: "voice",
    priority: 2,
    queueId: salesQueueId,
    labels: {},
  }
})
```

### (Optional) Create Job With a Classification Policy

This job will be classified with our previously created classification policy. It also has a label.

```js
const result = await routerClient.path("/routing/jobs/{id}", jobId).patch({
  contentType: "application/merge-patch+json",
  body: {
    channelReference: "66e4362e-aad5-4d71-bb51-448672ebf492",
    channelId: "voice",
    classificationPolicyId: classificationPolicy.id,
    labels: {
      department: "xbox",
    },
  }
})
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
const acceptResponse = await routerClient.path("/routing/workers/{workerId}/offers/{offerId}:accept", workerId, offerId).post()
// or
const declineResponse = await routerClient.path("/routing/workers/{workerId}/offers/{offerId}:decline", workerId, offerId).post()
```

### Complete the Job

The `assignmentId` received from the previous step's response is required to complete the job.

```ts
  const completeJob = await routerClient.path("/routing/jobs/{id}:complete", jobId).post({
    body: {
      assignmentId: (acceptJobOfferResult as AcceptJobAction200Response).body.assignmentId,
      note: `Job has been completed by ${workerId} at ${new Date()}`
    }
  })
```

### Close the Job

Once the worker has completed the wrap-up phase of the job the `jobRouterClient` can close the job and attach a disposition code to it for future reference.

```ts
const closeJob = await routerClient.path("/routing/jobs/{id}:close", jobId).post({
  body: {
    assignmentId: (acceptJobOfferResult as AcceptJobAction200Response).body.assignmentId,
    note: `Job has been closed by ${workerId} at ${new Date()}`
  }
})
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
