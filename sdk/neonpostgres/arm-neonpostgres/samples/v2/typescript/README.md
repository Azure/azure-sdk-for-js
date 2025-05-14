# @azure/arm-neonpostgres client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-neonpostgres in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [branchesCreateOrUpdateSample.ts][branchescreateorupdatesample]                     | create a Branch x-ms-original-file: 2025-03-01/Branches_CreateOrUpdate_MaximumSet_Gen.json                                                 |
| [branchesDeleteSample.ts][branchesdeletesample]                                     | delete a Branch x-ms-original-file: 2025-03-01/Branches_Delete_MaximumSet_Gen.json                                                         |
| [branchesGetSample.ts][branchesgetsample]                                           | get a Branch x-ms-original-file: 2025-03-01/Branches_Get_MaximumSet_Gen.json                                                               |
| [branchesListSample.ts][brancheslistsample]                                         | list Branch resources by Project x-ms-original-file: 2025-03-01/Branches_List_MaximumSet_Gen.json                                          |
| [computesListSample.ts][computeslistsample]                                         | list Compute resources by Branch x-ms-original-file: 2025-03-01/Computes_List_MaximumSet_Gen.json                                          |
| [endpointsListSample.ts][endpointslistsample]                                       | list Endpoint resources by Branch x-ms-original-file: 2025-03-01/Endpoints_List_MaximumSet_Gen.json                                        |
| [neonDatabasesListSample.ts][neondatabaseslistsample]                               | list NeonDatabase resources by Branch x-ms-original-file: 2025-03-01/NeonDatabases_List_MaximumSet_Gen.json                                |
| [neonRolesListSample.ts][neonroleslistsample]                                       | list NeonRole resources by Branch x-ms-original-file: 2025-03-01/NeonRoles_List_MaximumSet_Gen.json                                        |
| [operationsListSample.ts][operationslistsample]                                     | list the operations for the provider x-ms-original-file: 2025-03-01/Operations_List_MaximumSet_Gen.json                                    |
| [organizationsCreateOrUpdateSample.ts][organizationscreateorupdatesample]           | create a OrganizationResource x-ms-original-file: 2025-03-01/Organizations_CreateOrUpdate_MaximumSet_Gen.json                              |
| [organizationsDeleteSample.ts][organizationsdeletesample]                           | delete a OrganizationResource x-ms-original-file: 2025-03-01/Organizations_Delete_MaximumSet_Gen.json                                      |
| [organizationsGetPostgresVersionsSample.ts][organizationsgetpostgresversionssample] | action to retrieve the PostgreSQL versions. x-ms-original-file: 2025-03-01/Organizations_GetPostgresVersions_MaximumSet_Gen.json           |
| [organizationsGetSample.ts][organizationsgetsample]                                 | get a OrganizationResource x-ms-original-file: 2025-03-01/Organizations_Get_MaximumSet_Gen.json                                            |
| [organizationsListByResourceGroupSample.ts][organizationslistbyresourcegroupsample] | list OrganizationResource resources by resource group x-ms-original-file: 2025-03-01/Organizations_ListByResourceGroup_MaximumSet_Gen.json |
| [organizationsListBySubscriptionSample.ts][organizationslistbysubscriptionsample]   | list OrganizationResource resources by subscription ID x-ms-original-file: 2025-03-01/Organizations_ListBySubscription_MaximumSet_Gen.json |
| [organizationsUpdateSample.ts][organizationsupdatesample]                           | update a OrganizationResource x-ms-original-file: 2025-03-01/Organizations_Update_MaximumSet_Gen.json                                      |
| [projectsCreateOrUpdateSample.ts][projectscreateorupdatesample]                     | create a Project x-ms-original-file: 2025-03-01/Projects_CreateOrUpdate_MaximumSet_Gen.json                                                |
| [projectsDeleteSample.ts][projectsdeletesample]                                     | delete a Project x-ms-original-file: 2025-03-01/Projects_Delete_MaximumSet_Gen.json                                                        |
| [projectsGetConnectionUriSample.ts][projectsgetconnectionurisample]                 | action to retrieve the connection URI for the Neon Database. x-ms-original-file: 2025-03-01/Projects_GetConnectionUri_MaximumSet_Gen.json  |
| [projectsGetSample.ts][projectsgetsample]                                           | get a Project x-ms-original-file: 2025-03-01/Projects_Get_MaximumSet_Gen.json                                                              |
| [projectsListSample.ts][projectslistsample]                                         | list Project resources by OrganizationResource x-ms-original-file: 2025-03-01/Projects_List_MaximumSet_Gen.json                            |

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
node dist/branchesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/branchesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[branchescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/branchesCreateOrUpdateSample.ts
[branchesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/branchesDeleteSample.ts
[branchesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/branchesGetSample.ts
[brancheslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/branchesListSample.ts
[computeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/computesListSample.ts
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/endpointsListSample.ts
[neondatabaseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/neonDatabasesListSample.ts
[neonroleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/neonRolesListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/operationsListSample.ts
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/organizationsCreateOrUpdateSample.ts
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/organizationsDeleteSample.ts
[organizationsgetpostgresversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/organizationsGetPostgresVersionsSample.ts
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/organizationsGetSample.ts
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/organizationsListByResourceGroupSample.ts
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/organizationsListBySubscriptionSample.ts
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/organizationsUpdateSample.ts
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/projectsCreateOrUpdateSample.ts
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/projectsDeleteSample.ts
[projectsgetconnectionurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/projectsGetConnectionUriSample.ts
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/projectsGetSample.ts
[projectslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2/typescript/src/projectsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-neonpostgres?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/neonpostgres/arm-neonpostgres/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
