// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  listVectorStoreFileBatchFiles,
  cancelVectorStoreFileBatch,
  getVectorStoreFileBatch,
  createVectorStoreFileBatch,
  deleteVectorStoreFile,
  getVectorStoreFile,
  createVectorStoreFile,
  listVectorStoreFiles,
  deleteVectorStore,
  modifyVectorStore,
  getVectorStore,
  createVectorStore,
  listVectorStores,
  getFileContent,
  getFile,
  deleteFile,
  uploadFile,
  listFiles,
  listRunSteps,
  getRunStep,
  createThreadAndRun,
  cancelRun,
  submitToolOutputsToRun,
  updateRun,
  getRun,
  listRuns,
  createRun,
  updateMessage,
  getMessage,
  listMessages,
  createMessage,
  deleteThread,
  updateThread,
  getThread,
  createThread,
  deleteAgent,
  updateAgent,
  getAgent,
  listAgents,
  createAgent,
} from "../../api/agents/index.js";
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
  FileListResponse,
  OpenAIFile,
  FilePurpose,
  FileDeletionStatus,
  OpenAIPageableListOfVectorStore,
  VectorStore,
  VectorStoreDeletionStatus,
  OpenAIPageableListOfVectorStoreFile,
  VectorStoreFile,
  VectorStoreFileDeletionStatus,
  VectorStoreFileBatch,
} from "../../models/agents/models.js";
import {
  AgentsListVectorStoreFileBatchFilesOptionalParams,
  AgentsCancelVectorStoreFileBatchOptionalParams,
  AgentsGetVectorStoreFileBatchOptionalParams,
  AgentsCreateVectorStoreFileBatchOptionalParams,
  AgentsDeleteVectorStoreFileOptionalParams,
  AgentsGetVectorStoreFileOptionalParams,
  AgentsCreateVectorStoreFileOptionalParams,
  AgentsListVectorStoreFilesOptionalParams,
  AgentsDeleteVectorStoreOptionalParams,
  AgentsModifyVectorStoreOptionalParams,
  AgentsGetVectorStoreOptionalParams,
  AgentsCreateVectorStoreOptionalParams,
  AgentsListVectorStoresOptionalParams,
  AgentsGetFileContentOptionalParams,
  AgentsGetFileOptionalParams,
  AgentsDeleteFileOptionalParams,
  AgentsUploadFileOptionalParams,
  AgentsListFilesOptionalParams,
  AgentsListRunStepsOptionalParams,
  AgentsGetRunStepOptionalParams,
  AgentsCreateThreadAndRunOptionalParams,
  AgentsCancelRunOptionalParams,
  AgentsSubmitToolOutputsToRunOptionalParams,
  AgentsUpdateRunOptionalParams,
  AgentsGetRunOptionalParams,
  AgentsListRunsOptionalParams,
  AgentsCreateRunOptionalParams,
  AgentsUpdateMessageOptionalParams,
  AgentsGetMessageOptionalParams,
  AgentsListMessagesOptionalParams,
  AgentsCreateMessageOptionalParams,
  AgentsDeleteThreadOptionalParams,
  AgentsUpdateThreadOptionalParams,
  AgentsGetThreadOptionalParams,
  AgentsCreateThreadOptionalParams,
  AgentsDeleteAgentOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsGetAgentOptionalParams,
  AgentsListAgentsOptionalParams,
  AgentsCreateAgentOptionalParams,
} from "../../api/options.js";

