// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, StreamableMethod } from "@azure-rest/core-client";
import {
  CancelRunParameters,
  CancelVectorStoreFileBatchParameters,
  CreateAgentParameters,
  CreateBodyParam,
  CreateMessageParameters,
  CreateOrReplaceScheduleParameters,
  CreateRunParameters,
  CreateThreadAndRunParameters,
  CreateThreadParameters,
  CreateVectorStoreFileBatchParameters,
  CreateVectorStoreFileParameters,
  CreateVectorStoreParameters,
  DeleteAgentParameters,
  DeleteFileParameters,
  DeleteThreadParameters,
  DeleteVectorStoreFileParameters,
  DeleteVectorStoreParameters,
  DisableScheduleParameters,
  GetAgentParameters,
  GetAppInsightsParameters,
  GetConnectionParameters,
  GetConnectionWithSecretsParameters,
  GetFileContentParameters,
  GetFileParameters,
  GetMessageParameters,
  GetParameters,
  GetRunParameters,
  GetRunStepParameters,
  GetScheduleParameters,
  GetThreadParameters,
  GetVectorStoreFileBatchParameters,
  GetVectorStoreFileParameters,
  GetVectorStoreParameters,
  GetWorkspaceParameters,
  ListAgentsParameters,
  ListConnectionsParameters,
  ListFilesParameters,
  ListMessagesParameters,
  ListParameters,
  ListRunsParameters,
  ListRunStepsParameters,
  ListScheduleParameters,
  ListVectorStoreFileBatchFilesParameters,
  ListVectorStoreFilesParameters,
  ListVectorStoresParameters,
  ModifyVectorStoreParameters,
  SubmitToolOutputsToRunParameters,
  UpdateAgentParameters,
  UpdateMessageParameters,
  UpdateParameters,
  UpdateRunParameters,
  UpdateThreadParameters,
  UploadFileParameters,
} from "./parameters.js";
import {
  CancelRun200Response,
  CancelRunDefaultResponse,
  CancelVectorStoreFileBatch200Response,
  CancelVectorStoreFileBatchDefaultResponse,
  Create201Response,
  CreateAgent200Response,
  CreateAgentDefaultResponse,
  CreateMessage200Response,
  CreateMessageDefaultResponse,
  CreateOrReplaceSchedule200Response,
  CreateOrReplaceSchedule201Response,
  CreateOrReplaceScheduleDefaultResponse,
  CreateRun200Response,
  CreateRunDefaultResponse,
  CreateThread200Response,
  CreateThreadAndRun200Response,
  CreateThreadAndRunDefaultResponse,
  CreateThreadDefaultResponse,
  CreateVectorStore200Response,
  CreateVectorStoreDefaultResponse,
  CreateVectorStoreFile200Response,
  CreateVectorStoreFileBatch200Response,
  CreateVectorStoreFileBatchDefaultResponse,
  CreateVectorStoreFileDefaultResponse,
  DeleteAgent200Response,
  DeleteAgentDefaultResponse,
  DeleteFile200Response,
  DeleteFileDefaultResponse,
  DeleteThread200Response,
  DeleteThreadDefaultResponse,
  DeleteVectorStore200Response,
  DeleteVectorStoreDefaultResponse,
  DeleteVectorStoreFile200Response,
  DeleteVectorStoreFileDefaultResponse,
  DisableSchedule204Response,
  DisableScheduleDefaultResponse,
  Get200Response,
  GetAgent200Response,
  GetAgentDefaultResponse,
  GetAppInsights200Response,
  GetAppInsightsDefaultResponse,
  GetConnection200Response,
  GetConnectionDefaultResponse,
  GetConnectionWithSecrets200Response,
  GetConnectionWithSecretsDefaultResponse,
  GetDefaultResponse,
  GetFile200Response,
  GetFileContent200Response,
  GetFileContentDefaultResponse,
  GetFileDefaultResponse,
  GetMessage200Response,
  GetMessageDefaultResponse,
  GetRun200Response,
  GetRunDefaultResponse,
  GetRunStep200Response,
  GetRunStepDefaultResponse,
  GetSchedule200Response,
  GetScheduleDefaultResponse,
  GetThread200Response,
  GetThreadDefaultResponse,
  GetVectorStore200Response,
  GetVectorStoreDefaultResponse,
  GetVectorStoreFile200Response,
  GetVectorStoreFileBatch200Response,
  GetVectorStoreFileBatchDefaultResponse,
  GetVectorStoreFileDefaultResponse,
  GetWorkspace200Response,
  GetWorkspaceDefaultResponse,
  List200Response,
  ListAgents200Response,
  ListAgentsDefaultResponse,
  ListConnections200Response,
  ListConnectionsDefaultResponse,
  ListDefaultResponse,
  ListFiles200Response,
  ListFilesDefaultResponse,
  ListMessages200Response,
  ListMessagesDefaultResponse,
  ListRuns200Response,
  ListRunsDefaultResponse,
  ListRunSteps200Response,
  ListRunStepsDefaultResponse,
  ListSchedule200Response,
  ListScheduleDefaultResponse,
  ListVectorStoreFileBatchFiles200Response,
  ListVectorStoreFileBatchFilesDefaultResponse,
  ListVectorStoreFiles200Response,
  ListVectorStoreFilesDefaultResponse,
  ListVectorStores200Response,
  ListVectorStoresDefaultResponse,
  ModifyVectorStore200Response,
  ModifyVectorStoreDefaultResponse,
  SubmitToolOutputsToRun200Response,
  SubmitToolOutputsToRunDefaultResponse,
  Update200Response,
  UpdateAgent200Response,
  UpdateAgentDefaultResponse,
  UpdateDefaultResponse,
  UpdateMessage200Response,
  UpdateMessageDefaultResponse,
  UpdateRun200Response,
  UpdateRunDefaultResponse,
  UpdateThread200Response,
  UpdateThreadDefaultResponse,
  UploadFile200Response,
  UploadFileDefaultResponse,
} from "./responses.js";

