# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

The Azure Cognitive Search client does not have any recorded tests and so, all the tests require an Azure Cognitive Search account to be set up beforehand. Follow the [Integration Testing with live services](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#integration-testing-with-live-services) instructions to automatically set up the required resources with the proper configuration.

The live tests in this project will use the resources created from the [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/search/test-resources.json), which defines:

- An [Azure Cognitive Search](https://docs.microsoft.com/en-us/azure/search/search-what-is-azure-search) account, configured with the default parameters.

Set the below environment variables to run the live tests:

- `TEST_MODE`: Should have `live` assigned.
- `SEARCH_API_ADMIN_KEY`: The primary key of your Azure Search account.
- `SEARCH_API_ADMIN_KEY_ALT` (optional): The secondary key of your Azure Search account.
- `ENDPOINT`: The endpoint of your Azure Search account.

The Azure Cognitive Search client live tests will create, populate and search over search indexes inside of the Azure Cognitive Search account provided by the given environment variables.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fsearch%2Fsearch-documents%2Ftest%2FREADME.png)
