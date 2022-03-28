# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [containerGroupsCreateOrUpdateSample.js][containergroupscreateorupdatesample]           | Create or update container groups with specified configurations. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsCreateOrUpdate.json                                                                                                                                                                                                                |
| [containerGroupsDeleteSample.js][containergroupsdeletesample]                           | Delete the specified container group in the specified subscription and resource group. The operation does not delete other resources provided by the user, such as volumes. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsDelete.json                                                                                                             |
| [containerGroupsGetSample.js][containergroupsgetsample]                                 | Gets the properties of the specified container group in the specified subscription and resource group. The operation returns the properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsGet_Failed.json |
| [containerGroupsListByResourceGroupSample.js][containergroupslistbyresourcegroupsample] | Get a list of container groups in a specified subscription and resource group. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsListByResourceGroup.json                   |
| [containerGroupsListSample.js][containergroupslistsample]                               | Get a list of container groups in the specified subscription. This operation returns properties of each container group including containers, image registry credentials, restart policy, IP address type, OS type, state, and volumes. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsList.json                                                   |
| [containerGroupsRestartSample.js][containergroupsrestartsample]                         | Restarts all containers in a container group in place. If container image has updates, new image will be downloaded. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsRestart.json                                                                                                                                                                   |
| [containerGroupsStartSample.js][containergroupsstartsample]                             | Starts all containers in a container group. Compute resources will be allocated and billing will start. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsStart.json                                                                                                                                                                                  |
| [containerGroupsStopSample.js][containergroupsstopsample]                               | Stops all containers in a container group. Compute resources will be deallocated and billing will stop. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsStop.json                                                                                                                                                                                   |
| [containerGroupsUpdateSample.js][containergroupsupdatesample]                           | Updates container group tags with specified values. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupsUpdate.json                                                                                                                                                                                                                                     |
| [containersAttachSample.js][containersattachsample]                                     | Attach to the output stream of a specific container instance in a specified resource group and container group. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerAttach.json                                                                                                                                                                               |
| [containersExecuteCommandSample.js][containersexecutecommandsample]                     | Executes a command for a specific container instance in a specified resource group and container group. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerExec.json                                                                                                                                                                                         |
| [containersListLogsSample.js][containerslistlogssample]                                 | Get the logs for a specified container instance in a specified resource group and container group. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerListLogs.json                                                                                                                                                                                          |
| [locationListCachedImagesSample.js][locationlistcachedimagessample]                     | Get the list of cached images on specific OS type for a subscription in a region. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/CachedImagesList.json                                                                                                                                                                                                            |
| [locationListCapabilitiesSample.js][locationlistcapabilitiessample]                     | Get the list of CPU/memory/GPU capabilities of a region. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/CapabilitiesList.json                                                                                                                                                                                                                                     |
| [locationListUsageSample.js][locationlistusagesample]                                   | Get the usage for a subscription x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/ContainerGroupUsage.json                                                                                                                                                                                                                                                          |
| [operationsListSample.js][operationslistsample]                                         | List the operations for Azure Container Instance service. x-ms-original-file: specification/containerinstance/resource-manager/Microsoft.ContainerInstance/stable/2021-10-01/examples/OperationsList.json                                                                                                                                                                                                                                      |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node containerGroupsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node containerGroupsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[containergroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containerGroupsCreateOrUpdateSample.js
[containergroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containerGroupsDeleteSample.js
[containergroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containerGroupsGetSample.js
[containergroupslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containerGroupsListByResourceGroupSample.js
[containergroupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containerGroupsListSample.js
[containergroupsrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containerGroupsRestartSample.js
[containergroupsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containerGroupsStartSample.js
[containergroupsstopsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containerGroupsStopSample.js
[containergroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containerGroupsUpdateSample.js
[containersattachsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containersAttachSample.js
[containersexecutecommandsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containersExecuteCommandSample.js
[containerslistlogssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/containersListLogsSample.js
[locationlistcachedimagessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/locationListCachedImagesSample.js
[locationlistcapabilitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/locationListCapabilitiesSample.js
[locationlistusagesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/locationListUsageSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/containerinstance/arm-containerinstance/samples/v8/javascript/operationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-containerinstance?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/containerinstance/arm-containerinstance/README.md
