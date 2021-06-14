// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LinkedServiceGetLinkedServicesByWorkspaceParameters,
  LinkedServiceCreateOrUpdateLinkedServiceParameters,
  LinkedServiceGetLinkedServiceParameters,
  LinkedServiceDeleteLinkedServiceParameters,
  LinkedServiceRenameLinkedServiceParameters,
  DatasetGetDatasetsByWorkspaceParameters,
  DatasetCreateOrUpdateDatasetParameters,
  DatasetGetDatasetParameters,
  DatasetDeleteDatasetParameters,
  DatasetRenameDatasetParameters,
  PipelineGetPipelinesByWorkspaceParameters,
  PipelineCreateOrUpdatePipelineParameters,
  PipelineGetPipelineParameters,
  PipelineDeletePipelineParameters,
  PipelineRenamePipelineParameters,
  PipelineCreatePipelineRunParameters,
  PipelineRunQueryPipelineRunsByWorkspaceParameters,
  PipelineRunGetPipelineRunParameters,
  PipelineRunQueryActivityRunsParameters,
  PipelineRunCancelPipelineRunParameters,
  TriggerGetTriggersByWorkspaceParameters,
  TriggerCreateOrUpdateTriggerParameters,
  TriggerGetTriggerParameters,
  TriggerDeleteTriggerParameters,
  TriggerSubscribeTriggerToEventsParameters,
  TriggerGetEventSubscriptionStatusParameters,
  TriggerUnsubscribeTriggerFromEventsParameters,
  TriggerStartTriggerParameters,
  TriggerStopTriggerParameters,
  TriggerRunRerunTriggerInstanceParameters,
  TriggerRunCancelTriggerInstanceParameters,
  TriggerRunQueryTriggerRunsByWorkspaceParameters,
  DataFlowCreateOrUpdateDataFlowParameters,
  DataFlowGetDataFlowParameters,
  DataFlowDeleteDataFlowParameters,
  DataFlowRenameDataFlowParameters,
  DataFlowGetDataFlowsByWorkspaceParameters,
  DataFlowDebugSessionCreateDataFlowDebugSessionParameters,
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceParameters,
  DataFlowDebugSessionAddDataFlowParameters,
  DataFlowDebugSessionDeleteDataFlowDebugSessionParameters,
  DataFlowDebugSessionExecuteCommandParameters,
  SqlScriptGetSqlScriptsByWorkspaceParameters,
  SqlScriptCreateOrUpdateSqlScriptParameters,
  SqlScriptGetSqlScriptParameters,
  SqlScriptDeleteSqlScriptParameters,
  SqlScriptRenameSqlScriptParameters,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceParameters,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionParameters,
  SparkJobDefinitionGetSparkJobDefinitionParameters,
  SparkJobDefinitionDeleteSparkJobDefinitionParameters,
  SparkJobDefinitionExecuteSparkJobDefinitionParameters,
  SparkJobDefinitionRenameSparkJobDefinitionParameters,
  SparkJobDefinitionDebugSparkJobDefinitionParameters,
  NotebookGetNotebooksByWorkspaceParameters,
  NotebookGetNotebookSummaryByWorkSpaceParameters,
  NotebookCreateOrUpdateNotebookParameters,
  NotebookGetNotebookParameters,
  NotebookDeleteNotebookParameters,
  NotebookRenameNotebookParameters,
  WorkspaceGetParameters,
  SqlPoolsListParameters,
  SqlPoolsGetParameters,
  BigDataPoolsListParameters,
  BigDataPoolsGetParameters,
  IntegrationRuntimesListParameters,
  IntegrationRuntimesGetParameters,
  LibraryListParameters,
  LibraryFlushParameters,
  LibraryGetOperationResultParameters,
  LibraryDeleteParameters,
  LibraryGetParameters,
  LibraryCreateParameters,
  LibraryAppendParameters,
  WorkspaceGitRepoManagementGetGitHubAccessTokenParameters
} from "./parameters";
import {
  LinkedServiceGetLinkedServicesByWorkspace200Response,
  LinkedServiceGetLinkedServicesByWorkspacedefaultResponse,
  LinkedServiceCreateOrUpdateLinkedService200Response,
  LinkedServiceCreateOrUpdateLinkedService202Response,
  LinkedServiceCreateOrUpdateLinkedServicedefaultResponse,
  LinkedServiceGetLinkedService200Response,
  LinkedServiceGetLinkedService304Response,
  LinkedServiceGetLinkedServicedefaultResponse,
  LinkedServiceDeleteLinkedService200Response,
  LinkedServiceDeleteLinkedService202Response,
  LinkedServiceDeleteLinkedService204Response,
  LinkedServiceDeleteLinkedServicedefaultResponse,
  LinkedServiceRenameLinkedService200Response,
  LinkedServiceRenameLinkedService202Response,
  LinkedServiceRenameLinkedServicedefaultResponse,
  DatasetGetDatasetsByWorkspace200Response,
  DatasetGetDatasetsByWorkspacedefaultResponse,
  DatasetCreateOrUpdateDataset200Response,
  DatasetCreateOrUpdateDataset202Response,
  DatasetCreateOrUpdateDatasetdefaultResponse,
  DatasetGetDataset200Response,
  DatasetGetDataset304Response,
  DatasetGetDatasetdefaultResponse,
  DatasetDeleteDataset200Response,
  DatasetDeleteDataset202Response,
  DatasetDeleteDataset204Response,
  DatasetDeleteDatasetdefaultResponse,
  DatasetRenameDataset200Response,
  DatasetRenameDataset202Response,
  DatasetRenameDatasetdefaultResponse,
  PipelineGetPipelinesByWorkspace200Response,
  PipelineGetPipelinesByWorkspacedefaultResponse,
  PipelineCreateOrUpdatePipeline200Response,
  PipelineCreateOrUpdatePipeline202Response,
  PipelineCreateOrUpdatePipelinedefaultResponse,
  PipelineGetPipeline200Response,
  PipelineGetPipeline304Response,
  PipelineGetPipelinedefaultResponse,
  PipelineDeletePipeline200Response,
  PipelineDeletePipeline202Response,
  PipelineDeletePipeline204Response,
  PipelineDeletePipelinedefaultResponse,
  PipelineRenamePipeline200Response,
  PipelineRenamePipeline202Response,
  PipelineRenamePipelinedefaultResponse,
  PipelineCreatePipelineRun202Response,
  PipelineCreatePipelineRundefaultResponse,
  PipelineRunQueryPipelineRunsByWorkspace200Response,
  PipelineRunQueryPipelineRunsByWorkspacedefaultResponse,
  PipelineRunGetPipelineRun200Response,
  PipelineRunGetPipelineRundefaultResponse,
  PipelineRunQueryActivityRuns200Response,
  PipelineRunQueryActivityRunsdefaultResponse,
  PipelineRunCancelPipelineRun200Response,
  PipelineRunCancelPipelineRundefaultResponse,
  TriggerGetTriggersByWorkspace200Response,
  TriggerGetTriggersByWorkspacedefaultResponse,
  TriggerCreateOrUpdateTrigger200Response,
  TriggerCreateOrUpdateTrigger202Response,
  TriggerCreateOrUpdateTriggerdefaultResponse,
  TriggerGetTrigger200Response,
  TriggerGetTrigger304Response,
  TriggerGetTriggerdefaultResponse,
  TriggerDeleteTrigger200Response,
  TriggerDeleteTrigger202Response,
  TriggerDeleteTrigger204Response,
  TriggerDeleteTriggerdefaultResponse,
  TriggerSubscribeTriggerToEvents200Response,
  TriggerSubscribeTriggerToEvents202Response,
  TriggerSubscribeTriggerToEventsdefaultResponse,
  TriggerGetEventSubscriptionStatus200Response,
  TriggerGetEventSubscriptionStatusdefaultResponse,
  TriggerUnsubscribeTriggerFromEvents200Response,
  TriggerUnsubscribeTriggerFromEvents202Response,
  TriggerUnsubscribeTriggerFromEventsdefaultResponse,
  TriggerStartTrigger200Response,
  TriggerStartTriggerdefaultResponse,
  TriggerStopTrigger200Response,
  TriggerStopTriggerdefaultResponse,
  TriggerRunRerunTriggerInstance200Response,
  TriggerRunRerunTriggerInstancedefaultResponse,
  TriggerRunCancelTriggerInstance200Response,
  TriggerRunCancelTriggerInstancedefaultResponse,
  TriggerRunQueryTriggerRunsByWorkspace200Response,
  TriggerRunQueryTriggerRunsByWorkspacedefaultResponse,
  DataFlowCreateOrUpdateDataFlow200Response,
  DataFlowCreateOrUpdateDataFlow202Response,
  DataFlowCreateOrUpdateDataFlowdefaultResponse,
  DataFlowGetDataFlow200Response,
  DataFlowGetDataFlowdefaultResponse,
  DataFlowDeleteDataFlow200Response,
  DataFlowDeleteDataFlow202Response,
  DataFlowDeleteDataFlow204Response,
  DataFlowDeleteDataFlowdefaultResponse,
  DataFlowRenameDataFlow200Response,
  DataFlowRenameDataFlow202Response,
  DataFlowRenameDataFlowdefaultResponse,
  DataFlowGetDataFlowsByWorkspace200Response,
  DataFlowGetDataFlowsByWorkspacedefaultResponse,
  DataFlowDebugSessionCreateDataFlowDebugSession200Response,
  DataFlowDebugSessionCreateDataFlowDebugSession202Response,
  DataFlowDebugSessionCreateDataFlowDebugSessiondefaultResponse,
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspace200Response,
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspacedefaultResponse,
  DataFlowDebugSessionAddDataFlow200Response,
  DataFlowDebugSessionAddDataFlowdefaultResponse,
  DataFlowDebugSessionDeleteDataFlowDebugSession200Response,
  DataFlowDebugSessionDeleteDataFlowDebugSessiondefaultResponse,
  DataFlowDebugSessionExecuteCommand200Response,
  DataFlowDebugSessionExecuteCommand202Response,
  DataFlowDebugSessionExecuteCommanddefaultResponse,
  SqlScriptGetSqlScriptsByWorkspace200Response,
  SqlScriptGetSqlScriptsByWorkspacedefaultResponse,
  SqlScriptCreateOrUpdateSqlScript200Response,
  SqlScriptCreateOrUpdateSqlScript202Response,
  SqlScriptCreateOrUpdateSqlScriptdefaultResponse,
  SqlScriptGetSqlScript200Response,
  SqlScriptGetSqlScript304Response,
  SqlScriptGetSqlScriptdefaultResponse,
  SqlScriptDeleteSqlScript200Response,
  SqlScriptDeleteSqlScript202Response,
  SqlScriptDeleteSqlScript204Response,
  SqlScriptDeleteSqlScriptdefaultResponse,
  SqlScriptRenameSqlScript200Response,
  SqlScriptRenameSqlScript202Response,
  SqlScriptRenameSqlScriptdefaultResponse,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspace200Response,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspacedefaultResponse,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinition200Response,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinition202Response,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitiondefaultResponse,
  SparkJobDefinitionGetSparkJobDefinition200Response,
  SparkJobDefinitionGetSparkJobDefinition304Response,
  SparkJobDefinitionGetSparkJobDefinitiondefaultResponse,
  SparkJobDefinitionDeleteSparkJobDefinition200Response,
  SparkJobDefinitionDeleteSparkJobDefinition202Response,
  SparkJobDefinitionDeleteSparkJobDefinition204Response,
  SparkJobDefinitionDeleteSparkJobDefinitiondefaultResponse,
  SparkJobDefinitionExecuteSparkJobDefinition200Response,
  SparkJobDefinitionExecuteSparkJobDefinition202Response,
  SparkJobDefinitionExecuteSparkJobDefinitiondefaultResponse,
  SparkJobDefinitionRenameSparkJobDefinition200Response,
  SparkJobDefinitionRenameSparkJobDefinition202Response,
  SparkJobDefinitionRenameSparkJobDefinitiondefaultResponse,
  SparkJobDefinitionDebugSparkJobDefinition200Response,
  SparkJobDefinitionDebugSparkJobDefinition202Response,
  SparkJobDefinitionDebugSparkJobDefinitiondefaultResponse,
  NotebookGetNotebooksByWorkspace200Response,
  NotebookGetNotebooksByWorkspacedefaultResponse,
  NotebookGetNotebookSummaryByWorkSpace200Response,
  NotebookGetNotebookSummaryByWorkSpacedefaultResponse,
  NotebookCreateOrUpdateNotebook200Response,
  NotebookCreateOrUpdateNotebook202Response,
  NotebookCreateOrUpdateNotebookdefaultResponse,
  NotebookGetNotebook200Response,
  NotebookGetNotebook304Response,
  NotebookGetNotebookdefaultResponse,
  NotebookDeleteNotebook200Response,
  NotebookDeleteNotebook202Response,
  NotebookDeleteNotebook204Response,
  NotebookDeleteNotebookdefaultResponse,
  NotebookRenameNotebook200Response,
  NotebookRenameNotebook202Response,
  NotebookRenameNotebookdefaultResponse,
  WorkspaceGet200Response,
  WorkspaceGetdefaultResponse,
  SqlPoolsList200Response,
  SqlPoolsListdefaultResponse,
  SqlPoolsGet200Response,
  SqlPoolsGetdefaultResponse,
  BigDataPoolsList200Response,
  BigDataPoolsListdefaultResponse,
  BigDataPoolsGet200Response,
  BigDataPoolsGetdefaultResponse,
  IntegrationRuntimesList200Response,
  IntegrationRuntimesListdefaultResponse,
  IntegrationRuntimesGet200Response,
  IntegrationRuntimesGetdefaultResponse,
  LibraryList200Response,
  LibraryListdefaultResponse,
  LibraryFlush200Response,
  LibraryFlush202Response,
  LibraryFlushdefaultResponse,
  LibraryGetOperationResult200Response,
  LibraryGetOperationResult202Response,
  LibraryGetOperationResultdefaultResponse,
  LibraryDelete200Response,
  LibraryDelete202Response,
  LibraryDelete409Response,
  LibraryDeletedefaultResponse,
  LibraryGet200Response,
  LibraryGet304Response,
  LibraryGetdefaultResponse,
  LibraryCreate200Response,
  LibraryCreate202Response,
  LibraryCreatedefaultResponse,
  LibraryAppend201Response,
  LibraryAppenddefaultResponse,
  WorkspaceGitRepoManagementGetGitHubAccessToken200Response
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface LinkedServiceGetLinkedServicesByWorkspace {
  /** Lists linked services. */
  get(
    options?: LinkedServiceGetLinkedServicesByWorkspaceParameters
  ): Promise<
    | LinkedServiceGetLinkedServicesByWorkspace200Response
    | LinkedServiceGetLinkedServicesByWorkspacedefaultResponse
  >;
}

export interface LinkedServiceCreateOrUpdateLinkedService {
  /** Creates or updates a linked service. */
  put(
    options: LinkedServiceCreateOrUpdateLinkedServiceParameters
  ): Promise<
    | LinkedServiceCreateOrUpdateLinkedService200Response
    | LinkedServiceCreateOrUpdateLinkedService202Response
    | LinkedServiceCreateOrUpdateLinkedServicedefaultResponse
  >;
  /** Gets a linked service. */
  get(
    options?: LinkedServiceGetLinkedServiceParameters
  ): Promise<
    | LinkedServiceGetLinkedService200Response
    | LinkedServiceGetLinkedService304Response
    | LinkedServiceGetLinkedServicedefaultResponse
  >;
  /** Deletes a linked service. */
  delete(
    options?: LinkedServiceDeleteLinkedServiceParameters
  ): Promise<
    | LinkedServiceDeleteLinkedService200Response
    | LinkedServiceDeleteLinkedService202Response
    | LinkedServiceDeleteLinkedService204Response
    | LinkedServiceDeleteLinkedServicedefaultResponse
  >;
}

export interface LinkedServiceRenameLinkedService {
  /** Renames a linked service. */
  post(
    options: LinkedServiceRenameLinkedServiceParameters
  ): Promise<
    | LinkedServiceRenameLinkedService200Response
    | LinkedServiceRenameLinkedService202Response
    | LinkedServiceRenameLinkedServicedefaultResponse
  >;
}

export interface DatasetGetDatasetsByWorkspace {
  /** Lists datasets. */
  get(
    options?: DatasetGetDatasetsByWorkspaceParameters
  ): Promise<
    | DatasetGetDatasetsByWorkspace200Response
    | DatasetGetDatasetsByWorkspacedefaultResponse
  >;
}

export interface DatasetCreateOrUpdateDataset {
  /** Creates or updates a dataset. */
  put(
    options: DatasetCreateOrUpdateDatasetParameters
  ): Promise<
    | DatasetCreateOrUpdateDataset200Response
    | DatasetCreateOrUpdateDataset202Response
    | DatasetCreateOrUpdateDatasetdefaultResponse
  >;
  /** Gets a dataset. */
  get(
    options?: DatasetGetDatasetParameters
  ): Promise<
    | DatasetGetDataset200Response
    | DatasetGetDataset304Response
    | DatasetGetDatasetdefaultResponse
  >;
  /** Deletes a dataset. */
  delete(
    options?: DatasetDeleteDatasetParameters
  ): Promise<
    | DatasetDeleteDataset200Response
    | DatasetDeleteDataset202Response
    | DatasetDeleteDataset204Response
    | DatasetDeleteDatasetdefaultResponse
  >;
}

export interface DatasetRenameDataset {
  /** Renames a dataset. */
  post(
    options: DatasetRenameDatasetParameters
  ): Promise<
    | DatasetRenameDataset200Response
    | DatasetRenameDataset202Response
    | DatasetRenameDatasetdefaultResponse
  >;
}

export interface PipelineGetPipelinesByWorkspace {
  /** Lists pipelines. */
  get(
    options?: PipelineGetPipelinesByWorkspaceParameters
  ): Promise<
    | PipelineGetPipelinesByWorkspace200Response
    | PipelineGetPipelinesByWorkspacedefaultResponse
  >;
}

export interface PipelineCreateOrUpdatePipeline {
  /** Creates or updates a pipeline. */
  put(
    options: PipelineCreateOrUpdatePipelineParameters
  ): Promise<
    | PipelineCreateOrUpdatePipeline200Response
    | PipelineCreateOrUpdatePipeline202Response
    | PipelineCreateOrUpdatePipelinedefaultResponse
  >;
  /** Gets a pipeline. */
  get(
    options?: PipelineGetPipelineParameters
  ): Promise<
    | PipelineGetPipeline200Response
    | PipelineGetPipeline304Response
    | PipelineGetPipelinedefaultResponse
  >;
  /** Deletes a pipeline. */
  delete(
    options?: PipelineDeletePipelineParameters
  ): Promise<
    | PipelineDeletePipeline200Response
    | PipelineDeletePipeline202Response
    | PipelineDeletePipeline204Response
    | PipelineDeletePipelinedefaultResponse
  >;
}

export interface PipelineRenamePipeline {
  /** Renames a pipeline. */
  post(
    options: PipelineRenamePipelineParameters
  ): Promise<
    | PipelineRenamePipeline200Response
    | PipelineRenamePipeline202Response
    | PipelineRenamePipelinedefaultResponse
  >;
}

export interface PipelineCreatePipelineRun {
  /** Creates a run of a pipeline. */
  post(
    options?: PipelineCreatePipelineRunParameters
  ): Promise<
    | PipelineCreatePipelineRun202Response
    | PipelineCreatePipelineRundefaultResponse
  >;
}

export interface PipelineRunQueryPipelineRunsByWorkspace {
  /** Query pipeline runs in the workspace based on input filter conditions. */
  post(
    options: PipelineRunQueryPipelineRunsByWorkspaceParameters
  ): Promise<
    | PipelineRunQueryPipelineRunsByWorkspace200Response
    | PipelineRunQueryPipelineRunsByWorkspacedefaultResponse
  >;
}

export interface PipelineRunGetPipelineRun {
  /** Get a pipeline run by its run ID. */
  get(
    options?: PipelineRunGetPipelineRunParameters
  ): Promise<
    | PipelineRunGetPipelineRun200Response
    | PipelineRunGetPipelineRundefaultResponse
  >;
}

export interface PipelineRunQueryActivityRuns {
  /** Query activity runs based on input filter conditions. */
  post(
    options: PipelineRunQueryActivityRunsParameters
  ): Promise<
    | PipelineRunQueryActivityRuns200Response
    | PipelineRunQueryActivityRunsdefaultResponse
  >;
}

export interface PipelineRunCancelPipelineRun {
  /** Cancel a pipeline run by its run ID. */
  post(
    options?: PipelineRunCancelPipelineRunParameters
  ): Promise<
    | PipelineRunCancelPipelineRun200Response
    | PipelineRunCancelPipelineRundefaultResponse
  >;
}

export interface TriggerGetTriggersByWorkspace {
  /** Lists triggers. */
  get(
    options?: TriggerGetTriggersByWorkspaceParameters
  ): Promise<
    | TriggerGetTriggersByWorkspace200Response
    | TriggerGetTriggersByWorkspacedefaultResponse
  >;
}

export interface TriggerCreateOrUpdateTrigger {
  /** Creates or updates a trigger. */
  put(
    options: TriggerCreateOrUpdateTriggerParameters
  ): Promise<
    | TriggerCreateOrUpdateTrigger200Response
    | TriggerCreateOrUpdateTrigger202Response
    | TriggerCreateOrUpdateTriggerdefaultResponse
  >;
  /** Gets a trigger. */
  get(
    options?: TriggerGetTriggerParameters
  ): Promise<
    | TriggerGetTrigger200Response
    | TriggerGetTrigger304Response
    | TriggerGetTriggerdefaultResponse
  >;
  /** Deletes a trigger. */
  delete(
    options?: TriggerDeleteTriggerParameters
  ): Promise<
    | TriggerDeleteTrigger200Response
    | TriggerDeleteTrigger202Response
    | TriggerDeleteTrigger204Response
    | TriggerDeleteTriggerdefaultResponse
  >;
}

export interface TriggerSubscribeTriggerToEvents {
  /** Subscribe event trigger to events. */
  post(
    options?: TriggerSubscribeTriggerToEventsParameters
  ): Promise<
    | TriggerSubscribeTriggerToEvents200Response
    | TriggerSubscribeTriggerToEvents202Response
    | TriggerSubscribeTriggerToEventsdefaultResponse
  >;
}

export interface TriggerGetEventSubscriptionStatus {
  /** Get a trigger's event subscription status. */
  post(
    options?: TriggerGetEventSubscriptionStatusParameters
  ): Promise<
    | TriggerGetEventSubscriptionStatus200Response
    | TriggerGetEventSubscriptionStatusdefaultResponse
  >;
}

export interface TriggerUnsubscribeTriggerFromEvents {
  /** Unsubscribe event trigger from events. */
  post(
    options?: TriggerUnsubscribeTriggerFromEventsParameters
  ): Promise<
    | TriggerUnsubscribeTriggerFromEvents200Response
    | TriggerUnsubscribeTriggerFromEvents202Response
    | TriggerUnsubscribeTriggerFromEventsdefaultResponse
  >;
}

export interface TriggerStartTrigger {
  /** Starts a trigger. */
  post(
    options?: TriggerStartTriggerParameters
  ): Promise<
    TriggerStartTrigger200Response | TriggerStartTriggerdefaultResponse
  >;
}

export interface TriggerStopTrigger {
  /** Stops a trigger. */
  post(
    options?: TriggerStopTriggerParameters
  ): Promise<TriggerStopTrigger200Response | TriggerStopTriggerdefaultResponse>;
}

export interface TriggerRunRerunTriggerInstance {
  /** Rerun single trigger instance by runId. */
  post(
    options?: TriggerRunRerunTriggerInstanceParameters
  ): Promise<
    | TriggerRunRerunTriggerInstance200Response
    | TriggerRunRerunTriggerInstancedefaultResponse
  >;
}

export interface TriggerRunCancelTriggerInstance {
  /** Cancel single trigger instance by runId. */
  post(
    options?: TriggerRunCancelTriggerInstanceParameters
  ): Promise<
    | TriggerRunCancelTriggerInstance200Response
    | TriggerRunCancelTriggerInstancedefaultResponse
  >;
}

export interface TriggerRunQueryTriggerRunsByWorkspace {
  /** Query trigger runs. */
  post(
    options: TriggerRunQueryTriggerRunsByWorkspaceParameters
  ): Promise<
    | TriggerRunQueryTriggerRunsByWorkspace200Response
    | TriggerRunQueryTriggerRunsByWorkspacedefaultResponse
  >;
}

export interface DataFlowCreateOrUpdateDataFlow {
  /** Creates or updates a data flow. */
  put(
    options: DataFlowCreateOrUpdateDataFlowParameters
  ): Promise<
    | DataFlowCreateOrUpdateDataFlow200Response
    | DataFlowCreateOrUpdateDataFlow202Response
    | DataFlowCreateOrUpdateDataFlowdefaultResponse
  >;
  /** Gets a data flow. */
  get(
    options?: DataFlowGetDataFlowParameters
  ): Promise<
    DataFlowGetDataFlow200Response | DataFlowGetDataFlowdefaultResponse
  >;
  /** Deletes a data flow. */
  delete(
    options?: DataFlowDeleteDataFlowParameters
  ): Promise<
    | DataFlowDeleteDataFlow200Response
    | DataFlowDeleteDataFlow202Response
    | DataFlowDeleteDataFlow204Response
    | DataFlowDeleteDataFlowdefaultResponse
  >;
}

export interface DataFlowRenameDataFlow {
  /** Renames a dataflow. */
  post(
    options: DataFlowRenameDataFlowParameters
  ): Promise<
    | DataFlowRenameDataFlow200Response
    | DataFlowRenameDataFlow202Response
    | DataFlowRenameDataFlowdefaultResponse
  >;
}

export interface DataFlowGetDataFlowsByWorkspace {
  /** Lists data flows. */
  get(
    options?: DataFlowGetDataFlowsByWorkspaceParameters
  ): Promise<
    | DataFlowGetDataFlowsByWorkspace200Response
    | DataFlowGetDataFlowsByWorkspacedefaultResponse
  >;
}

export interface DataFlowDebugSessionCreateDataFlowDebugSession {
  /** Creates a data flow debug session. */
  post(
    options: DataFlowDebugSessionCreateDataFlowDebugSessionParameters
  ): Promise<
    | DataFlowDebugSessionCreateDataFlowDebugSession200Response
    | DataFlowDebugSessionCreateDataFlowDebugSession202Response
    | DataFlowDebugSessionCreateDataFlowDebugSessiondefaultResponse
  >;
}

export interface DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspace {
  /** Query all active data flow debug sessions. */
  post(
    options?: DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceParameters
  ): Promise<
    | DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspace200Response
    | DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspacedefaultResponse
  >;
}

export interface DataFlowDebugSessionAddDataFlow {
  /** Add a data flow into debug session. */
  post(
    options: DataFlowDebugSessionAddDataFlowParameters
  ): Promise<
    | DataFlowDebugSessionAddDataFlow200Response
    | DataFlowDebugSessionAddDataFlowdefaultResponse
  >;
}

export interface DataFlowDebugSessionDeleteDataFlowDebugSession {
  /** Deletes a data flow debug session. */
  post(
    options: DataFlowDebugSessionDeleteDataFlowDebugSessionParameters
  ): Promise<
    | DataFlowDebugSessionDeleteDataFlowDebugSession200Response
    | DataFlowDebugSessionDeleteDataFlowDebugSessiondefaultResponse
  >;
}

export interface DataFlowDebugSessionExecuteCommand {
  /** Execute a data flow debug command. */
  post(
    options: DataFlowDebugSessionExecuteCommandParameters
  ): Promise<
    | DataFlowDebugSessionExecuteCommand200Response
    | DataFlowDebugSessionExecuteCommand202Response
    | DataFlowDebugSessionExecuteCommanddefaultResponse
  >;
}

export interface SqlScriptGetSqlScriptsByWorkspace {
  /** Lists sql scripts. */
  get(
    options?: SqlScriptGetSqlScriptsByWorkspaceParameters
  ): Promise<
    | SqlScriptGetSqlScriptsByWorkspace200Response
    | SqlScriptGetSqlScriptsByWorkspacedefaultResponse
  >;
}

export interface SqlScriptCreateOrUpdateSqlScript {
  /** Creates or updates a Sql Script. */
  put(
    options: SqlScriptCreateOrUpdateSqlScriptParameters
  ): Promise<
    | SqlScriptCreateOrUpdateSqlScript200Response
    | SqlScriptCreateOrUpdateSqlScript202Response
    | SqlScriptCreateOrUpdateSqlScriptdefaultResponse
  >;
  /** Gets a sql script. */
  get(
    options?: SqlScriptGetSqlScriptParameters
  ): Promise<
    | SqlScriptGetSqlScript200Response
    | SqlScriptGetSqlScript304Response
    | SqlScriptGetSqlScriptdefaultResponse
  >;
  /** Deletes a Sql Script. */
  delete(
    options?: SqlScriptDeleteSqlScriptParameters
  ): Promise<
    | SqlScriptDeleteSqlScript200Response
    | SqlScriptDeleteSqlScript202Response
    | SqlScriptDeleteSqlScript204Response
    | SqlScriptDeleteSqlScriptdefaultResponse
  >;
}

export interface SqlScriptRenameSqlScript {
  /** Renames a sqlScript. */
  post(
    options: SqlScriptRenameSqlScriptParameters
  ): Promise<
    | SqlScriptRenameSqlScript200Response
    | SqlScriptRenameSqlScript202Response
    | SqlScriptRenameSqlScriptdefaultResponse
  >;
}

export interface SparkJobDefinitionGetSparkJobDefinitionsByWorkspace {
  /** Lists spark job definitions. */
  get(
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceParameters
  ): Promise<
    | SparkJobDefinitionGetSparkJobDefinitionsByWorkspace200Response
    | SparkJobDefinitionGetSparkJobDefinitionsByWorkspacedefaultResponse
  >;
}

export interface SparkJobDefinitionCreateOrUpdateSparkJobDefinition {
  /** Creates or updates a Spark Job Definition. */
  put(
    options: SparkJobDefinitionCreateOrUpdateSparkJobDefinitionParameters
  ): Promise<
    | SparkJobDefinitionCreateOrUpdateSparkJobDefinition200Response
    | SparkJobDefinitionCreateOrUpdateSparkJobDefinition202Response
    | SparkJobDefinitionCreateOrUpdateSparkJobDefinitiondefaultResponse
  >;
  /** Gets a Spark Job Definition. */
  get(
    options?: SparkJobDefinitionGetSparkJobDefinitionParameters
  ): Promise<
    | SparkJobDefinitionGetSparkJobDefinition200Response
    | SparkJobDefinitionGetSparkJobDefinition304Response
    | SparkJobDefinitionGetSparkJobDefinitiondefaultResponse
  >;
  /** Deletes a Spark Job Definition. */
  delete(
    options?: SparkJobDefinitionDeleteSparkJobDefinitionParameters
  ): Promise<
    | SparkJobDefinitionDeleteSparkJobDefinition200Response
    | SparkJobDefinitionDeleteSparkJobDefinition202Response
    | SparkJobDefinitionDeleteSparkJobDefinition204Response
    | SparkJobDefinitionDeleteSparkJobDefinitiondefaultResponse
  >;
}

export interface SparkJobDefinitionExecuteSparkJobDefinition {
  /** Executes the spark job definition. */
  post(
    options?: SparkJobDefinitionExecuteSparkJobDefinitionParameters
  ): Promise<
    | SparkJobDefinitionExecuteSparkJobDefinition200Response
    | SparkJobDefinitionExecuteSparkJobDefinition202Response
    | SparkJobDefinitionExecuteSparkJobDefinitiondefaultResponse
  >;
}

export interface SparkJobDefinitionRenameSparkJobDefinition {
  /** Renames a sparkJobDefinition. */
  post(
    options: SparkJobDefinitionRenameSparkJobDefinitionParameters
  ): Promise<
    | SparkJobDefinitionRenameSparkJobDefinition200Response
    | SparkJobDefinitionRenameSparkJobDefinition202Response
    | SparkJobDefinitionRenameSparkJobDefinitiondefaultResponse
  >;
}

export interface SparkJobDefinitionDebugSparkJobDefinition {
  /** Debug the spark job definition. */
  post(
    options: SparkJobDefinitionDebugSparkJobDefinitionParameters
  ): Promise<
    | SparkJobDefinitionDebugSparkJobDefinition200Response
    | SparkJobDefinitionDebugSparkJobDefinition202Response
    | SparkJobDefinitionDebugSparkJobDefinitiondefaultResponse
  >;
}

export interface NotebookGetNotebooksByWorkspace {
  /** Lists Notebooks. */
  get(
    options?: NotebookGetNotebooksByWorkspaceParameters
  ): Promise<
    | NotebookGetNotebooksByWorkspace200Response
    | NotebookGetNotebooksByWorkspacedefaultResponse
  >;
}

export interface NotebookGetNotebookSummaryByWorkSpace {
  /** Lists a summary of Notebooks. */
  get(
    options?: NotebookGetNotebookSummaryByWorkSpaceParameters
  ): Promise<
    | NotebookGetNotebookSummaryByWorkSpace200Response
    | NotebookGetNotebookSummaryByWorkSpacedefaultResponse
  >;
}

export interface NotebookCreateOrUpdateNotebook {
  /** Creates or updates a Note Book. */
  put(
    options: NotebookCreateOrUpdateNotebookParameters
  ): Promise<
    | NotebookCreateOrUpdateNotebook200Response
    | NotebookCreateOrUpdateNotebook202Response
    | NotebookCreateOrUpdateNotebookdefaultResponse
  >;
  /** Gets a Note Book. */
  get(
    options?: NotebookGetNotebookParameters
  ): Promise<
    | NotebookGetNotebook200Response
    | NotebookGetNotebook304Response
    | NotebookGetNotebookdefaultResponse
  >;
  /** Deletes a Note book. */
  delete(
    options?: NotebookDeleteNotebookParameters
  ): Promise<
    | NotebookDeleteNotebook200Response
    | NotebookDeleteNotebook202Response
    | NotebookDeleteNotebook204Response
    | NotebookDeleteNotebookdefaultResponse
  >;
}

export interface NotebookRenameNotebook {
  /** Renames a notebook. */
  post(
    options: NotebookRenameNotebookParameters
  ): Promise<
    | NotebookRenameNotebook200Response
    | NotebookRenameNotebook202Response
    | NotebookRenameNotebookdefaultResponse
  >;
}

export interface WorkspaceGet {
  /** Get Workspace */
  get(
    options?: WorkspaceGetParameters
  ): Promise<WorkspaceGet200Response | WorkspaceGetdefaultResponse>;
}

export interface SqlPoolsList {
  /** List Sql Pools */
  get(
    options?: SqlPoolsListParameters
  ): Promise<SqlPoolsList200Response | SqlPoolsListdefaultResponse>;
}

export interface SqlPoolsGet {
  /** Get Sql Pool */
  get(
    options?: SqlPoolsGetParameters
  ): Promise<SqlPoolsGet200Response | SqlPoolsGetdefaultResponse>;
}

export interface BigDataPoolsList {
  /** List Big Data Pools */
  get(
    options?: BigDataPoolsListParameters
  ): Promise<BigDataPoolsList200Response | BigDataPoolsListdefaultResponse>;
}

export interface BigDataPoolsGet {
  /** Get Big Data Pool */
  get(
    options?: BigDataPoolsGetParameters
  ): Promise<BigDataPoolsGet200Response | BigDataPoolsGetdefaultResponse>;
}

export interface IntegrationRuntimesList {
  /** List Integration Runtimes */
  get(
    options?: IntegrationRuntimesListParameters
  ): Promise<
    IntegrationRuntimesList200Response | IntegrationRuntimesListdefaultResponse
  >;
}

export interface IntegrationRuntimesGet {
  /** Get Integration Runtime */
  get(
    options?: IntegrationRuntimesGetParameters
  ): Promise<
    IntegrationRuntimesGet200Response | IntegrationRuntimesGetdefaultResponse
  >;
}

export interface LibraryList {
  /** Lists Library. */
  get(
    options?: LibraryListParameters
  ): Promise<LibraryList200Response | LibraryListdefaultResponse>;
}

export interface LibraryFlush {
  /** Flush Library */
  post(
    options?: LibraryFlushParameters
  ): Promise<
    | LibraryFlush200Response
    | LibraryFlush202Response
    | LibraryFlushdefaultResponse
  >;
}

export interface LibraryGetOperationResult {
  /** Get Operation result for Library */
  get(
    options?: LibraryGetOperationResultParameters
  ): Promise<
    | LibraryGetOperationResult200Response
    | LibraryGetOperationResult202Response
    | LibraryGetOperationResultdefaultResponse
  >;
}

export interface LibraryDelete {
  /** Delete Library */
  delete(
    options?: LibraryDeleteParameters
  ): Promise<
    | LibraryDelete200Response
    | LibraryDelete202Response
    | LibraryDelete409Response
    | LibraryDeletedefaultResponse
  >;
  /** Get Library */
  get(
    options?: LibraryGetParameters
  ): Promise<
    LibraryGet200Response | LibraryGet304Response | LibraryGetdefaultResponse
  >;
  /** Creates a library with the library name. */
  put(
    options: LibraryCreateParameters | LibraryAppendParameters
  ):
    | Promise<
        | LibraryCreate200Response
        | LibraryCreate202Response
        | LibraryCreatedefaultResponse
      >
    | Promise<LibraryAppend201Response | LibraryAppenddefaultResponse>;
}

export interface WorkspaceGitRepoManagementGetGitHubAccessToken {
  /** Get the GitHub access token. */
  post(
    options: WorkspaceGitRepoManagementGetGitHubAccessTokenParameters
  ): Promise<WorkspaceGitRepoManagementGetGitHubAccessToken200Response>;
}

export interface Routes {
  /** Resource for '/linkedservices' has methods for the following verbs: get */
  (path: "/linkedservices"): LinkedServiceGetLinkedServicesByWorkspace;
  /** Resource for '/linkedservices/\{linkedServiceName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/linkedservices/{linkedServiceName}",
    linkedServiceName: string
  ): LinkedServiceCreateOrUpdateLinkedService;
  /** Resource for '/linkedservices/\{linkedServiceName\}/rename' has methods for the following verbs: post */
  (
    path: "/linkedservices/{linkedServiceName}/rename",
    linkedServiceName: string
  ): LinkedServiceRenameLinkedService;
  /** Resource for '/datasets' has methods for the following verbs: get */
  (path: "/datasets"): DatasetGetDatasetsByWorkspace;
  /** Resource for '/datasets/\{datasetName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/datasets/{datasetName}",
    datasetName: string
  ): DatasetCreateOrUpdateDataset;
  /** Resource for '/datasets/\{datasetName\}/rename' has methods for the following verbs: post */
  (
    path: "/datasets/{datasetName}/rename",
    datasetName: string
  ): DatasetRenameDataset;
  /** Resource for '/pipelines' has methods for the following verbs: get */
  (path: "/pipelines"): PipelineGetPipelinesByWorkspace;
  /** Resource for '/pipelines/\{pipelineName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/pipelines/{pipelineName}",
    pipelineName: string
  ): PipelineCreateOrUpdatePipeline;
  /** Resource for '/pipelines/\{pipelineName\}/rename' has methods for the following verbs: post */
  (
    path: "/pipelines/{pipelineName}/rename",
    pipelineName: string
  ): PipelineRenamePipeline;
  /** Resource for '/pipelines/\{pipelineName\}/createRun' has methods for the following verbs: post */
  (
    path: "/pipelines/{pipelineName}/createRun",
    pipelineName: string
  ): PipelineCreatePipelineRun;
  /** Resource for '/queryPipelineRuns' has methods for the following verbs: post */
  (path: "/queryPipelineRuns"): PipelineRunQueryPipelineRunsByWorkspace;
  /** Resource for '/pipelineruns/\{runId\}' has methods for the following verbs: get */
  (path: "/pipelineruns/{runId}", runId: string): PipelineRunGetPipelineRun;
  /** Resource for '/pipelines/\{pipelineName\}/pipelineruns/\{runId\}/queryActivityruns' has methods for the following verbs: post */
  (
    path: "/pipelines/{pipelineName}/pipelineruns/{runId}/queryActivityruns",
    pipelineName: string,
    runId: string
  ): PipelineRunQueryActivityRuns;
  /** Resource for '/pipelineruns/\{runId\}/cancel' has methods for the following verbs: post */
  (
    path: "/pipelineruns/{runId}/cancel",
    runId: string
  ): PipelineRunCancelPipelineRun;
  /** Resource for '/triggers' has methods for the following verbs: get */
  (path: "/triggers"): TriggerGetTriggersByWorkspace;
  /** Resource for '/triggers/\{triggerName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/triggers/{triggerName}",
    triggerName: string
  ): TriggerCreateOrUpdateTrigger;
  /** Resource for '/triggers/\{triggerName\}/subscribeToEvents' has methods for the following verbs: post */
  (
    path: "/triggers/{triggerName}/subscribeToEvents",
    triggerName: string
  ): TriggerSubscribeTriggerToEvents;
  /** Resource for '/triggers/\{triggerName\}/getEventSubscriptionStatus' has methods for the following verbs: post */
  (
    path: "/triggers/{triggerName}/getEventSubscriptionStatus",
    triggerName: string
  ): TriggerGetEventSubscriptionStatus;
  /** Resource for '/triggers/\{triggerName\}/unsubscribeFromEvents' has methods for the following verbs: post */
  (
    path: "/triggers/{triggerName}/unsubscribeFromEvents",
    triggerName: string
  ): TriggerUnsubscribeTriggerFromEvents;
  /** Resource for '/triggers/\{triggerName\}/start' has methods for the following verbs: post */
  (
    path: "/triggers/{triggerName}/start",
    triggerName: string
  ): TriggerStartTrigger;
  /** Resource for '/triggers/\{triggerName\}/stop' has methods for the following verbs: post */
  (
    path: "/triggers/{triggerName}/stop",
    triggerName: string
  ): TriggerStopTrigger;
  /** Resource for '/triggers/\{triggerName\}/triggerRuns/\{runId\}/rerun' has methods for the following verbs: post */
  (
    path: "/triggers/{triggerName}/triggerRuns/{runId}/rerun",
    triggerName: string,
    runId: string
  ): TriggerRunRerunTriggerInstance;
  /** Resource for '/triggers/\{triggerName\}/triggerRuns/\{runId\}/cancel' has methods for the following verbs: post */
  (
    path: "/triggers/{triggerName}/triggerRuns/{runId}/cancel",
    triggerName: string,
    runId: string
  ): TriggerRunCancelTriggerInstance;
  /** Resource for '/queryTriggerRuns' has methods for the following verbs: post */
  (path: "/queryTriggerRuns"): TriggerRunQueryTriggerRunsByWorkspace;
  /** Resource for '/dataflows/\{dataFlowName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/dataflows/{dataFlowName}",
    dataFlowName: string
  ): DataFlowCreateOrUpdateDataFlow;
  /** Resource for '/dataflows/\{dataFlowName\}/rename' has methods for the following verbs: post */
  (
    path: "/dataflows/{dataFlowName}/rename",
    dataFlowName: string
  ): DataFlowRenameDataFlow;
  /** Resource for '/dataflows' has methods for the following verbs: get */
  (path: "/dataflows"): DataFlowGetDataFlowsByWorkspace;
  /** Resource for '/createDataFlowDebugSession' has methods for the following verbs: post */
  (
    path: "/createDataFlowDebugSession"
  ): DataFlowDebugSessionCreateDataFlowDebugSession;
  /** Resource for '/queryDataFlowDebugSessions' has methods for the following verbs: post */
  (
    path: "/queryDataFlowDebugSessions"
  ): DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspace;
  /** Resource for '/addDataFlowToDebugSession' has methods for the following verbs: post */
  (path: "/addDataFlowToDebugSession"): DataFlowDebugSessionAddDataFlow;
  /** Resource for '/deleteDataFlowDebugSession' has methods for the following verbs: post */
  (
    path: "/deleteDataFlowDebugSession"
  ): DataFlowDebugSessionDeleteDataFlowDebugSession;
  /** Resource for '/executeDataFlowDebugCommand' has methods for the following verbs: post */
  (path: "/executeDataFlowDebugCommand"): DataFlowDebugSessionExecuteCommand;
  /** Resource for '/sqlScripts' has methods for the following verbs: get */
  (path: "/sqlScripts"): SqlScriptGetSqlScriptsByWorkspace;
  /** Resource for '/sqlScripts/\{sqlScriptName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/sqlScripts/{sqlScriptName}",
    sqlScriptName: string
  ): SqlScriptCreateOrUpdateSqlScript;
  /** Resource for '/sqlScripts/\{sqlScriptName\}/rename' has methods for the following verbs: post */
  (
    path: "/sqlScripts/{sqlScriptName}/rename",
    sqlScriptName: string
  ): SqlScriptRenameSqlScript;
  /** Resource for '/sparkJobDefinitions' has methods for the following verbs: get */
  (
    path: "/sparkJobDefinitions"
  ): SparkJobDefinitionGetSparkJobDefinitionsByWorkspace;
  /** Resource for '/sparkJobDefinitions/\{sparkJobDefinitionName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
    sparkJobDefinitionName: string
  ): SparkJobDefinitionCreateOrUpdateSparkJobDefinition;
  /** Resource for '/sparkJobDefinitions/\{sparkJobDefinitionName\}/execute' has methods for the following verbs: post */
  (
    path: "/sparkJobDefinitions/{sparkJobDefinitionName}/execute",
    sparkJobDefinitionName: string
  ): SparkJobDefinitionExecuteSparkJobDefinition;
  /** Resource for '/sparkJobDefinitions/\{sparkJobDefinitionName\}/rename' has methods for the following verbs: post */
  (
    path: "/sparkJobDefinitions/{sparkJobDefinitionName}/rename",
    sparkJobDefinitionName: string
  ): SparkJobDefinitionRenameSparkJobDefinition;
  /** Resource for '/debugSparkJobDefinition' has methods for the following verbs: post */
  (path: "/debugSparkJobDefinition"): SparkJobDefinitionDebugSparkJobDefinition;
  /** Resource for '/notebooks' has methods for the following verbs: get */
  (path: "/notebooks"): NotebookGetNotebooksByWorkspace;
  /** Resource for '/notebooks/summary' has methods for the following verbs: get */
  (path: "/notebooks/summary"): NotebookGetNotebookSummaryByWorkSpace;
  /** Resource for '/notebooks/\{notebookName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/notebooks/{notebookName}",
    notebookName: string
  ): NotebookCreateOrUpdateNotebook;
  /** Resource for '/notebooks/\{notebookName\}/rename' has methods for the following verbs: post */
  (
    path: "/notebooks/{notebookName}/rename",
    notebookName: string
  ): NotebookRenameNotebook;
  /** Resource for '/workspace' has methods for the following verbs: get */
  (path: "/workspace"): WorkspaceGet;
  /** Resource for '/sqlPools' has methods for the following verbs: get */
  (path: "/sqlPools"): SqlPoolsList;
  /** Resource for '/sqlPools/\{sqlPoolName\}' has methods for the following verbs: get */
  (path: "/sqlPools/{sqlPoolName}", sqlPoolName: string): SqlPoolsGet;
  /** Resource for '/bigDataPools' has methods for the following verbs: get */
  (path: "/bigDataPools"): BigDataPoolsList;
  /** Resource for '/bigDataPools/\{bigDataPoolName\}' has methods for the following verbs: get */
  (
    path: "/bigDataPools/{bigDataPoolName}",
    bigDataPoolName: string
  ): BigDataPoolsGet;
  /** Resource for '/integrationRuntimes' has methods for the following verbs: get */
  (path: "/integrationRuntimes"): IntegrationRuntimesList;
  /** Resource for '/integrationRuntimes/\{integrationRuntimeName\}' has methods for the following verbs: get */
  (
    path: "/integrationRuntimes/{integrationRuntimeName}",
    integrationRuntimeName: string
  ): IntegrationRuntimesGet;
  /** Resource for '/libraries' has methods for the following verbs: get */
  (path: "/libraries"): LibraryList;
  /** Resource for '/libraries/\{libraryName\}/flush' has methods for the following verbs: post */
  (path: "/libraries/{libraryName}/flush", libraryName: string): LibraryFlush;
  /** Resource for '/libraryOperationResults/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/libraryOperationResults/{operationId}",
    operationId: string
  ): LibraryGetOperationResult;
  /** Resource for '/libraries/\{libraryName\}' has methods for the following verbs: delete, get, put */
  (path: "/libraries/{libraryName}", libraryName: string): LibraryDelete;
  /** Resource for '/getGitHubAccessToken' has methods for the following verbs: post */
  (
    path: "/getGitHubAccessToken"
  ): WorkspaceGitRepoManagementGetGitHubAccessToken;
}

export type ArtifactsClientRestClient = Client & {
  path: Routes;
};

export default function ArtifactsClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): ArtifactsClientRestClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2019-06-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://dev.azuresynapse.net/.default"]
    }
  };

  return getClient(baseUrl, credentials, options) as ArtifactsClientRestClient;
}