export interface CreateAgent {
  /** Creates a new agent. */
  post(
    options: CreateAgentParameters,
  ): StreamableMethod<CreateAgent200Response | CreateAgentDefaultResponse>;
  /** Gets a list of agents that were previously created. */
  get(
    options?: ListAgentsParameters,
  ): StreamableMethod<ListAgents200Response | ListAgentsDefaultResponse>;
}

export interface GetAgent {
  /** Retrieves an existing agent. */
  get(
    options?: GetAgentParameters,
  ): StreamableMethod<GetAgent200Response | GetAgentDefaultResponse>;
  /** Modifies an existing agent. */
  post(
    options: UpdateAgentParameters,
  ): StreamableMethod<UpdateAgent200Response | UpdateAgentDefaultResponse>;
  /** Deletes an agent. */
  delete(
    options?: DeleteAgentParameters,
  ): StreamableMethod<DeleteAgent200Response | DeleteAgentDefaultResponse>;
}

export interface CreateThread {
  /** Creates a new thread. Threads contain messages and can be run by agents. */
  post(
    options: CreateThreadParameters,
  ): StreamableMethod<CreateThread200Response | CreateThreadDefaultResponse>;
}

export interface GetThread {
  /** Gets information about an existing thread. */
  get(
    options?: GetThreadParameters,
  ): StreamableMethod<GetThread200Response | GetThreadDefaultResponse>;
  /** Modifies an existing thread. */
  post(
    options: UpdateThreadParameters,
  ): StreamableMethod<UpdateThread200Response | UpdateThreadDefaultResponse>;
  /** Deletes an existing thread. */
  delete(
    options?: DeleteThreadParameters,
  ): StreamableMethod<DeleteThread200Response | DeleteThreadDefaultResponse>;
}

export interface CreateMessage {
  /** Creates a new message on a specified thread. */
  post(
    options: CreateMessageParameters,
  ): StreamableMethod<CreateMessage200Response | CreateMessageDefaultResponse>;
  /** Gets a list of messages that exist on a thread. */
  get(
    options?: ListMessagesParameters,
  ): StreamableMethod<ListMessages200Response | ListMessagesDefaultResponse>;
}

