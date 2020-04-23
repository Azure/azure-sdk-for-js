# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

The Azure Event Hubs Checkpoint Store client does not have any recorded tests and so, all the tests require an Azure Event Hubs namespace to be set up beforehand with at lease a single Event Hub instance in it. You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/master/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/test-resources.json) that already has all of the the necessary configurations.

The Azure resources that are used by the tests in this project are:

- An [Azure Event Hubs namespace](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features#namespace).
- Some very basic Network configurations for the Event Hubs namespace.
- A [consumer group](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features#consumer-groups) to publish and subscribe to the Event Hubs namespace created.
- An [Azure Storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) configured to provide [blob storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources).
- An [Azure IoT Hub account](https://docs.microsoft.com/en-us/azure/iot-hub/about-iot-hub).

To run the live tests, you will also need to set the below environment variables:

- `TEST_MODE`: Should have `live` assigned.
- `EVENTHUB_NAME`: The name of your Azure Event Hub namespace.
- `EVENTHUB_CONNECTION_STRING`: The connection string of your Azure Event Hub namespace.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-processor-host%2Ftest%2FREADME.png)
