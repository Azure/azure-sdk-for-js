// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentsContext,
  AgentsClientOptionalParams} from "./api/index.js";
import {
  createAgents
} from "./api/index.js";
import type {
  Agent,
  OpenAIPageableListOfAgent,
  AgentDeletionStatus,
  MessageRole,
  MessageInputContent,
  AgentThread,
  ThreadDeletionStatus,
  OpenAIPageableListOfAgentThread,
  ThreadMessage,
  OpenAIPageableListOfThreadMessage,
  ThreadRun,
  OpenAIPageableListOfThreadRun,
  ToolOutput,
  RunStep,
  OpenAIPageableListOfRunStep,
  FileListResponse,
  FilePurpose,
  FileDeletionStatus,
  OpenAIPageableListOfVectorStore,
  VectorStore,
  VectorStoreDeletionStatus,
  OpenAIPageableListOfVectorStoreFile,
  VectorStoreFile,
  VectorStoreFileDeletionStatus,
  VectorStoreFileBatch,
  FileInfo,
} from "./models/models.js";
import type {
  CreateThreadAndRunOptionalParams,
  DeleteAgentOptionalParams,
  UpdateAgentOptionalParams,
  GetAgentOptionalParams,
  ListAgentsOptionalParams,
  CreateAgentOptionalParams,
} from "./api/options.js";
import type {
    FilesGetFileContentOptionalParams,
  FilesGetFileOptionalParams,
  FilesDeleteFileOptionalParams,
  FilesUploadFileOptionalParams,
  FilesListFilesOptionalParams,
} from "./api/files/options.js";
import type {
  ThreadsCreateThreadOptionalParams,
  ThreadsListThreadsOptionalParams,
  ThreadsDeleteThreadOptionalParams,
  ThreadsUpdateThreadOptionalParams,
  ThreadsGetThreadOptionalParams,
} from "./api/threads/options.js";
import type {
  MessagesUpdateMessageOptionalParams,
  MessagesGetMessageOptionalParams,
  MessagesListMessagesOptionalParams,
  MessagesCreateMessageOptionalParams,
} from "./api/messages/options.js";
import type {
  RunsListRunsOptionalParams,
  RunsGetRunOptionalParams,
  RunsCancelRunOptionalParams,
  RunsSubmitToolOutputsToRunOptionalParams,
  RunsUpdateRunOptionalParams,
  RunsCreateRunOptionalParams,
} from "./api/runs/options.js";
import type {
  VectorStoresDeleteVectorStoreOptionalParams,
  VectorStoresModifyVectorStoreOptionalParams,
  VectorStoresGetVectorStoreOptionalParams,
  VectorStoresCreateVectorStoreOptionalParams,
  VectorStoresListVectorStoresOptionalParams,
} from "./api/vectorStores/options.js";
import type {
  VectorStoreFilesCreateVectorStoreFileOptionalParams,
  VectorStoreFilesGetVectorStoreFileOptionalParams,
  VectorStoreFilesListVectorStoreFilesOptionalParams,
  VectorStoreFilesDeleteVectorStoreFileOptionalParams,
} from "./api/vectorStoreFiles/options.js";
import type {
  VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams,
  VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams,
  VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams,
  VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams,
} from "./api/vectorStoreFileBatches/options.js";
import {
  createThreadAndRun,
  deleteAgent,
  updateAgent,
  getAgent,
  listAgents,
  createAgent,
} from "./api/operations.js";
import type {
  VectorStoreFileBatchesOperations} from "./classic/vectorStoreFileBatches/index.js";
import {
  _getVectorStoreFileBatchesOperations,
} from "./classic/vectorStoreFileBatches/index.js";
import type {
  VectorStoreFilesOperations} from "./classic/vectorStoreFiles/index.js";
import {
  _getVectorStoreFilesOperations,
} from "./classic/vectorStoreFiles/index.js";
import type {
  VectorStoresOperations} from "./classic/vectorStores/index.js";
