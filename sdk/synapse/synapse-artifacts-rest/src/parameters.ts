// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  LinkedServiceResource,
  ArtifactRenameRequest,
  DatasetResource,
  PipelineResource,
  RunFilterParameters,
  TriggerResource,
  DataFlowResource,
  CreateDataFlowDebugSessionRequest,
  DataFlowDebugPackage,
  DeleteDataFlowDebugSessionRequest,
  DataFlowDebugCommandRequest,
  SqlScriptResource,
  SparkJobDefinitionResource,
  NotebookResource,
  GitHubAccessTokenRequest
} from "./models";

export type LinkedServiceGetLinkedServicesByWorkspaceParameters = RequestParameters;

export interface LinkedServiceCreateOrUpdateLinkedServiceBodyParam {
  body: LinkedServiceResource;
}

export type LinkedServiceCreateOrUpdateLinkedServiceParameters = RequestParameters &
  LinkedServiceCreateOrUpdateLinkedServiceBodyParam;
export type LinkedServiceGetLinkedServiceParameters = RequestParameters;
export type LinkedServiceDeleteLinkedServiceParameters = RequestParameters;

export interface LinkedServiceRenameLinkedServiceBodyParam {
  body: ArtifactRenameRequest;
}

export type LinkedServiceRenameLinkedServiceParameters = RequestParameters &
  LinkedServiceRenameLinkedServiceBodyParam;
export type DatasetGetDatasetsByWorkspaceParameters = RequestParameters;

export interface DatasetCreateOrUpdateDatasetBodyParam {
  body: DatasetResource;
}

export type DatasetCreateOrUpdateDatasetParameters = RequestParameters &
  DatasetCreateOrUpdateDatasetBodyParam;
export type DatasetGetDatasetParameters = RequestParameters;
export type DatasetDeleteDatasetParameters = RequestParameters;

export interface DatasetRenameDatasetBodyParam {
  body: ArtifactRenameRequest;
}

export type DatasetRenameDatasetParameters = RequestParameters &
  DatasetRenameDatasetBodyParam;
export type PipelineGetPipelinesByWorkspaceParameters = RequestParameters;

export interface PipelineCreateOrUpdatePipelineBodyParam {
  body: PipelineResource;
}

export type PipelineCreateOrUpdatePipelineParameters = RequestParameters &
  PipelineCreateOrUpdatePipelineBodyParam;
export type PipelineGetPipelineParameters = RequestParameters;
export type PipelineDeletePipelineParameters = RequestParameters;

export interface PipelineRenamePipelineBodyParam {
  body: ArtifactRenameRequest;
}

export type PipelineRenamePipelineParameters = RequestParameters &
  PipelineRenamePipelineBodyParam;

export interface PipelineCreatePipelineRunQueryParamProperties {
  /** The pipeline run identifier. If run ID is specified the parameters of the specified run will be used to create a new run. */
  referencePipelineRunId?: string;
  /** Recovery mode flag. If recovery mode is set to true, the specified referenced pipeline run and the new run will be grouped under the same groupId. */
  isRecovery?: boolean;
  /** In recovery mode, the rerun will start from this activity. If not specified, all activities will run. */
  startActivityName?: string;
}

export interface PipelineCreatePipelineRunQueryParam {
  queryParameters?: PipelineCreatePipelineRunQueryParamProperties;
}

export interface PipelineCreatePipelineRunBodyParam {
  body?: Record<string, Record<string, unknown>>;
}

export type PipelineCreatePipelineRunParameters = RequestParameters &
  PipelineCreatePipelineRunQueryParam &
  PipelineCreatePipelineRunBodyParam;

export interface PipelineRunQueryPipelineRunsByWorkspaceBodyParam {
  body: RunFilterParameters;
}

export type PipelineRunQueryPipelineRunsByWorkspaceParameters = RequestParameters &
  PipelineRunQueryPipelineRunsByWorkspaceBodyParam;
