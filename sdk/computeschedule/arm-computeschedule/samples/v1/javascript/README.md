# @azure/arm-computeschedule client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-computeschedule in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.js][operationslistsample]                                                                       | list the operations for the provider x-ms-original-file: 2025-05-01/Operations_List_MaximumSet_Gen.json                                                                                                                                                                  |
| [scheduledActionsVirtualMachinesCancelOperationsSample.js][scheduledactionsvirtualmachinescanceloperationssample]     | virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json                                                                  |
| [scheduledActionsVirtualMachinesExecuteCreateSample.js][scheduledactionsvirtualmachinesexecutecreatesample]           | virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesExecuteCreate_MaximumSet_Gen.json             |
| [scheduledActionsVirtualMachinesExecuteDeallocateSample.js][scheduledactionsvirtualmachinesexecutedeallocatesample]   | virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesExecuteDeallocate_MaximumSet_Gen.json |
| [scheduledActionsVirtualMachinesExecuteDeleteSample.js][scheduledactionsvirtualmachinesexecutedeletesample]           | virtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesExecuteDelete_MaximumSet_Gen.json             |
| [scheduledActionsVirtualMachinesExecuteHibernateSample.js][scheduledactionsvirtualmachinesexecutehibernatesample]     | virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesExecuteHibernate_MaximumSet_Gen.json    |
| [scheduledActionsVirtualMachinesExecuteStartSample.js][scheduledactionsvirtualmachinesexecutestartsample]             | virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesExecuteStart_MaximumSet_Gen.json                |
| [scheduledActionsVirtualMachinesGetOperationErrorsSample.js][scheduledactionsvirtualmachinesgetoperationerrorssample] | virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesGetOperationErrors_MaximumSet_Gen.json                       |
| [scheduledActionsVirtualMachinesGetOperationStatusSample.js][scheduledactionsvirtualmachinesgetoperationstatussample] | virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json                                                     |
| [scheduledActionsVirtualMachinesSubmitDeallocateSample.js][scheduledactionsvirtualmachinessubmitdeallocatesample]     | virtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesSubmitDeallocate_MaximumSet_Gen.json                                                |
| [scheduledActionsVirtualMachinesSubmitHibernateSample.js][scheduledactionsvirtualmachinessubmithibernatesample]       | virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesSubmitHibernate_MaximumSet_Gen.json                                                   |
| [scheduledActionsVirtualMachinesSubmitStartSample.js][scheduledactionsvirtualmachinessubmitstartsample]               | virtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesSubmitStart_MaximumSet_Gen.json                                                               |

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
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/operationsListSample.js
[scheduledactionsvirtualmachinescanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesCancelOperationsSample.js
[scheduledactionsvirtualmachinesexecutecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesExecuteCreateSample.js
[scheduledactionsvirtualmachinesexecutedeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesExecuteDeallocateSample.js
[scheduledactionsvirtualmachinesexecutedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesExecuteDeleteSample.js
[scheduledactionsvirtualmachinesexecutehibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesExecuteHibernateSample.js
[scheduledactionsvirtualmachinesexecutestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesExecuteStartSample.js
[scheduledactionsvirtualmachinesgetoperationerrorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesGetOperationErrorsSample.js
[scheduledactionsvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesGetOperationStatusSample.js
[scheduledactionsvirtualmachinessubmitdeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesSubmitDeallocateSample.js
[scheduledactionsvirtualmachinessubmithibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesSubmitHibernateSample.js
[scheduledactionsvirtualmachinessubmitstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1/javascript/scheduledActionsVirtualMachinesSubmitStartSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computeschedule?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computeschedule/arm-computeschedule/README.md
