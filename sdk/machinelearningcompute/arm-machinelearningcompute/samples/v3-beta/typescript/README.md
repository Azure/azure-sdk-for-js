# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                             | **Description**                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [checkUpdateForAnOperationalizationCluster.ts][checkupdateforanoperationalizationcluster]                 | Checks if updates are available for system services in the cluster. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_CheckSystemServicesUpdatesAvailable.json                                                                       |
| [deleteOperationalizationCluster.ts][deleteoperationalizationcluster]                                     | Deletes the specified cluster. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_Delete.json                                                                                                                                         |
| [getOperationalizationCluster.ts][getoperationalizationcluster]                                           | Gets the operationalization cluster resource view. Note that the credentials are not returned by this call. Call ListKeys to get them. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_Get.json                                    |
| [listKeysOfAnOperationalizationCluster.ts][listkeysofanoperationalizationcluster]                         | Gets the credentials for the specified cluster such as Storage, ACR and ACS credentials. This is a long running operation because it fetches keys from dependencies. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_ListKeys.json |
| [listOperationalizationClustersByResourceGroup.ts][listoperationalizationclustersbyresourcegroup]         | Gets the clusters in the specified resource group. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_ListByResourceGroup.json                                                                                                        |
| [listOperationalizationClustersBySubscription.ts][listoperationalizationclustersbysubscription]           | Gets the operationalization clusters in the specified subscription. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_ListBySubscription.json                                                                                        |
| [machineLearningComputeListAvailableOperations.ts][machinelearningcomputelistavailableoperations]         | Gets all available operations. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/MachineLearningCompute_ListAvailableOperations.json                                                                                                                            |
| [patchOperationalizationCluster.ts][patchoperationalizationcluster]                                       | The PATCH operation can be used to update only the tags for a cluster. Use PUT operation to update other properties. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_Update.json                                                   |
| [putOperationalizationCluster.ts][putoperationalizationcluster]                                           | Create or update an operationalization cluster. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_CreateOrUpdate.json                                                                                                                |
| [updateSystemServicesInAnOperationalizationCluster.ts][updatesystemservicesinanoperationalizationcluster] | Updates system services in a cluster. x-ms-original-file: specification/machinelearningcompute/resource-manager/Microsoft.MachineLearningCompute/preview/2017-08-01-preview/examples/OperationalizationClusters_UpdateSystemServices.json                                                                                                                    |

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
node dist/checkUpdateForAnOperationalizationCluster.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/checkUpdateForAnOperationalizationCluster.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checkupdateforanoperationalizationcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/checkUpdateForAnOperationalizationCluster.ts
[deleteoperationalizationcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/deleteOperationalizationCluster.ts
[getoperationalizationcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/getOperationalizationCluster.ts
[listkeysofanoperationalizationcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/listKeysOfAnOperationalizationCluster.ts
[listoperationalizationclustersbyresourcegroup]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/listOperationalizationClustersByResourceGroup.ts
[listoperationalizationclustersbysubscription]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/listOperationalizationClustersBySubscription.ts
[machinelearningcomputelistavailableoperations]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/machineLearningComputeListAvailableOperations.ts
[patchoperationalizationcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/patchOperationalizationCluster.ts
[putoperationalizationcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/putOperationalizationCluster.ts
[updatesystemservicesinanoperationalizationcluster]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/machinelearningcompute/arm-machinelearningcompute/samples/v3-beta/typescript/src/updateSystemServicesInAnOperationalizationCluster.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-machinelearningcompute?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/machinelearningcompute/arm-machinelearningcompute/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
