# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

To run the live tests, follow the [Integration Testing with live services](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#integration-testing-with-live-services) instructions to automatically set up the required resources with the proper configuration.

The live tests in this project will use the resources created from the [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/appconfiguration/test-resources.json), which defines:

- An [Azure App Configuration](https://docs.microsoft.com/en-us/azure/azure-app-configuration/overview) account with minimum configurations.

Set the below environment variables to run the live tests:

- `TEST_MODE`: Should have `live` assigned.
- `AZ_CONFIG_CONNECTION`: The connection string of your Azure App Configuration account.
- `AZ_CONFIG_ENDPOINT`: The endpoint of your Azure App Configuration account.

The Azure App Configuration client live tests will add, modify and delete configurations on the Azure App Configuration account provided by the given `AZ_CONFIG_ENDPOINT` environment variable.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fappconfiguration%2Fapp-configuration%2Ftest%2FREADME.png)
