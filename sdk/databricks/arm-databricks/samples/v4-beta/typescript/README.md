# @azure/arm-databricks client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-databricks in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessConnectorsCreateOrUpdateSample.ts][accessconnectorscreateorupdatesample]                     | creates or updates Azure Databricks Access Connector. x-ms-original-file: 2026-01-01/AccessConnectorCreateOrUpdate.json                                                                                                                                                                                                                                             |
| [accessConnectorsDeleteSample.ts][accessconnectorsdeletesample]                                     | deletes the Azure Databricks Access Connector. x-ms-original-file: 2026-01-01/AccessConnectorDelete.json                                                                                                                                                                                                                                                            |
| [accessConnectorsGetSample.ts][accessconnectorsgetsample]                                           | gets an Azure Databricks Access Connector. x-ms-original-file: 2026-01-01/AccessConnectorGet.json                                                                                                                                                                                                                                                                   |
| [accessConnectorsListByResourceGroupSample.ts][accessconnectorslistbyresourcegroupsample]           | gets all the Azure Databricks Access Connectors within a resource group. x-ms-original-file: 2026-01-01/AccessConnectorsListByResourceGroup.json                                                                                                                                                                                                                    |
| [accessConnectorsListBySubscriptionSample.ts][accessconnectorslistbysubscriptionsample]             | gets all the Azure Databricks Access Connectors within a subscription. x-ms-original-file: 2026-01-01/AccessConnectorsListBySubscriptionId.json                                                                                                                                                                                                                     |
| [accessConnectorsUpdateSample.ts][accessconnectorsupdatesample]                                     | updates an Azure Databricks Access Connector. x-ms-original-file: 2026-01-01/AccessConnectorPatchUpdate.json                                                                                                                                                                                                                                                        |
| [operationsListSample.ts][operationslistsample]                                                     | list the operations for the provider x-ms-original-file: 2026-01-01/OperationsList.json                                                                                                                                                                                                                                                                             |
| [outboundNetworkDependenciesEndpointsListSample.ts][outboundnetworkdependenciesendpointslistsample] | gets the list of endpoints that VNET Injected Workspace calls Azure Databricks Control Plane. You must configure outbound access with these endpoints. For more information, see https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/udr x-ms-original-file: 2026-01-01/OutboundNetworkDependenciesEndpointsList.json |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]                 | update the status of a private endpoint connection with the specified name x-ms-original-file: 2026-01-01/PrivateEndpointConnectionsUpdate.json                                                                                                                                                                                                                     |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                 | remove private endpoint connection with the specified name x-ms-original-file: 2026-01-01/PrivateEndpointConnectionsDelete.json                                                                                                                                                                                                                                     |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                       | get a private endpoint connection properties for a workspace x-ms-original-file: 2026-01-01/PrivateEndpointConnectionsGet.json                                                                                                                                                                                                                                      |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                     | list private endpoint connections of the workspace x-ms-original-file: 2026-01-01/ListPrivateEndpointConnections.json                                                                                                                                                                                                                                               |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                   | get the specified private link resource for the given group id (sub-resource) x-ms-original-file: 2026-01-01/PrivateLinkResourcesGet.json                                                                                                                                                                                                                           |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                                 | list private link resources for a given workspace x-ms-original-file: 2026-01-01/ListPrivateLinkResources.json                                                                                                                                                                                                                                                      |
| [vNetPeeringCreateOrUpdateSample.ts][vnetpeeringcreateorupdatesample]                               | creates vNet Peering for workspace. x-ms-original-file: 2026-01-01/WorkspaceVirtualNetworkPeeringCreateOrUpdate.json                                                                                                                                                                                                                                                |
| [vNetPeeringDeleteSample.ts][vnetpeeringdeletesample]                                               | deletes the workspace vNetPeering. x-ms-original-file: 2026-01-01/WorkspaceVirtualNetworkPeeringDelete.json                                                                                                                                                                                                                                                         |
| [vNetPeeringGetSample.ts][vnetpeeringgetsample]                                                     | gets the workspace vNet Peering. x-ms-original-file: 2026-01-01/WorkspaceVirtualNetPeeringGet.json                                                                                                                                                                                                                                                                  |
| [vNetPeeringListByWorkspaceSample.ts][vnetpeeringlistbyworkspacesample]                             | lists the workspace vNet Peerings. x-ms-original-file: 2026-01-01/WorkspaceVirtualNetPeeringList.json                                                                                                                                                                                                                                                               |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]                                 | creates a new workspace. x-ms-original-file: 2026-01-01/DisableEncryption.json                                                                                                                                                                                                                                                                                      |
| [workspacesDeleteSample.ts][workspacesdeletesample]                                                 | deletes the workspace. x-ms-original-file: 2026-01-01/WorkspaceDelete.json                                                                                                                                                                                                                                                                                          |
| [workspacesGetSample.ts][workspacesgetsample]                                                       | gets the workspace. x-ms-original-file: 2026-01-01/WorkspaceEnhancedSecurityComplianceGet.json                                                                                                                                                                                                                                                                      |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]                       | gets all the workspaces within a resource group. x-ms-original-file: 2026-01-01/WorkspacesListByResourceGroup.json                                                                                                                                                                                                                                                  |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]                         | gets all the workspaces within a subscription. x-ms-original-file: 2026-01-01/WorkspacesListBySubscription.json                                                                                                                                                                                                                                                     |
| [workspacesUpdateSample.ts][workspacesupdatesample]                                                 | updates a workspace. x-ms-original-file: 2026-01-01/WorkspaceUpdate.json                                                                                                                                                                                                                                                                                            |

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

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/accessConnectorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accessconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/accessConnectorsCreateOrUpdateSample.ts
[accessconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/accessConnectorsDeleteSample.ts
[accessconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/accessConnectorsGetSample.ts
[accessconnectorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/accessConnectorsListByResourceGroupSample.ts
[accessconnectorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/accessConnectorsListBySubscriptionSample.ts
[accessconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/accessConnectorsUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/operationsListSample.ts
[outboundnetworkdependenciesendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/outboundNetworkDependenciesEndpointsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/privateLinkResourcesListSample.ts
[vnetpeeringcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/vNetPeeringCreateOrUpdateSample.ts
[vnetpeeringdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/vNetPeeringDeleteSample.ts
[vnetpeeringgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/vNetPeeringGetSample.ts
[vnetpeeringlistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/vNetPeeringListByWorkspaceSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/typescript/src/workspacesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-databricks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databricks/arm-databricks/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
