# @azure/arm-computeschedule client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-computeschedule in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [occurrenceExtensionListOccurrenceByVmsSample.js][occurrenceextensionlistoccurrencebyvmssample]                       | list OccurrenceExtensionResource resources by parent x-ms-original-file: 2025-04-15-preview/OccurrenceExtension_ListOccurrenceByVms_MaximumSet_Gen.json                                                                                                                          |
| [occurrencesCancelSample.js][occurrencescancelsample]                                                                 | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/Occurrences_Cancel_MaximumSet_Gen.json                                                                                                                                                                     |
| [occurrencesDelaySample.js][occurrencesdelaysample]                                                                   | a long-running resource action. x-ms-original-file: 2025-04-15-preview/Occurrences_Delay_MaximumSet_Gen.json                                                                                                                                                                     |
| [occurrencesGetSample.js][occurrencesgetsample]                                                                       | get a Occurrence x-ms-original-file: 2025-04-15-preview/Occurrences_Get_MaximumSet_Gen.json                                                                                                                                                                                      |
| [occurrencesListByScheduledActionSample.js][occurrenceslistbyscheduledactionsample]                                   | list Occurrence resources by ScheduledAction x-ms-original-file: 2025-04-15-preview/Occurrences_ListByScheduledAction_MaximumSet_Gen.json                                                                                                                                        |
| [occurrencesListResourcesSample.js][occurrenceslistresourcessample]                                                   | list resources attached to Scheduled Actions for the given occurrence x-ms-original-file: 2025-04-15-preview/Occurrences_ListResources_MaximumSet_Gen.json                                                                                                                       |
| [operationsListSample.js][operationslistsample]                                                                       | list the operations for the provider x-ms-original-file: 2025-04-15-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                                                  |
| [scheduledActionExtensionListByVmsSample.js][scheduledactionextensionlistbyvmssample]                                 | list ScheduledActionResources resources by parent x-ms-original-file: 2025-04-15-preview/ScheduledActionExtension_ListByVms_MaximumSet_Gen.json                                                                                                                                  |
| [scheduledActionsAttachResourcesSample.js][scheduledactionsattachresourcessample]                                     | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_AttachResources_MaximumSet_Gen.json                                                                                                                                                       |
| [scheduledActionsCancelNextOccurrenceSample.js][scheduledactionscancelnextoccurrencesample]                           | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_CancelNextOccurrence_MaximumSet_Gen.json                                                                                                                                                  |
| [scheduledActionsCreateOrUpdateSample.js][scheduledactionscreateorupdatesample]                                       | create a ScheduledAction x-ms-original-file: 2025-04-15-preview/ScheduledActions_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                                              |
| [scheduledActionsDeleteSample.js][scheduledactionsdeletesample]                                                       | delete a ScheduledAction x-ms-original-file: 2025-04-15-preview/ScheduledActions_Delete_MaximumSet_Gen.json                                                                                                                                                                      |
| [scheduledActionsDetachResourcesSample.js][scheduledactionsdetachresourcessample]                                     | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_DetachResources_MaximumSet_Gen.json                                                                                                                                                       |
| [scheduledActionsDisableSample.js][scheduledactionsdisablesample]                                                     | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_Disable_MaximumSet_Gen.json                                                                                                                                                               |
| [scheduledActionsEnableSample.js][scheduledactionsenablesample]                                                       | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_Enable_MaximumSet_Gen.json                                                                                                                                                                |
| [scheduledActionsGetSample.js][scheduledactionsgetsample]                                                             | get a ScheduledAction x-ms-original-file: 2025-04-15-preview/ScheduledActions_Get_MaximumSet_Gen.json                                                                                                                                                                            |
| [scheduledActionsListByResourceGroupSample.js][scheduledactionslistbyresourcegroupsample]                             | list ScheduledAction resources by resource group x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListByResourceGroup_MaximumSet_Gen.json                                                                                                                                 |
| [scheduledActionsListBySubscriptionSample.js][scheduledactionslistbysubscriptionsample]                               | list ScheduledAction resources by subscription ID x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListBySubscription_MaximumSet_Gen.json                                                                                                                                 |
| [scheduledActionsListResourcesSample.js][scheduledactionslistresourcessample]                                         | list resources attached to Scheduled Actions x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListResources_MaximumSet_Gen.json                                                                                                                                           |
| [scheduledActionsPatchResourcesSample.js][scheduledactionspatchresourcessample]                                       | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_PatchResources_MaximumSet_Gen.json                                                                                                                                                        |
| [scheduledActionsTriggerManualOccurrenceSample.js][scheduledactionstriggermanualoccurrencesample]                     | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_TriggerManualOccurrence_MaximumSet_Gen.json                                                                                                                                               |
| [scheduledActionsUpdateSample.js][scheduledactionsupdatesample]                                                       | update a ScheduledAction x-ms-original-file: 2025-04-15-preview/ScheduledActions_Update_MaximumSet_Gen.json                                                                                                                                                                      |
| [scheduledActionsVirtualMachinesCancelOperationsSample.js][scheduledactionsvirtualmachinescanceloperationssample]     | virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json                                                                  |
| [scheduledActionsVirtualMachinesExecuteCreateSample.js][scheduledactionsvirtualmachinesexecutecreatesample]           | virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteCreate_MaximumSet_Gen.json             |
| [scheduledActionsVirtualMachinesExecuteDeallocateSample.js][scheduledactionsvirtualmachinesexecutedeallocatesample]   | virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteDeallocate_MaximumSet_Gen.json |
| [scheduledActionsVirtualMachinesExecuteDeleteSample.js][scheduledactionsvirtualmachinesexecutedeletesample]           | virtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteDelete_MaximumSet_Gen.json             |
| [scheduledActionsVirtualMachinesExecuteHibernateSample.js][scheduledactionsvirtualmachinesexecutehibernatesample]     | virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteHibernate_MaximumSet_Gen.json    |
| [scheduledActionsVirtualMachinesExecuteStartSample.js][scheduledactionsvirtualmachinesexecutestartsample]             | virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteStart_MaximumSet_Gen.json                |
| [scheduledActionsVirtualMachinesGetOperationErrorsSample.js][scheduledactionsvirtualmachinesgetoperationerrorssample] | virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesGetOperationErrors_MaximumSet_Gen.json                       |
| [scheduledActionsVirtualMachinesGetOperationStatusSample.js][scheduledactionsvirtualmachinesgetoperationstatussample] | virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json                                                     |
| [scheduledActionsVirtualMachinesSubmitDeallocateSample.js][scheduledactionsvirtualmachinessubmitdeallocatesample]     | virtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitDeallocate_MaximumSet_Gen.json                                                |
| [scheduledActionsVirtualMachinesSubmitHibernateSample.js][scheduledactionsvirtualmachinessubmithibernatesample]       | virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitHibernate_MaximumSet_Gen.json                                                   |
| [scheduledActionsVirtualMachinesSubmitStartSample.js][scheduledactionsvirtualmachinessubmitstartsample]               | virtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitStart_MaximumSet_Gen.json                                                               |

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
node occurrenceExtensionListOccurrenceByVmsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node occurrenceExtensionListOccurrenceByVmsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[occurrenceextensionlistoccurrencebyvmssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/occurrenceExtensionListOccurrenceByVmsSample.js
[occurrencescancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/occurrencesCancelSample.js
[occurrencesdelaysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/occurrencesDelaySample.js
[occurrencesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/occurrencesGetSample.js
[occurrenceslistbyscheduledactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/occurrencesListByScheduledActionSample.js
[occurrenceslistresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/occurrencesListResourcesSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/operationsListSample.js
[scheduledactionextensionlistbyvmssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionExtensionListByVmsSample.js
[scheduledactionsattachresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsAttachResourcesSample.js
[scheduledactionscancelnextoccurrencesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsCancelNextOccurrenceSample.js
[scheduledactionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsCreateOrUpdateSample.js
[scheduledactionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsDeleteSample.js
[scheduledactionsdetachresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsDetachResourcesSample.js
[scheduledactionsdisablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsDisableSample.js
[scheduledactionsenablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsEnableSample.js
[scheduledactionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsGetSample.js
[scheduledactionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsListByResourceGroupSample.js
[scheduledactionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsListBySubscriptionSample.js
[scheduledactionslistresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsListResourcesSample.js
[scheduledactionspatchresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsPatchResourcesSample.js
[scheduledactionstriggermanualoccurrencesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsTriggerManualOccurrenceSample.js
[scheduledactionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsUpdateSample.js
[scheduledactionsvirtualmachinescanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesCancelOperationsSample.js
[scheduledactionsvirtualmachinesexecutecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesExecuteCreateSample.js
[scheduledactionsvirtualmachinesexecutedeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesExecuteDeallocateSample.js
[scheduledactionsvirtualmachinesexecutedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesExecuteDeleteSample.js
[scheduledactionsvirtualmachinesexecutehibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesExecuteHibernateSample.js
[scheduledactionsvirtualmachinesexecutestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesExecuteStartSample.js
[scheduledactionsvirtualmachinesgetoperationerrorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesGetOperationErrorsSample.js
[scheduledactionsvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesGetOperationStatusSample.js
[scheduledactionsvirtualmachinessubmitdeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesSubmitDeallocateSample.js
[scheduledactionsvirtualmachinessubmithibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesSubmitHibernateSample.js
[scheduledactionsvirtualmachinessubmitstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/javascript/scheduledActionsVirtualMachinesSubmitStartSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computeschedule?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computeschedule/arm-computeschedule/README.md
