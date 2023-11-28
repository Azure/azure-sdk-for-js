# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [grafanaCheckEnterpriseDetailsSample.js][grafanacheckenterprisedetailssample]         | Retrieve enterprise add-on details information x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/EnterpriseDetails_Post.json                                                                                            |
| [grafanaCreateSample.js][grafanacreatesample]                                         | Create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_Create.json |
| [grafanaDeleteSample.js][grafanadeletesample]                                         | Delete a workspace for Grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_Delete.json                                                                                                          |
| [grafanaFetchAvailablePluginsSample.js][grafanafetchavailablepluginssample]           | x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_FetchAvailablePlugins.json                                                                                                                                    |
| [grafanaGetSample.js][grafanagetsample]                                               | Get the properties of a specific workspace for Grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_Get.json                                                                                     |
| [grafanaListByResourceGroupSample.js][grafanalistbyresourcegroupsample]               | List all resources of workspaces for Grafana under the specified resource group. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_ListByResourceGroup.json                                                     |
| [grafanaListSample.js][grafanalistsample]                                             | List all resources of workspaces for Grafana under the specified subscription. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_List.json                                                                      |
| [grafanaUpdateSample.js][grafanaupdatesample]                                         | Update a workspace for Grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_Update.json                                                                                                          |
| [managedPrivateEndpointsCreateSample.js][managedprivateendpointscreatesample]         | Create or update a managed private endpoint for a grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Create.json                                                               |
| [managedPrivateEndpointsDeleteSample.js][managedprivateendpointsdeletesample]         | Delete a managed private endpoint for a grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Delete.json                                                                         |
| [managedPrivateEndpointsGetSample.js][managedprivateendpointsgetsample]               | Get a specific managed private endpoint of a grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Get.json                                                                       |
| [managedPrivateEndpointsListSample.js][managedprivateendpointslistsample]             | List all managed private endpoints of a grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_List.json                                                                           |
| [managedPrivateEndpointsRefreshSample.js][managedprivateendpointsrefreshsample]       | Refresh and sync managed private endpoints of a grafana resource to latest state. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Refresh.json                                                |
| [managedPrivateEndpointsUpdateSample.js][managedprivateendpointsupdatesample]         | Update a managed private endpoint for an existing grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Patch.json                                                                |
| [operationsListSample.js][operationslistsample]                                       | List all available API operations provided by Microsoft.Dashboard. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Operations_List.json                                                                               |
| [privateEndpointConnectionsApproveSample.js][privateendpointconnectionsapprovesample] | Manual approve private endpoint connection x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateEndpointConnections_Approve.json                                                                                    |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]   | Delete private endpoint connection x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateEndpointConnections_Delete.json                                                                                             |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]         | Get private endpoint connections. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateEndpointConnections_Get.json                                                                                                 |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]       | Get private endpoint connection x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateEndpointConnections_List.json                                                                                                  |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                     | Get specific private link resource information for this grafana resource x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateLinkResources_Get.json                                                                |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                   | List all private link resources information for this grafana resource x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateLinkResources_List.json                                                                  |

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
npx cross-env DASHBOARD_SUBSCRIPTION_ID="<dashboard subscription id>" DASHBOARD_RESOURCE_GROUP="<dashboard resource group>" node grafanaCheckEnterpriseDetailsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[grafanacheckenterprisedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/grafanaCheckEnterpriseDetailsSample.js
[grafanacreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/grafanaCreateSample.js
[grafanadeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/grafanaDeleteSample.js
[grafanafetchavailablepluginssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/grafanaFetchAvailablePluginsSample.js
[grafanagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/grafanaGetSample.js
[grafanalistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/grafanaListByResourceGroupSample.js
[grafanalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/grafanaListSample.js
[grafanaupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/grafanaUpdateSample.js
[managedprivateendpointscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/managedPrivateEndpointsCreateSample.js
[managedprivateendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/managedPrivateEndpointsDeleteSample.js
[managedprivateendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/managedPrivateEndpointsGetSample.js
[managedprivateendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/managedPrivateEndpointsListSample.js
[managedprivateendpointsrefreshsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/managedPrivateEndpointsRefreshSample.js
[managedprivateendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/managedPrivateEndpointsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/operationsListSample.js
[privateendpointconnectionsapprovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/privateEndpointConnectionsApproveSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/javascript/privateLinkResourcesListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dashboard?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dashboard/arm-dashboard/README.md
