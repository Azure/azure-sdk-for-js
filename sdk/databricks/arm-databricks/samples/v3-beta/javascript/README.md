# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.js][operationslistsample]                                                     | Lists all of the available RP operations. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/OperationsList.json                                                                                                                                                                                                                                                                        |
| [outboundNetworkDependenciesEndpointsListSample.js][outboundnetworkdependenciesendpointslistsample] | Gets the list of endpoints that VNET Injected Workspace calls Azure Databricks Control Plane. You must configure outbound access with these endpoints. For more information, see https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/udr x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/OutboundNetworkDependenciesEndpointsList.json |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]                 | Update the status of a private endpoint connection with the specified name x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrivateEndpointConnectionsUpdate.json                                                                                                                                                                                                                     |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                 | Remove private endpoint connection with the specified name x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrivateEndpointConnectionsDelete.json                                                                                                                                                                                                                                     |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                       | Get a private endpoint connection properties for a workspace x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrivateEndpointConnectionsGet.json                                                                                                                                                                                                                                      |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]                     | List private endpoint connections of the workspace x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/ListPrivateEndpointConnections.json                                                                                                                                                                                                                                               |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                   | Get the specified private link resource for the given group id (sub-resource) x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrivateLinkResourcesGet.json                                                                                                                                                                                                                           |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                                 | List private link resources for a given workspace x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/ListPrivateLinkResources.json                                                                                                                                                                                                                                                      |
| [vNetPeeringCreateOrUpdateSample.js][vnetpeeringcreateorupdatesample]                               | Creates vNet Peering for workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceVirtualNetworkPeeringCreateOrUpdate.json                                                                                                                                                                                                                                                |
| [vNetPeeringDeleteSample.js][vnetpeeringdeletesample]                                               | Deletes the workspace vNetPeering. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceVirtualNetworkPeeringDelete.json                                                                                                                                                                                                                                                         |
| [vNetPeeringGetSample.js][vnetpeeringgetsample]                                                     | Gets the workspace vNet Peering. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceVirtualNetPeeringGet.json                                                                                                                                                                                                                                                                  |
| [vNetPeeringListByWorkspaceSample.js][vnetpeeringlistbyworkspacesample]                             | Lists the workspace vNet Peerings. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceVirtualNetPeeringList.json                                                                                                                                                                                                                                                               |
| [workspacesCreateOrUpdateSample.js][workspacescreateorupdatesample]                                 | Creates a new workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrepareEncryption.json                                                                                                                                                                                                                                                                                      |
| [workspacesDeleteSample.js][workspacesdeletesample]                                                 | Deletes the workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceDelete.json                                                                                                                                                                                                                                                                                          |
| [workspacesGetSample.js][workspacesgetsample]                                                       | Gets the workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceGet.json                                                                                                                                                                                                                                                                                                |
| [workspacesListByResourceGroupSample.js][workspaceslistbyresourcegroupsample]                       | Gets all the workspaces within a resource group. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspacesListByResourceGroup.json                                                                                                                                                                                                                                                  |
| [workspacesListBySubscriptionSample.js][workspaceslistbysubscriptionsample]                         | Gets all the workspaces within a subscription. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspacesListBySubscription.json                                                                                                                                                                                                                                                     |
| [workspacesUpdateSample.js][workspacesupdatesample]                                                 | Updates a workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceUpdate.json                                                                                                                                                                                                                                                                                            |

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
node operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/operationsListSample.js
[outboundnetworkdependenciesendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/outboundNetworkDependenciesEndpointsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/privateLinkResourcesListSample.js
[vnetpeeringcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/vNetPeeringCreateOrUpdateSample.js
[vnetpeeringdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/vNetPeeringDeleteSample.js
[vnetpeeringgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/vNetPeeringGetSample.js
[vnetpeeringlistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/vNetPeeringListByWorkspaceSample.js
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/workspacesCreateOrUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/workspacesDeleteSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/workspacesGetSample.js
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/workspacesListByResourceGroupSample.js
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/workspacesListBySubscriptionSample.js
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/javascript/workspacesUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-databricks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databricks/arm-databricks/README.md
