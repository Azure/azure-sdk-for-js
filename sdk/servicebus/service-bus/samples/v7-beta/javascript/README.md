---
page_type: sample
languages:
  - javascript
products:
  - azure
  - azure-service-bus
urlFragment: service-bus-javascript-beta
---

# Azure Service Bus client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for Azure Service Bus in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [sendMessages.js][sendmessages]                                                           | Demonstrates how to send messages to Service Bus Queue/Topic                                                                                                   |
| [topicSubscriptionWithRuleOperationsSample.js][topicsubscriptionwithruleoperationssample] | Demonstrates how to filter messages in Service Bus                                                                                                             |
| [receiveMessagesLoop.js][receivemessagesloop]                                             | Demonstrates how to receive Service Bus messages in a loop                                                                                                     |
| [receiveMessagesStreaming.js][receivemessagesstreaming]                                   | Demonstrates how to receive Service Bus messages in a stream                                                                                                   |
| [usingAadAuth.js][usingaadauth]                                                           | This sample how to create a namespace using AAD token credentials                                                                                              |
| [browseMessages.js][browsemessages]                                                       | Demonstrates how to browse a Service Bus message                                                                                                               |
| [session.js][session]                                                                     | Demonstrates how to send/receive messages to/from session enabled queues/subscriptions in Service Bus                                                          |
| [scheduledMessages.js][scheduledmessages]                                                 | Demonstrates how to schedule messages to appear on a Service Bus Queue/Subscription at a later time                                                            |
| [useProxy.js][useproxy]                                                                   | This sample demonstrates how to create a ServiceBusClient meant to be used in an environment where outgoing network requests have to go through a proxy server |
| [advanced/administrationClient.js][advanced_administrationclient]                         | Demonstrates how to manage the resources of a service bus namespace.                                                                                           |
| [advanced/ruleManager.js][advanced_rulemanager]                                           | Demonstrates how to manage subscription-level rules using RuleManager.                                                                                         |
| [advanced/sessionRoundRobin.js][advanced_sessionroundrobin]                               | Demonstrates how to continually read through all the available sessions                                                                                        |
| [advanced/deferral.js][advanced_deferral]                                                 | Demonstrates how to defer a message for later processing.                                                                                                      |
| [advanced/listingEntities.js][advanced_listingentities]                                   | Demonstrates how the ServiceBusAdministrationClient can be used to list the entities of a service bus namespace                                                |
| [advanced/sessionState.js][advanced_sessionstate]                                         | Demonstrates usage of SessionState.                                                                                                                            |
| [advanced/movingMessagesToDLQ.js][advanced_movingmessagestodlq]                           | Demonstrates scenarios as to how a Service Bus message can be explicitly moved to the DLQ                                                                      |
| [advanced/processMessageFromDLQ.js][advanced_processmessagefromdlq]                       | Demonstrates retrieving a message from a dead letter queue, editing it and sending it back to the main queue                                                   |
| [exceedMaxDeliveryCount.js][exceedmaxdeliverycount]                                       | Demonstrates exceeding the max delivery count, then processing the messages sent to the dead letter queue                                                      |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Service Bus][createinstance_azureservicebus]

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
node sendMessages.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env SERVICEBUS_CONNECTION_STRING="<servicebus connection string>" QUEUE_NAME="<queue name>" node sendMessages.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[sendmessages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/sendMessages.js
[topicsubscriptionwithruleoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/topicSubscriptionWithRuleOperationsSample.js
[receivemessagesloop]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/receiveMessagesLoop.js
[receivemessagesstreaming]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/receiveMessagesStreaming.js
[usingaadauth]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/usingAadAuth.js
[browsemessages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/browseMessages.js
[session]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/session.js
[scheduledmessages]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/scheduledMessages.js
[useproxy]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/useProxy.js
[advanced_administrationclient]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/advanced/administrationClient.js
[advanced_rulemanager]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/advanced/ruleManager.js
[advanced_sessionroundrobin]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/advanced/sessionRoundRobin.js
[advanced_deferral]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/advanced/deferral.js
[advanced_listingentities]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/advanced/listingEntities.js
[advanced_sessionstate]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/advanced/sessionState.js
[advanced_movingmessagestodlq]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/advanced/movingMessagesToDLQ.js
[advanced_processmessagefromdlq]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/advanced/processMessageFromDLQ.js
[exceedmaxdeliverycount]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7-beta/javascript/exceedMaxDeliveryCount.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/service-bus
[freesub]: https://azure.microsoft.com/free/
[createinstance_azureservicebus]: https://docs.microsoft.com/azure/service-bus-messaging
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicebus/service-bus/README.md
