// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LinkedServiceListResponse,
  CloudError,
  LinkedServiceResource,
  DatasetListResponse,
  DatasetResource,
  PipelineListResponse,
  PipelineResource,
  CreateRunResponse,
  PipelineRunsQueryResponse,
  PipelineRun,
  ActivityRunsQueryResponse,
  TriggerListResponse,
  TriggerResource,
  TriggerSubscriptionOperationStatus,
  TriggerRunsQueryResponse,
  DataFlowResource,
  DataFlowListResponse,
  CreateDataFlowDebugSessionResponse,
  QueryDataFlowDebugSessionsResponse,
  AddDataFlowToDebugSessionResponse,
  DataFlowDebugCommandResponse,
  SqlScriptsListResponse,
  SqlScriptResource,
  SparkJobDefinitionsListResponse,
  SparkJobDefinitionResource,
  SparkBatchJob,
  NotebookListResponse,
  NotebookResource,
  Workspace,
  ErrorContract,
  SqlPoolInfoListResult,
  SqlPool,
  BigDataPoolResourceInfoListResult,
  BigDataPoolResourceInfo,
  IntegrationRuntimeListResponse,
  IntegrationRuntimeResource,
  LibraryListResponse,
  LibraryResourceInfo,
  LibraryResource,
  OperationResult,
  GitHubAccessTokenResponse
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";
import { RawHttpHeaders } from "@azure/core-rest-pipeline";

/** Lists linked services. */
export interface LinkedServiceGetLinkedServicesByWorkspace200Response
  extends HttpResponse {
  status: "200";
  body: LinkedServiceListResponse;
}

/** Lists linked services. */
export interface LinkedServiceGetLinkedServicesByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates or updates a linked service. */
export interface LinkedServiceCreateOrUpdateLinkedService200Response
  extends HttpResponse {
  status: "200";
  body: LinkedServiceResource;
}

/** Creates or updates a linked service. */
export interface LinkedServiceCreateOrUpdateLinkedService202Response
  extends HttpResponse {
  status: "202";
}

/** Creates or updates a linked service. */
export interface LinkedServiceCreateOrUpdateLinkedServicedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Gets a linked service. */
export interface LinkedServiceGetLinkedService200Response extends HttpResponse {
  status: "200";
  body: LinkedServiceResource;
}

/** Gets a linked service. */
export interface LinkedServiceGetLinkedService304Response extends HttpResponse {
  status: "304";
}

/** Gets a linked service. */
export interface LinkedServiceGetLinkedServicedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Deletes a linked service. */
export interface LinkedServiceDeleteLinkedService200Response
  extends HttpResponse {
  status: "200";
}

/** Deletes a linked service. */
export interface LinkedServiceDeleteLinkedService202Response
  extends HttpResponse {
  status: "202";
}

/** Deletes a linked service. */
export interface LinkedServiceDeleteLinkedService204Response
  extends HttpResponse {
  status: "204";
}

/** Deletes a linked service. */
export interface LinkedServiceDeleteLinkedServicedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Renames a linked service. */
export interface LinkedServiceRenameLinkedService200Response
  extends HttpResponse {
  status: "200";
}

/** Renames a linked service. */
export interface LinkedServiceRenameLinkedService202Response
  extends HttpResponse {
  status: "202";
}

/** Renames a linked service. */
export interface LinkedServiceRenameLinkedServicedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Lists datasets. */
export interface DatasetGetDatasetsByWorkspace200Response extends HttpResponse {
  status: "200";
  body: DatasetListResponse;
}

/** Lists datasets. */
export interface DatasetGetDatasetsByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates or updates a dataset. */
export interface DatasetCreateOrUpdateDataset200Response extends HttpResponse {
  status: "200";
  body: DatasetResource;
}

/** Creates or updates a dataset. */
export interface DatasetCreateOrUpdateDataset202Response extends HttpResponse {
  status: "202";
}

