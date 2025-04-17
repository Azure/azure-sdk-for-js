# @azure/arm-standbypool client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-standbypool in some common scenarios.

| **File Name**                                                                                                                                 | **Description**                                                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                                                               | list the operations for the provider x-ms-original-file: 2025-03-01/Operations_List.json                                                                                                     |
| [standbyContainerGroupPoolRuntimeViewsGetSample.ts][standbycontainergrouppoolruntimeviewsgetsample]                                           | get a StandbyContainerGroupPoolRuntimeViewResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPoolRuntimeViews_Get.json                                                             |
| [standbyContainerGroupPoolRuntimeViewsListByStandbyPoolSample.ts][standbycontainergrouppoolruntimeviewslistbystandbypoolsample]               | list StandbyContainerGroupPoolRuntimeViewResource resources by StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPoolRuntimeViews_ListByStandbyPool.json |
| [standbyContainerGroupPoolsCreateOrUpdateSample.ts][standbycontainergrouppoolscreateorupdatesample]                                           | create a StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_CreateOrUpdate.json                                                                     |
| [standbyContainerGroupPoolsDeleteSample.ts][standbycontainergrouppoolsdeletesample]                                                           | delete a StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Delete.json                                                                             |
| [standbyContainerGroupPoolsGetSample.ts][standbycontainergrouppoolsgetsample]                                                                 | get a StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Get.json                                                                                   |
| [standbyContainerGroupPoolsListByResourceGroupSample.ts][standbycontainergrouppoolslistbyresourcegroupsample]                                 | list StandbyContainerGroupPoolResource resources by resource group x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_ListByResourceGroup.json                                        |
| [standbyContainerGroupPoolsListBySubscriptionSample.ts][standbycontainergrouppoolslistbysubscriptionsample]                                   | list StandbyContainerGroupPoolResource resources by subscription ID x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_ListBySubscription.json                                        |
| [standbyContainerGroupPoolsUpdateSample.ts][standbycontainergrouppoolsupdatesample]                                                           | update a StandbyContainerGroupPoolResource x-ms-original-file: 2025-03-01/StandbyContainerGroupPools_Update.json                                                                             |
| [standbyVirtualMachinePoolRuntimeViewsGetSample.ts][standbyvirtualmachinepoolruntimeviewsgetsample]                                           | get a StandbyVirtualMachinePoolRuntimeViewResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePoolRuntimeViews_Get.json                                                             |
| [standbyVirtualMachinePoolRuntimeViewsListByStandbyPoolSample.ts][standbyvirtualmachinepoolruntimeviewslistbystandbypoolsample]               | list StandbyVirtualMachinePoolRuntimeViewResource resources by StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePoolRuntimeViews_ListByStandbyPool.json |
| [standbyVirtualMachinePoolsCreateOrUpdateSample.ts][standbyvirtualmachinepoolscreateorupdatesample]                                           | create a StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_CreateOrUpdate.json                                                                     |
| [standbyVirtualMachinePoolsDeleteSample.ts][standbyvirtualmachinepoolsdeletesample]                                                           | delete a StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Delete.json                                                                             |
| [standbyVirtualMachinePoolsGetSample.ts][standbyvirtualmachinepoolsgetsample]                                                                 | get a StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Get.json                                                                                   |
| [standbyVirtualMachinePoolsListByResourceGroupSample.ts][standbyvirtualmachinepoolslistbyresourcegroupsample]                                 | list StandbyVirtualMachinePoolResource resources by resource group x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_ListByResourceGroup.json                                        |
| [standbyVirtualMachinePoolsListBySubscriptionSample.ts][standbyvirtualmachinepoolslistbysubscriptionsample]                                   | list StandbyVirtualMachinePoolResource resources by subscription ID x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_ListBySubscription.json                                        |
| [standbyVirtualMachinePoolsUpdateSample.ts][standbyvirtualmachinepoolsupdatesample]                                                           | update a StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachinePools_Update.json                                                                             |
| [standbyVirtualMachinesGetSample.ts][standbyvirtualmachinesgetsample]                                                                         | get a StandbyVirtualMachineResource x-ms-original-file: 2025-03-01/StandbyVirtualMachines_Get.json                                                                                           |
| [standbyVirtualMachinesListByStandbyVirtualMachinePoolResourceSample.ts][standbyvirtualmachineslistbystandbyvirtualmachinepoolresourcesample] | list StandbyVirtualMachineResource resources by StandbyVirtualMachinePoolResource x-ms-original-file: 2025-03-01/StandbyVirtualMachines_ListByStandbyVirtualMachinePoolResource.json         |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/operationsListSample.ts
[standbycontainergrouppoolruntimeviewsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyContainerGroupPoolRuntimeViewsGetSample.ts
[standbycontainergrouppoolruntimeviewslistbystandbypoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyContainerGroupPoolRuntimeViewsListByStandbyPoolSample.ts
[standbycontainergrouppoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyContainerGroupPoolsCreateOrUpdateSample.ts
[standbycontainergrouppoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyContainerGroupPoolsDeleteSample.ts
[standbycontainergrouppoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyContainerGroupPoolsGetSample.ts
[standbycontainergrouppoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyContainerGroupPoolsListByResourceGroupSample.ts
[standbycontainergrouppoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyContainerGroupPoolsListBySubscriptionSample.ts
[standbycontainergrouppoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyContainerGroupPoolsUpdateSample.ts
[standbyvirtualmachinepoolruntimeviewsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinePoolRuntimeViewsGetSample.ts
[standbyvirtualmachinepoolruntimeviewslistbystandbypoolsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinePoolRuntimeViewsListByStandbyPoolSample.ts
[standbyvirtualmachinepoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinePoolsCreateOrUpdateSample.ts
[standbyvirtualmachinepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinePoolsDeleteSample.ts
[standbyvirtualmachinepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinePoolsGetSample.ts
[standbyvirtualmachinepoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinePoolsListByResourceGroupSample.ts
[standbyvirtualmachinepoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinePoolsListBySubscriptionSample.ts
[standbyvirtualmachinepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinePoolsUpdateSample.ts
[standbyvirtualmachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinesGetSample.ts
[standbyvirtualmachineslistbystandbyvirtualmachinepoolresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1/typescript/src/standbyVirtualMachinesListByStandbyVirtualMachinePoolResourceSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-standbypool?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/standbypool/arm-standbypool/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
