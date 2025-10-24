# @azure/arm-maintenance client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-maintenance in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [applyUpdateForResourceGroupListSample.ts][applyupdateforresourcegrouplistsample]                                               | get Configuration records within a subscription and resource group x-ms-original-file: 2023-10-01-preview/ApplyUpdatesResourceGroup_List.json                                                        |
| [applyUpdatesCreateOrUpdateOrCancelSample.ts][applyupdatescreateorupdateorcancelsample]                                         | apply maintenance updates to resource x-ms-original-file: 2023-10-01-preview/ApplyUpdates_CreateOrUpdateOnly_NoCancellation.json                                                                     |
| [applyUpdatesCreateOrUpdateParentSample.ts][applyupdatescreateorupdateparentsample]                                             | apply maintenance updates to resource with parent x-ms-original-file: 2023-10-01-preview/ApplyUpdates_CreateOrUpdateParent.json                                                                      |
| [applyUpdatesCreateOrUpdateSample.ts][applyupdatescreateorupdatesample]                                                         | apply maintenance updates to resource x-ms-original-file: 2023-10-01-preview/ApplyUpdates_CreateOrUpdate.json                                                                                        |
| [applyUpdatesGetParentSample.ts][applyupdatesgetparentsample]                                                                   | track maintenance updates to resource with parent x-ms-original-file: 2023-10-01-preview/ApplyUpdates_GetParent.json                                                                                 |
| [applyUpdatesGetSample.ts][applyupdatesgetsample]                                                                               | track maintenance updates to resource x-ms-original-file: 2023-10-01-preview/ApplyUpdates_Get.json                                                                                                   |
| [applyUpdatesListSample.ts][applyupdateslistsample]                                                                             | get Configuration records within a subscription x-ms-original-file: 2023-10-01-preview/ApplyUpdates_List.json                                                                                        |
| [configurationAssignmentsCreateOrUpdateParentSample.ts][configurationassignmentscreateorupdateparentsample]                     | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_CreateOrUpdateParent.json                                                                       |
| [configurationAssignmentsCreateOrUpdateSample.ts][configurationassignmentscreateorupdatesample]                                 | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_CreateOrUpdate.json                                                                             |
| [configurationAssignmentsDeleteParentSample.ts][configurationassignmentsdeleteparentsample]                                     | unregister configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_DeleteParent.json                                                                             |
| [configurationAssignmentsDeleteSample.ts][configurationassignmentsdeletesample]                                                 | unregister configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_Delete.json                                                                                   |
| [configurationAssignmentsForResourceGroupCreateOrUpdateSample.ts][configurationassignmentsforresourcegroupcreateorupdatesample] | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_CreateOrUpdate.json                                                             |
| [configurationAssignmentsForResourceGroupDeleteSample.ts][configurationassignmentsforresourcegroupdeletesample]                 | unregister configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_Delete.json                                                                   |
| [configurationAssignmentsForResourceGroupGetSample.ts][configurationassignmentsforresourcegroupgetsample]                       | get configuration assignment for resource.. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_Get.json                                                                 |
| [configurationAssignmentsForResourceGroupUpdateSample.ts][configurationassignmentsforresourcegroupupdatesample]                 | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_UpdateForResource.json                                                          |
| [configurationAssignmentsForSubscriptionsCreateOrUpdateSample.ts][configurationassignmentsforsubscriptionscreateorupdatesample] | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_CreateOrUpdate.json                                                             |
| [configurationAssignmentsForSubscriptionsDeleteSample.ts][configurationassignmentsforsubscriptionsdeletesample]                 | unregister configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_Delete.json                                                                   |
| [configurationAssignmentsForSubscriptionsGetSample.ts][configurationassignmentsforsubscriptionsgetsample]                       | get configuration assignment for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_Get.json                                                                  |
| [configurationAssignmentsForSubscriptionsUpdateSample.ts][configurationassignmentsforsubscriptionsupdatesample]                 | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_UpdateForResource.json                                                          |
| [configurationAssignmentsGetParentSample.ts][configurationassignmentsgetparentsample]                                           | get configuration assignment for resource.. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_GetParent.json                                                                           |
| [configurationAssignmentsGetSample.ts][configurationassignmentsgetsample]                                                       | get configuration assignment for resource.. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_Get.json                                                                                 |
| [configurationAssignmentsListParentSample.ts][configurationassignmentslistparentsample]                                         | list configurationAssignments for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_ListParent.json                                                                          |
| [configurationAssignmentsListSample.ts][configurationassignmentslistsample]                                                     | get Configuration records within a subscription and resource group x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_List.json                                                         |
| [configurationAssignmentsWithinSubscriptionListSample.ts][configurationassignmentswithinsubscriptionlistsample]                 | [UNSUPPORTED] Get configuration assignment within a subscription. This API is not implemented yet. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsResultWithinSubscription_List.json |
| [maintenanceConfigurationsCreateOrUpdateSample.ts][maintenanceconfigurationscreateorupdatesample]                               | create or Update configuration record x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_CreateOrUpdateForResource.json                                                                |
| [maintenanceConfigurationsDeleteSample.ts][maintenanceconfigurationsdeletesample]                                               | delete Configuration record x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_DeleteForResource.json                                                                                  |
| [maintenanceConfigurationsForResourceGroupListSample.ts][maintenanceconfigurationsforresourcegrouplistsample]                   | get Configuration records within a subscription and resource group x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurationsResourceGroup_List.json                                           |
| [maintenanceConfigurationsGetSample.ts][maintenanceconfigurationsgetsample]                                                     | get Configuration record x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_GetForResource.json                                                                                        |
| [maintenanceConfigurationsListSample.ts][maintenanceconfigurationslistsample]                                                   | get Configuration records within a subscription x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_List.json                                                                           |
| [maintenanceConfigurationsUpdateSample.ts][maintenanceconfigurationsupdatesample]                                               | patch configuration record x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_UpdateForResource.json                                                                                   |
| [operationsListSample.ts][operationslistsample]                                                                                 | list the operations for the provider x-ms-original-file: 2023-10-01-preview/Operations_List.json                                                                                                     |
| [publicMaintenanceConfigurationsGetSample.ts][publicmaintenanceconfigurationsgetsample]                                         | get Public Maintenance Configuration record x-ms-original-file: 2023-10-01-preview/PublicMaintenanceConfigurations_GetForResource.json                                                               |
| [publicMaintenanceConfigurationsListSample.ts][publicmaintenanceconfigurationslistsample]                                       | get Public Maintenance Configuration records x-ms-original-file: 2023-10-01-preview/PublicMaintenanceConfigurations_List.json                                                                        |
| [scheduledEventAcknowledgeSample.ts][scheduledeventacknowledgesample]                                                           | post Scheduled Event Acknowledgement x-ms-original-file: 2023-10-01-preview/ScheduledEvents_Acknowledge.json                                                                                         |
| [updatesListParentSample.ts][updateslistparentsample]                                                                           | get updates to resources. x-ms-original-file: 2023-10-01-preview/Updates_ListParent.json                                                                                                             |
| [updatesListSample.ts][updateslistsample]                                                                                       | get updates to resources. x-ms-original-file: 2023-10-01-preview/Updates_List.json                                                                                                                   |

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
node dist/applyUpdateForResourceGroupListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/applyUpdateForResourceGroupListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applyupdateforresourcegrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/applyUpdateForResourceGroupListSample.ts
[applyupdatescreateorupdateorcancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/applyUpdatesCreateOrUpdateOrCancelSample.ts
[applyupdatescreateorupdateparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/applyUpdatesCreateOrUpdateParentSample.ts
[applyupdatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/applyUpdatesCreateOrUpdateSample.ts
[applyupdatesgetparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/applyUpdatesGetParentSample.ts
[applyupdatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/applyUpdatesGetSample.ts
[applyupdateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/applyUpdatesListSample.ts
[configurationassignmentscreateorupdateparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsCreateOrUpdateParentSample.ts
[configurationassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsCreateOrUpdateSample.ts
[configurationassignmentsdeleteparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsDeleteParentSample.ts
[configurationassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsDeleteSample.ts
[configurationassignmentsforresourcegroupcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsForResourceGroupCreateOrUpdateSample.ts
[configurationassignmentsforresourcegroupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsForResourceGroupDeleteSample.ts
[configurationassignmentsforresourcegroupgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsForResourceGroupGetSample.ts
[configurationassignmentsforresourcegroupupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsForResourceGroupUpdateSample.ts
[configurationassignmentsforsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsForSubscriptionsCreateOrUpdateSample.ts
[configurationassignmentsforsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsForSubscriptionsDeleteSample.ts
[configurationassignmentsforsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsForSubscriptionsGetSample.ts
[configurationassignmentsforsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsForSubscriptionsUpdateSample.ts
[configurationassignmentsgetparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsGetParentSample.ts
[configurationassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsGetSample.ts
[configurationassignmentslistparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsListParentSample.ts
[configurationassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsListSample.ts
[configurationassignmentswithinsubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/configurationAssignmentsWithinSubscriptionListSample.ts
[maintenanceconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/maintenanceConfigurationsCreateOrUpdateSample.ts
[maintenanceconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/maintenanceConfigurationsDeleteSample.ts
[maintenanceconfigurationsforresourcegrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/maintenanceConfigurationsForResourceGroupListSample.ts
[maintenanceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/maintenanceConfigurationsGetSample.ts
[maintenanceconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/maintenanceConfigurationsListSample.ts
[maintenanceconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/maintenanceConfigurationsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/operationsListSample.ts
[publicmaintenanceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/publicMaintenanceConfigurationsGetSample.ts
[publicmaintenanceconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/publicMaintenanceConfigurationsListSample.ts
[scheduledeventacknowledgesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/scheduledEventAcknowledgeSample.ts
[updateslistparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/updatesListParentSample.ts
[updateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/typescript/src/updatesListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-maintenance?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maintenance/arm-maintenance/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
