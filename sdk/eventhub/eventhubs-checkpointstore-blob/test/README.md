# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

The Azure Event Hubs Checkpoint Store client does not have any recorded tests and so, all the tests require an Azure Event Hubs namespace to be set up beforehand with at lease a single Event Hub instance in it. Follow the [Integration Testing with live services](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#integration-testing-with-live-services) instructions to automatically set up the required resources with the proper configuration.

The live tests in this project will use the resources created from the [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/test-resources.json), which defines:

- An [Azure Event Hubs namespace](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features#namespace).
- Some very basic Network configurations for the Event Hubs namespace.
- A [consumer group](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features#consumer-groups) to publish and subscribe to the Event Hubs namespace created.
- An [Azure Storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) configured to provide [blob storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources).
- An [Azure IoT Hub account](https://docs.microsoft.com/en-us/azure/iot-hub/about-iot-hub).

Set the below environment variables to run the live tests:

- `TEST_MODE`: Should have `live` assigned.
- `EVENTHUB_NAME`: The name of your Azure Event Hub account.
- `EVENTHUB_CONNECTION_STRING`: The connection string of your Azure Event Hub account.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-processor-host%2Ftest%2FREADME.png)
