# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

To run the live tests, follow the [Integration Testing with live services](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#integration-testing-with-live-services) instructions to automatically set up the required resources with the proper configuration.

The live tests in this project will use the resources created from the [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/textanalytics/test-resources.json), which defines:

- An [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) account of the Text Analytics type, with minimum configurations.

Set the below environment variables to run the live tests:

- `TEST_MODE`: Should have `live` assigned.
- `TEXT_ANALYTICS_API_KEY`: The primary API key of the Text Analytics API in your Azure Cognitive Services account.
- `TEXT_ANALYTICS_API_KEY_ALT` (optional): The secondary API key of the Text Analytics API in your Azure Cognitive Services account.
- `ENDPOINT`: The endpoint of your Text Analytics API in your Azure Cognitive Services account.

The Azure Text Analytics client live tests will create collections the Azure Cognitive Services account, through the Text Analytics API located at the endpoint provided by the given `ENDPOINT` environment variable.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftextanalytics%2Fai-text-analytics%2Ftest%2FREADME.png)