import {
  _getVectorStoresOperations,
} from "./classic/vectorStores/index.js";
import type { FilesOperations} from "./classic/files/index.js";
import { _getFilesOperations } from "./classic/files/index.js";
import type {
  RunStepsOperations} from "./classic/runSteps/index.js";
import {
  _getRunStepsOperations,
} from "./classic/runSteps/index.js";
import type { RunsOperations} from "./classic/runs/index.js";
import { _getRunsOperations } from "./classic/runs/index.js";
import type {
  MessagesOperations} from "./classic/messages/index.js";
import {
  _getMessagesOperations,
} from "./classic/messages/index.js";
import type {
  ThreadsOperations} from "./classic/threads/index.js";
import {
  _getThreadsOperations,
} from "./classic/threads/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { createThread, deleteThread, getThread, listThreads, updateThread } from "./api/threads/operations.js";
import { createMessage, getMessage, listMessages, updateMessage } from "./api/messages/operations.js";
import { cancelRun, createRun, getRun, listRuns, submitToolOutputsToRun, updateRun } from "./api/runs/operations.js";
import { getRunStep, listRunSteps } from "./api/runSteps/operations.js";
import { deleteFile, getFile, getFileContent, listFiles, uploadFile, uploadFileAndPoll } from "./api/files/operations.js";
import { createVectorStoreFile, createVectorStoreFileAndPoll, deleteVectorStoreFile, getVectorStoreFile, listVectorStoreFiles } from "./api/vectorStoreFiles/operations.js";
import { createVectorStoreFileBatch, cancelVectorStoreFileBatch, getVectorStoreFileBatch, listVectorStoreFileBatchFiles, createVectorStoreFileBatchAndPoll } from "./api/vectorStoreFileBatches/operations.js";
import { createVectorStore, createVectorStoreAndPoll, deleteVectorStore, getVectorStore, listVectorStores, modifyVectorStore } from "./api/vectorStores/operations.js";
import { OperationState, PollerLike } from "@azure/core-lro";
import { RunStepsGetRunStepOptionalParams, RunStepsListRunStepsOptionalParams } from "./api/runSteps/options.js";
import { AgentRunResponse } from "./models/streamingModels.js";


export { AgentsClientOptionalParams } from "./api/agentsContext.js";

export class AgentsClient {
  private _client: AgentsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: KeyCredential | TokenCredential,
    options: AgentsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAgents(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.vectorStoreFileBatches = _getVectorStoreFileBatchesOperations(
      this._client,
    );
    this.vectorStoreFiles = _getVectorStoreFilesOperations(this._client);
    this.vectorStores = _getVectorStoresOperations(this._client);
    this.files = _getFilesOperations(this._client);
    this.runSteps = _getRunStepsOperations(this._client);
    this.runs = _getRunsOperations(this._client);
    this.messages = _getMessagesOperations(this._client);
    this.threads = _getThreadsOperations(this._client);
  }

  /** The operation groups for vectorStoreFileBatches */
  public readonly vectorStoreFileBatches: VectorStoreFileBatchesOperations;
  /** The operation groups for vectorStoreFiles */
  public readonly vectorStoreFiles: VectorStoreFilesOperations;
  /** The operation groups for vectorStores */
  public readonly vectorStores: VectorStoresOperations;
  /** The operation groups for files */
  public readonly files: FilesOperations;
  /** The operation groups for runSteps */
  public readonly runSteps: RunStepsOperations;
  /** The operation groups for runs */
  public readonly runs: RunsOperations;
  /** The operation groups for messages */
  public readonly messages: MessagesOperations;
  /** The operation groups for threads */
  public readonly threads: ThreadsOperations;

 /** Returns a list of vector store files in a batch. */
  listVectorStoreFileBatchFiles(
    vectorStoreId: string,
    batchId: string,
    options: VectorStoreFileBatchesListVectorStoreFileBatchFilesOptionalParams = {
      requestOptions: {},
    },
  ): Promise<OpenAIPageableListOfVectorStoreFile> {
    return listVectorStoreFileBatchFiles(this._client, vectorStoreId, batchId, options);
  }

