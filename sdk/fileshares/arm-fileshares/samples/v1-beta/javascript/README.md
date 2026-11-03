# @azure/arm-fileshares client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-fileshares in some common scenarios.

| **File Name**                                                                                                               | **Description**                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [fileShareSnapshotsCreateOrUpdateFileShareSnapshotSample.js][filesharesnapshotscreateorupdatefilesharesnapshotsample]       | create a FileShareSnapshot. x-ms-original-file: 2026-06-01/FileShareSnapshot_CreateOrUpdate_MaximumSet_Gen.json                                                 |
| [fileShareSnapshotsDeleteFileShareSnapshotSample.js][filesharesnapshotsdeletefilesharesnapshotsample]                       | delete a FileShareSnapshot. x-ms-original-file: 2026-06-01/FileShareSnapshot_Delete_MaximumSet_Gen.json                                                         |
| [fileShareSnapshotsGetFileShareSnapshotSample.js][filesharesnapshotsgetfilesharesnapshotsample]                             | get a FileShareSnapshot x-ms-original-file: 2026-06-01/FileShareSnapshot_Get_MaximumSet_Gen.json                                                                |
| [fileShareSnapshotsListByFileShareSample.js][filesharesnapshotslistbyfilesharesample]                                       | list FileShareSnapshot by FileShare. x-ms-original-file: 2026-06-01/FileShareSnapshot_List_MaximumSet_Gen.json                                                  |
| [fileShareSnapshotsUpdateFileShareSnapshotSample.js][filesharesnapshotsupdatefilesharesnapshotsample]                       | update a FileShareSnapshot. x-ms-original-file: 2026-06-01/FileShareSnapshot_Update_MaximumSet_Gen.json                                                         |
| [fileSharesCheckNameAvailabilitySample.js][fileshareschecknameavailabilitysample]                                           | implements local CheckNameAvailability operations x-ms-original-file: 2026-06-01/FileShares_CheckNameAvailability_MaximumSet_Gen.json                           |
| [fileSharesCreateOrUpdateSample.js][filesharescreateorupdatesample]                                                         | create or update a file share. x-ms-original-file: 2026-06-01/FileShares_CreateOrUpdate_MaximumSet_Gen.json                                                     |
| [fileSharesDeleteSample.js][filesharesdeletesample]                                                                         | delete a FileShare x-ms-original-file: 2026-06-01/FileShares_Delete_MaximumSet_Gen.json                                                                         |
| [fileSharesGetSample.js][filesharesgetsample]                                                                               | get a FileShare x-ms-original-file: 2026-06-01/FileShares_Get_MaximumSet_Gen.json                                                                               |
| [fileSharesListByParentSample.js][fileshareslistbyparentsample]                                                             | list FileShare resources by resource group x-ms-original-file: 2026-06-01/FileShares_ListByParent_MaximumSet_Gen.json                                           |
| [fileSharesListBySubscriptionSample.js][fileshareslistbysubscriptionsample]                                                 | list FileShare resources by subscription ID x-ms-original-file: 2026-06-01/FileShares_ListBySubscription_MaximumSet_Gen.json                                    |
| [fileSharesUpdateSample.js][filesharesupdatesample]                                                                         | update a FileShare x-ms-original-file: 2026-06-01/FileShares_Update_MaximumSet_Gen.json                                                                         |
| [informationalOperationsGetLimitsSample.js][informationaloperationsgetlimitssample]                                         | get file shares limits. x-ms-original-file: 2026-06-01/FileShare_GetLimits_MaximumSet_Gen.json                                                                  |
| [informationalOperationsGetProvisioningRecommendationSample.js][informationaloperationsgetprovisioningrecommendationsample] | get file shares provisioning parameters recommendation. x-ms-original-file: 2026-06-01/FileShare_GetProvisioningRecommendation_MaximumSet_Gen.json              |
| [informationalOperationsGetUsageDataSample.js][informationaloperationsgetusagedatasample]                                   | get file shares usage data. x-ms-original-file: 2026-06-01/FileShare_GetUsageData_MaximumSet_Gen.json                                                           |
| [operationsListSample.js][operationslistsample]                                                                             | list the operations for the provider x-ms-original-file: 2026-06-01/Operations_List_MaximumSet_Gen.json                                                         |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]                                         | update the state of specified private endpoint connection associated with the file share. x-ms-original-file: 2026-06-01/PrivateEndpointConnections_Create.json |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]                                         | deletes the specified private endpoint connection associated with the file share. x-ms-original-file: 2026-06-01/PrivateEndpointConnections_Delete.json         |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]                                               | gets the specified private endpoint connection associated with the file share. x-ms-original-file: 2026-06-01/PrivateEndpointConnections_Get.json               |
| [privateEndpointConnectionsListByFileShareSample.js][privateendpointconnectionslistbyfilesharesample]                       | get a PrivateEndpointConnection List. x-ms-original-file: 2026-06-01/PrivateEndpointConnections_ListByFileShare.json                                            |
| [privateLinkResourcesGetSample.js][privatelinkresourcesgetsample]                                                           | gets the private link resources that need to be created for a file share. x-ms-original-file: 2026-06-01/PrivateLinkResources_Get.json                          |
| [privateLinkResourcesListSample.js][privatelinkresourceslistsample]                                                         | gets the private link resources that need to be created for a file share. x-ms-original-file: 2026-06-01/PrivateLinkResources_ListByFileShare.json              |

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
node fileShareSnapshotsCreateOrUpdateFileShareSnapshotSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node fileShareSnapshotsCreateOrUpdateFileShareSnapshotSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[filesharesnapshotscreateorupdatefilesharesnapshotsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileShareSnapshotsCreateOrUpdateFileShareSnapshotSample.js
[filesharesnapshotsdeletefilesharesnapshotsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileShareSnapshotsDeleteFileShareSnapshotSample.js
[filesharesnapshotsgetfilesharesnapshotsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileShareSnapshotsGetFileShareSnapshotSample.js
[filesharesnapshotslistbyfilesharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileShareSnapshotsListByFileShareSample.js
[filesharesnapshotsupdatefilesharesnapshotsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileShareSnapshotsUpdateFileShareSnapshotSample.js
[fileshareschecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileSharesCheckNameAvailabilitySample.js
[filesharescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileSharesCreateOrUpdateSample.js
[filesharesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileSharesDeleteSample.js
[filesharesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileSharesGetSample.js
[fileshareslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileSharesListByParentSample.js
[fileshareslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileSharesListBySubscriptionSample.js
[filesharesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/fileSharesUpdateSample.js
[informationaloperationsgetlimitssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/informationalOperationsGetLimitsSample.js
[informationaloperationsgetprovisioningrecommendationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/informationalOperationsGetProvisioningRecommendationSample.js
[informationaloperationsgetusagedatasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/informationalOperationsGetUsageDataSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/operationsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistbyfilesharesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/privateEndpointConnectionsListByFileShareSample.js
[privatelinkresourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/privateLinkResourcesGetSample.js
[privatelinkresourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/fileshares/arm-fileshares/samples/v1-beta/javascript/privateLinkResourcesListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-fileshares?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/fileshares/arm-fileshares/README.md
