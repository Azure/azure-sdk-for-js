// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientContext } from "../../api/azureAIContext.js";
import {
  Agent,
  OpenAIPageableListOfAgent,
  AgentDeletionStatus,
  MessageRole,
  AgentThread,
  ThreadDeletionStatus,
  ThreadMessage,
  OpenAIPageableListOfThreadMessage,
  ThreadRun,
  OpenAIPageableListOfThreadRun,
  ToolOutput,
  RunStep,
  OpenAIPageableListOfRunStep,
  FilePurpose,
  FileListResponse,
  OpenAIFile,
  FileDeletionStatus,
  FileContentResponse,
  OpenAIPageableListOfVectorStore,
  VectorStore,
  VectorStoreDeletionStatus,
  OpenAIPageableListOfVectorStoreFile,
  VectorStoreFile,
  VectorStoreFileDeletionStatus,
  VectorStoreFileBatch,
} from "../../models/models.js";
import {
  createAgent,
  listAgents,
  getAgent,
  updateAgent,
  deleteAgent,
  createThread,
  getThread,
  updateThread,
  deleteThread,
  createMessage,
  listMessages,
  getMessage,
  updateMessage,
  createRun,
  listRuns,
  getRun,
  updateRun,
  submitToolOutputsToRun,
  cancelRun,
  createThreadAndRun,
  getRunStep,
  listRunSteps,
  listFiles,
  uploadFile,
  deleteFile,
  getFile,
  getFileContent,
  listVectorStores,
  createVectorStore,
  getVectorStore,
  modifyVectorStore,
  deleteVectorStore,
  listVectorStoreFiles,
  createVectorStoreFile,
  getVectorStoreFile,
  deleteVectorStoreFile,
  createVectorStoreFileBatch,
  getVectorStoreFileBatch,
  cancelVectorStoreFileBatch,
  listVectorStoreFileBatchFiles,
} from "../../api/agents/index.js";
import {
  AgentsCreateAgentOptionalParams,
  AgentsListAgentsOptionalParams,
  AgentsGetAgentOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsDeleteAgentOptionalParams,
  AgentsCreateThreadOptionalParams,
  AgentsGetThreadOptionalParams,
  AgentsUpdateThreadOptionalParams,
  AgentsDeleteThreadOptionalParams,
  AgentsCreateMessageOptionalParams,
  AgentsListMessagesOptionalParams,
  AgentsGetMessageOptionalParams,
  AgentsUpdateMessageOptionalParams,
  AgentsCreateRunOptionalParams,
  AgentsListRunsOptionalParams,
  AgentsGetRunOptionalParams,
  AgentsUpdateRunOptionalParams,
  AgentsSubmitToolOutputsToRunOptionalParams,
  AgentsCancelRunOptionalParams,
  AgentsCreateThreadAndRunOptionalParams,
  AgentsGetRunStepOptionalParams,
  AgentsListRunStepsOptionalParams,
  AgentsListFilesOptionalParams,
  AgentsUploadFileOptionalParams,
  AgentsDeleteFileOptionalParams,
  AgentsGetFileOptionalParams,
  AgentsGetFileContentOptionalParams,
  AgentsListVectorStoresOptionalParams,
  AgentsCreateVectorStoreOptionalParams,
  AgentsGetVectorStoreOptionalParams,
  AgentsModifyVectorStoreOptionalParams,
  AgentsDeleteVectorStoreOptionalParams,
  AgentsListVectorStoreFilesOptionalParams,
  AgentsCreateVectorStoreFileOptionalParams,
  AgentsGetVectorStoreFileOptionalParams,
  AgentsDeleteVectorStoreFileOptionalParams,
  AgentsCreateVectorStoreFileBatchOptionalParams,
  AgentsGetVectorStoreFileBatchOptionalParams,
  AgentsCancelVectorStoreFileBatchOptionalParams,
  AgentsListVectorStoreFileBatchFilesOptionalParams,
} from "../../models/options.js";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /** Creates a new agent. */
  createAgent: (
    model: string,
    options?: AgentsCreateAgentOptionalParams,
  ) => Promise<Agent>;
  /** Gets a list of agents that were previously created. */
  listAgents: (
    options?: AgentsListAgentsOptionalParams,
  ) => Promise<OpenAIPageableListOfAgent>;
  /** Retrieves an existing agent. */
  getAgent: (
    assistantId: string,
    options?: AgentsGetAgentOptionalParams,
  ) => Promise<Agent>;
  /** Modifies an existing agent. */
  updateAgent: (
    assistantId: string,
    options?: AgentsUpdateAgentOptionalParams,
  ) => Promise<Agent>;
  /** Deletes an agent. */
  deleteAgent: (
    assistantId: string,
    options?: AgentsDeleteAgentOptionalParams,
  ) => Promise<AgentDeletionStatus>;
  /** Creates a new thread. Threads contain messages and can be run by agents. */
  createThread: (
    options?: AgentsCreateThreadOptionalParams,
  ) => Promise<AgentThread>;
  /** Gets information about an existing thread. */
  getThread: (
    threadId: string,
    options?: AgentsGetThreadOptionalParams,
  ) => Promise<AgentThread>;
  /** Modifies an existing thread. */
  updateThread: (
    threadId: string,
    options?: AgentsUpdateThreadOptionalParams,
  ) => Promise<AgentThread>;
  /** Deletes an existing thread. */
  deleteThread: (
    threadId: string,
    options?: AgentsDeleteThreadOptionalParams,
  ) => Promise<ThreadDeletionStatus>;
  /** Creates a new message on a specified thread. */
  createMessage: (
    threadId: string,
    role: MessageRole,
    content: string,
    options?: AgentsCreateMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Gets a list of messages that exist on a thread. */
  listMessages: (
    threadId: string,
    options?: AgentsListMessagesOptionalParams,
  ) => Promise<OpenAIPageableListOfThreadMessage>;
  /** Gets an existing message from an existing thread. */
  getMessage: (
    threadId: string,
    messageId: string,
    options?: AgentsGetMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Modifies an existing message on an existing thread. */
  updateMessage: (
    threadId: string,
    messageId: string,
    options?: AgentsUpdateMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Creates a new run for an agent thread. */
  createRun: (
    threadId: string,
    assistantId: string,
    options?: AgentsCreateRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Gets a list of runs for a specified thread. */
  listRuns: (
    threadId: string,
    options?: AgentsListRunsOptionalParams,
  ) => Promise<OpenAIPageableListOfThreadRun>;
  /** Gets an existing run from an existing thread. */
  getRun: (
    threadId: string,
    runId: string,
    options?: AgentsGetRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Modifies an existing thread run. */
  updateRun: (
    threadId: string,
    runId: string,
    options?: AgentsUpdateRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
  submitToolOutputsToRun: (
    threadId: string,
    runId: string,
    toolOutputs: ToolOutput[],
    options?: AgentsSubmitToolOutputsToRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Cancels a run of an in progress thread. */
  cancelRun: (
    threadId: string,
    runId: string,
    options?: AgentsCancelRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Creates a new agent thread and immediately starts a run using that new thread. */
  createThreadAndRun: (
    assistantId: string,
    options?: AgentsCreateThreadAndRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Gets a single run step from a thread run. */
  getRunStep: (
    threadId: string,
    runId: string,
    stepId: string,
    options?: AgentsGetRunStepOptionalParams,
  ) => Promise<RunStep>;
  /** Gets a list of run steps from a thread run. */
  listRunSteps: (
    threadId: string,
    runId: string,
    options?: AgentsListRunStepsOptionalParams,
  ) => Promise<OpenAIPageableListOfRunStep>;
  /** Gets a list of previously uploaded files. */
  listFiles: (
    options?: AgentsListFilesOptionalParams,
  ) => Promise<FileListResponse>;
  /** Uploads a file for use by other operations. */
  uploadFile: (
    file: Uint8Array,
    purpose: FilePurpose,
    options?: AgentsUploadFileOptionalParams,
  ) => Promise<OpenAIFile>;
  /** Delete a previously uploaded file. */
  deleteFile: (
    fileId: string,
    options?: AgentsDeleteFileOptionalParams,
  ) => Promise<FileDeletionStatus>;
  /** Returns information about a specific file. Does not retrieve file content. */
  getFile: (
    fileId: string,
    options?: AgentsGetFileOptionalParams,
  ) => Promise<OpenAIFile>;
  /** Returns information about a specific file. Does not retrieve file content. */
  getFileContent: (
    fileId: string,
    options?: AgentsGetFileContentOptionalParams,
  ) => Promise<FileContentResponse>;
  /** Returns a list of vector stores. */
  listVectorStores: (
    options?: AgentsListVectorStoresOptionalParams,
  ) => Promise<OpenAIPageableListOfVectorStore>;
  /** Creates a vector store. */
  createVectorStore: (
    options?: AgentsCreateVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Returns the vector store object matching the specified ID. */
  getVectorStore: (
    vectorStoreId: string,
    options?: AgentsGetVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** The ID of the vector store to modify. */
  modifyVectorStore: (
    vectorStoreId: string,
    options?: AgentsModifyVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Deletes the vector store object matching the specified ID. */
  deleteVectorStore: (
    vectorStoreId: string,
    options?: AgentsDeleteVectorStoreOptionalParams,
  ) => Promise<VectorStoreDeletionStatus>;
  /** Returns a list of vector store files. */
  listVectorStoreFiles: (
    vectorStoreId: string,
    options?: AgentsListVectorStoreFilesOptionalParams,
  ) => Promise<OpenAIPageableListOfVectorStoreFile>;
  /** Create a vector store file by attaching a file to a vector store. */
  createVectorStoreFile: (
    vectorStoreId: string,
    fileId: string,
    options?: AgentsCreateVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFile>;
  /** Retrieves a vector store file. */
  getVectorStoreFile: (
    vectorStoreId: string,
    fileId: string,
    options?: AgentsGetVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFile>;
  /**
   * Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted.
   * To delete the file, use the delete file endpoint.
   */
  deleteVectorStoreFile: (
    vectorStoreId: string,
    fileId: string,
    options?: AgentsDeleteVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFileDeletionStatus>;
  /** Create a vector store file batch. */
  createVectorStoreFileBatch: (
    vectorStoreId: string,
    fileIds: string[],
    options?: AgentsCreateVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Retrieve a vector store file batch. */
  getVectorStoreFileBatch: (
    vectorStoreId: string,
    batchId: string,
    options?: AgentsGetVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
  cancelVectorStoreFileBatch: (
    vectorStoreId: string,
    batchId: string,
    options?: AgentsCancelVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Returns a list of vector store files in a batch. */
  listVectorStoreFileBatchFiles: (
    vectorStoreId: string,
    batchId: string,
    options?: AgentsListVectorStoreFileBatchFilesOptionalParams,
  ) => Promise<OpenAIPageableListOfVectorStoreFile>;
}

export function getAgents(context: ClientContext) {
  return {
    createAgent: (model: string, options?: AgentsCreateAgentOptionalParams) =>
      createAgent(context, model, options),
    listAgents: (options?: AgentsListAgentsOptionalParams) =>
      listAgents(context, options),
    getAgent: (assistantId: string, options?: AgentsGetAgentOptionalParams) =>
      getAgent(context, assistantId, options),
    updateAgent: (
      assistantId: string,
      options?: AgentsUpdateAgentOptionalParams,
    ) => updateAgent(context, assistantId, options),
    deleteAgent: (
      assistantId: string,
      options?: AgentsDeleteAgentOptionalParams,
    ) => deleteAgent(context, assistantId, options),
    createThread: (options?: AgentsCreateThreadOptionalParams) =>
      createThread(context, options),
    getThread: (threadId: string, options?: AgentsGetThreadOptionalParams) =>
      getThread(context, threadId, options),
    updateThread: (
      threadId: string,
      options?: AgentsUpdateThreadOptionalParams,
    ) => updateThread(context, threadId, options),
    deleteThread: (
      threadId: string,
      options?: AgentsDeleteThreadOptionalParams,
    ) => deleteThread(context, threadId, options),
    createMessage: (
      threadId: string,
      role: MessageRole,
      content: string,
      options?: AgentsCreateMessageOptionalParams,
    ) => createMessage(context, threadId, role, content, options),
    listMessages: (
      threadId: string,
      options?: AgentsListMessagesOptionalParams,
    ) => listMessages(context, threadId, options),
    getMessage: (
      threadId: string,
      messageId: string,
      options?: AgentsGetMessageOptionalParams,
    ) => getMessage(context, threadId, messageId, options),
    updateMessage: (
      threadId: string,
      messageId: string,
      options?: AgentsUpdateMessageOptionalParams,
    ) => updateMessage(context, threadId, messageId, options),
    createRun: (
      threadId: string,
      assistantId: string,
      options?: AgentsCreateRunOptionalParams,
    ) => createRun(context, threadId, assistantId, options),
    listRuns: (threadId: string, options?: AgentsListRunsOptionalParams) =>
      listRuns(context, threadId, options),
    getRun: (
      threadId: string,
      runId: string,
      options?: AgentsGetRunOptionalParams,
    ) => getRun(context, threadId, runId, options),
    updateRun: (
      threadId: string,
      runId: string,
      options?: AgentsUpdateRunOptionalParams,
    ) => updateRun(context, threadId, runId, options),
    submitToolOutputsToRun: (
      threadId: string,
      runId: string,
      toolOutputs: ToolOutput[],
      options?: AgentsSubmitToolOutputsToRunOptionalParams,
    ) => submitToolOutputsToRun(context, threadId, runId, toolOutputs, options),
    cancelRun: (
      threadId: string,
      runId: string,
      options?: AgentsCancelRunOptionalParams,
    ) => cancelRun(context, threadId, runId, options),
    createThreadAndRun: (
      assistantId: string,
      options?: AgentsCreateThreadAndRunOptionalParams,
    ) => createThreadAndRun(context, assistantId, options),
    getRunStep: (
      threadId: string,
      runId: string,
      stepId: string,
      options?: AgentsGetRunStepOptionalParams,
    ) => getRunStep(context, threadId, runId, stepId, options),
    listRunSteps: (
      threadId: string,
      runId: string,
      options?: AgentsListRunStepsOptionalParams,
    ) => listRunSteps(context, threadId, runId, options),
    listFiles: (options?: AgentsListFilesOptionalParams) =>
      listFiles(context, options),
    uploadFile: (
      file: Uint8Array,
      purpose: FilePurpose,
      options?: AgentsUploadFileOptionalParams,
    ) => uploadFile(context, file, purpose, options),
    deleteFile: (fileId: string, options?: AgentsDeleteFileOptionalParams) =>
      deleteFile(context, fileId, options),
    getFile: (fileId: string, options?: AgentsGetFileOptionalParams) =>
      getFile(context, fileId, options),
    getFileContent: (
      fileId: string,
      options?: AgentsGetFileContentOptionalParams,
    ) => getFileContent(context, fileId, options),
    listVectorStores: (options?: AgentsListVectorStoresOptionalParams) =>
      listVectorStores(context, options),
    createVectorStore: (options?: AgentsCreateVectorStoreOptionalParams) =>
      createVectorStore(context, options),
    getVectorStore: (
      vectorStoreId: string,
      options?: AgentsGetVectorStoreOptionalParams,
    ) => getVectorStore(context, vectorStoreId, options),
    modifyVectorStore: (
      vectorStoreId: string,
      options?: AgentsModifyVectorStoreOptionalParams,
    ) => modifyVectorStore(context, vectorStoreId, options),
    deleteVectorStore: (
      vectorStoreId: string,
      options?: AgentsDeleteVectorStoreOptionalParams,
    ) => deleteVectorStore(context, vectorStoreId, options),
    listVectorStoreFiles: (
      vectorStoreId: string,
      options?: AgentsListVectorStoreFilesOptionalParams,
    ) => listVectorStoreFiles(context, vectorStoreId, options),
    createVectorStoreFile: (
      vectorStoreId: string,
      fileId: string,
      options?: AgentsCreateVectorStoreFileOptionalParams,
    ) => createVectorStoreFile(context, vectorStoreId, fileId, options),
    getVectorStoreFile: (
      vectorStoreId: string,
      fileId: string,
      options?: AgentsGetVectorStoreFileOptionalParams,
    ) => getVectorStoreFile(context, vectorStoreId, fileId, options),
    deleteVectorStoreFile: (
      vectorStoreId: string,
      fileId: string,
      options?: AgentsDeleteVectorStoreFileOptionalParams,
    ) => deleteVectorStoreFile(context, vectorStoreId, fileId, options),
    createVectorStoreFileBatch: (
      vectorStoreId: string,
      fileIds: string[],
      options?: AgentsCreateVectorStoreFileBatchOptionalParams,
    ) => createVectorStoreFileBatch(context, vectorStoreId, fileIds, options),
    getVectorStoreFileBatch: (
      vectorStoreId: string,
      batchId: string,
      options?: AgentsGetVectorStoreFileBatchOptionalParams,
    ) => getVectorStoreFileBatch(context, vectorStoreId, batchId, options),
    cancelVectorStoreFileBatch: (
      vectorStoreId: string,
      batchId: string,
      options?: AgentsCancelVectorStoreFileBatchOptionalParams,
    ) => cancelVectorStoreFileBatch(context, vectorStoreId, batchId, options),
    listVectorStoreFileBatchFiles: (
      vectorStoreId: string,
      batchId: string,
      options?: AgentsListVectorStoreFileBatchFilesOptionalParams,
    ) =>
      listVectorStoreFileBatchFiles(context, vectorStoreId, batchId, options),
  };
}

export function getAgentsOperations(context: ClientContext): AgentsOperations {
  return {
    ...getAgents(context),
  };
}
