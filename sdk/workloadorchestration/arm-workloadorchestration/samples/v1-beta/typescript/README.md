# @azure/arm-workloadorchestration client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-workloadorchestration in some common scenarios.

| **File Name**                                                                                                   | **Description**                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [configTemplateVersionsGetSample.ts][configtemplateversionsgetsample]                                           | get a Config Template Version Resource x-ms-original-file: 2025-06-01/ConfigTemplateVersions_Get_MaximumSet_Gen.json                                               |
| [configTemplateVersionsListByConfigTemplateSample.ts][configtemplateversionslistbyconfigtemplatesample]         | list Config Template Version Resources x-ms-original-file: 2025-06-01/ConfigTemplateVersions_ListByConfigTemplate_MaximumSet_Gen.json                              |
| [configTemplatesCreateOrUpdateSample.ts][configtemplatescreateorupdatesample]                                   | create or update a Config Template Resource x-ms-original-file: 2025-06-01/ConfigTemplates_CreateOrUpdate_MaximumSet_Gen.json                                      |
| [configTemplatesCreateVersionSample.ts][configtemplatescreateversionsample]                                     | create or update a Config Template Version Resource with the specified UpdateType x-ms-original-file: 2025-06-01/ConfigTemplates_CreateVersion_MaximumSet_Gen.json |
| [configTemplatesDeleteSample.ts][configtemplatesdeletesample]                                                   | delete a Config Template Resource x-ms-original-file: 2025-06-01/ConfigTemplates_Delete_MaximumSet_Gen.json                                                        |
| [configTemplatesGetSample.ts][configtemplatesgetsample]                                                         | get a Config Template Resource x-ms-original-file: 2025-06-01/ConfigTemplates_Get_MaximumSet_Gen.json                                                              |
| [configTemplatesListByResourceGroupSample.ts][configtemplateslistbyresourcegroupsample]                         | list by specified resource group x-ms-original-file: 2025-06-01/ConfigTemplates_ListByResourceGroup_MaximumSet_Gen.json                                            |
| [configTemplatesListBySubscriptionSample.ts][configtemplateslistbysubscriptionsample]                           | list by subscription x-ms-original-file: 2025-06-01/ConfigTemplates_ListBySubscription_MaximumSet_Gen.json                                                         |
| [configTemplatesRemoveVersionSample.ts][configtemplatesremoveversionsample]                                     | remove Config Template Version Resource x-ms-original-file: 2025-06-01/ConfigTemplates_RemoveVersion_MaximumSet_Gen.json                                           |
| [configTemplatesUpdateSample.ts][configtemplatesupdatesample]                                                   | update a Config Template Resource x-ms-original-file: 2025-06-01/ConfigTemplates_Update_MaximumSet_Gen.json                                                        |
| [contextsCreateOrUpdateSample.ts][contextscreateorupdatesample]                                                 | create or update Context Resource x-ms-original-file: 2025-06-01/Contexts_CreateOrUpdate_MaximumSet_Gen.json                                                       |
| [contextsDeleteSample.ts][contextsdeletesample]                                                                 | delete Context Resource x-ms-original-file: 2025-06-01/Contexts_Delete_MaximumSet_Gen.json                                                                         |
| [contextsGetSample.ts][contextsgetsample]                                                                       | get Context Resource x-ms-original-file: 2025-06-01/Contexts_Get_MaximumSet_Gen.json                                                                               |
| [contextsListByResourceGroupSample.ts][contextslistbyresourcegroupsample]                                       | list by specified resource group x-ms-original-file: 2025-06-01/Contexts_ListByResourceGroup_MaximumSet_Gen.json                                                   |
| [contextsListBySubscriptionSample.ts][contextslistbysubscriptionsample]                                         | list by subscription x-ms-original-file: 2025-06-01/Contexts_ListBySubscription_MaximumSet_Gen.json                                                                |
| [contextsUpdateSample.ts][contextsupdatesample]                                                                 | update an Context Resource x-ms-original-file: 2025-06-01/Contexts_Update_MaximumSet_Gen.json                                                                      |
| [diagnosticsCreateOrUpdateSample.ts][diagnosticscreateorupdatesample]                                           | creates new or updates existing Diagnostic resource. x-ms-original-file: 2025-06-01/Diagnostics_CreateOrUpdate_MaximumSet_Gen.json                                 |
| [diagnosticsDeleteSample.ts][diagnosticsdeletesample]                                                           | deletes specified Diagnostic resource. x-ms-original-file: 2025-06-01/Diagnostics_Delete_MaximumSet_Gen.json                                                       |
| [diagnosticsGetSample.ts][diagnosticsgetsample]                                                                 | returns details of specified Diagnostic resource. x-ms-original-file: 2025-06-01/Diagnostics_Get_MaximumSet_Gen.json                                               |
| [diagnosticsListByResourceGroupSample.ts][diagnosticslistbyresourcegroupsample]                                 | returns a collection of Diagnostic resources within the resource group. x-ms-original-file: 2025-06-01/Diagnostics_ListByResourceGroup_MaximumSet_Gen.json         |
| [diagnosticsListBySubscriptionSample.ts][diagnosticslistbysubscriptionsample]                                   | lists Diagnostics resources within an Azure subscription. x-ms-original-file: 2025-06-01/Diagnostics_ListBySubscription_MaximumSet_Gen.json                        |
| [diagnosticsUpdateSample.ts][diagnosticsupdatesample]                                                           | updates existing Diagnostic resource. x-ms-original-file: 2025-06-01/Diagnostics_Update_MaximumSet_Gen.json                                                        |
| [dynamicSchemaVersionsCreateOrUpdateSample.ts][dynamicschemaversionscreateorupdatesample]                       | create or update a Dynamic Schema Version Resource x-ms-original-file: 2025-06-01/DynamicSchemaVersions_CreateOrUpdate_MaximumSet_Gen.json                         |
| [dynamicSchemaVersionsDeleteSample.ts][dynamicschemaversionsdeletesample]                                       | delete a Dynamic Schema Version Resource x-ms-original-file: 2025-06-01/DynamicSchemaVersions_Delete_MaximumSet_Gen.json                                           |
| [dynamicSchemaVersionsGetSample.ts][dynamicschemaversionsgetsample]                                             | get a Dynamic Schema Version Resource x-ms-original-file: 2025-06-01/DynamicSchemaVersions_Get_MaximumSet_Gen.json                                                 |
| [dynamicSchemaVersionsListByDynamicSchemaSample.ts][dynamicschemaversionslistbydynamicschemasample]             | list by Dynamic Schema x-ms-original-file: 2025-06-01/DynamicSchemaVersions_ListByDynamicSchema_MaximumSet_Gen.json                                                |
| [dynamicSchemaVersionsUpdateSample.ts][dynamicschemaversionsupdatesample]                                       | update a Dynamic Schema Version Resource x-ms-original-file: 2025-06-01/DynamicSchemaVersions_Update_MaximumSet_Gen.json                                           |
| [dynamicSchemasCreateOrUpdateSample.ts][dynamicschemascreateorupdatesample]                                     | create or update a DynamicSchema Resource x-ms-original-file: 2025-06-01/DynamicSchemas_CreateOrUpdate_MaximumSet_Gen.json                                         |
| [dynamicSchemasDeleteSample.ts][dynamicschemasdeletesample]                                                     | delete a DynamicSchema Resource x-ms-original-file: 2025-06-01/DynamicSchemas_Delete_MaximumSet_Gen.json                                                           |
| [dynamicSchemasGetSample.ts][dynamicschemasgetsample]                                                           | get a DynamicSchema Resource x-ms-original-file: 2025-06-01/DynamicSchemas_Get_MaximumSet_Gen.json                                                                 |
| [dynamicSchemasListBySchemaSample.ts][dynamicschemaslistbyschemasample]                                         | list by Schema x-ms-original-file: 2025-06-01/DynamicSchemas_ListBySchema_MaximumSet_Gen.json                                                                      |
| [dynamicSchemasUpdateSample.ts][dynamicschemasupdatesample]                                                     | update a DynamicSchema Resource x-ms-original-file: 2025-06-01/DynamicSchemas_Update_MaximumSet_Gen.json                                                           |
| [executionsCreateOrUpdateSample.ts][executionscreateorupdatesample]                                             | create or update Execution Resource x-ms-original-file: 2025-06-01/Executions_CreateOrUpdate_MaximumSet_Gen.json                                                   |
| [executionsDeleteSample.ts][executionsdeletesample]                                                             | delete Execution Resource x-ms-original-file: 2025-06-01/Executions_Delete_MaximumSet_Gen.json                                                                     |
| [executionsGetSample.ts][executionsgetsample]                                                                   | get Execution Resource x-ms-original-file: 2025-06-01/Executions_Get_MaximumSet_Gen.json                                                                           |
| [executionsListByWorkflowVersionSample.ts][executionslistbyworkflowversionsample]                               | list Execution Resources x-ms-original-file: 2025-06-01/Executions_ListByWorkflowVersion_MaximumSet_Gen.json                                                       |
| [executionsUpdateSample.ts][executionsupdatesample]                                                             | update an Execution Resource x-ms-original-file: 2025-06-01/Executions_Update_MaximumSet_Gen.json                                                                  |
| [instanceHistoriesGetSample.ts][instancehistoriesgetsample]                                                     | get InstanceHistory Resource x-ms-original-file: 2025-06-01/InstanceHistories_Get_MaximumSet_Gen.json                                                              |
| [instanceHistoriesListByInstanceSample.ts][instancehistorieslistbyinstancesample]                               | list InstanceHistory Resources x-ms-original-file: 2025-06-01/InstanceHistories_ListByInstance_MaximumSet_Gen.json                                                 |
| [instancesCreateOrUpdateSample.ts][instancescreateorupdatesample]                                               | create or update Instance Resource x-ms-original-file: 2025-06-01/Instances_CreateOrUpdate_MaximumSet_Gen.json                                                     |
| [instancesDeleteSample.ts][instancesdeletesample]                                                               | delete Instance Resource x-ms-original-file: 2025-06-01/Instances_Delete_MaximumSet_Gen.json                                                                       |
| [instancesGetSample.ts][instancesgetsample]                                                                     | get Instance Resource x-ms-original-file: 2025-06-01/Instances_Get_MaximumSet_Gen.json                                                                             |
| [instancesListBySolutionSample.ts][instanceslistbysolutionsample]                                               | list Instance Resources x-ms-original-file: 2025-06-01/Instances_ListBySolution_MaximumSet_Gen.json                                                                |
| [instancesUpdateSample.ts][instancesupdatesample]                                                               | update an Instance Resource x-ms-original-file: 2025-06-01/Instances_Update_MaximumSet_Gen.json                                                                    |
| [jobsGetSample.ts][jobsgetsample]                                                                               | get a Job resource x-ms-original-file: 2025-06-01/Jobs_Get_MaximumSet_Gen.json                                                                                     |
| [jobsListByTargetSample.ts][jobslistbytargetsample]                                                             | list Jobs by parent resource x-ms-original-file: 2025-06-01/Jobs_ListByTarget_MaximumSet_Gen.json                                                                  |
| [schemaReferencesGetSample.ts][schemareferencesgetsample]                                                       | get a Schema Reference Resource x-ms-original-file: 2025-06-01/SchemaReferences_Get_MaximumSet_Gen.json                                                            |
| [schemaReferencesListByResourceGroupSample.ts][schemareferenceslistbyresourcegroupsample]                       | list by specified resource group x-ms-original-file: 2025-06-01/SchemaReferences_ListByResourceGroup_MaximumSet_Gen.json                                           |
| [schemaVersionsCreateOrUpdateSample.ts][schemaversionscreateorupdatesample]                                     | create or update a Schema Version Resource x-ms-original-file: 2025-06-01/SchemaVersions_CreateOrUpdate_MaximumSet_Gen.json                                        |
| [schemaVersionsDeleteSample.ts][schemaversionsdeletesample]                                                     | delete a Schema Version Resource x-ms-original-file: 2025-06-01/SchemaVersions_Delete_MaximumSet_Gen.json                                                          |
| [schemaVersionsGetSample.ts][schemaversionsgetsample]                                                           | get a Schema Version Resource x-ms-original-file: 2025-06-01/SchemaVersions_Get_MaximumSet_Gen.json                                                                |
| [schemaVersionsListBySchemaSample.ts][schemaversionslistbyschemasample]                                         | list by specified resource group x-ms-original-file: 2025-06-01/SchemaVersions_ListBySchema_MaximumSet_Gen.json                                                    |
| [schemaVersionsUpdateSample.ts][schemaversionsupdatesample]                                                     | update a Schema Version Resource x-ms-original-file: 2025-06-01/SchemaVersions_Update_MaximumSet_Gen.json                                                          |
| [schemasCreateOrUpdateSample.ts][schemascreateorupdatesample]                                                   | create or update a Schema Resource x-ms-original-file: 2025-06-01/Schemas_CreateOrUpdate_MaximumSet_Gen.json                                                       |
| [schemasCreateVersionSample.ts][schemascreateversionsample]                                                     | create a Schema Version Resource x-ms-original-file: 2025-06-01/Schemas_CreateVersion_MaximumSet_Gen.json                                                          |
| [schemasDeleteSample.ts][schemasdeletesample]                                                                   | delete a Schema Resource x-ms-original-file: 2025-06-01/Schemas_Delete_MaximumSet_Gen.json                                                                         |
| [schemasGetSample.ts][schemasgetsample]                                                                         | get a Schema Resource x-ms-original-file: 2025-06-01/Schemas_Get_MaximumSet_Gen.json                                                                               |
| [schemasListByResourceGroupSample.ts][schemaslistbyresourcegroupsample]                                         | list by specified resource group x-ms-original-file: 2025-06-01/Schemas_ListByResourceGroup_MaximumSet_Gen.json                                                    |
| [schemasListBySubscriptionSample.ts][schemaslistbysubscriptionsample]                                           | list by subscription x-ms-original-file: 2025-06-01/Schemas_ListBySubscription_MaximumSet_Gen.json                                                                 |
| [schemasRemoveVersionSample.ts][schemasremoveversionsample]                                                     | remove Schema Version Resource x-ms-original-file: 2025-06-01/Schemas_RemoveVersion_MaximumSet_Gen.json                                                            |
| [schemasUpdateSample.ts][schemasupdatesample]                                                                   | update a Schema Resource x-ms-original-file: 2025-06-01/Schemas_Update_MaximumSet_Gen.json                                                                         |
| [siteReferencesCreateOrUpdateSample.ts][sitereferencescreateorupdatesample]                                     | get Site Reference Resource x-ms-original-file: 2025-06-01/SiteReferences_CreateOrUpdate_MaximumSet_Gen.json                                                       |
| [siteReferencesDeleteSample.ts][sitereferencesdeletesample]                                                     | get Site Reference Resource x-ms-original-file: 2025-06-01/SiteReferences_Delete_MaximumSet_Gen.json                                                               |
| [siteReferencesGetSample.ts][sitereferencesgetsample]                                                           | get Site Reference Resource x-ms-original-file: 2025-06-01/SiteReferences_Get_MaximumSet_Gen.json                                                                  |
| [siteReferencesListByContextSample.ts][sitereferenceslistbycontextsample]                                       | list Site Reference Resources x-ms-original-file: 2025-06-01/SiteReferences_ListByContext_MaximumSet_Gen.json                                                      |
| [siteReferencesUpdateSample.ts][sitereferencesupdatesample]                                                     | get Site Reference Resource x-ms-original-file: 2025-06-01/SiteReferences_Update_MaximumSet_Gen.json                                                               |
| [solutionTemplateVersionsBulkDeploySolutionSample.ts][solutiontemplateversionsbulkdeploysolutionsample]         | post request for bulk deploy x-ms-original-file: 2025-06-01/SolutionTemplateVersions_BulkDeploySolution_MaximumSet_Gen.json                                        |
| [solutionTemplateVersionsBulkPublishSolutionSample.ts][solutiontemplateversionsbulkpublishsolutionsample]       | post request for bulk publish x-ms-original-file: 2025-06-01/SolutionTemplateVersions_BulkPublishSolution_MaximumSet_Gen.json                                      |
| [solutionTemplateVersionsGetSample.ts][solutiontemplateversionsgetsample]                                       | get a Solution Template Version Resource x-ms-original-file: 2025-06-01/SolutionTemplateVersions_Get_MaximumSet_Gen.json                                           |
| [solutionTemplateVersionsListBySolutionTemplateSample.ts][solutiontemplateversionslistbysolutiontemplatesample] | list Solution Template Version Resources x-ms-original-file: 2025-06-01/SolutionTemplateVersions_ListBySolutionTemplate_MaximumSet_Gen.json                        |
| [solutionTemplatesCreateOrUpdateSample.ts][solutiontemplatescreateorupdatesample]                               | create or update a Solution Template Resource x-ms-original-file: 2025-06-01/SolutionTemplates_CreateOrUpdate_MaximumSet_Gen.json                                  |
| [solutionTemplatesCreateVersionSample.ts][solutiontemplatescreateversionsample]                                 | create a Solution Template Version Resource x-ms-original-file: 2025-06-01/SolutionTemplates_CreateVersion_MaximumSet_Gen.json                                     |
| [solutionTemplatesDeleteSample.ts][solutiontemplatesdeletesample]                                               | delete a Solution Template Resource x-ms-original-file: 2025-06-01/SolutionTemplates_Delete_MaximumSet_Gen.json                                                    |
| [solutionTemplatesGetSample.ts][solutiontemplatesgetsample]                                                     | get a Solution Template Resource x-ms-original-file: 2025-06-01/SolutionTemplates_Get_MaximumSet_Gen.json                                                          |
| [solutionTemplatesListByResourceGroupSample.ts][solutiontemplateslistbyresourcegroupsample]                     | list by specified resource group x-ms-original-file: 2025-06-01/SolutionTemplates_ListByResourceGroup_MaximumSet_Gen.json                                          |
| [solutionTemplatesListBySubscriptionSample.ts][solutiontemplateslistbysubscriptionsample]                       | list by subscription x-ms-original-file: 2025-06-01/SolutionTemplates_ListBySubscription_MaximumSet_Gen.json                                                       |
| [solutionTemplatesRemoveVersionSample.ts][solutiontemplatesremoveversionsample]                                 | remove Solution Template Version Resource x-ms-original-file: 2025-06-01/SolutionTemplates_RemoveVersion_MaximumSet_Gen.json                                       |
| [solutionTemplatesUpdateSample.ts][solutiontemplatesupdatesample]                                               | update a Solution Template Resource x-ms-original-file: 2025-06-01/SolutionTemplates_Update_MaximumSet_Gen.json                                                    |
| [solutionVersionsCreateOrUpdateSample.ts][solutionversionscreateorupdatesample]                                 | create or update a Solution Version Resource x-ms-original-file: 2025-06-01/SolutionVersions_CreateOrUpdate_MaximumSet_Gen.json                                    |
| [solutionVersionsDeleteSample.ts][solutionversionsdeletesample]                                                 | delete a Solution Version Resource x-ms-original-file: 2025-06-01/SolutionVersions_Delete_MaximumSet_Gen.json                                                      |
| [solutionVersionsGetSample.ts][solutionversionsgetsample]                                                       | get a Solution Version Resource x-ms-original-file: 2025-06-01/SolutionVersions_Get_MaximumSet_Gen.json                                                            |
| [solutionVersionsListBySolutionSample.ts][solutionversionslistbysolutionsample]                                 | list Solution Version Resources x-ms-original-file: 2025-06-01/SolutionVersions_ListBySolution_MaximumSet_Gen.json                                                 |
| [solutionVersionsUpdateSample.ts][solutionversionsupdatesample]                                                 | update a Solution Version Resource x-ms-original-file: 2025-06-01/SolutionVersions_Update_MaximumSet_Gen.json                                                      |
| [solutionsCreateOrUpdateSample.ts][solutionscreateorupdatesample]                                               | create or update a Solution Resource x-ms-original-file: 2025-06-01/Solutions_CreateOrUpdate_MaximumSet_Gen.json                                                   |
| [solutionsDeleteSample.ts][solutionsdeletesample]                                                               | delete a Solution Resource x-ms-original-file: 2025-06-01/Solutions_Delete_MaximumSet_Gen.json                                                                     |
| [solutionsGetSample.ts][solutionsgetsample]                                                                     | get a Solution resource x-ms-original-file: 2025-06-01/Solutions_Get_MaximumSet_Gen.json                                                                           |
| [solutionsListByTargetSample.ts][solutionslistbytargetsample]                                                   | list Solution resources x-ms-original-file: 2025-06-01/Solutions_ListByTarget_MaximumSet_Gen.json                                                                  |
| [solutionsUpdateSample.ts][solutionsupdatesample]                                                               | update a Solution Resource x-ms-original-file: 2025-06-01/Solutions_Update_MaximumSet_Gen.json                                                                     |
| [targetsCreateOrUpdateSample.ts][targetscreateorupdatesample]                                                   | create or update a Target Resource x-ms-original-file: 2025-06-01/Targets_CreateOrUpdate_MaximumSet_Gen.json                                                       |
| [targetsDeleteSample.ts][targetsdeletesample]                                                                   | delete a Target Resource x-ms-original-file: 2025-06-01/Targets_Delete_MaximumSet_Gen.json                                                                         |
| [targetsGetSample.ts][targetsgetsample]                                                                         | get a Target Resource x-ms-original-file: 2025-06-01/Targets_Get_MaximumSet_Gen.json                                                                               |
| [targetsInstallSolutionSample.ts][targetsinstallsolutionsample]                                                 | post request to deploy x-ms-original-file: 2025-06-01/Targets_InstallSolution_MaximumSet_Gen.json                                                                  |
| [targetsListByResourceGroupSample.ts][targetslistbyresourcegroupsample]                                         | list by specified resource group x-ms-original-file: 2025-06-01/Targets_ListByResourceGroup_MaximumSet_Gen.json                                                    |
| [targetsListBySubscriptionSample.ts][targetslistbysubscriptionsample]                                           | list by subscription x-ms-original-file: 2025-06-01/Targets_ListBySubscription_MaximumSet_Gen.json                                                                 |
| [targetsPublishSolutionVersionSample.ts][targetspublishsolutionversionsample]                                   | post request to publish x-ms-original-file: 2025-06-01/Targets_PublishSolutionVersion_MaximumSet_Gen.json                                                          |
| [targetsRemoveRevisionSample.ts][targetsremoverevisionsample]                                                   | post request to remove solution version revision x-ms-original-file: 2025-06-01/Targets_RemoveRevision_MaximumSet_Gen.json                                         |
| [targetsResolveConfigurationSample.ts][targetsresolveconfigurationsample]                                       | post request to resolve configuration x-ms-original-file: 2025-06-01/Targets_ResolveConfiguration_MaximumSet_Gen.json                                              |
| [targetsReviewSolutionVersionSample.ts][targetsreviewsolutionversionsample]                                     | post request to review configuration x-ms-original-file: 2025-06-01/Targets_ReviewSolutionVersion_MaximumSet_Gen.json                                              |
| [targetsUninstallSolutionSample.ts][targetsuninstallsolutionsample]                                             | post request to uninstall x-ms-original-file: 2025-06-01/Targets_UninstallSolution_MaximumSet_Gen.json                                                             |
| [targetsUpdateExternalValidationStatusSample.ts][targetsupdateexternalvalidationstatussample]                   | post request to update external validation status x-ms-original-file: 2025-06-01/Targets_UpdateExternalValidationStatus_MaximumSet_Gen.json                        |
| [targetsUpdateSample.ts][targetsupdatesample]                                                                   | update a Target Resource x-ms-original-file: 2025-06-01/Targets_Update_MaximumSet_Gen.json                                                                         |
| [workflowVersionsCreateOrUpdateSample.ts][workflowversionscreateorupdatesample]                                 | create or update a Workflow Version Resource x-ms-original-file: 2025-06-01/WorkflowVersions_CreateOrUpdate_MaximumSet_Gen.json                                    |
| [workflowVersionsDeleteSample.ts][workflowversionsdeletesample]                                                 | delete a Workflow Version Resource x-ms-original-file: 2025-06-01/WorkflowVersions_Delete_MaximumSet_Gen.json                                                      |
| [workflowVersionsGetSample.ts][workflowversionsgetsample]                                                       | get a Workflow Version Resource x-ms-original-file: 2025-06-01/WorkflowVersions_Get_MaximumSet_Gen.json                                                            |
| [workflowVersionsListByWorkflowSample.ts][workflowversionslistbyworkflowsample]                                 | list Workflow Version Resources x-ms-original-file: 2025-06-01/WorkflowVersions_ListByWorkflow_MaximumSet_Gen.json                                                 |
| [workflowVersionsUpdateSample.ts][workflowversionsupdatesample]                                                 | update an WorkflowVersion Resource x-ms-original-file: 2025-06-01/WorkflowVersions_Update_MaximumSet_Gen.json                                                      |
| [workflowsCreateOrUpdateSample.ts][workflowscreateorupdatesample]                                               | create or update a Workflow resource x-ms-original-file: 2025-06-01/Workflows_CreateOrUpdate_MaximumSet_Gen.json                                                   |
| [workflowsDeleteSample.ts][workflowsdeletesample]                                                               | delete a Workflow resource x-ms-original-file: 2025-06-01/Workflows_Delete_MaximumSet_Gen.json                                                                     |
| [workflowsGetSample.ts][workflowsgetsample]                                                                     | get a Workflow resource x-ms-original-file: 2025-06-01/Workflows_Get_MaximumSet_Gen.json                                                                           |
| [workflowsListByContextSample.ts][workflowslistbycontextsample]                                                 | list Workflow resources x-ms-original-file: 2025-06-01/Workflows_ListByContext_MaximumSet_Gen.json                                                                 |
| [workflowsUpdateSample.ts][workflowsupdatesample]                                                               | update a Workflow resource x-ms-original-file: 2025-06-01/Workflows_Update_MaximumSet_Gen.json                                                                     |

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
node dist/configTemplateVersionsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/configTemplateVersionsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[configtemplateversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplateVersionsGetSample.ts
[configtemplateversionslistbyconfigtemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplateVersionsListByConfigTemplateSample.ts
[configtemplatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplatesCreateOrUpdateSample.ts
[configtemplatescreateversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplatesCreateVersionSample.ts
[configtemplatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplatesDeleteSample.ts
[configtemplatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplatesGetSample.ts
[configtemplateslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplatesListByResourceGroupSample.ts
[configtemplateslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplatesListBySubscriptionSample.ts
[configtemplatesremoveversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplatesRemoveVersionSample.ts
[configtemplatesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/configTemplatesUpdateSample.ts
[contextscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/contextsCreateOrUpdateSample.ts
[contextsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/contextsDeleteSample.ts
[contextsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/contextsGetSample.ts
[contextslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/contextsListByResourceGroupSample.ts
[contextslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/contextsListBySubscriptionSample.ts
[contextsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/contextsUpdateSample.ts
[diagnosticscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/diagnosticsCreateOrUpdateSample.ts
[diagnosticsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/diagnosticsDeleteSample.ts
[diagnosticsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/diagnosticsGetSample.ts
[diagnosticslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/diagnosticsListByResourceGroupSample.ts
[diagnosticslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/diagnosticsListBySubscriptionSample.ts
[diagnosticsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/diagnosticsUpdateSample.ts
[dynamicschemaversionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemaVersionsCreateOrUpdateSample.ts
[dynamicschemaversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemaVersionsDeleteSample.ts
[dynamicschemaversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemaVersionsGetSample.ts
[dynamicschemaversionslistbydynamicschemasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemaVersionsListByDynamicSchemaSample.ts
[dynamicschemaversionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemaVersionsUpdateSample.ts
[dynamicschemascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemasCreateOrUpdateSample.ts
[dynamicschemasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemasDeleteSample.ts
[dynamicschemasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemasGetSample.ts
[dynamicschemaslistbyschemasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemasListBySchemaSample.ts
[dynamicschemasupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/dynamicSchemasUpdateSample.ts
[executionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/executionsCreateOrUpdateSample.ts
[executionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/executionsDeleteSample.ts
[executionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/executionsGetSample.ts
[executionslistbyworkflowversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/executionsListByWorkflowVersionSample.ts
[executionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/executionsUpdateSample.ts
[instancehistoriesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/instanceHistoriesGetSample.ts
[instancehistorieslistbyinstancesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/instanceHistoriesListByInstanceSample.ts
[instancescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/instancesCreateOrUpdateSample.ts
[instancesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/instancesDeleteSample.ts
[instancesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/instancesGetSample.ts
[instanceslistbysolutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/instancesListBySolutionSample.ts
[instancesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/instancesUpdateSample.ts
[jobsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/jobsGetSample.ts
[jobslistbytargetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/jobsListByTargetSample.ts
[schemareferencesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemaReferencesGetSample.ts
[schemareferenceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemaReferencesListByResourceGroupSample.ts
[schemaversionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemaVersionsCreateOrUpdateSample.ts
[schemaversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemaVersionsDeleteSample.ts
[schemaversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemaVersionsGetSample.ts
[schemaversionslistbyschemasample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemaVersionsListBySchemaSample.ts
[schemaversionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemaVersionsUpdateSample.ts
[schemascreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemasCreateOrUpdateSample.ts
[schemascreateversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemasCreateVersionSample.ts
[schemasdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemasDeleteSample.ts
[schemasgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemasGetSample.ts
[schemaslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemasListByResourceGroupSample.ts
[schemaslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemasListBySubscriptionSample.ts
[schemasremoveversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemasRemoveVersionSample.ts
[schemasupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/schemasUpdateSample.ts
[sitereferencescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/siteReferencesCreateOrUpdateSample.ts
[sitereferencesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/siteReferencesDeleteSample.ts
[sitereferencesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/siteReferencesGetSample.ts
[sitereferenceslistbycontextsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/siteReferencesListByContextSample.ts
[sitereferencesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/siteReferencesUpdateSample.ts
[solutiontemplateversionsbulkdeploysolutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplateVersionsBulkDeploySolutionSample.ts
[solutiontemplateversionsbulkpublishsolutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplateVersionsBulkPublishSolutionSample.ts
[solutiontemplateversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplateVersionsGetSample.ts
[solutiontemplateversionslistbysolutiontemplatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplateVersionsListBySolutionTemplateSample.ts
[solutiontemplatescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplatesCreateOrUpdateSample.ts
[solutiontemplatescreateversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplatesCreateVersionSample.ts
[solutiontemplatesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplatesDeleteSample.ts
[solutiontemplatesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplatesGetSample.ts
[solutiontemplateslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplatesListByResourceGroupSample.ts
[solutiontemplateslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplatesListBySubscriptionSample.ts
[solutiontemplatesremoveversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplatesRemoveVersionSample.ts
[solutiontemplatesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionTemplatesUpdateSample.ts
[solutionversionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionVersionsCreateOrUpdateSample.ts
[solutionversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionVersionsDeleteSample.ts
[solutionversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionVersionsGetSample.ts
[solutionversionslistbysolutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionVersionsListBySolutionSample.ts
[solutionversionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionVersionsUpdateSample.ts
[solutionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionsCreateOrUpdateSample.ts
[solutionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionsDeleteSample.ts
[solutionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionsGetSample.ts
[solutionslistbytargetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionsListByTargetSample.ts
[solutionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/solutionsUpdateSample.ts
[targetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsCreateOrUpdateSample.ts
[targetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsDeleteSample.ts
[targetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsGetSample.ts
[targetsinstallsolutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsInstallSolutionSample.ts
[targetslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsListByResourceGroupSample.ts
[targetslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsListBySubscriptionSample.ts
[targetspublishsolutionversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsPublishSolutionVersionSample.ts
[targetsremoverevisionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsRemoveRevisionSample.ts
[targetsresolveconfigurationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsResolveConfigurationSample.ts
[targetsreviewsolutionversionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsReviewSolutionVersionSample.ts
[targetsuninstallsolutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsUninstallSolutionSample.ts
[targetsupdateexternalvalidationstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsUpdateExternalValidationStatusSample.ts
[targetsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/targetsUpdateSample.ts
[workflowversionscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowVersionsCreateOrUpdateSample.ts
[workflowversionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowVersionsDeleteSample.ts
[workflowversionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowVersionsGetSample.ts
[workflowversionslistbyworkflowsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowVersionsListByWorkflowSample.ts
[workflowversionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowVersionsUpdateSample.ts
[workflowscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowsCreateOrUpdateSample.ts
[workflowsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowsDeleteSample.ts
[workflowsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowsGetSample.ts
[workflowslistbycontextsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowsListByContextSample.ts
[workflowsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/workloadorchestration/arm-workloadorchestration/samples/v1-beta/typescript/src/workflowsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-workloadorchestration?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/workloadorchestration/arm-workloadorchestration/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
