# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [checkNameAvailabilitySample.ts][checknameavailabilitysample]                                                                                       | Checks if the specified management group name is valid and unique x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/CheckManagementGroupNameAvailability.json                                                                                                                                        |
| [entitiesListSample.ts][entitieslistsample]                                                                                                         | List all entities (Management Groups, Subscriptions, etc.) for the authenticated user. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetEntities.json                                                                                                                     |
| [hierarchySettingsCreateOrUpdateSample.ts][hierarchysettingscreateorupdatesample]                                                                   | Creates or updates the hierarchy settings defined at the Management Group level. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PutHierarchySettings.json                                                                                                                  |
| [hierarchySettingsDeleteSample.ts][hierarchysettingsdeletesample]                                                                                   | Deletes the hierarchy settings defined at the Management Group level. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/DeleteHierarchySettings.json                                                                                                                          |
| [hierarchySettingsGetSample.ts][hierarchysettingsgetsample]                                                                                         | Gets the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetHierarchySettings.json                                                        |
| [hierarchySettingsListSample.ts][hierarchysettingslistsample]                                                                                       | Gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/ListHierarchySettings.json                                                   |
| [hierarchySettingsUpdateSample.ts][hierarchysettingsupdatesample]                                                                                   | Updates the hierarchy settings defined at the Management Group level. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PatchHierarchySettings.json                                                                                                                           |
| [managementGroupSubscriptionsCreateSample.ts][managementgroupsubscriptionscreatesample]                                                             | Associates existing subscription with the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/AddManagementGroupSubscription.json                                                                                                                             |
| [managementGroupSubscriptionsDeleteSample.ts][managementgroupsubscriptionsdeletesample]                                                             | De-associates subscription from the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/RemoveManagementGroupSubscription.json                                                                                                                                |
| [managementGroupSubscriptionsGetSubscriptionSample.ts][managementgroupsubscriptionsgetsubscriptionsample]                                           | Retrieves details about given subscription which is associated with the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetSubscriptionFromManagementGroup.json                                                                                           |
| [managementGroupSubscriptionsGetSubscriptionsUnderManagementGroupSample.ts][managementgroupsubscriptionsgetsubscriptionsundermanagementgroupsample] | Retrieves details about all subscriptions which are associated with the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetAllSubscriptionsFromManagementGroup.json                                                                                       |
| [managementGroupsCreateOrUpdateSample.ts][managementgroupscreateorupdatesample]                                                                     | Create or update a management group. If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PutManagementGroup.json |
| [managementGroupsDeleteSample.ts][managementgroupsdeletesample]                                                                                     | Delete management group. If a management group contains child resources, the request will fail. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/DeleteManagementGroup.json                                                                                                  |
| [managementGroupsGetDescendantsSample.ts][managementgroupsgetdescendantssample]                                                                     | List all entities that descend from a management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetDescendants.json                                                                                                                                                 |
| [managementGroupsGetSample.ts][managementgroupsgetsample]                                                                                           | Get the details of the management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/GetManagementGroup.json                                                                                                                                                            |
| [managementGroupsListSample.ts][managementgroupslistsample]                                                                                         | List management groups for the authenticated user. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/ListManagementGroups.json                                                                                                                                                |
| [managementGroupsUpdateSample.ts][managementgroupsupdatesample]                                                                                     | Update a management group. //@@TS-MAGIC-NEWLINE@@ x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/PatchManagementGroup.json                                                                                                                                                                        |
| [operationsListSample.ts][operationslistsample]                                                                                                     | Lists all of the available Management REST API operations. x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/ListOperations.json                                                                                                                                                                     |
| [startTenantBackfillSample.ts][starttenantbackfillsample]                                                                                           | Starts backfilling subscriptions for the Tenant. x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/StartTenantBackfillRequest.json                                                                                                                                                                   |
| [tenantBackfillStatusSample.ts][tenantbackfillstatussample]                                                                                         | Gets tenant backfill status x-ms-original-file: specification/managementgroups/resource-manager/Microsoft.Management/stable/2021-04-01/examples/TenantBackfillStatusRequest.json                                                                                                                                                                                       |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/checkNameAvailabilitySample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[checknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/checkNameAvailabilitySample.ts
[entitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/entitiesListSample.ts
[hierarchysettingscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/hierarchySettingsCreateOrUpdateSample.ts
[hierarchysettingsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/hierarchySettingsDeleteSample.ts
[hierarchysettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/hierarchySettingsGetSample.ts
[hierarchysettingslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/hierarchySettingsListSample.ts
[hierarchysettingsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/hierarchySettingsUpdateSample.ts
[managementgroupsubscriptionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupSubscriptionsCreateSample.ts
[managementgroupsubscriptionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupSubscriptionsDeleteSample.ts
[managementgroupsubscriptionsgetsubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupSubscriptionsGetSubscriptionSample.ts
[managementgroupsubscriptionsgetsubscriptionsundermanagementgroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupSubscriptionsGetSubscriptionsUnderManagementGroupSample.ts
[managementgroupscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupsCreateOrUpdateSample.ts
[managementgroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupsDeleteSample.ts
[managementgroupsgetdescendantssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupsGetDescendantsSample.ts
[managementgroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupsGetSample.ts
[managementgroupslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupsListSample.ts
[managementgroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/managementGroupsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/operationsListSample.ts
[starttenantbackfillsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/startTenantBackfillSample.ts
[tenantbackfillstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/managementgroups/arm-managementgroups/samples/v2/typescript/src/tenantBackfillStatusSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-managementgroups?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/managementgroups/arm-managementgroups/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
