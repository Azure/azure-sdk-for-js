# @azure/arm-elasticsan client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-elasticsan in some common scenarios.

| **File Name**                                                                               | **Description**                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [elasticSansCreateSample.ts][elasticsanscreatesample]                                       | create ElasticSan. x-ms-original-file: 2025-09-01/ElasticSans_Create_MaximumSet_Gen.json                                                                                              |
| [elasticSansDeleteSample.ts][elasticsansdeletesample]                                       | delete a Elastic San. x-ms-original-file: 2025-09-01/ElasticSans_Delete_MaximumSet_Gen.json                                                                                           |
| [elasticSansGetSample.ts][elasticsansgetsample]                                             | get a ElasticSan. x-ms-original-file: 2025-09-01/ElasticSans_Get_MaximumSet_Gen.json                                                                                                  |
| [elasticSansListByResourceGroupSample.ts][elasticsanslistbyresourcegroupsample]             | gets a list of ElasticSan in a resource group. x-ms-original-file: 2025-09-01/ElasticSans_ListByResourceGroup_MaximumSet_Gen.json                                                     |
| [elasticSansListBySubscriptionSample.ts][elasticsanslistbysubscriptionsample]               | gets a list of ElasticSans in a subscription x-ms-original-file: 2025-09-01/ElasticSans_ListBySubscription_MaximumSet_Gen.json                                                        |
| [elasticSansUpdateSample.ts][elasticsansupdatesample]                                       | update a Elastic San. x-ms-original-file: 2025-09-01/ElasticSans_Update_MaximumSet_Gen.json                                                                                           |
| [operationsListSample.ts][operationslistsample]                                             | list the operations for the provider x-ms-original-file: 2025-09-01/Operations_List_MaximumSet_Gen.json                                                                               |
| [privateEndpointConnectionsCreateSample.ts][privateendpointconnectionscreatesample]         | update the state of specified private endpoint connection associated with the Elastic San x-ms-original-file: 2025-09-01/PrivateEndpointConnections_Create_MaximumSet_Gen.json        |
| [privateEndpointConnectionsDeleteSample.ts][privateendpointconnectionsdeletesample]         | deletes the specified private endpoint connection associated with the Elastic San x-ms-original-file: 2025-09-01/PrivateEndpointConnections_Delete_MaximumSet_Gen.json                |
| [privateEndpointConnectionsGetSample.ts][privateendpointconnectionsgetsample]               | gets the specified private endpoint connection associated with the Elastic San x-ms-original-file: 2025-09-01/PrivateEndpointConnections_Get_MaximumSet_Gen.json                      |
| [privateEndpointConnectionsListSample.ts][privateendpointconnectionslistsample]             | list all Private Endpoint Connections associated with the Elastic San. x-ms-original-file: 2025-09-01/PrivateEndpointConnections_List_MaximumSet_Gen.json                             |
| [privateLinkResourcesListByElasticSanSample.ts][privatelinkresourceslistbyelasticsansample] | gets the private link resources that need to be created for a elastic San. x-ms-original-file: 2025-09-01/PrivateLinkResources_ListByElasticSan_MaximumSet_Gen.json                   |
| [skusListSample.ts][skuslistsample]                                                         | list all the available Skus in the region and information related to them x-ms-original-file: 2025-09-01/Skus_List_MaximumSet_Gen.json                                                |
| [volumeGroupsCreateSample.ts][volumegroupscreatesample]                                     | create a Volume Group. x-ms-original-file: 2025-09-01/VolumeGroups_Create_MaximumSet_Gen.json                                                                                         |
| [volumeGroupsDeleteSample.ts][volumegroupsdeletesample]                                     | delete an VolumeGroup. x-ms-original-file: 2025-09-01/VolumeGroups_Delete_MaximumSet_Gen.json                                                                                         |
| [volumeGroupsGetSample.ts][volumegroupsgetsample]                                           | get an VolumeGroups. x-ms-original-file: 2025-09-01/VolumeGroups_Get_MaximumSet_Gen.json                                                                                              |
| [volumeGroupsListByElasticSanSample.ts][volumegroupslistbyelasticsansample]                 | list VolumeGroups. x-ms-original-file: 2025-09-01/VolumeGroups_ListByElasticSan_MaximumSet_Gen.json                                                                                   |
| [volumeGroupsUpdateSample.ts][volumegroupsupdatesample]                                     | update an VolumeGroup. x-ms-original-file: 2025-09-01/VolumeGroups_Update_MaximumSet_Gen.json                                                                                         |
| [volumeSnapshotsCreateSample.ts][volumesnapshotscreatesample]                               | create a Volume Snapshot. x-ms-original-file: 2025-09-01/VolumeSnapshots_Create_MaximumSet_Gen.json                                                                                   |
| [volumeSnapshotsDeleteSample.ts][volumesnapshotsdeletesample]                               | delete a Volume Snapshot. x-ms-original-file: 2025-09-01/VolumeSnapshots_Delete_MaximumSet_Gen.json                                                                                   |
| [volumeSnapshotsGetSample.ts][volumesnapshotsgetsample]                                     | get a Volume Snapshot. x-ms-original-file: 2025-09-01/VolumeSnapshots_Get_MaximumSet_Gen.json                                                                                         |
| [volumeSnapshotsListByVolumeGroupSample.ts][volumesnapshotslistbyvolumegroupsample]         | list Snapshots in a VolumeGroup or List Snapshots by Volume (name) in a VolumeGroup using filter x-ms-original-file: 2025-09-01/VolumeSnapshots_ListByVolumeGroup_MaximumSet_Gen.json |
| [volumesCreateSample.ts][volumescreatesample]                                               | create a Volume. x-ms-original-file: 2025-09-01/Volumes_Create_MaximumSet_Gen.json                                                                                                    |
| [volumesDeleteSample.ts][volumesdeletesample]                                               | delete an Volume. x-ms-original-file: 2025-09-01/Volumes_Delete_MaximumSet_Gen.json                                                                                                   |
| [volumesGetSample.ts][volumesgetsample]                                                     | get an Volume. x-ms-original-file: 2025-09-01/Volumes_Get_MaximumSet_Gen.json                                                                                                         |
| [volumesListByVolumeGroupSample.ts][volumeslistbyvolumegroupsample]                         | list Volumes in a VolumeGroup. x-ms-original-file: 2025-09-01/Volumes_ListByVolumeGroup_MaximumSet_Gen.json                                                                           |
| [volumesPreBackupSample.ts][volumesprebackupsample]                                         | validate whether a disk snapshot backup can be taken for list of volumes. x-ms-original-file: 2025-09-01/Volumes_PreBackup_MaximumSet_Gen.json                                        |
| [volumesPreRestoreSample.ts][volumesprerestoresample]                                       | validate whether a list of backed up disk snapshots can be restored into ElasticSan volumes. x-ms-original-file: 2025-09-01/Volumes_PreRestore_MaximumSet_Gen.json                    |
| [volumesUpdateSample.ts][volumesupdatesample]                                               | update an Volume. x-ms-original-file: 2025-09-01/Volumes_Update_MaximumSet_Gen.json                                                                                                   |

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
node dist/elasticSansCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/elasticSansCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[elasticsanscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/elasticSansCreateSample.ts
[elasticsansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/elasticSansDeleteSample.ts
[elasticsansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/elasticSansGetSample.ts
[elasticsanslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/elasticSansListByResourceGroupSample.ts
[elasticsanslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/elasticSansListBySubscriptionSample.ts
[elasticsansupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/elasticSansUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/operationsListSample.ts
[privateendpointconnectionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/privateEndpointConnectionsCreateSample.ts
[privateendpointconnectionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/privateEndpointConnectionsDeleteSample.ts
[privateendpointconnectionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/privateEndpointConnectionsGetSample.ts
[privateendpointconnectionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/privateEndpointConnectionsListSample.ts
[privatelinkresourceslistbyelasticsansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/privateLinkResourcesListByElasticSanSample.ts
[skuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/skusListSample.ts
[volumegroupscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumeGroupsCreateSample.ts
[volumegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumeGroupsDeleteSample.ts
[volumegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumeGroupsGetSample.ts
[volumegroupslistbyelasticsansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumeGroupsListByElasticSanSample.ts
[volumegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumeGroupsUpdateSample.ts
[volumesnapshotscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumeSnapshotsCreateSample.ts
[volumesnapshotsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumeSnapshotsDeleteSample.ts
[volumesnapshotsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumeSnapshotsGetSample.ts
[volumesnapshotslistbyvolumegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumeSnapshotsListByVolumeGroupSample.ts
[volumescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumesCreateSample.ts
[volumesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumesDeleteSample.ts
[volumesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumesGetSample.ts
[volumeslistbyvolumegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumesListByVolumeGroupSample.ts
[volumesprebackupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumesPreBackupSample.ts
[volumesprerestoresample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumesPreRestoreSample.ts
[volumesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v2/typescript/src/volumesUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-elasticsan?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/elasticsans/arm-elasticsan/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
