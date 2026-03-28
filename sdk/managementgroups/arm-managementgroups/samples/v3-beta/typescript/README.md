# @azure/arm-managementgroups client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-managementgroups in some common scenarios.

| **File Name**                                                                                                                                       | **Description**                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilitySample.ts][checknameavailabilitysample]                                                                                       | checks if the specified management group name is valid and unique x-ms-original-file: 2023-04-01/CheckManagementGroupNameAvailability.json                                                                                                                 |
| [entitiesListSample.ts][entitieslistsample]                                                                                                         | list all entities (Management Groups, Subscriptions, etc.) for the authenticated user. x-ms-original-file: 2023-04-01/GetEntities.json                                                                                                                     |
| [hierarchySettingsCreateOrUpdateSample.ts][hierarchysettingscreateorupdatesample]                                                                   | creates or updates the hierarchy settings defined at the Management Group level. x-ms-original-file: 2023-04-01/PutHierarchySettings.json                                                                                                                  |
| [hierarchySettingsDeleteSample.ts][hierarchysettingsdeletesample]                                                                                   | deletes the hierarchy settings defined at the Management Group level. x-ms-original-file: 2023-04-01/DeleteHierarchySettings.json                                                                                                                          |
| [hierarchySettingsGetSample.ts][hierarchysettingsgetsample]                                                                                         | gets the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. x-ms-original-file: 2023-04-01/GetHierarchySettings.json                                                        |
| [hierarchySettingsListSample.ts][hierarchysettingslistsample]                                                                                       | gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. x-ms-original-file: 2023-04-01/ListHierarchySettings.json                                                   |
| [hierarchySettingsUpdateSample.ts][hierarchysettingsupdatesample]                                                                                   | updates the hierarchy settings defined at the Management Group level. x-ms-original-file: 2023-04-01/PatchHierarchySettings.json                                                                                                                           |
| [managementGroupSubscriptionsCreateSample.ts][managementgroupsubscriptionscreatesample]                                                             | associates existing subscription with the management group. x-ms-original-file: 2023-04-01/AddManagementGroupSubscription.json                                                                                                                             |
| [managementGroupSubscriptionsDeleteSample.ts][managementgroupsubscriptionsdeletesample]                                                             | de-associates subscription from the management group. x-ms-original-file: 2023-04-01/RemoveManagementGroupSubscription.json                                                                                                                                |
| [managementGroupSubscriptionsGetSubscriptionSample.ts][managementgroupsubscriptionsgetsubscriptionsample]                                           | retrieves details about given subscription which is associated with the management group. x-ms-original-file: 2023-04-01/GetSubscriptionFromManagementGroup.json                                                                                           |
| [managementGroupSubscriptionsGetSubscriptionsUnderManagementGroupSample.ts][managementgroupsubscriptionsgetsubscriptionsundermanagementgroupsample] | retrieves details about all subscriptions which are associated with the management group. x-ms-original-file: 2023-04-01/GetAllSubscriptionsFromManagementGroup.json                                                                                       |
| [managementGroupsCreateOrUpdateSample.ts][managementgroupscreateorupdatesample]                                                                     | create or update a management group. If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated. x-ms-original-file: 2023-04-01/PutManagementGroup.json |
| [managementGroupsDeleteSample.ts][managementgroupsdeletesample]                                                                                     | delete management group. If a management group contains child resources, the request will fail. x-ms-original-file: 2023-04-01/DeleteManagementGroup.json                                                                                                  |
| [managementGroupsGetDescendantsSample.ts][managementgroupsgetdescendantssample]                                                                     | list all entities that descend from a management group. x-ms-original-file: 2023-04-01/GetDescendants.json                                                                                                                                                 |
| [managementGroupsGetSample.ts][managementgroupsgetsample]                                                                                           | get the details of the management group. x-ms-original-file: 2023-04-01/GetManagementGroup.json                                                                                                                                                            |
| [managementGroupsListSample.ts][managementgroupslistsample]                                                                                         | list management groups for the authenticated user. x-ms-original-file: 2023-04-01/ListManagementGroups.json                                                                                                                                                |
| [managementGroupsUpdateSample.ts][managementgroupsupdatesample]                                                                                     | update a management group. x-ms-original-file: 2023-04-01/PatchManagementGroup.json                                                                                                                                                                        |
| [operationsListSample.ts][operationslistsample]                                                                                                     | list the operations for the provider x-ms-original-file: 2023-04-01/ListOperations.json                                                                                                                                                                    |
| [startTenantBackfillSample.ts][starttenantbackfillsample]                                                                                           | starts backfilling subscriptions for the Tenant. x-ms-original-file: 2023-04-01/StartTenantBackfillRequest.json                                                                                                                                            |
| [tenantBackfillStatusSample.ts][tenantbackfillstatussample]                                                                                         | gets tenant backfill status x-ms-original-file: 2023-04-01/TenantBackfillStatusRequest.json                                                                                                                                                                |

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
node dist/checkNameAvailabilitySample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/checkNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/checkNameAvailabilitySample.ts
[entitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/entitiesListSample.ts
[hierarchysettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/hierarchySettingsCreateOrUpdateSample.ts
[hierarchysettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/hierarchySettingsDeleteSample.ts
[hierarchysettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/hierarchySettingsGetSample.ts
[hierarchysettingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/hierarchySettingsListSample.ts
[hierarchysettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/hierarchySettingsUpdateSample.ts
[managementgroupsubscriptionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupSubscriptionsCreateSample.ts
[managementgroupsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupSubscriptionsDeleteSample.ts
[managementgroupsubscriptionsgetsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupSubscriptionsGetSubscriptionSample.ts
[managementgroupsubscriptionsgetsubscriptionsundermanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupSubscriptionsGetSubscriptionsUnderManagementGroupSample.ts
[managementgroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupsCreateOrUpdateSample.ts
[managementgroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupsDeleteSample.ts
[managementgroupsgetdescendantssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupsGetDescendantsSample.ts
[managementgroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupsGetSample.ts
[managementgroupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupsListSample.ts
[managementgroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/managementGroupsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/operationsListSample.ts
[starttenantbackfillsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/startTenantBackfillSample.ts
[tenantbackfillstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v3-beta/typescript/src/tenantBackfillStatusSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-managementgroups?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/managementgroups/arm-managementgroups/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
