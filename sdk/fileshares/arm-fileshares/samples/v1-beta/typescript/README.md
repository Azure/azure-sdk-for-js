# @azure/arm-fileshares client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-fileshares in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [fileShareSnapshotsCreateOrUpdateFileShareSnapshotSample.ts][filesharesnapshotscreateorupdatefilesharesnapshotsample]       | create a FileShareSnapshot. x-ms-original-file: 2026-06-01/FileShareSnapshot_CreateOrUpdate_MaximumSet_Gen.json                                                 |
| [fileShareSnapshotsDeleteFileShareSnapshotSample.ts][filesharesnapshotsdeletefilesharesnapshotsample]                       | delete a FileShareSnapshot. x-ms-original-file: 2026-06-01/FileShareSnapshot_Delete_MaximumSet_Gen.json                                                         |
| [fileShareSnapshotsGetFileShareSnapshotSample.ts][filesharesnapshotsgetfilesharesnapshotsample]                             | get a FileShareSnapshot x-ms-original-file: 2026-06-01/FileShareSnapshot_Get_MaximumSet_Gen.json                                                                |
| [fileShareSnapshotsListByFileShareSample.ts][filesharesnapshotslistbyfilesharesample]                                       | list FileShareSnapshot by FileShare. x-ms-original-file: 2026-06-01/FileShareSnapshot_List_MaximumSet_Gen.json                                                  |
| [fileShareSnapshotsUpdateFileShareSnapshotSample.ts][filesharesnapshotsupdatefilesharesnapshotsample]                       | update a FileShareSnapshot. x-ms-original-file: 2026-06-01/FileShareSnapshot_Update_MaximumSet_Gen.json                                                         |
| [fileSharesCheckNameAvailabilitySample.ts][fileshareschecknameavailabilitysample]                                           | implements local CheckNameAvailability operations x-ms-original-file: 2026-06-01/FileShares_CheckNameAvailability_MaximumSet_Gen.json                           |
| [fileSharesCreateOrUpdateSample.ts][filesharescreateorupdatesample]                                                         | create or update a file share. x-ms-original-file: 2026-06-01/FileShares_CreateOrUpdate_MaximumSet_Gen.json                                                     |
| [fileSharesDeleteSample.ts][filesharesdeletesample]                                                                         | delete a FileShare x-ms-original-file: 2026-06-01/FileShares_Delete_MaximumSet_Gen.json                                                                         |
| [fileSharesGetSample.ts][filesharesgetsample]                                                                               | get a FileShare x-ms-original-file: 2026-06-01/FileShares_Get_MaximumSet_Gen.json                                                                               |
| [fileSharesListByParentSample.ts][fileshareslistbyparentsample]                                                             | list FileShare resources by resource group x-ms-original-file: 2026-06-01/FileShares_ListByParent_MaximumSet_Gen.json                                           |
| [fileSharesListBySubscriptionSample.ts][fileshareslistbysubscriptionsample]                                                 | list FileShare resources by subscription ID x-ms-original-file: 2026-06-01/FileShares_ListBySubscription_MaximumSet_Gen.json                                    |
| [fileSharesUpdateSample.ts][filesharesupdatesample]                                                                         | update a FileShare x-ms-original-file: 2026-06-01/FileShares_Update_MaximumSet_Gen.json                                                                         |
| [informationalOperationsGetLimitsSample.ts][informationaloperationsgetlimitssample]                                         | get file shares limits. x-ms-original-file: 2026-06-01/FileShare_GetLimits_MaximumSet_Gen.json                                                                  |
| [informationalOperationsGetProvisioningRecommendationSample.ts][informationaloperationsgetprovisioningrecommendationsample] | get file shares provisioning parameters recommendation. x-ms-original-file: 2026-06-01/FileShare_GetProvisioningRecommendation_MaximumSet_Gen.json              |
| [informationalOperationsGetUsageDataSample.ts][informationaloperationsgetusagedatasample]                                   | get file shares usage data. x-ms-original-file: 2026-06-01/FileShare_GetUsageData_MaximumSet_Gen.json                                                           |
| [operationsListSample.ts][operationslistsample]                                                                             | list the operations for the provider x-ms-original-file: 2026-06-01/Operations_List_MaximumSet_Gen.json                                                         |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]                                         | update the state of specified private endpoint connection associated with the file share. x-ms-original-file: 2026-06-01/PrivateEndpointConnections_Create.json |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]                                         | deletes the specified private endpoint connection associated with the file share. x-ms-original-file: 2026-06-01/PrivateEndpointConnections_Delete.json         |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]                                               | gets the specified private endpoint connection associated with the file share. x-ms-original-file: 2026-06-01/PrivateEndpointConnections_Get.json               |
| [privateEndpointConnectionsListByFileShareSample.ts][privateendpointconnectionslistbyfilesharesample]                       | get a PrivateEndpointConnection List. x-ms-original-file: 2026-06-01/PrivateEndpointConnections_ListByFileShare.json                                            |
| [privateLinkResourcesGetSample.ts][privatelinkresourcesgetsample]                                                           | gets the private link resources that need to be created for a file share. x-ms-original-file: 2026-06-01/PrivateLinkResources_Get.json                          |
| [privateLinkResourcesListSample.ts][privatelinkresourceslistsample]                                                         | gets the private link resources that need to be created for a file share. x-ms-original-file: 2026-06-01/PrivateLinkResources_ListByFileShare.json              |

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
node dist/fileShareSnapshotsCreateOrUpdateFileShareSnapshotSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/fileShareSnapshotsCreateOrUpdateFileShareSnapshotSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[filesharesnapshotscreateorupdatefilesharesnapshotsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileShareSnapshotsCreateOrUpdateFileShareSnapshotSample.ts
[filesharesnapshotsdeletefilesharesnapshotsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileShareSnapshotsDeleteFileShareSnapshotSample.ts
[filesharesnapshotsgetfilesharesnapshotsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileShareSnapshotsGetFileShareSnapshotSample.ts
[filesharesnapshotslistbyfilesharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileShareSnapshotsListByFileShareSample.ts
[filesharesnapshotsupdatefilesharesnapshotsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileShareSnapshotsUpdateFileShareSnapshotSample.ts
[fileshareschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileSharesCheckNameAvailabilitySample.ts
[filesharescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileSharesCreateOrUpdateSample.ts
[filesharesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileSharesDeleteSample.ts
[filesharesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileSharesGetSample.ts
[fileshareslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileSharesListByParentSample.ts
[fileshareslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileSharesListBySubscriptionSample.ts
[filesharesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/fileSharesUpdateSample.ts
[informationaloperationsgetlimitssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/informationalOperationsGetLimitsSample.ts
[informationaloperationsgetprovisioningrecommendationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/informationalOperationsGetProvisioningRecommendationSample.ts
[informationaloperationsgetusagedatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/informationalOperationsGetUsageDataSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/operationsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistbyfilesharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/privateEndpointConnectionsListByFileShareSample.ts
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/privateLinkResourcesGetSample.ts
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/typescript/src/privateLinkResourcesListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-fileshares?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/fileshares/arm-fileshares/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