/** Creates or updates a dataset. */
export interface DatasetCreateOrUpdateDatasetdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Gets a dataset. */
export interface DatasetGetDataset200Response extends HttpResponse {
  status: "200";
  body: DatasetResource;
}

/** Gets a dataset. */
export interface DatasetGetDataset304Response extends HttpResponse {
  status: "304";
}

/** Gets a dataset. */
export interface DatasetGetDatasetdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Deletes a dataset. */
export interface DatasetDeleteDataset200Response extends HttpResponse {
  status: "200";
}

/** Deletes a dataset. */
export interface DatasetDeleteDataset202Response extends HttpResponse {
  status: "202";
}

/** Deletes a dataset. */
export interface DatasetDeleteDataset204Response extends HttpResponse {
  status: "204";
}

/** Deletes a dataset. */
export interface DatasetDeleteDatasetdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Renames a dataset. */
export interface DatasetRenameDataset200Response extends HttpResponse {
  status: "200";
}

/** Renames a dataset. */
export interface DatasetRenameDataset202Response extends HttpResponse {
  status: "202";
}

/** Renames a dataset. */
export interface DatasetRenameDatasetdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Lists pipelines. */
export interface PipelineGetPipelinesByWorkspace200Response
  extends HttpResponse {
  status: "200";
  body: PipelineListResponse;
}

/** Lists pipelines. */
export interface PipelineGetPipelinesByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates or updates a pipeline. */
export interface PipelineCreateOrUpdatePipeline200Response
  extends HttpResponse {
  status: "200";
  body: PipelineResource;
}

/** Creates or updates a pipeline. */
export interface PipelineCreateOrUpdatePipeline202Response
  extends HttpResponse {
  status: "202";
}

/** Creates or updates a pipeline. */
export interface PipelineCreateOrUpdatePipelinedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Gets a pipeline. */
export interface PipelineGetPipeline200Response extends HttpResponse {
  status: "200";
  body: PipelineResource;
}

/** Gets a pipeline. */
export interface PipelineGetPipeline304Response extends HttpResponse {
  status: "304";
}

/** Gets a pipeline. */
export interface PipelineGetPipelinedefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Deletes a pipeline. */
export interface PipelineDeletePipeline200Response extends HttpResponse {
  status: "200";
}

/** Deletes a pipeline. */
export interface PipelineDeletePipeline202Response extends HttpResponse {
  status: "202";
}

/** Deletes a pipeline. */
export interface PipelineDeletePipeline204Response extends HttpResponse {
  status: "204";
}

/** Deletes a pipeline. */
export interface PipelineDeletePipelinedefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Renames a pipeline. */
export interface PipelineRenamePipeline200Response extends HttpResponse {
  status: "200";
}

/** Renames a pipeline. */
export interface PipelineRenamePipeline202Response extends HttpResponse {
  status: "202";
}

/** Renames a pipeline. */
export interface PipelineRenamePipelinedefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates a run of a pipeline. */
export interface PipelineCreatePipelineRun202Response extends HttpResponse {
  status: "202";
  body: CreateRunResponse;
}

/** Creates a run of a pipeline. */
export interface PipelineCreatePipelineRundefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Query pipeline runs in the workspace based on input filter conditions. */
export interface PipelineRunQueryPipelineRunsByWorkspace200Response
  extends HttpResponse {
  status: "200";
  body: PipelineRunsQueryResponse;
}

/** Query pipeline runs in the workspace based on input filter conditions. */
export interface PipelineRunQueryPipelineRunsByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Get a pipeline run by its run ID. */
export interface PipelineRunGetPipelineRun200Response extends HttpResponse {
  status: "200";
  body: PipelineRun;
}

/** Get a pipeline run by its run ID. */
export interface PipelineRunGetPipelineRundefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Query activity runs based on input filter conditions. */
export interface PipelineRunQueryActivityRuns200Response extends HttpResponse {
  status: "200";
  body: ActivityRunsQueryResponse;
}

