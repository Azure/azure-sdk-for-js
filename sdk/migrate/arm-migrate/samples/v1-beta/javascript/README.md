# @azure/arm-migrate client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-migrate in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [migrateProjectsCreateWavesFromPlanSample.js][migrateprojectscreatewavesfromplansample] | create waves from a previously generated wave plan based on assessment data and selected wave names. x-ms-original-file: 2026-06-01-preview/MigrateProjects_CreateWavesFromPlan_MaximumSet_Gen.json                                                     |
| [migrateProjectsFetchSasUriSample.js][migrateprojectsfetchsasurisample]                 | mint a write-only SAS URI for customer CSV uploads, later consumed by importWavePlan. x-ms-original-file: 2026-06-01-preview/MigrateProjects_FetchSasUri_MaximumSet_Gen.json                                                                            |
| [migrateProjectsGenerateWavePlanSample.js][migrateprojectsgeneratewaveplansample]       | a long-running resource action. x-ms-original-file: 2026-06-01-preview/MigrateProjects_GenerateWavePlan_MaximumSet_Gen.json                                                                                                                             |
| [migrateProjectsGetWavePlansSample.js][migrateprojectsgetwaveplanssample]               | list wave plans previously generated for a given assessment, optionally scoped to a migration path. x-ms-original-file: 2026-06-01-preview/MigrateProjects_GetWavePlans_MaximumSet_Gen.json                                                             |
| [migrateProjectsImportWavePlanSample.js][migrateprojectsimportwaveplansample]           | ingest a customer-uploaded wave-plan CSV and produce the updated wave-plan artifacts. Long-running operation. x-ms-original-file: 2026-06-01-preview/MigrateProjects_ImportWavePlan_MaximumSet_Gen.json                                                 |
| [migrateProjectsRefreshEntitiesSample.js][migrateprojectsrefreshentitiessample]         | refresh execution status for migration entities and groups within a migrate project. This operation triggers status updates from partner migration services. x-ms-original-file: 2026-06-01-preview/MigrateProjects_RefreshEntities_MaximumSet_Gen.json |
| [migrationEntitiesCreateSample.js][migrationentitiescreatesample]                       | create a MigrationEntity x-ms-original-file: 2026-06-01-preview/MigrationEntities_Create_MaximumSet_Gen.json                                                                                                                                            |
| [migrationEntitiesDeleteSample.js][migrationentitiesdeletesample]                       | delete a MigrationEntity x-ms-original-file: 2026-06-01-preview/MigrationEntities_Delete_MaximumSet_Gen.json                                                                                                                                            |
| [migrationEntitiesGetSample.js][migrationentitiesgetsample]                             | get a MigrationEntity x-ms-original-file: 2026-06-01-preview/MigrationEntities_Get_MaximumSet_Gen.json                                                                                                                                                  |
| [migrationEntitiesListByParentSample.js][migrationentitieslistbyparentsample]           | list MigrationEntity resources by MigrateProject x-ms-original-file: 2026-06-01-preview/MigrationEntities_ListByParent_MaximumSet_Gen.json                                                                                                              |
| [migrationEntityGroupsCreateSample.js][migrationentitygroupscreatesample]               | create a MigrationEntityGroup x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_Create_MaximumSet_Gen.json                                                                                                                                   |
| [migrationEntityGroupsDeleteSample.js][migrationentitygroupsdeletesample]               | delete a MigrationEntityGroup x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_Delete_MaximumSet_Gen.json                                                                                                                                   |
| [migrationEntityGroupsGetSample.js][migrationentitygroupsgetsample]                     | get a MigrationEntityGroup x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_Get_MaximumSet_Gen.json                                                                                                                                         |
| [migrationEntityGroupsListByParentSample.js][migrationentitygroupslistbyparentsample]   | list MigrationEntityGroup resources by MigrateProject x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_ListByParent_MaximumSet_Gen.json                                                                                                     |
| [operationsListSample.js][operationslistsample]                                         | list the operations for the provider x-ms-original-file: 2026-06-01-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                         |
| [tasksCreateSample.js][taskscreatesample]                                               | create a Task x-ms-original-file: 2026-06-01-preview/Tasks_Create_MaximumSet_Gen.json                                                                                                                                                                   |
| [tasksDeleteSample.js][tasksdeletesample]                                               | delete a Task x-ms-original-file: 2026-06-01-preview/Tasks_Delete_MaximumSet_Gen.json                                                                                                                                                                   |
| [tasksGetSample.js][tasksgetsample]                                                     | get a Task x-ms-original-file: 2026-06-01-preview/Tasks_Get_MaximumSet_Gen.json                                                                                                                                                                         |
| [tasksGetSummarySample.js][tasksgetsummarysample]                                       | retrieves task summary across all tasks in the project. x-ms-original-file: 2026-06-01-preview/Tasks_GetSummary_MaximumSet_Gen.json                                                                                                                     |
| [tasksListByParentSample.js][taskslistbyparentsample]                                   | list Task resources by MigrateProject x-ms-original-file: 2026-06-01-preview/Tasks_ListByParent_MaximumSet_Gen.json                                                                                                                                     |
| [wavesCreateSample.js][wavescreatesample]                                               | create a Wave x-ms-original-file: 2026-06-01-preview/Waves_Create_MaximumSet_Gen.json                                                                                                                                                                   |
| [wavesDeleteSample.js][wavesdeletesample]                                               | delete a Wave x-ms-original-file: 2026-06-01-preview/Waves_Delete_MaximumSet_Gen.json                                                                                                                                                                   |
| [wavesGetSample.js][wavesgetsample]                                                     | get a Wave x-ms-original-file: 2026-06-01-preview/Waves_Get_MaximumSet_Gen.json                                                                                                                                                                         |
| [wavesListByParentSample.js][waveslistbyparentsample]                                   | list Wave resources by MigrateProject x-ms-original-file: 2026-06-01-preview/Waves_ListByParent_MaximumSet_Gen.json                                                                                                                                     |
| [wavesRefreshSample.js][wavesrefreshsample]                                             | refresh operation to update wave x-ms-original-file: 2026-06-01-preview/Waves_Refresh_MaximumSet_Gen.json                                                                                                                                               |

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
node migrateProjectsCreateWavesFromPlanSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node migrateProjectsCreateWavesFromPlanSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[migrateprojectscreatewavesfromplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrateProjectsCreateWavesFromPlanSample.js
[migrateprojectsfetchsasurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrateProjectsFetchSasUriSample.js
[migrateprojectsgeneratewaveplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrateProjectsGenerateWavePlanSample.js
[migrateprojectsgetwaveplanssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrateProjectsGetWavePlansSample.js
[migrateprojectsimportwaveplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrateProjectsImportWavePlanSample.js
[migrateprojectsrefreshentitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrateProjectsRefreshEntitiesSample.js
[migrationentitiescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrationEntitiesCreateSample.js
[migrationentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrationEntitiesDeleteSample.js
[migrationentitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrationEntitiesGetSample.js
[migrationentitieslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrationEntitiesListByParentSample.js
[migrationentitygroupscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrationEntityGroupsCreateSample.js
[migrationentitygroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrationEntityGroupsDeleteSample.js
[migrationentitygroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrationEntityGroupsGetSample.js
[migrationentitygroupslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/migrationEntityGroupsListByParentSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/operationsListSample.js
[taskscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/tasksCreateSample.js
[tasksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/tasksDeleteSample.js
[tasksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/tasksGetSample.js
[tasksgetsummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/tasksGetSummarySample.js
[taskslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/tasksListByParentSample.js
[wavescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/wavesCreateSample.js
[wavesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/wavesDeleteSample.js
[wavesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/wavesGetSample.js
[waveslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/wavesListByParentSample.js
[wavesrefreshsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/javascript/wavesRefreshSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-migrate?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/migrate/arm-migrate/README.md
