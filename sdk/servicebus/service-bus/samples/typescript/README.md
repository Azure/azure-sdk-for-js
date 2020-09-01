# Azure Service Bus client library samples for TypeScript

**NOTE**: Samples for @azure/service-bus v1.1.x are still available [here](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples-v1)

These sample programs show how to use the TypeScript client libraries for Azure Service Bus in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                                                                                        |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [sendMessages.ts][sendmessages]                                     | uses the send() function to send messages to Service Bus Queue/Topic                                                                                                                   |
| [receiveMessagesStreaming.ts][receivemessagesstreaming]             | uses the receive() function to receive Service Bus messages in a stream                                                                                                                |
| [receiveMessagesLoop.ts][receivemessagesloop]                       | uses the receiveMessages() function to receive Service Bus messages in a loop                                                                                                          |
| [scheduledMessages.ts][scheduledmessages]                           | uses the scheduleMessage() function to schedule messages to appear on a Service Bus Queue/Subscription at a later time                                                                 |
| [session.ts][session]                                               | sends/receives messages to/from session enabled queues/subscriptions in Service Bus                                                                                                    |
| [browseMessages.ts][browsemessages]                                 | uses the peekMessages() function to browse a Service Bus                                                                                                                               |
| [usingAadAuth.ts][usingaadauth]                                     | creates a ServiceBusClient that authenticates using AAD credentials                                                                                                                    |
| [useProxy.ts][useproxy]                                             | creates a ServiceBusClient that uses an HTTP(S) proxy server to make requests                                                                                                          |
| [advanced/movingMessagesToDLQ.ts][advanced-movingmessagestodlq]     | moves a message explicitly to the dead-letter queue                                                                                                                                    |
| [advanced/deferral.ts][advanced-deferral]                           | uses the defer() function to defer a message for later processing                                                                                                                      |
| [advanced/processMessageFromDLQ.ts][advanced-processmessagefromdlq] | retrieves a message from a dead-letter queue, edits it, and sends it back to the main queue                                                                                            |
| [advanced/sessionRoundRobin.ts][advanced-session-round-robin]       | uses `ServiceBusSessionReceiver`'s ability to get the next available session to round-robin through all sessions in a Queue/Subscription                                                         |
| [advanced/sessionState.ts][advanced-sessionstate]                   | uses a "shopping cart" example to demonstrate how SessionState information can be read and maintained in an application                                                                |
| [advanced/managementClient.ts][advanced-management-client]          | demonstrates how the ServiceBusManagementClient can be used to manage the resources of a service bus namespace                                                                         |
| [advanced/listingEntities.ts][advanced-listing-entities]            | Async iterable iterators with pagination support for all the listing methods under ServiceBusManagementClient like `listQueues()`, `listTopics()`,`listQueuesRuntimeProperties()`, etc |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0, except for the samples that use the async for await syntax, which require Node.js >= 10.0.0.

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and [an Azure Service Bus namespace][azsvcbus] to run these sample programs. Samples retrieve credentials to access the Service Bus from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require additional consideration. For details, please see the [package README][package].

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

[interactivelogin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/interactiveLogin.ts
[scheduledmessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/scheduledMessages.ts
[receivemessagesstreaming]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/receiveMessagesStreaming.ts
[session]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/session.ts
[browsemessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/browseMessages.ts
[usingaadauth]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/usingAadAuth.ts
[useproxy]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/useProxy.ts
[receivemessagesloop]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/receiveMessagesLoop.ts
[advanced-movingmessagestodlq]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/advanced/movingMessagesToDLQ.ts
[advanced-deferral]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/advanced/deferral.ts
[advanced-processmessagefromdlq]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/advanced/processMessageFromDLQ.ts
[advanced-sessionstate]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/advanced/sessionState.ts
[advanced-session-round-robin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/advanced/sessionRoundRobin.ts
[sendmessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/sendMessages.ts
[serviceprincipallogin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/servicePrincipalLogin.ts
[advanced-management-client]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/advanced/managementClient.ts
[advanced-listing-entities]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/advanced/listingEntities.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/service-bus
[azsvcbus]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-create-namespace-portal
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