/** Query activity runs based on input filter conditions. */
export interface PipelineRunQueryActivityRunsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Cancel a pipeline run by its run ID. */
export interface PipelineRunCancelPipelineRun200Response extends HttpResponse {
  status: "200";
}

/** Cancel a pipeline run by its run ID. */
export interface PipelineRunCancelPipelineRundefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Lists triggers. */
export interface TriggerGetTriggersByWorkspace200Response extends HttpResponse {
  status: "200";
  body: TriggerListResponse;
}

/** Lists triggers. */
export interface TriggerGetTriggersByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates or updates a trigger. */
export interface TriggerCreateOrUpdateTrigger200Response extends HttpResponse {
  status: "200";
  body: TriggerResource;
}

/** Creates or updates a trigger. */
export interface TriggerCreateOrUpdateTrigger202Response extends HttpResponse {
  status: "202";
}

/** Creates or updates a trigger. */
export interface TriggerCreateOrUpdateTriggerdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Gets a trigger. */
export interface TriggerGetTrigger200Response extends HttpResponse {
  status: "200";
  body: TriggerResource;
}

/** Gets a trigger. */
export interface TriggerGetTrigger304Response extends HttpResponse {
  status: "304";
}

/** Gets a trigger. */
export interface TriggerGetTriggerdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Deletes a trigger. */
export interface TriggerDeleteTrigger200Response extends HttpResponse {
  status: "200";
}

/** Deletes a trigger. */
export interface TriggerDeleteTrigger202Response extends HttpResponse {
  status: "202";
}

/** Deletes a trigger. */
export interface TriggerDeleteTrigger204Response extends HttpResponse {
  status: "204";
}

/** Deletes a trigger. */
export interface TriggerDeleteTriggerdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Subscribe event trigger to events. */
export interface TriggerSubscribeTriggerToEvents200Response
  extends HttpResponse {
  status: "200";
  body: TriggerSubscriptionOperationStatus;
}

/** Subscribe event trigger to events. */
export interface TriggerSubscribeTriggerToEvents202Response
  extends HttpResponse {
  status: "202";
}

/** Subscribe event trigger to events. */
export interface TriggerSubscribeTriggerToEventsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Get a trigger's event subscription status. */
export interface TriggerGetEventSubscriptionStatus200Response
  extends HttpResponse {
  status: "200";
  body: TriggerSubscriptionOperationStatus;
}

/** Get a trigger's event subscription status. */
export interface TriggerGetEventSubscriptionStatusdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Unsubscribe event trigger from events. */
export interface TriggerUnsubscribeTriggerFromEvents200Response
  extends HttpResponse {
  status: "200";
  body: TriggerSubscriptionOperationStatus;
}

/** Unsubscribe event trigger from events. */
export interface TriggerUnsubscribeTriggerFromEvents202Response
  extends HttpResponse {
  status: "202";
}

/** Unsubscribe event trigger from events. */
export interface TriggerUnsubscribeTriggerFromEventsdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Starts a trigger. */
export interface TriggerStartTrigger200Response extends HttpResponse {
  status: "200";
}

/** Starts a trigger. */
export interface TriggerStartTriggerdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Stops a trigger. */
export interface TriggerStopTrigger200Response extends HttpResponse {
  status: "200";
}

/** Stops a trigger. */
export interface TriggerStopTriggerdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Rerun single trigger instance by runId. */
export interface TriggerRunRerunTriggerInstance200Response
  extends HttpResponse {
  status: "200";
}

/** Rerun single trigger instance by runId. */
export interface TriggerRunRerunTriggerInstancedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Cancel single trigger instance by runId. */
export interface TriggerRunCancelTriggerInstance200Response
  extends HttpResponse {
  status: "200";
}

