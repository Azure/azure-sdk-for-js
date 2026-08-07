# @azure/arm-relay client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-relay in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [clustersCreateOrUpdateSample.js][clusterscreateorupdatesample]                                                     | creates or updates a Relay cluster. x-ms-original-file: 2026-07-01-preview/Clusters/ClusterPut.json                                                                                                              |
| [clustersDeleteSample.js][clustersdeletesample]                                                                     | deletes a Relay cluster. x-ms-original-file: 2026-07-01-preview/Clusters/ClusterDelete.json                                                                                                                      |
| [clustersGetSample.js][clustersgetsample]                                                                           | gets a Relay cluster. x-ms-original-file: 2026-07-01-preview/Clusters/ClusterGet.json                                                                                                                            |
| [clustersListAvailableClusterRegionSample.js][clusterslistavailableclusterregionsample]                             | lists regions containing available pre-provisioned Relay clusters. x-ms-original-file: 2026-07-01-preview/Clusters/ListAvailableClustersGet.json                                                                 |
| [clustersListByResourceGroupSample.js][clusterslistbyresourcegroupsample]                                           | lists Relay clusters in a resource group. x-ms-original-file: 2026-07-01-preview/Clusters/ClustersListByResourceGroup.json                                                                                       |
| [clustersListBySubscriptionSample.js][clusterslistbysubscriptionsample]                                             | lists Relay clusters in a subscription. x-ms-original-file: 2026-07-01-preview/Clusters/ClustersListBySubscription.json                                                                                          |
| [clustersListNamespacesSample.js][clusterslistnamespacessample]                                                     | lists Relay namespace resource IDs assigned to a Relay cluster. x-ms-original-file: 2026-07-01-preview/Clusters/ListNamespacesInClusterGet.json                                                                  |
| [clustersListSkusSample.js][clusterslistskussample]                                                                 | lists SKUs supported by a Relay cluster. x-ms-original-file: 2026-07-01-preview/Clusters/ClusterSkusGet.json                                                                                                     |
| [clustersUpdateSample.js][clustersupdatesample]                                                                     | updates mutable properties of a Relay cluster. x-ms-original-file: 2026-07-01-preview/Clusters/ClusterPatch.json                                                                                                 |
| [hybridConnectionsCreateOrUpdateAuthorizationRuleSample.js][hybridconnectionscreateorupdateauthorizationrulesample] | creates or updates an authorization rule for a hybrid connection. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridConnectionAuthorizationRuleCreate.json                                      |
| [hybridConnectionsCreateOrUpdateSample.js][hybridconnectionscreateorupdatesample]                                   | creates or updates a service hybrid connection. This operation is idempotent. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridConnectionCreate.json                                           |
| [hybridConnectionsDeleteAuthorizationRuleSample.js][hybridconnectionsdeleteauthorizationrulesample]                 | deletes a hybrid connection authorization rule. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridConnectionAuthorizationRuleDelete.json                                                        |
| [hybridConnectionsDeleteSample.js][hybridconnectionsdeletesample]                                                   | deletes a hybrid connection. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridconnectionDelete.json                                                                                            |
| [hybridConnectionsGetAuthorizationRuleSample.js][hybridconnectionsgetauthorizationrulesample]                       | hybrid connection authorization rule for a hybrid connection by name. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridConnectionAuthorizationRuleGet.json                                     |
| [hybridConnectionsGetSample.js][hybridconnectionsgetsample]                                                         | returns the description for the specified hybrid connection. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridConnectionGet.json                                                               |
| [hybridConnectionsListAuthorizationRulesSample.js][hybridconnectionslistauthorizationrulessample]                   | authorization rules for a hybrid connection. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridConnectionAuthorizationRuleListAll.json                                                          |
| [hybridConnectionsListByNamespaceSample.js][hybridconnectionslistbynamespacesample]                                 | lists the hybrid connection within the namespace. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridConnectionListAll.json                                                                      |
| [hybridConnectionsListKeysSample.js][hybridconnectionslistkeyssample]                                               | primary and secondary connection strings to the hybrid connection. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridConnectionAuthorizationRuleListKey.json                                    |
| [hybridConnectionsRegenerateKeysSample.js][hybridconnectionsregeneratekeyssample]                                   | regenerates the primary or secondary connection strings to the hybrid connection. x-ms-original-file: 2026-07-01-preview/HybridConnection/RelayHybridConnectionAuthorizationRuleRegenerateKey.json               |
| [namespacesCheckNameAvailabilitySample.js][namespaceschecknameavailabilitysample]                                   | check the specified namespace name availability. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceCheckNameAvailability.json                                                                      |
| [namespacesCreateOrUpdateAuthorizationRuleSample.js][namespacescreateorupdateauthorizationrulesample]               | creates or updates an authorization rule for a namespace. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceAuthorizationRuleCreate.json                                                           |
| [namespacesCreateOrUpdateNetworkRuleSetSample.js][namespacescreateorupdatenetworkrulesetsample]                     | create or update NetworkRuleSet for a Namespace. x-ms-original-file: 2026-07-01-preview/VirtualNetworkRules/RelayNetworkRuleSetCreate.json                                                                       |
| [namespacesCreateOrUpdateSample.js][namespacescreateorupdatesample]                                                 | create Azure Relay namespace. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceCreate.json                                                                                                        |
| [namespacesDeleteAuthorizationRuleSample.js][namespacesdeleteauthorizationrulesample]                               | deletes a namespace authorization rule. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceAuthorizationRuleDelete.json                                                                             |
| [namespacesDeleteSample.js][namespacesdeletesample]                                                                 | deletes an existing namespace. This operation also removes all associated resources under the namespace. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceDelete.json                             |
| [namespacesGetAuthorizationRuleSample.js][namespacesgetauthorizationrulesample]                                     | authorization rule for a namespace by name. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceAuthorizationRuleGet.json                                                                            |
| [namespacesGetNetworkRuleSetSample.js][namespacesgetnetworkrulesetsample]                                           | gets NetworkRuleSet for a Namespace. x-ms-original-file: 2026-07-01-preview/VirtualNetworkRules/RelayNetworkRuleSetGet.json                                                                                      |
| [namespacesGetSample.js][namespacesgetsample]                                                                       | returns the description for the specified namespace. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceGet.json                                                                                    |
| [namespacesListAuthorizationRulesSample.js][namespaceslistauthorizationrulessample]                                 | authorization rules for a namespace. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceAuthorizationRuleListAll.json                                                                               |
| [namespacesListByResourceGroupSample.js][namespaceslistbyresourcegroupsample]                                       | lists all the available namespaces within the ResourceGroup. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceListByResourceGroup.json                                                            |
| [namespacesListKeysSample.js][namespaceslistkeyssample]                                                             | primary and secondary connection strings to the namespace. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceAuthorizationRuleListKey.json                                                         |
| [namespacesListSample.js][namespaceslistsample]                                                                     | lists all the available namespaces within the subscription regardless of the resourceGroups. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceListBySubscription.json                             |
| [namespacesRegenerateKeysSample.js][namespacesregeneratekeyssample]                                                 | regenerates the primary or secondary connection strings to the namespace. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceAuthorizationRuleRegenerateKey.json                                    |
| [namespacesUpdateSample.js][namespacesupdatesample]                                                                 | creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. x-ms-original-file: 2026-07-01-preview/NameSpaces/RelayNameSpaceUpdate.json         |
| [operationsListSample.js][operationslistsample]                                                                     | list the operations for the provider x-ms-original-file: 2026-07-01-preview/RelayOperations_List.json                                                                                                            |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]                 | creates or updates PrivateEndpointConnections of service namespace. x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections/PrivateEndpointConnectionsCreate.json                                      |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                                 | deletes an existing namespace. This operation also removes all associated resources under the namespace. x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections/PrivateEndpointConnectionsDelete.json |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                       | gets a description for the specified Private Endpoint Connection name. x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections/PrivateEndpointConnectionsGet.json                                      |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]                                     | gets the available PrivateEndpointConnections within a namespace. x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections/PrivateEndpointConnectionsList.json                                          |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                                   | gets a private link resource by a specified group name for a container registry. x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections/PrivateLinkResourcesGet.json                                  |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                                                 | lists the private link resources for a container registry. x-ms-original-file: 2026-07-01-preview/PrivateEndpointConnections/PrivateLinkResourcesList.json                                                       |
| [wCFRelaysCreateOrUpdateAuthorizationRuleSample.js][wcfrelayscreateorupdateauthorizationrulesample]                 | creates or updates an authorization rule for a WCF relay. x-ms-original-file: 2026-07-01-preview/Relay/RelayAuthorizationRuleCreate.json                                                                         |
| [wCFRelaysCreateOrUpdateSample.js][wcfrelayscreateorupdatesample]                                                   | creates or updates a WCF relay. This operation is idempotent. x-ms-original-file: 2026-07-01-preview/Relay/RelayCreate.json                                                                                      |
| [wCFRelaysDeleteAuthorizationRuleSample.js][wcfrelaysdeleteauthorizationrulesample]                                 | deletes a WCF relay authorization rule. x-ms-original-file: 2026-07-01-preview/Relay/RelayAuthorizationRuleDelete.json                                                                                           |
| [wCFRelaysDeleteSample.js][wcfrelaysdeletesample]                                                                   | deletes a WCF relay. x-ms-original-file: 2026-07-01-preview/Relay/RelayDelete.json                                                                                                                               |
| [wCFRelaysGetAuthorizationRuleSample.js][wcfrelaysgetauthorizationrulesample]                                       | get authorizationRule for a WCF relay by name. x-ms-original-file: 2026-07-01-preview/Relay/RelayAuthorizationRuleGet.json                                                                                       |
| [wCFRelaysGetSample.js][wcfrelaysgetsample]                                                                         | returns the description for the specified WCF relay. x-ms-original-file: 2026-07-01-preview/Relay/RelayGet.json                                                                                                  |
| [wCFRelaysListAuthorizationRulesSample.js][wcfrelayslistauthorizationrulessample]                                   | authorization rules for a WCF relay. x-ms-original-file: 2026-07-01-preview/Relay/RelayAuthorizationRuleListAll.json                                                                                             |
| [wCFRelaysListByNamespaceSample.js][wcfrelayslistbynamespacesample]                                                 | lists the WCF relays within the namespace. x-ms-original-file: 2026-07-01-preview/Relay/RelayListAll.json                                                                                                        |
| [wCFRelaysListKeysSample.js][wcfrelayslistkeyssample]                                                               | primary and secondary connection strings to the WCF relay. x-ms-original-file: 2026-07-01-preview/Relay/RelayAuthorizationRuleListKey.json                                                                       |
| [wCFRelaysRegenerateKeysSample.js][wcfrelaysregeneratekeyssample]                                                   | regenerates the primary or secondary connection strings to the WCF relay. x-ms-original-file: 2026-07-01-preview/Relay/RelayAuthorizationRuleRegenerateKey.json                                                  |

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
node clustersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node clustersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[clusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/clustersCreateOrUpdateSample.js
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/clustersDeleteSample.js
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/clustersGetSample.js
[clusterslistavailableclusterregionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/clustersListAvailableClusterRegionSample.js
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/clustersListByResourceGroupSample.js
[clusterslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/clustersListBySubscriptionSample.js
[clusterslistnamespacessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/clustersListNamespacesSample.js
[clusterslistskussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/clustersListSkusSample.js
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/clustersUpdateSample.js
[hybridconnectionscreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsCreateOrUpdateAuthorizationRuleSample.js
[hybridconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsCreateOrUpdateSample.js
[hybridconnectionsdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsDeleteAuthorizationRuleSample.js
[hybridconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsDeleteSample.js
[hybridconnectionsgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsGetAuthorizationRuleSample.js
[hybridconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsGetSample.js
[hybridconnectionslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsListAuthorizationRulesSample.js
[hybridconnectionslistbynamespacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsListByNamespaceSample.js
[hybridconnectionslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsListKeysSample.js
[hybridconnectionsregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/hybridConnectionsRegenerateKeysSample.js
[namespaceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesCheckNameAvailabilitySample.js
[namespacescreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesCreateOrUpdateAuthorizationRuleSample.js
[namespacescreateorupdatenetworkrulesetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesCreateOrUpdateNetworkRuleSetSample.js
[namespacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesCreateOrUpdateSample.js
[namespacesdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesDeleteAuthorizationRuleSample.js
[namespacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesDeleteSample.js
[namespacesgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesGetAuthorizationRuleSample.js
[namespacesgetnetworkrulesetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesGetNetworkRuleSetSample.js
[namespacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesGetSample.js
[namespaceslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesListAuthorizationRulesSample.js
[namespaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesListByResourceGroupSample.js
[namespaceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesListKeysSample.js
[namespaceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesListSample.js
[namespacesregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesRegenerateKeysSample.js
[namespacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/namespacesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/operationsListSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/privateLinkResourcesListSample.js
[wcfrelayscreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysCreateOrUpdateAuthorizationRuleSample.js
[wcfrelayscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysCreateOrUpdateSample.js
[wcfrelaysdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysDeleteAuthorizationRuleSample.js
[wcfrelaysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysDeleteSample.js
[wcfrelaysgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysGetAuthorizationRuleSample.js
[wcfrelaysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysGetSample.js
[wcfrelayslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysListAuthorizationRulesSample.js
[wcfrelayslistbynamespacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysListByNamespaceSample.js
[wcfrelayslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysListKeysSample.js
[wcfrelaysregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v5-beta/javascript/wCFRelaysRegenerateKeysSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-relay?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/relay/arm-relay/README.md
