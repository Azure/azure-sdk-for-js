# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                             | **Description**                                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [monitorsCreateSample.ts][monitorscreatesample]                           | Creates a SAP monitor for the specified subscription, resource group, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_Create.json                                                     |
| [monitorsDeleteSample.ts][monitorsdeletesample]                           | Deletes a SAP monitor with the specified subscription, resource group, and monitor name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_Delete.json                                                     |
| [monitorsGetSample.ts][monitorsgetsample]                                 | Gets properties of a SAP monitor for the specified subscription, resource group, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_Get.json                                             |
| [monitorsListByResourceGroupSample.ts][monitorslistbyresourcegroupsample] | Gets a list of SAP monitors in the specified resource group. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_ListByRG.json                                                                               |
| [monitorsListSample.ts][monitorslistsample]                               | Gets a list of SAP monitors in the specified subscription. The operations returns various properties of each SAP monitor. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_List.json                      |
| [monitorsUpdateSample.ts][monitorsupdatesample]                           | Patches the Tags field of a SAP monitor for the specified subscription, resource group, and monitor name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/monitors_PatchTags_Delete.json                          |
| [operationsListSample.ts][operationslistsample]                           | Lists all the available API operations under this PR x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/Operations_List.json                                                                                                         |
| [providerInstancesCreateSample.ts][providerinstancescreatesample]         | Creates a provider instance for the specified subscription, resource group, Monitor name, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/Db2ProviderInstances_Create.json                     |
| [providerInstancesDeleteSample.ts][providerinstancesdeletesample]         | Deletes a provider instance for the specified subscription, resource group, Monitor name, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/ProviderInstances_Delete.json                        |
| [providerInstancesGetSample.ts][providerinstancesgetsample]               | Gets properties of a provider instance for the specified subscription, resource group, Monitor name, and resource name. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/Db2ProviderInstances_Get.json             |
| [providerInstancesListSample.ts][providerinstanceslistsample]             | Gets a list of provider instances in the specified SAP monitor. The operations returns various properties of each provider instances. x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/preview/2021-12-01-preview/examples/workloadmonitor/ProviderInstances_List.json |

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
node dist/monitorsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/monitorsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[monitorscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/monitorsCreateSample.ts
[monitorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/monitorsDeleteSample.ts
[monitorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/monitorsGetSample.ts
[monitorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/monitorsListByResourceGroupSample.ts
[monitorslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/monitorsListSample.ts
[monitorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/monitorsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/operationsListSample.ts
[providerinstancescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/providerInstancesCreateSample.ts
[providerinstancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/providerInstancesDeleteSample.ts
[providerinstancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/providerInstancesGetSample.ts
[providerinstanceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloads/arm-workloads/samples/v1-beta/typescript/src/providerInstancesListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-workloads?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/workloads/arm-workloads/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
