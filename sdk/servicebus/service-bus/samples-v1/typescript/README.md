---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-service-bus
urlFragment: service-bus-typescript
---

# Azure Service Bus client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Service Bus in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [sendMessages.ts][sendmessages]                                     | uses the send() function to send messages to Service Bus Queue/Topic                                                    |
| [receiveMessagesStreaming.ts][receivemessagesstreaming]             | uses the receive() function to receive Service Bus messages in a stream                                                 |
| [receiveMessagesLoop.ts][receivemessagesloop]                       | uses the receiveMessages() function to receive Service Bus messages in a loop                                           |
| [scheduledMessages.ts][scheduledmessages]                           | uses the scheduleMessage() function to schedule messages to appear on a Service Bus Queue/Subscription at a later time  |
| [session.ts][session]                                               | sends/receives messages to/from session enabled queues/subscriptions in Service Bus                                     |
| [browseMessages.ts][browsemessages]                                 | uses the peek() function to browse a Service Bus                                                                        |
| [serviceprincipallogin.ts][serviceprincipallogin]                   | creates a namespace using aad token credentials obtained from using service principal secrets                           |
| [interactivelogin.ts][interactivelogin]                             | creates a namespace using aad token credentials obtained from interactive login                                         |
| [useProxy.ts][useproxy]                                             | creates a ServiceBusClient that uses an HTTP(S) proxy server to make requests                                           |
| [advanced/movingMessagesToDLQ.ts][advanced-movingmessagestodlq]     | moves a message explicitly to the dead-letter queue                                                                     |
| [advanced/deferral.ts][advanced-deferral]                           | uses the defer() function to defer a message for later processing                                                       |
| [advanced/processMessageFromDLQ.ts][advanced-processmessagefromdlq] | retrieves a message from a dead-letter queue, edits it, and sends it back to the main queue                                  |
| [advanced/sessionRoundRobin.ts][advanced-sessionroundrobin]       | uses `SessionReceiver`'s ability to get the next available session to round-robin through all sessions in a Queue/Subscription |
| [advanced/sessionState.ts][advanced-sessionstate]                   | uses a "shopping cart" example to demonstrate how SessionState information can be read and maintained in an application |
| [advanced/topicFilters.ts][advanced-topicfilters]                   | use topic subscriptions and filters for splitting up a message stream into multiple streams based on message properties |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Service Bus namespace][azsvcbus] to run these sample programs. Samples retrieve credentials to access the Service Bus from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require additional consideration. For details, please see the [package README][package-latest].

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
node dist/sendMessages.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env SERVICE_BUS_ENDPOINT="<endpoint>" SERVICE_BUS_CONNECTION_STRING="<connection string>" QUEUE_NAME="<queue name>" node dist/basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[interactivelogin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/interactiveLogin.ts
[scheduledmessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/scheduledMessages.ts
[receivemessagesstreaming]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/receiveMessagesStreaming.ts
[session]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/session.ts
[browsemessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/browseMessages.ts
[useproxy]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/useProxy.ts
[receivemessagesloop]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/receiveMessagesLoop.ts
[advanced-movingmessagestodlq]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/advanced/movingMessagesToDLQ.ts
[advanced-deferral]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/advanced/deferral.ts
[advanced-processmessagefromdlq]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/advanced/processMessageFromDLQ.ts
[advanced-sessionroundrobin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/advanced/sessionRoundRobin.ts
[advanced-sessionstate]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/advanced/sessionState.ts
[advanced-topicfilters]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/advanced/topicFilters.ts
[sendmessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/sendMessages.ts
[serviceprincipallogin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/typescript/src/servicePrincipalLogin.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/service-bus
[azsvcbus]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-create-namespace-portal
[freesub]: https://azure.microsoft.com/free/
[package-next]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/README.md
[package-latest]: https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.9/sdk/servicebus/service-bus/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
