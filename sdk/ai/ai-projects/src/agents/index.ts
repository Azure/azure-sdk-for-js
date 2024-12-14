// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type Client, type StreamableMethod } from "@azure-rest/core-client";
import type { AgentDeletionStatusOutput, AgentOutput, AgentThreadOutput, FileDeletionStatusOutput, FileListResponseOutput, OpenAIFileOutput, OpenAIPageableListOfAgentOutput, OpenAIPageableListOfRunStepOutput, OpenAIPageableListOfThreadMessageOutput, OpenAIPageableListOfVectorStoreFileOutput, OpenAIPageableListOfVectorStoreOutput, RunStepOutput, ThreadDeletionStatusOutput, ThreadMessageOutput, VectorStoreDeletionStatusOutput, VectorStoreFileBatchOutput, VectorStoreFileDeletionStatusOutput, VectorStoreFileOutput, VectorStoreOutput } from "../generated/src/outputModels.js";
import type { OpenAIPageableListOfThreadRunOutput, ThreadRunOutput } from "../customization/outputModels.js";
import { createAgent, deleteAgent, getAgent, listAgents, updateAgent } from "./assistants.js";
import { deleteFile, getFile, getFileContent, listFiles, uploadFile, uploadFileAndPoll } from "./files.js";
import { createThread, deleteThread, getThread, updateThread } from "./threads.js";
import { cancelRun, createRun, createThreadAndRun, getRun, listRuns, submitToolOutputsToRun, updateRun } from "./runs.js";
import { createMessage, listMessages, updateMessage } from "./messages.js";
import type { AgentThreadCreationOptions, CreateAgentOptions, FilePurpose, ThreadMessageOptions, ToolOutput, UpdateAgentOptions, UpdateAgentThreadOptions, VectorStoreOptions, VectorStoreUpdateOptions } from "../generated/src/models.js";
import type { UpdateMessageOptions } from "./messagesModels.js";
import { createVectorStore, createVectorStoreAndPoll, deleteVectorStore, getVectorStore, listVectorStores, modifyVectorStore } from "./vectorStores.js";
import { getRunStep, listRunSteps } from "./runSteps.js";
import type { CreateVectorStoreFileBatchOptions, CreateVectorStoreFileOptions, FileStatusFilter } from "./vectorStoresModels.js";
import { createVectorStoreFile, createVectorStoreFileAndPoll, deleteVectorStoreFile, getVectorStoreFile, listVectorStoreFiles } from "./vectorStoresFiles.js";
import { cancelVectorStoreFileBatch, createVectorStoreFileBatch, createVectorStoreFileBatchAndPoll, getVectorStoreFileBatch, listVectorStoreFileBatchFiles } from "./vectorStoresFileBatches.js";
import type { PollingOptions, ListQueryParameters, OptionalRequestParameters, AgentRunResponse, CreateRunOptionalParams, GetRunOptionalParams, CancelRunOptionalParams, SubmitToolOutputsToRunOptionalParams, UpdateRunOptionalParams, ListRunQueryOptionalParams, CreateAndRunThreadOptionalParams } from "./customModels.js";

export interface AgentsOperations {
  /** Creates a new agent. */
  createAgent: (
    model: string,
    options?: Omit<CreateAgentOptions, "model">,
    requestParams?: OptionalRequestParameters
  ) => Promise<AgentOutput>;

