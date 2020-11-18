# Azure Event Hubs client libraries for JavaScript

[Azure Event Hubs](https://azure.microsoft.com/services/service-bus/) is a highly scalable publish-subscribe service that can ingest millions of events per second and stream them to multiple consumers. This lets you process and analyze the massive amounts of data produced by your connected devices and applications.

## Libraries for resource management

To manage your Azure Event Hubs resources via the Azure Resource Manager, you would use the below library.

| NPM Package | Reference |
|--------------------------------------|---------------------------------------------------------------|
|    [@azure/arm-eventhub](http://npmjs.com/package/@azure/arm-eventhub)    |    [API Reference](https://docs.microsoft.com/en-us/javascript/api/@azure/arm-eventhub)    |

## Libraries for data access

To send and receive events from an Azure Event Hub instance, you would use the below packages.

| NPM Package | Reference | Samples |
|--------------------------------------|---------------------------------------------------------------|---------------------------------------------------------------|
|    [@azure/event-hubs](http://npmjs.com/package/@azure/event-hubs)    |    [API Reference](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs)    | [Samples for sending & receiving events](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples)
|    [@azure/eventhubs-checkpointstore-blob](https://www.npmjs.com/package/@azure/eventhubs-checkpointstore-blob)    |    [API Reference](https://docs.microsoft.com/en-us/javascript/api/@azure/eventhubs-checkpointstore-blob/)    | [Samples for using checkpoint store when receiving events](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples)


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2FREADME.png)