export type PipelineRunGetPipelineRunParameters = RequestParameters;

export interface PipelineRunQueryActivityRunsBodyParam {
  body: RunFilterParameters;
}

export type PipelineRunQueryActivityRunsParameters = RequestParameters &
  PipelineRunQueryActivityRunsBodyParam;

export interface PipelineRunCancelPipelineRunQueryParamProperties {
  /** If true, cancel all the Child pipelines that are triggered by the current pipeline. */
  isRecursive?: boolean;
}

export interface PipelineRunCancelPipelineRunQueryParam {
  queryParameters?: PipelineRunCancelPipelineRunQueryParamProperties;
}

export type PipelineRunCancelPipelineRunParameters = RequestParameters &
  PipelineRunCancelPipelineRunQueryParam;
export type TriggerGetTriggersByWorkspaceParameters = RequestParameters;

export interface TriggerCreateOrUpdateTriggerBodyParam {
  body: TriggerResource;
}

export type TriggerCreateOrUpdateTriggerParameters = RequestParameters &
  TriggerCreateOrUpdateTriggerBodyParam;
export type TriggerGetTriggerParameters = RequestParameters;
export type TriggerDeleteTriggerParameters = RequestParameters;
export type TriggerSubscribeTriggerToEventsParameters = RequestParameters;
export type TriggerGetEventSubscriptionStatusParameters = RequestParameters;
export type TriggerUnsubscribeTriggerFromEventsParameters = RequestParameters;
export type TriggerStartTriggerParameters = RequestParameters;
export type TriggerStopTriggerParameters = RequestParameters;
export type TriggerRunRerunTriggerInstanceParameters = RequestParameters;
export type TriggerRunCancelTriggerInstanceParameters = RequestParameters;

export interface TriggerRunQueryTriggerRunsByWorkspaceBodyParam {
  body: RunFilterParameters;
}

export type TriggerRunQueryTriggerRunsByWorkspaceParameters = RequestParameters &
  TriggerRunQueryTriggerRunsByWorkspaceBodyParam;

export interface DataFlowCreateOrUpdateDataFlowBodyParam {
  body: DataFlowResource;
}

export type DataFlowCreateOrUpdateDataFlowParameters = RequestParameters &
  DataFlowCreateOrUpdateDataFlowBodyParam;
export type DataFlowGetDataFlowParameters = RequestParameters;
export type DataFlowDeleteDataFlowParameters = RequestParameters;

export interface DataFlowRenameDataFlowBodyParam {
  body: ArtifactRenameRequest;
}

export type DataFlowRenameDataFlowParameters = RequestParameters &
  DataFlowRenameDataFlowBodyParam;
export type DataFlowGetDataFlowsByWorkspaceParameters = RequestParameters;

export interface DataFlowDebugSessionCreateDataFlowDebugSessionBodyParam {
  body: CreateDataFlowDebugSessionRequest;
}

export type DataFlowDebugSessionCreateDataFlowDebugSessionParameters = RequestParameters &
  DataFlowDebugSessionCreateDataFlowDebugSessionBodyParam;
export type DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceParameters = RequestParameters;

export interface DataFlowDebugSessionAddDataFlowBodyParam {
  body: DataFlowDebugPackage;
}

export type DataFlowDebugSessionAddDataFlowParameters = RequestParameters &
  DataFlowDebugSessionAddDataFlowBodyParam;

export interface DataFlowDebugSessionDeleteDataFlowDebugSessionBodyParam {
  body: DeleteDataFlowDebugSessionRequest;
}

export type DataFlowDebugSessionDeleteDataFlowDebugSessionParameters = RequestParameters &
  DataFlowDebugSessionDeleteDataFlowDebugSessionBodyParam;

export interface DataFlowDebugSessionExecuteCommandBodyParam {
  body: DataFlowDebugCommandRequest;
}

export type DataFlowDebugSessionExecuteCommandParameters = RequestParameters &
  DataFlowDebugSessionExecuteCommandBodyParam;
