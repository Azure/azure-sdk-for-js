# Azure Service Bus client library samples for JavaScript

**NOTE**: Samples for @azure/service-bus v1.1.x are still available [here](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples-v1)

These sample programs show how to use the JavaScript client libraries for Azure Service Bus in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                                                                               |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [sendMessages.js][sendmessages]                                     | uses the send() function to send messages to Service Bus Queue/Topic                                                                                                          |
| [receiveMessagesStreaming.js][receivemessagesstreaming]             | uses the receive() function to receive Service Bus messages in a stream                                                                                                       |
| [receiveMessagesLoop.js][receivemessagesloop]                       | uses the receiveMessages() function to receive Service Bus messages in a loop                                                                                                 |
| [scheduledMessages.js][scheduledmessages]                           | uses the scheduleMessage() function to schedule messages to appear on a Service Bus Queue/Subscription at a later time                                                        |
| [session.js][session]                                               | sends/receives messages to/from session enabled queues/subscriptions in Service Bus                                                                                           |
| [browseMessages.js][browsemessages]                                 | uses the peekMessages() function to browse a Service Bus                                                                                                                      |
| [usingAadAuth.js][usingaadauth]                                     | creates a ServiceBusClient that authenticates using AAD credentials                                                                                                           |
| [useProxy.js][useproxy]                                             | creates a ServiceBusClient that uses an HTTP(S) proxy server to make requests                                                                                                 |
| [advanced/movingMessagesToDLQ.js][advanced-movingmessagestodlq]     | moves a message explicitly to the dead-letter queue                                                                                                                           |
| [advanced/deferral.js][advanced-deferral]                           | uses the defer() function to defer a message for later processing                                                                                                             |
| [advanced/processMessageFromDLQ.js][advanced-processmessagefromdlq] | retrieves a message from a dead-letter queue, edits it, and sends it back to the main queue                                                                                   |
| [advanced/sessionRoundRobin.js][advanced-session-round-robin]       | uses `ServiceBusSessionReceiver`'s ability to get the next available session to round-robin through all sessions in a Queue/Subscription                                                |
| [advanced/sessionState.js][advanced-sessionstate]                   | uses a "shopping cart" example to demonstrate how SessionState information can be read and maintained in an application                                                       |
| [advanced/managementClient.js][advanced-management-client]          | demonstrates how the ServiceBusManagementClient can be used to manage the resources of a service bus namespace                                                                |
| [advanced/listingEntities.js][advanced-listing-entities]            | Async iterable iterators with pagination support for all the listing methods under ServiceBusManagementClient like `listQueues()`, `listTopics()`,`listQueuesRuntimeProperties()`, etc |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0, except for the samples that use the async for await syntax, which require Node.js >= 10.0.0.

You need [an Azure subscription][freesub] and [an Azure Service Bus namespace][azsvcbus] to run these sample programs. Samples retrieve credentials to access the Service Bus from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node sendMessages.js
```

Alternatively, run a single sample with the correct environment variables set (step 3 is not required if you do this), for example (cross-platform):

```bash
npx cross-env SERVICE_BUS_ENDPOINT="<endpoint>" SERVICE_BUS_CONNECTION_STRING="<connection string>" QUEUE_NAME="<queue name>" node dist/basic.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[interactivelogin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/interactiveLogin.js
[scheduledmessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/scheduledMessages.js
[receivemessagesstreaming]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/receiveMessagesStreaming.js
[session]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/session.js
[browsemessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/browseMessages.js
[useproxy]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/useProxy.js
[receivemessagesloop]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/receiveMessagesLoop.js
[advanced-movingmessagestodlq]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/advanced/movingMessagesToDLQ.js
[advanced-deferral]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/advanced/deferral.js
[advanced-processmessagefromdlq]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/advanced/processMessageFromDLQ.js
[advanced-session-round-robin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/advanced/sessionRoundRobin.js
[advanced-sessionstate]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/advanced/sessionState.js
[sendmessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/sendMessages.js
[serviceprincipallogin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/servicePrincipalLogin.js
[advanced-management-client]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/advanced/managementClient.js
[advanced-listing-entities]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/javascript/advanced/listingEntities.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/service-bus
[azsvcbus]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-create-namespace-portal
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/README.md
[usingaadauth]: https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples/javascript/usingAadAuth.js