export interface GetMessage {
  /** Gets an existing message from an existing thread. */
  get(
    options?: GetMessageParameters,
  ): StreamableMethod<GetMessage200Response | GetMessageDefaultResponse>;
  /** Modifies an existing message on an existing thread. */
  post(
    options: UpdateMessageParameters,
  ): StreamableMethod<UpdateMessage200Response | UpdateMessageDefaultResponse>;
}

export interface CreateRun {
  /** Creates a new run for an agent thread. */
  post(
    options: CreateRunParameters,
  ): StreamableMethod<CreateRun200Response | CreateRunDefaultResponse>;
  /** Gets a list of runs for a specified thread. */
  get(
    options?: ListRunsParameters,
  ): StreamableMethod<ListRuns200Response | ListRunsDefaultResponse>;
}

export interface GetRun {
  /** Gets an existing run from an existing thread. */
  get(
    options?: GetRunParameters,
  ): StreamableMethod<GetRun200Response | GetRunDefaultResponse>;
  /** Modifies an existing thread run. */
  post(
    options: UpdateRunParameters,
  ): StreamableMethod<UpdateRun200Response | UpdateRunDefaultResponse>;
}

export interface SubmitToolOutputsToRun {
  /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
  post(
    options: SubmitToolOutputsToRunParameters,
  ): StreamableMethod<
    SubmitToolOutputsToRun200Response | SubmitToolOutputsToRunDefaultResponse
  >;
}

export interface CancelRun {
  /** Cancels a run of an in progress thread. */
  post(
    options?: CancelRunParameters,
  ): StreamableMethod<CancelRun200Response | CancelRunDefaultResponse>;
}

export interface CreateThreadAndRun {
  /** Creates a new agent thread and immediately starts a run using that new thread. */
  post(
    options: CreateThreadAndRunParameters,
  ): StreamableMethod<
    CreateThreadAndRun200Response | CreateThreadAndRunDefaultResponse
  >;
}

export interface GetRunStep {
  /** Gets a single run step from a thread run. */
  get(
    options?: GetRunStepParameters,
  ): StreamableMethod<GetRunStep200Response | GetRunStepDefaultResponse>;
}

export interface ListRunSteps {
  /** Gets a list of run steps from a thread run. */
  get(
    options?: ListRunStepsParameters,
  ): StreamableMethod<ListRunSteps200Response | ListRunStepsDefaultResponse>;
}

export interface ListFiles {
  /** Gets a list of previously uploaded files. */
  get(
    options?: ListFilesParameters,
  ): StreamableMethod<ListFiles200Response | ListFilesDefaultResponse>;
  /** Uploads a file for use by other operations. */
  post(
    options: UploadFileParameters,
  ): StreamableMethod<UploadFile200Response | UploadFileDefaultResponse>;
}

export interface DeleteFile {
  /** Delete a previously uploaded file. */
  delete(
    options?: DeleteFileParameters,
  ): StreamableMethod<DeleteFile200Response | DeleteFileDefaultResponse>;
  /** Returns information about a specific file. Does not retrieve file content. */
  get(
    options?: GetFileParameters,
  ): StreamableMethod<GetFile200Response | GetFileDefaultResponse>;
}

export interface GetFileContent {
  /** Retrieves the raw content of a specific file. */
  get(
    options?: GetFileContentParameters,
  ): StreamableMethod<
    GetFileContent200Response | GetFileContentDefaultResponse
  >;
}

export interface ListVectorStores {
  /** Returns a list of vector stores. */
  get(
    options?: ListVectorStoresParameters,
  ): StreamableMethod<
    ListVectorStores200Response | ListVectorStoresDefaultResponse
  >;
  /** Creates a vector store. */
  post(
    options: CreateVectorStoreParameters,
  ): StreamableMethod<
    CreateVectorStore200Response | CreateVectorStoreDefaultResponse
  >;
}

