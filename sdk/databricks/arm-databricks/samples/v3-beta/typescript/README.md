# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [operationsListSample.ts][operationslistsample]                                                     | Lists all of the available RP operations. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/OperationsList.json                                                                                                                                                                                                                                                                        |
| [outboundNetworkDependenciesEndpointsListSample.ts][outboundnetworkdependenciesendpointslistsample] | Gets the list of endpoints that VNET Injected Workspace calls Azure Databricks Control Plane. You must configure outbound access with these endpoints. For more information, see https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/udr x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/OutboundNetworkDependenciesEndpointsList.json |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]                 | Update the status of a private endpoint connection with the specified name x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrivateEndpointConnectionsUpdate.json                                                                                                                                                                                                                     |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                 | Remove private endpoint connection with the specified name x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrivateEndpointConnectionsDelete.json                                                                                                                                                                                                                                     |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                       | Get a private endpoint connection properties for a workspace x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrivateEndpointConnectionsGet.json                                                                                                                                                                                                                                      |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                     | List private endpoint connections of the workspace x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/ListPrivateEndpointConnections.json                                                                                                                                                                                                                                               |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                   | Get the specified private link resource for the given group id (sub-resource) x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrivateLinkResourcesGet.json                                                                                                                                                                                                                           |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                                 | List private link resources for a given workspace x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/ListPrivateLinkResources.json                                                                                                                                                                                                                                                      |
| [vNetPeeringCreateOrUpdateSample.ts][vnetpeeringcreateorupdatesample]                               | Creates vNet Peering for workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceVirtualNetworkPeeringCreateOrUpdate.json                                                                                                                                                                                                                                                |
| [vNetPeeringDeleteSample.ts][vnetpeeringdeletesample]                                               | Deletes the workspace vNetPeering. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceVirtualNetworkPeeringDelete.json                                                                                                                                                                                                                                                         |
| [vNetPeeringGetSample.ts][vnetpeeringgetsample]                                                     | Gets the workspace vNet Peering. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceVirtualNetPeeringGet.json                                                                                                                                                                                                                                                                  |
| [vNetPeeringListByWorkspaceSample.ts][vnetpeeringlistbyworkspacesample]                             | Lists the workspace vNet Peerings. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceVirtualNetPeeringList.json                                                                                                                                                                                                                                                               |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]                                 | Creates a new workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/PrepareEncryption.json                                                                                                                                                                                                                                                                                      |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                                 | Deletes the workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceDelete.json                                                                                                                                                                                                                                                                                          |
| [workspacesGetSample.ts][workspacesgetsample]                                                       | Gets the workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceGet.json                                                                                                                                                                                                                                                                                                |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]                       | Gets all the workspaces within a resource group. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspacesListByResourceGroup.json                                                                                                                                                                                                                                                  |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]                         | Gets all the workspaces within a subscription. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspacesListBySubscription.json                                                                                                                                                                                                                                                     |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                                 | Updates a workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/preview/2021-04-01-preview/examples/WorkspaceUpdate.json                                                                                                                                                                                                                                                                                            |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/operationsListSample.ts
[outboundnetworkdependenciesendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/outboundNetworkDependenciesEndpointsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/privateLinkResourcesListSample.ts
[vnetpeeringcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/vNetPeeringCreateOrUpdateSample.ts
[vnetpeeringdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/vNetPeeringDeleteSample.ts
[vnetpeeringgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/vNetPeeringGetSample.ts
[vnetpeeringlistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/vNetPeeringListByWorkspaceSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3-beta/typescript/src/workspacesUpdateSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-databricks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databricks/arm-databricks/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
