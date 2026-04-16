# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessConnectorsCreateOrUpdateSample.ts][accessconnectorscreateorupdatesample]                     | Creates or updates azure databricks accessConnector. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorCreateOrUpdate.json                                                                                                                                                                                                                                         |
| [accessConnectorsDeleteSample.ts][accessconnectorsdeletesample]                                     | Deletes the azure databricks accessConnector. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorDelete.json                                                                                                                                                                                                                                                        |
| [accessConnectorsGetSample.ts][accessconnectorsgetsample]                                           | Gets an azure databricks accessConnector. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorGet.json                                                                                                                                                                                                                                                               |
| [accessConnectorsListByResourceGroupSample.ts][accessconnectorslistbyresourcegroupsample]           | Gets all the azure databricks accessConnectors within a resource group. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorsListByResourceGroup.json                                                                                                                                                                                                                |
| [accessConnectorsListBySubscriptionSample.ts][accessconnectorslistbysubscriptionsample]             | Gets all the azure databricks accessConnectors within a subscription. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorsListBySubscriptionId.json                                                                                                                                                                                                                 |
| [accessConnectorsUpdateSample.ts][accessconnectorsupdatesample]                                     | Updates an azure databricks accessConnector. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorPatchUpdate.json                                                                                                                                                                                                                                                    |
| [operationsListSample.ts][operationslistsample]                                                     | Lists all of the available RP operations. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/OperationsList.json                                                                                                                                                                                                                                                                   |
| [outboundNetworkDependenciesEndpointsListSample.ts][outboundnetworkdependenciesendpointslistsample] | Gets the list of endpoints that VNET Injected Workspace calls Azure Databricks Control Plane. You must configure outbound access with these endpoints. For more information, see https://learn.microsoft.com/azure/databricks/administration-guide/cloud-configurations/azure/udr x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/OutboundNetworkDependenciesEndpointsList.json |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]                 | Update the status of a private endpoint connection with the specified name x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/PrivateEndpointConnectionsUpdate.json                                                                                                                                                                                                                |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                 | Remove private endpoint connection with the specified name x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/PrivateEndpointConnectionsDelete.json                                                                                                                                                                                                                                |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                       | Get a private endpoint connection properties for a workspace x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/PrivateEndpointConnectionsGet.json                                                                                                                                                                                                                                 |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                     | List private endpoint connections of the workspace x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/ListPrivateEndpointConnections.json                                                                                                                                                                                                                                          |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                   | Get the specified private link resource for the given group id (sub-resource) x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/PrivateLinkResourcesGet.json                                                                                                                                                                                                                      |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                                 | List private link resources for a given workspace x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/ListPrivateLinkResources.json                                                                                                                                                                                                                                                 |
| [vNetPeeringCreateOrUpdateSample.ts][vnetpeeringcreateorupdatesample]                               | Creates vNet Peering for workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceVirtualNetworkPeeringCreateOrUpdate.json                                                                                                                                                                                                                                           |
| [vNetPeeringDeleteSample.ts][vnetpeeringdeletesample]                                               | Deletes the workspace vNetPeering. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceVirtualNetworkPeeringDelete.json                                                                                                                                                                                                                                                    |
| [vNetPeeringGetSample.ts][vnetpeeringgetsample]                                                     | Gets the workspace vNet Peering. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceVirtualNetPeeringGet.json                                                                                                                                                                                                                                                             |
| [vNetPeeringListByWorkspaceSample.ts][vnetpeeringlistbyworkspacesample]                             | Lists the workspace vNet Peerings. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceVirtualNetPeeringList.json                                                                                                                                                                                                                                                          |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]                                 | Creates a new workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/PrepareEncryption.json                                                                                                                                                                                                                                                                                 |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                                 | Deletes the workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceDelete.json                                                                                                                                                                                                                                                                                     |
| [workspacesGetSample.ts][workspacesgetsample]                                                       | Gets the workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceGet.json                                                                                                                                                                                                                                                                                           |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]                       | Gets all the workspaces within a resource group. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspacesListByResourceGroup.json                                                                                                                                                                                                                                             |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]                         | Gets all the workspaces within a subscription. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspacesListBySubscription.json                                                                                                                                                                                                                                                |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                                 | Updates a workspace. x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceUpdate.json                                                                                                                                                                                                                                                                                       |

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
node dist/accessConnectorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env DATABRICKS_SUBSCRIPTION_ID="<databricks subscription id>" DATABRICKS_RESOURCE_GROUP="<databricks resource group>" node dist/accessConnectorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accessconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/accessConnectorsCreateOrUpdateSample.ts
[accessconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/accessConnectorsDeleteSample.ts
[accessconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/accessConnectorsGetSample.ts
[accessconnectorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/accessConnectorsListByResourceGroupSample.ts
[accessconnectorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/accessConnectorsListBySubscriptionSample.ts
[accessconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/accessConnectorsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/operationsListSample.ts
[outboundnetworkdependenciesendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/outboundNetworkDependenciesEndpointsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/privateLinkResourcesListSample.ts
[vnetpeeringcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/vNetPeeringCreateOrUpdateSample.ts
[vnetpeeringdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/vNetPeeringDeleteSample.ts
[vnetpeeringgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/vNetPeeringGetSample.ts
[vnetpeeringlistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/vNetPeeringListByWorkspaceSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v3/typescript/src/workspacesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-databricks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databricks/arm-databricks/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
