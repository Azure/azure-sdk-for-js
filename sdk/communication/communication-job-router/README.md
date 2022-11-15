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

# Tutorial: Route customer support requests to workers using the Azure Communication Services (ACS) Router SDK

In this tutorial, you will learn:

- How to create a queue.
- How to create workers and associate them with a queue.
- How to route incoming jobs to queues.

## Key concepts

| Name                       | Description                                                                                                                                                                                                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RouterClient               | This class is needed for router functionality. You instantiate it with your subscription information, and manage workers and jobs.                                                                                                                                                                                             |
| RouterAdministrationClient | This class is needed for router administration functionality. You instantiate it with your subscription information, and manage policies and queues.                                                                                                                                                                           |
| Job                        | A unit of work that needs to be done. eg. service an incoming call/chat/etc. Jobs will be organized into queues.                                                                                                                                                                                                               |
| Queue                      | Queues are where jobs wait until they get handled by workers, ordered by priority then enqueue time                                                                                                                                                                                                                            |
| Worker                     | Workers are a resource (e.g. human or bot) that can handle incoming jobs from queues.                                                                                                                                                                                                                                          |
| Socket                     | A socket is a property of a worker and represents a worker's capacity to take on new jobs. When the worker is busy with one or more jobs, the socket is engaged, when a job completes the socket becomes open for new work. This enables workers to manage the concurrency of jobs being offered to them according to channel. |
| Channel                    | The medium upon which a job will be carried out. In the context of communication scenarios, this includes Voice, Chat, Video, etc.                                                                                                                                                                                             |
| Classification Policy      | A named container for the skills policy, prioritization policy and queue selection policy. When Contoso creates a new job, a classification policy can be specified that will determine the required skills to fulfill it, its priority and which queue it should be routed to respectively                                    |
| Distribution Policy        | The distribution policy is a container of rules on how jobs are allocated and distributed to workers from a queue. This includes offer time to live, distribution method (e.g. round robin, top (n) available agents, etc) and allocation rules.                                                                               |
| Exception Policy           | A container of rules that define what action to take when a particular exception occurs. This container of rules can be associated with one or more queues.                                                                                                                                                                    |

