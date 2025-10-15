# @azure/arm-dashboard client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-dashboard in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [grafanaCheckEnterpriseDetailsSample.js][grafanacheckenterprisedetailssample]             | retrieve enterprise add-on details information x-ms-original-file: 2024-11-01-preview/EnterpriseDetails_Post.json                                                                                                  |
| [grafanaCreateSample.js][grafanacreatesample]                                             | create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana. x-ms-original-file: 2024-11-01-preview/Grafana_Create.json       |
| [grafanaDeleteSample.js][grafanadeletesample]                                             | delete a workspace for Grafana resource. x-ms-original-file: 2024-11-01-preview/Grafana_Delete.json                                                                                                                |
| [grafanaFetchAvailablePluginsSample.js][grafanafetchavailablepluginssample]               | a synchronous resource action. x-ms-original-file: 2024-11-01-preview/Grafana_FetchAvailablePlugins.json                                                                                                           |
| [grafanaGetSample.js][grafanagetsample]                                                   | get the properties of a specific workspace for Grafana resource. x-ms-original-file: 2024-11-01-preview/Grafana_Get.json                                                                                           |
| [grafanaListByResourceGroupSample.js][grafanalistbyresourcegroupsample]                   | list all resources of workspaces for Grafana under the specified resource group. x-ms-original-file: 2024-11-01-preview/Grafana_ListByResourceGroup.json                                                           |
| [grafanaListSample.js][grafanalistsample]                                                 | list all resources of workspaces for Grafana under the specified subscription. x-ms-original-file: 2024-11-01-preview/Grafana_List.json                                                                            |
| [grafanaUpdateSample.js][grafanaupdatesample]                                             | update a workspace for Grafana resource. x-ms-original-file: 2024-11-01-preview/Grafana_Update.json                                                                                                                |
| [integrationFabricsCreateSample.js][integrationfabricscreatesample]                       | create a IntegrationFabric x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Create.json                                                                                                                   |
| [integrationFabricsDeleteSample.js][integrationfabricsdeletesample]                       | delete a IntegrationFabric x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Delete.json                                                                                                                   |
| [integrationFabricsGetSample.js][integrationfabricsgetsample]                             | get a IntegrationFabric x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Get.json                                                                                                                         |
| [integrationFabricsListSample.js][integrationfabricslistsample]                           | list IntegrationFabric resources by ManagedGrafana x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_List.json                                                                                             |
| [integrationFabricsUpdateSample.js][integrationfabricsupdatesample]                       | update a IntegrationFabric x-ms-original-file: 2024-11-01-preview/IntegrationFabrics_Update.json                                                                                                                   |
| [managedDashboardsCreateSample.js][manageddashboardscreatesample]                         | create or update a dashboard for grafana resource. This API is idempotent, so user can either create a new dashboard or update an existing dashboard. x-ms-original-file: 2024-11-01-preview/Dashboard_Create.json |
| [managedDashboardsDeleteSample.js][manageddashboardsdeletesample]                         | delete a dashboard for Grafana resource. x-ms-original-file: 2024-11-01-preview/Dashboard_Delete.json                                                                                                              |
| [managedDashboardsGetSample.js][manageddashboardsgetsample]                               | get the properties of a specific dashboard for grafana resource. x-ms-original-file: 2024-11-01-preview/Dashboard_Get.json                                                                                         |
| [managedDashboardsListBySubscriptionSample.js][manageddashboardslistbysubscriptionsample] | list all resources of dashboards under the specified subscription. x-ms-original-file: 2024-11-01-preview/Dashboard_List.json                                                                                      |
| [managedDashboardsListSample.js][manageddashboardslistsample]                             | list all resources of dashboards under the specified resource group. x-ms-original-file: 2024-11-01-preview/Dashboard_ListByResourceGroup.json                                                                     |
| [managedDashboardsUpdateSample.js][manageddashboardsupdatesample]                         | update a dashboard for Grafana resource. x-ms-original-file: 2024-11-01-preview/Dashboard_Update.json                                                                                                              |
| [managedPrivateEndpointsCreateSample.js][managedprivateendpointscreatesample]             | create or update a managed private endpoint for a grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Create.json                                                                     |
| [managedPrivateEndpointsDeleteSample.js][managedprivateendpointsdeletesample]             | delete a managed private endpoint for a grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Delete.json                                                                               |
| [managedPrivateEndpointsGetSample.js][managedprivateendpointsgetsample]                   | get a specific managed private endpoint of a grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Get.json                                                                             |
| [managedPrivateEndpointsListSample.js][managedprivateendpointslistsample]                 | list all managed private endpoints of a grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_List.json                                                                                 |
| [managedPrivateEndpointsRefreshSample.js][managedprivateendpointsrefreshsample]           | refresh and sync managed private endpoints of a grafana resource to latest state. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Refresh.json                                                      |
| [managedPrivateEndpointsUpdateSample.js][managedprivateendpointsupdatesample]             | update a managed private endpoint for an existing grafana resource. x-ms-original-file: 2024-11-01-preview/ManagedPrivateEndpoints_Patch.json                                                                      |
| [operationsListSample.js][operationslistsample]                                           | list the operations for the provider x-ms-original-file: 2024-11-01-preview/Operations_List.json                                                                                                                   |
| [privateEndpointConnectionsApproveSample.js][privateendpointconnectionsapprovesample]     | manual approve private endpoint connection x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_Approve.json                                                                                          |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]       | delete private endpoint connection x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_Delete.json                                                                                                   |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]             | get private endpoint connections. x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_Get.json                                                                                                       |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]           | get private endpoint connection x-ms-original-file: 2024-11-01-preview/PrivateEndpointConnections_List.json                                                                                                        |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                         | get specific private link resource information for this grafana resource x-ms-original-file: 2024-11-01-preview/PrivateLinkResources_Get.json                                                                      |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                       | list all private link resources information for this grafana resource x-ms-original-file: 2024-11-01-preview/PrivateLinkResources_List.json                                                                        |

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
node grafanaCheckEnterpriseDetailsSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node grafanaCheckEnterpriseDetailsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[grafanacheckenterprisedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/grafanaCheckEnterpriseDetailsSample.js
[grafanacreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/grafanaCreateSample.js
[grafanadeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/grafanaDeleteSample.js
[grafanafetchavailablepluginssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/grafanaFetchAvailablePluginsSample.js
[grafanagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/grafanaGetSample.js
[grafanalistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/grafanaListByResourceGroupSample.js
[grafanalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/grafanaListSample.js
[grafanaupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/grafanaUpdateSample.js
[integrationfabricscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/integrationFabricsCreateSample.js
[integrationfabricsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/integrationFabricsDeleteSample.js
[integrationfabricsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/integrationFabricsGetSample.js
[integrationfabricslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/integrationFabricsListSample.js
[integrationfabricsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/integrationFabricsUpdateSample.js
[manageddashboardscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedDashboardsCreateSample.js
[manageddashboardsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedDashboardsDeleteSample.js
[manageddashboardsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedDashboardsGetSample.js
[manageddashboardslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedDashboardsListBySubscriptionSample.js
[manageddashboardslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedDashboardsListSample.js
[manageddashboardsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedDashboardsUpdateSample.js
[managedprivateendpointscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedPrivateEndpointsCreateSample.js
[managedprivateendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedPrivateEndpointsDeleteSample.js
[managedprivateendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedPrivateEndpointsGetSample.js
[managedprivateendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedPrivateEndpointsListSample.js
[managedprivateendpointsrefreshsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedPrivateEndpointsRefreshSample.js
[managedprivateendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/managedPrivateEndpointsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/operationsListSample.js
[privateendpointconnectionsapprovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/privateEndpointConnectionsApproveSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v2-beta/javascript/privateLinkResourcesListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-dashboard?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dashboard/arm-dashboard/README.md
