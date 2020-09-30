---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-service-bus
urlFragment: service-bus-javascript
---

# Azure Service Bus client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for Azure Service Bus in some common scenarios.

| **File Name**                                                       | **Description**                                                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [sendMessages.js][sendmessages]                                     | uses the send() function to send messages to Service Bus Queue/Topic                                                    |
| [receiveMessagesStreaming.js][receivemessagesstreaming]             | uses the receive() function to receive Service Bus messages in a stream                                                 |
| [receiveMessagesLoop.js][receivemessagesloop]                       | uses the receiveMessages() function to receive Service Bus messages in a loop                                           |
| [scheduledMessages.js][scheduledmessages]                           | uses the scheduleMessage() function to schedule messages to appear on a Service Bus Queue/Subscription at a later time  |
| [session.js][session]                                               | sends/receives messages to/from session enabled queues/subscriptions in Service Bus                                     |
| [browseMessages.js][browsemessages]                                 | uses the peek() function to browse a Service Bus                                                                        |
| [serviceprincipallogin.js][serviceprincipallogin]                   | creates a namespace using aad token credentials obtained from using service principal secrets                           |
| [interactivelogin.js][interactivelogin]                             | creates a namespace using aad token credentials obtained from interactive login                                         |
| [useProxy.js][useproxy]                                             | creates a ServiceBusClient that uses an HTTP(S) proxy server to make requests                                           |
| [advanced/movingMessagesToDLQ.js][advanced-movingmessagestodlq]     | moves a message explicitly to the dead-letter queue                                                                     |
| [advanced/deferral.js][advanced-deferral]                           | uses the defer() function to defer a message for later processing                                                       |
| [advanced/processMessageFromDLQ.js][advanced-processmessagefromdlq] | retrieves a message from a dead-letter queue, edits it, and sends it back to the main queue                             |
| [advanced/sessionRoundRobin.js][advanced-sessionroundrobin]       | uses `SessionReceiver`'s ability to get the next available session to round-robin through all sessions in a Queue/Subscription |
| [advanced/sessionState.js][advanced-sessionstate]                   | uses a "shopping cart" example to demonstrate how SessionState information can be read and maintained in an application |
| [advanced/topicFilters.js][advanced-topicfilters]                   | use topic subscriptions and filters for splitting up a message stream into multiple streams based on message properties |

## Prerequisites

The samples are compatible with Node.js >= 8.0.0.

You need [an Azure subscription][freesub] and [an Azure Service Bus namespace][azsvcbus] to run these sample programs. Samples retrieve credentials to access the Service Bus from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require additional consideration. For details, please see the [package README][package-latest].

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

[interactivelogin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/interactiveLogin.js
[scheduledmessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/scheduledMessages.js
[receivemessagesstreaming]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/receiveMessagesStreaming.js
[session]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/session.js
[browsemessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/browseMessages.js
[useproxy]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/useProxy.js
[receivemessagesloop]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/receiveMessagesLoop.js
[advanced-movingmessagestodlq]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/advanced/movingMessagesToDLQ.js
[advanced-deferral]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/advanced/deferral.js
[advanced-processmessagefromdlq]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/advanced/processMessageFromDLQ.js
[advanced-sessionroundrobin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/advanced/sessionRoundRobin.js
[advanced-sessionstate]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/advanced/sessionState.js
[advanced-topicfilters]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/advanced/topicFilters.js
[sendmessages]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/sendMessages.js
[serviceprincipallogin]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples-v1/javascript/servicePrincipalLogin.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/service-bus
[azsvcbus]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-create-namespace-portal
[freesub]: https://azure.microsoft.com/free/
[package-next]: https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/README.md
[package-latest]: https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.9/sdk/servicebus/service-bus/README.md
