# @azure/arm-maintenance client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-maintenance in some common scenarios.

| **File Name**                                                                                                                   | **Description**                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [applyUpdateForResourceGroupListSample.js][applyupdateforresourcegrouplistsample]                                               | get Configuration records within a subscription and resource group x-ms-original-file: 2023-10-01-preview/ApplyUpdatesResourceGroup_List.json                                                        |
| [applyUpdatesCreateOrUpdateOrCancelSample.js][applyupdatescreateorupdateorcancelsample]                                         | apply maintenance updates to resource x-ms-original-file: 2023-10-01-preview/ApplyUpdates_CreateOrUpdateOnly_NoCancellation.json                                                                     |
| [applyUpdatesCreateOrUpdateParentSample.js][applyupdatescreateorupdateparentsample]                                             | apply maintenance updates to resource with parent x-ms-original-file: 2023-10-01-preview/ApplyUpdates_CreateOrUpdateParent.json                                                                      |
| [applyUpdatesCreateOrUpdateSample.js][applyupdatescreateorupdatesample]                                                         | apply maintenance updates to resource x-ms-original-file: 2023-10-01-preview/ApplyUpdates_CreateOrUpdate.json                                                                                        |
| [applyUpdatesGetParentSample.js][applyupdatesgetparentsample]                                                                   | track maintenance updates to resource with parent x-ms-original-file: 2023-10-01-preview/ApplyUpdates_GetParent.json                                                                                 |
| [applyUpdatesGetSample.js][applyupdatesgetsample]                                                                               | track maintenance updates to resource x-ms-original-file: 2023-10-01-preview/ApplyUpdates_Get.json                                                                                                   |
| [applyUpdatesListSample.js][applyupdateslistsample]                                                                             | get Configuration records within a subscription x-ms-original-file: 2023-10-01-preview/ApplyUpdates_List.json                                                                                        |
| [configurationAssignmentsCreateOrUpdateParentSample.js][configurationassignmentscreateorupdateparentsample]                     | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_CreateOrUpdateParent.json                                                                       |
| [configurationAssignmentsCreateOrUpdateSample.js][configurationassignmentscreateorupdatesample]                                 | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_CreateOrUpdate.json                                                                             |
| [configurationAssignmentsDeleteParentSample.js][configurationassignmentsdeleteparentsample]                                     | unregister configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_DeleteParent.json                                                                             |
| [configurationAssignmentsDeleteSample.js][configurationassignmentsdeletesample]                                                 | unregister configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_Delete.json                                                                                   |
| [configurationAssignmentsForResourceGroupCreateOrUpdateSample.js][configurationassignmentsforresourcegroupcreateorupdatesample] | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_CreateOrUpdate.json                                                             |
| [configurationAssignmentsForResourceGroupDeleteSample.js][configurationassignmentsforresourcegroupdeletesample]                 | unregister configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_Delete.json                                                                   |
| [configurationAssignmentsForResourceGroupGetSample.js][configurationassignmentsforresourcegroupgetsample]                       | get configuration assignment for resource.. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_Get.json                                                                 |
| [configurationAssignmentsForResourceGroupUpdateSample.js][configurationassignmentsforresourcegroupupdatesample]                 | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_UpdateForResource.json                                                          |
| [configurationAssignmentsForSubscriptionsCreateOrUpdateSample.js][configurationassignmentsforsubscriptionscreateorupdatesample] | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_CreateOrUpdate.json                                                             |
| [configurationAssignmentsForSubscriptionsDeleteSample.js][configurationassignmentsforsubscriptionsdeletesample]                 | unregister configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_Delete.json                                                                   |
| [configurationAssignmentsForSubscriptionsGetSample.js][configurationassignmentsforsubscriptionsgetsample]                       | get configuration assignment for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_Get.json                                                                  |
| [configurationAssignmentsForSubscriptionsUpdateSample.js][configurationassignmentsforsubscriptionsupdatesample]                 | register configuration for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForSubscriptions_UpdateForResource.json                                                          |
| [configurationAssignmentsGetParentSample.js][configurationassignmentsgetparentsample]                                           | get configuration assignment for resource.. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_GetParent.json                                                                           |
| [configurationAssignmentsGetSample.js][configurationassignmentsgetsample]                                                       | get configuration assignment for resource.. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_Get.json                                                                                 |
| [configurationAssignmentsListParentSample.js][configurationassignmentslistparentsample]                                         | list configurationAssignments for resource. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_ListParent.json                                                                          |
| [configurationAssignmentsListSample.js][configurationassignmentslistsample]                                                     | get Configuration records within a subscription and resource group x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_List.json                                                         |
| [configurationAssignmentsWithinSubscriptionListSample.js][configurationassignmentswithinsubscriptionlistsample]                 | [UNSUPPORTED] Get configuration assignment within a subscription. This API is not implemented yet. x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsResultWithinSubscription_List.json |
| [maintenanceConfigurationsCreateOrUpdateSample.js][maintenanceconfigurationscreateorupdatesample]                               | create or Update configuration record x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_CreateOrUpdateForResource.json                                                                |
| [maintenanceConfigurationsDeleteSample.js][maintenanceconfigurationsdeletesample]                                               | delete Configuration record x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_DeleteForResource.json                                                                                  |
| [maintenanceConfigurationsForResourceGroupListSample.js][maintenanceconfigurationsforresourcegrouplistsample]                   | get Configuration records within a subscription and resource group x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurationsResourceGroup_List.json                                           |
| [maintenanceConfigurationsGetSample.js][maintenanceconfigurationsgetsample]                                                     | get Configuration record x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_GetForResource.json                                                                                        |
| [maintenanceConfigurationsListSample.js][maintenanceconfigurationslistsample]                                                   | get Configuration records within a subscription x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_List.json                                                                           |
| [maintenanceConfigurationsUpdateSample.js][maintenanceconfigurationsupdatesample]                                               | patch configuration record x-ms-original-file: 2023-10-01-preview/MaintenanceConfigurations_UpdateForResource.json                                                                                   |
| [operationsListSample.js][operationslistsample]                                                                                 | list the operations for the provider x-ms-original-file: 2023-10-01-preview/Operations_List.json                                                                                                     |
| [publicMaintenanceConfigurationsGetSample.js][publicmaintenanceconfigurationsgetsample]                                         | get Public Maintenance Configuration record x-ms-original-file: 2023-10-01-preview/PublicMaintenanceConfigurations_GetForResource.json                                                               |
| [publicMaintenanceConfigurationsListSample.js][publicmaintenanceconfigurationslistsample]                                       | get Public Maintenance Configuration records x-ms-original-file: 2023-10-01-preview/PublicMaintenanceConfigurations_List.json                                                                        |
| [scheduledEventAcknowledgeSample.js][scheduledeventacknowledgesample]                                                           | post Scheduled Event Acknowledgement x-ms-original-file: 2023-10-01-preview/ScheduledEvents_Acknowledge.json                                                                                         |
| [updatesListParentSample.js][updateslistparentsample]                                                                           | get updates to resources. x-ms-original-file: 2023-10-01-preview/Updates_ListParent.json                                                                                                             |
| [updatesListSample.js][updateslistsample]                                                                                       | get updates to resources. x-ms-original-file: 2023-10-01-preview/Updates_List.json                                                                                                                   |

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
node applyUpdateForResourceGroupListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node applyUpdateForResourceGroupListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applyupdateforresourcegrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/applyUpdateForResourceGroupListSample.js
[applyupdatescreateorupdateorcancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/applyUpdatesCreateOrUpdateOrCancelSample.js
[applyupdatescreateorupdateparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/applyUpdatesCreateOrUpdateParentSample.js
[applyupdatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/applyUpdatesCreateOrUpdateSample.js
[applyupdatesgetparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/applyUpdatesGetParentSample.js
[applyupdatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/applyUpdatesGetSample.js
[applyupdateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/applyUpdatesListSample.js
[configurationassignmentscreateorupdateparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsCreateOrUpdateParentSample.js
[configurationassignmentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsCreateOrUpdateSample.js
[configurationassignmentsdeleteparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsDeleteParentSample.js
[configurationassignmentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsDeleteSample.js
[configurationassignmentsforresourcegroupcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsForResourceGroupCreateOrUpdateSample.js
[configurationassignmentsforresourcegroupdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsForResourceGroupDeleteSample.js
[configurationassignmentsforresourcegroupgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsForResourceGroupGetSample.js
[configurationassignmentsforresourcegroupupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsForResourceGroupUpdateSample.js
[configurationassignmentsforsubscriptionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsForSubscriptionsCreateOrUpdateSample.js
[configurationassignmentsforsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsForSubscriptionsDeleteSample.js
[configurationassignmentsforsubscriptionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsForSubscriptionsGetSample.js
[configurationassignmentsforsubscriptionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsForSubscriptionsUpdateSample.js
[configurationassignmentsgetparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsGetParentSample.js
[configurationassignmentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsGetSample.js
[configurationassignmentslistparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsListParentSample.js
[configurationassignmentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsListSample.js
[configurationassignmentswithinsubscriptionlistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/configurationAssignmentsWithinSubscriptionListSample.js
[maintenanceconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/maintenanceConfigurationsCreateOrUpdateSample.js
[maintenanceconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/maintenanceConfigurationsDeleteSample.js
[maintenanceconfigurationsforresourcegrouplistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/maintenanceConfigurationsForResourceGroupListSample.js
[maintenanceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/maintenanceConfigurationsGetSample.js
[maintenanceconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/maintenanceConfigurationsListSample.js
[maintenanceconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/maintenanceConfigurationsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/operationsListSample.js
[publicmaintenanceconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/publicMaintenanceConfigurationsGetSample.js
[publicmaintenanceconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/publicMaintenanceConfigurationsListSample.js
[scheduledeventacknowledgesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/scheduledEventAcknowledgeSample.js
[updateslistparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/updatesListParentSample.js
[updateslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maintenance/arm-maintenance/samples/v1-beta/javascript/updatesListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-maintenance?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maintenance/arm-maintenance/README.md
