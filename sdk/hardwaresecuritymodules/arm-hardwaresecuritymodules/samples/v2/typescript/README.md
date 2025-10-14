# @azure/arm-hardwaresecuritymodules client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-hardwaresecuritymodules in some common scenarios.

| **File Name**                                                                                                                       | **Description**                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cloudHsmClusterBackupStatusGetSample.ts][cloudhsmclusterbackupstatusgetsample]                                                     | gets the backup operation status of the specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_Backup_Pending_MaximumSet_Gen.json                                                                                                               |
| [cloudHsmClusterPrivateEndpointConnectionsCreateSample.ts][cloudhsmclusterprivateendpointconnectionscreatesample]                   | creates or updates the private endpoint connection for the Cloud Hsm Cluster. x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Create_MaximumSet_Gen.json                                                                                    |
| [cloudHsmClusterPrivateEndpointConnectionsDeleteSample.ts][cloudhsmclusterprivateendpointconnectionsdeletesample]                   | deletes the private endpoint connection for the Cloud Hsm Cluster. x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Delete_MaximumSet_Gen.json                                                                                               |
| [cloudHsmClusterPrivateEndpointConnectionsGetSample.ts][cloudhsmclusterprivateendpointconnectionsgetsample]                         | gets the private endpoint connection for the Cloud Hsm Cluster. x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Get_MaximumSet_Gen.json                                                                                                     |
| [cloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterSample.ts][cloudhsmclusterprivatelinkresourceslistbycloudhsmclustersample] | gets the private link resources supported for the Cloud Hsm Cluster. x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateLinkResource_ListByCloudHsmCluster_MaximumSet_Gen.json                                                                                    |
| [cloudHsmClusterRestoreStatusGetSample.ts][cloudhsmclusterrestorestatusgetsample]                                                   | gets the restore operation status of the specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_Restore_Pending_MaximumSet_Gen.json                                                                                                             |
| [cloudHsmClustersBackupSample.ts][cloudhsmclustersbackupsample]                                                                     | create a backup of the Cloud HSM Cluster in the specified subscription x-ms-original-file: 2025-03-31/CloudHsmCluster_CreateOrValidate_Backup_MaximumSet_Gen.json                                                                                                   |
| [cloudHsmClustersCreateOrUpdateSample.ts][cloudhsmclusterscreateorupdatesample]                                                     | create or Update a Cloud HSM Cluster in the specified subscription. x-ms-original-file: 2025-03-31/CloudHsmCluster_CreateOrUpdate_MaximumSet_Gen.json                                                                                                               |
| [cloudHsmClustersDeleteSample.ts][cloudhsmclustersdeletesample]                                                                     | deletes the specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_Delete_MaximumSet_Gen.json                                                                                                                                                   |
| [cloudHsmClustersGetSample.ts][cloudhsmclustersgetsample]                                                                           | gets the specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_Get_MaximumSet_Gen.json                                                                                                                                                         |
| [cloudHsmClustersListByResourceGroupSample.ts][cloudhsmclusterslistbyresourcegroupsample]                                           | the List operation gets information about the Cloud HSM Clusters associated with the subscription and within the specified resource group. x-ms-original-file: 2025-03-31/CloudHsmCluster_ListByResourceGroup_MaximumSet_Gen.json                                   |
| [cloudHsmClustersListBySubscriptionSample.ts][cloudhsmclusterslistbysubscriptionsample]                                             | the List operation gets information about the Cloud HSM Clusters associated with the subscription. x-ms-original-file: 2025-03-31/CloudHsmCluster_ListBySubscription_MaximumSet_Gen.json                                                                            |
| [cloudHsmClustersRestoreSample.ts][cloudhsmclustersrestoresample]                                                                   | restores all key materials of a specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_RequestOrValidate_Restore_MaximumSet_Gen.json                                                                                                            |
| [cloudHsmClustersUpdateSample.ts][cloudhsmclustersupdatesample]                                                                     | update a Cloud HSM Cluster in the specified subscription. x-ms-original-file: 2025-03-31/CloudHsmCluster_Update_MaximumSet_Gen.json                                                                                                                                 |
| [cloudHsmClustersValidateBackupPropertiesSample.ts][cloudhsmclustersvalidatebackuppropertiessample]                                 | pre Backup operation to validate whether the customer can perform a backup on the Cloud HSM Cluster resource in the specified subscription. x-ms-original-file: 2025-03-31/CloudHsmCluster_Create_Backup_MaximumSet_Gen_ValidateBackupProperties.json               |
| [cloudHsmClustersValidateRestorePropertiesSample.ts][cloudhsmclustersvalidaterestorepropertiessample]                               | queued validating pre restore operation x-ms-original-file: 2025-03-31/CloudHsmCluster_RequestOrValidate_Restore_MaximumSet_Gen_ValidateRestoreProperties.json                                                                                                      |
| [dedicatedHsmCreateOrUpdateSample.ts][dedicatedhsmcreateorupdatesample]                                                             | create or Update a dedicated HSM in the specified subscription. x-ms-original-file: 2025-03-31/DedicatedHsm_CreateOrUpdate.json                                                                                                                                     |
| [dedicatedHsmDeleteSample.ts][dedicatedhsmdeletesample]                                                                             | deletes the specified Azure Dedicated HSM. x-ms-original-file: 2025-03-31/DedicatedHsm_Delete.json                                                                                                                                                                  |
| [dedicatedHsmGetSample.ts][dedicatedhsmgetsample]                                                                                   | gets the specified Azure dedicated HSM. x-ms-original-file: 2025-03-31/DedicatedHsm_Get.json                                                                                                                                                                        |
| [dedicatedHsmListByResourceGroupSample.ts][dedicatedhsmlistbyresourcegroupsample]                                                   | the List operation gets information about the dedicated HSMs associated with the subscription and within the specified resource group. x-ms-original-file: 2025-03-31/DedicatedHsm_ListByResourceGroup.json                                                         |
| [dedicatedHsmListBySubscriptionSample.ts][dedicatedhsmlistbysubscriptionsample]                                                     | the List operation gets information about the dedicated HSMs associated with the subscription. x-ms-original-file: 2025-03-31/DedicatedHsm_ListBySubscription.json                                                                                                  |
| [dedicatedHsmListOutboundNetworkDependenciesEndpointsSample.ts][dedicatedhsmlistoutboundnetworkdependenciesendpointssample]         | gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified dedicated hsm resource. The operation returns properties of each egress endpoint. x-ms-original-file: 2025-03-31/GetOutboundNetworkDependenciesEndpointsList.json |
| [dedicatedHsmUpdateSample.ts][dedicatedhsmupdatesample]                                                                             | update a dedicated HSM in the specified subscription. x-ms-original-file: 2025-03-31/DedicatedHsm_Update.json                                                                                                                                                       |
| [operationsListSample.ts][operationslistsample]                                                                                     | list the operations for the provider x-ms-original-file: 2025-03-31/OperationsList.json                                                                                                                                                                             |
| [privateEndpointConnectionsListByCloudHsmClusterSample.ts][privateendpointconnectionslistbycloudhsmclustersample]                   | the List operation gets information about the private endpoint connections associated with the Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_ListByCloudHsmCluster_MaximumSet_Gen.json                                  |

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
node dist/cloudHsmClusterBackupStatusGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/cloudHsmClusterBackupStatusGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudhsmclusterbackupstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClusterBackupStatusGetSample.ts
[cloudhsmclusterprivateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClusterPrivateEndpointConnectionsCreateSample.ts
[cloudhsmclusterprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClusterPrivateEndpointConnectionsDeleteSample.ts
[cloudhsmclusterprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClusterPrivateEndpointConnectionsGetSample.ts
[cloudhsmclusterprivatelinkresourceslistbycloudhsmclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterSample.ts
[cloudhsmclusterrestorestatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClusterRestoreStatusGetSample.ts
[cloudhsmclustersbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersBackupSample.ts
[cloudhsmclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersCreateOrUpdateSample.ts
[cloudhsmclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersDeleteSample.ts
[cloudhsmclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersGetSample.ts
[cloudhsmclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersListByResourceGroupSample.ts
[cloudhsmclusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersListBySubscriptionSample.ts
[cloudhsmclustersrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersRestoreSample.ts
[cloudhsmclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersUpdateSample.ts
[cloudhsmclustersvalidatebackuppropertiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersValidateBackupPropertiesSample.ts
[cloudhsmclustersvalidaterestorepropertiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/cloudHsmClustersValidateRestorePropertiesSample.ts
[dedicatedhsmcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/dedicatedHsmCreateOrUpdateSample.ts
[dedicatedhsmdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/dedicatedHsmDeleteSample.ts
[dedicatedhsmgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/dedicatedHsmGetSample.ts
[dedicatedhsmlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/dedicatedHsmListByResourceGroupSample.ts
[dedicatedhsmlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/dedicatedHsmListBySubscriptionSample.ts
[dedicatedhsmlistoutboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/dedicatedHsmListOutboundNetworkDependenciesEndpointsSample.ts
[dedicatedhsmupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/dedicatedHsmUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/operationsListSample.ts
[privateendpointconnectionslistbycloudhsmclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/typescript/src/privateEndpointConnectionsListByCloudHsmClusterSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hardwaresecuritymodules?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
