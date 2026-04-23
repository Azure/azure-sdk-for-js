# @azure/arm-computebulkactions client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-computebulkactions in some common scenarios.

| **File Name**                                                                                                                                 | **Description**                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.js][operationslistsample]                                                                                               | list the operations for the provider x-ms-original-file: 2026-04-01/Operations_List_MaximumSet_Gen.json                                                                                                                                                                              |
| [virtualMachineBulkOperationsVirtualMachinesCancelOperationsSample.js][virtualmachinebulkoperationsvirtualmachinescanceloperationssample]     | virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesCancelOperations_MaximumSet_Gen.json                                                                  |
| [virtualMachineBulkOperationsVirtualMachinesExecuteCreateSample.js][virtualmachinebulkoperationsvirtualmachinesexecutecreatesample]           | virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesExecuteCreate_MaximumSet_Gen.json             |
| [virtualMachineBulkOperationsVirtualMachinesExecuteDeallocateSample.js][virtualmachinebulkoperationsvirtualmachinesexecutedeallocatesample]   | virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesExecuteDeallocate_MaximumSet_Gen.json |
| [virtualMachineBulkOperationsVirtualMachinesExecuteDeleteSample.js][virtualmachinebulkoperationsvirtualmachinesexecutedeletesample]           | virtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesExecuteDelete_MaximumSet_Gen.json             |
| [virtualMachineBulkOperationsVirtualMachinesExecuteHibernateSample.js][virtualmachinebulkoperationsvirtualmachinesexecutehibernatesample]     | virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesExecuteHibernate_MaximumSet_Gen.json    |
| [virtualMachineBulkOperationsVirtualMachinesExecuteStartSample.js][virtualmachinebulkoperationsvirtualmachinesexecutestartsample]             | virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesExecuteStart_MaximumSet_Gen.json                |
| [virtualMachineBulkOperationsVirtualMachinesGetOperationStatusSample.js][virtualmachinebulkoperationsvirtualmachinesgetoperationstatussample] | virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json                                                     |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1/javascript/operationsListSample.js
[virtualmachinebulkoperationsvirtualmachinescanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1/javascript/virtualMachineBulkOperationsVirtualMachinesCancelOperationsSample.js
[virtualmachinebulkoperationsvirtualmachinesexecutecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1/javascript/virtualMachineBulkOperationsVirtualMachinesExecuteCreateSample.js
[virtualmachinebulkoperationsvirtualmachinesexecutedeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1/javascript/virtualMachineBulkOperationsVirtualMachinesExecuteDeallocateSample.js
[virtualmachinebulkoperationsvirtualmachinesexecutedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1/javascript/virtualMachineBulkOperationsVirtualMachinesExecuteDeleteSample.js
[virtualmachinebulkoperationsvirtualmachinesexecutehibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1/javascript/virtualMachineBulkOperationsVirtualMachinesExecuteHibernateSample.js
[virtualmachinebulkoperationsvirtualmachinesexecutestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1/javascript/virtualMachineBulkOperationsVirtualMachinesExecuteStartSample.js
[virtualmachinebulkoperationsvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1/javascript/virtualMachineBulkOperationsVirtualMachinesGetOperationStatusSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computebulkactions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computebulkactions/arm-computebulkactions/README.md
