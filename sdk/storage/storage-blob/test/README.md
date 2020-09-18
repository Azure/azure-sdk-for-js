# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/master/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/storage/test-resources.json) that already has all of the the necessary configurations.

The Azure resource that is used by the tests in this project is:

- Two general purpose, v2 [Azure Storage](https://docs.microsoft.com/azure/storage/common/storage-account-overview) account properly configured to test the Azure Storage Blob, Azure Storage Queue, Azure File Data Lake and Azure File Share services.

To run the live tests, you will also need to set the below environment variables:

- `TEST_MODE`: Should have `live` assigned.
- `ACCOUNT_NAME`: The Azure Storage account name.
- `STORAGE_DATALAKE_ACCOUNT_NAME`: An Azure Storage account name that has Azure Storage File Data Lake features.
- `ACCOUNT_KEY`: The Azure Storage account key.
- `ACCOUNT_SAS`: The shared access signature.
- `STORAGE_CONNECTION_STRING`: The Azure Storage account connection string.

The live tests in this project will create containers and blobs in the provided Azure Storage account.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-blob%2Ftest%2FREADME.png)
