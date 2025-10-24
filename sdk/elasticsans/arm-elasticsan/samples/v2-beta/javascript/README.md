# @azure/arm-elasticsan client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-elasticsan in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [elasticSansCreateSample.js][elasticsanscreatesample]                                       | create ElasticSan. x-ms-original-file: 2024-07-01-preview/ElasticSans_Create_MaximumSet_Gen.json                                                                                                 |
| [elasticSansDeleteSample.js][elasticsansdeletesample]                                       | delete a Elastic San. x-ms-original-file: 2024-07-01-preview/ElasticSans_Delete_MaximumSet_Gen.json                                                                                              |
| [elasticSansGetSample.js][elasticsansgetsample]                                             | get a ElasticSan. x-ms-original-file: 2024-07-01-preview/ElasticSans_Get_MaximumSet_Gen.json                                                                                                     |
| [elasticSansListByResourceGroupSample.js][elasticsanslistbyresourcegroupsample]             | gets a list of ElasticSan in a resource group. x-ms-original-file: 2024-07-01-preview/ElasticSans_ListByResourceGroup_MaximumSet_Gen.json                                                        |
| [elasticSansListBySubscriptionSample.js][elasticsanslistbysubscriptionsample]               | gets a list of ElasticSans in a subscription x-ms-original-file: 2024-07-01-preview/ElasticSans_ListBySubscription_MaximumSet_Gen.json                                                           |
| [elasticSansUpdateSample.js][elasticsansupdatesample]                                       | update a Elastic San. x-ms-original-file: 2024-07-01-preview/ElasticSans_Update_MaximumSet_Gen.json                                                                                              |
| [operationsListSample.js][operationslistsample]                                             | list the operations for the provider x-ms-original-file: 2024-07-01-preview/Operations_List_MaximumSet_Gen.json                                                                                  |
| [privateEndpointConnectionsCreateSample.js][privateendpointconnectionscreatesample]         | update the state of specified private endpoint connection associated with the Elastic San x-ms-original-file: 2024-07-01-preview/PrivateEndpointConnections_Create_MaximumSet_Gen.json           |
| [privateEndpointConnectionsDeleteSample.js][privateendpointconnectionsdeletesample]         | deletes the specified private endpoint connection associated with the Elastic San x-ms-original-file: 2024-07-01-preview/PrivateEndpointConnections_Delete_MaximumSet_Gen.json                   |
| [privateEndpointConnectionsGetSample.js][privateendpointconnectionsgetsample]               | gets the specified private endpoint connection associated with the Elastic San x-ms-original-file: 2024-07-01-preview/PrivateEndpointConnections_Get_MaximumSet_Gen.json                         |
| [privateEndpointConnectionsListSample.js][privateendpointconnectionslistsample]             | list all Private Endpoint Connections associated with the Elastic San. x-ms-original-file: 2024-07-01-preview/PrivateEndpointConnections_List_MaximumSet_Gen.json                                |
| [privateLinkResourcesListByElasticSanSample.js][privatelinkresourceslistbyelasticsansample] | gets the private link resources that need to be created for a elastic San. x-ms-original-file: 2024-07-01-preview/PrivateLinkResources_ListByElasticSan_MaximumSet_Gen.json                      |
| [restoreVolumeSample.js][restorevolumesample]                                               | restore Soft Deleted Volumes. The volume name is obtained by using the API to list soft deleted volumes by volume group x-ms-original-file: 2024-07-01-preview/RestoreVolume_MaximumSet_Gen.json |
| [skusListSample.js][skuslistsample]                                                         | list all the available Skus in the region and information related to them x-ms-original-file: 2024-07-01-preview/Skus_List_MaximumSet_Gen.json                                                   |
| [volumeGroupsCreateSample.js][volumegroupscreatesample]                                     | create a Volume Group. x-ms-original-file: 2024-07-01-preview/VolumeGroups_Create_MaximumSet_Gen.json                                                                                            |
| [volumeGroupsDeleteSample.js][volumegroupsdeletesample]                                     | delete an VolumeGroup. x-ms-original-file: 2024-07-01-preview/VolumeGroups_Delete_MaximumSet_Gen.json                                                                                            |
| [volumeGroupsGetSample.js][volumegroupsgetsample]                                           | get an VolumeGroups. x-ms-original-file: 2024-07-01-preview/VolumeGroups_Get_MaximumSet_Gen.json                                                                                                 |
| [volumeGroupsListByElasticSanSample.js][volumegroupslistbyelasticsansample]                 | list VolumeGroups. x-ms-original-file: 2024-07-01-preview/VolumeGroups_ListByElasticSan_MaximumSet_Gen.json                                                                                      |
| [volumeGroupsUpdateSample.js][volumegroupsupdatesample]                                     | update an VolumeGroup. x-ms-original-file: 2024-07-01-preview/VolumeGroups_Update_MaximumSet_Gen.json                                                                                            |
| [volumeSnapshotsCreateSample.js][volumesnapshotscreatesample]                               | create a Volume Snapshot. x-ms-original-file: 2024-07-01-preview/VolumeSnapshots_Create_MaximumSet_Gen.json                                                                                      |
| [volumeSnapshotsDeleteSample.js][volumesnapshotsdeletesample]                               | delete a Volume Snapshot. x-ms-original-file: 2024-07-01-preview/VolumeSnapshots_Delete_MaximumSet_Gen.json                                                                                      |
| [volumeSnapshotsGetSample.js][volumesnapshotsgetsample]                                     | get a Volume Snapshot. x-ms-original-file: 2024-07-01-preview/VolumeSnapshots_Get_MaximumSet_Gen.json                                                                                            |
| [volumeSnapshotsListByVolumeGroupSample.js][volumesnapshotslistbyvolumegroupsample]         | list Snapshots in a VolumeGroup or List Snapshots by Volume (name) in a VolumeGroup using filter x-ms-original-file: 2024-07-01-preview/VolumeSnapshots_ListByVolumeGroup_MaximumSet_Gen.json    |
| [volumesCreateSample.js][volumescreatesample]                                               | create a Volume. x-ms-original-file: 2024-07-01-preview/Volumes_Create_MaximumSet_Gen.json                                                                                                       |
| [volumesDeleteSample.js][volumesdeletesample]                                               | delete an Volume. x-ms-original-file: 2024-07-01-preview/Volumes_Delete_MaximumSet_Gen.json                                                                                                      |
| [volumesGetSample.js][volumesgetsample]                                                     | get an Volume. x-ms-original-file: 2024-07-01-preview/Volumes_Get_MaximumSet_Gen.json                                                                                                            |
| [volumesListByVolumeGroupSample.js][volumeslistbyvolumegroupsample]                         | list Volumes in a VolumeGroup. x-ms-original-file: 2024-07-01-preview/Volumes_ListByVolumeGroup_MaximumSet_Gen.json                                                                              |
| [volumesPreBackupSample.js][volumesprebackupsample]                                         | validate whether a disk snapshot backup can be taken for list of volumes. x-ms-original-file: 2024-07-01-preview/Volumes_PreBackup_MaximumSet_Gen.json                                           |
| [volumesPreRestoreSample.js][volumesprerestoresample]                                       | validate whether a list of backed up disk snapshots can be restored into ElasticSan volumes. x-ms-original-file: 2024-07-01-preview/Volumes_PreRestore_MaximumSet_Gen.json                       |
| [volumesUpdateSample.js][volumesupdatesample]                                               | update an Volume. x-ms-original-file: 2024-07-01-preview/Volumes_Update_MaximumSet_Gen.json                                                                                                      |

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
node elasticSansCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node elasticSansCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[elasticsanscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/elasticSansCreateSample.js
[elasticsansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/elasticSansDeleteSample.js
[elasticsansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/elasticSansGetSample.js
[elasticsanslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/elasticSansListByResourceGroupSample.js
[elasticsanslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/elasticSansListBySubscriptionSample.js
[elasticsansupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/elasticSansUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/operationsListSample.js
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/privateEndpointConnectionsCreateSample.js
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/privateEndpointConnectionsDeleteSample.js
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/privateEndpointConnectionsGetSample.js
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/privateEndpointConnectionsListSample.js
[privatelinkresourceslistbyelasticsansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/privateLinkResourcesListByElasticSanSample.js
[restorevolumesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/restoreVolumeSample.js
[skuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/skusListSample.js
[volumegroupscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumeGroupsCreateSample.js
[volumegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumeGroupsDeleteSample.js
[volumegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumeGroupsGetSample.js
[volumegroupslistbyelasticsansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumeGroupsListByElasticSanSample.js
[volumegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumeGroupsUpdateSample.js
[volumesnapshotscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumeSnapshotsCreateSample.js
[volumesnapshotsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumeSnapshotsDeleteSample.js
[volumesnapshotsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumeSnapshotsGetSample.js
[volumesnapshotslistbyvolumegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumeSnapshotsListByVolumeGroupSample.js
[volumescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumesCreateSample.js
[volumesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumesDeleteSample.js
[volumesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumesGetSample.js
[volumeslistbyvolumegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumesListByVolumeGroupSample.js
[volumesprebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumesPreBackupSample.js
[volumesprerestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumesPreRestoreSample.js
[volumesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2-beta/javascript/volumesUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-elasticsan?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/elasticsans/arm-elasticsan/README.md
