# @azure/arm-maps client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-maps in some common scenarios.

| **File Name**                                                                                     | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [accountsCreateOrUpdateSample.ts][accountscreateorupdatesample]                                   | create or update a Maps Account. A Maps Account holds the keys which allow access to the Maps REST APIs. x-ms-original-file: 2025-10-01-preview/CreateAccountEncryption.json                                                                                                                                                                                                                                                                                                                          |
| [accountsDeleteSample.ts][accountsdeletesample]                                                   | delete a Maps Account. x-ms-original-file: 2025-10-01-preview/DeleteAccount.json                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [accountsGetSample.ts][accountsgetsample]                                                         | get a Maps Account. x-ms-original-file: 2025-10-01-preview/GetAccount.json                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [accountsListByResourceGroupSample.ts][accountslistbyresourcegroupsample]                         | get all Maps Accounts in a Resource Group x-ms-original-file: 2025-10-01-preview/ListAccountsByResourceGroup.json                                                                                                                                                                                                                                                                                                                                                                                     |
| [accountsListBySubscriptionSample.ts][accountslistbysubscriptionsample]                           | get all Maps Accounts in a Subscription x-ms-original-file: 2025-10-01-preview/ListAccountsBySubscription.json                                                                                                                                                                                                                                                                                                                                                                                        |
| [accountsListKeysSample.ts][accountslistkeyssample]                                               | get the keys to use with the Maps APIs. A key is used to authenticate and authorize access to the Maps REST APIs. Only one key is needed at a time; two are given to provide seamless key regeneration. x-ms-original-file: 2025-10-01-preview/ListKeys.json                                                                                                                                                                                                                                          |
| [accountsListSasSample.ts][accountslistsassample]                                                 | create and list an account shared access signature token. Use this SAS token for authentication to Azure Maps REST APIs through various Azure Maps SDKs. As prerequisite to create a SAS Token. Prerequisites: 1. Create or have an existing User Assigned Managed Identity in the same Azure region as the account. 2. Create or update an Azure Maps account with the same Azure region as the User Assigned Managed Identity is placed. x-ms-original-file: 2025-10-01-preview/AccountListSAS.json |
| [accountsRegenerateKeysSample.ts][accountsregeneratekeyssample]                                   | regenerate either the primary or secondary key for use with the Maps APIs. The old key will stop working immediately. x-ms-original-file: 2025-10-01-preview/RegenerateKey.json                                                                                                                                                                                                                                                                                                                       |
| [accountsUpdateSample.ts][accountsupdatesample]                                                   | updates a Maps Account. Only a subset of the parameters may be updated after creation, such as Sku, Tags, Properties. x-ms-original-file: 2025-10-01-preview/UpdateAccount.json                                                                                                                                                                                                                                                                                                                       |
| [creatorsCreateOrUpdateSample.ts][creatorscreateorupdatesample]                                   | create or update a Maps Creator resource. Creator resource will manage Azure resources required to populate a custom set of mapping data. It requires an account to exist before it can be created. x-ms-original-file: 2025-10-01-preview/CreateMapsCreator.json                                                                                                                                                                                                                                     |
| [creatorsDeleteSample.ts][creatorsdeletesample]                                                   | delete a Maps Creator resource. x-ms-original-file: 2025-10-01-preview/DeleteMapsCreator.json                                                                                                                                                                                                                                                                                                                                                                                                         |
| [creatorsGetSample.ts][creatorsgetsample]                                                         | get a Maps Creator resource. x-ms-original-file: 2025-10-01-preview/GetMapsCreator.json                                                                                                                                                                                                                                                                                                                                                                                                               |
| [creatorsListByAccountSample.ts][creatorslistbyaccountsample]                                     | get all Creator instances for an Azure Maps Account x-ms-original-file: 2025-10-01-preview/ListMapsCreatorsByAccount.json                                                                                                                                                                                                                                                                                                                                                                             |
| [creatorsUpdateSample.ts][creatorsupdatesample]                                                   | updates the Maps Creator resource. Only a subset of the parameters may be updated after creation, such as Tags. x-ms-original-file: 2025-10-01-preview/UpdateMapsCreator.json                                                                                                                                                                                                                                                                                                                         |
| [mapsListOperationsSample.ts][mapslistoperationssample]                                           | list operations available for the Maps Resource Provider x-ms-original-file: 2025-10-01-preview/GetOperations.json                                                                                                                                                                                                                                                                                                                                                                                    |
| [operationResultGetSample.ts][operationresultgetsample]                                           | get the result of a long running azure asynchronous operation. x-ms-original-file: 2025-10-01-preview/GetOperationResult.json                                                                                                                                                                                                                                                                                                                                                                         |
| [operationStatusGetSample.ts][operationstatusgetsample]                                           | get the status of a long running azure asynchronous operation. x-ms-original-file: 2025-10-01-preview/GetOperationStatus.json                                                                                                                                                                                                                                                                                                                                                                         |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]               | create or update the state of specified private endpoint connection associated with the Maps account. x-ms-original-file: 2025-10-01-preview/PrivateEndpointConnections_Update.json                                                                                                                                                                                                                                                                                                                   |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]               | deletes the specified private endpoint connection associated with the Maps Account. x-ms-original-file: 2025-10-01-preview/PrivateEndpointConnections_Delete.json                                                                                                                                                                                                                                                                                                                                     |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                     | gets the specified private endpoint connection associated with the Maps Account. x-ms-original-file: 2025-10-01-preview/PrivateEndpointConnections_Get.json                                                                                                                                                                                                                                                                                                                                           |
| [privateEndpointConnectionsListByAccountSample.ts][privateendpointconnectionslistbyaccountsample] | get a private endpoint connections on the Maps Account. x-ms-original-file: 2025-10-01-preview/PrivateEndpointConnections_ListByAccount.json                                                                                                                                                                                                                                                                                                                                                          |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                 | gets a private link resource by name which can be used for the Maps Account. x-ms-original-file: 2025-10-01-preview/PrivateLinkResources_Get.json                                                                                                                                                                                                                                                                                                                                                     |
| [privateLinkResourcesListByAccountSample.ts][privatelinkresourceslistbyaccountsample]             | gets the private link resources that are available to be used for the Maps Account. x-ms-original-file: 2025-10-01-preview/PrivateLinkResources_List.json                                                                                                                                                                                                                                                                                                                                             |

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
node dist/accountsCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/accountsCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[accountscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/accountsCreateOrUpdateSample.ts
[accountsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/accountsDeleteSample.ts
[accountsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/accountsGetSample.ts
[accountslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/accountsListByResourceGroupSample.ts
[accountslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/accountsListBySubscriptionSample.ts
[accountslistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/accountsListKeysSample.ts
[accountslistsassample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/accountsListSasSample.ts
[accountsregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/accountsRegenerateKeysSample.ts
[accountsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/accountsUpdateSample.ts
[creatorscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/creatorsCreateOrUpdateSample.ts
[creatorsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/creatorsDeleteSample.ts
[creatorsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/creatorsGetSample.ts
[creatorslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/creatorsListByAccountSample.ts
[creatorsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/creatorsUpdateSample.ts
[mapslistoperationssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/mapsListOperationsSample.ts
[operationresultgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/operationResultGetSample.ts
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/operationStatusGetSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/privateEndpointConnectionsListByAccountSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistbyaccountsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/maps/arm-maps/samples/v4-beta/typescript/src/privateLinkResourcesListByAccountSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-maps?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/maps/arm-maps/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