/** Cancel single trigger instance by runId. */
export interface TriggerRunCancelTriggerInstancedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Query trigger runs. */
export interface TriggerRunQueryTriggerRunsByWorkspace200Response
  extends HttpResponse {
  status: "200";
  body: TriggerRunsQueryResponse;
}

/** Query trigger runs. */
export interface TriggerRunQueryTriggerRunsByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates or updates a data flow. */
export interface DataFlowCreateOrUpdateDataFlow200Response
  extends HttpResponse {
  status: "200";
  body: DataFlowResource;
}

/** Creates or updates a data flow. */
export interface DataFlowCreateOrUpdateDataFlow202Response
  extends HttpResponse {
  status: "202";
}

/** Creates or updates a data flow. */
export interface DataFlowCreateOrUpdateDataFlowdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Gets a data flow. */
export interface DataFlowGetDataFlow200Response extends HttpResponse {
  status: "200";
  body: DataFlowResource;
}

/** Gets a data flow. */
export interface DataFlowGetDataFlowdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Deletes a data flow. */
export interface DataFlowDeleteDataFlow200Response extends HttpResponse {
  status: "200";
}

/** Deletes a data flow. */
export interface DataFlowDeleteDataFlow202Response extends HttpResponse {
  status: "202";
}

/** Deletes a data flow. */
export interface DataFlowDeleteDataFlow204Response extends HttpResponse {
  status: "204";
}

/** Deletes a data flow. */
export interface DataFlowDeleteDataFlowdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Renames a dataflow. */
export interface DataFlowRenameDataFlow200Response extends HttpResponse {
  status: "200";
}

/** Renames a dataflow. */
export interface DataFlowRenameDataFlow202Response extends HttpResponse {
  status: "202";
}

/** Renames a dataflow. */
export interface DataFlowRenameDataFlowdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Lists data flows. */
export interface DataFlowGetDataFlowsByWorkspace200Response
  extends HttpResponse {
  status: "200";
  body: DataFlowListResponse;
}

/** Lists data flows. */
export interface DataFlowGetDataFlowsByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates a data flow debug session. */
export interface DataFlowDebugSessionCreateDataFlowDebugSession200Response
  extends HttpResponse {
  status: "200";
  body: CreateDataFlowDebugSessionResponse;
}

export interface DataFlowDebugSessionCreateDataFlowDebugSession202Headers {
  /** URI to poll for asynchronous operation status. */
  location?: string;
}

/** Creates a data flow debug session. */
export interface DataFlowDebugSessionCreateDataFlowDebugSession202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders &
    DataFlowDebugSessionCreateDataFlowDebugSession202Headers;
}

/** Creates a data flow debug session. */
export interface DataFlowDebugSessionCreateDataFlowDebugSessiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Query all active data flow debug sessions. */
export interface DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspace200Response
  extends HttpResponse {
  status: "200";
  body: QueryDataFlowDebugSessionsResponse;
}

/** Query all active data flow debug sessions. */
export interface DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Add a data flow into debug session. */
export interface DataFlowDebugSessionAddDataFlow200Response
  extends HttpResponse {
  status: "200";
  body: AddDataFlowToDebugSessionResponse;
}

/** Add a data flow into debug session. */
export interface DataFlowDebugSessionAddDataFlowdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Deletes a data flow debug session. */
export interface DataFlowDebugSessionDeleteDataFlowDebugSession200Response
  extends HttpResponse {
  status: "200";
}

/** Deletes a data flow debug session. */
export interface DataFlowDebugSessionDeleteDataFlowDebugSessiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Execute a data flow debug command. */
export interface DataFlowDebugSessionExecuteCommand200Response
  extends HttpResponse {
  status: "200";
  body: DataFlowDebugCommandResponse;
}

export interface DataFlowDebugSessionExecuteCommand202Headers {
  /** URI to poll for asynchronous operation status. */
  location?: string;
}

