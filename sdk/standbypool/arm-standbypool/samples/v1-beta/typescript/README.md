# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                                 | **Description**                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.ts][operationslistsample]                                                                                               | List the operations for the provider x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/Operations_List.json                                                                                             |
| [standbyContainerGroupPoolsCreateOrUpdateSample.ts][standbycontainergrouppoolscreateorupdatesample]                                           | Create a StandbyContainerGroupPoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_CreateOrUpdate.json                                                             |
| [standbyContainerGroupPoolsDeleteSample.ts][standbycontainergrouppoolsdeletesample]                                                           | Delete a StandbyContainerGroupPoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_Delete.json                                                                     |
| [standbyContainerGroupPoolsGetSample.ts][standbycontainergrouppoolsgetsample]                                                                 | Get a StandbyContainerGroupPoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_Get.json                                                                           |
| [standbyContainerGroupPoolsListByResourceGroupSample.ts][standbycontainergrouppoolslistbyresourcegroupsample]                                 | List StandbyContainerGroupPoolResource resources by resource group x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_ListByResourceGroup.json                                |
| [standbyContainerGroupPoolsListBySubscriptionSample.ts][standbycontainergrouppoolslistbysubscriptionsample]                                   | List StandbyContainerGroupPoolResource resources by subscription ID x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_ListBySubscription.json                                |
| [standbyContainerGroupPoolsUpdateSample.ts][standbycontainergrouppoolsupdatesample]                                                           | Update a StandbyContainerGroupPoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyContainerGroupPools_Update.json                                                                     |
| [standbyVirtualMachinePoolsCreateOrUpdateSample.ts][standbyvirtualmachinepoolscreateorupdatesample]                                           | Create a StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_CreateOrUpdate.json                                                             |
| [standbyVirtualMachinePoolsDeleteSample.ts][standbyvirtualmachinepoolsdeletesample]                                                           | Delete a StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_Delete.json                                                                     |
| [standbyVirtualMachinePoolsGetSample.ts][standbyvirtualmachinepoolsgetsample]                                                                 | Get a StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_Get.json                                                                           |
| [standbyVirtualMachinePoolsListByResourceGroupSample.ts][standbyvirtualmachinepoolslistbyresourcegroupsample]                                 | List StandbyVirtualMachinePoolResource resources by resource group x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_ListByResourceGroup.json                                |
| [standbyVirtualMachinePoolsListBySubscriptionSample.ts][standbyvirtualmachinepoolslistbysubscriptionsample]                                   | List StandbyVirtualMachinePoolResource resources by subscription ID x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_ListBySubscription.json                                |
| [standbyVirtualMachinePoolsUpdateSample.ts][standbyvirtualmachinepoolsupdatesample]                                                           | Update a StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachinePools_Update.json                                                                     |
| [standbyVirtualMachinesGetSample.ts][standbyvirtualmachinesgetsample]                                                                         | Get a StandbyVirtualMachineResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachines_Get.json                                                                                   |
| [standbyVirtualMachinesListByStandbyVirtualMachinePoolResourceSample.ts][standbyvirtualmachineslistbystandbyvirtualmachinepoolresourcesample] | List StandbyVirtualMachineResource resources by StandbyVirtualMachinePoolResource x-ms-original-file: specification/standbypool/resource-manager/Microsoft.StandbyPool/preview/2023-12-01-preview/examples/StandbyVirtualMachines_ListByStandbyVirtualMachinePoolResource.json |

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
npx cross-env STANDBYPOOL_SUBSCRIPTION_ID="<standbypool subscription id>" node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/operationsListSample.ts
[standbycontainergrouppoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyContainerGroupPoolsCreateOrUpdateSample.ts
[standbycontainergrouppoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyContainerGroupPoolsDeleteSample.ts
[standbycontainergrouppoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyContainerGroupPoolsGetSample.ts
[standbycontainergrouppoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyContainerGroupPoolsListByResourceGroupSample.ts
[standbycontainergrouppoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyContainerGroupPoolsListBySubscriptionSample.ts
[standbycontainergrouppoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyContainerGroupPoolsUpdateSample.ts
[standbyvirtualmachinepoolscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyVirtualMachinePoolsCreateOrUpdateSample.ts
[standbyvirtualmachinepoolsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyVirtualMachinePoolsDeleteSample.ts
[standbyvirtualmachinepoolsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyVirtualMachinePoolsGetSample.ts
[standbyvirtualmachinepoolslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyVirtualMachinePoolsListByResourceGroupSample.ts
[standbyvirtualmachinepoolslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyVirtualMachinePoolsListBySubscriptionSample.ts
[standbyvirtualmachinepoolsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyVirtualMachinePoolsUpdateSample.ts
[standbyvirtualmachinesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyVirtualMachinesGetSample.ts
[standbyvirtualmachineslistbystandbyvirtualmachinepoolresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/standbypool/arm-standbypool/samples/v1-beta/typescript/src/standbyVirtualMachinesListByStandbyVirtualMachinePoolResourceSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-standbypool?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/standbypool/arm-standbypool/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
