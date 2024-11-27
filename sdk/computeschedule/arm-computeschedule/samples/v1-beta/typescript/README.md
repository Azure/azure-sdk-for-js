# @azure/arm-computeschedule client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-computeschedule in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                                       | list the operations for the provider x-ms-original-file: 2024-08-15-preview/Operations_List_MaximumSet_Gen.json                                                                                                       |
| [scheduledActionsVirtualMachinesCancelOperationsSample.ts][scheduledactionsvirtualmachinescanceloperationssample]     | virtualMachinesCancelOperations: cancelOperations for a virtual machine x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json                                   |
| [scheduledActionsVirtualMachinesExecuteDeallocateSample.ts][scheduledactionsvirtualmachinesexecutedeallocatesample]   | virtualMachinesExecuteDeallocate: executeDeallocate for a virtual machine x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesExecuteDeallocate_MaximumSet_Gen.json                                |
| [scheduledActionsVirtualMachinesExecuteHibernateSample.ts][scheduledactionsvirtualmachinesexecutehibernatesample]     | virtualMachinesExecuteHibernate: executeHibernate for a virtual machine x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesExecuteHibernate_MaximumSet_Gen.json                                   |
| [scheduledActionsVirtualMachinesExecuteStartSample.ts][scheduledactionsvirtualmachinesexecutestartsample]             | virtualMachinesExecuteStart: executeStart for a virtual machine x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesExecuteStart_MaximumSet_Gen.json                                               |
| [scheduledActionsVirtualMachinesGetOperationErrorsSample.ts][scheduledactionsvirtualmachinesgetoperationerrorssample] | virtualMachinesGetOperationErrors: getOperationErrors associated with an operation on a virtual machine x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesGetOperationErrors_MaximumSet_Gen.json |
| [scheduledActionsVirtualMachinesGetOperationStatusSample.ts][scheduledactionsvirtualmachinesgetoperationstatussample] | virtualMachinesGetOperationStatus: getOperationStatus for a virtual machine x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json                             |
| [scheduledActionsVirtualMachinesSubmitDeallocateSample.ts][scheduledactionsvirtualmachinessubmitdeallocatesample]     | virtualMachinesSubmitDeallocate: submitDeallocate for a virtual machine x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesSubmitDeallocate_MaximumSet_Gen.json                                   |
| [scheduledActionsVirtualMachinesSubmitHibernateSample.ts][scheduledactionsvirtualmachinessubmithibernatesample]       | virtualMachinesSubmitHibernate: submitHibernate for a virtual machine x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesSubmitHibernate_MaximumSet_Gen.json                                      |
| [scheduledActionsVirtualMachinesSubmitStartSample.ts][scheduledactionsvirtualmachinessubmitstartsample]               | virtualMachinesSubmitStart: submitStart for a virtual machine x-ms-original-file: 2024-08-15-preview/ScheduledActions_VirtualMachinesSubmitStart_MaximumSet_Gen.json                                                  |

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

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/operationsListSample.ts
[scheduledactionsvirtualmachinescanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesCancelOperationsSample.ts
[scheduledactionsvirtualmachinesexecutedeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesExecuteDeallocateSample.ts
[scheduledactionsvirtualmachinesexecutehibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesExecuteHibernateSample.ts
[scheduledactionsvirtualmachinesexecutestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesExecuteStartSample.ts
[scheduledactionsvirtualmachinesgetoperationerrorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesGetOperationErrorsSample.ts
[scheduledactionsvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesGetOperationStatusSample.ts
[scheduledactionsvirtualmachinessubmitdeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesSubmitDeallocateSample.ts
[scheduledactionsvirtualmachinessubmithibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesSubmitHibernateSample.ts
[scheduledactionsvirtualmachinessubmitstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesSubmitStartSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-computeschedule?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computeschedule/arm-computeschedule/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
