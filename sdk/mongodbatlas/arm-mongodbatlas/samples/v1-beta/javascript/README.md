# @azure/arm-mongodbatlas client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-mongodbatlas in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                    |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [clustersCreateOrUpdateSample.js][clusterscreateorupdatesample]                     | create a Cluster x-ms-original-file: 2026-03-01-preview/Clusters_CreateOrUpdate_MaximumSet_Gen.json                                                |
| [clustersDeleteSample.js][clustersdeletesample]                                     | delete a Cluster x-ms-original-file: 2026-03-01-preview/Clusters_Delete_MaximumSet_Gen.json                                                        |
| [clustersGetSample.js][clustersgetsample]                                           | get a Cluster x-ms-original-file: 2026-03-01-preview/Clusters_Get_MaximumSet_Gen.json                                                              |
| [clustersListSample.js][clusterslistsample]                                         | list Cluster resources by Project x-ms-original-file: 2026-03-01-preview/Clusters_List_MaximumSet_Gen.json                                         |
| [operationsListSample.js][operationslistsample]                                     | list the operations for the provider x-ms-original-file: 2026-03-01-preview/Operations_List_MaximumSet_Gen.json                                    |
| [organizationsCreateOrUpdateSample.js][organizationscreateorupdatesample]           | create a OrganizationResource x-ms-original-file: 2026-03-01-preview/Organizations_CreateOrUpdate_MaximumSet_Gen.json                              |
| [organizationsDeleteSample.js][organizationsdeletesample]                           | delete a OrganizationResource x-ms-original-file: 2026-03-01-preview/Organizations_Delete_MaximumSet_Gen.json                                      |
| [organizationsGetSample.js][organizationsgetsample]                                 | get a OrganizationResource x-ms-original-file: 2026-03-01-preview/Organizations_Get_MaximumSet_Gen.json                                            |
| [organizationsListByResourceGroupSample.js][organizationslistbyresourcegroupsample] | list OrganizationResource resources by resource group x-ms-original-file: 2026-03-01-preview/Organizations_ListByResourceGroup_MaximumSet_Gen.json |
| [organizationsListBySubscriptionSample.js][organizationslistbysubscriptionsample]   | list OrganizationResource resources by subscription ID x-ms-original-file: 2026-03-01-preview/Organizations_ListBySubscription_MaximumSet_Gen.json |
| [organizationsUpdateSample.js][organizationsupdatesample]                           | update a OrganizationResource x-ms-original-file: 2026-03-01-preview/Organizations_Update_MaximumSet_Gen.json                                      |
| [projectsCreateOrUpdateSample.js][projectscreateorupdatesample]                     | create a Project x-ms-original-file: 2026-03-01-preview/Projects_CreateOrUpdate_MaximumSet_Gen.json                                                |
| [projectsDeleteSample.js][projectsdeletesample]                                     | delete a Project x-ms-original-file: 2026-03-01-preview/Projects_Delete_MaximumSet_Gen.json                                                        |
| [projectsGetSample.js][projectsgetsample]                                           | get a Project x-ms-original-file: 2026-03-01-preview/Projects_Get_MaximumSet_Gen.json                                                              |
| [projectsListClusterTierRegionsSample.js][projectslistclustertierregionssample]     | list available regions by cluster tier for the project. x-ms-original-file: 2026-03-01-preview/Projects_ListClusterTierRegions_MaximumSet_Gen.json |
| [projectsListSample.js][projectslistsample]                                         | list Project resources by OrganizationResource x-ms-original-file: 2026-03-01-preview/Projects_List_MaximumSet_Gen.json                            |
| [projectsTierLimitReachedSample.js][projectstierlimitreachedsample]                 | check if tier limit is reached for the project. x-ms-original-file: 2026-03-01-preview/Projects_TierLimitReached_MaximumSet_Gen.json               |

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
node clustersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node clustersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[clusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/clustersCreateOrUpdateSample.js
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/clustersDeleteSample.js
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/clustersGetSample.js
[clusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/clustersListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/operationsListSample.js
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/organizationsCreateOrUpdateSample.js
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/organizationsDeleteSample.js
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/organizationsGetSample.js
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/organizationsListByResourceGroupSample.js
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/organizationsListBySubscriptionSample.js
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/organizationsUpdateSample.js
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/projectsCreateOrUpdateSample.js
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/projectsDeleteSample.js
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/projectsGetSample.js
[projectslistclustertierregionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/projectsListClusterTierRegionsSample.js
[projectslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/projectsListSample.js
[projectstierlimitreachedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/javascript/projectsTierLimitReachedSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-mongodbatlas?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mongodbatlas/arm-mongodbatlas/README.md
