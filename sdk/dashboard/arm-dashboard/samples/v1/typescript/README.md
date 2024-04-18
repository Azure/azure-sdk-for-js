# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [grafanaCheckEnterpriseDetailsSample.ts][grafanacheckenterprisedetailssample]         | Retrieve enterprise add-on details information x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/EnterpriseDetails_Post.json                                                                                            |
| [grafanaCreateSample.ts][grafanacreatesample]                                         | Create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_Create.json |
| [grafanaDeleteSample.ts][grafanadeletesample]                                         | Delete a workspace for Grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_Delete.json                                                                                                          |
| [grafanaFetchAvailablePluginsSample.ts][grafanafetchavailablepluginssample]           | x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_FetchAvailablePlugins.json                                                                                                                                    |
| [grafanaGetSample.ts][grafanagetsample]                                               | Get the properties of a specific workspace for Grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_Get.json                                                                                     |
| [grafanaListByResourceGroupSample.ts][grafanalistbyresourcegroupsample]               | List all resources of workspaces for Grafana under the specified resource group. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_ListByResourceGroup.json                                                     |
| [grafanaListSample.ts][grafanalistsample]                                             | List all resources of workspaces for Grafana under the specified subscription. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_List.json                                                                      |
| [grafanaUpdateSample.ts][grafanaupdatesample]                                         | Update a workspace for Grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Grafana_Update.json                                                                                                          |
| [managedPrivateEndpointsCreateSample.ts][managedprivateendpointscreatesample]         | Create or update a managed private endpoint for a grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Create.json                                                               |
| [managedPrivateEndpointsDeleteSample.ts][managedprivateendpointsdeletesample]         | Delete a managed private endpoint for a grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Delete.json                                                                         |
| [managedPrivateEndpointsGetSample.ts][managedprivateendpointsgetsample]               | Get a specific managed private endpoint of a grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Get.json                                                                       |
| [managedPrivateEndpointsListSample.ts][managedprivateendpointslistsample]             | List all managed private endpoints of a grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_List.json                                                                           |
| [managedPrivateEndpointsRefreshSample.ts][managedprivateendpointsrefreshsample]       | Refresh and sync managed private endpoints of a grafana resource to latest state. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Refresh.json                                                |
| [managedPrivateEndpointsUpdateSample.ts][managedprivateendpointsupdatesample]         | Update a managed private endpoint for an existing grafana resource. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/ManagedPrivateEndpoints_Patch.json                                                                |
| [operationsListSample.ts][operationslistsample]                                       | List all available API operations provided by Microsoft.Dashboard. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/Operations_List.json                                                                               |
| [privateEndpointConnectionsApproveSample.ts][privateendpointconnectionsapprovesample] | Manual approve private endpoint connection x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateEndpointConnections_Approve.json                                                                                    |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]   | Delete private endpoint connection x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateEndpointConnections_Delete.json                                                                                             |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]         | Get private endpoint connections. x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateEndpointConnections_Get.json                                                                                                 |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]       | Get private endpoint connection x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateEndpointConnections_List.json                                                                                                  |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                     | Get specific private link resource information for this grafana resource x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateLinkResources_Get.json                                                                |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                   | List all private link resources information for this grafana resource x-ms-original-file: specification/dashboard/resource-manager/Microsoft.Dashboard/stable/2023-09-01/examples/PrivateLinkResources_List.json                                                                  |

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
npx cross-env DASHBOARD_SUBSCRIPTION_ID="<dashboard subscription id>" DASHBOARD_RESOURCE_GROUP="<dashboard resource group>" node dist/grafanaCheckEnterpriseDetailsSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[grafanacheckenterprisedetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/grafanaCheckEnterpriseDetailsSample.ts
[grafanacreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/grafanaCreateSample.ts
[grafanadeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/grafanaDeleteSample.ts
[grafanafetchavailablepluginssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/grafanaFetchAvailablePluginsSample.ts
[grafanagetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/grafanaGetSample.ts
[grafanalistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/grafanaListByResourceGroupSample.ts
[grafanalistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/grafanaListSample.ts
[grafanaupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/grafanaUpdateSample.ts
[managedprivateendpointscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/managedPrivateEndpointsCreateSample.ts
[managedprivateendpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/managedPrivateEndpointsDeleteSample.ts
[managedprivateendpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/managedPrivateEndpointsGetSample.ts
[managedprivateendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/managedPrivateEndpointsListSample.ts
[managedprivateendpointsrefreshsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/managedPrivateEndpointsRefreshSample.ts
[managedprivateendpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/managedPrivateEndpointsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/operationsListSample.ts
[privateendpointconnectionsapprovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/privateEndpointConnectionsApproveSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/dashboard/arm-dashboard/samples/v1/typescript/src/privateLinkResourcesListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-dashboard?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/dashboard/arm-dashboard/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
