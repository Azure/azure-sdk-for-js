# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                 | **Description**                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [botConnectionCreateSample.ts][botconnectioncreatesample]                                     | Register a new Auth Connection for a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/PutConnection.json                                                                   |
| [botConnectionDeleteSample.ts][botconnectiondeletesample]                                     | Deletes a Connection Setting registration for a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/DeleteConnection.json                                                     |
| [botConnectionGetSample.ts][botconnectiongetsample]                                           | Get a Connection Setting registration for a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetConnection.json                                                            |
| [botConnectionListByBotServiceSample.ts][botconnectionlistbybotservicesample]                 | Returns all the Connection Settings registered to a particular BotService resource x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListConnectionsByBotService.json                   |
| [botConnectionListServiceProvidersSample.ts][botconnectionlistserviceproviderssample]         | Lists the available Service Providers for creating Connection Settings x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListServiceProviders.json                                      |
| [botConnectionListWithSecretsSample.ts][botconnectionlistwithsecretssample]                   | Get a Connection Setting registration for a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetConnection.json                                                            |
| [botConnectionUpdateSample.ts][botconnectionupdatesample]                                     | Updates a Connection Setting registration for a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/UpdateConnection.json                                                     |
| [botsCreateSample.ts][botscreatesample]                                                       | Creates a Bot Service. Bot Service is a resource group wide resource type. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/CreateBot.json                                             |
| [botsDeleteSample.ts][botsdeletesample]                                                       | Deletes a Bot Service from the resource group. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/DeleteBot.json                                                                         |
| [botsGetCheckNameAvailabilitySample.ts][botsgetchecknameavailabilitysample]                   | Check whether a bot name is available. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/CheckNameAvailability.json                                                                     |
| [botsGetSample.ts][botsgetsample]                                                             | Returns a BotService specified by the parameters. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetBot.json                                                                         |
| [botsListByResourceGroupSample.ts][botslistbyresourcegroupsample]                             | Returns all the resources of a particular type belonging to a resource group x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListBotsByResourceGroup.json                             |
| [botsListSample.ts][botslistsample]                                                           | Returns all the resources of a particular type belonging to a subscription. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListBotsBySubscription.json                               |
| [botsUpdateSample.ts][botsupdatesample]                                                       | Updates a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/UpdateBot.json                                                                                                  |
| [channelsCreateSample.ts][channelscreatesample]                                               | Creates a Channel registration for a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/PutAlexaChannel.json                                                                 |
| [channelsDeleteSample.ts][channelsdeletesample]                                               | Deletes a Channel registration from a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/DeleteChannel.json                                                                  |
| [channelsGetSample.ts][channelsgetsample]                                                     | Returns a BotService Channel registration specified by the parameters. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetAlexaChannel.json                                           |
| [channelsListByResourceGroupSample.ts][channelslistbyresourcegroupsample]                     | Returns all the Channel registrations of a particular BotService resource x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListChannelsByBotService.json                               |
| [channelsListWithKeysSample.ts][channelslistwithkeyssample]                                   | Lists a Channel registration for a Bot Service including secrets x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListChannel.json                                                     |
| [channelsUpdateSample.ts][channelsupdatesample]                                               | Updates a Channel registration for a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/UpdateAlexaChannel.json                                                              |
| [directLineRegenerateKeysSample.ts][directlineregeneratekeyssample]                           | Regenerates secret keys and returns them for the DirectLine Channel of a particular BotService resource x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/DirectlineRegenerateKeys.json |
| [emailCreateSignInUrlSample.ts][emailcreatesigninurlsample]                                   | Creates an email channel sign in url for a Bot Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/CreateEmailSignInUrl.json                                                      |
| [hostSettingsGetSample.ts][hostsettingsgetsample]                                             | Get per subscription settings needed to host bot in compute resource such as Azure App Service x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetHostSettings.json                   |
| [operationResultsGetSample.ts][operationresultsgetsample]                                     | Get the operation result for a long running operation. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/OperationResultsGet.json                                                       |
| [operationsListSample.ts][operationslistsample]                                               | Lists all the available BotService operations. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetOperations.json                                                                     |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]           | Update the state of specified private endpoint connection associated with the Bot. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/PutPrivateEndpointConnection.json                  |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]           | Deletes the specified private endpoint connection associated with the Bot. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/DeletePrivateEndpointConnection.json                       |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                 | Gets the specified private endpoint connection associated with the Bot. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/GetPrivateEndpointConnection.json                             |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]               | List all the private endpoint connections associated with the Bot. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListPrivateEndpointConnections.json                                |
| [privateLinkResourcesListByBotResourceSample.ts][privatelinkresourceslistbybotresourcesample] | Gets the private link resources that need to be created for a Bot. x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListPrivateLinkResources.json                                      |
| [qnAMakerEndpointKeysGetSample.ts][qnamakerendpointkeysgetsample]                             | Lists the QnA Maker endpoint keys x-ms-original-file: specification/botservice/resource-manager/Microsoft.BotService/stable/2022-09-15/examples/ListQnAMakerEndpointKeys.json                                                                       |

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
cross-env BOTSERVICE_SUBSCRIPTION_ID="<botservice subscription id>" BOTSERVICE_RESOURCE_GROUP="<botservice resource group>" node dist/botConnectionCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[botconnectioncreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botConnectionCreateSample.ts
[botconnectiondeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botConnectionDeleteSample.ts
[botconnectiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botConnectionGetSample.ts
[botconnectionlistbybotservicesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botConnectionListByBotServiceSample.ts
[botconnectionlistserviceproviderssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botConnectionListServiceProvidersSample.ts
[botconnectionlistwithsecretssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botConnectionListWithSecretsSample.ts
[botconnectionupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botConnectionUpdateSample.ts
[botscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botsCreateSample.ts
[botsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botsDeleteSample.ts
[botsgetchecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botsGetCheckNameAvailabilitySample.ts
[botsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botsGetSample.ts
[botslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botsListByResourceGroupSample.ts
[botslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botsListSample.ts
[botsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/botsUpdateSample.ts
[channelscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/channelsCreateSample.ts
[channelsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/channelsDeleteSample.ts
[channelsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/channelsGetSample.ts
[channelslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/channelsListByResourceGroupSample.ts
[channelslistwithkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/channelsListWithKeysSample.ts
[channelsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/channelsUpdateSample.ts
[directlineregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/directLineRegenerateKeysSample.ts
[emailcreatesigninurlsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/emailCreateSignInUrlSample.ts
[hostsettingsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/hostSettingsGetSample.ts
[operationresultsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/operationResultsGetSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/operationsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourceslistbybotresourcesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/privateLinkResourcesListByBotResourceSample.ts
[qnamakerendpointkeysgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/botservice/arm-botservice/samples/v4/typescript/src/qnAMakerEndpointKeysGetSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-botservice?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/botservice/arm-botservice/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
