# @azure/arm-relay client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-relay in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hybridConnectionsCreateOrUpdateAuthorizationRuleSample.js][hybridconnectionscreateorupdateauthorizationrulesample] | creates or updates an authorization rule for a hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleCreate.json                                      |
| [hybridConnectionsCreateOrUpdateSample.js][hybridconnectionscreateorupdatesample]                                   | creates or updates a service hybrid connection. This operation is idempotent. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionCreate.json                                           |
| [hybridConnectionsDeleteAuthorizationRuleSample.js][hybridconnectionsdeleteauthorizationrulesample]                 | deletes a hybrid connection authorization rule. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleDelete.json                                                        |
| [hybridConnectionsDeleteSample.js][hybridconnectionsdeletesample]                                                   | deletes a hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridconnectionDelete.json                                                                                            |
| [hybridConnectionsGetAuthorizationRuleSample.js][hybridconnectionsgetauthorizationrulesample]                       | hybrid connection authorization rule for a hybrid connection by name. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleGet.json                                     |
| [hybridConnectionsGetSample.js][hybridconnectionsgetsample]                                                         | returns the description for the specified hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionGet.json                                                               |
| [hybridConnectionsListAuthorizationRulesSample.js][hybridconnectionslistauthorizationrulessample]                   | authorization rules for a hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleListAll.json                                                          |
| [hybridConnectionsListByNamespaceSample.js][hybridconnectionslistbynamespacesample]                                 | lists the hybrid connection within the namespace. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionListAll.json                                                                      |
| [hybridConnectionsListKeysSample.js][hybridconnectionslistkeyssample]                                               | primary and secondary connection strings to the hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleListKey.json                                    |
| [hybridConnectionsRegenerateKeysSample.js][hybridconnectionsregeneratekeyssample]                                   | regenerates the primary or secondary connection strings to the hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleRegenerateKey.json               |
| [namespacesCheckNameAvailabilitySample.js][namespaceschecknameavailabilitysample]                                   | check the specified namespace name availability. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceCheckNameAvailability.json                                                                      |
| [namespacesCreateOrUpdateAuthorizationRuleSample.js][namespacescreateorupdateauthorizationrulesample]               | creates or updates an authorization rule for a namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleCreate.json                                                           |
| [namespacesCreateOrUpdateNetworkRuleSetSample.js][namespacescreateorupdatenetworkrulesetsample]                     | create or update NetworkRuleSet for a Namespace. x-ms-original-file: 2024-01-01/VirtualNetworkRules/RelayNetworkRuleSetCreate.json                                                                       |
| [namespacesCreateOrUpdateSample.js][namespacescreateorupdatesample]                                                 | create Azure Relay namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceCreate.json                                                                                                        |
| [namespacesDeleteAuthorizationRuleSample.js][namespacesdeleteauthorizationrulesample]                               | deletes a namespace authorization rule. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleDelete.json                                                                             |
| [namespacesDeleteSample.js][namespacesdeletesample]                                                                 | deletes an existing namespace. This operation also removes all associated resources under the namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceDelete.json                             |
| [namespacesGetAuthorizationRuleSample.js][namespacesgetauthorizationrulesample]                                     | authorization rule for a namespace by name. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleGet.json                                                                            |
| [namespacesGetNetworkRuleSetSample.js][namespacesgetnetworkrulesetsample]                                           | gets NetworkRuleSet for a Namespace. x-ms-original-file: 2024-01-01/VirtualNetworkRules/RelayNetworkRuleSetGet.json                                                                                      |
| [namespacesGetSample.js][namespacesgetsample]                                                                       | returns the description for the specified namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceGet.json                                                                                    |
| [namespacesListAuthorizationRulesSample.js][namespaceslistauthorizationrulessample]                                 | authorization rules for a namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleListAll.json                                                                               |
| [namespacesListByResourceGroupSample.js][namespaceslistbyresourcegroupsample]                                       | lists all the available namespaces within the ResourceGroup. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceListByResourceGroup.json                                                            |
| [namespacesListKeysSample.js][namespaceslistkeyssample]                                                             | primary and secondary connection strings to the namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleListKey.json                                                         |
| [namespacesListSample.js][namespaceslistsample]                                                                     | lists all the available namespaces within the subscription regardless of the resourceGroups. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceListBySubscription.json                             |
| [namespacesRegenerateKeysSample.js][namespacesregeneratekeyssample]                                                 | regenerates the primary or secondary connection strings to the namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleRegenerateKey.json                                    |
| [namespacesUpdateSample.js][namespacesupdatesample]                                                                 | creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceUpdate.json         |
| [operationsListSample.js][operationslistsample]                                                                     | list the operations for the provider x-ms-original-file: 2024-01-01/RelayOperations_List.json                                                                                                            |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]                 | creates or updates PrivateEndpointConnections of service namespace. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsCreate.json                                      |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                                 | deletes an existing namespace. This operation also removes all associated resources under the namespace. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsDelete.json |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                       | gets a description for the specified Private Endpoint Connection name. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsGet.json                                      |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]                                     | gets the available PrivateEndpointConnections within a namespace. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsList.json                                          |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                                   | gets a private link resource by a specified group name for a container registry. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateLinkResourcesGet.json                                  |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                                                 | lists the private link resources for a container registry. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateLinkResourcesList.json                                                       |
| [wcfRelaysCreateOrUpdateAuthorizationRuleSample.js][wcfrelayscreateorupdateauthorizationrulesample]                 | creates or updates an authorization rule for a WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleCreate.json                                                                         |
| [wcfRelaysCreateOrUpdateSample.js][wcfrelayscreateorupdatesample]                                                   | creates or updates a WCF relay. This operation is idempotent. x-ms-original-file: 2024-01-01/Relay/RelayCreate.json                                                                                      |
| [wcfRelaysDeleteAuthorizationRuleSample.js][wcfrelaysdeleteauthorizationrulesample]                                 | deletes a WCF relay authorization rule. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleDelete.json                                                                                           |
| [wcfRelaysDeleteSample.js][wcfrelaysdeletesample]                                                                   | deletes a WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayDelete.json                                                                                                                               |
| [wcfRelaysGetAuthorizationRuleSample.js][wcfrelaysgetauthorizationrulesample]                                       | get authorizationRule for a WCF relay by name. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleGet.json                                                                                       |
| [wcfRelaysGetSample.js][wcfrelaysgetsample]                                                                         | returns the description for the specified WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayGet.json                                                                                                  |
| [wcfRelaysListAuthorizationRulesSample.js][wcfrelayslistauthorizationrulessample]                                   | authorization rules for a WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleListAll.json                                                                                             |
| [wcfRelaysListByNamespaceSample.js][wcfrelayslistbynamespacesample]                                                 | lists the WCF relays within the namespace. x-ms-original-file: 2024-01-01/Relay/RelayListAll.json                                                                                                        |
| [wcfRelaysListKeysSample.js][wcfrelayslistkeyssample]                                                               | primary and secondary connection strings to the WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleListKey.json                                                                       |
| [wcfRelaysRegenerateKeysSample.js][wcfrelaysregeneratekeyssample]                                                   | regenerates the primary or secondary connection strings to the WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleRegenerateKey.json                                                  |

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
node hybridConnectionsCreateOrUpdateAuthorizationRuleSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node hybridConnectionsCreateOrUpdateAuthorizationRuleSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[hybridconnectionscreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsCreateOrUpdateAuthorizationRuleSample.js
[hybridconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsCreateOrUpdateSample.js
[hybridconnectionsdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsDeleteAuthorizationRuleSample.js
[hybridconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsDeleteSample.js
[hybridconnectionsgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsGetAuthorizationRuleSample.js
[hybridconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsGetSample.js
[hybridconnectionslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsListAuthorizationRulesSample.js
[hybridconnectionslistbynamespacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsListByNamespaceSample.js
[hybridconnectionslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsListKeysSample.js
[hybridconnectionsregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/hybridConnectionsRegenerateKeysSample.js
[namespaceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesCheckNameAvailabilitySample.js
[namespacescreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesCreateOrUpdateAuthorizationRuleSample.js
[namespacescreateorupdatenetworkrulesetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesCreateOrUpdateNetworkRuleSetSample.js
[namespacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesCreateOrUpdateSample.js
[namespacesdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesDeleteAuthorizationRuleSample.js
[namespacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesDeleteSample.js
[namespacesgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesGetAuthorizationRuleSample.js
[namespacesgetnetworkrulesetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesGetNetworkRuleSetSample.js
[namespacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesGetSample.js
[namespaceslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesListAuthorizationRulesSample.js
[namespaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesListByResourceGroupSample.js
[namespaceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesListKeysSample.js
[namespaceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesListSample.js
[namespacesregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesRegenerateKeysSample.js
[namespacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/namespacesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/operationsListSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/privateLinkResourcesListSample.js
[wcfrelayscreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysCreateOrUpdateAuthorizationRuleSample.js
[wcfrelayscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysCreateOrUpdateSample.js
[wcfrelaysdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysDeleteAuthorizationRuleSample.js
[wcfrelaysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysDeleteSample.js
[wcfrelaysgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysGetAuthorizationRuleSample.js
[wcfrelaysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysGetSample.js
[wcfrelayslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysListAuthorizationRulesSample.js
[wcfrelayslistbynamespacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysListByNamespaceSample.js
[wcfrelayslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysListKeysSample.js
[wcfrelaysregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/javascript/wcfRelaysRegenerateKeysSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-relay?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/relay/arm-relay/README.md
