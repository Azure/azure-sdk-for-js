# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#testing).

The Azure AI Search client does not have any recorded tests and so, all the tests require an Azure AI Search account to be set up beforehand. You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/common/TestResources/New-TestResources.ps1) script, which will use a [Bicep template](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/search/test-resources.bicep) that already has all of the the necessary configurations.

The Azure resource that is used by the tests in this project is:

- An [Azure AI Search](https://learn.microsoft.com/azure/search/search-what-is-azure-search) account.

To run the live tests, you will also need to set the below environment variables:

- `TEST_MODE`: Should have `live` assigned.
- `ENDPOINT`: The endpoint of your Azure Search account.

The live tests in this project will create, populate and search over search indexes inside of the provided Azure AI Search account.
