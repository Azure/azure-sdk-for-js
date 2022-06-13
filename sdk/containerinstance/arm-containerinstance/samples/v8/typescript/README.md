# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [containerGroupsCreateOrUpdateSample.ts][containergroupscreateorupdatesample]           | Create or update container groups with specified configurations. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsCreateOrUpdate.json                                                                                                                                                                                                                |
| [containerGroupsDeleteSample.ts][containergroupsdeletesample]                           | Delete the specified container group in the specified subscription and resource group. The operation does not delete other resources provided by the user, such as volumes. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsDelete.json                                                                                                             |
| [containerGroupsGetSample.ts][containergroupsgetsample]                                 | Gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsGet_Failed.json |
| [containerGroupsListByResourceGroupSample.ts][containergroupslistbyresourcegroupsample] | Get a list of container groups in a specified subscription and resource group. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsListByResourceGroup.json                   |
| [containerGroupsListSample.ts][containergroupslistsample]                               | Get a list of container groups in the specified subscription. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsList.json                                                   |
| [containerGroupsRestartSample.ts][containergroupsrestartsample]                         | Restarts all containers in a container group in place. If container image has updates, new image will be downloaded. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsRestart.json                                                                                                                                                                   |
| [containerGroupsStartSample.ts][containergroupsstartsample]                             | Starts all containers in a container group. Compute resources will be allocated and billing will start. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsStart.json                                                                                                                                                                                  |
| [containerGroupsStopSample.ts][containergroupsstopsample]                               | Stops all containers in a container group. Compute resources will be deallocated and billing will stop. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsStop.json                                                                                                                                                                                   |
| [containerGroupsUpdateSample.ts][containergroupsupdatesample]                           | Updates container group tags with specified values. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsUpdate.json                                                                                                                                                                                                                                     |
| [containersAttachSample.ts][containersattachsample]                                     | Attach to the output stream of a specific container instance in a specified resource group and container group. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerAttach.json                                                                                                                                                                               |
| [containersExecuteCommandSample.ts][containersexecutecommandsample]                     | Executes a command for a specific container instance in a specified resource group and container group. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerExec.json                                                                                                                                                                                         |
| [containersListLogsSample.ts][containerslistlogssample]                                 | Get the logs for a specified container instance in a specified resource group and container group. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerListLogs.json                                                                                                                                                                                          |
| [locationListCachedImagesSample.ts][locationlistcachedimagessample]                     | Get the list of cached images on specific OS type for a subscription in a region. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/CachedImagesList.json                                                                                                                                                                                                            |
| [locationListCapabilitiesSample.ts][locationlistcapabilitiessample]                     | Get the list of CPU/memory/GPU capabilities of a region. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/CapabilitiesList.json                                                                                                                                                                                                                                     |
| [locationListUsageSample.ts][locationlistusagesample]                                   | Get the usage for a subscription x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupUsage.json                                                                                                                                                                                                                                                          |
| [operationsListSample.ts][operationslistsample]                                         | List the operations for Azure Container Instance service. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/OperationsList.json                                                                                                                                                                                                                                      |

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
node dist/containerGroupsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/containerGroupsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[containergroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containerGroupsCreateOrUpdateSample.ts
[containergroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containerGroupsDeleteSample.ts
[containergroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containerGroupsGetSample.ts
[containergroupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containerGroupsListByResourceGroupSample.ts
[containergroupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containerGroupsListSample.ts
[containergroupsrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containerGroupsRestartSample.ts
[containergroupsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containerGroupsStartSample.ts
[containergroupsstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containerGroupsStopSample.ts
[containergroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containerGroupsUpdateSample.ts
[containersattachsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containersAttachSample.ts
[containersexecutecommandsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containersExecuteCommandSample.ts
[containerslistlogssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/containersListLogsSample.ts
[locationlistcachedimagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/locationListCachedImagesSample.ts
[locationlistcapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/locationListCapabilitiesSample.ts
[locationlistusagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/locationListUsageSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/typescript/src/operationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-containerinstance?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerinstance/arm-containerinstance/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
