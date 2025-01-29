# @azure/arm-computeschedule client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-computeschedule in some common scenarios.

| **File Name**                                                                                                                                         | **Description**                                                                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsOperationsListSample.js][operationsoperationslistsample]                                                                                   | list the operations for the provider x-ms-original-file: 2024-10-01/Operations_List.json                                                                                                                                                                  |
| [scheduledActionsScheduledActionsVirtualMachinesCancelOperationsSample.js][scheduledactionsscheduledactionsvirtualmachinescanceloperationssample]     | virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesCancelOperations.json                                                                  |
| [scheduledActionsScheduledActionsVirtualMachinesExecuteDeallocateSample.js][scheduledactionsscheduledactionsvirtualmachinesexecutedeallocatesample]   | virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesExecuteDeallocate.json |
| [scheduledActionsScheduledActionsVirtualMachinesExecuteHibernateSample.js][scheduledactionsscheduledactionsvirtualmachinesexecutehibernatesample]     | virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesExecuteHibernate.json    |
| [scheduledActionsScheduledActionsVirtualMachinesExecuteStartSample.js][scheduledactionsscheduledactionsvirtualmachinesexecutestartsample]             | virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesExecuteStart.json                |
| [scheduledActionsScheduledActionsVirtualMachinesGetOperationErrorsSample.js][scheduledactionsscheduledactionsvirtualmachinesgetoperationerrorssample] | virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesGetOperationErrors.json                       |
| [scheduledActionsScheduledActionsVirtualMachinesGetOperationStatusSample.js][scheduledactionsscheduledactionsvirtualmachinesgetoperationstatussample] | virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesGetOperationStatus.json                                                     |
| [scheduledActionsScheduledActionsVirtualMachinesSubmitDeallocateSample.js][scheduledactionsscheduledactionsvirtualmachinessubmitdeallocatesample]     | virtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesSubmitDeallocate.json                                                |
| [scheduledActionsScheduledActionsVirtualMachinesSubmitHibernateSample.js][scheduledactionsscheduledactionsvirtualmachinessubmithibernatesample]       | virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesSubmitHibernate.json                                                   |
| [scheduledActionsScheduledActionsVirtualMachinesSubmitStartSample.js][scheduledactionsscheduledactionsvirtualmachinessubmitstartsample]               | virtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesSubmitStart.json                                                               |

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
node operationsOperationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node operationsOperationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationsoperationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/operationsOperationsListSample.js
[scheduledactionsscheduledactionsvirtualmachinescanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsScheduledActionsVirtualMachinesCancelOperationsSample.js
[scheduledactionsscheduledactionsvirtualmachinesexecutedeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsScheduledActionsVirtualMachinesExecuteDeallocateSample.js
[scheduledactionsscheduledactionsvirtualmachinesexecutehibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsScheduledActionsVirtualMachinesExecuteHibernateSample.js
[scheduledactionsscheduledactionsvirtualmachinesexecutestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsScheduledActionsVirtualMachinesExecuteStartSample.js
[scheduledactionsscheduledactionsvirtualmachinesgetoperationerrorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsScheduledActionsVirtualMachinesGetOperationErrorsSample.js
[scheduledactionsscheduledactionsvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsScheduledActionsVirtualMachinesGetOperationStatusSample.js
[scheduledactionsscheduledactionsvirtualmachinessubmitdeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsScheduledActionsVirtualMachinesSubmitDeallocateSample.js
[scheduledactionsscheduledactionsvirtualmachinessubmithibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsScheduledActionsVirtualMachinesSubmitHibernateSample.js
[scheduledactionsscheduledactionsvirtualmachinessubmitstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsScheduledActionsVirtualMachinesSubmitStartSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computeschedule?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computeschedule/arm-computeschedule/README.md
