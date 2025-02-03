# @azure/arm-computeschedule client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-computeschedule in some common scenarios.

| **File Name**                                                                                                                                         | **Description**                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsOperationsListSample.ts][operationsoperationslistsample]                                                                                   | list the operations for the provider x-ms-original-file: 2024-10-01/Operations_List.json                                                                                                                                                                  |
| [scheduledActionsScheduledActionsVirtualMachinesCancelOperationsSample.ts][scheduledactionsscheduledactionsvirtualmachinescanceloperationssample]     | virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesCancelOperations.json                                                                  |
| [scheduledActionsScheduledActionsVirtualMachinesExecuteDeallocateSample.ts][scheduledactionsscheduledactionsvirtualmachinesexecutedeallocatesample]   | virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesExecuteDeallocate.json |
| [scheduledActionsScheduledActionsVirtualMachinesExecuteHibernateSample.ts][scheduledactionsscheduledactionsvirtualmachinesexecutehibernatesample]     | virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesExecuteHibernate.json    |
| [scheduledActionsScheduledActionsVirtualMachinesExecuteStartSample.ts][scheduledactionsscheduledactionsvirtualmachinesexecutestartsample]             | virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesExecuteStart.json                |
| [scheduledActionsScheduledActionsVirtualMachinesGetOperationErrorsSample.ts][scheduledactionsscheduledactionsvirtualmachinesgetoperationerrorssample] | virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesGetOperationErrors.json                       |
| [scheduledActionsScheduledActionsVirtualMachinesGetOperationStatusSample.ts][scheduledactionsscheduledactionsvirtualmachinesgetoperationstatussample] | virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesGetOperationStatus.json                                                     |
| [scheduledActionsScheduledActionsVirtualMachinesSubmitDeallocateSample.ts][scheduledactionsscheduledactionsvirtualmachinessubmitdeallocatesample]     | virtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesSubmitDeallocate.json                                                |
| [scheduledActionsScheduledActionsVirtualMachinesSubmitHibernateSample.ts][scheduledactionsscheduledactionsvirtualmachinessubmithibernatesample]       | virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesSubmitHibernate.json                                                   |
| [scheduledActionsScheduledActionsVirtualMachinesSubmitStartSample.ts][scheduledactionsscheduledactionsvirtualmachinessubmitstartsample]               | virtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesSubmitStart.json                                                               |

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
node dist/operationsOperationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/operationsOperationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/operationsOperationsListSample.ts
[scheduledactionsscheduledactionsvirtualmachinescanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/scheduledActionsScheduledActionsVirtualMachinesCancelOperationsSample.ts
[scheduledactionsscheduledactionsvirtualmachinesexecutedeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/scheduledActionsScheduledActionsVirtualMachinesExecuteDeallocateSample.ts
[scheduledactionsscheduledactionsvirtualmachinesexecutehibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/scheduledActionsScheduledActionsVirtualMachinesExecuteHibernateSample.ts
[scheduledactionsscheduledactionsvirtualmachinesexecutestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/scheduledActionsScheduledActionsVirtualMachinesExecuteStartSample.ts
[scheduledactionsscheduledactionsvirtualmachinesgetoperationerrorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/scheduledActionsScheduledActionsVirtualMachinesGetOperationErrorsSample.ts
[scheduledactionsscheduledactionsvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/scheduledActionsScheduledActionsVirtualMachinesGetOperationStatusSample.ts
[scheduledactionsscheduledactionsvirtualmachinessubmitdeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/scheduledActionsScheduledActionsVirtualMachinesSubmitDeallocateSample.ts
[scheduledactionsscheduledactionsvirtualmachinessubmithibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/scheduledActionsScheduledActionsVirtualMachinesSubmitHibernateSample.ts
[scheduledactionsscheduledactionsvirtualmachinessubmitstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/typescript/src/scheduledActionsScheduledActionsVirtualMachinesSubmitStartSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computeschedule?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computeschedule/arm-computeschedule/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
