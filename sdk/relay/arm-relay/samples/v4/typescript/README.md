# @azure/arm-relay client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-relay in some common scenarios.

| **File Name**                                                                                                       | **Description**                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [hybridConnectionsCreateOrUpdateAuthorizationRuleSample.ts][hybridconnectionscreateorupdateauthorizationrulesample] | creates or updates an authorization rule for a hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleCreate.json                                      |
| [hybridConnectionsCreateOrUpdateSample.ts][hybridconnectionscreateorupdatesample]                                   | creates or updates a service hybrid connection. This operation is idempotent. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionCreate.json                                           |
| [hybridConnectionsDeleteAuthorizationRuleSample.ts][hybridconnectionsdeleteauthorizationrulesample]                 | deletes a hybrid connection authorization rule. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleDelete.json                                                        |
| [hybridConnectionsDeleteSample.ts][hybridconnectionsdeletesample]                                                   | deletes a hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridconnectionDelete.json                                                                                            |
| [hybridConnectionsGetAuthorizationRuleSample.ts][hybridconnectionsgetauthorizationrulesample]                       | hybrid connection authorization rule for a hybrid connection by name. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleGet.json                                     |
| [hybridConnectionsGetSample.ts][hybridconnectionsgetsample]                                                         | returns the description for the specified hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionGet.json                                                               |
| [hybridConnectionsListAuthorizationRulesSample.ts][hybridconnectionslistauthorizationrulessample]                   | authorization rules for a hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleListAll.json                                                          |
| [hybridConnectionsListByNamespaceSample.ts][hybridconnectionslistbynamespacesample]                                 | lists the hybrid connection within the namespace. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionListAll.json                                                                      |
| [hybridConnectionsListKeysSample.ts][hybridconnectionslistkeyssample]                                               | primary and secondary connection strings to the hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleListKey.json                                    |
| [hybridConnectionsRegenerateKeysSample.ts][hybridconnectionsregeneratekeyssample]                                   | regenerates the primary or secondary connection strings to the hybrid connection. x-ms-original-file: 2024-01-01/HybridConnection/RelayHybridConnectionAuthorizationRuleRegenerateKey.json               |
| [namespacesCheckNameAvailabilitySample.ts][namespaceschecknameavailabilitysample]                                   | check the specified namespace name availability. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceCheckNameAvailability.json                                                                      |
| [namespacesCreateOrUpdateAuthorizationRuleSample.ts][namespacescreateorupdateauthorizationrulesample]               | creates or updates an authorization rule for a namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleCreate.json                                                           |
| [namespacesCreateOrUpdateNetworkRuleSetSample.ts][namespacescreateorupdatenetworkrulesetsample]                     | create or update NetworkRuleSet for a Namespace. x-ms-original-file: 2024-01-01/VirtualNetworkRules/RelayNetworkRuleSetCreate.json                                                                       |
| [namespacesCreateOrUpdateSample.ts][namespacescreateorupdatesample]                                                 | create Azure Relay namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceCreate.json                                                                                                        |
| [namespacesDeleteAuthorizationRuleSample.ts][namespacesdeleteauthorizationrulesample]                               | deletes a namespace authorization rule. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleDelete.json                                                                             |
| [namespacesDeleteSample.ts][namespacesdeletesample]                                                                 | deletes an existing namespace. This operation also removes all associated resources under the namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceDelete.json                             |
| [namespacesGetAuthorizationRuleSample.ts][namespacesgetauthorizationrulesample]                                     | authorization rule for a namespace by name. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleGet.json                                                                            |
| [namespacesGetNetworkRuleSetSample.ts][namespacesgetnetworkrulesetsample]                                           | gets NetworkRuleSet for a Namespace. x-ms-original-file: 2024-01-01/VirtualNetworkRules/RelayNetworkRuleSetGet.json                                                                                      |
| [namespacesGetSample.ts][namespacesgetsample]                                                                       | returns the description for the specified namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceGet.json                                                                                    |
| [namespacesListAuthorizationRulesSample.ts][namespaceslistauthorizationrulessample]                                 | authorization rules for a namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleListAll.json                                                                               |
| [namespacesListByResourceGroupSample.ts][namespaceslistbyresourcegroupsample]                                       | lists all the available namespaces within the ResourceGroup. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceListByResourceGroup.json                                                            |
| [namespacesListKeysSample.ts][namespaceslistkeyssample]                                                             | primary and secondary connection strings to the namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleListKey.json                                                         |
| [namespacesListSample.ts][namespaceslistsample]                                                                     | lists all the available namespaces within the subscription regardless of the resourceGroups. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceListBySubscription.json                             |
| [namespacesRegenerateKeysSample.ts][namespacesregeneratekeyssample]                                                 | regenerates the primary or secondary connection strings to the namespace. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceAuthorizationRuleRegenerateKey.json                                    |
| [namespacesUpdateSample.ts][namespacesupdatesample]                                                                 | creates or updates a namespace. Once created, this namespace's resource manifest is immutable. This operation is idempotent. x-ms-original-file: 2024-01-01/NameSpaces/RelayNameSpaceUpdate.json         |
| [operationsListSample.ts][operationslistsample]                                                                     | list the operations for the provider x-ms-original-file: 2024-01-01/RelayOperations_List.json                                                                                                            |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]                 | creates or updates PrivateEndpointConnections of service namespace. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsCreate.json                                      |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                 | deletes an existing namespace. This operation also removes all associated resources under the namespace. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsDelete.json |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                       | gets a description for the specified Private Endpoint Connection name. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsGet.json                                      |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                                     | gets the available PrivateEndpointConnections within a namespace. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateEndpointConnectionsList.json                                          |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                                   | gets a private link resource by a specified group name for a container registry. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateLinkResourcesGet.json                                  |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                                                 | lists the private link resources for a container registry. x-ms-original-file: 2024-01-01/PrivateEndpointConnections/PrivateLinkResourcesList.json                                                       |
| [wcfRelaysCreateOrUpdateAuthorizationRuleSample.ts][wcfrelayscreateorupdateauthorizationrulesample]                 | creates or updates an authorization rule for a WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleCreate.json                                                                         |
| [wcfRelaysCreateOrUpdateSample.ts][wcfrelayscreateorupdatesample]                                                   | creates or updates a WCF relay. This operation is idempotent. x-ms-original-file: 2024-01-01/Relay/RelayCreate.json                                                                                      |
| [wcfRelaysDeleteAuthorizationRuleSample.ts][wcfrelaysdeleteauthorizationrulesample]                                 | deletes a WCF relay authorization rule. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleDelete.json                                                                                           |
| [wcfRelaysDeleteSample.ts][wcfrelaysdeletesample]                                                                   | deletes a WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayDelete.json                                                                                                                               |
| [wcfRelaysGetAuthorizationRuleSample.ts][wcfrelaysgetauthorizationrulesample]                                       | get authorizationRule for a WCF relay by name. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleGet.json                                                                                       |
| [wcfRelaysGetSample.ts][wcfrelaysgetsample]                                                                         | returns the description for the specified WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayGet.json                                                                                                  |
| [wcfRelaysListAuthorizationRulesSample.ts][wcfrelayslistauthorizationrulessample]                                   | authorization rules for a WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleListAll.json                                                                                             |
| [wcfRelaysListByNamespaceSample.ts][wcfrelayslistbynamespacesample]                                                 | lists the WCF relays within the namespace. x-ms-original-file: 2024-01-01/Relay/RelayListAll.json                                                                                                        |
| [wcfRelaysListKeysSample.ts][wcfrelayslistkeyssample]                                                               | primary and secondary connection strings to the WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleListKey.json                                                                       |
| [wcfRelaysRegenerateKeysSample.ts][wcfrelaysregeneratekeyssample]                                                   | regenerates the primary or secondary connection strings to the WCF relay. x-ms-original-file: 2024-01-01/Relay/RelayAuthorizationRuleRegenerateKey.json                                                  |

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
node dist/hybridConnectionsCreateOrUpdateAuthorizationRuleSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/hybridConnectionsCreateOrUpdateAuthorizationRuleSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[hybridconnectionscreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsCreateOrUpdateAuthorizationRuleSample.ts
[hybridconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsCreateOrUpdateSample.ts
[hybridconnectionsdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsDeleteAuthorizationRuleSample.ts
[hybridconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsDeleteSample.ts
[hybridconnectionsgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsGetAuthorizationRuleSample.ts
[hybridconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsGetSample.ts
[hybridconnectionslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsListAuthorizationRulesSample.ts
[hybridconnectionslistbynamespacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsListByNamespaceSample.ts
[hybridconnectionslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsListKeysSample.ts
[hybridconnectionsregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/hybridConnectionsRegenerateKeysSample.ts
[namespaceschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesCheckNameAvailabilitySample.ts
[namespacescreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesCreateOrUpdateAuthorizationRuleSample.ts
[namespacescreateorupdatenetworkrulesetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesCreateOrUpdateNetworkRuleSetSample.ts
[namespacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesCreateOrUpdateSample.ts
[namespacesdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesDeleteAuthorizationRuleSample.ts
[namespacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesDeleteSample.ts
[namespacesgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesGetAuthorizationRuleSample.ts
[namespacesgetnetworkrulesetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesGetNetworkRuleSetSample.ts
[namespacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesGetSample.ts
[namespaceslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesListAuthorizationRulesSample.ts
[namespaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesListByResourceGroupSample.ts
[namespaceslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesListKeysSample.ts
[namespaceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesListSample.ts
[namespacesregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesRegenerateKeysSample.ts
[namespacesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/namespacesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/privateLinkResourcesListSample.ts
[wcfrelayscreateorupdateauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysCreateOrUpdateAuthorizationRuleSample.ts
[wcfrelayscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysCreateOrUpdateSample.ts
[wcfrelaysdeleteauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysDeleteAuthorizationRuleSample.ts
[wcfrelaysdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysDeleteSample.ts
[wcfrelaysgetauthorizationrulesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysGetAuthorizationRuleSample.ts
[wcfrelaysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysGetSample.ts
[wcfrelayslistauthorizationrulessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysListAuthorizationRulesSample.ts
[wcfrelayslistbynamespacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysListByNamespaceSample.ts
[wcfrelayslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysListKeysSample.ts
[wcfrelaysregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/relay/arm-relay/samples/v4/typescript/src/wcfRelaysRegenerateKeysSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-relay?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/relay/arm-relay/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
