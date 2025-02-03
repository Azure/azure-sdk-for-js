// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CreateAgentParameters,
  ListAgentsParameters,
  GetAgentParameters,
  UpdateAgentParameters,
  DeleteAgentParameters,
  CreateThreadParameters,
  GetThreadParameters,
  UpdateThreadParameters,
  DeleteThreadParameters,
  CreateMessageParameters,
  ListMessagesParameters,
  GetMessageParameters,
  UpdateMessageParameters,
  CreateRunParameters,
  ListRunsParameters,
  GetRunParameters,
  UpdateRunParameters,
  SubmitToolOutputsToRunParameters,
  CancelRunParameters,
  CreateThreadAndRunParameters,
  GetRunStepParameters,
  ListRunStepsParameters,
  ListFilesParameters,
  UploadFileParameters,
  DeleteFileParameters,
  GetFileParameters,
  GetFileContentParameters,
  ListVectorStoresParameters,
  CreateVectorStoreParameters,
  GetVectorStoreParameters,
  ModifyVectorStoreParameters,
  DeleteVectorStoreParameters,
  ListVectorStoreFilesParameters,
  CreateVectorStoreFileParameters,
  GetVectorStoreFileParameters,
  DeleteVectorStoreFileParameters,
  CreateVectorStoreFileBatchParameters,
  GetVectorStoreFileBatchParameters,
  CancelVectorStoreFileBatchParameters,
  ListVectorStoreFileBatchFilesParameters,
  GetWorkspaceParameters,
  ListConnectionsParameters,
  GetConnectionParameters,
  GetConnectionWithSecretsParameters,
  GetAppInsightsParameters,
  GetParameters,
  UpdateParameters,
  CreateParameters,
  ListParameters,
  GetScheduleParameters,
  CreateOrReplaceScheduleParameters,
  ListScheduleParameters,
  DisableScheduleParameters,
} from "./parameters.js";
import {
  CreateAgent200Response,
  CreateAgentDefaultResponse,
  ListAgents200Response,
  ListAgentsDefaultResponse,
  GetAgent200Response,
  GetAgentDefaultResponse,
  UpdateAgent200Response,
  UpdateAgentDefaultResponse,
  DeleteAgent200Response,
  DeleteAgentDefaultResponse,
  CreateThread200Response,
  CreateThreadDefaultResponse,
  GetThread200Response,
  GetThreadDefaultResponse,
  UpdateThread200Response,
  UpdateThreadDefaultResponse,
  DeleteThread200Response,
  DeleteThreadDefaultResponse,
  CreateMessage200Response,
  CreateMessageDefaultResponse,
  ListMessages200Response,
  ListMessagesDefaultResponse,
  GetMessage200Response,
  GetMessageDefaultResponse,
  UpdateMessage200Response,
  UpdateMessageDefaultResponse,
  CreateRun200Response,
  CreateRunDefaultResponse,
  ListRuns200Response,
  ListRunsDefaultResponse,
  GetRun200Response,
  GetRunDefaultResponse,
  UpdateRun200Response,
  UpdateRunDefaultResponse,
  SubmitToolOutputsToRun200Response,
  SubmitToolOutputsToRunDefaultResponse,
  CancelRun200Response,
  CancelRunDefaultResponse,
  CreateThreadAndRun200Response,
  CreateThreadAndRunDefaultResponse,
  GetRunStep200Response,
  GetRunStepDefaultResponse,
  ListRunSteps200Response,
  ListRunStepsDefaultResponse,
  ListFiles200Response,
  ListFilesDefaultResponse,
  UploadFile200Response,
  UploadFileDefaultResponse,
  DeleteFile200Response,
  DeleteFileDefaultResponse,
  GetFile200Response,
  GetFileDefaultResponse,
  GetFileContent200Response,
  GetFileContentDefaultResponse,
  ListVectorStores200Response,
  ListVectorStoresDefaultResponse,
  CreateVectorStore200Response,
  CreateVectorStoreDefaultResponse,
  GetVectorStore200Response,
  GetVectorStoreDefaultResponse,
  ModifyVectorStore200Response,
  ModifyVectorStoreDefaultResponse,
  DeleteVectorStore200Response,
  DeleteVectorStoreDefaultResponse,
  ListVectorStoreFiles200Response,
  ListVectorStoreFilesDefaultResponse,
  CreateVectorStoreFile200Response,
  CreateVectorStoreFileDefaultResponse,
  GetVectorStoreFile200Response,
  GetVectorStoreFileDefaultResponse,
  DeleteVectorStoreFile200Response,
  DeleteVectorStoreFileDefaultResponse,
  CreateVectorStoreFileBatch200Response,
  CreateVectorStoreFileBatchDefaultResponse,
  GetVectorStoreFileBatch200Response,
  GetVectorStoreFileBatchDefaultResponse,
  CancelVectorStoreFileBatch200Response,
  CancelVectorStoreFileBatchDefaultResponse,
  ListVectorStoreFileBatchFiles200Response,
  ListVectorStoreFileBatchFilesDefaultResponse,
  GetWorkspace200Response,
  GetWorkspaceDefaultResponse,
  ListConnections200Response,
  ListConnectionsDefaultResponse,
  GetConnection200Response,
  GetConnectionDefaultResponse,
  GetConnectionWithSecrets200Response,
  GetConnectionWithSecretsDefaultResponse,
  GetAppInsights200Response,
  GetAppInsightsDefaultResponse,
  Get200Response,
  GetDefaultResponse,
  Update200Response,
  UpdateDefaultResponse,
  Create201Response,
  List200Response,
  ListDefaultResponse,
  GetSchedule200Response,
  GetScheduleDefaultResponse,
  CreateOrReplaceSchedule200Response,
  CreateOrReplaceSchedule201Response,
  CreateOrReplaceScheduleDefaultResponse,
  ListSchedule200Response,
  ListScheduleDefaultResponse,
  DisableSchedule204Response,
  DisableScheduleDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

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
  post(options: CreateParameters): StreamableMethod<Create201Response>;
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
