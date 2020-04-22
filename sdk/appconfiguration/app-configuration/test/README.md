# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/master/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/test-resources.json) that already has all of the the necessary configurations.

The Azure resources that are used by the tests in this project are:

- An [Azure App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/overview) account with minimum configurations.

You will also need to set the below environment variables to run the live tests:

- `TEST_MODE`: Should have `live` assigned.
- `AZ_CONFIG_CONNECTION`: The connection string of your Azure App Configuration account.
- `AZ_CONFIG_ENDPOINT`: The endpoint of your Azure App Configuration account.

The live tests in this project will add, modify and delete configurations on the provided Azure App Configuration account.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fappconfiguration%2Fapp-configuration%2Ftest%2FREADME.png)
