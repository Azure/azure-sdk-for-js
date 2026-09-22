# @azure/arm-mongodbatlas client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-mongodbatlas in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                    |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [clustersCreateOrUpdateSample.ts][clusterscreateorupdatesample]                     | create a Cluster x-ms-original-file: 2026-03-01-preview/Clusters_CreateOrUpdate_MaximumSet_Gen.json                                                |
| [clustersDeleteSample.ts][clustersdeletesample]                                     | delete a Cluster x-ms-original-file: 2026-03-01-preview/Clusters_Delete_MaximumSet_Gen.json                                                        |
| [clustersGetSample.ts][clustersgetsample]                                           | get a Cluster x-ms-original-file: 2026-03-01-preview/Clusters_Get_MaximumSet_Gen.json                                                              |
| [clustersListSample.ts][clusterslistsample]                                         | list Cluster resources by Project x-ms-original-file: 2026-03-01-preview/Clusters_List_MaximumSet_Gen.json                                         |
| [operationsListSample.ts][operationslistsample]                                     | list the operations for the provider x-ms-original-file: 2026-03-01-preview/Operations_List_MaximumSet_Gen.json                                    |
| [organizationsCreateOrUpdateSample.ts][organizationscreateorupdatesample]           | create a OrganizationResource x-ms-original-file: 2026-03-01-preview/Organizations_CreateOrUpdate_MaximumSet_Gen.json                              |
| [organizationsDeleteSample.ts][organizationsdeletesample]                           | delete a OrganizationResource x-ms-original-file: 2026-03-01-preview/Organizations_Delete_MaximumSet_Gen.json                                      |
| [organizationsGetSample.ts][organizationsgetsample]                                 | get a OrganizationResource x-ms-original-file: 2026-03-01-preview/Organizations_Get_MaximumSet_Gen.json                                            |
| [organizationsListByResourceGroupSample.ts][organizationslistbyresourcegroupsample] | list OrganizationResource resources by resource group x-ms-original-file: 2026-03-01-preview/Organizations_ListByResourceGroup_MaximumSet_Gen.json |
| [organizationsListBySubscriptionSample.ts][organizationslistbysubscriptionsample]   | list OrganizationResource resources by subscription ID x-ms-original-file: 2026-03-01-preview/Organizations_ListBySubscription_MaximumSet_Gen.json |
| [organizationsUpdateSample.ts][organizationsupdatesample]                           | update a OrganizationResource x-ms-original-file: 2026-03-01-preview/Organizations_Update_MaximumSet_Gen.json                                      |
| [projectsCreateOrUpdateSample.ts][projectscreateorupdatesample]                     | create a Project x-ms-original-file: 2026-03-01-preview/Projects_CreateOrUpdate_MaximumSet_Gen.json                                                |
| [projectsDeleteSample.ts][projectsdeletesample]                                     | delete a Project x-ms-original-file: 2026-03-01-preview/Projects_Delete_MaximumSet_Gen.json                                                        |
| [projectsGetSample.ts][projectsgetsample]                                           | get a Project x-ms-original-file: 2026-03-01-preview/Projects_Get_MaximumSet_Gen.json                                                              |
| [projectsListClusterTierRegionsSample.ts][projectslistclustertierregionssample]     | list available regions by cluster tier for the project. x-ms-original-file: 2026-03-01-preview/Projects_ListClusterTierRegions_MaximumSet_Gen.json |
| [projectsListSample.ts][projectslistsample]                                         | list Project resources by OrganizationResource x-ms-original-file: 2026-03-01-preview/Projects_List_MaximumSet_Gen.json                            |
| [projectsTierLimitReachedSample.ts][projectstierlimitreachedsample]                 | check if tier limit is reached for the project. x-ms-original-file: 2026-03-01-preview/Projects_TierLimitReached_MaximumSet_Gen.json               |

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
node dist/clustersCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/clustersCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[clusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/clustersCreateOrUpdateSample.ts
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/clustersDeleteSample.ts
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/clustersGetSample.ts
[clusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/clustersListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/operationsListSample.ts
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/organizationsCreateOrUpdateSample.ts
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/organizationsDeleteSample.ts
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/organizationsGetSample.ts
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/organizationsListByResourceGroupSample.ts
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/organizationsListBySubscriptionSample.ts
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/organizationsUpdateSample.ts
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/projectsCreateOrUpdateSample.ts
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/projectsDeleteSample.ts
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/projectsGetSample.ts
[projectslistclustertierregionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/projectsListClusterTierRegionsSample.ts
[projectslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/projectsListSample.ts
[projectstierlimitreachedsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/mongodbatlas/arm-mongodbatlas/samples/v1-beta/typescript/src/projectsTierLimitReachedSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-mongodbatlas?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/mongodbatlas/arm-mongodbatlas/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
