# @azure/arm-dashboard client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-dashboard in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [grafanaCheckEnterpriseDetailsSample.ts][grafanacheckenterprisedetailssample]             | retrieve enterprise add-on details information x-ms-original-file: 2024-11-01-preview/EnterpriseDetails_Post.json                                                                                                  |
| [grafanaCreateSample.ts][grafanacreatesample]                                             | create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana. x-ms-original-file: 2024-11-01-preview/Grafana_Create.json       |
| [grafanaDeleteSample.ts][grafanadeletesample]                                             | delete a workspace for Grafana resource. x-ms-original-file: 2024-11-01-preview/Grafana_Delete.json                                                                                                                |
| [grafanaFetchAvailablePluginsSample.ts][grafanafetchavailablepluginssample]               | a synchronous resource action. x-ms-original-file: 2024-11-01-preview/Grafana_FetchAvailablePlugins.json                                                                                                           |
| [grafanaGetSample.ts][grafanagetsample]                                                   | get the properties of a specific workspace for Grafana resource. x-ms-original-file: 2024-11-01-preview/Grafana_Get.json                                                                                           |
| [grafanaListByResourceGroupSample.ts][grafanalistbyresourcegroupsample]                   | list all resources of workspaces for Grafana under the specified resource group. x-ms-original-file: 2024-11-01-preview/Grafana_ListByResourceGroup.json                                                           |
| [grafanaListSample.ts][grafanalistsample]                                                 | list all resources of workspaces for Grafana under the specified subscription. x-ms-original-file: 2024-11-01-preview/Grafana_List.json                                                                            |
| [grafanaUpdateSample.ts][grafanaupdatesample]                                             | update a workspace for Grafana resource. x-ms-original-file: 2024-11-01-preview/Grafana_Update.json                                                                                                                |
| [integrationFabricsCreateSample.ts][integrationfabricscreatesample]                       | create a IntegrationFabric x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Create.json                                                                                                                   |
| [integrationFabricsDeleteSample.ts][integrationfabricsdeletesample]                       | delete a IntegrationFabric x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Delete.json                                                                                                                   |
| [integrationFabricsGetSample.ts][integrationfabricsgetsample]                             | get a IntegrationFabric x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Get.json                                                                                                                         |
| [integrationFabricsListSample.ts][integrationfabricslistsample]                           | list IntegrationFabric resources by ManagedGrafana x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_List.json                                                                                             |
| [integrationFabricsUpdateSample.ts][integrationfabricsupdatesample]                       | update a IntegrationFabric x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Update.json                                                                                                                   |
| [managedDashboardsCreateSample.ts][manageddashboardscreatesample]                         | create or update a dashboard for grafana resource. This API is idempotent, so user can either create a new dashboard or update an existing dashboard. x-ms-original-file: 2024-11-01-preview/Dashboard_Create.json |
| [managedDashboardsDeleteSample.ts][manageddashboardsdeletesample]                         | delete a dashboard for Grafana resource. x-ms-original-file: 2024-11-01-preview/Dashboard_Delete.json                                                                                                              |
| [managedDashboardsGetSample.ts][manageddashboardsgetsample]                               | get the properties of a specific dashboard for grafana resource. x-ms-original-file: 2024-11-01-preview/Dashboard_Get.json                                                                                         |
| [managedDashboardsListBySubscriptionSample.ts][manageddashboardslistbysubscriptionsample] | list all resources of dashboards under the specified subscription. x-ms-original-file: 2024-11-01-preview/Dashboard_List.json                                                                                      |
| [managedDashboardsListSample.ts][manageddashboardslistsample]                             | list all resources of dashboards under the specified resource group. x-ms-original-file: 2024-11-01-preview/Dashboard_ListByResourceGroup.json                                                                     |
| [managedDashboardsUpdateSample.ts][manageddashboardsupdatesample]                         | update a dashboard for Grafana resource. x-ms-original-file: 2024-11-01-preview/Dashboard_Update.json                                                                                                              |
| [managedPrivateEndpointsCreateSample.ts][managedprivateendpointscreatesample]             | create or update a managed private endpoint for a grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Create.json                                                                     |
| [managedPrivateEndpointsDeleteSample.ts][managedprivateendpointsdeletesample]             | delete a managed private endpoint for a grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Delete.json                                                                               |
| [managedPrivateEndpointsGetSample.ts][managedprivateendpointsgetsample]                   | get a specific managed private endpoint of a grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Get.json                                                                             |
| [managedPrivateEndpointsListSample.ts][managedprivateendpointslistsample]                 | list all managed private endpoints of a grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_List.json                                                                                 |
| [managedPrivateEndpointsRefreshSample.ts][managedprivateendpointsrefreshsample]           | refresh and sync managed private endpoints of a grafana resource to latest state. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Refresh.json                                                      |
| [managedPrivateEndpointsUpdateSample.ts][managedprivateendpointsupdatesample]             | update a managed private endpoint for an existing grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Patch.json                                                                      |
| [operationsListSample.ts][operationslistsample]                                           | list the operations for the provider x-ms-original-file: 2024-11-01-preview/Operations_List.json                                                                                                                   |
| [privateEndpointConnectionsApproveSample.ts][privateendpointconnectionsapprovesample]     | manual approve private endpoint connection x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_Approve.json                                                                                          |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]       | delete private endpoint connection x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_Delete.json                                                                                                   |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]             | get private endpoint connections. x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_Get.json                                                                                                       |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]           | get private endpoint connection x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_List.json                                                                                                        |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                         | get specific private link resource information for this grafana resource x-ms-original-file: 2024-11-01-preview/PrivateLinkResources_Get.json                                                                      |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                       | list all private link resources information for this grafana resource x-ms-original-file: 2024-11-01-preview/PrivateLinkResources_List.json                                                                        |

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
node dist/grafanaCheckEnterpriseDetailsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/grafanaCheckEnterpriseDetailsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[grafanacheckenterprisedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/grafanaCheckEnterpriseDetailsSample.ts
[grafanacreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/grafanaCreateSample.ts
[grafanadeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/grafanaDeleteSample.ts
[grafanafetchavailablepluginssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/grafanaFetchAvailablePluginsSample.ts
[grafanagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/grafanaGetSample.ts
[grafanalistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/grafanaListByResourceGroupSample.ts
[grafanalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/grafanaListSample.ts
[grafanaupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/grafanaUpdateSample.ts
[integrationfabricscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/integrationFabricsCreateSample.ts
[integrationfabricsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/integrationFabricsDeleteSample.ts
[integrationfabricsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/integrationFabricsGetSample.ts
[integrationfabricslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/integrationFabricsListSample.ts
[integrationfabricsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/integrationFabricsUpdateSample.ts
[manageddashboardscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedDashboardsCreateSample.ts
[manageddashboardsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedDashboardsDeleteSample.ts
[manageddashboardsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedDashboardsGetSample.ts
[manageddashboardslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedDashboardsListBySubscriptionSample.ts
[manageddashboardslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedDashboardsListSample.ts
[manageddashboardsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedDashboardsUpdateSample.ts
[managedprivateendpointscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedPrivateEndpointsCreateSample.ts
[managedprivateendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedPrivateEndpointsDeleteSample.ts
[managedprivateendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedPrivateEndpointsGetSample.ts
[managedprivateendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedPrivateEndpointsListSample.ts
[managedprivateendpointsrefreshsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedPrivateEndpointsRefreshSample.ts
[managedprivateendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/managedPrivateEndpointsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionsapprovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/privateEndpointConnectionsApproveSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/typescript/src/privateLinkResourcesListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dashboard?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dashboard/arm-dashboard/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
