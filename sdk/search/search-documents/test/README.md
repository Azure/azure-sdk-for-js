# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

The Azure Cognitive Search client does not have any recorded tests and so, all the tests require an Azure Cognitive Search account to be set up beforehand. You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/master/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/search/test-resources.json) that already has all of the the necessary configurations.

The Azure resource that is used by the tests in this project is:

- An [Azure Cognitive Search](https://docs.microsoft.com/azure/search/search-what-is-azure-search) account.

To run the live tests, you will also need to set the below environment variables:

- `TEST_MODE`: Should have `live` assigned.
- `SEARCH_API_ADMIN_KEY`: The primary key of your Azure Search account.
- `SEARCH_API_ADMIN_KEY_ALT` (optional): The secondary key of your Azure Search account.
- `ENDPOINT`: The endpoint of your Azure Search account.

The live tests in this project will create, populate and search over search indexes inside of the provided Azure Cognitive Search account.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fsearch%2Fsearch-documents%2Ftest%2FREADME.png)
