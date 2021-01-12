# Azure Event Hubs client libraries for JavaScript

[Azure Event Hubs](https://azure.microsoft.com/services/event-hubs/) is a highly scalable publish-subscribe service that can ingest millions of events per second and stream them to multiple consumers. This lets you process and analyze the massive amounts of data produced by your connected devices and applications.

## Libraries for resource management

To manage your Azure Event Hubs resources via the Azure Resource Manager, you would use the below package.

| NPM Package                                                          | Reference                                                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [@azure/arm-eventhub](https://npmjs.com/package/@azure/arm-eventhub) | [API Reference for @azure/arm-eventhub](https://docs.microsoft.com/javascript/api/@azure/arm-eventhub) |

## Libraries for data access

To send and receive events from an Azure Event Hub instance, you would use the below packages.

| NPM Package                                                                                                  | Reference                                                                                                                                   | Samples                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@azure/event-hubs](https://npmjs.com/package/@azure/event-hubs)                                             | [API Reference for @azure/event-hubs](https://docs.microsoft.com/javascript/api/@azure/event-hubs)                                          | [Samples for sending & receiving events](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples)                                       |
| [@azure/eventhubs-checkpointstore-blob](https://www.npmjs.com/package/@azure/eventhubs-checkpointstore-blob) | [API Reference for @azure/eventhubs-checkpointstore-blob](https://docs.microsoft.com/javascript/api/@azure/eventhubs-checkpointstore-blob/) | [Samples for using checkpoint store when receiving events](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples) |

There is an older package `@azure/event-processor-host` meant for receiving events from multiple partitions such that the partition load is balanced across multiple instances of your application. This is done by making use Azure Storage Blob to store checkpoints. This package is deprecated and has been replaced by the packages listed in the above table. Follow the [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/migrationguide.md#migrating-from-eventprocessorhost-to-eventhubconsumerclient-for-receiving-events) to move your application off of this package.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2FREADME.png)
