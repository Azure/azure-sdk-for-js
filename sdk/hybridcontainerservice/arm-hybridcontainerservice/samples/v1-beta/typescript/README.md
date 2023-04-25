# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                           | **Description**                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [agentPoolCreateOrUpdateSample.ts][agentpoolcreateorupdatesample]                                                                       | Creates the agent pool in the Hybrid AKS provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/PutAgentPool.json                                                                                        |
| [agentPoolDeleteSample.ts][agentpooldeletesample]                                                                                       | Deletes the agent pool in the Hybrid AKS provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/DeleteAgentPool.json                                                                                     |
| [agentPoolGetSample.ts][agentpoolgetsample]                                                                                             | Gets the agent pool in the Hybrid AKS provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/GetAgentPool.json                                                                                           |
| [agentPoolListByProvisionedClusterSample.ts][agentpoollistbyprovisionedclustersample]                                                   | Gets the agent pools in the Hybrid AKS provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListAgentPoolByProvisionedCluster.json                                                                     |
| [agentPoolUpdateSample.ts][agentpoolupdatesample]                                                                                       | Updates the agent pool in the Hybrid AKS provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/UpdateAgentPool.json                                                                                     |
| [hybridContainerServiceListOrchestratorsSample.ts][hybridcontainerservicelistorchestratorssample]                                       | Lists the available orchestrators in a custom location for HybridAKS x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListOrchestrators.json                                                                           |
| [hybridContainerServiceListVMSkusSample.ts][hybridcontainerservicelistvmskussample]                                                     | Lists the available VM SKUs in a custom location for HybridAKS x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListVMSkus.json                                                                                        |
| [hybridIdentityMetadataDeleteSample.ts][hybrididentitymetadatadeletesample]                                                             | Deletes the hybrid identity metadata proxy resource. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/DeleteHybridIdentityMetadata.json                                                                                |
| [hybridIdentityMetadataGetSample.ts][hybrididentitymetadatagetsample]                                                                   | Get the hybrid identity metadata proxy resource. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/GetHybridIdentityMetadata.json                                                                                       |
| [hybridIdentityMetadataListByClusterSample.ts][hybrididentitymetadatalistbyclustersample]                                               | Lists the hybrid identity metadata proxy resource in a cluster. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/HybridIdentityMetadataListByCluster.json                                                              |
| [hybridIdentityMetadataPutSample.ts][hybrididentitymetadataputsample]                                                                   | Creates the hybrid identity metadata proxy resource that facilitates the managed identity provisioning. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/CreateHybridIdentityMetadata.json                             |
| [operationsListSample.ts][operationslistsample]                                                                                         | x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListOperations.json                                                                                                                                                   |
| [provisionedClustersCreateOrUpdateSample.ts][provisionedclusterscreateorupdatesample]                                                   | Creates the Hybrid AKS provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/PutProvisionedCluster.json                                                                                                 |
| [provisionedClustersDeleteSample.ts][provisionedclustersdeletesample]                                                                   | Deletes the Hybrid AKS provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/DeleteProvisionedCluster.json                                                                                              |
| [provisionedClustersGetSample.ts][provisionedclustersgetsample]                                                                         | Gets the Hybrid AKS provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/GetProvisionedCluster.json                                                                                                    |
| [provisionedClustersGetUpgradeProfileSample.ts][provisionedclustersgetupgradeprofilesample]                                             | Gets the upgrade profile of a provisioned cluster. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ProvisionedClustersGetUpgradeProfile.json                                                                          |
| [provisionedClustersListByResourceGroupSample.ts][provisionedclusterslistbyresourcegroupsample]                                         | Gets the Hybrid AKS provisioned cluster in a resource group x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListProvisionedClusterByResourceGroup.json                                                                |
| [provisionedClustersListBySubscriptionSample.ts][provisionedclusterslistbysubscriptionsample]                                           | Gets the Hybrid AKS provisioned cluster in a subscription x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListProvisionedClusterBySubscription.json                                                                   |
| [provisionedClustersUpdateSample.ts][provisionedclustersupdatesample]                                                                   | Updates the Hybrid AKS provisioned cluster x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/UpdateProvisionedCluster.json                                                                                              |
| [provisionedClustersUpgradeNodeImageVersionForEntireClusterSample.ts][provisionedclustersupgradenodeimageversionforentireclustersample] | Upgrading the node image version of a cluster applies the newest OS and runtime updates to the nodes. x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ProvisionedClustersUpgradeNodeImageVersionForEntireCluster.json |
| [storageSpacesCreateOrUpdateSample.ts][storagespacescreateorupdatesample]                                                               | Puts the Hybrid AKS storage object x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/PutStorageSpace.json                                                                                                               |
| [storageSpacesDeleteSample.ts][storagespacesdeletesample]                                                                               | Deletes the Hybrid AKS storage object x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/DeleteStorageSpace.json                                                                                                         |
| [storageSpacesListByResourceGroupSample.ts][storagespaceslistbyresourcegroupsample]                                                     | List the Hybrid AKS storage object by resource group x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListStorageSpaceByResourceGroup.json                                                                             |
| [storageSpacesListBySubscriptionSample.ts][storagespaceslistbysubscriptionsample]                                                       | List the Hybrid AKS storage object by subscription x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListStorageSpaceBySubscription.json                                                                                |
| [storageSpacesRetrieveSample.ts][storagespacesretrievesample]                                                                           | Gets the Hybrid AKS storage space object x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/GetStorageSpace.json                                                                                                         |
| [storageSpacesUpdateSample.ts][storagespacesupdatesample]                                                                               | Patches the Hybrid AKS storage object x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/UpdateStorageSpace.json                                                                                                         |
| [virtualNetworksCreateOrUpdateSample.ts][virtualnetworkscreateorupdatesample]                                                           | Puts the Hybrid AKS virtual network x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/PutVirtualNetwork.json                                                                                                            |
| [virtualNetworksDeleteSample.ts][virtualnetworksdeletesample]                                                                           | Deletes the Hybrid AKS virtual network x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/DeleteVirtualNetwork.json                                                                                                      |
| [virtualNetworksListByResourceGroupSample.ts][virtualnetworkslistbyresourcegroupsample]                                                 | Lists the Hybrid AKS virtual networks by resource group x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListVirtualNetworkByResourceGroup.json                                                                        |
| [virtualNetworksListBySubscriptionSample.ts][virtualnetworkslistbysubscriptionsample]                                                   | Lists the Hybrid AKS virtual networks by subscription x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/ListVirtualNetworkBySubscription.json                                                                           |
| [virtualNetworksRetrieveSample.ts][virtualnetworksretrievesample]                                                                       | Gets the Hybrid AKS virtual network x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/GetVirtualNetwork.json                                                                                                            |
| [virtualNetworksUpdateSample.ts][virtualnetworksupdatesample]                                                                           | Patches the Hybrid AKS virtual network x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-09-01-preview/examples/UpdateVirtualNetwork.json                                                                                                      |

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
npx cross-env HYBRIDCONTAINERSERVICE_SUBSCRIPTION_ID="<hybridcontainerservice subscription id>" HYBRIDCONTAINERSERVICE_RESOURCE_GROUP="<hybridcontainerservice resource group>" node dist/agentPoolCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agentpoolcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolCreateOrUpdateSample.ts
[agentpooldeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolDeleteSample.ts
[agentpoolgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolGetSample.ts
[agentpoollistbyprovisionedclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolListByProvisionedClusterSample.ts
[agentpoolupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/agentPoolUpdateSample.ts
[hybridcontainerservicelistorchestratorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridContainerServiceListOrchestratorsSample.ts
[hybridcontainerservicelistvmskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridContainerServiceListVMSkusSample.ts
[hybrididentitymetadatadeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridIdentityMetadataDeleteSample.ts
[hybrididentitymetadatagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridIdentityMetadataGetSample.ts
[hybrididentitymetadatalistbyclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridIdentityMetadataListByClusterSample.ts
[hybrididentitymetadataputsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/hybridIdentityMetadataPutSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/operationsListSample.ts
[provisionedclusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClustersCreateOrUpdateSample.ts
[provisionedclustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClustersDeleteSample.ts
[provisionedclustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClustersGetSample.ts
[provisionedclustersgetupgradeprofilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClustersGetUpgradeProfileSample.ts
[provisionedclusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClustersListByResourceGroupSample.ts
[provisionedclusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClustersListBySubscriptionSample.ts
[provisionedclustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClustersUpdateSample.ts
[provisionedclustersupgradenodeimageversionforentireclustersample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/provisionedClustersUpgradeNodeImageVersionForEntireClusterSample.ts
[storagespacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/storageSpacesCreateOrUpdateSample.ts
[storagespacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/storageSpacesDeleteSample.ts
[storagespaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/storageSpacesListByResourceGroupSample.ts
[storagespaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/storageSpacesListBySubscriptionSample.ts
[storagespacesretrievesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/storageSpacesRetrieveSample.ts
[storagespacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/storageSpacesUpdateSample.ts
[virtualnetworkscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksCreateOrUpdateSample.ts
[virtualnetworksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksDeleteSample.ts
[virtualnetworkslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksListByResourceGroupSample.ts
[virtualnetworkslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksListBySubscriptionSample.ts
[virtualnetworksretrievesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksRetrieveSample.ts
[virtualnetworksupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/samples/v1-beta/typescript/src/virtualNetworksUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hybridcontainerservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridcontainerservice/arm-hybridcontainerservice/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