/** Interface representing a Agents operations. */
export interface AgentsOperations {
  /** Returns a list of vector store files in a batch. */
  listVectorStoreFileBatchFiles: (
    vectorStoreId: string,
    batchId: string,
    options?: AgentsListVectorStoreFileBatchFilesOptionalParams,
  ) => Promise<OpenAIPageableListOfVectorStoreFile>;
  /** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
  cancelVectorStoreFileBatch: (
    vectorStoreId: string,
    batchId: string,
    options?: AgentsCancelVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Retrieve a vector store file batch. */
  getVectorStoreFileBatch: (
    vectorStoreId: string,
    batchId: string,
    options?: AgentsGetVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /** Create a vector store file batch. */
  createVectorStoreFileBatch: (
    vectorStoreId: string,
    options?: AgentsCreateVectorStoreFileBatchOptionalParams,
  ) => Promise<VectorStoreFileBatch>;
  /**
   * Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted.
   * To delete the file, use the delete file endpoint.
   */
  deleteVectorStoreFile: (
    vectorStoreId: string,
    fileId: string,
    options?: AgentsDeleteVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFileDeletionStatus>;
  /** Retrieves a vector store file. */
  getVectorStoreFile: (
    vectorStoreId: string,
    fileId: string,
    options?: AgentsGetVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFile>;
  /** Create a vector store file by attaching a file to a vector store. */
  createVectorStoreFile: (
    vectorStoreId: string,
    options?: AgentsCreateVectorStoreFileOptionalParams,
  ) => Promise<VectorStoreFile>;
  /** Returns a list of vector store files. */
  listVectorStoreFiles: (
    vectorStoreId: string,
    options?: AgentsListVectorStoreFilesOptionalParams,
  ) => Promise<OpenAIPageableListOfVectorStoreFile>;
  /** Deletes the vector store object matching the specified ID. */
  deleteVectorStore: (
    vectorStoreId: string,
    options?: AgentsDeleteVectorStoreOptionalParams,
  ) => Promise<VectorStoreDeletionStatus>;
  /** The ID of the vector store to modify. */
  modifyVectorStore: (
    vectorStoreId: string,
    options?: AgentsModifyVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Returns the vector store object matching the specified ID. */
  getVectorStore: (
    vectorStoreId: string,
    options?: AgentsGetVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Creates a vector store. */
  createVectorStore: (
    options?: AgentsCreateVectorStoreOptionalParams,
  ) => Promise<VectorStore>;
  /** Returns a list of vector stores. */
  listVectorStores: (
    options?: AgentsListVectorStoresOptionalParams,
  ) => Promise<OpenAIPageableListOfVectorStore>;
  /** Retrieves the raw content of a specific file. */
  getFileContent: (
    fileId: string,
    options?: AgentsGetFileContentOptionalParams,
  ) => Promise<Uint8Array>;
  /** Returns information about a specific file. Does not retrieve file content. */
  getFile: (
    fileId: string,
    options?: AgentsGetFileOptionalParams,
  ) => Promise<OpenAIFile>;
  /** Delete a previously uploaded file. */
  deleteFile: (
    fileId: string,
    options?: AgentsDeleteFileOptionalParams,
  ) => Promise<FileDeletionStatus>;
  /** Uploads a file for use by other operations. */
  uploadFile: (
    file: Uint8Array,
    purpose: FilePurpose,
    options?: AgentsUploadFileOptionalParams,
  ) => Promise<OpenAIFile>;
  /** Gets a list of previously uploaded files. */
  listFiles: (
    options?: AgentsListFilesOptionalParams,
  ) => Promise<FileListResponse>;
  /** Gets a list of run steps from a thread run. */
  listRunSteps: (
    threadId: string,
    runId: string,
    options?: AgentsListRunStepsOptionalParams,
  ) => Promise<OpenAIPageableListOfRunStep>;
  /** Gets a single run step from a thread run. */
  getRunStep: (
    threadId: string,
    runId: string,
    stepId: string,
    options?: AgentsGetRunStepOptionalParams,
  ) => Promise<RunStep>;
  /** Creates a new agent thread and immediately starts a run using that new thread. */
  createThreadAndRun: (
    assistantId: string,
    options?: AgentsCreateThreadAndRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Cancels a run of an in progress thread. */
  cancelRun: (
    threadId: string,
    runId: string,
    options?: AgentsCancelRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
  submitToolOutputsToRun: (
    threadId: string,
    runId: string,
    toolOutputs: ToolOutput[],
    options?: AgentsSubmitToolOutputsToRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Modifies an existing thread run. */
  updateRun: (
    threadId: string,
    runId: string,
    options?: AgentsUpdateRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Gets an existing run from an existing thread. */
  getRun: (
    threadId: string,
    runId: string,
    options?: AgentsGetRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Gets a list of runs for a specified thread. */
  listRuns: (
    threadId: string,
    options?: AgentsListRunsOptionalParams,
  ) => Promise<OpenAIPageableListOfThreadRun>;
  /** Creates a new run for an agent thread. */
  createRun: (
    threadId: string,
    assistantId: string,
    options?: AgentsCreateRunOptionalParams,
  ) => Promise<ThreadRun>;
  /** Modifies an existing message on an existing thread. */
  updateMessage: (
    threadId: string,
    messageId: string,
    options?: AgentsUpdateMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Gets an existing message from an existing thread. */
  getMessage: (
    threadId: string,
    messageId: string,
    options?: AgentsGetMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Gets a list of messages that exist on a thread. */
  listMessages: (
    threadId: string,
    options?: AgentsListMessagesOptionalParams,
  ) => Promise<OpenAIPageableListOfThreadMessage>;
  /** Creates a new message on a specified thread. */
  createMessage: (
    threadId: string,
    role: MessageRole,
    content: string,
    options?: AgentsCreateMessageOptionalParams,
  ) => Promise<ThreadMessage>;
  /** Deletes an existing thread. */
  deleteThread: (
    threadId: string,
    options?: AgentsDeleteThreadOptionalParams,
  ) => Promise<ThreadDeletionStatus>;
  /** Modifies an existing thread. */
  updateThread: (
    threadId: string,
    options?: AgentsUpdateThreadOptionalParams,
  ) => Promise<AgentThread>;
  /** Gets information about an existing thread. */
  getThread: (
    threadId: string,
    options?: AgentsGetThreadOptionalParams,
  ) => Promise<AgentThread>;
  /** Creates a new thread. Threads contain messages and can be run by agents. */
  createThread: (
    options?: AgentsCreateThreadOptionalParams,
  ) => Promise<AgentThread>;
  /** Deletes an agent. */
  deleteAgent: (
    assistantId: string,
    options?: AgentsDeleteAgentOptionalParams,
  ) => Promise<AgentDeletionStatus>;
  /** Modifies an existing agent. */
  updateAgent: (
    assistantId: string,
    options?: AgentsUpdateAgentOptionalParams,
  ) => Promise<Agent>;
  /** Retrieves an existing agent. */
  getAgent: (
    assistantId: string,
    options?: AgentsGetAgentOptionalParams,
  ) => Promise<Agent>;
  /** Gets a list of agents that were previously created. */
  listAgents: (
    options?: AgentsListAgentsOptionalParams,
  ) => Promise<OpenAIPageableListOfAgent>;
  /** Creates a new agent. */
  createAgent: (
    model: string,
    options?: AgentsCreateAgentOptionalParams,
  ) => Promise<Agent>;
}

function _getAgents(context: AIProjectContext) {
  return {
    listVectorStoreFileBatchFiles: (
      vectorStoreId: string,
      batchId: string,
      options?: AgentsListVectorStoreFileBatchFilesOptionalParams,
    ) =>
      listVectorStoreFileBatchFiles(context, vectorStoreId, batchId, options),
    cancelVectorStoreFileBatch: (
      vectorStoreId: string,
      batchId: string,
      options?: AgentsCancelVectorStoreFileBatchOptionalParams,
    ) => cancelVectorStoreFileBatch(context, vectorStoreId, batchId, options),
    getVectorStoreFileBatch: (
      vectorStoreId: string,
      batchId: string,
      options?: AgentsGetVectorStoreFileBatchOptionalParams,
    ) => getVectorStoreFileBatch(context, vectorStoreId, batchId, options),
    createVectorStoreFileBatch: (
      vectorStoreId: string,
      options?: AgentsCreateVectorStoreFileBatchOptionalParams,
    ) => createVectorStoreFileBatch(context, vectorStoreId, options),
    deleteVectorStoreFile: (
      vectorStoreId: string,
      fileId: string,
      options?: AgentsDeleteVectorStoreFileOptionalParams,
    ) => deleteVectorStoreFile(context, vectorStoreId, fileId, options),
    getVectorStoreFile: (
      vectorStoreId: string,
      fileId: string,
      options?: AgentsGetVectorStoreFileOptionalParams,
    ) => getVectorStoreFile(context, vectorStoreId, fileId, options),
    createVectorStoreFile: (
      vectorStoreId: string,
      options?: AgentsCreateVectorStoreFileOptionalParams,
    ) => createVectorStoreFile(context, vectorStoreId, options),
    listVectorStoreFiles: (
      vectorStoreId: string,
      options?: AgentsListVectorStoreFilesOptionalParams,
    ) => listVectorStoreFiles(context, vectorStoreId, options),
    deleteVectorStore: (
      vectorStoreId: string,
      options?: AgentsDeleteVectorStoreOptionalParams,
    ) => deleteVectorStore(context, vectorStoreId, options),
    modifyVectorStore: (
      vectorStoreId: string,
      options?: AgentsModifyVectorStoreOptionalParams,
    ) => modifyVectorStore(context, vectorStoreId, options),
    getVectorStore: (
      vectorStoreId: string,
      options?: AgentsGetVectorStoreOptionalParams,
    ) => getVectorStore(context, vectorStoreId, options),
    createVectorStore: (options?: AgentsCreateVectorStoreOptionalParams) =>
      createVectorStore(context, options),
    listVectorStores: (options?: AgentsListVectorStoresOptionalParams) =>
      listVectorStores(context, options),
    getFileContent: (
      fileId: string,
      options?: AgentsGetFileContentOptionalParams,
    ) => getFileContent(context, fileId, options),
    getFile: (fileId: string, options?: AgentsGetFileOptionalParams) =>
      getFile(context, fileId, options),
    deleteFile: (fileId: string, options?: AgentsDeleteFileOptionalParams) =>
      deleteFile(context, fileId, options),
    uploadFile: (
      file: Uint8Array,
      purpose: FilePurpose,
      options?: AgentsUploadFileOptionalParams,
    ) => uploadFile(context, file, purpose, options),
    listFiles: (options?: AgentsListFilesOptionalParams) =>
      listFiles(context, options),
    listRunSteps: (
      threadId: string,
      runId: string,
      options?: AgentsListRunStepsOptionalParams,
    ) => listRunSteps(context, threadId, runId, options),
    getRunStep: (
      threadId: string,
      runId: string,
      stepId: string,
      options?: AgentsGetRunStepOptionalParams,
    ) => getRunStep(context, threadId, runId, stepId, options),
    createThreadAndRun: (
      assistantId: string,
      options?: AgentsCreateThreadAndRunOptionalParams,
    ) => createThreadAndRun(context, assistantId, options),
    cancelRun: (
      threadId: string,
      runId: string,
      options?: AgentsCancelRunOptionalParams,
    ) => cancelRun(context, threadId, runId, options),
    submitToolOutputsToRun: (
      threadId: string,
      runId: string,
      toolOutputs: ToolOutput[],
      options?: AgentsSubmitToolOutputsToRunOptionalParams,
    ) => submitToolOutputsToRun(context, threadId, runId, toolOutputs, options),
    updateRun: (
      threadId: string,
      runId: string,
      options?: AgentsUpdateRunOptionalParams,
    ) => updateRun(context, threadId, runId, options),
    getRun: (
      threadId: string,
      runId: string,
      options?: AgentsGetRunOptionalParams,
    ) => getRun(context, threadId, runId, options),
    listRuns: (threadId: string, options?: AgentsListRunsOptionalParams) =>
      listRuns(context, threadId, options),
    createRun: (
      threadId: string,
      assistantId: string,
      options?: AgentsCreateRunOptionalParams,
    ) => createRun(context, threadId, assistantId, options),
    updateMessage: (
      threadId: string,
      messageId: string,
      options?: AgentsUpdateMessageOptionalParams,
    ) => updateMessage(context, threadId, messageId, options),
    getMessage: (
      threadId: string,
      messageId: string,
      options?: AgentsGetMessageOptionalParams,
    ) => getMessage(context, threadId, messageId, options),
    listMessages: (
      threadId: string,
      options?: AgentsListMessagesOptionalParams,
    ) => listMessages(context, threadId, options),
    createMessage: (
      threadId: string,
      role: MessageRole,
      content: string,
      options?: AgentsCreateMessageOptionalParams,
    ) => createMessage(context, threadId, role, content, options),
    deleteThread: (
      threadId: string,
      options?: AgentsDeleteThreadOptionalParams,
    ) => deleteThread(context, threadId, options),
    updateThread: (
      threadId: string,
      options?: AgentsUpdateThreadOptionalParams,
    ) => updateThread(context, threadId, options),
    getThread: (threadId: string, options?: AgentsGetThreadOptionalParams) =>
      getThread(context, threadId, options),
    createThread: (options?: AgentsCreateThreadOptionalParams) =>
      createThread(context, options),
    deleteAgent: (
      assistantId: string,
      options?: AgentsDeleteAgentOptionalParams,
    ) => deleteAgent(context, assistantId, options),
    updateAgent: (
      assistantId: string,
      options?: AgentsUpdateAgentOptionalParams,
    ) => updateAgent(context, assistantId, options),
    getAgent: (assistantId: string, options?: AgentsGetAgentOptionalParams) =>
      getAgent(context, assistantId, options),
    listAgents: (options?: AgentsListAgentsOptionalParams) =>
      listAgents(context, options),
    createAgent: (model: string, options?: AgentsCreateAgentOptionalParams) =>
      createAgent(context, model, options),
  };
}

export function _getAgentsOperations(
  context: AIProjectContext,
): AgentsOperations {
  return {
    ..._getAgents(context),
  };
}
