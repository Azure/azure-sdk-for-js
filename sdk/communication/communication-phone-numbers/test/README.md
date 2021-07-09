# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#testing).

You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/communication/test-resources.json) that already has all of the the necessary configurations.

The Azure resource that is used by the tests in this project is:

- An existing Communication Services resource. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

To run the live tests, you will need to set the below environment variables:

- `TEST_MODE`: Should have `live` assigned if you want to run live without recording. Assign `record` to run live with recording.
- `COMMUNICATION_LIVETEST_STATIC_CONNECTION_STRING`: The primary connection string of the Communication Services resource in your account.

[azure_sub]: https://azure.microsoft.com/free/
[azure_portal]: https://portal.azure.com

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcommunication%2Fcommunication-phone-numbers%2FREADME.png)
