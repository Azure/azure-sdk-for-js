# Testing

To test this project, make sure to first build it properly by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building). Once the project is correctly built, you will be able to run the tests by following the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

To run the live tests, you need to have an Azure Storage account and set the below environment variables:

- `TEST_MODE`: Should have `live` assigned.
- `ACCOUNT_NAME`: The Azure Storage account name.
- `STORAGE_DATALAKE_ACCOUNT_NAME`: An Azure Storage account name that has Azure Storage File Data Lake features.
- `ACCOUNT_KEY`: The Azure Storage account key.
- `ACCOUNT_SAS`: The shared access signature.
- `STORAGE_CONNECTION_STRING`: The Azure Storage account connection string.

The live tests in this project will use the resources created from the [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/test-resources.json), which defines:

- Two general purpose, v2 [Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) account properly configured to test the Azure Storage Blob, Azure Storage Queue, Azure File Data Lake and Azure File Share services.

The Azure Storage File Data Lake client live tests will create files and directories in the storage account provided by the given `STORAGE_DATALAKE_ACCOUNT_NAME` environment variable.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fstorage%2Fstorage-file-datalake%2Ftest%2FREADME.png)
