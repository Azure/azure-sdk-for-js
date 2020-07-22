# Testing

To test this project, make sure to build it by following our [building instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#building), then follow the [testing instructions](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md#testing).

## Azure resources 

The Azure Event Hubs client does not have any recorded tests and so, all the tests require an Azure Event Hubs namespace to be set up beforehand with at least a single Event Hub instance in it. You can use existing Azure resources for the live tests, or generate new ones by using our [New-TestResources.ps1](https://github.com/Azure/azure-sdk-for-js/blob/master/eng/common/TestResources/New-TestResources.ps1) script, which will use an [ARM template](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/test-resources.json) that already has all of the the necessary configurations.

The Azure resources that are used by the tests in this project are:

- An [Azure Event Hubs namespace](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features#namespace) with atleast one Event Hub instance in it.
- An [Azure Storage account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview) configured to provide [blob storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction#blob-storage-resources).
- An Azure Active Directory application for the tests to use. See the [AAD based authentication](#AAD-based-authentication) for steps to register the application.

To run the live tests, you will also need to set the below environment variables:

- `EVENTHUB_NAME`: The name of your Azure Event Hub namespace.
- `EVENTHUB_CONNECTION_STRING`: The connection string of your Azure Event Hub namespace.
- `AZURE_CLIENT_ID`: The client ID of an Azure Active Directory application.
- `AZURE_CLIENT_SECRET`: The client secret of an Azure Active Directory application.
- `AZURE_TENANT_ID`: The Tenant ID of your organization in Azure Active Directory.

## AAD based authentication

The following steps will help you setup the AAD credentials.

### Register a new application in AAD

- Follow [Documentation to register a new application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app) in the Azure Active Directory (in the Azure portal).
- Note down the `CLIENT_ID` and `TENANT_ID`.
- In the "Certificates & Secrets" tab, create a secret and note that down.

### Assign owner role to the registered application

- In the Azure portal, go to your Azure Event Hubs namespace and assign the **Azure Event Hubs Data Owner** role to the registered application.
- This can be done from `Role assignment` section of `Access control (IAM)` tab (in the left-side-navbar of your Azure Event Hubs namespace in the Azure portal)  
  _Doing this would allow the registered application manage the resource, i.e., entity creation, deletion, etc._
- For more information on securing your Azure Event Hubs namespace: [Learn more](https://docs.microsoft.com/en-us/azure/event-hubs/authorize-access-event-hubs)

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-hubs%2Ftest%2FREADME.png)
