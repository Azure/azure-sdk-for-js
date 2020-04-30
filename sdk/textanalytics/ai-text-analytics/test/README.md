# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/master/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/textanalytics/test-resources.json) that already has all of the the necessary configurations.

The Azure resource that is used by the tests in this project is:

- An [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) account of the Text Analytics type.

To run the live tests, you will also need to set the below environment variables:

- `TEST_MODE`: Should have `live` assigned.
- `TEXT_ANALYTICS_API_KEY`: The primary API key of the Text Analytics API in your Azure Cognitive Services account.
- `TEXT_ANALYTICS_API_KEY_ALT` (optional): The secondary API key of the Text Analytics API in your Azure Cognitive Services account.
- `ENDPOINT`: The endpoint of your Text Analytics API in your Azure Cognitive Services account.

The live tests in this project will create collections in the provided Azure Cognitive Services account.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Ftextanalytics%2Fai-text-analytics%2Ftest%2FREADME.png)
