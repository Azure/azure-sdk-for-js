# @azure/arm-computefleet client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-computefleet in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                               |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [fleetsCancelSample.ts][fleetscancelsample]                                           | cancels an instance Fleet creation that is in progress. x-ms-original-file: 2025-07-01-preview/Fleets_Cancel.json             |
| [fleetsCreateOrUpdateSample.ts][fleetscreateorupdatesample]                           | create a Fleet x-ms-original-file: 2025-07-01-preview/Fleets_CreateOrUpdate.json                                              |
| [fleetsDeleteSample.ts][fleetsdeletesample]                                           | delete a Fleet x-ms-original-file: 2025-07-01-preview/Fleets_Delete.json                                                      |
| [fleetsGetSample.ts][fleetsgetsample]                                                 | get a Fleet x-ms-original-file: 2025-07-01-preview/Fleets_Get.json                                                            |
| [fleetsListByResourceGroupSample.ts][fleetslistbyresourcegroupsample]                 | list Fleet resources by resource group x-ms-original-file: 2025-07-01-preview/Fleets_ListByResourceGroup.json                 |
| [fleetsListBySubscriptionSample.ts][fleetslistbysubscriptionsample]                   | list Fleet resources by subscription ID x-ms-original-file: 2025-07-01-preview/Fleets_ListBySubscription.json                 |
| [fleetsListVirtualMachineScaleSetsSample.ts][fleetslistvirtualmachinescalesetssample] | list VirtualMachineScaleSet resources by Fleet x-ms-original-file: 2025-07-01-preview/Fleets_ListVirtualMachineScaleSets.json |
| [fleetsListVirtualMachinesSample.ts][fleetslistvirtualmachinessample]                 | list VirtualMachine resources of an instance Fleet. x-ms-original-file: 2025-07-01-preview/Fleets_ListVirtualMachines.json    |
| [fleetsUpdateSample.ts][fleetsupdatesample]                                           | update a Fleet x-ms-original-file: 2025-07-01-preview/Fleets_Update.json                                                      |
| [operationsListSample.ts][operationslistsample]                                       | list the operations for the provider x-ms-original-file: 2025-07-01-preview/Operations_List.json                              |

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
node dist/fleetsCancelSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/fleetsCancelSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[fleetscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/fleetsCancelSample.ts
[fleetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/fleetsCreateOrUpdateSample.ts
[fleetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/fleetsDeleteSample.ts
[fleetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/fleetsGetSample.ts
[fleetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/fleetsListByResourceGroupSample.ts
[fleetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/fleetsListBySubscriptionSample.ts
[fleetslistvirtualmachinescalesetssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/fleetsListVirtualMachineScaleSetsSample.ts
[fleetslistvirtualmachinessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/fleetsListVirtualMachinesSample.ts
[fleetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/fleetsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computefleet/arm-computefleet/samples/v2-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computefleet?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computefleet/arm-computefleet/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
