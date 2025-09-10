# @azure/arm-neonpostgres client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-neonpostgres in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                    |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [branchesCreateOrUpdateSample.js][branchescreateorupdatesample]                     | create a Branch x-ms-original-file: 2025-06-23-preview/Branches_CreateOrUpdate_MaximumSet_Gen.json                                                 |
| [branchesDeleteSample.js][branchesdeletesample]                                     | delete a Branch x-ms-original-file: 2025-06-23-preview/Branches_Delete_MaximumSet_Gen.json                                                         |
| [branchesGetSample.js][branchesgetsample]                                           | get a Branch x-ms-original-file: 2025-06-23-preview/Branches_Get_MaximumSet_Gen.json                                                               |
| [branchesListSample.js][brancheslistsample]                                         | list Branch resources by Project x-ms-original-file: 2025-06-23-preview/Branches_List_MaximumSet_Gen.json                                          |
| [branchesPreflightSample.js][branchespreflightsample]                               | action to validate preflight checks. x-ms-original-file: 2025-06-23-preview/Branches_Preflight_Database_Gen.json                                   |
| [computesListSample.js][computeslistsample]                                         | list Compute resources by Branch x-ms-original-file: 2025-06-23-preview/Computes_List_MaximumSet_Gen.json                                          |
| [endpointsCreateOrUpdateSample.js][endpointscreateorupdatesample]                   | create a Endpoint x-ms-original-file: 2025-06-23-preview/Endpoints_CreateOrUpdate_MaximumSet_Gen.json                                              |
| [endpointsDeleteSample.js][endpointsdeletesample]                                   | delete a Endpoint x-ms-original-file: 2025-06-23-preview/Endpoints_Delete_MaximumSet_Gen.json                                                      |
| [endpointsListSample.js][endpointslistsample]                                       | list Endpoint resources by Branch x-ms-original-file: 2025-06-23-preview/Endpoints_List_MaximumSet_Gen.json                                        |
| [neonDatabasesCreateOrUpdateSample.js][neondatabasescreateorupdatesample]           | create a NeonDatabase x-ms-original-file: 2025-06-23-preview/NeonDatabases_CreateOrUpdate_MaximumSet_Gen.json                                      |
| [neonDatabasesDeleteSample.js][neondatabasesdeletesample]                           | delete a NeonDatabase x-ms-original-file: 2025-06-23-preview/NeonDatabases_Delete_MaximumSet_Gen.json                                              |
| [neonDatabasesListSample.js][neondatabaseslistsample]                               | list NeonDatabase resources by Branch x-ms-original-file: 2025-06-23-preview/NeonDatabases_List_MaximumSet_Gen.json                                |
| [neonRolesCreateOrUpdateSample.js][neonrolescreateorupdatesample]                   | create a NeonRole x-ms-original-file: 2025-06-23-preview/NeonRoles_CreateOrUpdate_MaximumSet_Gen.json                                              |
| [neonRolesDeleteSample.js][neonrolesdeletesample]                                   | delete a NeonRole x-ms-original-file: 2025-06-23-preview/NeonRoles_Delete_MaximumSet_Gen.json                                                      |
| [neonRolesListSample.js][neonroleslistsample]                                       | list NeonRole resources by Branch x-ms-original-file: 2025-06-23-preview/NeonRoles_List_MaximumSet_Gen.json                                        |
| [operationsListSample.js][operationslistsample]                                     | list the operations for the provider x-ms-original-file: 2025-06-23-preview/Operations_List_MaximumSet_Gen.json                                    |
| [organizationsCreateOrUpdateSample.js][organizationscreateorupdatesample]           | create a OrganizationResource x-ms-original-file: 2025-06-23-preview/Organizations_CreateOrUpdate_MaximumSet_Gen.json                              |
| [organizationsDeleteSample.js][organizationsdeletesample]                           | delete a OrganizationResource x-ms-original-file: 2025-06-23-preview/Organizations_Delete_MaximumSet_Gen.json                                      |
| [organizationsGetPostgresVersionsSample.js][organizationsgetpostgresversionssample] | action to retrieve the PostgreSQL versions. x-ms-original-file: 2025-06-23-preview/Organizations_GetPostgresVersions_MaximumSet_Gen.json           |
| [organizationsGetSample.js][organizationsgetsample]                                 | get a OrganizationResource x-ms-original-file: 2025-06-23-preview/Organizations_Get_MaximumSet_Gen.json                                            |
| [organizationsListByResourceGroupSample.js][organizationslistbyresourcegroupsample] | list OrganizationResource resources by resource group x-ms-original-file: 2025-06-23-preview/Organizations_ListByResourceGroup_MaximumSet_Gen.json |
| [organizationsListBySubscriptionSample.js][organizationslistbysubscriptionsample]   | list OrganizationResource resources by subscription ID x-ms-original-file: 2025-06-23-preview/Organizations_ListBySubscription_MaximumSet_Gen.json |
| [organizationsUpdateSample.js][organizationsupdatesample]                           | update a OrganizationResource x-ms-original-file: 2025-06-23-preview/Organizations_Update_MaximumSet_Gen.json                                      |
| [projectsCreateOrUpdateSample.js][projectscreateorupdatesample]                     | create a Project x-ms-original-file: 2025-06-23-preview/Projects_CreateOrUpdate_MaximumSet_Gen.json                                                |
| [projectsDeleteSample.js][projectsdeletesample]                                     | delete a Project x-ms-original-file: 2025-06-23-preview/Projects_Delete_MaximumSet_Gen.json                                                        |
| [projectsGetConnectionUriSample.js][projectsgetconnectionurisample]                 | action to retrieve the connection URI for the Neon Database. x-ms-original-file: 2025-06-23-preview/Projects_GetConnectionUri_MaximumSet_Gen.json  |
| [projectsGetSample.js][projectsgetsample]                                           | get a Project x-ms-original-file: 2025-06-23-preview/Projects_Get_MaximumSet_Gen.json                                                              |
| [projectsListSample.js][projectslistsample]                                         | list Project resources by OrganizationResource x-ms-original-file: 2025-06-23-preview/Projects_List_MaximumSet_Gen.json                            |

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
node branchesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node branchesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[branchescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/branchesCreateOrUpdateSample.js
[branchesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/branchesDeleteSample.js
[branchesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/branchesGetSample.js
[brancheslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/branchesListSample.js
[branchespreflightsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/branchesPreflightSample.js
[computeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/computesListSample.js
[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/endpointsCreateOrUpdateSample.js
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/endpointsDeleteSample.js
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/endpointsListSample.js
[neondatabasescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/neonDatabasesCreateOrUpdateSample.js
[neondatabasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/neonDatabasesDeleteSample.js
[neondatabaseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/neonDatabasesListSample.js
[neonrolescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/neonRolesCreateOrUpdateSample.js
[neonrolesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/neonRolesDeleteSample.js
[neonroleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/neonRolesListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/operationsListSample.js
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/organizationsCreateOrUpdateSample.js
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/organizationsDeleteSample.js
[organizationsgetpostgresversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/organizationsGetPostgresVersionsSample.js
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/organizationsGetSample.js
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/organizationsListByResourceGroupSample.js
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/organizationsListBySubscriptionSample.js
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/organizationsUpdateSample.js
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/projectsCreateOrUpdateSample.js
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/projectsDeleteSample.js
[projectsgetconnectionurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/projectsGetConnectionUriSample.js
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/projectsGetSample.js
[projectslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v2-beta/javascript/projectsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-neonpostgres?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/neonpostgres/arm-neonpostgres/README.md
