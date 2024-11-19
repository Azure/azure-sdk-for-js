// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client } from "@azure-rest/core-client";
import { AgentDeletionStatusOutput, AgentOutput, AgentThreadOutput, FileDeletionStatusOutput, FileListResponseOutput, OpenAIFileOutput, OpenAIPageableListOfAgentOutput, OpenAIPageableListOfRunStepOutput, OpenAIPageableListOfThreadMessageOutput, OpenAIPageableListOfThreadRunOutput, OpenAIPageableListOfVectorStoreOutput, RunStepOutput, ThreadDeletionStatusOutput, ThreadMessageOutput, ThreadRunOutput, VectorStoreDeletionStatusOutput, VectorStoreOutput } from "../generated/src/outputModels.js";
import { ListAgentsQueryParamProperties, ListMessagesQueryParamProperties, ListRunsQueryParamProperties, ListRunStepsQueryParamProperties, ListVectorStoresQueryParamProperties, SubmitToolOutputsToRunParameters } from "../generated/src/parameters.js";
import { createAgent, deleteAgent, getAgent, listAgents, updateAgent } from "./assistants.js";
import { deleteFile, getFile, getFileContent, listFiles, uploadFile } from "./files.js";
import { createThread, deleteThread, getThread, updateThread } from "./threads.js";
import { cancelRun, createRun, createThreadAndRun, getRun, listRuns, submitToolOutputsToRun, updateRun } from "./runs.js";
import { createMessage, listMessages, updateMessage } from "./messages.js";
import { AgentThreadCreationOptions, CreateAgentOptions, CreateAndRunThreadOptions, CreateRunOptions, FilePurpose, ThreadMessageOptions, UpdateAgentOptions, UpdateAgentThreadOptions, VectorStoreOptions, VectorStoreUpdateOptions } from "../generated/src/models.js";
import { createRunStreaming, createThreadAndRunStreaming } from "./streaming.js";
import { AgentStreamEventMessage } from "./streamingModels.js";
import { UpdateMessageOptions } from "./messagesModels.js";
import { OptionalRequestParameters, UpdateRunOptions } from "./inputOutputs.js";
import { createVectorStore, deleteVectorStore, getVectorStore, listVectorStores, modifyVectorStore } from "./vectorStores.js";
import { getRunStep, listRunSteps } from "./runSteps.js";

export interface AgentsOperations {
  /** Creates a new agent. */
  createAgent: (
    model: string,
    options?: Omit<CreateAgentOptions, "model">,
  ) => Promise<AgentOutput>;

