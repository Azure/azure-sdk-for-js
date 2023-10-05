# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                      |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateOrUpdateSample.js][accountscreateorupdatesample]           | Create a Account x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_CreateOrUpdate.json                              |
| [accountsDeleteSample.js][accountsdeletesample]                           | Delete a Account x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_Delete.json                                      |
| [accountsGetSample.js][accountsgetsample]                                 | Get a Account x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_Get.json                                            |
| [accountsListByResourceGroupSample.js][accountslistbyresourcegroupsample] | List Account resources by resource group x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_ListByResourceGroup.json |
| [accountsListBySubscriptionSample.js][accountslistbysubscriptionsample]   | List Account resources by subscription ID x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_ListBySubscription.json |
| [accountsUpdateSample.js][accountsupdatesample]                           | Update a Account x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_Update.json                                      |
| [operationsListSample.js][operationslistsample]                           | List the operations for the provider x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Operations_List.json                  |
| [quotasGetSample.js][quotasgetsample]                                     | Get quota by name. x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Quotas_Get.json                                         |
| [quotasListBySubscriptionSample.js][quotaslistbysubscriptionsample]       | List quotas for a given subscription Id. x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Quotas_ListBySubscription.json    |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node accountsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env PLAYWRIGHTTESTING_SUBSCRIPTION_ID="<playwrighttesting subscription id>" PLAYWRIGHTTESTING_RESOURCE_GROUP="<playwrighttesting resource group>" node accountsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/javascript/accountsCreateOrUpdateSample.js
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/javascript/accountsDeleteSample.js
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/javascript/accountsGetSample.js
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/javascript/accountsListByResourceGroupSample.js
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/javascript/accountsListBySubscriptionSample.js
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/javascript/accountsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/javascript/operationsListSample.js
[quotasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/javascript/quotasGetSample.js
[quotaslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/javascript/quotasListBySubscriptionSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-playwrighttesting?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/playwrighttesting/arm-playwrighttesting/README.md