##Setting Up
###Install an IDE
Install IDE such as [VSCode](https://code.visualstudio.com/download) or [Webstorm](https://www.jetbrains.com/webstorm/download/) if you haven't (Optional)

###Install NodeJS if you haven't
LTS or Current version, either is ok.
https://github.com/nodejs/release#release-schedule

### Create a new NodeJS Express server

In a console window (such as cmd, PowerShell, or Bash), create a new folder named `RouterQuickStart` and use `npx express-generator` to create a new Express app in the current folder. This will create a simple "Hello World" Express project that will listen on port `3000`, as follows:

```
mkdir RouterQuickStart
cd RouterQuickStart
npx express-generator
npm install
DEBUG=routerquickstart:* npm start
```

###Create an ACS resource on Azure
Create a new Azure Communication service resource on Azure https://ms.portal.azure.com/#home or use existing resource.

###Install the Azure Communication Services Router SDK
In the application directory, install the Azure Communication Services Router client library for JavaScript package by using the `npm install --save` command
`npm install @azure/communication-job-router`

## Examples

###Initialize Router Client
First we need to initialize a Router client.

```js
const { RouterClient } = require("@azure/communication-job-router");

const acsConnectionString =
  "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
const routerClient = new RouterClient(acsConnectionString);
const routerAdministrationClient = new RouterAdministrationClient(acsConnectionString);
```

##Configure Queue and Workers
###Create a queue
Then we create a sales queue with various labels.

```js
const salesQueueResponse = await routerAdministrationClient.createQueue({
  name: "Sales",
  distributionPolicyId: "0832f57a-a651-4cd3-b721-1a1ce76ecf2b",
  labels: {
    Department: "Xbox"
  },
  exceptionPolicyId: "cb272ee4-38ae-41d8-9408-190d9c7a98aa"
});
```

###Register workers
Register workers “Bob” and “Alice” with various abilities.

```js
// Create worker Bob
const workerId = "21837c88-6967-4078-86b9-1207821a8392";
const bobWorkerResponse = await routerClient.createWorker(workerId, {
  totalCapacityScore: 100,
  abilities: {
    Xbox: 5,
    English: 3
  },
  labels: {
    name: "Bob"
  },
  queueAssignments: { [salesQueueResponse.Id]: {} }
});

// Create worker Alice
const workerAliceId = "773accfb-476e-42f9-a202-b211b41a4ea4";
const aliceWorkerResponse = await routerClient.createWorker(workerAliceId, {
  totalCapacityScore: 120,
  abilities: {
    Xbox: 5,
    German: 4
  },
  labels: {
    name: "Alice"
  },
  queueAssignments: { [salesQueueResponse.Id]: {} }
});
```

Note: Workers may also be registered via [Azure Communication Services Worker Management SDK](https://skype.visualstudio.com/SPOOL/_wiki/wikis/SPOOL.wiki/21323/Worker-Management-DevX-JS?anchor=create-workers)

### Register workers if workers are inactive (Optional)

Register workers Bob and Alice to make them active.

```js
await routerClient.registerWorker(bobWorkerResponse.Id);
await routerClient.registerWorker(aliceWorkerResponse.Id);
```

Note: Workers may also be assigned to queues via [Azure Communication Services Worker Management SDK](https://skype.visualstudio.com/SPOOL/_wiki/wikis/SPOOL.wiki/21323/Worker-Management-DevX-JS?anchor=associate-group-to-a-queue)

###Configure classification policy
Create a classification policy that will house skills policy, prioritization policy and queue selection policy in order to classify incoming jobs.

```js
await routerAdministrationClient.createClassificationPolicy({
  name: "Default Classification Policy",
  defaultQueueId: "5a520826-d1d7-4403-9880-cfbc61f1e5f0",
  queueSelectionRules: {
    objectType: "expressionRuleContainer",
    language: "Javascript",
    expression:
      "return labels.department === 'xbox' ? { department: 'Xbox' } : { department: 'default' }"
  },
  workerAbilityRules: {
    objectType: "expressionRuleContainer",
    language: "Javascript",
    expression: "return labels.department === 'xbox' ? { xbox: 3, english: 1 } : { english: 1 }"
  },
  prioritizationRules: {
    objectType: "expressionRuleContainer",
    language: "Javascript",
    expression: "return labels.department === 'xbox' ? 2 : 1"
  }
});
```

###Configure distribution policy
Create a distribution policy that will determine which workers will receive jobs as they are distributed off the queues.

```js
await routerAdministrationClient.createDistributionPolicy({
  name: "Default Distribution Policy",
  offerTTL: { seconds: 30 },
  mode: {
    objectType: "longest-idle",
    minConcurrentOffers: 1,
    maxConcurrentOffers: 3
  },
  filter: {
    objectType: "weighted",
    allocations: [
      {
        weight: 0.7,
        matchers: [
          {
            key: "Company",
            operator: "Equal",
            value: "Tailwind"
          }
        ]
      },
      {
        weight: 0.3,
        matchers: [
          {
            key: "Company",
            operator: "Equal",
            value: "Acme"
          }
        ]
      }
    ]
  }
});
```

## Routing Jobs (call/chat/SMS) to queue

A call comes in and is passed to an IVR system that extracts some information about the caller, we then pass the information to the Router service by creating a new job. We can either do this manually via the SDK or use ACS Router Logic App connectors to orchestrate the ACS Router of the call.

### Creating Job via SDK

```js
await routerClient.createJob({
  // e.g. callId or chat threadId
  channelReference: "a7c54dc6-c545-4151-a195-41e9e35b17c6",
  jobType: "Inbound",
  channelId: "f394573b-915a-4abd-8303-eb46c19013be",
  classificationPolicyId: "5579aed1-369f-49d7-a164-b92f8fa0f267",
  labels: {
    department: "xbox"
  }
});
```

### Logic App

![image.png](/.attachments/image-7063d85f-9a88-4c5b-99e5-5f2fb88d3c38.png)

### Bypass classification

Alternatively, if your application can determine the correct queue, skills required and/or priority, you can pass these values instead of the classificationPolicyId.

```js
await routerClient.createJob({
  channelReference: "66e4362e-aad5-4d71-bb51-448672ebf492",
  jobType: "Inbound",
  channelId: "f394573b-915a-4abd-8303-eb46c19013be",
  labels: {
    department: "xbox"
  },
  abilities: {
    xbox: 3
  },
  priority: 2,
  queueId: "25218b8f-34d8-47af-8dae-7f3d38654d53"
});
```

### Receive events for jobs in queue

Communication Services Router events are delivered to customers via Azure Event Grid. See [this resource](https://docs.microsoft.com/en-ca/azure/communication-services/quickstarts/telephony-sms/handle-sms-events) on how to setup and handle Router events.
In above example, the incoming call gets routed to “Sales Queue” queue and a worker is matched to handle the job and an OfferIssued event will arrive at event grid with matched worker information.
Once you setup to handle events by following steps in above link. Job events will be sent to your endpoint. Json payload of a sample event looks like this:

```json
{
  "id": "4fb49a93-8704-4916-bbfd-befb432c667e",
  "topic": "/subscription/5e1eee10-a1c5-440a-9128-3e43048287b2/resourcegroup/acs-events-rg-1/providers/microsoft.communication/communicationservices/acs/events-reource-1",
  "data": {
    "jobId": "ba5701f0-a1d1-4357-a89c-abfc018b75ad",
    "workerId": "5b3b2714-b1fc-4e09-a451-68210ea2832c",
    "channelId": "989e73e8-1015-4f7c-bc16-2e9e19172dab",
    "offerTimeUtc": "2021-06-10T22:00:05.90463293+00:00",
    "expiryTimeUtc": "2021-06-10T22:00:35.90463293+00:00",
    "consumptionScore": 25
  },
  "eventType": "Microsoft.Azure.CommunicationServices.OfferIssued",
  "eventTime": "2021-06-10T22:00:05.90463293+00:00",
  "dataVersion": "1.0"
}
```

### Subscribing to events

1. Navigate to your Azure Communication Services resource in the Azure portal and open the “Events” blade.
2. Add an event subscription for the “Router OfferIssued” event and set it to go to a WebHook endpoint within your application. Other options for receiving the events include Azure Functions, Service Bus, etc. See [EventGrid documentation](https://docs.microsoft.com/azure/event-grid/overview) for details.
3. The route in your NodeJS application that receives these notifications would look something like this:

```js
app.post('/event', (req, res) => {
    req.body.forEach(eventGridEvent => {
        // Deserialize the event data into the appropriate type based on event type using if/elif/else
        if (eventGridEvent.eventType == "Microsoft.EventGrid.SubscriptionValidationEvent") {
            res.send({ validationResponse: eventGridEvent.data.validationCode };
        } else if (eventGridEvent.eventType == "Microsoft.Azure.CommunicationServices.OfferIssued") {
           // Got OfferIssued event;
        } else ...
    });
    ...
});
```

### Accept Job

Once you receive an OfferIssued event, you can accept or decline the Job with the following SDK call, passing in the worker's ACS identity so that they can be added to the job.

```js
await routerClient.acceptJobAction({
  jobId: "ed02ac28-6a69-49ba-b1c1-be7ac6a9925f",
  workerId: "90df513d-3394-434a-bf09-171a0e878b27"
});
```

### Complete Job

Once the worker has accepted the job, the response will include an assignment ID. This can in turn be used to complete the job once a resolution has been reached, which will transition the job into a "wrap-up" state.

```js
await routerClient.completeJob({
  jobId: "ed02ac28-6a69-49ba-b1c1-be7ac6a9925f",
  assignmentId: "76e52b7b-c066-437d-b339-d4717bf4079f"
});
```

### Close Job

Once the worker has completed the wrap-up phase of the job the worker can finally close the job and attach a disposition code to it for future reference.

```js
await routerClient.closeJob({
  jobId: "ed02ac28-6a69-49ba-b1c1-be7ac6a9925f",
  dispositionCode: "Resolved"
});
```

###Router Events
The following is a list of possible router events:

| Event Name              | Description                                    |
| ----------------------- | ---------------------------------------------- |
| JobCreatedEvent         | A new job was created for routing              |
| JobClassifiedEvent      | The classification policy was applied to a job |
| JobQueuedEvent          | The job was assigned a queue                   |
| JobLabelsUpdatedEvent   | The labels of the job were changed             |
| OfferIssuedEvent        | A job was offered to a worker                  |
| OfferAcceptedEvent      | An offer to a worker was accepted              |
| OfferDeclinedEvent      | An offer to a worker was declined              |
| OfferRevokedEvent       | An offer to a worker was revoked               |
| OfferExpiredEvent       | An offer to a worker expired                   |
| JobAssignedEvent        | A job was assigned to a specific worker        |
| JobCompleteEvent        | A job was completed and enters wrap-up         |
| JobClosedEvent          | A job was closed and wrap-up is finished       |
| JobCancelledEvent       | A job was cancelled                            |
| JobExceptionEvent       | A job hit an exception                         |
| JobResetEvent           | A job was moved to a different queue           |
| WorkerRegisteredEvent   | A new worker was registered                    |
| WorkerDeregisteredEvent | A worker was set to draining                   |
| QueueCreatedEvent       | A new queue was created                        |
| QueueUpdatedEvent       | A queue was updated                            |
| QueueDeletedEvent       | A queue was deleted                            |

## Troubleshooting

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-job-router%2FREADME.png)
