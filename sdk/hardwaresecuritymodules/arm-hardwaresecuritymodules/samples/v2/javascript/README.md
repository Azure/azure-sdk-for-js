# @azure/arm-hardwaresecuritymodules client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-hardwaresecuritymodules in some common scenarios.

| **File Name**                                                                                                                       | **Description**                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cloudHsmClusterBackupStatusGetSample.js][cloudhsmclusterbackupstatusgetsample]                                                     | gets the backup operation status of the specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_Backup_Pending_MaximumSet_Gen.json                                                                                                               |
| [cloudHsmClusterPrivateEndpointConnectionsCreateSample.js][cloudhsmclusterprivateendpointconnectionscreatesample]                   | creates or updates the private endpoint connection for the Cloud Hsm Cluster. x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Create_MaximumSet_Gen.json                                                                                    |
| [cloudHsmClusterPrivateEndpointConnectionsDeleteSample.js][cloudhsmclusterprivateendpointconnectionsdeletesample]                   | deletes the private endpoint connection for the Cloud Hsm Cluster. x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Delete_MaximumSet_Gen.json                                                                                               |
| [cloudHsmClusterPrivateEndpointConnectionsGetSample.js][cloudhsmclusterprivateendpointconnectionsgetsample]                         | gets the private endpoint connection for the Cloud Hsm Cluster. x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_Get_MaximumSet_Gen.json                                                                                                     |
| [cloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterSample.js][cloudhsmclusterprivatelinkresourceslistbycloudhsmclustersample] | gets the private link resources supported for the Cloud Hsm Cluster. x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateLinkResource_ListByCloudHsmCluster_MaximumSet_Gen.json                                                                                    |
| [cloudHsmClusterRestoreStatusGetSample.js][cloudhsmclusterrestorestatusgetsample]                                                   | gets the restore operation status of the specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_Restore_Pending_MaximumSet_Gen.json                                                                                                             |
| [cloudHsmClustersBackupSample.js][cloudhsmclustersbackupsample]                                                                     | create a backup of the Cloud HSM Cluster in the specified subscription x-ms-original-file: 2025-03-31/CloudHsmCluster_CreateOrValidate_Backup_MaximumSet_Gen.json                                                                                                   |
| [cloudHsmClustersCreateOrUpdateSample.js][cloudhsmclusterscreateorupdatesample]                                                     | create or Update a Cloud HSM Cluster in the specified subscription. x-ms-original-file: 2025-03-31/CloudHsmCluster_CreateOrUpdate_MaximumSet_Gen.json                                                                                                               |
| [cloudHsmClustersDeleteSample.js][cloudhsmclustersdeletesample]                                                                     | deletes the specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_Delete_MaximumSet_Gen.json                                                                                                                                                   |
| [cloudHsmClustersGetSample.js][cloudhsmclustersgetsample]                                                                           | gets the specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_Get_MaximumSet_Gen.json                                                                                                                                                         |
| [cloudHsmClustersListByResourceGroupSample.js][cloudhsmclusterslistbyresourcegroupsample]                                           | the List operation gets information about the Cloud HSM Clusters associated with the subscription and within the specified resource group. x-ms-original-file: 2025-03-31/CloudHsmCluster_ListByResourceGroup_MaximumSet_Gen.json                                   |
| [cloudHsmClustersListBySubscriptionSample.js][cloudhsmclusterslistbysubscriptionsample]                                             | the List operation gets information about the Cloud HSM Clusters associated with the subscription. x-ms-original-file: 2025-03-31/CloudHsmCluster_ListBySubscription_MaximumSet_Gen.json                                                                            |
| [cloudHsmClustersRestoreSample.js][cloudhsmclustersrestoresample]                                                                   | restores all key materials of a specified Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmCluster_RequestOrValidate_Restore_MaximumSet_Gen.json                                                                                                            |
| [cloudHsmClustersUpdateSample.js][cloudhsmclustersupdatesample]                                                                     | update a Cloud HSM Cluster in the specified subscription. x-ms-original-file: 2025-03-31/CloudHsmCluster_Update_MaximumSet_Gen.json                                                                                                                                 |
| [cloudHsmClustersValidateBackupPropertiesSample.js][cloudhsmclustersvalidatebackuppropertiessample]                                 | pre Backup operation to validate whether the customer can perform a backup on the Cloud HSM Cluster resource in the specified subscription. x-ms-original-file: 2025-03-31/CloudHsmCluster_Create_Backup_MaximumSet_Gen_ValidateBackupProperties.json               |
| [cloudHsmClustersValidateRestorePropertiesSample.js][cloudhsmclustersvalidaterestorepropertiessample]                               | queued validating pre restore operation x-ms-original-file: 2025-03-31/CloudHsmCluster_RequestOrValidate_Restore_MaximumSet_Gen_ValidateRestoreProperties.json                                                                                                      |
| [dedicatedHsmCreateOrUpdateSample.js][dedicatedhsmcreateorupdatesample]                                                             | create or Update a dedicated HSM in the specified subscription. x-ms-original-file: 2025-03-31/DedicatedHsm_CreateOrUpdate.json                                                                                                                                     |
| [dedicatedHsmDeleteSample.js][dedicatedhsmdeletesample]                                                                             | deletes the specified Azure Dedicated HSM. x-ms-original-file: 2025-03-31/DedicatedHsm_Delete.json                                                                                                                                                                  |
| [dedicatedHsmGetSample.js][dedicatedhsmgetsample]                                                                                   | gets the specified Azure dedicated HSM. x-ms-original-file: 2025-03-31/DedicatedHsm_Get.json                                                                                                                                                                        |
| [dedicatedHsmListByResourceGroupSample.js][dedicatedhsmlistbyresourcegroupsample]                                                   | the List operation gets information about the dedicated HSMs associated with the subscription and within the specified resource group. x-ms-original-file: 2025-03-31/DedicatedHsm_ListByResourceGroup.json                                                         |
| [dedicatedHsmListBySubscriptionSample.js][dedicatedhsmlistbysubscriptionsample]                                                     | the List operation gets information about the dedicated HSMs associated with the subscription. x-ms-original-file: 2025-03-31/DedicatedHsm_ListBySubscription.json                                                                                                  |
| [dedicatedHsmListOutboundNetworkDependenciesEndpointsSample.js][dedicatedhsmlistoutboundnetworkdependenciesendpointssample]         | gets a list of egress endpoints (network endpoints of all outbound dependencies) in the specified dedicated hsm resource. The operation returns properties of each egress endpoint. x-ms-original-file: 2025-03-31/GetOutboundNetworkDependenciesEndpointsList.json |
| [dedicatedHsmUpdateSample.js][dedicatedhsmupdatesample]                                                                             | update a dedicated HSM in the specified subscription. x-ms-original-file: 2025-03-31/DedicatedHsm_Update.json                                                                                                                                                       |
| [operationsListSample.js][operationslistsample]                                                                                     | list the operations for the provider x-ms-original-file: 2025-03-31/OperationsList.json                                                                                                                                                                             |
| [privateEndpointConnectionsListByCloudHsmClusterSample.js][privateendpointconnectionslistbycloudhsmclustersample]                   | the List operation gets information about the private endpoint connections associated with the Cloud HSM Cluster x-ms-original-file: 2025-03-31/CloudHsmClusterPrivateEndpointConnection_ListByCloudHsmCluster_MaximumSet_Gen.json                                  |

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
node cloudHsmClusterBackupStatusGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node cloudHsmClusterBackupStatusGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[cloudhsmclusterbackupstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClusterBackupStatusGetSample.js
[cloudhsmclusterprivateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClusterPrivateEndpointConnectionsCreateSample.js
[cloudhsmclusterprivateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClusterPrivateEndpointConnectionsDeleteSample.js
[cloudhsmclusterprivateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClusterPrivateEndpointConnectionsGetSample.js
[cloudhsmclusterprivatelinkresourceslistbycloudhsmclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClusterPrivateLinkResourcesListByCloudHsmClusterSample.js
[cloudhsmclusterrestorestatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClusterRestoreStatusGetSample.js
[cloudhsmclustersbackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersBackupSample.js
[cloudhsmclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersCreateOrUpdateSample.js
[cloudhsmclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersDeleteSample.js
[cloudhsmclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersGetSample.js
[cloudhsmclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersListByResourceGroupSample.js
[cloudhsmclusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersListBySubscriptionSample.js
[cloudhsmclustersrestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersRestoreSample.js
[cloudhsmclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersUpdateSample.js
[cloudhsmclustersvalidatebackuppropertiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersValidateBackupPropertiesSample.js
[cloudhsmclustersvalidaterestorepropertiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/cloudHsmClustersValidateRestorePropertiesSample.js
[dedicatedhsmcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/dedicatedHsmCreateOrUpdateSample.js
[dedicatedhsmdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/dedicatedHsmDeleteSample.js
[dedicatedhsmgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/dedicatedHsmGetSample.js
[dedicatedhsmlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/dedicatedHsmListByResourceGroupSample.js
[dedicatedhsmlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/dedicatedHsmListBySubscriptionSample.js
[dedicatedhsmlistoutboundnetworkdependenciesendpointssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/dedicatedHsmListOutboundNetworkDependenciesEndpointsSample.js
[dedicatedhsmupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/dedicatedHsmUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/operationsListSample.js
[privateendpointconnectionslistbycloudhsmclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/samples/v2/javascript/privateEndpointConnectionsListByCloudHsmClusterSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hardwaresecuritymodules?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hardwaresecuritymodules/arm-hardwaresecuritymodules/README.md
