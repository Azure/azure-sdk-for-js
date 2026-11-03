# @azure/arm-purview client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-purview in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [accountsAddRootCollectionAdminSample.ts][accountsaddrootcollectionadminsample]                                   | add the administrator for root collection associated with this account. x-ms-original-file: 2024-04-01-preview/Accounts_AddRootCollectionAdmin.json          |
| [accountsCheckNameAvailabilitySample.ts][accountschecknameavailabilitysample]                                     | checks if account name is available. x-ms-original-file: 2024-04-01-preview/Accounts_CheckNameAvailability.json                                              |
| [accountsCreateOrUpdateSample.ts][accountscreateorupdatesample]                                                   | creates or updates an account x-ms-original-file: 2024-04-01-preview/Accounts_CreateOrUpdate.json                                                            |
| [accountsDeleteSample.ts][accountsdeletesample]                                                                   | deletes an account resource x-ms-original-file: 2024-04-01-preview/Accounts_Delete.json                                                                      |
| [accountsGetSample.ts][accountsgetsample]                                                                         | get an account x-ms-original-file: 2024-04-01-preview/Accounts_Get.json                                                                                      |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample]                                         | list accounts in ResourceGroup x-ms-original-file: 2024-04-01-preview/Accounts_ListByResourceGroup.json                                                      |
| [accountsListBySubscriptionSample.ts][accountslistbysubscriptionsample]                                           | list accounts in Subscription x-ms-original-file: 2024-04-01-preview/Accounts_ListBySubscription.json                                                        |
| [accountsListKeysSample.ts][accountslistkeyssample]                                                               | list the authorization keys associated with this account. x-ms-original-file: 2024-04-01-preview/Accounts_ListKeys.json                                      |
| [accountsUpdateSample.ts][accountsupdatesample]                                                                   | updates an account x-ms-original-file: 2024-04-01-preview/Accounts_Update.json                                                                               |
| [defaultAccountsGetSample.ts][defaultaccountsgetsample]                                                           | get the default account for the scope. x-ms-original-file: 2024-04-01-preview/DefaultAccounts_Get.json                                                       |
| [defaultAccountsRemoveSample.ts][defaultaccountsremovesample]                                                     | removes the default account from the scope. x-ms-original-file: 2024-04-01-preview/DefaultAccounts_Remove.json                                               |
| [defaultAccountsSetSample.ts][defaultaccountssetsample]                                                           | sets the default account for the scope. x-ms-original-file: 2024-04-01-preview/DefaultAccounts_Set.json                                                      |
| [featuresAccountGetSample.ts][featuresaccountgetsample]                                                           | gets details from a list of feature names. x-ms-original-file: 2024-04-01-preview/Features_AccountGet.json                                                   |
| [featuresSubscriptionGetSample.ts][featuressubscriptiongetsample]                                                 | gets details from a list of feature names. x-ms-original-file: 2024-04-01-preview/Features_SubscriptionGet.json                                              |
| [ingestionPrivateEndpointConnectionsListSample.ts][ingestionprivateendpointconnectionslistsample]                 | lists all ingestion private endpoint connections x-ms-original-file: 2024-04-01-preview/IngestionPrivateEndpointConnections_List.json                        |
| [ingestionPrivateEndpointConnectionsUpdateStatusSample.ts][ingestionprivateendpointconnectionsupdatestatussample] | update ingestion private endpoint connection status x-ms-original-file: 2024-04-01-preview/IngestionPrivateEndpointConnections_UpdateStatus.json             |
| [kafkaConfigurationsCreateOrUpdateSample.ts][kafkaconfigurationscreateorupdatesample]                             | create or update Kafka Configuration x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_CreateOrUpdate.json                                          |
| [kafkaConfigurationsDeleteSample.ts][kafkaconfigurationsdeletesample]                                             | deletes a KafkaConfiguration resource. x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_Delete.json                                                |
| [kafkaConfigurationsGetSample.ts][kafkaconfigurationsgetsample]                                                   | gets the kafka configuration for the account x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_Get.json                                             |
| [kafkaConfigurationsListByAccountSample.ts][kafkaconfigurationslistbyaccountsample]                               | lists the Kafka configurations in the Account x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_ListByAccount.json                                  |
| [operationsListSample.ts][operationslistsample]                                                                   | list of available operations x-ms-original-file: 2024-04-01-preview/Operations_List.json                                                                     |
| [privateEndpointConnectionsCreateOrUpdateSample.ts][privateendpointconnectionscreateorupdatesample]               | create or update a private endpoint connection x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_CreateOrUpdate.json                         |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                               | delete a private endpoint connection x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_Delete.json                                           |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                     | get a private endpoint connection x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_Get.json                                                 |
| [privateEndpointConnectionsListByAccountSample.ts][privateendpointconnectionslistbyaccountsample]                 | get private endpoint connections for account x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_ListByAccount.json                            |
| [privateLinkResourcesGetByGroupIdSample.ts][privatelinkresourcesgetbygroupidsample]                               | gets a privately linkable resources for an account with given group identifier x-ms-original-file: 2024-04-01-preview/PrivateLinkResources_GetByGroupId.json |
| [privateLinkResourcesListByAccountSample.ts][privatelinkresourceslistbyaccountsample]                             | gets a list of privately linkable resources for an account x-ms-original-file: 2024-04-01-preview/PrivateLinkResources_ListByAccount.json                    |
| [usagesGetSample.ts][usagesgetsample]                                                                             | get the usage quota configuration x-ms-original-file: 2024-04-01-preview/Usages_Get.json                                                                     |

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
node dist/accountsAddRootCollectionAdminSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/accountsAddRootCollectionAdminSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountsaddrootcollectionadminsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/accountsAddRootCollectionAdminSample.ts
[accountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/accountsCheckNameAvailabilitySample.ts
[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/accountsCreateOrUpdateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/accountsListByResourceGroupSample.ts
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/accountsListBySubscriptionSample.ts
[accountslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/accountsListKeysSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/accountsUpdateSample.ts
[defaultaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/defaultAccountsGetSample.ts
[defaultaccountsremovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/defaultAccountsRemoveSample.ts
[defaultaccountssetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/defaultAccountsSetSample.ts
[featuresaccountgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/featuresAccountGetSample.ts
[featuressubscriptiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/featuresSubscriptionGetSample.ts
[ingestionprivateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/ingestionPrivateEndpointConnectionsListSample.ts
[ingestionprivateendpointconnectionsupdatestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/ingestionPrivateEndpointConnectionsUpdateStatusSample.ts
[kafkaconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/kafkaConfigurationsCreateOrUpdateSample.ts
[kafkaconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/kafkaConfigurationsDeleteSample.ts
[kafkaconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/kafkaConfigurationsGetSample.ts
[kafkaconfigurationslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/kafkaConfigurationsListByAccountSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/privateEndpointConnectionsCreateOrUpdateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/privateEndpointConnectionsListByAccountSample.ts
[privatelinkresourcesgetbygroupidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/privateLinkResourcesGetByGroupIdSample.ts
[privatelinkresourceslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/privateLinkResourcesListByAccountSample.ts
[usagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/typescript/src/usagesGetSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-purview?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/arm-purview/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
