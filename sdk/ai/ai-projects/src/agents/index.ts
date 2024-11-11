
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client, RequestParameters } from "@azure-rest/core-client";
import { AgentDeletionStatusOutput, AgentOutput, AgentThreadOutput, FileDeletionStatusOutput, FileListResponseOutput, OpenAIFileOutput, OpenAIPageableListOfAgentOutput, OpenAIPageableListOfThreadRunOutput, ThreadDeletionStatusOutput, ThreadMessageOutput, ThreadRunOutput } from "../generated/src/outputModels.js";
import { CancelRunParameters, CreateRunParameters, CreateThreadAndRunParameters, DeleteFileParameters, GetFileContentParameters, GetFileParameters, GetRunParameters, ListAgentsQueryParamProperties, ListFilesParameters, ListMessagesParameters, ListRunsParameters, SubmitToolOutputsToRunParameters, UpdateMessageParameters, UpdateRunParameters, UploadFileParameters } from "../generated/src/parameters.js";
import { createAgent, deleteAgent, getAgent, listAgents, updateAgent } from "./assistants.js";
import { deleteFile, getFile, getFileContent, listFiles, uploadFile } from "./files.js";
import { createThread, deleteThread, getThread, updateThread } from "./threads.js";
import { cancelRun, createRun, createThreadAndRun, getRun, listRuns, submitToolOutputsToRun, updateRun } from "./runs.js";
import { createMessage, listMessages, updateMessage } from "./messages.js";
import { AgentThreadCreationOptions, CreateAgentOptions, CreateAndRunThreadOptions, CreateRunOptions, ThreadMessageOptions, UpdateAgentOptions, UpdateAgentThreadOptions } from "../generated/src/models.js";
import { createRunStreaming, createThreadAndRunStreaming } from "./streaming.js";
import { AgentStreamEventMessage } from "./streamingModels.js";

export interface AgentsOperations {
  /** Creates a new agent. */
  createAgent: (
    options: CreateAgentOptions,
  ) => Promise<AgentOutput>;

  /** Creates a new agent. */
  createAgentAlternative: (
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
    requestParams?: RequestParameters
  ) => Promise<AgentThreadOutput>;
  /** Gets information about an existing thread. */
  getThread: (
    threadId: string,
    requestParams?: RequestParameters
  ) => Promise<AgentThreadOutput>;
  /** Modifies an existing thread. */
  updateThread: (
    threadId: string,
    options?: UpdateAgentThreadOptions,
    requestParams?: RequestParameters
  ) => Promise<AgentThreadOutput>;
  /** Deletes an existing thread. */
  deleteThread: (
    threadId: string,
    requestParams?: RequestParameters
  ) => Promise<ThreadDeletionStatusOutput>;

  /** Creates and starts a new run of the specified thread using the specified agent. */
  createRun: (
    threadId: string,
    options: CreateRunParameters,
  ) => Promise<ThreadRunOutput>;
  /** Gets a list of runs for a specified thread. */
  listRuns: (
    threadId: string,
    options?: ListRunsParameters,
  ) => Promise<OpenAIPageableListOfThreadRunOutput>;
  /** Gets an existing run from an existing thread. */
  getRun: (
    threadId: string,
    runId: string,
    options?: GetRunParameters,
  ) => Promise<ThreadRunOutput>;
  /** Modifies an existing thread run. */
  updateRun: (
    threadId: string,
    runId: string,
    options: UpdateRunParameters,
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
    options?: CancelRunParameters,
  ) => Promise<ThreadRunOutput>;
  /** Creates a new thread and immediately starts a run of that thread. */
  createThreadAndRun: (
    options: CreateThreadAndRunParameters,
  ) => Promise<ThreadRunOutput>;

  /** create a new thread and immediately start a run of that thread and stream */
  createRunStreaming: (threadId: string, assistantId: string, options?: Omit<CreateRunOptions, "assistant_id">, requestParams?: RequestParameters) => AsyncIterable<AgentStreamEventMessage>;

  /** create a new thread and immediately start a run of that thread and stream */
  createThreadAndRunStreaming: (assistantId: string, options?: Omit<CreateAndRunThreadOptions, "assistant_id">, requestParams?: RequestParameters) => AsyncIterable<AgentStreamEventMessage>;

