// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CreateAgentParameters,
  ListAgentsParameters,
  GetAgentParameters,
  UpdateAgentParameters,
  DeleteAgentParameters,
  CreateThreadAndRunParameters,
  CreateThreadParameters,
  ListThreadsParameters,
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
} from "./parameters.js";
import type {
  CreateAgent200Response,
  CreateAgentDefaultResponse,
  ListAgents200Response,
  GetAgent200Response,
  GetAgentDefaultResponse,
  UpdateAgent200Response,
  UpdateAgentDefaultResponse,
  DeleteAgent200Response,
  DeleteAgentDefaultResponse,
  CreateThreadAndRun200Response,
  CreateThreadAndRunDefaultResponse,
  CreateThread200Response,
  CreateThreadDefaultResponse,
  ListThreads200Response,
  GetThread200Response,
  GetThreadDefaultResponse,
  UpdateThread200Response,
  UpdateThreadDefaultResponse,
  DeleteThread200Response,
  DeleteThreadDefaultResponse,
  CreateMessage200Response,
  CreateMessageDefaultResponse,
  ListMessages200Response,
  GetMessage200Response,
  GetMessageDefaultResponse,
  UpdateMessage200Response,
  UpdateMessageDefaultResponse,
  CreateRun200Response,
  CreateRunDefaultResponse,
  ListRuns200Response,
  GetRun200Response,
  GetRunDefaultResponse,
  UpdateRun200Response,
  UpdateRunDefaultResponse,
  SubmitToolOutputsToRun200Response,
  SubmitToolOutputsToRunDefaultResponse,
  CancelRun200Response,
  CancelRunDefaultResponse,
  GetRunStep200Response,
  GetRunStepDefaultResponse,
  ListRunSteps200Response,
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
  CreateVectorStore200Response,
  CreateVectorStoreDefaultResponse,
  GetVectorStore200Response,
  GetVectorStoreDefaultResponse,
  ModifyVectorStore200Response,
  ModifyVectorStoreDefaultResponse,
  DeleteVectorStore200Response,
  DeleteVectorStoreDefaultResponse,
  ListVectorStoreFiles200Response,
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
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface CreateAgent {
  /** Creates a new agent. */
  post(
    options: CreateAgentParameters,
  ): StreamableMethod<CreateAgent200Response | CreateAgentDefaultResponse>;
  /** Gets a list of agents that were previously created. */
  get(options?: ListAgentsParameters): StreamableMethod<ListAgents200Response>;
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

export interface CreateThreadAndRun {
  /** Creates a new agent thread and immediately starts a run using that new thread. */
  post(
    options: CreateThreadAndRunParameters,
  ): StreamableMethod<
    CreateThreadAndRun200Response | CreateThreadAndRunDefaultResponse
  >;
}

export interface CreateThread {
  /** Creates a new thread. Threads contain messages and can be run by agents. */
  post(
    options: CreateThreadParameters,
  ): StreamableMethod<CreateThread200Response | CreateThreadDefaultResponse>;
  /** Gets a list of threads that were previously created. */
  get(
    options?: ListThreadsParameters,
  ): StreamableMethod<ListThreads200Response>;
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
  ): StreamableMethod<ListMessages200Response>;
}

export interface GetMessage {
  /** Retrieves an existing message. */
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
  get(options?: ListRunsParameters): StreamableMethod<ListRuns200Response>;
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
  /** Submits outputs from tools as requested by tool calls in a run. */
  post(
    options: SubmitToolOutputsToRunParameters,
  ): StreamableMethod<
    SubmitToolOutputsToRun200Response | SubmitToolOutputsToRunDefaultResponse
  >;
}

export interface CancelRun {
  /** Cancels a run of an in‐progress thread. */
  post(
    options?: CancelRunParameters,
  ): StreamableMethod<CancelRun200Response | CancelRunDefaultResponse>;
}

export interface GetRunStep {
  /** Retrieves a single run step from a thread run. */
  get(
    options?: GetRunStepParameters,
  ): StreamableMethod<GetRunStep200Response | GetRunStepDefaultResponse>;
}

export interface ListRunSteps {
  /** Gets a list of run steps from a thread run. */
  get(
    options?: ListRunStepsParameters,
  ): StreamableMethod<ListRunSteps200Response>;
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
  ): StreamableMethod<ListVectorStores200Response>;
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
  /** Modifies an existing vector store. */
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
  ): StreamableMethod<ListVectorStoreFiles200Response>;
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
  /** Deletes a vector store file. This removes the file‐to‐store link (does not delete the file itself). */
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
  ): StreamableMethod<ListVectorStoreFileBatchFiles200Response>;
}

export interface Routes {
  /** Resource for '/assistants' has methods for the following verbs: post, get */
  (path: "/assistants"): CreateAgent;
  /** Resource for '/assistants/\{assistantId\}' has methods for the following verbs: get, post, delete */
  (path: "/assistants/{assistantId}", assistantId: string): GetAgent;
  /** Resource for '/threads/runs' has methods for the following verbs: post */
  (path: "/threads/runs"): CreateThreadAndRun;
  /** Resource for '/threads' has methods for the following verbs: post, get */
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
}

export type AgentsClient = Client & {
  path: Routes;
};