export type SqlScriptGetSqlScriptsByWorkspaceParameters = RequestParameters;

export interface SqlScriptCreateOrUpdateSqlScriptBodyParam {
  body: SqlScriptResource;
}

export type SqlScriptCreateOrUpdateSqlScriptParameters = RequestParameters &
  SqlScriptCreateOrUpdateSqlScriptBodyParam;
export type SqlScriptGetSqlScriptParameters = RequestParameters;
export type SqlScriptDeleteSqlScriptParameters = RequestParameters;

export interface SqlScriptRenameSqlScriptBodyParam {
  body: ArtifactRenameRequest;
}

export type SqlScriptRenameSqlScriptParameters = RequestParameters &
  SqlScriptRenameSqlScriptBodyParam;
export type SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceParameters = RequestParameters;

export interface SparkJobDefinitionCreateOrUpdateSparkJobDefinitionBodyParam {
  body: SparkJobDefinitionResource;
}

export type SparkJobDefinitionCreateOrUpdateSparkJobDefinitionParameters = RequestParameters &
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionBodyParam;
export type SparkJobDefinitionGetSparkJobDefinitionParameters = RequestParameters;
export type SparkJobDefinitionDeleteSparkJobDefinitionParameters = RequestParameters;
export type SparkJobDefinitionExecuteSparkJobDefinitionParameters = RequestParameters;

export interface SparkJobDefinitionRenameSparkJobDefinitionBodyParam {
  body: ArtifactRenameRequest;
}

export type SparkJobDefinitionRenameSparkJobDefinitionParameters = RequestParameters &
  SparkJobDefinitionRenameSparkJobDefinitionBodyParam;

export interface SparkJobDefinitionDebugSparkJobDefinitionBodyParam {
  body: SparkJobDefinitionResource;
}

export type SparkJobDefinitionDebugSparkJobDefinitionParameters = RequestParameters &
  SparkJobDefinitionDebugSparkJobDefinitionBodyParam;
export type NotebookGetNotebooksByWorkspaceParameters = RequestParameters;
export type NotebookGetNotebookSummaryByWorkSpaceParameters = RequestParameters;

export interface NotebookCreateOrUpdateNotebookBodyParam {
  body: NotebookResource;
}

export type NotebookCreateOrUpdateNotebookParameters = RequestParameters &
  NotebookCreateOrUpdateNotebookBodyParam;
export type NotebookGetNotebookParameters = RequestParameters;
export type NotebookDeleteNotebookParameters = RequestParameters;

export interface NotebookRenameNotebookBodyParam {
  body: ArtifactRenameRequest;
}

export type NotebookRenameNotebookParameters = RequestParameters &
  NotebookRenameNotebookBodyParam;
export type WorkspaceGetParameters = RequestParameters;
export type SqlPoolsListParameters = RequestParameters;
export type SqlPoolsGetParameters = RequestParameters;
export type BigDataPoolsListParameters = RequestParameters;
export type BigDataPoolsGetParameters = RequestParameters;
export type IntegrationRuntimesListParameters = RequestParameters;
export type IntegrationRuntimesGetParameters = RequestParameters;
export type LibraryListParameters = RequestParameters;
export type LibraryFlushParameters = RequestParameters;
export type LibraryGetOperationResultParameters = RequestParameters;
export type LibraryDeleteParameters = RequestParameters;
export type LibraryGetParameters = RequestParameters;
export type LibraryCreateParameters = RequestParameters;

export interface LibraryAppendBodyParam {
  body: string;
}

export type LibraryAppendParameters = RequestParameters &
  LibraryAppendBodyParam;

export interface WorkspaceGitRepoManagementGetGitHubAccessTokenBodyParam {
  body: GitHubAccessTokenRequest;
}

export type WorkspaceGitRepoManagementGetGitHubAccessTokenParameters = RequestParameters &
  WorkspaceGitRepoManagementGetGitHubAccessTokenBodyParam;
