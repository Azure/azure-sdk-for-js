# @azure/arm-containerorchestratorruntime client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-containerorchestratorruntime in some common scenarios.

| **File Name**                                                             | **Description**                                                                                     |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [bgpPeersCreateOrUpdateSample.js][bgppeerscreateorupdatesample]           | create a BgpPeer x-ms-original-file: 2024-03-01/BgpPeers_CreateOrUpdate.json                        |
| [bgpPeersDeleteSample.js][bgppeersdeletesample]                           | delete a BgpPeer x-ms-original-file: 2024-03-01/BgpPeers_Delete.json                                |
| [bgpPeersGetSample.js][bgppeersgetsample]                                 | get a BgpPeer x-ms-original-file: 2024-03-01/BgpPeers_Get.json                                      |
| [bgpPeersListSample.js][bgppeerslistsample]                               | list BgpPeer resources by parent x-ms-original-file: 2024-03-01/BgpPeers_List.json                  |
| [loadBalancersCreateOrUpdateSample.js][loadbalancerscreateorupdatesample] | create a LoadBalancer x-ms-original-file: 2024-03-01/LoadBalancers_CreateOrUpdate.json              |
| [loadBalancersDeleteSample.js][loadbalancersdeletesample]                 | delete a LoadBalancer x-ms-original-file: 2024-03-01/LoadBalancers_Delete.json                      |
| [loadBalancersGetSample.js][loadbalancersgetsample]                       | get a LoadBalancer x-ms-original-file: 2024-03-01/LoadBalancers_Get.json                            |
| [loadBalancersListSample.js][loadbalancerslistsample]                     | list LoadBalancer resources by parent x-ms-original-file: 2024-03-01/LoadBalancers_List.json        |
| [operationsListSample.js][operationslistsample]                           | list the operations for the provider x-ms-original-file: 2024-03-01/Operations_List.json            |
| [servicesCreateOrUpdateSample.js][servicescreateorupdatesample]           | create a ServiceResource x-ms-original-file: 2024-03-01/Services_CreateOrUpdate.json                |
| [servicesDeleteSample.js][servicesdeletesample]                           | delete a ServiceResource x-ms-original-file: 2024-03-01/Services_Delete.json                        |
| [servicesGetSample.js][servicesgetsample]                                 | get a ServiceResource x-ms-original-file: 2024-03-01/Services_Get.json                              |
| [servicesListSample.js][serviceslistsample]                               | list ServiceResource resources by parent x-ms-original-file: 2024-03-01/Services_List.json          |
| [storageClassCreateOrUpdateSample.js][storageclasscreateorupdatesample]   | create a StorageClassResource x-ms-original-file: 2024-03-01/StorageClass_CreateOrUpdate.json       |
| [storageClassDeleteSample.js][storageclassdeletesample]                   | delete a StorageClassResource x-ms-original-file: 2024-03-01/StorageClass_Delete.json               |
| [storageClassGetSample.js][storageclassgetsample]                         | get a StorageClassResource x-ms-original-file: 2024-03-01/StorageClass_Get.json                     |
| [storageClassListSample.js][storageclasslistsample]                       | list StorageClassResource resources by parent x-ms-original-file: 2024-03-01/StorageClass_List.json |
| [storageClassUpdateSample.js][storageclassupdatesample]                   | update a StorageClassResource x-ms-original-file: 2024-03-01/StorageClass_Update.json               |

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
node bgpPeersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node bgpPeersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bgppeerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/bgpPeersCreateOrUpdateSample.js
[bgppeersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/bgpPeersDeleteSample.js
[bgppeersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/bgpPeersGetSample.js
[bgppeerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/bgpPeersListSample.js
[loadbalancerscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/loadBalancersCreateOrUpdateSample.js
[loadbalancersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/loadBalancersDeleteSample.js
[loadbalancersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/loadBalancersGetSample.js
[loadbalancerslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/loadBalancersListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/operationsListSample.js
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/servicesCreateOrUpdateSample.js
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/servicesDeleteSample.js
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/servicesGetSample.js
[serviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/servicesListSample.js
[storageclasscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/storageClassCreateOrUpdateSample.js
[storageclassdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/storageClassDeleteSample.js
[storageclassgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/storageClassGetSample.js
[storageclasslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/storageClassListSample.js
[storageclassupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/samples/v1-beta/javascript/storageClassUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-containerorchestratorruntime?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesruntime/arm-containerorchestratorruntime/README.md
