# @azure/arm-neonpostgres client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-neonpostgres in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [branchesCreateOrUpdateSample.js][branchescreateorupdatesample]                     | create a Branch x-ms-original-file: 2025-03-01/Branches_CreateOrUpdate_MaximumSet_Gen.json                                                 |
| [branchesDeleteSample.js][branchesdeletesample]                                     | delete a Branch x-ms-original-file: 2025-03-01/Branches_Delete_MaximumSet_Gen.json                                                         |
| [branchesGetSample.js][branchesgetsample]                                           | get a Branch x-ms-original-file: 2025-03-01/Branches_Get_MaximumSet_Gen.json                                                               |
| [branchesListSample.js][brancheslistsample]                                         | list Branch resources by Project x-ms-original-file: 2025-03-01/Branches_List_MaximumSet_Gen.json                                          |
| [branchesUpdateSample.js][branchesupdatesample]                                     | update a Branch x-ms-original-file: 2025-03-01/Branches_Update_MaximumSet_Gen.json                                                         |
| [computesCreateOrUpdateSample.js][computescreateorupdatesample]                     | create a Compute x-ms-original-file: 2025-03-01/Computes_CreateOrUpdate_MaximumSet_Gen.json                                                |
| [computesDeleteSample.js][computesdeletesample]                                     | delete a Compute x-ms-original-file: 2025-03-01/Computes_Delete_MaximumSet_Gen.json                                                        |
| [computesGetSample.js][computesgetsample]                                           | get a Compute x-ms-original-file: 2025-03-01/Computes_Get_MaximumSet_Gen.json                                                              |
| [computesListSample.js][computeslistsample]                                         | list Compute resources by Branch x-ms-original-file: 2025-03-01/Computes_List_MaximumSet_Gen.json                                          |
| [computesUpdateSample.js][computesupdatesample]                                     | update a Compute x-ms-original-file: 2025-03-01/Computes_Update_MaximumSet_Gen.json                                                        |
| [endpointsCreateOrUpdateSample.js][endpointscreateorupdatesample]                   | create a Endpoint x-ms-original-file: 2025-03-01/Endpoints_CreateOrUpdate_MaximumSet_Gen.json                                              |
| [endpointsDeleteSample.js][endpointsdeletesample]                                   | delete a Endpoint x-ms-original-file: 2025-03-01/Endpoints_Delete_MaximumSet_Gen.json                                                      |
| [endpointsGetSample.js][endpointsgetsample]                                         | get a Endpoint x-ms-original-file: 2025-03-01/Endpoints_Get_MaximumSet_Gen.json                                                            |
| [endpointsListSample.js][endpointslistsample]                                       | list Endpoint resources by Branch x-ms-original-file: 2025-03-01/Endpoints_List_MaximumSet_Gen.json                                        |
| [endpointsUpdateSample.js][endpointsupdatesample]                                   | update a Endpoint x-ms-original-file: 2025-03-01/Endpoints_Update_MaximumSet_Gen.json                                                      |
| [neonDatabasesCreateOrUpdateSample.js][neondatabasescreateorupdatesample]           | create a NeonDatabase x-ms-original-file: 2025-03-01/NeonDatabases_CreateOrUpdate_MaximumSet_Gen.json                                      |
| [neonDatabasesDeleteSample.js][neondatabasesdeletesample]                           | delete a NeonDatabase x-ms-original-file: 2025-03-01/NeonDatabases_Delete_MaximumSet_Gen.json                                              |
| [neonDatabasesGetSample.js][neondatabasesgetsample]                                 | get a NeonDatabase x-ms-original-file: 2025-03-01/NeonDatabases_Get_MaximumSet_Gen.json                                                    |
| [neonDatabasesListSample.js][neondatabaseslistsample]                               | list NeonDatabase resources by Branch x-ms-original-file: 2025-03-01/NeonDatabases_List_MaximumSet_Gen.json                                |
| [neonDatabasesUpdateSample.js][neondatabasesupdatesample]                           | update a NeonDatabase x-ms-original-file: 2025-03-01/NeonDatabases_Update_MaximumSet_Gen.json                                              |
| [neonRolesCreateOrUpdateSample.js][neonrolescreateorupdatesample]                   | create a NeonRole x-ms-original-file: 2025-03-01/NeonRoles_CreateOrUpdate_MaximumSet_Gen.json                                              |
| [neonRolesDeleteSample.js][neonrolesdeletesample]                                   | delete a NeonRole x-ms-original-file: 2025-03-01/NeonRoles_Delete_MaximumSet_Gen.json                                                      |
| [neonRolesGetSample.js][neonrolesgetsample]                                         | get a NeonRole x-ms-original-file: 2025-03-01/NeonRoles_Get_MaximumSet_Gen.json                                                            |
| [neonRolesListSample.js][neonroleslistsample]                                       | list NeonRole resources by Branch x-ms-original-file: 2025-03-01/NeonRoles_List_MaximumSet_Gen.json                                        |
| [neonRolesUpdateSample.js][neonrolesupdatesample]                                   | update a NeonRole x-ms-original-file: 2025-03-01/NeonRoles_Update_MaximumSet_Gen.json                                                      |
| [operationsListSample.js][operationslistsample]                                     | list the operations for the provider x-ms-original-file: 2025-03-01/Operations_List_MaximumSet_Gen.json                                    |
| [organizationsCreateOrUpdateSample.js][organizationscreateorupdatesample]           | create a OrganizationResource x-ms-original-file: 2025-03-01/Organizations_CreateOrUpdate_MaximumSet_Gen.json                              |
| [organizationsDeleteSample.js][organizationsdeletesample]                           | delete a OrganizationResource x-ms-original-file: 2025-03-01/Organizations_Delete_MaximumSet_Gen.json                                      |
| [organizationsGetPostgresVersionsSample.js][organizationsgetpostgresversionssample] | action to retrieve the PostgreSQL versions. x-ms-original-file: 2025-03-01/Organizations_GetPostgresVersions_MaximumSet_Gen.json           |
| [organizationsGetSample.js][organizationsgetsample]                                 | get a OrganizationResource x-ms-original-file: 2025-03-01/Organizations_Get_MaximumSet_Gen.json                                            |
| [organizationsListByResourceGroupSample.js][organizationslistbyresourcegroupsample] | list OrganizationResource resources by resource group x-ms-original-file: 2025-03-01/Organizations_ListByResourceGroup_MaximumSet_Gen.json |
| [organizationsListBySubscriptionSample.js][organizationslistbysubscriptionsample]   | list OrganizationResource resources by subscription ID x-ms-original-file: 2025-03-01/Organizations_ListBySubscription_MaximumSet_Gen.json |
| [organizationsUpdateSample.js][organizationsupdatesample]                           | update a OrganizationResource x-ms-original-file: 2025-03-01/Organizations_Update_MaximumSet_Gen.json                                      |
| [projectsCreateOrUpdateSample.js][projectscreateorupdatesample]                     | create a Project x-ms-original-file: 2025-03-01/Projects_CreateOrUpdate_MaximumSet_Gen.json                                                |
| [projectsDeleteSample.js][projectsdeletesample]                                     | delete a Project x-ms-original-file: 2025-03-01/Projects_Delete_MaximumSet_Gen.json                                                        |
| [projectsGetConnectionUriSample.js][projectsgetconnectionurisample]                 | action to retrieve the connection URI for the Neon Database. x-ms-original-file: 2025-03-01/Projects_GetConnectionUri_MaximumSet_Gen.json  |
| [projectsGetSample.js][projectsgetsample]                                           | get a Project x-ms-original-file: 2025-03-01/Projects_Get_MaximumSet_Gen.json                                                              |
| [projectsListSample.js][projectslistsample]                                         | list Project resources by OrganizationResource x-ms-original-file: 2025-03-01/Projects_List_MaximumSet_Gen.json                            |
| [projectsUpdateSample.js][projectsupdatesample]                                     | update a Project x-ms-original-file: 2025-03-01/Projects_Update_MaximumSet_Gen.json                                                        |

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
cross-env node branchesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[branchescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/branchesCreateOrUpdateSample.js
[branchesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/branchesDeleteSample.js
[branchesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/branchesGetSample.js
[brancheslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/branchesListSample.js
[branchesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/branchesUpdateSample.js
[computescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/computesCreateOrUpdateSample.js
[computesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/computesDeleteSample.js
[computesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/computesGetSample.js
[computeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/computesListSample.js
[computesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/computesUpdateSample.js
[endpointscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/endpointsCreateOrUpdateSample.js
[endpointsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/endpointsDeleteSample.js
[endpointsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/endpointsGetSample.js
[endpointslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/endpointsListSample.js
[endpointsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/endpointsUpdateSample.js
[neondatabasescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonDatabasesCreateOrUpdateSample.js
[neondatabasesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonDatabasesDeleteSample.js
[neondatabasesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonDatabasesGetSample.js
[neondatabaseslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonDatabasesListSample.js
[neondatabasesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonDatabasesUpdateSample.js
[neonrolescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonRolesCreateOrUpdateSample.js
[neonrolesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonRolesDeleteSample.js
[neonrolesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonRolesGetSample.js
[neonroleslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonRolesListSample.js
[neonrolesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/neonRolesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/operationsListSample.js
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/organizationsCreateOrUpdateSample.js
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/organizationsDeleteSample.js
[organizationsgetpostgresversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/organizationsGetPostgresVersionsSample.js
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/organizationsGetSample.js
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/organizationsListByResourceGroupSample.js
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/organizationsListBySubscriptionSample.js
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/organizationsUpdateSample.js
[projectscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/projectsCreateOrUpdateSample.js
[projectsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/projectsDeleteSample.js
[projectsgetconnectionurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/projectsGetConnectionUriSample.js
[projectsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/projectsGetSample.js
[projectslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/projectsListSample.js
[projectsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/neonpostgres/arm-neonpostgres/samples/v1/javascript/projectsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-neonpostgres?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/neonpostgres/arm-neonpostgres/README.md