  /** Creates a new message on a specified thread. */
  createMessage: (
    threadId: string,
    options: ThreadMessageOptions,
  ) => Promise<ThreadMessageOutput>;
  /** Gets a list of messages that exist on a thread. */
  listMessages: (
    threadId: string,
    options?: ListMessagesParameters,
  ) => Promise<ThreadMessageOutput>;
  /** Modifies an existing message on an existing thread. */
  updateMessage: (
    threadId: string,
    messageId: string,
    options: UpdateMessageParameters,
  ) => Promise<ThreadMessageOutput>;

  /** Gets a list of previously uploaded files. */
  listFiles: (
    options?: ListFilesParameters,
  ) => Promise<FileListResponseOutput>;
  /** Uploads a file for use by other operations. */
  uploadFile: (
    options: UploadFileParameters,
  ) => Promise<OpenAIFileOutput>;
  /** Delete a previously uploaded file. */
  deleteFile: (
    fileId: string,
    options?: DeleteFileParameters,
  ) => Promise<FileDeletionStatusOutput>;
  /** Returns information about a specific file. Does not retrieve file content. */
  getFile: (
    fileId: string,
    options?: GetFileParameters,
  ) => Promise<OpenAIFileOutput>;
  /** Returns the content of a specific file. */
  getFileContent: (
    fileId: string,
    options?: GetFileContentParameters,
  ) => Promise<string>;
}

function getAgents(context: Client): AgentsOperations {
  return {
    createAgentAlternative: (model: string, options?: Omit<CreateAgentOptions, "model">) =>
      createAgent(context, { body: { ...options, model } }),
    createAgent: (options: CreateAgentOptions) =>
      createAgent(context, { body: options }),
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

    createThread: (options?: AgentThreadCreationOptions, requestParams?: RequestParameters) =>
      createThread(context, {...requestParams, body: {...options}}),
    getThread: (threadId: string, requestParams?: RequestParameters) =>
      getThread(context, threadId, requestParams),
    updateThread: (threadId: string, options?: UpdateAgentThreadOptions, requestParams?: RequestParameters) =>
      updateThread(context, threadId, {...requestParams, body: {...options}}),
    deleteThread: (threadId: string, requestParams?: RequestParameters) =>
      deleteThread(context, threadId, requestParams),

    createRun: (threadId: string, options: CreateRunParameters) =>
      createRun(context, threadId, options),
    listRuns: (threadId: string, options?: ListRunsParameters) =>
      listRuns(context, threadId, options),
    getRun: (threadId: string, runId: string, options?: GetRunParameters) =>
      getRun(context, threadId, runId, options),
    updateRun: (threadId: string, runId: string, options: UpdateRunParameters) =>
      updateRun(context, threadId, runId, options),
    submitToolOutputsToRun: (threadId: string, runId: string, options: SubmitToolOutputsToRunParameters) =>
      submitToolOutputsToRun(context, threadId, runId, options),
    cancelRun: (threadId: string, runId: string, options?: CancelRunParameters) =>
      cancelRun(context, threadId, runId, options),
    createThreadAndRun: (options: CreateThreadAndRunParameters) =>
      createThreadAndRun(context, options),
    createRunStreaming: (threadId: string, assistantId: string, options?: Omit<CreateRunOptions, "assistant_id">, requestParams?: RequestParameters) =>
      createRunStreaming(context, threadId, {...requestParams, body: { ...options, assistant_id: assistantId } }),
    createThreadAndRunStreaming: (assistantId: string, options?: Omit<CreateAndRunThreadOptions, "assistant_id">, requestParams?: RequestParameters) =>
      createThreadAndRunStreaming(context, { ...requestParams, body: { ...options, assistant_id: assistantId } }),
    createMessage: (threadId: string, options: ThreadMessageOptions) =>
      createMessage(context, threadId, { body: options }),
    listMessages: (threadId: string, options?: ListMessagesParameters) =>
      listMessages(context, threadId, options),
    updateMessage: (threadId: string, messageId: string, options: UpdateMessageParameters) =>
      updateMessage(context, threadId, messageId, options),

    listFiles: (options?: ListFilesParameters) =>
      listFiles(context, options),
    uploadFile: (options: UploadFileParameters) =>
      uploadFile(context, options),
    deleteFile: (fileId: string, options?: DeleteFileParameters) =>
      deleteFile(context, fileId, options),
    getFile: (fileId: string, options?: GetFileParameters) =>
      getFile(context, fileId, options),
    getFileContent: (fileId: string, options?: GetFileContentParameters) =>
      getFileContent(context, fileId, options),
  };
}

export function getAgentsOperations(context: Client): AgentsOperations {
  return {
    ...getAgents(context),
  };
}
