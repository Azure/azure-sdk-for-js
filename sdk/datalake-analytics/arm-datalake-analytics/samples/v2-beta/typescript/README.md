# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCheckNameAvailabilitySample.ts][accountschecknameavailabilitysample]               | Checks whether the specified account name is available or taken. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Accounts_CheckNameAvailability.json                                                                                                                                              |
| [accountsCreateSample.ts][accountscreatesample]                                             | Creates the specified Data Lake Analytics account. This supplies the user with computation services for Data Lake Analytics workloads. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Accounts_Create.json                                                                                       |
| [accountsDeleteSample.ts][accountsdeletesample]                                             | Begins the delete process for the Data Lake Analytics account object specified by the account name. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Accounts_Delete.json                                                                                                                          |
| [accountsGetSample.ts][accountsgetsample]                                                   | Gets details of the specified Data Lake Analytics account. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Accounts_Get.json                                                                                                                                                                      |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample]                   | Gets the first page of Data Lake Analytics accounts, if any, within a specific resource group. This includes a link to the next page, if any. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Accounts_ListByResourceGroup.json                                                                   |
| [accountsListSample.ts][accountslistsample]                                                 | Gets the first page of Data Lake Analytics accounts, if any, within the current subscription. This includes a link to the next page, if any. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Accounts_List.json                                                                                   |
| [accountsUpdateSample.ts][accountsupdatesample]                                             | Updates the Data Lake Analytics account object specified by the accountName with the contents of the account object. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Accounts_Update.json                                                                                                         |
| [computePoliciesCreateOrUpdateSample.ts][computepoliciescreateorupdatesample]               | Creates or updates the specified compute policy. During update, the compute policy with the specified name will be replaced with this new compute policy. An account supports, at most, 50 policies x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/ComputePolicies_CreateOrUpdate.json           |
| [computePoliciesDeleteSample.ts][computepoliciesdeletesample]                               | Deletes the specified compute policy from the specified Data Lake Analytics account x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/ComputePolicies_Delete.json                                                                                                                                   |
| [computePoliciesGetSample.ts][computepoliciesgetsample]                                     | Gets the specified Data Lake Analytics compute policy. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/ComputePolicies_Get.json                                                                                                                                                                   |
| [computePoliciesListByAccountSample.ts][computepolicieslistbyaccountsample]                 | Lists the Data Lake Analytics compute policies within the specified Data Lake Analytics account. An account supports, at most, 50 policies x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/ComputePolicies_ListByAccount.json                                                                     |
| [computePoliciesUpdateSample.ts][computepoliciesupdatesample]                               | Updates the specified compute policy. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/ComputePolicies_Update.json                                                                                                                                                                                 |
| [dataLakeStoreAccountsAddSample.ts][datalakestoreaccountsaddsample]                         | Updates the specified Data Lake Analytics account to include the additional Data Lake Store account. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/DataLakeStoreAccounts_Add.json                                                                                                               |
| [dataLakeStoreAccountsDeleteSample.ts][datalakestoreaccountsdeletesample]                   | Updates the Data Lake Analytics account specified to remove the specified Data Lake Store account. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/DataLakeStoreAccounts_Delete.json                                                                                                              |
| [dataLakeStoreAccountsGetSample.ts][datalakestoreaccountsgetsample]                         | Gets the specified Data Lake Store account details in the specified Data Lake Analytics account. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/DataLakeStoreAccounts_Get.json                                                                                                                   |
| [dataLakeStoreAccountsListByAccountSample.ts][datalakestoreaccountslistbyaccountsample]     | Gets the first page of Data Lake Store accounts linked to the specified Data Lake Analytics account. The response includes a link to the next page, if any. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/DataLakeStoreAccounts_ListByAccount.json                                              |
| [firewallRulesCreateOrUpdateSample.ts][firewallrulescreateorupdatesample]                   | Creates or updates the specified firewall rule. During update, the firewall rule with the specified name will be replaced with this new firewall rule. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/FirewallRules_CreateOrUpdate.json                                                          |
| [firewallRulesDeleteSample.ts][firewallrulesdeletesample]                                   | Deletes the specified firewall rule from the specified Data Lake Analytics account x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/FirewallRules_Delete.json                                                                                                                                      |
| [firewallRulesGetSample.ts][firewallrulesgetsample]                                         | Gets the specified Data Lake Analytics firewall rule. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/FirewallRules_Get.json                                                                                                                                                                      |
| [firewallRulesListByAccountSample.ts][firewallruleslistbyaccountsample]                     | Lists the Data Lake Analytics firewall rules within the specified Data Lake Analytics account. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/FirewallRules_ListByAccount.json                                                                                                                   |
| [firewallRulesUpdateSample.ts][firewallrulesupdatesample]                                   | Updates the specified firewall rule. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/FirewallRules_Update.json                                                                                                                                                                                    |
| [locationsGetCapabilitySample.ts][locationsgetcapabilitysample]                             | Gets subscription-level properties and limits for Data Lake Analytics specified by resource location. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Locations_GetCapability.json                                                                                                                |
| [operationsListSample.ts][operationslistsample]                                             | Lists all of the available Data Lake Analytics REST API operations. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/Operations_List.json                                                                                                                                                          |
| [storageAccountsAddSample.ts][storageaccountsaddsample]                                     | Updates the specified Data Lake Analytics account to add an Azure Storage account. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_Add.json                                                                                                                                       |
| [storageAccountsDeleteSample.ts][storageaccountsdeletesample]                               | Updates the specified Data Lake Analytics account to remove an Azure Storage account. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_Delete.json                                                                                                                                 |
| [storageAccountsGetSample.ts][storageaccountsgetsample]                                     | Gets the specified Azure Storage account linked to the given Data Lake Analytics account. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_Get.json                                                                                                                                |
| [storageAccountsGetStorageContainerSample.ts][storageaccountsgetstoragecontainersample]     | Gets the specified Azure Storage container associated with the given Data Lake Analytics and Azure Storage accounts. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_GetStorageContainer.json                                                                                     |
| [storageAccountsListByAccountSample.ts][storageaccountslistbyaccountsample]                 | Gets the first page of Azure Storage accounts, if any, linked to the specified Data Lake Analytics account. The response includes a link to the next page, if any. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_ListByAccount.json                                             |
| [storageAccountsListSasTokensSample.ts][storageaccountslistsastokenssample]                 | Gets the SAS token associated with the specified Data Lake Analytics and Azure Storage account and container combination. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_ListSasTokens.json                                                                                      |
| [storageAccountsListStorageContainersSample.ts][storageaccountsliststoragecontainerssample] | Lists the Azure Storage containers, if any, associated with the specified Data Lake Analytics and Azure Storage account combination. The response includes a link to the next page of results, if any. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_ListStorageContainers.json |
| [storageAccountsUpdateSample.ts][storageaccountsupdatesample]                               | Updates the Data Lake Analytics account to replace Azure Storage blob account details, such as the access key and/or suffix. x-ms-original-file: specification/datalake-analytics/resource-manager/Microsoft.DataLakeAnalytics/preview/2019-11-01-preview/examples/StorageAccounts_Update.json                                                                                          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/accountsCheckNameAvailabilitySample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/accountsCheckNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/accountsCheckNameAvailabilitySample.ts
[accountscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/accountsCreateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/accountsListByResourceGroupSample.ts
[accountslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/accountsListSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/accountsUpdateSample.ts
[computepoliciescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/computePoliciesCreateOrUpdateSample.ts
[computepoliciesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/computePoliciesDeleteSample.ts
[computepoliciesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/computePoliciesGetSample.ts
[computepolicieslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/computePoliciesListByAccountSample.ts
[computepoliciesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/computePoliciesUpdateSample.ts
[datalakestoreaccountsaddsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/dataLakeStoreAccountsAddSample.ts
[datalakestoreaccountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/dataLakeStoreAccountsDeleteSample.ts
[datalakestoreaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/dataLakeStoreAccountsGetSample.ts
[datalakestoreaccountslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/dataLakeStoreAccountsListByAccountSample.ts
[firewallrulescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/firewallRulesCreateOrUpdateSample.ts
[firewallrulesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/firewallRulesDeleteSample.ts
[firewallrulesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/firewallRulesGetSample.ts
[firewallruleslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/firewallRulesListByAccountSample.ts
[firewallrulesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/firewallRulesUpdateSample.ts
[locationsgetcapabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/locationsGetCapabilitySample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/operationsListSample.ts
[storageaccountsaddsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/storageAccountsAddSample.ts
[storageaccountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/storageAccountsDeleteSample.ts
[storageaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/storageAccountsGetSample.ts
[storageaccountsgetstoragecontainersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/storageAccountsGetStorageContainerSample.ts
[storageaccountslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/storageAccountsListByAccountSample.ts
[storageaccountslistsastokenssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/storageAccountsListSasTokensSample.ts
[storageaccountsliststoragecontainerssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/storageAccountsListStorageContainersSample.ts
[storageaccountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/datalake-analytics/arm-datalake-analytics/samples/v2-beta/typescript/src/storageAccountsUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-datalake-analytics?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/datalake-analytics/arm-datalake-analytics/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
