# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

The environment variables you will need to properly assign to run the live test of this project are the following:

- `EVENTHUB_NAME`: The name of your Azure Event Hub instance, not your Azure Event Hubs namespace.
- `EVENTHUB_CONNECTION_STRING`: The connection string of your Azure Event Hubs namespace.
- `IOTHUB_CONNECTION_STRING`: The connection string of your Azure IoT Hub account.
- `IOTHUB_EH_COMPATIBLE_CONNECTION_STRING`: An Azure Event Hub compatible connection string provided by your Azure IoT Hub account.

Keep in mind that this project **does not use [the recorder](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/test-utils/recorder)** yet.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-hubs%2Ftest%2FREADME.png)
