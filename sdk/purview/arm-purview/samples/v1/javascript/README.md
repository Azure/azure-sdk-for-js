# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                       | **Description**                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsAddRootCollectionAdminSample.js][accountsaddrootcollectionadminsample]                     | Add the administrator for root collection associated with this account. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_AddRootCollectionAdmin.json          |
| [accountsCheckNameAvailabilitySample.js][accountschecknameavailabilitysample]                       | Checks if account name is available. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_CheckNameAvailability.json                                              |
| [accountsCreateOrUpdateSample.js][accountscreateorupdatesample]                                     | Creates or updates an account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_CreateOrUpdate.json                                                            |
| [accountsDeleteSample.js][accountsdeletesample]                                                     | Deletes an account resource x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_Delete.json                                                                      |
| [accountsGetSample.js][accountsgetsample]                                                           | Get an account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_Get.json                                                                                      |
| [accountsListByResourceGroupSample.js][accountslistbyresourcegroupsample]                           | List accounts in ResourceGroup x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_ListByResourceGroup.json                                                      |
| [accountsListBySubscriptionSample.js][accountslistbysubscriptionsample]                             | List accounts in Subscription x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_ListBySubscription.json                                                        |
| [accountsListKeysSample.js][accountslistkeyssample]                                                 | List the authorization keys associated with this account. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_ListKeys.json                                      |
| [accountsUpdateSample.js][accountsupdatesample]                                                     | Updates an account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Accounts_Update.json                                                                               |
| [defaultAccountsGetSample.js][defaultaccountsgetsample]                                             | Get the default account for the scope. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/DefaultAccounts_Get.json                                                       |
| [defaultAccountsRemoveSample.js][defaultaccountsremovesample]                                       | Removes the default account from the scope. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/DefaultAccounts_Remove.json                                               |
| [defaultAccountsSetSample.js][defaultaccountssetsample]                                             | Sets the default account for the scope. x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/DefaultAccounts_Set.json                                                      |
| [operationsListSample.js][operationslistsample]                                                     | List of available operations x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/Operations_List.json                                                                     |
| [privateEndpointConnectionsCreateOrUpdateSample.js][privateendpointconnectionscreateorupdatesample] | Create or update a private endpoint connection x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_CreateOrUpdate.json                         |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                 | Delete a private endpoint connection x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_Delete.json                                           |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                       | Get a private endpoint connection x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_Get.json                                                 |
| [privateEndpointConnectionsListByAccountSample.js][privateendpointconnectionslistbyaccountsample]   | Get private endpoint connections for account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateEndpointConnections_ListByAccount.json                            |
| [privateLinkResourcesGetByGroupIdSample.js][privatelinkresourcesgetbygroupidsample]                 | Gets a privately linkable resources for an account with given group identifier x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateLinkResources_GetByGroupId.json |
| [privateLinkResourcesListByAccountSample.js][privatelinkresourceslistbyaccountsample]               | Gets a list of privately linkable resources for an account x-ms-original-file: specification/purview/resource-manager/Microsoft.Purview/stable/2021-07-01/examples/PrivateLinkResources_ListByAccount.json                    |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node accountsAddRootCollectionAdminSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountsaddrootcollectionadminsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/accountsAddRootCollectionAdminSample.js
[accountschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/accountsCheckNameAvailabilitySample.js
[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/accountsCreateOrUpdateSample.js
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/accountsDeleteSample.js
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/accountsGetSample.js
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/accountsListByResourceGroupSample.js
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/accountsListBySubscriptionSample.js
[accountslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/accountsListKeysSample.js
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/accountsUpdateSample.js
[defaultaccountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/defaultAccountsGetSample.js
[defaultaccountsremovesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/defaultAccountsRemoveSample.js
[defaultaccountssetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/defaultAccountsSetSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/operationsListSample.js
[privateendpointconnectionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/privateEndpointConnectionsCreateOrUpdateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/privateEndpointConnectionsListByAccountSample.js
[privatelinkresourcesgetbygroupidsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/privateLinkResourcesGetByGroupIdSample.js
[privatelinkresourceslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/purview/arm-purview/samples/v1/javascript/privateLinkResourcesListByAccountSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-purview?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/purview/arm-purview/README.md