export interface GetVectorStore {
  /** Returns the vector store object matching the specified ID. */
  get(
    options?: GetVectorStoreParameters,
  ): StreamableMethod<
    GetVectorStore200Response | GetVectorStoreDefaultResponse
  >;
  /** The ID of the vector store to modify. */
  post(
    options: ModifyVectorStoreParameters,
  ): StreamableMethod<
    ModifyVectorStore200Response | ModifyVectorStoreDefaultResponse
  >;
  /** Deletes the vector store object matching the specified ID. */
  delete(
    options?: DeleteVectorStoreParameters,
  ): StreamableMethod<
    DeleteVectorStore200Response | DeleteVectorStoreDefaultResponse
  >;
}

export interface ListVectorStoreFiles {
  /** Returns a list of vector store files. */
  get(
    options?: ListVectorStoreFilesParameters,
  ): StreamableMethod<
    ListVectorStoreFiles200Response | ListVectorStoreFilesDefaultResponse
  >;
  /** Create a vector store file by attaching a file to a vector store. */
  post(
    options: CreateVectorStoreFileParameters,
  ): StreamableMethod<
    CreateVectorStoreFile200Response | CreateVectorStoreFileDefaultResponse
  >;
}

export interface GetVectorStoreFile {
  /** Retrieves a vector store file. */
  get(
    options?: GetVectorStoreFileParameters,
  ): StreamableMethod<
    GetVectorStoreFile200Response | GetVectorStoreFileDefaultResponse
  >;
  /**
   * Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted.
   * To delete the file, use the delete file endpoint.
   */
  delete(
    options?: DeleteVectorStoreFileParameters,
  ): StreamableMethod<
    DeleteVectorStoreFile200Response | DeleteVectorStoreFileDefaultResponse
  >;
}

export interface CreateVectorStoreFileBatch {
  /** Create a vector store file batch. */
  post(
    options: CreateVectorStoreFileBatchParameters,
  ): StreamableMethod<
    | CreateVectorStoreFileBatch200Response
    | CreateVectorStoreFileBatchDefaultResponse
  >;
}

export interface GetVectorStoreFileBatch {
  /** Retrieve a vector store file batch. */
  get(
    options?: GetVectorStoreFileBatchParameters,
  ): StreamableMethod<
    GetVectorStoreFileBatch200Response | GetVectorStoreFileBatchDefaultResponse
  >;
}

export interface CancelVectorStoreFileBatch {
  /** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
  post(
    options?: CancelVectorStoreFileBatchParameters,
  ): StreamableMethod<
    | CancelVectorStoreFileBatch200Response
    | CancelVectorStoreFileBatchDefaultResponse
  >;
}

export interface ListVectorStoreFileBatchFiles {
  /** Returns a list of vector store files in a batch. */
  get(
    options?: ListVectorStoreFileBatchFilesParameters,
  ): StreamableMethod<
    | ListVectorStoreFileBatchFiles200Response
    | ListVectorStoreFileBatchFilesDefaultResponse
  >;
}

export interface GetWorkspace {
  /** Gets the properties of the specified machine learning workspace. */
  get(
    options?: GetWorkspaceParameters,
  ): StreamableMethod<GetWorkspace200Response | GetWorkspaceDefaultResponse>;
}

export interface ListConnections {
  /** List the details of all the connections (not including their credentials) */
  get(
    options?: ListConnectionsParameters,
  ): StreamableMethod<
    ListConnections200Response | ListConnectionsDefaultResponse
  >;
}

export interface GetConnection {
  /** Get the details of a single connection, without credentials. */
  get(
    options?: GetConnectionParameters,
  ): StreamableMethod<GetConnection200Response | GetConnectionDefaultResponse>;
}

export interface GetConnectionWithSecrets {
  /** Get the details of a single connection, including credentials (if available). */
  post(
    options: GetConnectionWithSecretsParameters,
  ): StreamableMethod<
    | GetConnectionWithSecrets200Response
    | GetConnectionWithSecretsDefaultResponse
  >;
}

export interface GetAppInsights {
  /** Gets the properties of the specified Application Insights resource */
  get(
    options?: GetAppInsightsParameters,
  ): StreamableMethod<
    GetAppInsights200Response | GetAppInsightsDefaultResponse
  >;
}

