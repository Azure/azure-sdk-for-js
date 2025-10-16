# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [agentPoolCreateOrUpdateSample.ts][agentpoolcreateorupdatesample]                                               | Creates or updates the agent pool in the provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/PutAgentPool.json                                                                      |
| [agentPoolDeleteSample.ts][agentpooldeletesample]                                                               | Deletes the specified agent pool in the provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/DeleteAgentPool.json                                                                    |
| [agentPoolGetSample.ts][agentpoolgetsample]                                                                     | Gets the specified agent pool in the provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/GetAgentPool.json                                                                          |
| [agentPoolListByProvisionedClusterSample.ts][agentpoollistbyprovisionedclustersample]                           | Gets the list of agent pools in the specified provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ListAgentPoolByProvisionedClusterInstance.json                                    |
| [deleteKubernetesVersionsSample.ts][deletekubernetesversionssample]                                             | Delete the default kubernetes versions resource type x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/DeleteKubernetesVersions.json                                                                  |
| [deleteVMSkusSample.ts][deletevmskussample]                                                                     | Deletes the default VM skus resource type x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/DeleteVmSkus.json                                                                                         |
| [getKubernetesVersionsSample.ts][getkubernetesversionssample]                                                   | Lists the supported kubernetes versions for the specified custom location x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/GetKubernetesVersions.json                                                |
| [getVMSkusSample.ts][getvmskussample]                                                                           | Lists the supported VM skus for the specified custom location x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/GetVmSkus.json                                                                        |
| [hybridIdentityMetadataDeleteSample.ts][hybrididentitymetadatadeletesample]                                     | Deletes the hybrid identity metadata proxy resource. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/DeleteHybridIdentityMetadata.json                                                              |
| [hybridIdentityMetadataGetSample.ts][hybrididentitymetadatagetsample]                                           | Get the hybrid identity metadata proxy resource. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/GetHybridIdentityMetadata.json                                                                     |
| [hybridIdentityMetadataListByClusterSample.ts][hybrididentitymetadatalistbyclustersample]                       | Lists the hybrid identity metadata proxy resource in a provisioned cluster instance. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/HybridIdentityMetadataListByCluster.json                       |
| [hybridIdentityMetadataPutSample.ts][hybrididentitymetadataputsample]                                           | Creates the hybrid identity metadata proxy resource that facilitates the managed identity provisioning. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/CreateHybridIdentityMetadata.json           |
| [kubernetesVersionsListSample.ts][kubernetesversionslistsample]                                                 | Lists the supported kubernetes versions for the specified custom location x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ListKubernetesVersions.json                                               |
| [operationsListSample.ts][operationslistsample]                                                                 | Lists the supported operations x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ListOperations.json                                                                                                  |
| [provisionedClusterInstancesCreateOrUpdateSample.ts][provisionedclusterinstancescreateorupdatesample]           | Creates or updates the provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/PutProvisionedClusterInstance.json                                                              |
| [provisionedClusterInstancesDeleteSample.ts][provisionedclusterinstancesdeletesample]                           | Deletes the provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/DeleteProvisionedClusterInstance.json                                                                      |
| [provisionedClusterInstancesGetSample.ts][provisionedclusterinstancesgetsample]                                 | Gets the provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/GetProvisionedClusterInstance.json                                                                            |
| [provisionedClusterInstancesGetUpgradeProfileSample.ts][provisionedclusterinstancesgetupgradeprofilesample]     | Gets the upgrade profile of a provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ProvisionedClusterInstanceGetUpgradeProfile.json                                                  |
| [provisionedClusterInstancesListAdminKubeconfigSample.ts][provisionedclusterinstanceslistadminkubeconfigsample] | Lists the admin credentials of the provisioned cluster (can only be used within private network) x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ProvisionedClusterInstanceListAdminKubeconfig.json |
| [provisionedClusterInstancesListSample.ts][provisionedclusterinstanceslistsample]                               | Lists the ProvisionedClusterInstance resource associated with the ConnectedCluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ListProvisionedClusterInstances.json                             |
| [provisionedClusterInstancesListUserKubeconfigSample.ts][provisionedclusterinstanceslistuserkubeconfigsample]   | Lists the user credentials of the provisioned cluster (can only be used within private network) x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ProvisionedClusterInstanceListUserKubeconfig.json   |
| [putKubernetesVersionsSample.ts][putkubernetesversionssample]                                                   | Puts the default kubernetes version resource type (one time operation, before listing the kubernetes versions) x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/PutKubernetesVersions.json           |
| [putVMSkusSample.ts][putvmskussample]                                                                           | Puts the default VM skus resource type (one time operation, before listing the VM skus) x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/PutVmSkus.json                                              |
| [virtualNetworksCreateOrUpdateSample.ts][virtualnetworkscreateorupdatesample]                                   | Creates or updates the virtual network resource x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/PutVirtualNetwork.json                                                                              |
| [virtualNetworksDeleteSample.ts][virtualnetworksdeletesample]                                                   | Deletes the specified virtual network resource x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/DeleteVirtualNetwork.json                                                                            |
| [virtualNetworksListByResourceGroupSample.ts][virtualnetworkslistbyresourcegroupsample]                         | Lists the virtual networks in the specified resource group x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ListVirtualNetworkByResourceGroup.json                                                   |
| [virtualNetworksListBySubscriptionSample.ts][virtualnetworkslistbysubscriptionsample]                           | Lists the virtual networks in the specified subscription x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ListVirtualNetworkBySubscription.json                                                      |
| [virtualNetworksRetrieveSample.ts][virtualnetworksretrievesample]                                               | Gets the specified virtual network resource x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/GetVirtualNetwork.json                                                                                  |
| [virtualNetworksUpdateSample.ts][virtualnetworksupdatesample]                                                   | Patches the virtual network resource x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/UpdateVirtualNetwork.json                                                                                      |
| [vmSkusListSample.ts][vmskuslistsample]                                                                         | Lists the supported VM skus for the specified custom location x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/stable/2024-01-01/examples/ListVmSkus.json                                                                       |

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
node dist/agentPoolCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/agentPoolCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentpoolcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/agentPoolCreateOrUpdateSample.ts
[agentpooldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/agentPoolDeleteSample.ts
[agentpoolgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/agentPoolGetSample.ts
[agentpoollistbyprovisionedclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/agentPoolListByProvisionedClusterSample.ts
[deletekubernetesversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/deleteKubernetesVersionsSample.ts
[deletevmskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/deleteVMSkusSample.ts
[getkubernetesversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/getKubernetesVersionsSample.ts
[getvmskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/getVMSkusSample.ts
[hybrididentitymetadatadeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/hybridIdentityMetadataDeleteSample.ts
[hybrididentitymetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/hybridIdentityMetadataGetSample.ts
[hybrididentitymetadatalistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/hybridIdentityMetadataListByClusterSample.ts
[hybrididentitymetadataputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/hybridIdentityMetadataPutSample.ts
[kubernetesversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/kubernetesVersionsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/operationsListSample.ts
[provisionedclusterinstancescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/provisionedClusterInstancesCreateOrUpdateSample.ts
[provisionedclusterinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/provisionedClusterInstancesDeleteSample.ts
[provisionedclusterinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/provisionedClusterInstancesGetSample.ts
[provisionedclusterinstancesgetupgradeprofilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/provisionedClusterInstancesGetUpgradeProfileSample.ts
[provisionedclusterinstanceslistadminkubeconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/provisionedClusterInstancesListAdminKubeconfigSample.ts
[provisionedclusterinstanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/provisionedClusterInstancesListSample.ts
[provisionedclusterinstanceslistuserkubeconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/provisionedClusterInstancesListUserKubeconfigSample.ts
[putkubernetesversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/putKubernetesVersionsSample.ts
[putvmskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/putVMSkusSample.ts
[virtualnetworkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/virtualNetworksCreateOrUpdateSample.ts
[virtualnetworksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/virtualNetworksDeleteSample.ts
[virtualnetworkslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/virtualNetworksListByResourceGroupSample.ts
[virtualnetworkslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/virtualNetworksListBySubscriptionSample.ts
[virtualnetworksretrievesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/virtualNetworksRetrieveSample.ts
[virtualnetworksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/virtualNetworksUpdateSample.ts
[vmskuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1/typescript/src/vmSkusListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hybridcontainerservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
