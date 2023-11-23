# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [agentPoolCreateOrUpdateSample.ts][agentpoolcreateorupdatesample]                                               | Creates the agent pool in the Hybrid AKS provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/PutAgentPool.json                                                      |
| [agentPoolDeleteSample.ts][agentpooldeletesample]                                                               | Deletes the agent pool in the Hybrid AKS provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/DeleteAgentPool.json                                                   |
| [agentPoolGetSample.ts][agentpoolgetsample]                                                                     | Gets the agent pool in the Hybrid AKS provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/GetAgentPool.json                                                         |
| [agentPoolListByProvisionedClusterSample.ts][agentpoollistbyprovisionedclustersample]                           | Gets the agent pools in the Hybrid AKS provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ListAgentPoolByProvisionedClusterInstance.json                           |
| [agentPoolUpdateSample.ts][agentpoolupdatesample]                                                               | Updates the agent pool in the Hybrid AKS provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/UpdateAgentPool.json                                                   |
| [deleteKubernetesVersionsSample.ts][deletekubernetesversionssample]                                             | Delete the kubernetes versions resource type x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/DeleteKubernetesVersions.json                                                                   |
| [deleteVMSkusSample.ts][deletevmskussample]                                                                     | Deletes the Vm Sku resource type x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/DeleteVmSkus.json                                                                                           |
| [getKubernetesVersionsSample.ts][getkubernetesversionssample]                                                   | Gets the supported kubernetes versions from the underlying custom location x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/GetKubernetesVersions.json                                        |
| [getVMSkusSample.ts][getvmskussample]                                                                           | Gets the supported VM skus from the underlying custom location x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/GetVmSkus.json                                                                |
| [hybridIdentityMetadataDeleteSample.ts][hybrididentitymetadatadeletesample]                                     | Deletes the hybrid identity metadata proxy resource. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/DeleteHybridIdentityMetadata.json                                                       |
| [hybridIdentityMetadataGetSample.ts][hybrididentitymetadatagetsample]                                           | Get the hybrid identity metadata proxy resource. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/GetHybridIdentityMetadata.json                                                              |
| [hybridIdentityMetadataListByClusterSample.ts][hybrididentitymetadatalistbyclustersample]                       | Lists the hybrid identity metadata proxy resource in a provisioned cluster instance. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/HybridIdentityMetadataListByCluster.json                |
| [hybridIdentityMetadataPutSample.ts][hybrididentitymetadataputsample]                                           | Creates the hybrid identity metadata proxy resource that facilitates the managed identity provisioning. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/CreateHybridIdentityMetadata.json    |
| [kubernetesVersionsListSample.ts][kubernetesversionslistsample]                                                 | Lists the supported kubernetes versions from the underlying custom location x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ListKubernetesVersions.json                                      |
| [operationsListSample.ts][operationslistsample]                                                                 | x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ListOperations.json                                                                                                                          |
| [provisionedClusterInstancesCreateOrUpdateSample.ts][provisionedclusterinstancescreateorupdatesample]           | Creates the Hybrid AKS provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/PutProvisionedClusterInstance.json                                                       |
| [provisionedClusterInstancesDeleteSample.ts][provisionedclusterinstancesdeletesample]                           | Deletes the Hybrid AKS provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/DeleteProvisionedClusterInstance.json                                                    |
| [provisionedClusterInstancesGetSample.ts][provisionedclusterinstancesgetsample]                                 | Gets the Hybrid AKS provisioned cluster instance x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/GetProvisionedClusterInstance.json                                                          |
| [provisionedClusterInstancesGetUpgradeProfileSample.ts][provisionedclusterinstancesgetupgradeprofilesample]     | Gets the upgrade profile of a provisioned cluster instance. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ProvisionedClusterInstanceGetUpgradeProfile.json                                 |
| [provisionedClusterInstancesListAdminKubeconfigSample.ts][provisionedclusterinstanceslistadminkubeconfigsample] | Lists the admin credentials of a provisioned cluster instance used only in direct mode. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ProvisionedClusterInstanceListAdminKubeconfig.json   |
| [provisionedClusterInstancesListSample.ts][provisionedclusterinstanceslistsample]                               | Gets the Hybrid AKS provisioned cluster instances associated with the connected cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ListProvisionedClusterInstances.json                 |
| [provisionedClusterInstancesListUserKubeconfigSample.ts][provisionedclusterinstanceslistuserkubeconfigsample]   | Lists the AAD user credentials of a provisioned cluster instance used only in direct mode. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ProvisionedClusterInstanceListUserKubeconfig.json |
| [putKubernetesVersionsSample.ts][putkubernetesversionssample]                                                   | Puts the kubernetes version resource type x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/PutKubernetesVersions.json                                                                         |
| [putVMSkusSample.ts][putvmskussample]                                                                           | Puts the VM SKUs resource type x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/PutVmSkus.json                                                                                                |
| [virtualNetworksCreateOrUpdateSample.ts][virtualnetworkscreateorupdatesample]                                   | Puts the Hybrid AKS virtual network x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/PutVirtualNetwork.json                                                                                   |
| [virtualNetworksDeleteSample.ts][virtualnetworksdeletesample]                                                   | Deletes the Hybrid AKS virtual network x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/DeleteVirtualNetwork.json                                                                             |
| [virtualNetworksListByResourceGroupSample.ts][virtualnetworkslistbyresourcegroupsample]                         | Lists the Hybrid AKS virtual networks by resource group x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ListVirtualNetworkByResourceGroup.json                                               |
| [virtualNetworksListBySubscriptionSample.ts][virtualnetworkslistbysubscriptionsample]                           | Lists the Hybrid AKS virtual networks by subscription x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ListVirtualNetworkBySubscription.json                                                  |
| [virtualNetworksRetrieveSample.ts][virtualnetworksretrievesample]                                               | Gets the Hybrid AKS virtual network x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/GetVirtualNetwork.json                                                                                   |
| [virtualNetworksUpdateSample.ts][virtualnetworksupdatesample]                                                   | Patches the Hybrid AKS virtual network x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/UpdateVirtualNetwork.json                                                                             |
| [vmSkusListSample.ts][vmskuslistsample]                                                                         | Lists the supported VM SKUs from the underlying custom location x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2023-11-15-preview/examples/ListVmSkus.json                                                              |

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
npx cross-env  node dist/agentPoolCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentpoolcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolCreateOrUpdateSample.ts
[agentpooldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolDeleteSample.ts
[agentpoolgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolGetSample.ts
[agentpoollistbyprovisionedclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolListByProvisionedClusterSample.ts
[agentpoolupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolUpdateSample.ts
[deletekubernetesversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/deleteKubernetesVersionsSample.ts
[deletevmskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/deleteVMSkusSample.ts
[getkubernetesversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/getKubernetesVersionsSample.ts
[getvmskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/getVMSkusSample.ts
[hybrididentitymetadatadeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridIdentityMetadataDeleteSample.ts
[hybrididentitymetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridIdentityMetadataGetSample.ts
[hybrididentitymetadatalistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridIdentityMetadataListByClusterSample.ts
[hybrididentitymetadataputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridIdentityMetadataPutSample.ts
[kubernetesversionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/kubernetesVersionsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/operationsListSample.ts
[provisionedclusterinstancescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClusterInstancesCreateOrUpdateSample.ts
[provisionedclusterinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClusterInstancesDeleteSample.ts
[provisionedclusterinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClusterInstancesGetSample.ts
[provisionedclusterinstancesgetupgradeprofilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClusterInstancesGetUpgradeProfileSample.ts
[provisionedclusterinstanceslistadminkubeconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClusterInstancesListAdminKubeconfigSample.ts
[provisionedclusterinstanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClusterInstancesListSample.ts
[provisionedclusterinstanceslistuserkubeconfigsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClusterInstancesListUserKubeconfigSample.ts
[putkubernetesversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/putKubernetesVersionsSample.ts
[putvmskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/putVMSkusSample.ts
[virtualnetworkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksCreateOrUpdateSample.ts
[virtualnetworksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksDeleteSample.ts
[virtualnetworkslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksListByResourceGroupSample.ts
[virtualnetworkslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksListBySubscriptionSample.ts
[virtualnetworksretrievesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksRetrieveSample.ts
[virtualnetworksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksUpdateSample.ts
[vmskuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/vmSkusListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hybridcontainerservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