/** Execute a data flow debug command. */
export interface DataFlowDebugSessionExecuteCommand202Response
  extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & DataFlowDebugSessionExecuteCommand202Headers;
}

/** Execute a data flow debug command. */
export interface DataFlowDebugSessionExecuteCommanddefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Lists sql scripts. */
export interface SqlScriptGetSqlScriptsByWorkspace200Response
  extends HttpResponse {
  status: "200";
  body: SqlScriptsListResponse;
}

/** Lists sql scripts. */
export interface SqlScriptGetSqlScriptsByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates or updates a Sql Script. */
export interface SqlScriptCreateOrUpdateSqlScript200Response
  extends HttpResponse {
  status: "200";
  body: SqlScriptResource;
}

/** Creates or updates a Sql Script. */
export interface SqlScriptCreateOrUpdateSqlScript202Response
  extends HttpResponse {
  status: "202";
}

/** Creates or updates a Sql Script. */
export interface SqlScriptCreateOrUpdateSqlScriptdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Gets a sql script. */
export interface SqlScriptGetSqlScript200Response extends HttpResponse {
  status: "200";
  body: SqlScriptResource;
}

/** Gets a sql script. */
export interface SqlScriptGetSqlScript304Response extends HttpResponse {
  status: "304";
}

/** Gets a sql script. */
export interface SqlScriptGetSqlScriptdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Deletes a Sql Script. */
export interface SqlScriptDeleteSqlScript200Response extends HttpResponse {
  status: "200";
}

/** Deletes a Sql Script. */
export interface SqlScriptDeleteSqlScript202Response extends HttpResponse {
  status: "202";
}

/** Deletes a Sql Script. */
export interface SqlScriptDeleteSqlScript204Response extends HttpResponse {
  status: "204";
}

/** Deletes a Sql Script. */
export interface SqlScriptDeleteSqlScriptdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Renames a sqlScript. */
export interface SqlScriptRenameSqlScript200Response extends HttpResponse {
  status: "200";
}

/** Renames a sqlScript. */
export interface SqlScriptRenameSqlScript202Response extends HttpResponse {
  status: "202";
}

/** Renames a sqlScript. */
export interface SqlScriptRenameSqlScriptdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Lists spark job definitions. */
export interface SparkJobDefinitionGetSparkJobDefinitionsByWorkspace200Response
  extends HttpResponse {
  status: "200";
  body: SparkJobDefinitionsListResponse;
}

/** Lists spark job definitions. */
export interface SparkJobDefinitionGetSparkJobDefinitionsByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates or updates a Spark Job Definition. */
export interface SparkJobDefinitionCreateOrUpdateSparkJobDefinition200Response
  extends HttpResponse {
  status: "200";
  body: SparkJobDefinitionResource;
}

/** Creates or updates a Spark Job Definition. */
export interface SparkJobDefinitionCreateOrUpdateSparkJobDefinition202Response
  extends HttpResponse {
  status: "202";
}

/** Creates or updates a Spark Job Definition. */
export interface SparkJobDefinitionCreateOrUpdateSparkJobDefinitiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Gets a Spark Job Definition. */
export interface SparkJobDefinitionGetSparkJobDefinition200Response
  extends HttpResponse {
  status: "200";
  body: SparkJobDefinitionResource;
}

/** Gets a Spark Job Definition. */
export interface SparkJobDefinitionGetSparkJobDefinition304Response
  extends HttpResponse {
  status: "304";
}

/** Gets a Spark Job Definition. */
export interface SparkJobDefinitionGetSparkJobDefinitiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Deletes a Spark Job Definition. */
export interface SparkJobDefinitionDeleteSparkJobDefinition200Response
  extends HttpResponse {
  status: "200";
}

/** Deletes a Spark Job Definition. */
export interface SparkJobDefinitionDeleteSparkJobDefinition202Response
  extends HttpResponse {
  status: "202";
}

