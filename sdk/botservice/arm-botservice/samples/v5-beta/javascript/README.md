# @azure/arm-botservice client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-botservice in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [botConnectionCreateSample.js][botconnectioncreatesample]                                                         | register a new Auth Connection for a Bot Service x-ms-original-file: 2023-09-15-preview/PutConnection.json                                                                           |
| [botConnectionDeleteSample.js][botconnectiondeletesample]                                                         | deletes a Connection Setting registration for a Bot Service x-ms-original-file: 2023-09-15-preview/DeleteConnection.json                                                             |
| [botConnectionGetSample.js][botconnectiongetsample]                                                               | get a Connection Setting registration for a Bot Service x-ms-original-file: 2023-09-15-preview/GetConnection.json                                                                    |
| [botConnectionListByBotServiceSample.js][botconnectionlistbybotservicesample]                                     | returns all the Connection Settings registered to a particular BotService resource x-ms-original-file: 2023-09-15-preview/ListConnectionsByBotService.json                           |
| [botConnectionListServiceProvidersSample.js][botconnectionlistserviceproviderssample]                             | lists the available Service Providers for creating Connection Settings x-ms-original-file: 2023-09-15-preview/ListServiceProviders.json                                              |
| [botConnectionListWithSecretsSample.js][botconnectionlistwithsecretssample]                                       | get a Connection Setting registration for a Bot Service x-ms-original-file: 2023-09-15-preview/GetConnectionListWithSecrets.json                                                     |
| [botConnectionUpdateSample.js][botconnectionupdatesample]                                                         | updates a Connection Setting registration for a Bot Service x-ms-original-file: 2023-09-15-preview/UpdateConnection.json                                                             |
| [botsCreateSample.js][botscreatesample]                                                                           | creates a Bot Service. Bot Service is a resource group wide resource type. x-ms-original-file: 2023-09-15-preview/CreateBot.json                                                     |
| [botsDeleteSample.js][botsdeletesample]                                                                           | deletes a Bot Service from the resource group. x-ms-original-file: 2023-09-15-preview/DeleteBot.json                                                                                 |
| [botsGetCheckNameAvailabilitySample.js][botsgetchecknameavailabilitysample]                                       | check whether a bot name is available. x-ms-original-file: 2023-09-15-preview/CheckNameAvailability.json                                                                             |
| [botsGetSample.js][botsgetsample]                                                                                 | returns a BotService specified by the parameters. x-ms-original-file: 2023-09-15-preview/GetBot.json                                                                                 |
| [botsListByResourceGroupSample.js][botslistbyresourcegroupsample]                                                 | returns all the resources of a particular type belonging to a resource group x-ms-original-file: 2023-09-15-preview/ListBotsByResourceGroup.json                                     |
| [botsListSample.js][botslistsample]                                                                               | returns all the resources of a particular type belonging to a subscription. x-ms-original-file: 2023-09-15-preview/ListBotsBySubscription.json                                       |
| [botsUpdateSample.js][botsupdatesample]                                                                           | updates a Bot Service x-ms-original-file: 2023-09-15-preview/UpdateBot.json                                                                                                          |
| [channelsCreateSample.js][channelscreatesample]                                                                   | creates a Channel registration for a Bot Service x-ms-original-file: 2023-09-15-preview/PutAlexaChannel.json                                                                         |
| [channelsDeleteSample.js][channelsdeletesample]                                                                   | deletes a Channel registration from a Bot Service x-ms-original-file: 2023-09-15-preview/DeleteChannel.json                                                                          |
| [channelsGetSample.js][channelsgetsample]                                                                         | returns a BotService Channel registration specified by the parameters. x-ms-original-file: 2023-09-15-preview/GetAlexaChannel.json                                                   |
| [channelsListByResourceGroupSample.js][channelslistbyresourcegroupsample]                                         | returns all the Channel registrations of a particular BotService resource x-ms-original-file: 2023-09-15-preview/ListChannelsByBotService.json                                       |
| [channelsListWithKeysSample.js][channelslistwithkeyssample]                                                       | lists a Channel registration for a Bot Service including secrets x-ms-original-file: 2023-09-15-preview/ListChannel.json                                                             |
| [channelsUpdateSample.js][channelsupdatesample]                                                                   | updates a Channel registration for a Bot Service x-ms-original-file: 2023-09-15-preview/UpdateAlexaChannel.json                                                                      |
| [directLineRegenerateKeysSample.js][directlineregeneratekeyssample]                                               | regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource x-ms-original-file: 2023-09-15-preview/DirectlineRegenerateKeys.json         |
| [emailCreateSignInUrlSample.js][emailcreatesigninurlsample]                                                       | creates an email channel sign in url for a Bot Service x-ms-original-file: 2023-09-15-preview/CreateEmailSignInUrl.json                                                              |
| [hostSettingsGetSample.js][hostsettingsgetsample]                                                                 | get per subscription settings needed to host bot in compute resource such as Azure App Service x-ms-original-file: 2023-09-15-preview/GetHostSettings.json                           |
| [networkSecurityPerimeterConfigurationsGetSample.js][networksecurityperimeterconfigurationsgetsample]             | gets the specified Network Security Perimeter configuration associated with the Bot. x-ms-original-file: 2023-09-15-preview/GetNetworkSecurityPerimeterConfiguration.json            |
| [networkSecurityPerimeterConfigurationsListSample.js][networksecurityperimeterconfigurationslistsample]           | list Network Security Perimeter configurations associated with the Bot. x-ms-original-file: 2023-09-15-preview/ListNetworkSecurityPerimeterConfigurations.json                       |
| [networkSecurityPerimeterConfigurationsReconcileSample.js][networksecurityperimeterconfigurationsreconcilesample] | reconcile the specified Network Security Perimeter configuration associated with the Bot. x-ms-original-file: 2023-09-15-preview/ReconcileNetworkSecurityPerimeterConfiguration.json |
| [operationResultsGetSample.js][operationresultsgetsample]                                                         | get the operation result for a long running operation. x-ms-original-file: 2023-09-15-preview/OperationResultsGet.json                                                               |
| [operationsListSample.js][operationslistsample]                                                                   | list the operations for the provider x-ms-original-file: 2023-09-15-preview/GetOperations.json                                                                                       |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]                               | update the state of specified private endpoint connection associated with the Bot. x-ms-original-file: 2023-09-15-preview/PutPrivateEndpointConnection.json                          |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                               | deletes the specified private endpoint connection associated with the Bot. x-ms-original-file: 2023-09-15-preview/DeletePrivateEndpointConnection.json                               |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                     | gets the specified private endpoint connection associated with the Bot. x-ms-original-file: 2023-09-15-preview/GetPrivateEndpointConnection.json                                     |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]                                   | list all the private endpoint connections associated with the Bot. x-ms-original-file: 2023-09-15-preview/ListPrivateEndpointConnections.json                                        |
| [privateLinkResourcesListByBotResourceSample.js][privatelinkresourceslistbybotresourcesample]                     | gets the private link resources that need to be created for a Bot. x-ms-original-file: 2023-09-15-preview/ListPrivateLinkResources.json                                              |
| [qnAMakerEndpointKeysGetSample.js][qnamakerendpointkeysgetsample]                                                 | lists the QnA Maker endpoint keys x-ms-original-file: 2023-09-15-preview/ListQnAMakerEndpointKeys.json                                                                               |

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
node botConnectionCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node botConnectionCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[botconnectioncreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botConnectionCreateSample.js
[botconnectiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botConnectionDeleteSample.js
[botconnectiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botConnectionGetSample.js
[botconnectionlistbybotservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botConnectionListByBotServiceSample.js
[botconnectionlistserviceproviderssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botConnectionListServiceProvidersSample.js
[botconnectionlistwithsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botConnectionListWithSecretsSample.js
[botconnectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botConnectionUpdateSample.js
[botscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botsCreateSample.js
[botsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botsDeleteSample.js
[botsgetchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botsGetCheckNameAvailabilitySample.js
[botsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botsGetSample.js
[botslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botsListByResourceGroupSample.js
[botslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botsListSample.js
[botsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/botsUpdateSample.js
[channelscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/channelsCreateSample.js
[channelsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/channelsDeleteSample.js
[channelsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/channelsGetSample.js
[channelslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/channelsListByResourceGroupSample.js
[channelslistwithkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/channelsListWithKeysSample.js
[channelsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/channelsUpdateSample.js
[directlineregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/directLineRegenerateKeysSample.js
[emailcreatesigninurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/emailCreateSignInUrlSample.js
[hostsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/hostSettingsGetSample.js
[networksecurityperimeterconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/networkSecurityPerimeterConfigurationsGetSample.js
[networksecurityperimeterconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/networkSecurityPerimeterConfigurationsListSample.js
[networksecurityperimeterconfigurationsreconcilesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/networkSecurityPerimeterConfigurationsReconcileSample.js
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/operationResultsGetSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/operationsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourceslistbybotresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/privateLinkResourcesListByBotResourceSample.js
[qnamakerendpointkeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v5-beta/javascript/qnAMakerEndpointKeysGetSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-botservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/botservice/arm-botservice/README.md
