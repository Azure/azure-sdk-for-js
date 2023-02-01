# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [elasticSansCreateSample.js][elasticsanscreatesample]                           | Create ElasticSan. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/ElasticSans_Create_MaximumSet_Gen.json                                               |
| [elasticSansDeleteSample.js][elasticsansdeletesample]                           | Delete a Elastic San. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/ElasticSans_Delete_MaximumSet_Gen.json                                            |
| [elasticSansGetSample.js][elasticsansgetsample]                                 | Get a ElasticSan. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/ElasticSans_Get_MaximumSet_Gen.json                                                   |
| [elasticSansListByResourceGroupSample.js][elasticsanslistbyresourcegroupsample] | Gets a list of ElasticSan in a resource group. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/ElasticSans_ListByResourceGroup_MaximumSet_Gen.json      |
| [elasticSansListBySubscriptionSample.js][elasticsanslistbysubscriptionsample]   | Gets a list of ElasticSans in a subscription x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/ElasticSans_ListBySubscription_MaximumSet_Gen.json         |
| [elasticSansUpdateSample.js][elasticsansupdatesample]                           | Update a Elastic San. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/ElasticSans_Update_MaximumSet_Gen.json                                            |
| [operationsListSample.js][operationslistsample]                                 | Gets a list of ElasticSan operations. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/Operations_List_MaximumSet_Gen.json                               |
| [skusListSample.js][skuslistsample]                                             | List all the available Skus in the region and information related to them x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/Skus_List_MaximumSet_Gen.json |
| [volumeGroupsCreateSample.js][volumegroupscreatesample]                         | Create a Volume Group. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/VolumeGroups_Create_MaximumSet_Gen.json                                          |
| [volumeGroupsDeleteSample.js][volumegroupsdeletesample]                         | Delete an VolumeGroup. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/VolumeGroups_Delete_MaximumSet_Gen.json                                          |
| [volumeGroupsGetSample.js][volumegroupsgetsample]                               | Get an VolumeGroups. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/VolumeGroups_Get_MaximumSet_Gen.json                                               |
| [volumeGroupsListByElasticSanSample.js][volumegroupslistbyelasticsansample]     | List VolumeGroups. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/VolumeGroups_ListByElasticSan_MaximumSet_Gen.json                                    |
| [volumeGroupsUpdateSample.js][volumegroupsupdatesample]                         | Update an VolumeGroup. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/VolumeGroups_Update_MaximumSet_Gen.json                                          |
| [volumesCreateSample.js][volumescreatesample]                                   | Create a Volume. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/Volumes_Create_MaximumSet_Gen.json                                                     |
| [volumesDeleteSample.js][volumesdeletesample]                                   | Delete an Volume. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/Volumes_Delete_MaximumSet_Gen.json                                                    |
| [volumesGetSample.js][volumesgetsample]                                         | Get an Volume. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/Volumes_Get_MaximumSet_Gen.json                                                          |
| [volumesListByVolumeGroupSample.js][volumeslistbyvolumegroupsample]             | List Volumes in a VolumeGroup. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/Volumes_ListByVolumeGroup_MaximumSet_Gen.json                            |
| [volumesUpdateSample.js][volumesupdatesample]                                   | Update an Volume. x-ms-original-file: specification/elasticsan/resource-manager/Microsoft.ElasticSan/preview/2021-11-20-preview/examples/Volumes_Update_MaximumSet_Gen.json                                                    |

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
npx cross-env ELASTICSANS_SUBSCRIPTION_ID="<elasticsans subscription id>" ELASTICSANS_RESOURCE_GROUP="<elasticsans resource group>" ELASTICSANS_SUBSCRIPTION_ID="<elasticsans subscription id>" ELASTICSANS_RESOURCE_GROUP="<elasticsans resource group>" node elasticSansCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[elasticsanscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/elasticSansCreateSample.js
[elasticsansdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/elasticSansDeleteSample.js
[elasticsansgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/elasticSansGetSample.js
[elasticsanslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/elasticSansListByResourceGroupSample.js
[elasticsanslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/elasticSansListBySubscriptionSample.js
[elasticsansupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/elasticSansUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/operationsListSample.js
[skuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/skusListSample.js
[volumegroupscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumeGroupsCreateSample.js
[volumegroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumeGroupsDeleteSample.js
[volumegroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumeGroupsGetSample.js
[volumegroupslistbyelasticsansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumeGroupsListByElasticSanSample.js
[volumegroupsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumeGroupsUpdateSample.js
[volumescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumesCreateSample.js
[volumesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumesDeleteSample.js
[volumesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumesGetSample.js
[volumeslistbyvolumegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumesListByVolumeGroupSample.js
[volumesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/elasticsans/arm-elasticsan/samples/v1-beta/javascript/volumesUpdateSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-elasticsan?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/elasticsans/arm-elasticsan/README.md
