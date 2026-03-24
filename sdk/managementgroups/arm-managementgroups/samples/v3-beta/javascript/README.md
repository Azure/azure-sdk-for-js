# @azure/arm-managementgroups client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-managementgroups in some common scenarios.

| **File Name**                                                                                                                                       | **Description**                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilitySample.js][checknameavailabilitysample]                                                                                       | checks if the specified management group name is valid and unique x-ms-original-file: 2023-04-01/CheckManagementGroupNameAvailability.json                                                                                                                 |
| [entitiesListSample.js][entitieslistsample]                                                                                                         | list all entities (Management Groups, Subscriptions, etc.) for the authenticated user. x-ms-original-file: 2023-04-01/GetEntities.json                                                                                                                     |
| [hierarchySettingsCreateOrUpdateSample.js][hierarchysettingscreateorupdatesample]                                                                   | creates or updates the hierarchy settings defined at the Management Group level. x-ms-original-file: 2023-04-01/PutHierarchySettings.json                                                                                                                  |
| [hierarchySettingsDeleteSample.js][hierarchysettingsdeletesample]                                                                                   | deletes the hierarchy settings defined at the Management Group level. x-ms-original-file: 2023-04-01/DeleteHierarchySettings.json                                                                                                                          |
| [hierarchySettingsGetSample.js][hierarchysettingsgetsample]                                                                                         | gets the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. x-ms-original-file: 2023-04-01/GetHierarchySettings.json                                                        |
| [hierarchySettingsListSample.js][hierarchysettingslistsample]                                                                                       | gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. x-ms-original-file: 2023-04-01/ListHierarchySettings.json                                                   |
| [hierarchySettingsUpdateSample.js][hierarchysettingsupdatesample]                                                                                   | updates the hierarchy settings defined at the Management Group level. x-ms-original-file: 2023-04-01/PatchHierarchySettings.json                                                                                                                           |
| [managementGroupSubscriptionsCreateSample.js][managementgroupsubscriptionscreatesample]                                                             | associates existing subscription with the management group. x-ms-original-file: 2023-04-01/AddManagementGroupSubscription.json                                                                                                                             |
| [managementGroupSubscriptionsDeleteSample.js][managementgroupsubscriptionsdeletesample]                                                             | de-associates subscription from the management group. x-ms-original-file: 2023-04-01/RemoveManagementGroupSubscription.json                                                                                                                                |
| [managementGroupSubscriptionsGetSubscriptionSample.js][managementgroupsubscriptionsgetsubscriptionsample]                                           | retrieves details about given subscription which is associated with the management group. x-ms-original-file: 2023-04-01/GetSubscriptionFromManagementGroup.json                                                                                           |
| [managementGroupSubscriptionsGetSubscriptionsUnderManagementGroupSample.js][managementgroupsubscriptionsgetsubscriptionsundermanagementgroupsample] | retrieves details about all subscriptions which are associated with the management group. x-ms-original-file: 2023-04-01/GetAllSubscriptionsFromManagementGroup.json                                                                                       |
| [managementGroupsCreateOrUpdateSample.js][managementgroupscreateorupdatesample]                                                                     | create or update a management group. If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated. x-ms-original-file: 2023-04-01/PutManagementGroup.json |
| [managementGroupsDeleteSample.js][managementgroupsdeletesample]                                                                                     | delete management group. If a management group contains child resources, the request will fail. x-ms-original-file: 2023-04-01/DeleteManagementGroup.json                                                                                                  |
| [managementGroupsGetDescendantsSample.js][managementgroupsgetdescendantssample]                                                                     | list all entities that descend from a management group. x-ms-original-file: 2023-04-01/GetDescendants.json                                                                                                                                                 |
| [managementGroupsGetSample.js][managementgroupsgetsample]                                                                                           | get the details of the management group. x-ms-original-file: 2023-04-01/GetManagementGroup.json                                                                                                                                                            |
| [managementGroupsListSample.js][managementgroupslistsample]                                                                                         | list management groups for the authenticated user. x-ms-original-file: 2023-04-01/ListManagementGroups.json                                                                                                                                                |
| [managementGroupsUpdateSample.js][managementgroupsupdatesample]                                                                                     | update a management group. x-ms-original-file: 2023-04-01/PatchManagementGroup.json                                                                                                                                                                        |
| [operationsListSample.js][operationslistsample]                                                                                                     | list the operations for the provider x-ms-original-file: 2023-04-01/ListOperations.json                                                                                                                                                                    |
| [startTenantBackfillSample.js][starttenantbackfillsample]                                                                                           | starts backfilling subscriptions for the Tenant. x-ms-original-file: 2023-04-01/StartTenantBackfillRequest.json                                                                                                                                            |
| [tenantBackfillStatusSample.js][tenantbackfillstatussample]                                                                                         | gets tenant backfill status x-ms-original-file: 2023-04-01/TenantBackfillStatusRequest.json                                                                                                                                                                |

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
node checkNameAvailabilitySample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node checkNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/checkNameAvailabilitySample.js
[entitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/entitiesListSample.js
[hierarchysettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/hierarchySettingsCreateOrUpdateSample.js
[hierarchysettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/hierarchySettingsDeleteSample.js
[hierarchysettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/hierarchySettingsGetSample.js
[hierarchysettingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/hierarchySettingsListSample.js
[hierarchysettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/hierarchySettingsUpdateSample.js
[managementgroupsubscriptionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupSubscriptionsCreateSample.js
[managementgroupsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupSubscriptionsDeleteSample.js
[managementgroupsubscriptionsgetsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupSubscriptionsGetSubscriptionSample.js
[managementgroupsubscriptionsgetsubscriptionsundermanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupSubscriptionsGetSubscriptionsUnderManagementGroupSample.js
[managementgroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupsCreateOrUpdateSample.js
[managementgroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupsDeleteSample.js
[managementgroupsgetdescendantssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupsGetDescendantsSample.js
[managementgroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupsGetSample.js
[managementgroupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupsListSample.js
[managementgroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/managementGroupsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/operationsListSample.js
[starttenantbackfillsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/startTenantBackfillSample.js
[tenantbackfillstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/javascript/tenantBackfillStatusSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-managementgroups?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/managementgroups/arm-managementgroups/README.md
