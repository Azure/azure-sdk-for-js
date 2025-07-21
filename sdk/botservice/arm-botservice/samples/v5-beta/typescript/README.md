# @azure/arm-botservice client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-botservice in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [botConnectionCreateSample.ts][botconnectioncreatesample]                                                         | register a new Auth Connection for a Bot Service x-ms-original-file: 2023-09-15-preview/PutConnection.json                                                                           |
| [botConnectionDeleteSample.ts][botconnectiondeletesample]                                                         | deletes a Connection Setting registration for a Bot Service x-ms-original-file: 2023-09-15-preview/DeleteConnection.json                                                             |
| [botConnectionGetSample.ts][botconnectiongetsample]                                                               | get a Connection Setting registration for a Bot Service x-ms-original-file: 2023-09-15-preview/GetConnection.json                                                                    |
| [botConnectionListByBotServiceSample.ts][botconnectionlistbybotservicesample]                                     | returns all the Connection Settings registered to a particular BotService resource x-ms-original-file: 2023-09-15-preview/ListConnectionsByBotService.json                           |
| [botConnectionListServiceProvidersSample.ts][botconnectionlistserviceproviderssample]                             | lists the available Service Providers for creating Connection Settings x-ms-original-file: 2023-09-15-preview/ListServiceProviders.json                                              |
| [botConnectionListWithSecretsSample.ts][botconnectionlistwithsecretssample]                                       | get a Connection Setting registration for a Bot Service x-ms-original-file: 2023-09-15-preview/GetConnectionListWithSecrets.json                                                     |
| [botConnectionUpdateSample.ts][botconnectionupdatesample]                                                         | updates a Connection Setting registration for a Bot Service x-ms-original-file: 2023-09-15-preview/UpdateConnection.json                                                             |
| [botsCreateSample.ts][botscreatesample]                                                                           | creates a Bot Service. Bot Service is a resource group wide resource type. x-ms-original-file: 2023-09-15-preview/CreateBot.json                                                     |
| [botsDeleteSample.ts][botsdeletesample]                                                                           | deletes a Bot Service from the resource group. x-ms-original-file: 2023-09-15-preview/DeleteBot.json                                                                                 |
| [botsGetCheckNameAvailabilitySample.ts][botsgetchecknameavailabilitysample]                                       | check whether a bot name is available. x-ms-original-file: 2023-09-15-preview/CheckNameAvailability.json                                                                             |
| [botsGetSample.ts][botsgetsample]                                                                                 | returns a BotService specified by the parameters. x-ms-original-file: 2023-09-15-preview/GetBot.json                                                                                 |
| [botsListByResourceGroupSample.ts][botslistbyresourcegroupsample]                                                 | returns all the resources of a particular type belonging to a resource group x-ms-original-file: 2023-09-15-preview/ListBotsByResourceGroup.json                                     |
| [botsListSample.ts][botslistsample]                                                                               | returns all the resources of a particular type belonging to a subscription. x-ms-original-file: 2023-09-15-preview/ListBotsBySubscription.json                                       |
| [botsUpdateSample.ts][botsupdatesample]                                                                           | updates a Bot Service x-ms-original-file: 2023-09-15-preview/UpdateBot.json                                                                                                          |
| [channelsCreateSample.ts][channelscreatesample]                                                                   | creates a Channel registration for a Bot Service x-ms-original-file: 2023-09-15-preview/PutAlexaChannel.json                                                                         |
| [channelsDeleteSample.ts][channelsdeletesample]                                                                   | deletes a Channel registration from a Bot Service x-ms-original-file: 2023-09-15-preview/DeleteChannel.json                                                                          |
| [channelsGetSample.ts][channelsgetsample]                                                                         | returns a BotService Channel registration specified by the parameters. x-ms-original-file: 2023-09-15-preview/GetAlexaChannel.json                                                   |
| [channelsListByResourceGroupSample.ts][channelslistbyresourcegroupsample]                                         | returns all the Channel registrations of a particular BotService resource x-ms-original-file: 2023-09-15-preview/ListChannelsByBotService.json                                       |
| [channelsListWithKeysSample.ts][channelslistwithkeyssample]                                                       | lists a Channel registration for a Bot Service including secrets x-ms-original-file: 2023-09-15-preview/ListChannel.json                                                             |
| [channelsUpdateSample.ts][channelsupdatesample]                                                                   | updates a Channel registration for a Bot Service x-ms-original-file: 2023-09-15-preview/UpdateAlexaChannel.json                                                                      |
| [directLineRegenerateKeysSample.ts][directlineregeneratekeyssample]                                               | regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource x-ms-original-file: 2023-09-15-preview/DirectlineRegenerateKeys.json         |
| [emailCreateSignInUrlSample.ts][emailcreatesigninurlsample]                                                       | creates an email channel sign in url for a Bot Service x-ms-original-file: 2023-09-15-preview/CreateEmailSignInUrl.json                                                              |
| [hostSettingsGetSample.ts][hostsettingsgetsample]                                                                 | get per subscription settings needed to host bot in compute resource such as Azure App Service x-ms-original-file: 2023-09-15-preview/GetHostSettings.json                           |
| [networkSecurityPerimeterConfigurationsGetSample.ts][networksecurityperimeterconfigurationsgetsample]             | gets the specified Network Security Perimeter configuration associated with the Bot. x-ms-original-file: 2023-09-15-preview/GetNetworkSecurityPerimeterConfiguration.json            |
| [networkSecurityPerimeterConfigurationsListSample.ts][networksecurityperimeterconfigurationslistsample]           | list Network Security Perimeter configurations associated with the Bot. x-ms-original-file: 2023-09-15-preview/ListNetworkSecurityPerimeterConfigurations.json                       |
| [networkSecurityPerimeterConfigurationsReconcileSample.ts][networksecurityperimeterconfigurationsreconcilesample] | reconcile the specified Network Security Perimeter configuration associated with the Bot. x-ms-original-file: 2023-09-15-preview/ReconcileNetworkSecurityPerimeterConfiguration.json |
| [operationResultsGetSample.ts][operationresultsgetsample]                                                         | get the operation result for a long running operation. x-ms-original-file: 2023-09-15-preview/OperationResultsGet.json                                                               |
| [operationsListSample.ts][operationslistsample]                                                                   | list the operations for the provider x-ms-original-file: 2023-09-15-preview/GetOperations.json                                                                                       |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]                               | update the state of specified private endpoint connection associated with the Bot. x-ms-original-file: 2023-09-15-preview/PutPrivateEndpointConnection.json                          |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                               | deletes the specified private endpoint connection associated with the Bot. x-ms-original-file: 2023-09-15-preview/DeletePrivateEndpointConnection.json                               |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                     | gets the specified private endpoint connection associated with the Bot. x-ms-original-file: 2023-09-15-preview/GetPrivateEndpointConnection.json                                     |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]                                   | list all the private endpoint connections associated with the Bot. x-ms-original-file: 2023-09-15-preview/ListPrivateEndpointConnections.json                                        |
| [privateLinkResourcesListByBotResourceSample.ts][privatelinkresourceslistbybotresourcesample]                     | gets the private link resources that need to be created for a Bot. x-ms-original-file: 2023-09-15-preview/ListPrivateLinkResources.json                                              |
| [qnAMakerEndpointKeysGetSample.ts][qnamakerendpointkeysgetsample]                                                 | lists the QnA Maker endpoint keys x-ms-original-file: 2023-09-15-preview/ListQnAMakerEndpointKeys.json                                                                               |

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
node dist/botConnectionCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/botConnectionCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[botconnectioncreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botConnectionCreateSample.ts
[botconnectiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botConnectionDeleteSample.ts
[botconnectiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botConnectionGetSample.ts
[botconnectionlistbybotservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botConnectionListByBotServiceSample.ts
[botconnectionlistserviceproviderssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botConnectionListServiceProvidersSample.ts
[botconnectionlistwithsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botConnectionListWithSecretsSample.ts
[botconnectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botConnectionUpdateSample.ts
[botscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botsCreateSample.ts
[botsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botsDeleteSample.ts
[botsgetchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botsGetCheckNameAvailabilitySample.ts
[botsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botsGetSample.ts
[botslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botsListByResourceGroupSample.ts
[botslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botsListSample.ts
[botsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/botsUpdateSample.ts
[channelscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/channelsCreateSample.ts
[channelsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/channelsDeleteSample.ts
[channelsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/channelsGetSample.ts
[channelslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/channelsListByResourceGroupSample.ts
[channelslistwithkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/channelsListWithKeysSample.ts
[channelsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/channelsUpdateSample.ts
[directlineregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/directLineRegenerateKeysSample.ts
[emailcreatesigninurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/emailCreateSignInUrlSample.ts
[hostsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/hostSettingsGetSample.ts
[networksecurityperimeterconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/networkSecurityPerimeterConfigurationsGetSample.ts
[networksecurityperimeterconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/networkSecurityPerimeterConfigurationsListSample.ts
[networksecurityperimeterconfigurationsreconcilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/networkSecurityPerimeterConfigurationsReconcileSample.ts
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/operationResultsGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourceslistbybotresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/privateLinkResourcesListByBotResourceSample.ts
[qnamakerendpointkeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/typescript/src/qnAMakerEndpointKeysGetSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-botservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/botservice/arm-botservice/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
