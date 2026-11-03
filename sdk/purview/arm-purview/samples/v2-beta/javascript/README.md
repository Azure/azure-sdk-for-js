# @azure/arm-purview client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-purview in some common scenarios.

| **File Name**                                                                                                     | **Description**                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [accountsAddRootCollectionAdminSample.js][accountsaddrootcollectionadminsample]                                   | add the administrator for root collection associated with this account. x-ms-original-file: 2024-04-01-preview/Accounts_AddRootCollectionAdmin.json          |
| [accountsCheckNameAvailabilitySample.js][accountschecknameavailabilitysample]                                     | checks if account name is available. x-ms-original-file: 2024-04-01-preview/Accounts_CheckNameAvailability.json                                              |
| [accountsCreateOrUpdateSample.js][accountscreateorupdatesample]                                                   | creates or updates an account x-ms-original-file: 2024-04-01-preview/Accounts_CreateOrUpdate.json                                                            |
| [accountsDeleteSample.js][accountsdeletesample]                                                                   | deletes an account resource x-ms-original-file: 2024-04-01-preview/Accounts_Delete.json                                                                      |
| [accountsGetSample.js][accountsgetsample]                                                                         | get an account x-ms-original-file: 2024-04-01-preview/Accounts_Get.json                                                                                      |
| [accountsListByResourceGroupSample.js][accountslistbyresourcegroupsample]                                         | list accounts in ResourceGroup x-ms-original-file: 2024-04-01-preview/Accounts_ListByResourceGroup.json                                                      |
| [accountsListBySubscriptionSample.js][accountslistbysubscriptionsample]                                           | list accounts in Subscription x-ms-original-file: 2024-04-01-preview/Accounts_ListBySubscription.json                                                        |
| [accountsListKeysSample.js][accountslistkeyssample]                                                               | list the authorization keys associated with this account. x-ms-original-file: 2024-04-01-preview/Accounts_ListKeys.json                                      |
| [accountsUpdateSample.js][accountsupdatesample]                                                                   | updates an account x-ms-original-file: 2024-04-01-preview/Accounts_Update.json                                                                               |
| [defaultAccountsGetSample.js][defaultaccountsgetsample]                                                           | get the default account for the scope. x-ms-original-file: 2024-04-01-preview/DefaultAccounts_Get.json                                                       |
| [defaultAccountsRemoveSample.js][defaultaccountsremovesample]                                                     | removes the default account from the scope. x-ms-original-file: 2024-04-01-preview/DefaultAccounts_Remove.json                                               |
| [defaultAccountsSetSample.js][defaultaccountssetsample]                                                           | sets the default account for the scope. x-ms-original-file: 2024-04-01-preview/DefaultAccounts_Set.json                                                      |
| [featuresAccountGetSample.js][featuresaccountgetsample]                                                           | gets details from a list of feature names. x-ms-original-file: 2024-04-01-preview/Features_AccountGet.json                                                   |
| [featuresSubscriptionGetSample.js][featuressubscriptiongetsample]                                                 | gets details from a list of feature names. x-ms-original-file: 2024-04-01-preview/Features_SubscriptionGet.json                                              |
| [ingestionPrivateEndpointConnectionsListSample.js][ingestionprivateendpointconnectionslistsample]                 | lists all ingestion private endpoint connections x-ms-original-file: 2024-04-01-preview/IngestionPrivateEndpointConnections_List.json                        |
| [ingestionPrivateEndpointConnectionsUpdateStatusSample.js][ingestionprivateendpointconnectionsupdatestatussample] | update ingestion private endpoint connection status x-ms-original-file: 2024-04-01-preview/IngestionPrivateEndpointConnections_UpdateStatus.json             |
| [kafkaConfigurationsCreateOrUpdateSample.js][kafkaconfigurationscreateorupdatesample]                             | create or update Kafka Configuration x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_CreateOrUpdate.json                                          |
| [kafkaConfigurationsDeleteSample.js][kafkaconfigurationsdeletesample]                                             | deletes a KafkaConfiguration resource. x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_Delete.json                                                |
| [kafkaConfigurationsGetSample.js][kafkaconfigurationsgetsample]                                                   | gets the kafka configuration for the account x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_Get.json                                             |
| [kafkaConfigurationsListByAccountSample.js][kafkaconfigurationslistbyaccountsample]                               | lists the Kafka configurations in the Account x-ms-original-file: 2024-04-01-preview/KafkaConfigurations_ListByAccount.json                                  |
| [operationsListSample.js][operationslistsample]                                                                   | list of available operations x-ms-original-file: 2024-04-01-preview/Operations_List.json                                                                     |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample]               | create or update a private endpoint connection x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_CreateOrUpdate.json                         |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                               | delete a private endpoint connection x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_Delete.json                                           |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                     | get a private endpoint connection x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_Get.json                                                 |
| [privateEndpointConnectionsListByAccountSample.js][privateendpointconnectionslistbyaccountsample]                 | get private endpoint connections for account x-ms-original-file: 2024-04-01-preview/PrivateEndpointConnections_ListByAccount.json                            |
| [privateLinkResourcesGetByGroupIdSample.js][privatelinkresourcesgetbygroupidsample]                               | gets a privately linkable resources for an account with given group identifier x-ms-original-file: 2024-04-01-preview/PrivateLinkResources_GetByGroupId.json |
| [privateLinkResourcesListByAccountSample.js][privatelinkresourceslistbyaccountsample]                             | gets a list of privately linkable resources for an account x-ms-original-file: 2024-04-01-preview/PrivateLinkResources_ListByAccount.json                    |
| [usagesGetSample.js][usagesgetsample]                                                                             | get the usage quota configuration x-ms-original-file: 2024-04-01-preview/Usages_Get.json                                                                     |

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
node accountsAddRootCollectionAdminSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node accountsAddRootCollectionAdminSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountsaddrootcollectionadminsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/accountsAddRootCollectionAdminSample.js
[accountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/accountsCheckNameAvailabilitySample.js
[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/accountsCreateOrUpdateSample.js
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/accountsDeleteSample.js
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/accountsGetSample.js
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/accountsListByResourceGroupSample.js
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/accountsListBySubscriptionSample.js
[accountslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/accountsListKeysSample.js
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/accountsUpdateSample.js
[defaultaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/defaultAccountsGetSample.js
[defaultaccountsremovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/defaultAccountsRemoveSample.js
[defaultaccountssetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/defaultAccountsSetSample.js
[featuresaccountgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/featuresAccountGetSample.js
[featuressubscriptiongetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/featuresSubscriptionGetSample.js
[ingestionprivateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/ingestionPrivateEndpointConnectionsListSample.js
[ingestionprivateendpointconnectionsupdatestatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/ingestionPrivateEndpointConnectionsUpdateStatusSample.js
[kafkaconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/kafkaConfigurationsCreateOrUpdateSample.js
[kafkaconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/kafkaConfigurationsDeleteSample.js
[kafkaconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/kafkaConfigurationsGetSample.js
[kafkaconfigurationslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/kafkaConfigurationsListByAccountSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/operationsListSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/privateEndpointConnectionsListByAccountSample.js
[privatelinkresourcesgetbygroupidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/privateLinkResourcesGetByGroupIdSample.js
[privatelinkresourceslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/privateLinkResourcesListByAccountSample.js
[usagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v2-beta/javascript/usagesGetSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-purview?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/arm-purview/README.md
