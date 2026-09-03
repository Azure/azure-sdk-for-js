# @azure/arm-computebulkactions client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-computebulkactions in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bulkActionsCancelSample.ts][bulkactionscancelsample]                                                       | cancels LaunchBulkInstancesOperation instances that have not yet launched. x-ms-original-file: 2026-02-01-preview/BulkActions_Cancel_MaximumSet_Gen.json                                                                                                                    |
| [bulkActionsCreateOrUpdateSample.ts][bulkactionscreateorupdatesample]                                       | creates or updates LaunchBulkInstancesOperations. x-ms-original-file: 2026-02-01-preview/BulkActions_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                     |
| [bulkActionsDeleteSample.ts][bulkactionsdeletesample]                                                       | deletes LaunchBulkInstancesOperations. x-ms-original-file: 2026-02-01-preview/BulkActions_Delete_MaximumSet_Gen.json                                                                                                                                                        |
| [bulkActionsGetOperationStatusSample.ts][bulkactionsgetoperationstatussample]                               | get the status of a LaunchBulkInstancesOperation. x-ms-original-file: 2026-02-01-preview/BulkActions_GetOperationStatus_MaximumSet_Gen.json                                                                                                                                 |
| [bulkActionsGetSample.ts][bulkactionsgetsample]                                                             | gets an instance of LaunchBulkInstancesOperations. x-ms-original-file: 2026-02-01-preview/BulkActions_Get_MaximumSet_Gen.json                                                                                                                                               |
| [bulkActionsListByResourceGroupSample.ts][bulkactionslistbyresourcegroupsample]                             | list LaunchBulkInstancesOperation resources by resource group. x-ms-original-file: 2026-02-01-preview/BulkActions_ListByResourceGroup_MaximumSet_Gen.json                                                                                                                   |
| [bulkActionsListBySubscriptionSample.ts][bulkactionslistbysubscriptionsample]                               | list LaunchBulkInstancesOperation resources by subscriptionId. x-ms-original-file: 2026-02-01-preview/BulkActions_ListBySubscription_MaximumSet_Gen.json                                                                                                                    |
| [bulkActionsListVirtualMachinesSample.ts][bulkactionslistvirtualmachinessample]                             | list VirtualMachine resources of a LaunchBulkInstancesOperation. x-ms-original-file: 2026-02-01-preview/BulkActions_ListVirtualMachines_MaximumSet_Gen.json                                                                                                                 |
| [bulkActionsVirtualMachinesCancelOperationsSample.ts][bulkactionsvirtualmachinescanceloperationssample]     | virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json                                                                  |
| [bulkActionsVirtualMachinesExecuteCreateSample.ts][bulkactionsvirtualmachinesexecutecreatesample]           | virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteCreate_MaximumSet_Gen.json             |
| [bulkActionsVirtualMachinesExecuteDeallocateSample.ts][bulkactionsvirtualmachinesexecutedeallocatesample]   | virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteDeallocate_MaximumSet_Gen.json |
| [bulkActionsVirtualMachinesExecuteDeleteSample.ts][bulkactionsvirtualmachinesexecutedeletesample]           | virtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteDelete_MaximumSet_Gen.json             |
| [bulkActionsVirtualMachinesExecuteHibernateSample.ts][bulkactionsvirtualmachinesexecutehibernatesample]     | virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteHibernate_MaximumSet_Gen.json    |
| [bulkActionsVirtualMachinesExecuteStartSample.ts][bulkactionsvirtualmachinesexecutestartsample]             | virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesExecuteStart_MaximumSet_Gen.json                |
| [bulkActionsVirtualMachinesGetOperationStatusSample.ts][bulkactionsvirtualmachinesgetoperationstatussample] | virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json                                                     |
| [operationsListSample.ts][operationslistsample]                                                             | list the operations for the provider x-ms-original-file: 2026-02-01-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                                             |

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
node dist/bulkActionsCancelSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/bulkActionsCancelSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bulkactionscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsCancelSample.ts
[bulkactionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsCreateOrUpdateSample.ts
[bulkactionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsDeleteSample.ts
[bulkactionsgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsGetOperationStatusSample.ts
[bulkactionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsGetSample.ts
[bulkactionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsListByResourceGroupSample.ts
[bulkactionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsListBySubscriptionSample.ts
[bulkactionslistvirtualmachinessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsListVirtualMachinesSample.ts
[bulkactionsvirtualmachinescanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsVirtualMachinesCancelOperationsSample.ts
[bulkactionsvirtualmachinesexecutecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsVirtualMachinesExecuteCreateSample.ts
[bulkactionsvirtualmachinesexecutedeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsVirtualMachinesExecuteDeallocateSample.ts
[bulkactionsvirtualmachinesexecutedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsVirtualMachinesExecuteDeleteSample.ts
[bulkactionsvirtualmachinesexecutehibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsVirtualMachinesExecuteHibernateSample.ts
[bulkactionsvirtualmachinesexecutestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsVirtualMachinesExecuteStartSample.ts
[bulkactionsvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/bulkActionsVirtualMachinesGetOperationStatusSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computebulkactions/arm-computebulkactions/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computebulkactions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computebulkactions/arm-computebulkactions/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
