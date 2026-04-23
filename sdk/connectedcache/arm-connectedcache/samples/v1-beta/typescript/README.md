# @azure/arm-connectedcache client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-connectedcache in some common scenarios.

| **File Name**                                                                                                                                               | **Description**                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [enterpriseMccCacheNodesOperationsCreateOrUpdateSample.ts][enterprisemcccachenodesoperationscreateorupdatesample]                                           | this api creates an ispCacheNode with the specified create parameters x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_CreateOrUpdate_MaximumSet_Gen.json                                                                |
| [enterpriseMccCacheNodesOperationsDeleteSample.ts][enterprisemcccachenodesoperationsdeletesample]                                                           | this api deletes an existing ispCacheNode resource x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_Delete_MaximumSet_Gen.json                                                                                           |
| [enterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistorySample.ts][enterprisemcccachenodesoperationsgetcachenodeautoupdatehistorysample]             | this api gets ispCacheNode resource auto update histrory information x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_GetCacheNodeAutoUpdateHistory_MaximumSet_Gen.json                                                  |
| [enterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsSample.ts][enterprisemcccachenodesoperationsgetcachenodeinstalldetailssample]                   | this api gets secrets of the ispCacheNode resource install details x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_GetCacheNodeInstallDetails_MaximumSet_Gen.json                                                       |
| [enterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistorySample.ts][enterprisemcccachenodesoperationsgetcachenodemccissuedetailshistorysample]   | this api gets ispCacheNode resource issues details histrory information x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_GetCacheNodeMccIssueDetailsHistory_MaximumSet_Gen.json                                          |
| [enterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistorySample.ts][enterprisemcccachenodesoperationsgetcachenodetlscertificatehistorysample]     | this api gets ispCacheNode resource tls certificate histrory information x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_GetCacheNodeTlsCertificateHistory_MaximumSet_Gen.json                                          |
| [enterpriseMccCacheNodesOperationsGetSample.ts][enterprisemcccachenodesoperationsgetsample]                                                                 | this api gets ispCacheNode resource information x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_Get_MaximumSet_Gen.json                                                                                                 |
| [enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceSample.ts][enterprisemcccachenodesoperationslistbyenterprisemcccustomerresourcesample] | this api retrieves information about all ispCacheNode resources under the given subscription and resource group x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_ListByEnterpriseMccCustomerResource_MaximumSet_Gen.json |
| [enterpriseMccCacheNodesOperationsUpdateSample.ts][enterprisemcccachenodesoperationsupdatesample]                                                           | this api updates an existing ispCacheNode resource x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_Update_MaximumSet_Gen.json                                                                                           |
| [enterpriseMccCustomersCreateOrUpdateSample.ts][enterprisemcccustomerscreateorupdatesample]                                                                 | this api creates an enterprise mcc customer with the specified create parameters x-ms-original-file: 2024-11-30-preview/EnterpriseMccCustomers_CreateOrUpdate_MaximumSet_Gen.json                                                                |
| [enterpriseMccCustomersDeleteSample.ts][enterprisemcccustomersdeletesample]                                                                                 | this api deletes an existing enterprise mcc customer resource x-ms-original-file: 2024-11-30-preview/EnterpriseMccCustomers_Delete_MaximumSet_Gen.json                                                                                           |
| [enterpriseMccCustomersGetSample.ts][enterprisemcccustomersgetsample]                                                                                       | gets the enterprise mcc customer resource information using this get call x-ms-original-file: 2024-11-30-preview/EnterpriseMccCustomers_Get_MaximumSet_Gen.json                                                                                  |
| [enterpriseMccCustomersListByResourceGroupSample.ts][enterprisemcccustomerslistbyresourcegroupsample]                                                       | this api gets the information about all enterprise mcc customer resources under the given subscription and resource group x-ms-original-file: 2024-11-30-preview/EnterpriseMccCustomers_ListByResourceGroup_MaximumSet_Gen.json                  |
| [enterpriseMccCustomersListBySubscriptionSample.ts][enterprisemcccustomerslistbysubscriptionsample]                                                         | this api gets information about all enterpriseMccCustomer resources under the given subscription x-ms-original-file: 2024-11-30-preview/EnterpriseMccCustomers_ListBySubscription_MaximumSet_Gen.json                                            |
| [enterpriseMccCustomersUpdateSample.ts][enterprisemcccustomersupdatesample]                                                                                 | this api updates an existing enterprise mcc customer resource x-ms-original-file: 2024-11-30-preview/EnterpriseMccCustomers_Update_MaximumSet_Gen.json                                                                                           |
| [ispCacheNodesOperationsCreateOrUpdateSample.ts][ispcachenodesoperationscreateorupdatesample]                                                               | this api creates an ispCacheNode with the specified create parameters x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_CreateOrUpdate_MaximumSet_Gen.json                                                                          |
| [ispCacheNodesOperationsDeleteSample.ts][ispcachenodesoperationsdeletesample]                                                                               | this api deletes an existing ispCacheNode resource x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_Delete_MaximumSet_Gen.json                                                                                                     |
| [ispCacheNodesOperationsGetBgpCidrsSample.ts][ispcachenodesoperationsgetbgpcidrssample]                                                                     | this api gets ispCacheNode resource information x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_GetBgpCidrs_MaximumSet_Gen.json                                                                                                   |
| [ispCacheNodesOperationsGetCacheNodeAutoUpdateHistorySample.ts][ispcachenodesoperationsgetcachenodeautoupdatehistorysample]                                 | this api gets ispCacheNode resource auto update histrory information x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_GetCacheNodeAutoUpdateHistory_MaximumSet_Gen.json                                                            |
| [ispCacheNodesOperationsGetCacheNodeInstallDetailsSample.ts][ispcachenodesoperationsgetcachenodeinstalldetailssample]                                       | this api gets secrets of the ispCacheNode resource install details x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_GetCacheNodeInstallDetails_MaximumSet_Gen.json                                                                 |
| [ispCacheNodesOperationsGetCacheNodeMccIssueDetailsHistorySample.ts][ispcachenodesoperationsgetcachenodemccissuedetailshistorysample]                       | this api gets ispCacheNode resource issues details histrory information x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_GetCacheNodeMccIssueDetailsHistory_MaximumSet_Gen.json                                                    |
| [ispCacheNodesOperationsGetSample.ts][ispcachenodesoperationsgetsample]                                                                                     | this api gets ispCacheNode resource information x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_Get_MaximumSet_Gen.json                                                                                                           |
| [ispCacheNodesOperationsListByIspCustomerResourceSample.ts][ispcachenodesoperationslistbyispcustomerresourcesample]                                         | this api retrieves information about all ispCacheNode resources under the given subscription and resource group x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_ListByIspCustomerResource_MaximumSet_Gen.json                     |
| [ispCacheNodesOperationsUpdateSample.ts][ispcachenodesoperationsupdatesample]                                                                               | this api updates an existing ispCacheNode resource x-ms-original-file: 2024-11-30-preview/IspCacheNodesOperations_Update_MaximumSet_Gen.json                                                                                                     |
| [ispCustomersCreateOrUpdateSample.ts][ispcustomerscreateorupdatesample]                                                                                     | this api creates an ispCustomer with the specified create parameters x-ms-original-file: 2024-11-30-preview/IspCustomers_CreateOrUpdate_MaximumSet_Gen.json                                                                                      |
| [ispCustomersDeleteSample.ts][ispcustomersdeletesample]                                                                                                     | this api deletes an existing ispCustomer resource x-ms-original-file: 2024-11-30-preview/IspCustomers_Delete_MaximumSet_Gen.json                                                                                                                 |
| [ispCustomersGetSample.ts][ispcustomersgetsample]                                                                                                           | gets the ispCustomer resource information using this get call x-ms-original-file: 2024-11-30-preview/IspCustomers_Get_MaximumSet_Gen.json                                                                                                        |
| [ispCustomersListByResourceGroupSample.ts][ispcustomerslistbyresourcegroupsample]                                                                           | this api gets the information about all ispCustomer resources under the given subscription and resource group x-ms-original-file: 2024-11-30-preview/IspCustomers_ListByResourceGroup_MaximumSet_Gen.json                                        |
| [ispCustomersListBySubscriptionSample.ts][ispcustomerslistbysubscriptionsample]                                                                             | this api gets information about all ispCustomer resources under the given subscription x-ms-original-file: 2024-11-30-preview/IspCustomers_ListBySubscription_MaximumSet_Gen.json                                                                |
| [ispCustomersUpdateSample.ts][ispcustomersupdatesample]                                                                                                     | this api updates an existing ispCustomer resource x-ms-original-file: 2024-11-30-preview/IspCustomers_Update_MaximumSet_Gen.json                                                                                                                 |
| [operationsListSample.ts][operationslistsample]                                                                                                             | list the operations for the provider x-ms-original-file: 2024-11-30-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                  |

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
node dist/enterpriseMccCacheNodesOperationsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/enterpriseMccCacheNodesOperationsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[enterprisemcccachenodesoperationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCacheNodesOperationsCreateOrUpdateSample.ts
[enterprisemcccachenodesoperationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCacheNodesOperationsDeleteSample.ts
[enterprisemcccachenodesoperationsgetcachenodeautoupdatehistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCacheNodesOperationsGetCacheNodeAutoUpdateHistorySample.ts
[enterprisemcccachenodesoperationsgetcachenodeinstalldetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCacheNodesOperationsGetCacheNodeInstallDetailsSample.ts
[enterprisemcccachenodesoperationsgetcachenodemccissuedetailshistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistorySample.ts
[enterprisemcccachenodesoperationsgetcachenodetlscertificatehistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCacheNodesOperationsGetCacheNodeTlsCertificateHistorySample.ts
[enterprisemcccachenodesoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCacheNodesOperationsGetSample.ts
[enterprisemcccachenodesoperationslistbyenterprisemcccustomerresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCacheNodesOperationsListByEnterpriseMccCustomerResourceSample.ts
[enterprisemcccachenodesoperationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCacheNodesOperationsUpdateSample.ts
[enterprisemcccustomerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCustomersCreateOrUpdateSample.ts
[enterprisemcccustomersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCustomersDeleteSample.ts
[enterprisemcccustomersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCustomersGetSample.ts
[enterprisemcccustomerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCustomersListByResourceGroupSample.ts
[enterprisemcccustomerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCustomersListBySubscriptionSample.ts
[enterprisemcccustomersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/enterpriseMccCustomersUpdateSample.ts
[ispcachenodesoperationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCacheNodesOperationsCreateOrUpdateSample.ts
[ispcachenodesoperationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCacheNodesOperationsDeleteSample.ts
[ispcachenodesoperationsgetbgpcidrssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCacheNodesOperationsGetBgpCidrsSample.ts
[ispcachenodesoperationsgetcachenodeautoupdatehistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCacheNodesOperationsGetCacheNodeAutoUpdateHistorySample.ts
[ispcachenodesoperationsgetcachenodeinstalldetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCacheNodesOperationsGetCacheNodeInstallDetailsSample.ts
[ispcachenodesoperationsgetcachenodemccissuedetailshistorysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCacheNodesOperationsGetCacheNodeMccIssueDetailsHistorySample.ts
[ispcachenodesoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCacheNodesOperationsGetSample.ts
[ispcachenodesoperationslistbyispcustomerresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCacheNodesOperationsListByIspCustomerResourceSample.ts
[ispcachenodesoperationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCacheNodesOperationsUpdateSample.ts
[ispcustomerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCustomersCreateOrUpdateSample.ts
[ispcustomersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCustomersDeleteSample.ts
[ispcustomersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCustomersGetSample.ts
[ispcustomerslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCustomersListByResourceGroupSample.ts
[ispcustomerslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCustomersListBySubscriptionSample.ts
[ispcustomersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/ispCustomersUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/connectedcache/arm-connectedcache/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-connectedcache?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/connectedcache/arm-connectedcache/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
