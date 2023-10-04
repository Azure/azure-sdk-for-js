# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                      |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateOrUpdateSample.ts][accountscreateorupdatesample]           | Create a Account x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_CreateOrUpdate.json                              |
| [accountsDeleteSample.ts][accountsdeletesample]                           | Delete a Account x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_Delete.json                                      |
| [accountsGetSample.ts][accountsgetsample]                                 | Get a Account x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_Get.json                                            |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample] | List Account resources by resource group x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_ListByResourceGroup.json |
| [accountsListBySubscriptionSample.ts][accountslistbysubscriptionsample]   | List Account resources by subscription ID x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_ListBySubscription.json |
| [accountsUpdateSample.ts][accountsupdatesample]                           | Update a Account x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Accounts_Update.json                                      |
| [operationsListSample.ts][operationslistsample]                           | List the operations for the provider x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Operations_List.json                  |
| [quotasGetSample.ts][quotasgetsample]                                     | Get quota by name. x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Quotas_Get.json                                         |
| [quotasListBySubscriptionSample.ts][quotaslistbysubscriptionsample]       | List quotas for a given subscription Id. x-ms-original-file: specification/playwrighttesting/resource-manager/Microsoft.AzurePlaywrightService/preview/2023-10-01-preview/examples/Quotas_ListBySubscription.json    |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/accountsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env PLAYWRIGHTTESTING_SUBSCRIPTION_ID="<playwrighttesting subscription id>" PLAYWRIGHTTESTING_RESOURCE_GROUP="<playwrighttesting resource group>" node dist/accountsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/typescript/src/accountsCreateOrUpdateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/typescript/src/accountsListByResourceGroupSample.ts
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/typescript/src/accountsListBySubscriptionSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/typescript/src/accountsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/typescript/src/operationsListSample.ts
[quotasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/typescript/src/quotasGetSample.ts
[quotaslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/playwrighttesting/arm-playwrighttesting/samples/v1-beta/typescript/src/quotasListBySubscriptionSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-playwrighttesting?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/playwrighttesting/arm-playwrighttesting/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
