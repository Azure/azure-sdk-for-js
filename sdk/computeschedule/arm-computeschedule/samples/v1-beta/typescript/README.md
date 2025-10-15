# @azure/arm-computeschedule client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-computeschedule in some common scenarios.

| **File Name**                                                                                                         | **Description**                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [occurrenceExtensionListOccurrenceByVmsSample.ts][occurrenceextensionlistoccurrencebyvmssample]                       | list OccurrenceExtensionResource resources by parent x-ms-original-file: 2025-04-15-preview/OccurrenceExtension_ListOccurrenceByVms_MaximumSet_Gen.json                                                                                                                          |
| [occurrencesCancelSample.ts][occurrencescancelsample]                                                                 | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/Occurrences_Cancel_MaximumSet_Gen.json                                                                                                                                                                     |
| [occurrencesDelaySample.ts][occurrencesdelaysample]                                                                   | a long-running resource action. x-ms-original-file: 2025-04-15-preview/Occurrences_Delay_MaximumSet_Gen.json                                                                                                                                                                     |
| [occurrencesGetSample.ts][occurrencesgetsample]                                                                       | get a Occurrence x-ms-original-file: 2025-04-15-preview/Occurrences_Get_MaximumSet_Gen.json                                                                                                                                                                                      |
| [occurrencesListByScheduledActionSample.ts][occurrenceslistbyscheduledactionsample]                                   | list Occurrence resources by ScheduledAction x-ms-original-file: 2025-04-15-preview/Occurrences_ListByScheduledAction_MaximumSet_Gen.json                                                                                                                                        |
| [occurrencesListResourcesSample.ts][occurrenceslistresourcessample]                                                   | list resources attached to Scheduled Actions for the given occurrence x-ms-original-file: 2025-04-15-preview/Occurrences_ListResources_MaximumSet_Gen.json                                                                                                                       |
| [operationsListSample.ts][operationslistsample]                                                                       | list the operations for the provider x-ms-original-file: 2025-04-15-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                                                  |
| [scheduledActionExtensionListByVmsSample.ts][scheduledactionextensionlistbyvmssample]                                 | list ScheduledActionResources resources by parent x-ms-original-file: 2025-04-15-preview/ScheduledActionExtension_ListByVms_MaximumSet_Gen.json                                                                                                                                  |
| [scheduledActionsAttachResourcesSample.ts][scheduledactionsattachresourcessample]                                     | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_AttachResources_MaximumSet_Gen.json                                                                                                                                                       |
| [scheduledActionsCancelNextOccurrenceSample.ts][scheduledactionscancelnextoccurrencesample]                           | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_CancelNextOccurrence_MaximumSet_Gen.json                                                                                                                                                  |
| [scheduledActionsCreateOrUpdateSample.ts][scheduledactionscreateorupdatesample]                                       | create a ScheduledAction x-ms-original-file: 2025-04-15-preview/ScheduledActions_CreateOrUpdate_MaximumSet_Gen.json                                                                                                                                                              |
| [scheduledActionsDeleteSample.ts][scheduledactionsdeletesample]                                                       | delete a ScheduledAction x-ms-original-file: 2025-04-15-preview/ScheduledActions_Delete_MaximumSet_Gen.json                                                                                                                                                                      |
| [scheduledActionsDetachResourcesSample.ts][scheduledactionsdetachresourcessample]                                     | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_DetachResources_MaximumSet_Gen.json                                                                                                                                                       |
| [scheduledActionsDisableSample.ts][scheduledactionsdisablesample]                                                     | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_Disable_MaximumSet_Gen.json                                                                                                                                                               |
| [scheduledActionsEnableSample.ts][scheduledactionsenablesample]                                                       | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_Enable_MaximumSet_Gen.json                                                                                                                                                                |
| [scheduledActionsGetSample.ts][scheduledactionsgetsample]                                                             | get a ScheduledAction x-ms-original-file: 2025-04-15-preview/ScheduledActions_Get_MaximumSet_Gen.json                                                                                                                                                                            |
| [scheduledActionsListByResourceGroupSample.ts][scheduledactionslistbyresourcegroupsample]                             | list ScheduledAction resources by resource group x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListByResourceGroup_MaximumSet_Gen.json                                                                                                                                 |
| [scheduledActionsListBySubscriptionSample.ts][scheduledactionslistbysubscriptionsample]                               | list ScheduledAction resources by subscription ID x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListBySubscription_MaximumSet_Gen.json                                                                                                                                 |
| [scheduledActionsListResourcesSample.ts][scheduledactionslistresourcessample]                                         | list resources attached to Scheduled Actions x-ms-original-file: 2025-04-15-preview/ScheduledActions_ListResources_MaximumSet_Gen.json                                                                                                                                           |
| [scheduledActionsPatchResourcesSample.ts][scheduledactionspatchresourcessample]                                       | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_PatchResources_MaximumSet_Gen.json                                                                                                                                                        |
| [scheduledActionsTriggerManualOccurrenceSample.ts][scheduledactionstriggermanualoccurrencesample]                     | a synchronous resource action. x-ms-original-file: 2025-04-15-preview/ScheduledActions_TriggerManualOccurrence_MaximumSet_Gen.json                                                                                                                                               |
| [scheduledActionsUpdateSample.ts][scheduledactionsupdatesample]                                                       | update a ScheduledAction x-ms-original-file: 2025-04-15-preview/ScheduledActions_Update_MaximumSet_Gen.json                                                                                                                                                                      |
| [scheduledActionsVirtualMachinesCancelOperationsSample.ts][scheduledactionsvirtualmachinescanceloperationssample]     | virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json                                                                  |
| [scheduledActionsVirtualMachinesExecuteCreateSample.ts][scheduledactionsvirtualmachinesexecutecreatesample]           | virtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteCreate_MaximumSet_Gen.json             |
| [scheduledActionsVirtualMachinesExecuteDeallocateSample.ts][scheduledactionsvirtualmachinesexecutedeallocatesample]   | virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteDeallocate_MaximumSet_Gen.json |
| [scheduledActionsVirtualMachinesExecuteDeleteSample.ts][scheduledactionsvirtualmachinesexecutedeletesample]           | virtualMachinesExecuteDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteDelete_MaximumSet_Gen.json             |
| [scheduledActionsVirtualMachinesExecuteHibernateSample.ts][scheduledactionsvirtualmachinesexecutehibernatesample]     | virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteHibernate_MaximumSet_Gen.json    |
| [scheduledActionsVirtualMachinesExecuteStartSample.ts][scheduledactionsvirtualmachinesexecutestartsample]             | virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteStart_MaximumSet_Gen.json                |
| [scheduledActionsVirtualMachinesGetOperationErrorsSample.ts][scheduledactionsvirtualmachinesgetoperationerrorssample] | virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesGetOperationErrors_MaximumSet_Gen.json                       |
| [scheduledActionsVirtualMachinesGetOperationStatusSample.ts][scheduledactionsvirtualmachinesgetoperationstatussample] | virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json                                                     |
| [scheduledActionsVirtualMachinesSubmitDeallocateSample.ts][scheduledactionsvirtualmachinessubmitdeallocatesample]     | virtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitDeallocate_MaximumSet_Gen.json                                                |
| [scheduledActionsVirtualMachinesSubmitHibernateSample.ts][scheduledactionsvirtualmachinessubmithibernatesample]       | virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitHibernate_MaximumSet_Gen.json                                                   |
| [scheduledActionsVirtualMachinesSubmitStartSample.ts][scheduledactionsvirtualmachinessubmitstartsample]               | virtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future. x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitStart_MaximumSet_Gen.json                                                               |

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
node dist/occurrenceExtensionListOccurrenceByVmsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/occurrenceExtensionListOccurrenceByVmsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[occurrenceextensionlistoccurrencebyvmssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/occurrenceExtensionListOccurrenceByVmsSample.ts
[occurrencescancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/occurrencesCancelSample.ts
[occurrencesdelaysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/occurrencesDelaySample.ts
[occurrencesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/occurrencesGetSample.ts
[occurrenceslistbyscheduledactionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/occurrencesListByScheduledActionSample.ts
[occurrenceslistresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/occurrencesListResourcesSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/operationsListSample.ts
[scheduledactionextensionlistbyvmssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionExtensionListByVmsSample.ts
[scheduledactionsattachresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsAttachResourcesSample.ts
[scheduledactionscancelnextoccurrencesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsCancelNextOccurrenceSample.ts
[scheduledactionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsCreateOrUpdateSample.ts
[scheduledactionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsDeleteSample.ts
[scheduledactionsdetachresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsDetachResourcesSample.ts
[scheduledactionsdisablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsDisableSample.ts
[scheduledactionsenablesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsEnableSample.ts
[scheduledactionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsGetSample.ts
[scheduledactionslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsListByResourceGroupSample.ts
[scheduledactionslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsListBySubscriptionSample.ts
[scheduledactionslistresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsListResourcesSample.ts
[scheduledactionspatchresourcessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsPatchResourcesSample.ts
[scheduledactionstriggermanualoccurrencesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsTriggerManualOccurrenceSample.ts
[scheduledactionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsUpdateSample.ts
[scheduledactionsvirtualmachinescanceloperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesCancelOperationsSample.ts
[scheduledactionsvirtualmachinesexecutecreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesExecuteCreateSample.ts
[scheduledactionsvirtualmachinesexecutedeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesExecuteDeallocateSample.ts
[scheduledactionsvirtualmachinesexecutedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesExecuteDeleteSample.ts
[scheduledactionsvirtualmachinesexecutehibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesExecuteHibernateSample.ts
[scheduledactionsvirtualmachinesexecutestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesExecuteStartSample.ts
[scheduledactionsvirtualmachinesgetoperationerrorssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesGetOperationErrorsSample.ts
[scheduledactionsvirtualmachinesgetoperationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesGetOperationStatusSample.ts
[scheduledactionsvirtualmachinessubmitdeallocatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesSubmitDeallocateSample.ts
[scheduledactionsvirtualmachinessubmithibernatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesSubmitHibernateSample.ts
[scheduledactionsvirtualmachinessubmitstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/computeschedule/arm-computeschedule/samples/v1-beta/typescript/src/scheduledActionsVirtualMachinesSubmitStartSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computeschedule?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/computeschedule/arm-computeschedule/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