export interface Get {
  /** Resource read operation template. */
  get(
    options?: GetParameters,
  ): StreamableMethod<Get200Response | GetDefaultResponse>;
  /** Resource update operation template. */
  patch(
    options: UpdateParameters,
  ): StreamableMethod<Update200Response | UpdateDefaultResponse>;
}

export interface Create {
  /** Run the evaluation. */
  post(options: CreateBodyParam ): StreamableMethod<Create201Response>;
}

export interface List {
  /** Resource list operation template. */
  get(
    options?: ListParameters,
  ): StreamableMethod<List200Response | ListDefaultResponse>;
}

export interface GetSchedule {
  /** Resource read operation template. */
  get(
    options?: GetScheduleParameters,
  ): StreamableMethod<GetSchedule200Response | GetScheduleDefaultResponse>;
  /** Create or replace operation template. */
  put(
    options: CreateOrReplaceScheduleParameters,
  ): StreamableMethod<
    | CreateOrReplaceSchedule200Response
    | CreateOrReplaceSchedule201Response
    | CreateOrReplaceScheduleDefaultResponse
  >;
}

export interface ListSchedule {
  /** Resource list operation template. */
  get(
    options?: ListScheduleParameters,
  ): StreamableMethod<ListSchedule200Response | ListScheduleDefaultResponse>;
}

