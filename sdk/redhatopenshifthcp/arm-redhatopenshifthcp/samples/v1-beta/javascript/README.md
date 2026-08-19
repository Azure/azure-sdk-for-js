# @azure/arm-redhatopenshifthcp client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-redhatopenshifthcp in some common scenarios.

| **File Name**                                                                                           | **Description**                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [externalAuthsCreateOrUpdateSample.js][externalauthscreateorupdatesample]                               | create a ExternalAuth x-ms-original-file: 2026-06-30-preview/ExternalAuths_CreateOrUpdate_MaximumSet_Gen.json                                                         |
| [externalAuthsDeleteSample.js][externalauthsdeletesample]                                               | delete a ExternalAuth x-ms-original-file: 2026-06-30-preview/ExternalAuths_Delete_MaximumSet_Gen.json                                                                 |
| [externalAuthsGetSample.js][externalauthsgetsample]                                                     | get a ExternalAuth x-ms-original-file: 2026-06-30-preview/ExternalAuths_Get_MaximumSet_Gen.json                                                                       |
| [externalAuthsListByParentSample.js][externalauthslistbyparentsample]                                   | list ExternalAuth resources by HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/ExternalAuths_ListByParent_MaximumSet_Gen.json                              |
| [externalAuthsUpdateSample.js][externalauthsupdatesample]                                               | update a ExternalAuth x-ms-original-file: 2026-06-30-preview/ExternalAuths_Update_MaximumSet_Gen.json                                                                 |
| [hcpOpenShiftClustersCreateOrUpdateSample.js][hcpopenshiftclusterscreateorupdatesample]                 | create a HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_CreateOrUpdate_MaximumSet_Gen.json                                           |
| [hcpOpenShiftClustersDeleteSample.js][hcpopenshiftclustersdeletesample]                                 | delete a HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_Delete_MaximumSet_Gen.json                                                   |
| [hcpOpenShiftClustersGetSample.js][hcpopenshiftclustersgetsample]                                       | get a HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_Get_MaximumSet_Gen.json                                                         |
| [hcpOpenShiftClustersListByResourceGroupSample.js][hcpopenshiftclusterslistbyresourcegroupsample]       | list HcpOpenShiftCluster resources by resource group x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_ListByResourceGroup_MaximumSet_Gen.json              |
| [hcpOpenShiftClustersListBySubscriptionSample.js][hcpopenshiftclusterslistbysubscriptionsample]         | list HcpOpenShiftCluster resources by subscription ID x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_ListBySubscription_MaximumSet_Gen.json              |
| [hcpOpenShiftClustersRequestAdminCredentialSample.js][hcpopenshiftclustersrequestadmincredentialsample] | request a temporary admin kubeconfig for the cluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_RequestAdminCredential_MaximumSet_Gen.json           |
| [hcpOpenShiftClustersRevokeCredentialsSample.js][hcpopenshiftclustersrevokecredentialssample]           | revoke all credentials issued by requestAdminCredential x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_RevokeCredentials_MaximumSet_Gen.json             |
| [hcpOpenShiftClustersUpdateSample.js][hcpopenshiftclustersupdatesample]                                 | update a HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/HcpOpenShiftClusters_Update_MaximumSet_Gen.json                                                   |
| [hcpOpenShiftVersionsGetSample.js][hcpopenshiftversionsgetsample]                                       | get a HcpOpenShiftVersion x-ms-original-file: 2026-06-30-preview/HcpOpenShiftVersions_Get_MaximumSet_Gen.json                                                         |
| [hcpOpenShiftVersionsListSample.js][hcpopenshiftversionslistsample]                                     | list HcpOpenShiftVersion resources by SubscriptionLocationResource x-ms-original-file: 2026-06-30-preview/HcpOpenShiftVersions_List_MaximumSet_Gen.json               |
| [hcpOperatorIdentityRoleSetsGetSample.js][hcpoperatoridentityrolesetsgetsample]                         | get a HcpOperatorIdentityRoleSet x-ms-original-file: 2026-06-30-preview/HcpOperatorIdentityRoleSets_Get_MaximumSet_Gen.json                                           |
| [hcpOperatorIdentityRoleSetsListSample.js][hcpoperatoridentityrolesetslistsample]                       | list HcpOperatorIdentityRoleSet resources by SubscriptionLocationResource x-ms-original-file: 2026-06-30-preview/HcpOperatorIdentityRoleSets_List_MaximumSet_Gen.json |
| [nodePoolsCreateOrUpdateSample.js][nodepoolscreateorupdatesample]                                       | create a NodePool x-ms-original-file: 2026-06-30-preview/NodePools_CreateOrUpdate_MaximumSet_Gen.json                                                                 |
| [nodePoolsDeleteSample.js][nodepoolsdeletesample]                                                       | delete a NodePool x-ms-original-file: 2026-06-30-preview/NodePools_Delete_MaximumSet_Gen.json                                                                         |
| [nodePoolsGetSample.js][nodepoolsgetsample]                                                             | get a NodePool x-ms-original-file: 2026-06-30-preview/NodePools_Get_MaximumSet_Gen.json                                                                               |
| [nodePoolsListByParentSample.js][nodepoolslistbyparentsample]                                           | list NodePool resources by HcpOpenShiftCluster x-ms-original-file: 2026-06-30-preview/NodePools_ListByParent_MaximumSet_Gen.json                                      |
| [nodePoolsUpdateSample.js][nodepoolsupdatesample]                                                       | update a NodePool x-ms-original-file: 2026-06-30-preview/NodePools_Update_MaximumSet_Gen.json                                                                         |
| [operationsListSample.js][operationslistsample]                                                         | list the operations for the provider x-ms-original-file: 2026-06-30-preview/Operations_List_MaximumSet_Gen.json                                                       |

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
node externalAuthsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node externalAuthsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[externalauthscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/externalAuthsCreateOrUpdateSample.js
[externalauthsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/externalAuthsDeleteSample.js
[externalauthsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/externalAuthsGetSample.js
[externalauthslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/externalAuthsListByParentSample.js
[externalauthsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/externalAuthsUpdateSample.js
[hcpopenshiftclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftClustersCreateOrUpdateSample.js
[hcpopenshiftclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftClustersDeleteSample.js
[hcpopenshiftclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftClustersGetSample.js
[hcpopenshiftclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftClustersListByResourceGroupSample.js
[hcpopenshiftclusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftClustersListBySubscriptionSample.js
[hcpopenshiftclustersrequestadmincredentialsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftClustersRequestAdminCredentialSample.js
[hcpopenshiftclustersrevokecredentialssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftClustersRevokeCredentialsSample.js
[hcpopenshiftclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftClustersUpdateSample.js
[hcpopenshiftversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftVersionsGetSample.js
[hcpopenshiftversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOpenShiftVersionsListSample.js
[hcpoperatoridentityrolesetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOperatorIdentityRoleSetsGetSample.js
[hcpoperatoridentityrolesetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/hcpOperatorIdentityRoleSetsListSample.js
[nodepoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/nodePoolsCreateOrUpdateSample.js
[nodepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/nodePoolsDeleteSample.js
[nodepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/nodePoolsGetSample.js
[nodepoolslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/nodePoolsListByParentSample.js
[nodepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/nodePoolsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-redhatopenshifthcp?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/redhatopenshifthcp/arm-redhatopenshifthcp/README.md