/** Deletes a Spark Job Definition. */
export interface SparkJobDefinitionDeleteSparkJobDefinition204Response
  extends HttpResponse {
  status: "204";
}

/** Deletes a Spark Job Definition. */
export interface SparkJobDefinitionDeleteSparkJobDefinitiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Executes the spark job definition. */
export interface SparkJobDefinitionExecuteSparkJobDefinition200Response
  extends HttpResponse {
  status: "200";
  body: SparkBatchJob;
}

/** Executes the spark job definition. */
export interface SparkJobDefinitionExecuteSparkJobDefinition202Response
  extends HttpResponse {
  status: "202";
  body: SparkBatchJob;
}

/** Executes the spark job definition. */
export interface SparkJobDefinitionExecuteSparkJobDefinitiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Renames a sparkJobDefinition. */
export interface SparkJobDefinitionRenameSparkJobDefinition200Response
  extends HttpResponse {
  status: "200";
}

/** Renames a sparkJobDefinition. */
export interface SparkJobDefinitionRenameSparkJobDefinition202Response
  extends HttpResponse {
  status: "202";
}

/** Renames a sparkJobDefinition. */
export interface SparkJobDefinitionRenameSparkJobDefinitiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Debug the spark job definition. */
export interface SparkJobDefinitionDebugSparkJobDefinition200Response
  extends HttpResponse {
  status: "200";
  body: SparkBatchJob;
}

/** Debug the spark job definition. */
export interface SparkJobDefinitionDebugSparkJobDefinition202Response
  extends HttpResponse {
  status: "202";
  body: SparkBatchJob;
}

/** Debug the spark job definition. */
export interface SparkJobDefinitionDebugSparkJobDefinitiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Lists Notebooks. */
export interface NotebookGetNotebooksByWorkspace200Response
  extends HttpResponse {
  status: "200";
  body: NotebookListResponse;
}

/** Lists Notebooks. */
export interface NotebookGetNotebooksByWorkspacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Lists a summary of Notebooks. */
export interface NotebookGetNotebookSummaryByWorkSpace200Response
  extends HttpResponse {
  status: "200";
  body: NotebookListResponse;
}

/** Lists a summary of Notebooks. */
export interface NotebookGetNotebookSummaryByWorkSpacedefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates or updates a Note Book. */
export interface NotebookCreateOrUpdateNotebook200Response
  extends HttpResponse {
  status: "200";
  body: NotebookResource;
}

/** Creates or updates a Note Book. */
export interface NotebookCreateOrUpdateNotebook202Response
  extends HttpResponse {
  status: "202";
}

/** Creates or updates a Note Book. */
export interface NotebookCreateOrUpdateNotebookdefaultResponse
  extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Gets a Note Book. */
export interface NotebookGetNotebook200Response extends HttpResponse {
  status: "200";
  body: NotebookResource;
}

/** Gets a Note Book. */
export interface NotebookGetNotebook304Response extends HttpResponse {
  status: "304";
}

/** Gets a Note Book. */
export interface NotebookGetNotebookdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Deletes a Note book. */
export interface NotebookDeleteNotebook200Response extends HttpResponse {
  status: "200";
}

/** Deletes a Note book. */
export interface NotebookDeleteNotebook202Response extends HttpResponse {
  status: "202";
}

/** Deletes a Note book. */
export interface NotebookDeleteNotebook204Response extends HttpResponse {
  status: "204";
}

/** Deletes a Note book. */
export interface NotebookDeleteNotebookdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Renames a notebook. */
export interface NotebookRenameNotebook200Response extends HttpResponse {
  status: "200";
}

/** Renames a notebook. */
export interface NotebookRenameNotebook202Response extends HttpResponse {
  status: "202";
}

/** Renames a notebook. */
export interface NotebookRenameNotebookdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Get Workspace */
export interface WorkspaceGet200Response extends HttpResponse {
  status: "200";
  body: Workspace;
}

