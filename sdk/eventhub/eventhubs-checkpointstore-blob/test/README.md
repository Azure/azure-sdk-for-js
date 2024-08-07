# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md#testing).

## Azure resources 

The Azure Event Hub Checkpoint Store Blob client does not have any recorded tests and so, all the tests require a storage account to be set up beforehand.  You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/main/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/test-resources.json) that already has all of the the necessary configurations.

The Azure resource that is used by the tests in this project is:

- An [Azure Storage account](https://docs.microsoft.com/azure/storage/common/storage-account-overview) configured to provide [blob storage](https://docs.microsoft.com/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources).
- An Entra ID application for the tests to use. See the [Entra ID authentication](#entra-id-authentication) for steps to register the application.

To run the live tests, you will also need to set the below environment variables:

- `STORAGE_ENDPOINT`: The endpoint to the Azure storage account.

The live tests in this project will create and delete containers in the storage account.

## Entra Id authentication

### Assign owner role to the registered application

- In the Azure portal, go to your Azure Storage account and assign **Storage Blob Data Contributor** role to your user or managed identity.
- This can be done from `Role assignment` section of `Access control (IAM)` tab (in the left-side-navbar of your Storage account in the azure-portal)
- For more information on Azure Storage RBAC setup: [Learn more](https://learn.microsoft.com/azure/storage/blobs/assign-azure-role-data-access)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%eventhub%2Feventhubs-checkpointstore-blob%2Ftest%2FREADME.png)
