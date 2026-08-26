# @azure/arm-migrate client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-migrate in some common scenarios.

| **File Name**                                                                           | **Description**                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [migrateProjectsCreateWavesFromPlanSample.ts][migrateprojectscreatewavesfromplansample] | create waves from a previously generated wave plan based on assessment data and selected wave names. x-ms-original-file: 2026-06-01-preview/MigrateProjects_CreateWavesFromPlan_MaximumSet_Gen.json                                                     |
| [migrateProjectsFetchSasUriSample.ts][migrateprojectsfetchsasurisample]                 | mint a write-only SAS URI for customer CSV uploads, later consumed by importWavePlan. x-ms-original-file: 2026-06-01-preview/MigrateProjects_FetchSasUri_MaximumSet_Gen.json                                                                            |
| [migrateProjectsGenerateWavePlanSample.ts][migrateprojectsgeneratewaveplansample]       | a long-running resource action. x-ms-original-file: 2026-06-01-preview/MigrateProjects_GenerateWavePlan_MaximumSet_Gen.json                                                                                                                             |
| [migrateProjectsGetWavePlansSample.ts][migrateprojectsgetwaveplanssample]               | list wave plans previously generated for a given assessment, optionally scoped to a migration path. x-ms-original-file: 2026-06-01-preview/MigrateProjects_GetWavePlans_MaximumSet_Gen.json                                                             |
| [migrateProjectsImportWavePlanSample.ts][migrateprojectsimportwaveplansample]           | ingest a customer-uploaded wave-plan CSV and produce the updated wave-plan artifacts. Long-running operation. x-ms-original-file: 2026-06-01-preview/MigrateProjects_ImportWavePlan_MaximumSet_Gen.json                                                 |
| [migrateProjectsRefreshEntitiesSample.ts][migrateprojectsrefreshentitiessample]         | refresh execution status for migration entities and groups within a migrate project. This operation triggers status updates from partner migration services. x-ms-original-file: 2026-06-01-preview/MigrateProjects_RefreshEntities_MaximumSet_Gen.json |
| [migrationEntitiesCreateSample.ts][migrationentitiescreatesample]                       | create a MigrationEntity x-ms-original-file: 2026-06-01-preview/MigrationEntities_Create_MaximumSet_Gen.json                                                                                                                                            |
| [migrationEntitiesDeleteSample.ts][migrationentitiesdeletesample]                       | delete a MigrationEntity x-ms-original-file: 2026-06-01-preview/MigrationEntities_Delete_MaximumSet_Gen.json                                                                                                                                            |
| [migrationEntitiesGetSample.ts][migrationentitiesgetsample]                             | get a MigrationEntity x-ms-original-file: 2026-06-01-preview/MigrationEntities_Get_MaximumSet_Gen.json                                                                                                                                                  |
| [migrationEntitiesListByParentSample.ts][migrationentitieslistbyparentsample]           | list MigrationEntity resources by MigrateProject x-ms-original-file: 2026-06-01-preview/MigrationEntities_ListByParent_MaximumSet_Gen.json                                                                                                              |
| [migrationEntityGroupsCreateSample.ts][migrationentitygroupscreatesample]               | create a MigrationEntityGroup x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_Create_MaximumSet_Gen.json                                                                                                                                   |
| [migrationEntityGroupsDeleteSample.ts][migrationentitygroupsdeletesample]               | delete a MigrationEntityGroup x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_Delete_MaximumSet_Gen.json                                                                                                                                   |
| [migrationEntityGroupsGetSample.ts][migrationentitygroupsgetsample]                     | get a MigrationEntityGroup x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_Get_MaximumSet_Gen.json                                                                                                                                         |
| [migrationEntityGroupsListByParentSample.ts][migrationentitygroupslistbyparentsample]   | list MigrationEntityGroup resources by MigrateProject x-ms-original-file: 2026-06-01-preview/MigrationEntityGroups_ListByParent_MaximumSet_Gen.json                                                                                                     |
| [operationsListSample.ts][operationslistsample]                                         | list the operations for the provider x-ms-original-file: 2026-06-01-preview/Operations_List_MaximumSet_Gen.json                                                                                                                                         |
| [tasksCreateSample.ts][taskscreatesample]                                               | create a Task x-ms-original-file: 2026-06-01-preview/Tasks_Create_MaximumSet_Gen.json                                                                                                                                                                   |
| [tasksDeleteSample.ts][tasksdeletesample]                                               | delete a Task x-ms-original-file: 2026-06-01-preview/Tasks_Delete_MaximumSet_Gen.json                                                                                                                                                                   |
| [tasksGetSample.ts][tasksgetsample]                                                     | get a Task x-ms-original-file: 2026-06-01-preview/Tasks_Get_MaximumSet_Gen.json                                                                                                                                                                         |
| [tasksGetSummarySample.ts][tasksgetsummarysample]                                       | retrieves task summary across all tasks in the project. x-ms-original-file: 2026-06-01-preview/Tasks_GetSummary_MaximumSet_Gen.json                                                                                                                     |
| [tasksListByParentSample.ts][taskslistbyparentsample]                                   | list Task resources by MigrateProject x-ms-original-file: 2026-06-01-preview/Tasks_ListByParent_MaximumSet_Gen.json                                                                                                                                     |
| [wavesCreateSample.ts][wavescreatesample]                                               | create a Wave x-ms-original-file: 2026-06-01-preview/Waves_Create_MaximumSet_Gen.json                                                                                                                                                                   |
| [wavesDeleteSample.ts][wavesdeletesample]                                               | delete a Wave x-ms-original-file: 2026-06-01-preview/Waves_Delete_MaximumSet_Gen.json                                                                                                                                                                   |
| [wavesGetSample.ts][wavesgetsample]                                                     | get a Wave x-ms-original-file: 2026-06-01-preview/Waves_Get_MaximumSet_Gen.json                                                                                                                                                                         |
| [wavesListByParentSample.ts][waveslistbyparentsample]                                   | list Wave resources by MigrateProject x-ms-original-file: 2026-06-01-preview/Waves_ListByParent_MaximumSet_Gen.json                                                                                                                                     |
| [wavesRefreshSample.ts][wavesrefreshsample]                                             | refresh operation to update wave x-ms-original-file: 2026-06-01-preview/Waves_Refresh_MaximumSet_Gen.json                                                                                                                                               |

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
node dist/migrateProjectsCreateWavesFromPlanSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/migrateProjectsCreateWavesFromPlanSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[migrateprojectscreatewavesfromplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrateProjectsCreateWavesFromPlanSample.ts
[migrateprojectsfetchsasurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrateProjectsFetchSasUriSample.ts
[migrateprojectsgeneratewaveplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrateProjectsGenerateWavePlanSample.ts
[migrateprojectsgetwaveplanssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrateProjectsGetWavePlansSample.ts
[migrateprojectsimportwaveplansample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrateProjectsImportWavePlanSample.ts
[migrateprojectsrefreshentitiessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrateProjectsRefreshEntitiesSample.ts
[migrationentitiescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrationEntitiesCreateSample.ts
[migrationentitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrationEntitiesDeleteSample.ts
[migrationentitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrationEntitiesGetSample.ts
[migrationentitieslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrationEntitiesListByParentSample.ts
[migrationentitygroupscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrationEntityGroupsCreateSample.ts
[migrationentitygroupsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrationEntityGroupsDeleteSample.ts
[migrationentitygroupsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrationEntityGroupsGetSample.ts
[migrationentitygroupslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/migrationEntityGroupsListByParentSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/operationsListSample.ts
[taskscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/tasksCreateSample.ts
[tasksdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/tasksDeleteSample.ts
[tasksgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/tasksGetSample.ts
[tasksgetsummarysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/tasksGetSummarySample.ts
[taskslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/tasksListByParentSample.ts
[wavescreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/wavesCreateSample.ts
[wavesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/wavesDeleteSample.ts
[wavesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/wavesGetSample.ts
[waveslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/wavesListByParentSample.ts
[wavesrefreshsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/migrate/arm-migrate/samples/v1-beta/typescript/src/wavesRefreshSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-migrate?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/migrate/arm-migrate/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