/** Get Workspace */
export interface WorkspaceGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** List Sql Pools */
export interface SqlPoolsList200Response extends HttpResponse {
  status: "200";
  body: SqlPoolInfoListResult;
}

/** List Sql Pools */
export interface SqlPoolsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Get Sql Pool */
export interface SqlPoolsGet200Response extends HttpResponse {
  status: "200";
  body: SqlPool;
}

/** Get Sql Pool */
export interface SqlPoolsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** List Big Data Pools */
export interface BigDataPoolsList200Response extends HttpResponse {
  status: "200";
  body: BigDataPoolResourceInfoListResult;
}

/** List Big Data Pools */
export interface BigDataPoolsListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Get Big Data Pool */
export interface BigDataPoolsGet200Response extends HttpResponse {
  status: "200";
  body: BigDataPoolResourceInfo;
}

/** Get Big Data Pool */
export interface BigDataPoolsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** List Integration Runtimes */
export interface IntegrationRuntimesList200Response extends HttpResponse {
  status: "200";
  body: IntegrationRuntimeListResponse;
}

/** List Integration Runtimes */
export interface IntegrationRuntimesListdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Get Integration Runtime */
export interface IntegrationRuntimesGet200Response extends HttpResponse {
  status: "200";
  body: IntegrationRuntimeResource;
}

/** Get Integration Runtime */
export interface IntegrationRuntimesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorContract;
}

/** Lists Library. */
export interface LibraryList200Response extends HttpResponse {
  status: "200";
  body: LibraryListResponse;
}

/** Lists Library. */
export interface LibraryListdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Flush Library */
export interface LibraryFlush200Response extends HttpResponse {
  status: "200";
}

/** Flush Library */
export interface LibraryFlush202Response extends HttpResponse {
  status: "202";
  body: LibraryResourceInfo;
}

/** Flush Library */
export interface LibraryFlushdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Get Operation result for Library */
export interface LibraryGetOperationResult200Response extends HttpResponse {
  status: "200";
  body: LibraryResource;
}

/** Get Operation result for Library */
export interface LibraryGetOperationResult202Response extends HttpResponse {
  status: "202";
  body: OperationResult;
}

/** Get Operation result for Library */
export interface LibraryGetOperationResultdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Delete Library */
export interface LibraryDelete200Response extends HttpResponse {
  status: "200";
}

/** Delete Library */
export interface LibraryDelete202Response extends HttpResponse {
  status: "202";
  body: LibraryResourceInfo;
}

/** Delete Library */
export interface LibraryDelete409Response extends HttpResponse {
  status: "409";
}

/** Delete Library */
export interface LibraryDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Get Library */
export interface LibraryGet200Response extends HttpResponse {
  status: "200";
  body: LibraryResource;
}

/** Get Library */
export interface LibraryGet304Response extends HttpResponse {
  status: "304";
}

/** Get Library */
export interface LibraryGetdefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Creates a library with the library name. */
export interface LibraryCreate200Response extends HttpResponse {
  status: "200";
}

/** Creates a library with the library name. */
export interface LibraryCreate202Response extends HttpResponse {
  status: "202";
  body: LibraryResourceInfo;
}

/** Creates a library with the library name. */
export interface LibraryCreatedefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Append the content to the library resource created using the create operation. The maximum content size is 4MiB. Content larger than 4MiB must be appended in 4MiB chunks */
export interface LibraryAppend201Response extends HttpResponse {
  status: "201";
}

/** Append the content to the library resource created using the create operation. The maximum content size is 4MiB. Content larger than 4MiB must be appended in 4MiB chunks */
export interface LibraryAppenddefaultResponse extends HttpResponse {
  status: "500";
  body: CloudError;
}

/** Get the GitHub access token. */
export interface WorkspaceGitRepoManagementGetGitHubAccessToken200Response
  extends HttpResponse {
  status: "200";
  body: GitHubAccessTokenResponse;
}
