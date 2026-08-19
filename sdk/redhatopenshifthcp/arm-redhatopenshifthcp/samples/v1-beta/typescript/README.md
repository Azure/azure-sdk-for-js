# @azure/arm-redhatopenshifthcp client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-redhatopenshifthcp in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [externalAuthsCreateOrUpdateSample.ts][externalauthscreateorupdatesample]                               | create a ExternalAuth x-ms-original-file: 2026-06-30-preview/ExternalAuths_CreateOrUpdate_MaximumSet_Gen.json                                                         |
| [externalAuthsDeleteSample.ts][externalauthsdeletesample]                                               | delete a ExternalAuth x-ms-original-file: 2026-06-30-preview/ExternalAuths_Delete_MaximumSet_Gen.json                                                                 |
| [externalAuthsGetSample.ts][externalauthsgetsample]                                                     | get a ExternalAuth x-ms-original-file: 2026-06-30-preview/ExternalAuths_Get_MaximumSet_Gen.json                                                                       |
| [externalAuthsListByParentSample.ts][externalauthslistbyparentsample]                                   | list ExternalAuth resources by HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/ExternalAuths_ListByParent_MaximumSet_Gen.json                              |
| [externalAuthsUpdateSample.ts][externalauthsupdatesample]                                               | update a ExternalAuth x-ms-original-file: 2026-06-30-preview/ExternalAuths_Update_MaximumSet_Gen.json                                                                 |
| [hcpOpenShiftClustersCreateOrUpdateSample.ts][hcpopenshiftclusterscreateorupdatesample]                 | create a HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_CreateOrUpdate_MaximumSet_Gen.json                                           |
| [hcpOpenShiftClustersDeleteSample.ts][hcpopenshiftclustersdeletesample]                                 | delete a HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_Delete_MaximumSet_Gen.json                                                   |
| [hcpOpenShiftClustersGetSample.ts][hcpopenshiftclustersgetsample]                                       | get a HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_Get_MaximumSet_Gen.json                                                         |
| [hcpOpenShiftClustersListByResourceGroupSample.ts][hcpopenshiftclusterslistbyresourcegroupsample]       | list HcpOpenShiftCluster resources by resource group x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_ListByResourceGroup_MaximumSet_Gen.json              |
| [hcpOpenShiftClustersListBySubscriptionSample.ts][hcpopenshiftclusterslistbysubscriptionsample]         | list HcpOpenShiftCluster resources by subscription ID x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_ListBySubscription_MaximumSet_Gen.json              |
| [hcpOpenShiftClustersRequestAdminCredentialSample.ts][hcpopenshiftclustersrequestadmincredentialsample] | request a temporary admin kubeconfig for the cluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_RequestAdminCredential_MaximumSet_Gen.json           |
| [hcpOpenShiftClustersRevokeCredentialsSample.ts][hcpopenshiftclustersrevokecredentialssample]           | revoke all credentials issued by requestAdminCredential x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_RevokeCredentials_MaximumSet_Gen.json             |
| [hcpOpenShiftClustersUpdateSample.ts][hcpopenshiftclustersupdatesample]                                 | update a HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_Update_MaximumSet_Gen.json                                                   |
| [hcpOpenShiftVersionsGetSample.ts][hcpopenshiftversionsgetsample]                                       | get a HcpOpenShiftVersion x-ms-original-file: 2026-06-30-preview/HcpOpenShiftVersions_Get_MaximumSet_Gen.json                                                         |
| [hcpOpenShiftVersionsListSample.ts][hcpopenshiftversionslistsample]                                     | list HcpOpenShiftVersion resources by SubscriptionLocationResource x-ms-original-file: 2026-06-30-preview/HcpOpenShiftVersions_List_MaximumSet_Gen.json               |
| [hcpOperatorIdentityRoleSetsGetSample.ts][hcpoperatoridentityrolesetsgetsample]                         | get a HcpOperatorIdentityRoleSet x-ms-original-file: 2026-06-30-preview/HcpOperatorIdentityRoleSets_Get_MaximumSet_Gen.json                                           |
| [hcpOperatorIdentityRoleSetsListSample.ts][hcpoperatoridentityrolesetslistsample]                       | list HcpOperatorIdentityRoleSet resources by SubscriptionLocationResource x-ms-original-file: 2026-06-30-preview/HcpOperatorIdentityRoleSets_List_MaximumSet_Gen.json |
| [nodePoolsCreateOrUpdateSample.ts][nodepoolscreateorupdatesample]                                       | create a NodePool x-ms-original-file: 2026-06-30-preview/NodePools_CreateOrUpdate_MaximumSet_Gen.json                                                                 |
| [nodePoolsDeleteSample.ts][nodepoolsdeletesample]                                                       | delete a NodePool x-ms-original-file: 2026-06-30-preview/NodePools_Delete_MaximumSet_Gen.json                                                                         |
| [nodePoolsGetSample.ts][nodepoolsgetsample]                                                             | get a NodePool x-ms-original-file: 2026-06-30-preview/NodePools_Get_MaximumSet_Gen.json                                                                               |
| [nodePoolsListByParentSample.ts][nodepoolslistbyparentsample]                                           | list NodePool resources by HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/NodePools_ListByParent_MaximumSet_Gen.json                                      |
| [nodePoolsUpdateSample.ts][nodepoolsupdatesample]                                                       | update a NodePool x-ms-original-file: 2026-06-30-preview/NodePools_Update_MaximumSet_Gen.json                                                                         |
| [operationsListSample.ts][operationslistsample]                                                         | list the operations for the provider x-ms-original-file: 2026-06-30-preview/Operations_List_MaximumSet_Gen.json                                                       |

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
node dist/externalAuthsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/externalAuthsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[externalauthscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/externalAuthsCreateOrUpdateSample.ts
[externalauthsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/externalAuthsDeleteSample.ts
[externalauthsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/externalAuthsGetSample.ts
[externalauthslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/externalAuthsListByParentSample.ts
[externalauthsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/externalAuthsUpdateSample.ts
[hcpopenshiftclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftClustersCreateOrUpdateSample.ts
[hcpopenshiftclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftClustersDeleteSample.ts
[hcpopenshiftclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftClustersGetSample.ts
[hcpopenshiftclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftClustersListByResourceGroupSample.ts
[hcpopenshiftclusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftClustersListBySubscriptionSample.ts
[hcpopenshiftclustersrequestadmincredentialsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftClustersRequestAdminCredentialSample.ts
[hcpopenshiftclustersrevokecredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftClustersRevokeCredentialsSample.ts
[hcpopenshiftclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftClustersUpdateSample.ts
[hcpopenshiftversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftVersionsGetSample.ts
[hcpopenshiftversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOpenShiftVersionsListSample.ts
[hcpoperatoridentityrolesetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOperatorIdentityRoleSetsGetSample.ts
[hcpoperatoridentityrolesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/hcpOperatorIdentityRoleSetsListSample.ts
[nodepoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/nodePoolsCreateOrUpdateSample.ts
[nodepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/nodePoolsDeleteSample.ts
[nodepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/nodePoolsGetSample.ts
[nodepoolslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/nodePoolsListByParentSample.ts
[nodepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/nodePoolsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-redhatopenshifthcp?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
