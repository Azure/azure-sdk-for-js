# @azure/arm-compute-bulkactions client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-compute-bulkactions in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.ts][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2026-06-06/Operations_List_MaximumSet_Gen.json                                                                                                                                          |
| [virtualMachineBulkOperationsBulkCancelOperationsSample.ts][virtualmachinebulkoperationsbulkcanceloperationssample]       | bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkCancel_MaximumSet_Gen.json                                                              |
| [virtualMachineBulkOperationsBulkDeallocateOperationSample.ts][virtualmachinebulkoperationsbulkdeallocateoperationsample] | bulkDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkDeallocate_MaximumSet_Gen.json |
| [virtualMachineBulkOperationsBulkDeleteOperationSample.ts][virtualmachinebulkoperationsbulkdeleteoperationsample]         | bulkDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkDelete_MaximumSet_Gen.json             |
| [virtualMachineBulkOperationsBulkGetOperationsStatusSample.ts][virtualmachinebulkoperationsbulkgetoperationsstatussample] | bulkGetOperationsStatus: Polling endpoint to read status of operations performed on virtual machines x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkGetOperationsStatus_MaximumSet_Gen.json                                     |
| [virtualMachineBulkOperationsBulkHibernateOperationSample.ts][virtualmachinebulkoperationsbulkhibernateoperationsample]   | bulkHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkHibernate_MaximumSet_Gen.json    |
| [virtualMachineBulkOperationsBulkStartOperationSample.ts][virtualmachinebulkoperationsbulkstartoperationsample]           | bulkStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkStart_MaximumSet_Gen.json                |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/typescript/src/operationsListSample.ts
[virtualmachinebulkoperationsbulkcanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/typescript/src/virtualMachineBulkOperationsBulkCancelOperationsSample.ts
[virtualmachinebulkoperationsbulkdeallocateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/typescript/src/virtualMachineBulkOperationsBulkDeallocateOperationSample.ts
[virtualmachinebulkoperationsbulkdeleteoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/typescript/src/virtualMachineBulkOperationsBulkDeleteOperationSample.ts
[virtualmachinebulkoperationsbulkgetoperationsstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/typescript/src/virtualMachineBulkOperationsBulkGetOperationsStatusSample.ts
[virtualmachinebulkoperationsbulkhibernateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/typescript/src/virtualMachineBulkOperationsBulkHibernateOperationSample.ts
[virtualmachinebulkoperationsbulkstartoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/typescript/src/virtualMachineBulkOperationsBulkStartOperationSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-compute-bulkactions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-compute-bulkactions/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
