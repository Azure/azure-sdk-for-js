# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

The environment variables you will need to properly assign to run the live test of this project are the following:

- `EVENTHUB_NAME`: The name of your Azure Event Hub instance, not your Azure Event Hubs namespace.
- `EVENTHUB_CONNECTION_STRING`: The connection string of your Azure Event Hubs namespace.
- `IOTHUB_CONNECTION_STRING`: The connection string of your Azure IoT Hub account.
- `IOTHUB_EH_COMPATIBLE_CONNECTION_STRING`: An Azure Event Hub compatible connection string provided by your Azure IoT Hub account.

This project uses an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/test-resources.json) that will create:

- An [Azure Event Hubs namespace](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features#namespace).
- Some very basic Network configurations for the Event Hubs namespace.
- A [consumer group](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features#consumer-groups) to publish and subscribe to the Event Hubs namespace created.
- An [Azure Storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) configured to provide [blob storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources).
- An [Azure IoT Hub account](https://docs.microsoft.com/en-us/azure/iot-hub/about-iot-hub).

The tests in this project will create:

- 

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-hubs%2Ftest%2FREADME.png)