  /** Gets a list of agents that were previously created. */
  listAgents: (
    options?: ListQueryParameters,
    requestParams?: OptionalRequestParameters
  ) => Promise<OpenAIPageableListOfAgentOutput>;
  /** Retrieves an existing agent. */
  getAgent: (
    assistantId: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<AgentOutput>;
  /** Modifies an existing agent. */
  updateAgent: (
    assistantId: string,
    options: UpdateAgentOptions,
    requestParams?: OptionalRequestParameters
  ) => Promise<AgentOutput>;
  /** Deletes an agent. */
  deleteAgent: (
    assistantId: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<AgentDeletionStatusOutput>;

  /** Creates a new thread. Threads contain messages and can be run by agents. */
  createThread: (
    options?: AgentThreadCreationOptions,
    requestParams?: OptionalRequestParameters
  ) => Promise<AgentThreadOutput>;
  /** Gets information about an existing thread. */
  getThread: (
    threadId: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<AgentThreadOutput>;
  /** Modifies an existing thread. */
  updateThread: (
    threadId: string,
    options?: UpdateAgentThreadOptions,
    requestParams?: OptionalRequestParameters
  ) => Promise<AgentThreadOutput>;
  /** Deletes an existing thread. */
  deleteThread: (
    threadId: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<ThreadDeletionStatusOutput>;

  /** Creates and starts a new run of the specified thread using the specified agent. */
  createRun: (
    threadId: string,
    assistantId: string,
    options?: CreateRunOptionalParams
  ) => AgentRunResponse;

  /** Gets a list of runs for a specified thread. */
  listRuns: (
    threadId: string,
    options?: ListRunQueryOptionalParams,
  ) => Promise<OpenAIPageableListOfThreadRunOutput>;
  /** Gets an existing run from an existing thread. */
  getRun: (
    threadId: string,
    runId: string,
    options?: GetRunOptionalParams,
  ) => Promise<ThreadRunOutput>;
  /** Modifies an existing thread run. */
  updateRun: (
    threadId: string,
    runId: string,
    options?: UpdateRunOptionalParams,
  ) => Promise<ThreadRunOutput>;
  /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
  submitToolOutputsToRun: (
    threadId: string,
    runId: string,
    tool_outputs: Array<ToolOutput>,
    options?: SubmitToolOutputsToRunOptionalParams,
  ) => AgentRunResponse;

  /** Cancels a run of an in progress thread. */
  cancelRun: (
    threadId: string,
    runId: string,
    options?: CancelRunOptionalParams,
  ) => Promise<ThreadRunOutput>;
  /** Creates a new thread and immediately starts a run of that thread. */
  createThreadAndRun: (
    assistantId: string,
    options?: CreateAndRunThreadOptionalParams
  ) => AgentRunResponse;

  /** Creates a new message on a specified thread. */
  createMessage: (
    threadId: string,
    options: ThreadMessageOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<ThreadMessageOutput>;
  /** Gets a list of messages that exist on a thread. */
  listMessages: (
    threadId: string,
    runId?: string,
    options?: ListQueryParameters,
    requestParams?: OptionalRequestParameters,
  ) => Promise<OpenAIPageableListOfThreadMessageOutput>;
  /** Modifies an existing message on an existing thread. */
  updateMessage: (
    threadId: string,
    messageId: string,
    options?: UpdateMessageOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<ThreadMessageOutput>;

  /** Gets a list of previously uploaded files. */
  listFiles: (
    purpose?: FilePurpose, requestParams?: OptionalRequestParameters
  ) => Promise<FileListResponseOutput>;
  /** Uploads a file for use by other operations. */
  uploadFile: (data: ReadableStream | NodeJS.ReadableStream, purpose: FilePurpose, fileName?: string, requestParams?: OptionalRequestParameters
  ) => Promise<OpenAIFileOutput>
  /** Uploads a file for use by other operations. */
  uploadFileAndPoll: (data: ReadableStream | NodeJS.ReadableStream, purpose: FilePurpose, fileName?: string, pollingOptions?: PollingOptions, requestParams?: OptionalRequestParameters
  ) => Promise<OpenAIFileOutput>
  /** Delete a previously uploaded file. */
  deleteFile: (
    fileId: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<FileDeletionStatusOutput>;
  /** Returns information about a specific file. Does not retrieve file content. */
  getFile: (
    fileId: string,
    requestParams?: OptionalRequestParameters
  ) => Promise<OpenAIFileOutput>;
  /** Returns the content of a specific file. */
  getFileContent: (
    fileId: string,
    requestParams?: OptionalRequestParameters
  ) => StreamableMethod<string | Uint8Array>;

  /** Returns a list of vector stores. */
  listVectorStores: (
    options?: ListQueryParameters,
    requestParams?: OptionalRequestParameters,
  ) => Promise<OpenAIPageableListOfVectorStoreOutput>;
  /** Creates a vector store. */
  createVectorStore: (
    options?: VectorStoreOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreOutput>;
  /** Returns the vector store object object matching the specific ID. */
  getVectorStore: (
    vectorStoreId: string,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreOutput>;
  /** The ID of the vector store to modify. */
  modifyVectorStore: (
    vectorStoreId: string,
    options?: VectorStoreUpdateOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreOutput>;
  /** Deletes the vector store object matching the specified ID. */
  deleteVectorStore: (
    vectorStoreId: string,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreDeletionStatusOutput>;
  /** Create vector store and poll. */
  createVectorStoreAndPoll: (
    vectorStoreOptions?: VectorStoreOptions,
    pollingOptions?: PollingOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreOutput>;

  /** Create a vector store file by attching a file to a vector store. */
  createVectorStoreFile: (
    vectorStoreId: string,
    options?: CreateVectorStoreFileOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreFileOutput>;
  /** Retrieves a vector store file. */
  getVectorStoreFile: (
    vectorStoreId: string,
    fileId: string,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreFileOutput>;
  /** Returns a list of vector store files. */
  listVectorStoreFiles: (
    vectorStoreId: string,
    options?: ListQueryParameters & FileStatusFilter,
    requestParams?: OptionalRequestParameters,
  ) => Promise<OpenAIPageableListOfVectorStoreFileOutput>;
  /**
   * Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted.
   * To delete the file, use the delete file endpoint.
   */
  deleteVectorStoreFile: (
    vectorStoreId: string,
    fileId: string,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreFileDeletionStatusOutput>;
  /** Create a vector store file by attaching a file to a vector store and poll. */
  createVectorStoreFileAndPoll: (
    vectorStoreId: string,
    vectorStoreFileOptions?: CreateVectorStoreFileOptions,
    pollingOptions?: PollingOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreFileOutput>;

  /** Create a vector store file batch. */
  createVectorStoreFileBatch: (
    vectorStoreId: string,
    options?: CreateVectorStoreFileBatchOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreFileBatchOutput>;
  /** Retrieve a vector store file batch. */
  getVectorStoreFileBatch: (
    vectorStoreId: string,
    batchId: string,
  ) => Promise<VectorStoreFileBatchOutput>;
  /** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
  cancelVectorStoreFileBatch: (
    vectorStoreId: string,
    batchId: string,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreFileBatchOutput>;
  /** Returns a list of vector store files in a batch. */
  listVectorStoreFileBatchFiles: (
    vectorStoreId: string,
    batchId: string,
    options?: ListQueryParameters & FileStatusFilter,
    requestParams?: OptionalRequestParameters,
  ) => Promise<OpenAIPageableListOfVectorStoreFileOutput>;
  /** Create a vector store file batch and poll. */
  createVectorStoreFileBatchAndPoll: (
    vectorStoreId: string,
    vectorStoreFileBatchOptions?: CreateVectorStoreFileBatchOptions,
    pollingOptions?: PollingOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<VectorStoreFileBatchOutput>;

  /** Gets a single run step from a thread run. */
  getRunStep: (
    threadId: string,
    runId: string,
    stepId: string,
    requestParams?: OptionalRequestParameters,
  ) => Promise<RunStepOutput>;
  /** Gets a list of run steps from a thread run. */
  listRunSteps: (
    threadId: string,
    runId: string,
    options?: ListQueryParameters,
    requestParams?: OptionalRequestParameters,
  ) => Promise<OpenAIPageableListOfRunStepOutput>;
}

function getAgents(context: Client): AgentsOperations {
  return {
    createAgent: (model: string, options?: Omit<CreateAgentOptions, "model">, requestParams?: OptionalRequestParameters) =>
      createAgent(context, { body: { ...options, model }, ...requestParams }),
    listAgents: (options?: ListQueryParameters, requestParams?: OptionalRequestParameters) =>
      listAgents(context, { queryParameters: options as Record<string, unknown>, ...requestParams }),
    getAgent: (assistantId: string, requestParams?: OptionalRequestParameters) =>
      getAgent(context, assistantId, requestParams),
    updateAgent: (
      assistantId: string,
      options: UpdateAgentOptions,
      requestParams?: OptionalRequestParameters
    ) => updateAgent(context, assistantId, { body: options, ...requestParams }),
    deleteAgent: (
      assistantId: string,
      requestParams?: OptionalRequestParameters
    ) => deleteAgent(context, assistantId, requestParams),

    createThread: (options?: AgentThreadCreationOptions, requestParams?: OptionalRequestParameters) =>
      createThread(context, { ...requestParams, body: { ...options } }),
    getThread: (threadId: string, requestParams?: OptionalRequestParameters) =>
      getThread(context, threadId, requestParams),
    updateThread: (threadId: string, options?: UpdateAgentThreadOptions, requestParams?: OptionalRequestParameters) =>
      updateThread(context, threadId, { ...requestParams, body: { ...options } }),
    deleteThread: (threadId: string, requestParams?: OptionalRequestParameters) =>
      deleteThread(context, threadId, requestParams),

    createRun: (threadId: string, assistantId: string, options?: CreateRunOptionalParams) =>
      createRun(context, threadId, assistantId, options ?? {}),
    listRuns: (threadId: string, options?: ListRunQueryOptionalParams) =>
      listRuns(context, threadId, options ?? {}),
    getRun: (threadId: string, runId: string, options?: GetRunOptionalParams) =>
      getRun(context, threadId, runId, options),
    updateRun: (threadId: string, runId: string, options?: UpdateRunOptionalParams) =>
      updateRun(context, threadId, runId, options),
    submitToolOutputsToRun: (threadId: string, runId: string, tool_outputs: Array<ToolOutput>,
      options?: SubmitToolOutputsToRunOptionalParams,) =>
      submitToolOutputsToRun(context, threadId, runId, tool_outputs, options),
    cancelRun: (threadId: string, runId: string, options?: CancelRunOptionalParams) =>
      cancelRun(context, threadId, runId, options),
    createThreadAndRun: (assistantId: string,
      options?: CreateAndRunThreadOptionalParams) =>
      createThreadAndRun(context, assistantId, options ?? {}),

    createMessage: (threadId: string, options: ThreadMessageOptions, requestParams?: OptionalRequestParameters) =>
      createMessage(context, threadId, { ...requestParams, body: options }),
    listMessages: (threadId: string, runId?: string, options?: ListQueryParameters, requestParams?: OptionalRequestParameters) =>
      listMessages(context, threadId, { ...requestParams, queryParameters: { runId: runId, ...options } }),
    updateMessage: (threadId: string, messageId: string, options?: UpdateMessageOptions, requestParams?: OptionalRequestParameters) =>
      updateMessage(context, threadId, messageId, { ...requestParams, body: { ...options } }),

    listFiles: (purpose?: FilePurpose, requestParams?: OptionalRequestParameters) =>
      listFiles(context, { ...requestParams, queryParameters: { purpose: purpose } }),
    uploadFile: (content: ReadableStream | NodeJS.ReadableStream, purpose: FilePurpose, fileName?: string, requestParams?: OptionalRequestParameters) =>
      uploadFile(context, {
        body: [{ name: "file" as const, body: content, filename: fileName }, { name: "purpose" as const, body: purpose }],
        ...(requestParams as { [key: string]: any; }),
        contentType: "multipart/form-data"
      }),
    uploadFileAndPoll: (content: ReadableStream | NodeJS.ReadableStream, purpose: FilePurpose, fileName?: string, pollingOptions?: PollingOptions, requestParams?: OptionalRequestParameters) =>
      uploadFileAndPoll(context, {
        body: [{ name: "file" as const, body: content, filename: fileName }, { name: "purpose" as const, body: purpose }],
        ...(requestParams as { [key: string]: any; }),
        contentType: "multipart/form-data"
      }, pollingOptions, requestParams),
    deleteFile: (fileId: string, requestParams?: OptionalRequestParameters) =>
      deleteFile(context, fileId, requestParams),
    getFile: (fileId: string, requestParams?: OptionalRequestParameters) =>
      getFile(context, fileId, requestParams),
    getFileContent: (fileId: string, requestParams?: OptionalRequestParameters) =>
      getFileContent(context, fileId, requestParams),

    listVectorStores: (options?: ListQueryParameters, requestParams?: OptionalRequestParameters,) =>
      listVectorStores(context, { ...requestParams, queryParameters: options as Record<string, unknown> }),
    createVectorStore: (options?: VectorStoreOptions, requestParams?: OptionalRequestParameters) =>
      createVectorStore(context, { ...requestParams, body: options as Record<string, unknown> }),
    getVectorStore: (vectorStoreId: string, requestParams?: OptionalRequestParameters) =>
      getVectorStore(context, vectorStoreId, requestParams),
    modifyVectorStore: (vectorStoreId: string, options?: VectorStoreUpdateOptions, requestParams?: OptionalRequestParameters) =>
      modifyVectorStore(context, vectorStoreId, { ...requestParams, body: options as Record<string, unknown> }),
    deleteVectorStore: (vectorStoreId: string, requestParams?: OptionalRequestParameters) =>
      deleteVectorStore(context, vectorStoreId, requestParams),
    createVectorStoreAndPoll: (vectorStoreOptions?: VectorStoreOptions, pollingOptions?: PollingOptions, requestParams?: OptionalRequestParameters) =>
      createVectorStoreAndPoll(context, vectorStoreOptions, pollingOptions, requestParams),

    createVectorStoreFile: (vectorStoreId: string, options?: CreateVectorStoreFileOptions, requestParams?: OptionalRequestParameters) =>
      createVectorStoreFile(context, vectorStoreId, { ...requestParams, body: { file_id: options?.fileId, data_sources: options?.dataSources, chunking_strategy: options?.chunkingStrategy } }),
    getVectorStoreFile: (vectorStoreId: string, fileId: string, requestParams?: OptionalRequestParameters) =>
      getVectorStoreFile(context, vectorStoreId, fileId, requestParams),
    listVectorStoreFiles: (vectorStoreId: string, options?: ListQueryParameters & FileStatusFilter, requestParams?: OptionalRequestParameters) =>
      listVectorStoreFiles(context, vectorStoreId, { ...requestParams, queryParameters: options as Record<string, unknown> }),
    deleteVectorStoreFile: (vectorStoreId: string, fileId: string, requestParams?: OptionalRequestParameters) =>
      deleteVectorStoreFile(context, vectorStoreId, fileId, requestParams),
    createVectorStoreFileAndPoll: (vectorStoreId: string, vectorStoreFileOptions?: CreateVectorStoreFileOptions, pollingOptions?: PollingOptions, requestParams?: OptionalRequestParameters) =>
      createVectorStoreFileAndPoll(context, vectorStoreId, vectorStoreFileOptions, pollingOptions, requestParams),

    createVectorStoreFileBatch: (vectorStoreId: string, options?: CreateVectorStoreFileBatchOptions, requestParams?: OptionalRequestParameters) =>
      createVectorStoreFileBatch(context, vectorStoreId, { ...requestParams, body: { file_ids: options?.fileIds, data_sources: options?.dataSources, chunking_strategy: options?.chunkingStrategy } }),
    getVectorStoreFileBatch: (vectorStoreId: string, batchId: string, requestParams?: OptionalRequestParameters) =>
      getVectorStoreFileBatch(context, vectorStoreId, batchId, requestParams),
    cancelVectorStoreFileBatch: (vectorStoreId: string, batchId: string, requestParams?: OptionalRequestParameters) =>
      cancelVectorStoreFileBatch(context, vectorStoreId, batchId, requestParams),
    listVectorStoreFileBatchFiles: (vectorStoreId: string, batchId: string, options?: ListQueryParameters & FileStatusFilter, requestParams?: OptionalRequestParameters) =>
      listVectorStoreFileBatchFiles(context, vectorStoreId, batchId, { ...requestParams, queryParameters: options as Record<string, unknown> }),
    createVectorStoreFileBatchAndPoll: (vectorStoreId: string, vectorStoreFileBatchOptions?: CreateVectorStoreFileBatchOptions, pollingOptions?: PollingOptions, requestParams?: OptionalRequestParameters) =>
      createVectorStoreFileBatchAndPoll(context, vectorStoreId, vectorStoreFileBatchOptions, pollingOptions, requestParams),

    getRunStep: (threadId: string, runId: string, stepId: string, requestParams?: OptionalRequestParameters) =>
      getRunStep(context, threadId, runId, stepId, { ...requestParams }),
    listRunSteps: (threadId: string, runId: string, options?: ListQueryParameters, requestParams?: OptionalRequestParameters) =>
      listRunSteps(context, threadId, runId, { ...requestParams, queryParameters: options as Record<string, unknown> }),
  };
}

export function getAgentsOperations(context: Client): AgentsOperations {
  return {
    ...getAgents(context),
  };
}
