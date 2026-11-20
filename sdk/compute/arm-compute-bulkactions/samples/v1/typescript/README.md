# @azure/arm-compute-bulkactions client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-compute-bulkactions in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [bulkCreateCreateSample.ts][bulkcreatecreatesample]                                                                       | creates virtual machines in bulk. x-ms-original-file: 2026-10-16/BulkCreate_Create.json                                                                                                                                                                                                                                                    |
| [bulkCreateCustomCreateSample.ts][bulkcreatecustomcreatesample]                                                           | creates virtual machines in bulk with custom settings. x-ms-original-file: 2026-10-16/BulkCreateCustom_Create.json                                                                                                                                                                                                                         |
| [bulkCreateCustomGetAsyncOperationStatusSample.ts][bulkcreatecustomgetasyncoperationstatussample]                         | get the status of an async operation of a BulkCreateCustom. x-ms-original-file: 2026-10-16/BulkCreateCustom_GetAsyncOperationStatus.json                                                                                                                                                                                                   |
| [bulkCreateCustomGetSample.ts][bulkcreatecustomgetsample]                                                                 | gets an instance of BulkCreateCustoms. x-ms-original-file: 2026-10-16/BulkCreateCustom_Get.json                                                                                                                                                                                                                                            |
| [bulkCreateCustomListByResourceGroupSample.ts][bulkcreatecustomlistbyresourcegroupsample]                                 | list BulkCreateCustom resources by resource group. x-ms-original-file: 2026-10-16/BulkCreateCustom_ListByResourceGroup.json                                                                                                                                                                                                                |
| [bulkCreateCustomListBySubscriptionSample.ts][bulkcreatecustomlistbysubscriptionsample]                                   | list BulkCreateCustom resources by subscriptionId. x-ms-original-file: 2026-10-16/BulkCreateCustom_ListBySubscription.json                                                                                                                                                                                                                 |
| [bulkCreateCustomVirtualMachinesGetOperationStatusSample.ts][bulkcreatecustomvirtualmachinesgetoperationstatussample]     | gets the operation status for virtual machines in a BulkCreateCustom operation. x-ms-original-file: 2026-10-16/BulkCreateCustom_VirtualMachinesGetOperationStatus.json                                                                                                                                                                     |
| [bulkCreateGetAsyncOperationStatusSample.ts][bulkcreategetasyncoperationstatussample]                                     | get the status of an async operation of a BulkCreate. x-ms-original-file: 2026-10-16/BulkCreate_GetAsyncOperationStatus.json                                                                                                                                                                                                               |
| [bulkCreateGetSample.ts][bulkcreategetsample]                                                                             | gets an instance of BulkCreates. x-ms-original-file: 2026-10-16/BulkCreate_Get.json                                                                                                                                                                                                                                                        |
| [bulkCreateListByResourceGroupSample.ts][bulkcreatelistbyresourcegroupsample]                                             | list BulkCreate resources by resource group. x-ms-original-file: 2026-10-16/BulkCreate_ListByResourceGroup.json                                                                                                                                                                                                                            |
| [bulkCreateListBySubscriptionSample.ts][bulkcreatelistbysubscriptionsample]                                               | list BulkCreate resources by subscriptionId. x-ms-original-file: 2026-10-16/BulkCreate_ListBySubscription.json                                                                                                                                                                                                                             |
| [bulkCreateVirtualMachinesGetOperationStatusSample.ts][bulkcreatevirtualmachinesgetoperationstatussample]                 | gets the operation status for virtual machines in a BulkCreate operation. x-ms-original-file: 2026-10-16/BulkCreate_VirtualMachinesGetOperationStatus.json                                                                                                                                                                                 |
| [operationsListSample.ts][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2026-10-16/Operations_List_MaximumSet_Gen copy.json                                                                                                                                                                                                                               |
| [virtualMachineBulkOperationsBulkCancelOperationsSample.ts][virtualmachinebulkoperationsbulkcanceloperationssample]       | cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkCancel_BasicSuccess.json                                                                                         |
| [virtualMachineBulkOperationsBulkDeallocateOperationSample.ts][virtualmachinebulkoperationsbulkdeallocateoperationsample] | deallocate one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkDeallocate_BasicSuccess.json                        |
| [virtualMachineBulkOperationsBulkDeleteOperationSample.ts][virtualmachinebulkoperationsbulkdeleteoperationsample]         | delete one or more virtual machines. This operation is destructive. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkDelete_BasicSuccess.json |
| [virtualMachineBulkOperationsBulkGetOperationsStatusSample.ts][virtualmachinebulkoperationsbulkgetoperationsstatussample] | get the current status of one or more operations identified by their Bulk Action Operation Ids. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkGetOperationsStatus_BasicSuccess.json                                                                                                                                      |
| [virtualMachineBulkOperationsBulkHibernateOperationSample.ts][virtualmachinebulkoperationsbulkhibernateoperationsample]   | hibernate one or more virtual machines that support hibernation. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkHibernate_Basic.json        |
| [virtualMachineBulkOperationsBulkStartOperationSample.ts][virtualmachinebulkoperationsbulkstartoperationsample]           | start one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkStart_BasicSuccess.json                                  |

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
node dist/bulkCreateCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/bulkCreateCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bulkcreatecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateCreateSample.ts
[bulkcreatecustomcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateCustomCreateSample.ts
[bulkcreatecustomgetasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateCustomGetAsyncOperationStatusSample.ts
[bulkcreatecustomgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateCustomGetSample.ts
[bulkcreatecustomlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateCustomListByResourceGroupSample.ts
[bulkcreatecustomlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateCustomListBySubscriptionSample.ts
[bulkcreatecustomvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateCustomVirtualMachinesGetOperationStatusSample.ts
[bulkcreategetasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateGetAsyncOperationStatusSample.ts
[bulkcreategetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateGetSample.ts
[bulkcreatelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateListByResourceGroupSample.ts
[bulkcreatelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateListBySubscriptionSample.ts
[bulkcreatevirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/bulkCreateVirtualMachinesGetOperationStatusSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/operationsListSample.ts
[virtualmachinebulkoperationsbulkcanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/virtualMachineBulkOperationsBulkCancelOperationsSample.ts
[virtualmachinebulkoperationsbulkdeallocateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/virtualMachineBulkOperationsBulkDeallocateOperationSample.ts
[virtualmachinebulkoperationsbulkdeleteoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/virtualMachineBulkOperationsBulkDeleteOperationSample.ts
[virtualmachinebulkoperationsbulkgetoperationsstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/virtualMachineBulkOperationsBulkGetOperationsStatusSample.ts
[virtualmachinebulkoperationsbulkhibernateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/virtualMachineBulkOperationsBulkHibernateOperationSample.ts
[virtualmachinebulkoperationsbulkstartoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/typescript/src/virtualMachineBulkOperationsBulkStartOperationSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-compute-bulkactions
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-compute-bulkactions/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
