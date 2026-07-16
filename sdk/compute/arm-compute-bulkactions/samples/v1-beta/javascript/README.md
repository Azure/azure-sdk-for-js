# @azure/arm-compute-bulkactions client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-compute-bulkactions in some common scenarios.

| **File Name**                                                                                                                           | **Description**                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [launchBulkInstancesOperationCancelSample.js][launchbulkinstancesoperationcancelsample]                                                 | cancels LaunchBulkInstancesOperation instances that have not yet launched. x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_Cancel_MaximumSet_Gen.json                                                                                              |
| [launchBulkInstancesOperationCreateOrUpdateSample.js][launchbulkinstancesoperationcreateorupdatesample]                                 | creates or updates LaunchBulkInstancesOperations. x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_CreateOrUpdate_MaximumSet_Gen.json                                                                                                               |
| [launchBulkInstancesOperationDeleteSample.js][launchbulkinstancesoperationdeletesample]                                                 | deletes LaunchBulkInstancesOperations. x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_Delete_MaximumSet_Gen.json                                                                                                                                  |
| [launchBulkInstancesOperationGetOperationStatusSample.js][launchbulkinstancesoperationgetoperationstatussample]                         | get the status of a LaunchBulkInstancesOperation. x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_GetOperationStatus_MaximumSet_Gen.json                                                                                                           |
| [launchBulkInstancesOperationGetSample.js][launchbulkinstancesoperationgetsample]                                                       | gets an instance of LaunchBulkInstancesOperations. x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_Get_MaximumSet_Gen.json                                                                                                                         |
| [launchBulkInstancesOperationListByResourceGroupSample.js][launchbulkinstancesoperationlistbyresourcegroupsample]                       | list LaunchBulkInstancesOperation resources by resource group. x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_ListByResourceGroup_MaximumSet_Gen.json                                                                                             |
| [launchBulkInstancesOperationListBySubscriptionSample.js][launchbulkinstancesoperationlistbysubscriptionsample]                         | list LaunchBulkInstancesOperation resources by subscriptionId. x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_ListBySubscription_MaximumSet_Gen.json                                                                                              |
| [launchBulkInstancesOperationListVirtualMachinesSample.js][launchbulkinstancesoperationlistvirtualmachinessample]                       | list VirtualMachine resources of a LaunchBulkInstancesOperation. x-ms-original-file: 2026-07-06-preview/LaunchBulkInstancesOperation_ListVirtualMachines_MaximumSet_Gen.json                                                                                           |
| [operationsListSample.js][operationslistsample]                                                                                         | list the operations for the provider x-ms-original-file: 2026-07-06-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                                        |
| [virtualMachineBulkOperationsBulkAcknowledgeOperationErrorsSample.js][virtualmachinebulkoperationsbulkacknowledgeoperationerrorssample] | bulkAcknowledgeOperationErrors: Acknowledge bulk operation errors for a resource group x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkAcknowledgeOperationErrors_MaximumSet_Gen.json                                                          |
| [virtualMachineBulkOperationsBulkCancelOperationsSample.js][virtualmachinebulkoperationsbulkcanceloperationssample]                     | bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkCancel_MaximumSet_Gen.json                                                                            |
| [virtualMachineBulkOperationsBulkCreateOperationSample.js][virtualmachinebulkoperationsbulkcreateoperationsample]                       | bulkCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkCreate_MaximumSet_Gen.json                           |
| [virtualMachineBulkOperationsBulkDeallocateOperationSample.js][virtualmachinebulkoperationsbulkdeallocateoperationsample]               | bulkDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkDeallocate_MaximumSet_Gen.json               |
| [virtualMachineBulkOperationsBulkDeleteOperationSample.js][virtualmachinebulkoperationsbulkdeleteoperationsample]                       | bulkDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkDelete_MaximumSet_Gen.json                           |
| [virtualMachineBulkOperationsBulkGetOperationsStatusSample.js][virtualmachinebulkoperationsbulkgetoperationsstatussample]               | bulkGetOperationsStatus: Polling endpoint to read status of operations performed on virtual machines x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkGetOperationsStatus_MaximumSet_Gen.json                                                   |
| [virtualMachineBulkOperationsBulkHibernateOperationSample.js][virtualmachinebulkoperationsbulkhibernateoperationsample]                 | bulkHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkHibernate_MaximumSet_Gen.json                  |
| [virtualMachineBulkOperationsBulkListOperationErrorsSample.js][virtualmachinebulkoperationsbulklistoperationerrorssample]               | bulkListOperationErrors: List bulk operation errors for a resource group x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkListOperationErrors_MaximumSet_Gen.json                                                                               |
| [virtualMachineBulkOperationsBulkReimageOperationSample.js][virtualmachinebulkoperationsbulkreimageoperationsample]                     | bulkReimage: Execute reimage operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkReimage_MaximumSet_Gen.json                        |
| [virtualMachineBulkOperationsBulkStartOperationSample.js][virtualmachinebulkoperationsbulkstartoperationsample]                         | bulkStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkStart_MaximumSet_Gen.json                              |
| [virtualMachineBulkOperationsBulkVdiFlexCreateOperationSample.js][virtualmachinebulkoperationsbulkvdiflexcreateoperationsample]         | bulkVdiFlexCreate: Bulk create operation for a batch of virtual machines, this operation supports flex properties to give options on Sku and zone selection. x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkVdiFlexCreate_MaximumSet_Gen.json |

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
node launchBulkInstancesOperationCancelSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node launchBulkInstancesOperationCancelSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[launchbulkinstancesoperationcancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/launchBulkInstancesOperationCancelSample.js
[launchbulkinstancesoperationcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/launchBulkInstancesOperationCreateOrUpdateSample.js
[launchbulkinstancesoperationdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/launchBulkInstancesOperationDeleteSample.js
[launchbulkinstancesoperationgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/launchBulkInstancesOperationGetOperationStatusSample.js
[launchbulkinstancesoperationgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/launchBulkInstancesOperationGetSample.js
[launchbulkinstancesoperationlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/launchBulkInstancesOperationListByResourceGroupSample.js
[launchbulkinstancesoperationlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/launchBulkInstancesOperationListBySubscriptionSample.js
[launchbulkinstancesoperationlistvirtualmachinessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/launchBulkInstancesOperationListVirtualMachinesSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/operationsListSample.js
[virtualmachinebulkoperationsbulkacknowledgeoperationerrorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkAcknowledgeOperationErrorsSample.js
[virtualmachinebulkoperationsbulkcanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkCancelOperationsSample.js
[virtualmachinebulkoperationsbulkcreateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkCreateOperationSample.js
[virtualmachinebulkoperationsbulkdeallocateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkDeallocateOperationSample.js
[virtualmachinebulkoperationsbulkdeleteoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkDeleteOperationSample.js
[virtualmachinebulkoperationsbulkgetoperationsstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkGetOperationsStatusSample.js
[virtualmachinebulkoperationsbulkhibernateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkHibernateOperationSample.js
[virtualmachinebulkoperationsbulklistoperationerrorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkListOperationErrorsSample.js
[virtualmachinebulkoperationsbulkreimageoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkReimageOperationSample.js
[virtualmachinebulkoperationsbulkstartoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkStartOperationSample.js
[virtualmachinebulkoperationsbulkvdiflexcreateoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-compute-bulkactions/samples/v1-beta/javascript/virtualMachineBulkOperationsBulkVdiFlexCreateOperationSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-compute-bulkactions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-compute-bulkactions/README.md