  /** Gets a list of agents that were previously created. */
  listAgents: (
    options?: ListAgentsQueryParamProperties,
  ) => Promise<OpenAIPageableListOfAgentOutput>;
  /** Retrieves an existing agent. */
  getAgent: (
    assistantId: string
  ) => Promise<AgentOutput>;
  /** Modifies an existing agent. */
  updateAgent: (
    assistantId: string,
    options: UpdateAgentOptions,
  ) => Promise<AgentOutput>;
  /** Deletes an agent. */
  deleteAgent: (
    assistantId: string
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
    options?: Omit<CreateRunOptions, "assistant_id">,
    requestParams?: OptionalRequestParameters
  ) => Promise<ThreadRunOutput>;
  /** Gets a list of runs for a specified thread. */
  listRuns: (
    threadId: string,
    options?: ListRunsQueryParamProperties,
    requestParams?: OptionalRequestParameters
  ) => Promise<OpenAIPageableListOfThreadRunOutput>;
  /** Gets an existing run from an existing thread. */
  getRun: (
    threadId: string,
    runId: string,
    requestParams?: OptionalRequestParameters,
  ) => Promise<ThreadRunOutput>;
  /** Modifies an existing thread run. */
  updateRun: (
    threadId: string,
    runId: string,
    options?: UpdateRunOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<ThreadRunOutput>;
  /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
  submitToolOutputsToRun: (
    threadId: string,
    runId: string,
    options: SubmitToolOutputsToRunParameters,
  ) => Promise<ThreadRunOutput>;
  /** Cancels a run of an in progress thread. */
  cancelRun: (
    threadId: string,
    runId: string,
    requestParams?: OptionalRequestParameters,
  ) => Promise<ThreadRunOutput>;
  /** Creates a new thread and immediately starts a run of that thread. */
  createThreadAndRun: (
    assistantId: string,
    options?: Omit<CreateAndRunThreadOptions, "assistant_id">,
    requestParams?: OptionalRequestParameters
  ) => Promise<ThreadRunOutput>;

  /** create a new thread and immediately start a run of that thread and stream */
  createRunStreaming: (threadId: string, assistantId: string, options?: Omit<CreateRunOptions, "assistant_id">, requestParams?: OptionalRequestParameters) => AsyncIterable<AgentStreamEventMessage>;

  /** create a new thread and immediately start a run of that thread and stream */
  createThreadAndRunStreaming: (assistantId: string, options?: Omit<CreateAndRunThreadOptions, "assistant_id">, requestParams?: OptionalRequestParameters) => AsyncIterable<AgentStreamEventMessage>;

  /** Creates a new message on a specified thread. */
  createMessage: (
    threadId: string,
    options: ThreadMessageOptions,
    requestParams?: OptionalRequestParameters,
  ) => Promise<ThreadMessageOutput>;
  /** Gets a list of messages that exist on a thread. */
  listMessages: (
    threadId: string,
    options?: ListMessagesQueryParamProperties,
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
  uploadFile: (data: ReadableStream |NodeJS.ReadableStream, purpose:FilePurpose, fileName?: string, requestParams?: OptionalRequestParameters   
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
  ) => Promise<string>;

  /** Returns a list of vector stores. */
  listVectorStores: (
    options?: ListVectorStoresQueryParamProperties,
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
    options?: ListRunStepsQueryParamProperties,
    requestParams?: OptionalRequestParameters,
  ) => Promise<OpenAIPageableListOfRunStepOutput>;
}

function getAgents(context: Client): AgentsOperations {
  return {
    createAgent: (model: string, options?: Omit<CreateAgentOptions, "model">) =>
      createAgent(context, { body: { ...options, model } }),
    listAgents: (options?: ListAgentsQueryParamProperties) =>
      listAgents(context, { queryParameters: options as Record<string, unknown> }),
    getAgent: (assistantId: string) =>
      getAgent(context, assistantId),
    updateAgent: (
      assistantId: string,
      options: UpdateAgentOptions,
    ) => updateAgent(context, assistantId, { body: options }),
    deleteAgent: (
      assistantId: string
    ) => deleteAgent(context, assistantId),

    createThread: (options?: AgentThreadCreationOptions, requestParams?: OptionalRequestParameters) =>
      createThread(context, { ...requestParams, body: { ...options } }),
    getThread: (threadId: string, requestParams?: OptionalRequestParameters) =>
      getThread(context, threadId, requestParams),
    updateThread: (threadId: string, options?: UpdateAgentThreadOptions, requestParams?: OptionalRequestParameters) =>
      updateThread(context, threadId, { ...requestParams, body: { ...options } }),
    deleteThread: (threadId: string, requestParams?: OptionalRequestParameters) =>
      deleteThread(context, threadId, requestParams),

    createRun: (threadId: string, assistantId: string, options?: Omit<CreateRunOptions, "assistant_id">, requestParams?: OptionalRequestParameters) =>
      createRun(context, threadId, { ...requestParams, body: { ...options, assistant_id: assistantId,  } }),
    listRuns: (threadId: string, options?: ListRunsQueryParamProperties, requestParams?: OptionalRequestParameters) =>
      listRuns(context, threadId, { ...requestParams, body: options }),
    getRun: (threadId: string, runId: string, requestParams?: OptionalRequestParameters) =>
      getRun(context, threadId, runId, requestParams),
    updateRun: (threadId: string, runId: string, options?: UpdateRunOptions, requestParams?: OptionalRequestParameters) =>
      updateRun(context, threadId, runId, { ...requestParams, body: options ?? {} }),
    submitToolOutputsToRun: (threadId: string, runId: string, options: SubmitToolOutputsToRunParameters) =>
      submitToolOutputsToRun(context, threadId, runId, options),
    cancelRun: (threadId: string, runId: string, requestParams?: OptionalRequestParameters) =>
      cancelRun(context, threadId, runId, requestParams),
    createThreadAndRun: ( assistantId: string,
      options?: Omit<CreateAndRunThreadOptions, "assistant_id">,
      requestParams?: OptionalRequestParameters) =>
      createThreadAndRun(context, { ...requestParams, body: { ...options, assistant_id: assistantId } }),
    createRunStreaming: (threadId: string, assistantId: string, options?: Omit<CreateRunOptions, "assistant_id">, requestParams?: OptionalRequestParameters) =>
      createRunStreaming(context, threadId, { ...requestParams, body: { ...options, assistant_id: assistantId } }),
    createThreadAndRunStreaming: (assistantId: string, options?: Omit<CreateAndRunThreadOptions, "assistant_id">, requestParams?: OptionalRequestParameters) =>
      createThreadAndRunStreaming(context, { ...requestParams, body: { ...options, assistant_id: assistantId } }),
  
    createMessage: (threadId: string, options: ThreadMessageOptions, requestParams?: OptionalRequestParameters) =>
      createMessage(context, threadId, {...requestParams, body: options}),
    listMessages: (threadId: string, options?: ListMessagesQueryParamProperties, requestParams?: OptionalRequestParameters) =>
      listMessages(context, threadId, {...requestParams, queryParameters: {...options}}),
    updateMessage: (threadId: string, messageId: string, options?: UpdateMessageOptions, requestParams?: OptionalRequestParameters) =>
      updateMessage(context, threadId, messageId, {...requestParams, body: {...options}}),

    listFiles: (purpose?: FilePurpose, requestParams?: OptionalRequestParameters) =>
      listFiles(context, {...requestParams, body: {purpose } }),
    uploadFile: (content: ReadableStream | NodeJS.ReadableStream, purpose: FilePurpose, fileName?: string, requestParams?: OptionalRequestParameters) =>
      uploadFile(context, {
        body: [{ name: "file" as const, body: content, filename: fileName }, {name: "purpose" as const, body: purpose}],
        ...(requestParams as { [key: string]: any; }),
        contentType: "multipart/form-data"
      }),
    deleteFile: (fileId: string, requestParams?: OptionalRequestParameters) =>
      deleteFile(context, fileId, requestParams),
    getFile: (fileId: string, requestParams?: OptionalRequestParameters) =>
      getFile(context, fileId, requestParams),
    getFileContent: (fileId: string, requestParams?: OptionalRequestParameters) =>
      getFileContent(context, fileId, requestParams),

    listVectorStores: (options?: ListVectorStoresQueryParamProperties, requestParams?: OptionalRequestParameters,) =>
      listVectorStores(context, {...requestParams, queryParameters: options as Record<string, unknown> }),
    createVectorStore: (options?: VectorStoreOptions, requestParams?: OptionalRequestParameters) =>
      createVectorStore(context, { ...requestParams, body: options as Record<string, unknown> }),
    getVectorStore: (vectorStoreId: string, requestParams?: OptionalRequestParameters) =>
      getVectorStore(context, vectorStoreId, requestParams),
    modifyVectorStore: (vectorStoreId: string, options?: VectorStoreUpdateOptions, requestParams?: OptionalRequestParameters) =>
      modifyVectorStore(context, vectorStoreId, { ...requestParams, body: options as Record<string, unknown> }),
    deleteVectorStore: (vectorStoreId: string, requestParams?: OptionalRequestParameters) =>
      deleteVectorStore(context, vectorStoreId, requestParams),
  
    getRunStep: (threadId: string, runId: string, stepId: string, requestParams?: OptionalRequestParameters) =>
      getRunStep(context, threadId, runId, stepId, { ...requestParams }),
    listRunSteps: (threadId: string, runId: string, options?: ListRunStepsQueryParamProperties, requestParams?: OptionalRequestParameters) =>
      listRunSteps(context, threadId, runId, { ...requestParams, queryParameters: options as Record<string, unknown> }),
  };
}

export function getAgentsOperations(context: Client): AgentsOperations {
  return {
    ...getAgents(context),
  };
}
