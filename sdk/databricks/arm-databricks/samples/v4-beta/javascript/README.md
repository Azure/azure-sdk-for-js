# @azure/arm-databricks client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-databricks in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accessConnectorsCreateOrUpdateSample.js][accessconnectorscreateorupdatesample]                     | creates or updates Azure Databricks Access Connector. x-ms-original-file: 2026-01-01/AccessConnectorCreateOrUpdate.json                                                                                                                                                                                                                                             |
| [accessConnectorsDeleteSample.js][accessconnectorsdeletesample]                                     | deletes the Azure Databricks Access Connector. x-ms-original-file: 2026-01-01/AccessConnectorDelete.json                                                                                                                                                                                                                                                            |
| [accessConnectorsGetSample.js][accessconnectorsgetsample]                                           | gets an Azure Databricks Access Connector. x-ms-original-file: 2026-01-01/AccessConnectorGet.json                                                                                                                                                                                                                                                                   |
| [accessConnectorsListByResourceGroupSample.js][accessconnectorslistbyresourcegroupsample]           | gets all the Azure Databricks Access Connectors within a resource group. x-ms-original-file: 2026-01-01/AccessConnectorsListByResourceGroup.json                                                                                                                                                                                                                    |
| [accessConnectorsListBySubscriptionSample.js][accessconnectorslistbysubscriptionsample]             | gets all the Azure Databricks Access Connectors within a subscription. x-ms-original-file: 2026-01-01/AccessConnectorsListBySubscriptionId.json                                                                                                                                                                                                                     |
| [accessConnectorsUpdateSample.js][accessconnectorsupdatesample]                                     | updates an Azure Databricks Access Connector. x-ms-original-file: 2026-01-01/AccessConnectorPatchUpdate.json                                                                                                                                                                                                                                                        |
| [operationsListSample.js][operationslistsample]                                                     | list the operations for the provider x-ms-original-file: 2026-01-01/OperationsList.json                                                                                                                                                                                                                                                                             |
| [outboundNetworkDependenciesEndpointsListSample.js][outboundnetworkdependenciesendpointslistsample] | gets the list of endpoints that VNET Injected Workspace calls Azure Databricks Control Plane. You must configure outbound access with these endpoints. For more information, see https://docs.microsoft.com/en-us/azure/databricks/administration-guide/cloud-configurations/azure/udr x-ms-original-file: 2026-01-01/OutboundNetworkDependenciesEndpointsList.json |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]                 | update the status of a private endpoint connection with the specified name x-ms-original-file: 2026-01-01/PrivateEndpointConnectionsUpdate.json                                                                                                                                                                                                                     |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                 | remove private endpoint connection with the specified name x-ms-original-file: 2026-01-01/PrivateEndpointConnectionsDelete.json                                                                                                                                                                                                                                     |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                       | get a private endpoint connection properties for a workspace x-ms-original-file: 2026-01-01/PrivateEndpointConnectionsGet.json                                                                                                                                                                                                                                      |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]                     | list private endpoint connections of the workspace x-ms-original-file: 2026-01-01/ListPrivateEndpointConnections.json                                                                                                                                                                                                                                               |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                   | get the specified private link resource for the given group id (sub-resource) x-ms-original-file: 2026-01-01/PrivateLinkResourcesGet.json                                                                                                                                                                                                                           |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                                 | list private link resources for a given workspace x-ms-original-file: 2026-01-01/ListPrivateLinkResources.json                                                                                                                                                                                                                                                      |
| [vNetPeeringCreateOrUpdateSample.js][vnetpeeringcreateorupdatesample]                               | creates vNet Peering for workspace. x-ms-original-file: 2026-01-01/WorkspaceVirtualNetworkPeeringCreateOrUpdate.json                                                                                                                                                                                                                                                |
| [vNetPeeringDeleteSample.js][vnetpeeringdeletesample]                                               | deletes the workspace vNetPeering. x-ms-original-file: 2026-01-01/WorkspaceVirtualNetworkPeeringDelete.json                                                                                                                                                                                                                                                         |
| [vNetPeeringGetSample.js][vnetpeeringgetsample]                                                     | gets the workspace vNet Peering. x-ms-original-file: 2026-01-01/WorkspaceVirtualNetPeeringGet.json                                                                                                                                                                                                                                                                  |
| [vNetPeeringListByWorkspaceSample.js][vnetpeeringlistbyworkspacesample]                             | lists the workspace vNet Peerings. x-ms-original-file: 2026-01-01/WorkspaceVirtualNetPeeringList.json                                                                                                                                                                                                                                                               |
| [workspacesCreateOrUpdateSample.js][workspacescreateorupdatesample]                                 | creates a new workspace. x-ms-original-file: 2026-01-01/DisableEncryption.json                                                                                                                                                                                                                                                                                      |
| [workspacesDeleteSample.js][workspacesdeletesample]                                                 | deletes the workspace. x-ms-original-file: 2026-01-01/WorkspaceDelete.json                                                                                                                                                                                                                                                                                          |
| [workspacesGetSample.js][workspacesgetsample]                                                       | gets the workspace. x-ms-original-file: 2026-01-01/WorkspaceEnhancedSecurityComplianceGet.json                                                                                                                                                                                                                                                                      |
| [workspacesListByResourceGroupSample.js][workspaceslistbyresourcegroupsample]                       | gets all the workspaces within a resource group. x-ms-original-file: 2026-01-01/WorkspacesListByResourceGroup.json                                                                                                                                                                                                                                                  |
| [workspacesListBySubscriptionSample.js][workspaceslistbysubscriptionsample]                         | gets all the workspaces within a subscription. x-ms-original-file: 2026-01-01/WorkspacesListBySubscription.json                                                                                                                                                                                                                                                     |
| [workspacesUpdateSample.js][workspacesupdatesample]                                                 | updates a workspace. x-ms-original-file: 2026-01-01/WorkspaceUpdate.json                                                                                                                                                                                                                                                                                            |

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
node accessConnectorsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node accessConnectorsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accessconnectorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/accessConnectorsCreateOrUpdateSample.js
[accessconnectorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/accessConnectorsDeleteSample.js
[accessconnectorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/accessConnectorsGetSample.js
[accessconnectorslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/accessConnectorsListByResourceGroupSample.js
[accessconnectorslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/accessConnectorsListBySubscriptionSample.js
[accessconnectorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/accessConnectorsUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/operationsListSample.js
[outboundnetworkdependenciesendpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/outboundNetworkDependenciesEndpointsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/privateLinkResourcesListSample.js
[vnetpeeringcreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/vNetPeeringCreateOrUpdateSample.js
[vnetpeeringdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/vNetPeeringDeleteSample.js
[vnetpeeringgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/vNetPeeringGetSample.js
[vnetpeeringlistbyworkspacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/vNetPeeringListByWorkspaceSample.js
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/workspacesCreateOrUpdateSample.js
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/workspacesDeleteSample.js
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/workspacesGetSample.js
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/workspacesListByResourceGroupSample.js
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/workspacesListBySubscriptionSample.js
[workspacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/databricks/arm-databricks/samples/v4-beta/javascript/workspacesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-databricks?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/databricks/arm-databricks/README.md
