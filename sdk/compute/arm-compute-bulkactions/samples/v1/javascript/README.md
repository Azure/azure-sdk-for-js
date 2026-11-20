# @azure/arm-compute-bulkactions client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-compute-bulkactions in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [bulkCreateCreateSample.js][bulkcreatecreatesample]                                                                       | creates virtual machines in bulk. x-ms-original-file: 2026-10-16/BulkCreate_Create.json                                                                                                                                                                                                                                                    |
| [bulkCreateCustomCreateSample.js][bulkcreatecustomcreatesample]                                                           | creates virtual machines in bulk with custom settings. x-ms-original-file: 2026-10-16/BulkCreateCustom_Create.json                                                                                                                                                                                                                         |
| [bulkCreateCustomGetAsyncOperationStatusSample.js][bulkcreatecustomgetasyncoperationstatussample]                         | get the status of an async operation of a BulkCreateCustom. x-ms-original-file: 2026-10-16/BulkCreateCustom_GetAsyncOperationStatus.json                                                                                                                                                                                                   |
| [bulkCreateCustomGetSample.js][bulkcreatecustomgetsample]                                                                 | gets an instance of BulkCreateCustoms. x-ms-original-file: 2026-10-16/BulkCreateCustom_Get.json                                                                                                                                                                                                                                            |
| [bulkCreateCustomListByResourceGroupSample.js][bulkcreatecustomlistbyresourcegroupsample]                                 | list BulkCreateCustom resources by resource group. x-ms-original-file: 2026-10-16/BulkCreateCustom_ListByResourceGroup.json                                                                                                                                                                                                                |
| [bulkCreateCustomListBySubscriptionSample.js][bulkcreatecustomlistbysubscriptionsample]                                   | list BulkCreateCustom resources by subscriptionId. x-ms-original-file: 2026-10-16/BulkCreateCustom_ListBySubscription.json                                                                                                                                                                                                                 |
| [bulkCreateCustomVirtualMachinesGetOperationStatusSample.js][bulkcreatecustomvirtualmachinesgetoperationstatussample]     | gets the operation status for virtual machines in a BulkCreateCustom operation. x-ms-original-file: 2026-10-16/BulkCreateCustom_VirtualMachinesGetOperationStatus.json                                                                                                                                                                     |
| [bulkCreateGetAsyncOperationStatusSample.js][bulkcreategetasyncoperationstatussample]                                     | get the status of an async operation of a BulkCreate. x-ms-original-file: 2026-10-16/BulkCreate_GetAsyncOperationStatus.json                                                                                                                                                                                                               |
| [bulkCreateGetSample.js][bulkcreategetsample]                                                                             | gets an instance of BulkCreates. x-ms-original-file: 2026-10-16/BulkCreate_Get.json                                                                                                                                                                                                                                                        |
| [bulkCreateListByResourceGroupSample.js][bulkcreatelistbyresourcegroupsample]                                             | list BulkCreate resources by resource group. x-ms-original-file: 2026-10-16/BulkCreate_ListByResourceGroup.json                                                                                                                                                                                                                            |
| [bulkCreateListBySubscriptionSample.js][bulkcreatelistbysubscriptionsample]                                               | list BulkCreate resources by subscriptionId. x-ms-original-file: 2026-10-16/BulkCreate_ListBySubscription.json                                                                                                                                                                                                                             |
| [bulkCreateVirtualMachinesGetOperationStatusSample.js][bulkcreatevirtualmachinesgetoperationstatussample]                 | gets the operation status for virtual machines in a BulkCreate operation. x-ms-original-file: 2026-10-16/BulkCreate_VirtualMachinesGetOperationStatus.json                                                                                                                                                                                 |
| [operationsListSample.js][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2026-10-16/Operations_List_MaximumSet_Gen copy.json                                                                                                                                                                                                                               |
| [virtualMachineBulkOperationsBulkCancelOperationsSample.js][virtualmachinebulkoperationsbulkcanceloperationssample]       | cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkCancel_BasicSuccess.json                                                                                         |
| [virtualMachineBulkOperationsBulkDeallocateOperationSample.js][virtualmachinebulkoperationsbulkdeallocateoperationsample] | deallocate one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkDeallocate_BasicSuccess.json                        |
| [virtualMachineBulkOperationsBulkDeleteOperationSample.js][virtualmachinebulkoperationsbulkdeleteoperationsample]         | delete one or more virtual machines. This operation is destructive. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkDelete_BasicSuccess.json |
| [virtualMachineBulkOperationsBulkGetOperationsStatusSample.js][virtualmachinebulkoperationsbulkgetoperationsstatussample] | get the current status of one or more operations identified by their Bulk Action Operation Ids. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkGetOperationsStatus_BasicSuccess.json                                                                                                                                      |
| [virtualMachineBulkOperationsBulkHibernateOperationSample.js][virtualmachinebulkoperationsbulkhibernateoperationsample]   | hibernate one or more virtual machines that support hibernation. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkHibernate_Basic.json        |
| [virtualMachineBulkOperationsBulkStartOperationSample.js][virtualmachinebulkoperationsbulkstartoperationsample]           | start one or more virtual machines. Bulk Actions begins processing the request immediately and returns a Bulk Action Operation Id for each virtual machine. Use the returned IDs to get operation status updates. x-ms-original-file: 2026-10-16/VirtualMachineBulkOperations_BulkStart_BasicSuccess.json                                  |

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
node bulkCreateCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node bulkCreateCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[bulkcreatecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateCreateSample.js
[bulkcreatecustomcreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateCustomCreateSample.js
[bulkcreatecustomgetasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateCustomGetAsyncOperationStatusSample.js
[bulkcreatecustomgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateCustomGetSample.js
[bulkcreatecustomlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateCustomListByResourceGroupSample.js
[bulkcreatecustomlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateCustomListBySubscriptionSample.js
[bulkcreatecustomvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateCustomVirtualMachinesGetOperationStatusSample.js
[bulkcreategetasyncoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateGetAsyncOperationStatusSample.js
[bulkcreategetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateGetSample.js
[bulkcreatelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateListByResourceGroupSample.js
[bulkcreatelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateListBySubscriptionSample.js
[bulkcreatevirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/bulkCreateVirtualMachinesGetOperationStatusSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/operationsListSample.js
[virtualmachinebulkoperationsbulkcanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/virtualMachineBulkOperationsBulkCancelOperationsSample.js
[virtualmachinebulkoperationsbulkdeallocateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/virtualMachineBulkOperationsBulkDeallocateOperationSample.js
[virtualmachinebulkoperationsbulkdeleteoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/virtualMachineBulkOperationsBulkDeleteOperationSample.js
[virtualmachinebulkoperationsbulkgetoperationsstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/virtualMachineBulkOperationsBulkGetOperationsStatusSample.js
[virtualmachinebulkoperationsbulkhibernateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/virtualMachineBulkOperationsBulkHibernateOperationSample.js
[virtualmachinebulkoperationsbulkstartoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1/javascript/virtualMachineBulkOperationsBulkStartOperationSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-compute-bulkactions
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-compute-bulkactions/README.md