  /** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
  cancelVectorStoreFileBatch(
    vectorStoreId: string,
    batchId: string,
    options: VectorStoreFileBatchesCancelVectorStoreFileBatchOptionalParams = { requestOptions: {} },
  ): Promise<VectorStoreFileBatch> {
    return cancelVectorStoreFileBatch(this._client, vectorStoreId, batchId, options);
  }

  /** Retrieve a vector store file batch. */
  getVectorStoreFileBatch(
    vectorStoreId: string,
    batchId: string,
    options: VectorStoreFileBatchesGetVectorStoreFileBatchOptionalParams = { requestOptions: {} },
  ): Promise<VectorStoreFileBatch> {
    return getVectorStoreFileBatch(this._client, vectorStoreId, batchId, options);
  }

  /** Create a vector store file batch. */
  createVectorStoreFileBatch(
    vectorStoreId: string,
    options: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams = { requestOptions: {} },
  ): Promise<VectorStoreFileBatch> {
    return createVectorStoreFileBatch(this._client, vectorStoreId, options);
  }

  /** Create a vector store file batch and poll. */
  createVectorStoreFileBatchAndPoll(
    vectorStoreId: string,
    options: VectorStoreFileBatchesCreateVectorStoreFileBatchOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<VectorStoreFileBatch>, VectorStoreFileBatch> {
    return createVectorStoreFileBatchAndPoll(this._client, vectorStoreId, options);
  }

  /**
   * Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted.
   * To delete the file, use the delete file endpoint.
   */
  deleteVectorStoreFile(
    vectorStoreId: string,
    fileId: string,
    options: VectorStoreFilesDeleteVectorStoreFileOptionalParams = { requestOptions: {} },
  ): Promise<VectorStoreFileDeletionStatus> {
    return deleteVectorStoreFile(this._client, vectorStoreId, fileId, options);
  }

  /** Retrieves a vector store file. */
  getVectorStoreFile(
    vectorStoreId: string,
    fileId: string,
    options: VectorStoreFilesGetVectorStoreFileOptionalParams = { requestOptions: {} },
  ): Promise<VectorStoreFile> {
    return getVectorStoreFile(this._client, vectorStoreId, fileId, options);
  }

  /** Create a vector store file by attaching a file to a vector store. */
  createVectorStoreFile(
    vectorStoreId: string,
    options: VectorStoreFilesCreateVectorStoreFileOptionalParams = { requestOptions: {} },
  ): Promise<VectorStoreFile> {
    return createVectorStoreFile(this._client, vectorStoreId, options);
  }

  /** Create a vector store file by attaching a file to a vector store and poll. */
  createVectorStoreFileAndPoll(
    vectorStoreId: string,
    options: VectorStoreFilesCreateVectorStoreFileOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<VectorStoreFile>, VectorStoreFile> {
    return createVectorStoreFileAndPoll(this._client, vectorStoreId, options);
  }

  /** Returns a list of vector store files. */
  listVectorStoreFiles(
    vectorStoreId: string,
    options: VectorStoreFilesListVectorStoreFilesOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfVectorStoreFile> {
    return listVectorStoreFiles(this._client, vectorStoreId, options);
  }

  /** Deletes the vector store object matching the specified ID. */
  deleteVectorStore(
    vectorStoreId: string,
    options: VectorStoresDeleteVectorStoreOptionalParams = { requestOptions: {} },
  ): Promise<VectorStoreDeletionStatus> {
    return deleteVectorStore(this._client, vectorStoreId, options);
  }

  /** The ID of the vector store to modify. */
  modifyVectorStore(
    vectorStoreId: string,
    options: VectorStoresModifyVectorStoreOptionalParams = { requestOptions: {} },
  ): Promise<VectorStore> {
    return modifyVectorStore(this._client, vectorStoreId, options);
  }

  /** Returns the vector store object matching the specified ID. */
  getVectorStore(
    vectorStoreId: string,
    options: VectorStoresGetVectorStoreOptionalParams = { requestOptions: {} },
  ): Promise<VectorStore> {
    return getVectorStore(this._client, vectorStoreId, options);
  }

  /** Creates a vector store. */
  createVectorStore(
    options: VectorStoresCreateVectorStoreOptionalParams = { requestOptions: {} },
  ): Promise<VectorStore> {
    return createVectorStore(this._client, options);
  }

  /**
   * Creates a vector store and poll.
   */
  createVectorStoreAndPoll(
    options: VectorStoresCreateVectorStoreOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<VectorStore>, VectorStore> {
    return createVectorStoreAndPoll(this._client, options);
  }

  /** Returns a list of vector stores. */
  listVectorStores(
    options: VectorStoresListVectorStoresOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfVectorStore> {
    return listVectorStores(this._client, options);
  }

  /** Retrieves the raw content of a specific file. */
  getFileContent(
    fileId: string,
    options: FilesGetFileContentOptionalParams = { requestOptions: {} },
  ): Promise<Uint8Array> {
    return getFileContent(this._client, fileId, options);
  }

  /** Returns information about a specific file. Does not retrieve file content. */
  getFile(
    fileId: string,
    options: FilesGetFileOptionalParams = { requestOptions: {} },
  ): Promise<FileInfo> {
    return getFile(this._client, fileId, options);
  }

  /** Delete a previously uploaded file. */
  deleteFile(
    fileId: string,
    options: FilesDeleteFileOptionalParams = { requestOptions: {} },
  ): Promise<FileDeletionStatus> {
    return deleteFile(this._client, fileId, options);
  }

  /** Uploads a file for use by other operations. */
  uploadFile(
    file: ReadableStream | NodeJS.ReadableStream,
    purpose: FilePurpose,
    options: FilesUploadFileOptionalParams = { requestOptions: {} },
  ): Promise<FileInfo> {
    return uploadFile(
      this._client,
      { file: file, purpose: purpose, filename: options.fileName },
      options,
    );
  }

  /** Uploads a file for use by other operations and returns a poller to track the status of the operation. */
  uploadFileAndPoll(
    file: ReadableStream | NodeJS.ReadableStream,
    purpose: FilePurpose,
    options: FilesUploadFileOptionalParams = { requestOptions: {} },
  ): PollerLike<OperationState<FileInfo>, FileInfo> {
    return uploadFileAndPoll(
      this._client,
      { file: file, purpose: purpose, filename: options.fileName },
      options,
    );
  }

  /** Gets a list of previously uploaded files. */
  listFiles(options: FilesListFilesOptionalParams = { requestOptions: {} }): Promise<FileListResponse> {
    return listFiles(this._client, options);
  }

  /** Gets a list of run steps from a thread run. */
  listRunSteps(
    threadId: string,
    runId: string,
    options: RunStepsListRunStepsOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfRunStep> {
    return listRunSteps(this._client, threadId, runId, options);
  }

  /** Gets a single run step from a thread run. */
  getRunStep(
    threadId: string,
    runId: string,
    stepId: string,
    options: RunStepsGetRunStepOptionalParams = { requestOptions: {} },
  ): Promise<RunStep> {
    return getRunStep(this._client, threadId, runId, stepId, options);
  }

  /** Creates a new agent thread and immediately starts a run using that new thread. */
  createThreadAndRun(
    assistantId: string,
    options: CreateThreadAndRunOptionalParams = { requestOptions: {} },
  ): AgentRunResponse {
    return createThreadAndRun(this._client, assistantId, options);
  }

  /** Cancels a run of an in progress thread. */
  cancelRun(
    threadId: string,
    runId: string,
    options: RunsCancelRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return cancelRun(this._client, threadId, runId, options);
  }

  /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
  submitToolOutputsToRun(
    threadId: string,
    runId: string,
    toolOutputs: ToolOutput[],
    options: RunsSubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return submitToolOutputsToRun(this._client, threadId, runId, toolOutputs, options);
  }

  /** Modifies an existing thread run. */
  updateRun(
    threadId: string,
    runId: string,
    options: RunsUpdateRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return updateRun(this._client, threadId, runId, options);
  }

  /** Gets an existing run from an existing thread. */
  getRun(
    threadId: string,
    runId: string,
    options: RunsGetRunOptionalParams = { requestOptions: {} },
  ): Promise<ThreadRun> {
    return getRun(this._client, threadId, runId, options);
  }

  /** Gets a list of runs for a specified thread. */
  listRuns(
    threadId: string,
    options: RunsListRunsOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfThreadRun> {
    return listRuns(this._client, threadId, options);
  }

  /** Creates a new run for an agent thread. */
  createRun(
    threadId: string,
    assistantId: string,
    options: RunsCreateRunOptionalParams = { requestOptions: {} },
  ): AgentRunResponse {
    return createRun(this._client, threadId, assistantId, options);
  }

  /** Modifies an existing message on an existing thread. */
  updateMessage(
    threadId: string,
    messageId: string,
    options: MessagesUpdateMessageOptionalParams = { requestOptions: {} },
  ): Promise<ThreadMessage> {
    return updateMessage(this._client, threadId, messageId, options);
  }

  /** Gets an existing message from an existing thread. */
  getMessage(
    threadId: string,
    messageId: string,
    options: MessagesGetMessageOptionalParams = { requestOptions: {} },
  ): Promise<ThreadMessage> {
    return getMessage(this._client, threadId, messageId, options);
  }

  /** Gets a list of messages that exist on a thread. */
  listMessages(
    threadId: string,
    options: MessagesListMessagesOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfThreadMessage> {
    return listMessages(this._client, threadId, options);
  }

  /** Creates a new message on a specified thread. */
  createMessage(
    threadId: string,
    role: MessageRole,
    content: MessageInputContent,
    options: MessagesCreateMessageOptionalParams = { requestOptions: {} },
  ): Promise<ThreadMessage> {
    return createMessage(this._client, threadId, role, content, options);
  }

  /** Gets a list of threads that were previously created. */
  listThreads(
    options: ThreadsListThreadsOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfAgentThread> {
    return listThreads(this._client, options);
  }

  /** Deletes an existing thread. */
  deleteThread(
    threadId: string,
    options: ThreadsDeleteThreadOptionalParams = { requestOptions: {} },
  ): Promise<ThreadDeletionStatus> {
    return deleteThread(this._client, threadId, options);
  }

  /** Modifies an existing thread. */
  updateThread(
    threadId: string,
    options: ThreadsUpdateThreadOptionalParams = { requestOptions: {} },
  ): Promise<AgentThread> {
    return updateThread(this._client, threadId, options);
  }

  /** Gets information about an existing thread. */
  getThread(
    threadId: string,
    options: ThreadsGetThreadOptionalParams = { requestOptions: {} },
  ): Promise<AgentThread> {
    return getThread(this._client, threadId, options);
  }

  /** Creates a new thread. Threads contain messages and can be run by agents. */
  createThread(options: ThreadsCreateThreadOptionalParams = { requestOptions: {} }): Promise<AgentThread> {
    return createThread(this._client, options);
  }

  /** Deletes an agent. */
  deleteAgent(
    assistantId: string,
    options: DeleteAgentOptionalParams = { requestOptions: {} },
  ): Promise<AgentDeletionStatus> {
    return deleteAgent(this._client, assistantId, options);
  }

  /** Modifies an existing agent. */
  updateAgent(
    assistantId: string,
    options: UpdateAgentOptionalParams = { requestOptions: {} },
  ): Promise<Agent> {
    return updateAgent(this._client, assistantId, options);
  }

  /** Retrieves an existing agent. */
  getAgent(
    assistantId: string,
    options: GetAgentOptionalParams = { requestOptions: {} },
  ): Promise<Agent> {
    return getAgent(this._client, assistantId, options);
  }

  /** Gets a list of agents that were previously created. */
  listAgents(
    options: ListAgentsOptionalParams = { requestOptions: {} },
  ): Promise<OpenAIPageableListOfAgent> {
    return listAgents(this._client, options);
  }

  /** Creates a new agent. */
  createAgent(
    model: string,
    options: CreateAgentOptionalParams = { requestOptions: {} },
  ): Promise<Agent> {
    return createAgent(this._client, model, options);
  }
}
