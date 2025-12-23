# @azure/arm-containerorchestratorruntime client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-containerorchestratorruntime in some common scenarios.

| **File Name**                                                             | **Description**                                                                                     |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [bgpPeersCreateOrUpdateSample.ts][bgppeerscreateorupdatesample]           | create a BgpPeer x-ms-original-file: 2024-03-01/BgpPeers_CreateOrUpdate.json                        |
| [bgpPeersDeleteSample.ts][bgppeersdeletesample]                           | delete a BgpPeer x-ms-original-file: 2024-03-01/BgpPeers_Delete.json                                |
| [bgpPeersGetSample.ts][bgppeersgetsample]                                 | get a BgpPeer x-ms-original-file: 2024-03-01/BgpPeers_Get.json                                      |
| [bgpPeersListSample.ts][bgppeerslistsample]                               | list BgpPeer resources by parent x-ms-original-file: 2024-03-01/BgpPeers_List.json                  |
| [loadBalancersCreateOrUpdateSample.ts][loadbalancerscreateorupdatesample] | create a LoadBalancer x-ms-original-file: 2024-03-01/LoadBalancers_CreateOrUpdate.json              |
| [loadBalancersDeleteSample.ts][loadbalancersdeletesample]                 | delete a LoadBalancer x-ms-original-file: 2024-03-01/LoadBalancers_Delete.json                      |
| [loadBalancersGetSample.ts][loadbalancersgetsample]                       | get a LoadBalancer x-ms-original-file: 2024-03-01/LoadBalancers_Get.json                            |
| [loadBalancersListSample.ts][loadbalancerslistsample]                     | list LoadBalancer resources by parent x-ms-original-file: 2024-03-01/LoadBalancers_List.json        |
| [operationsListSample.ts][operationslistsample]                           | list the operations for the provider x-ms-original-file: 2024-03-01/Operations_List.json            |
| [servicesCreateOrUpdateSample.ts][servicescreateorupdatesample]           | create a ServiceResource x-ms-original-file: 2024-03-01/Services_CreateOrUpdate.json                |
| [servicesDeleteSample.ts][servicesdeletesample]                           | delete a ServiceResource x-ms-original-file: 2024-03-01/Services_Delete.json                        |
| [servicesGetSample.ts][servicesgetsample]                                 | get a ServiceResource x-ms-original-file: 2024-03-01/Services_Get.json                              |
| [servicesListSample.ts][serviceslistsample]                               | list ServiceResource resources by parent x-ms-original-file: 2024-03-01/Services_List.json          |
| [storageClassCreateOrUpdateSample.ts][storageclasscreateorupdatesample]   | create a StorageClassResource x-ms-original-file: 2024-03-01/StorageClass_CreateOrUpdate.json       |
| [storageClassDeleteSample.ts][storageclassdeletesample]                   | delete a StorageClassResource x-ms-original-file: 2024-03-01/StorageClass_Delete.json               |
| [storageClassGetSample.ts][storageclassgetsample]                         | get a StorageClassResource x-ms-original-file: 2024-03-01/StorageClass_Get.json                     |
| [storageClassListSample.ts][storageclasslistsample]                       | list StorageClassResource resources by parent x-ms-original-file: 2024-03-01/StorageClass_List.json |
| [storageClassUpdateSample.ts][storageclassupdatesample]                   | update a StorageClassResource x-ms-original-file: 2024-03-01/StorageClass_Update.json               |

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
node dist/bgpPeersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/bgpPeersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bgppeerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/bgpPeersCreateOrUpdateSample.ts
[bgppeersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/bgpPeersDeleteSample.ts
[bgppeersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/bgpPeersGetSample.ts
[bgppeerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/bgpPeersListSample.ts
[loadbalancerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/loadBalancersCreateOrUpdateSample.ts
[loadbalancersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/loadBalancersDeleteSample.ts
[loadbalancersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/loadBalancersGetSample.ts
[loadbalancerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/loadBalancersListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/operationsListSample.ts
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/servicesCreateOrUpdateSample.ts
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/servicesDeleteSample.ts
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/servicesGetSample.ts
[serviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/servicesListSample.ts
[storageclasscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/storageClassCreateOrUpdateSample.ts
[storageclassdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/storageClassDeleteSample.ts
[storageclassgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/storageClassGetSample.ts
[storageclasslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/storageClassListSample.ts
[storageclassupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/typescript/src/storageClassUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerorchestratorruntime?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
