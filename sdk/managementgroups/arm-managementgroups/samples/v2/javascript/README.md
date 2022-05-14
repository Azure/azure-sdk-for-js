# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilitySample.js][checknameavailabilitysample]                                                                                       | Checks if the specified management group name is valid and unique x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/CheckManagementGroupNameAvailability.json                                                                                                                                        |
| [entitiesListSample.js][entitieslistsample]                                                                                                         | List all entities (Management Groups, Subscriptions, etc.) for the authenticated user. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetEntities.json                                                                                                                     |
| [hierarchySettingsCreateOrUpdateSample.js][hierarchysettingscreateorupdatesample]                                                                   | Creates or updates the hierarchy settings defined at the Management Group level. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PutHierarchySettings.json                                                                                                                  |
| [hierarchySettingsDeleteSample.js][hierarchysettingsdeletesample]                                                                                   | Deletes the hierarchy settings defined at the Management Group level. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/DeleteHierarchySettings.json                                                                                                                          |
| [hierarchySettingsGetSample.js][hierarchysettingsgetsample]                                                                                         | Gets the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetHierarchySettings.json                                                        |
| [hierarchySettingsListSample.js][hierarchysettingslistsample]                                                                                       | Gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/ListHierarchySettings.json                                                   |
| [hierarchySettingsUpdateSample.js][hierarchysettingsupdatesample]                                                                                   | Updates the hierarchy settings defined at the Management Group level. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PatchHierarchySettings.json                                                                                                                           |
| [managementGroupSubscriptionsCreateSample.js][managementgroupsubscriptionscreatesample]                                                             | Associates existing subscription with the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/AddManagementGroupSubscription.json                                                                                                                             |
| [managementGroupSubscriptionsDeleteSample.js][managementgroupsubscriptionsdeletesample]                                                             | De-associates subscription from the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/RemoveManagementGroupSubscription.json                                                                                                                                |
| [managementGroupSubscriptionsGetSubscriptionSample.js][managementgroupsubscriptionsgetsubscriptionsample]                                           | Retrieves details about given subscription which is associated with the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetSubscriptionFromManagementGroup.json                                                                                           |
| [managementGroupSubscriptionsGetSubscriptionsUnderManagementGroupSample.js][managementgroupsubscriptionsgetsubscriptionsundermanagementgroupsample] | Retrieves details about all subscriptions which are associated with the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetAllSubscriptionsFromManagementGroup.json                                                                                       |
| [managementGroupsCreateOrUpdateSample.js][managementgroupscreateorupdatesample]                                                                     | Create or update a management group. If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PutManagementGroup.json |
| [managementGroupsDeleteSample.js][managementgroupsdeletesample]                                                                                     | Delete management group. If a management group contains child resources, the request will fail. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/DeleteManagementGroup.json                                                                                                  |
| [managementGroupsGetDescendantsSample.js][managementgroupsgetdescendantssample]                                                                     | List all entities that descend from a management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetDescendants.json                                                                                                                                                 |
| [managementGroupsGetSample.js][managementgroupsgetsample]                                                                                           | Get the details of the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetManagementGroup.json                                                                                                                                                            |
| [managementGroupsListSample.js][managementgroupslistsample]                                                                                         | List management groups for the authenticated user. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/ListManagementGroups.json                                                                                                                                                |
| [managementGroupsUpdateSample.js][managementgroupsupdatesample]                                                                                     | Update a management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PatchManagementGroup.json                                                                                                                                                                        |
| [operationsListSample.js][operationslistsample]                                                                                                     | Lists all of the available Management REST API operations. x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/ListOperations.json                                                                                                                                                                     |
| [startTenantBackfillSample.js][starttenantbackfillsample]                                                                                           | Starts backfilling subscriptions for the Tenant. x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/StartTenantBackfillRequest.json                                                                                                                                                                   |
| [tenantBackfillStatusSample.js][tenantbackfillstatussample]                                                                                         | Gets tenant backfill status x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/TenantBackfillStatusRequest.json                                                                                                                                                                                       |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node checkNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/checkNameAvailabilitySample.js
[entitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/entitiesListSample.js
[hierarchysettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/hierarchySettingsCreateOrUpdateSample.js
[hierarchysettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/hierarchySettingsDeleteSample.js
[hierarchysettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/hierarchySettingsGetSample.js
[hierarchysettingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/hierarchySettingsListSample.js
[hierarchysettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/hierarchySettingsUpdateSample.js
[managementgroupsubscriptionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupSubscriptionsCreateSample.js
[managementgroupsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupSubscriptionsDeleteSample.js
[managementgroupsubscriptionsgetsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupSubscriptionsGetSubscriptionSample.js
[managementgroupsubscriptionsgetsubscriptionsundermanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupSubscriptionsGetSubscriptionsUnderManagementGroupSample.js
[managementgroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupsCreateOrUpdateSample.js
[managementgroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupsDeleteSample.js
[managementgroupsgetdescendantssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupsGetDescendantsSample.js
[managementgroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupsGetSample.js
[managementgroupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupsListSample.js
[managementgroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/managementGroupsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/operationsListSample.js
[starttenantbackfillsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/startTenantBackfillSample.js
[tenantbackfillstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/javascript/tenantBackfillStatusSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-managementgroups?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/managementgroups/arm-managementgroups/README.md
