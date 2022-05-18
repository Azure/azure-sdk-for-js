# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [monitorsCreateSample.js][monitorscreatesample]                           | Creates a SAP monitor for the specified subscription, resource group, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_Create.json                                                     |
| [monitorsDeleteSample.js][monitorsdeletesample]                           | Deletes a SAP monitor with the specified subscription, resource group, and monitor name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_Delete.json                                                     |
| [monitorsGetSample.js][monitorsgetsample]                                 | Gets properties of a SAP monitor for the specified subscription, resource group, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_Get.json                                             |
| [monitorsListByResourceGroupSample.js][monitorslistbyresourcegroupsample] | Gets a list of SAP monitors in the specified resource group. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_ListByRG.json                                                                               |
| [monitorsListSample.js][monitorslistsample]                               | Gets a list of SAP monitors in the specified subscription. The operations returns various properties of each SAP monitor. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_List.json                      |
| [monitorsUpdateSample.js][monitorsupdatesample]                           | Patches the Tags field of a SAP monitor for the specified subscription, resource group, and monitor name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_PatchTags_Delete.json                          |
| [operationsListSample.js][operationslistsample]                           | Lists all the available API operations under this PR x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/Operations_List.json                                                                                                         |
| [providerInstancesCreateSample.js][providerinstancescreatesample]         | Creates a provider instance for the specified subscription, resource group, Monitor name, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/Db2ProviderInstances_Create.json                     |
| [providerInstancesDeleteSample.js][providerinstancesdeletesample]         | Deletes a provider instance for the specified subscription, resource group, Monitor name, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/ProviderInstances_Delete.json                        |
| [providerInstancesGetSample.js][providerinstancesgetsample]               | Gets properties of a provider instance for the specified subscription, resource group, Monitor name, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/Db2ProviderInstances_Get.json             |
| [providerInstancesListSample.js][providerinstanceslistsample]             | Gets a list of provider instances in the specified SAP monitor. The operations returns various properties of each provider instances. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/ProviderInstances_List.json |

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
node monitorsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node monitorsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[monitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/monitorsCreateSample.js
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/monitorsDeleteSample.js
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/monitorsGetSample.js
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/monitorsListByResourceGroupSample.js
[monitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/monitorsListSample.js
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/monitorsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/operationsListSample.js
[providerinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/providerInstancesCreateSample.js
[providerinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/providerInstancesDeleteSample.js
[providerinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/providerInstancesGetSample.js
[providerinstanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/javascript/providerInstancesListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-workloads?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/workloads/arm-workloads/README.md