export interface DisableSchedule {
  /** Disable the evaluation schedule. */
  patch(
    options?: DisableScheduleParameters,
  ): StreamableMethod<
    DisableSchedule204Response | DisableScheduleDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/assistants' has methods for the following verbs: post, get */
  (path: "/assistants"): CreateAgent;
  /** Resource for '/assistants/\{assistantId\}' has methods for the following verbs: get, post, delete */
  (path: "/assistants/{assistantId}", assistantId: string): GetAgent;
  /** Resource for '/threads' has methods for the following verbs: post */
  (path: "/threads"): CreateThread;
  /** Resource for '/threads/\{threadId\}' has methods for the following verbs: get, post, delete */
  (path: "/threads/{threadId}", threadId: string): GetThread;
  /** Resource for '/threads/\{threadId\}/messages' has methods for the following verbs: post, get */
  (path: "/threads/{threadId}/messages", threadId: string): CreateMessage;
  /** Resource for '/threads/\{threadId\}/messages/\{messageId\}' has methods for the following verbs: get, post */
  (
    path: "/threads/{threadId}/messages/{messageId}",
    threadId: string,
    messageId: string,
  ): GetMessage;
  /** Resource for '/threads/\{threadId\}/runs' has methods for the following verbs: post, get */
  (path: "/threads/{threadId}/runs", threadId: string): CreateRun;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}' has methods for the following verbs: get, post */
  (
    path: "/threads/{threadId}/runs/{runId}",
    threadId: string,
    runId: string,
  ): GetRun;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}/submit_tool_outputs' has methods for the following verbs: post */
  (
    path: "/threads/{threadId}/runs/{runId}/submit_tool_outputs",
    threadId: string,
    runId: string,
  ): SubmitToolOutputsToRun;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}/cancel' has methods for the following verbs: post */
  (
    path: "/threads/{threadId}/runs/{runId}/cancel",
    threadId: string,
    runId: string,
  ): CancelRun;
  /** Resource for '/threads/runs' has methods for the following verbs: post */
  (path: "/threads/runs"): CreateThreadAndRun;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}/steps/\{stepId\}' has methods for the following verbs: get */
  (
    path: "/threads/{threadId}/runs/{runId}/steps/{stepId}",
    threadId: string,
    runId: string,
    stepId: string,
  ): GetRunStep;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}/steps' has methods for the following verbs: get */
  (
    path: "/threads/{threadId}/runs/{runId}/steps",
    threadId: string,
    runId: string,
  ): ListRunSteps;
  /** Resource for '/files' has methods for the following verbs: get, post */
  (path: "/files"): ListFiles;
  /** Resource for '/files/\{fileId\}' has methods for the following verbs: delete, get */
  (path: "/files/{fileId}", fileId: string): DeleteFile;
  /** Resource for '/files/\{fileId\}/content' has methods for the following verbs: get */
  (path: "/files/{fileId}/content", fileId: string): GetFileContent;
  /** Resource for '/vector_stores' has methods for the following verbs: get, post */
  (path: "/vector_stores"): ListVectorStores;
  /** Resource for '/vector_stores/\{vectorStoreId\}' has methods for the following verbs: get, post, delete */
  (
    path: "/vector_stores/{vectorStoreId}",
    vectorStoreId: string,
  ): GetVectorStore;
  /** Resource for '/vector_stores/\{vectorStoreId\}/files' has methods for the following verbs: get, post */
  (
    path: "/vector_stores/{vectorStoreId}/files",
    vectorStoreId: string,
  ): ListVectorStoreFiles;
  /** Resource for '/vector_stores/\{vectorStoreId\}/files/\{fileId\}' has methods for the following verbs: get, delete */
  (
    path: "/vector_stores/{vectorStoreId}/files/{fileId}",
    vectorStoreId: string,
    fileId: string,
  ): GetVectorStoreFile;
  /** Resource for '/vector_stores/\{vectorStoreId\}/file_batches' has methods for the following verbs: post */
  (
    path: "/vector_stores/{vectorStoreId}/file_batches",
    vectorStoreId: string,
  ): CreateVectorStoreFileBatch;
  /** Resource for '/vector_stores/\{vectorStoreId\}/file_batches/\{batchId\}' has methods for the following verbs: get */
  (
    path: "/vector_stores/{vectorStoreId}/file_batches/{batchId}",
    vectorStoreId: string,
    batchId: string,
  ): GetVectorStoreFileBatch;
  /** Resource for '/vector_stores/\{vectorStoreId\}/file_batches/\{batchId\}/cancel' has methods for the following verbs: post */
  (
    path: "/vector_stores/{vectorStoreId}/file_batches/{batchId}/cancel",
    vectorStoreId: string,
    batchId: string,
  ): CancelVectorStoreFileBatch;
  /** Resource for '/vector_stores/\{vectorStoreId\}/file_batches/\{batchId\}/files' has methods for the following verbs: get */
  (
    path: "/vector_stores/{vectorStoreId}/file_batches/{batchId}/files",
    vectorStoreId: string,
    batchId: string,
  ): ListVectorStoreFileBatchFiles;
  /** Resource for '/' has methods for the following verbs: get */
  (path: "/"): GetWorkspace;
  /** Resource for '/connections' has methods for the following verbs: get */
  (path: "/connections"): ListConnections;
  /** Resource for '/connections/\{connectionName\}' has methods for the following verbs: get */
  (
    path: "/connections/{connectionName}",
    connectionName: string,
  ): GetConnection;
  /** Resource for '/connections/\{connectionName\}/listsecrets' has methods for the following verbs: post */
  (
    path: "/connections/{connectionName}/listsecrets",
    connectionName: string,
  ): GetConnectionWithSecrets;
  /** Resource for '/\{appInsightsResourceUrl\}' has methods for the following verbs: get */
  (
    path: "/{appInsightsResourceUrl}",
    appInsightsResourceUrl: string,
  ): GetAppInsights;
  /** Resource for '/evaluations/runs/\{id\}' has methods for the following verbs: get, patch */
  (path: "/evaluations/runs/{id}", id: string): Get;
  /** Resource for '/evaluations/runs:run' has methods for the following verbs: post */
  (path: "/evaluations/runs:run"): Create;
  /** Resource for '/evaluations/runs' has methods for the following verbs: get */
  (path: "/evaluations/runs"): List;
  /** Resource for '/evaluations/schedules/\{name\}' has methods for the following verbs: get, put */
  (path: "/evaluations/schedules/{name}", name: string): GetSchedule;
  /** Resource for '/evaluations/schedules' has methods for the following verbs: get */
  (path: "/evaluations/schedules"): ListSchedule;
  /** Resource for '/evaluations/schedules/\{name\}/disable' has methods for the following verbs: patch */
  (
    path: "/evaluations/schedules/{name}/disable",
    name: string,
  ): DisableSchedule;
}

export type ProjectsClient = Client & {
  path: Routes;
};
