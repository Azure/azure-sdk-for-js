
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client } from "@azure-rest/core-client";
import { AgentDeletionStatusOutput, AgentOutput, AgentThreadOutput, FileContentResponseOutput, FileDeletionStatusOutput, FileListResponseOutput, OpenAIFileOutput, OpenAIPageableListOfAgentOutput, OpenAIPageableListOfThreadRunOutput, ThreadDeletionStatusOutput, ThreadMessageOutput, ThreadRunOutput } from "../generated/src/outputModels.js";
import { AgentsCancelRunParameters, AgentsCreateAgentParameters, AgentsCreateMessageParameters, AgentsCreateRunParameters, AgentsCreateThreadAndRunParameters, AgentsCreateThreadParameters, AgentsDeleteAgentParameters, AgentsDeleteFileParameters, AgentsDeleteThreadParameters, AgentsGetAgentParameters, AgentsGetFileContentParameters, AgentsGetFileParameters, AgentsGetRunParameters, AgentsGetThreadParameters, AgentsListAgentsParameters, AgentsListFilesParameters, AgentsListMessagesParameters, AgentsListRunsParameters, AgentsSubmitToolOutputsToRunParameters, AgentsUpdateAgentParameters, AgentsUpdateMessageParameters, AgentsUpdateRunParameters, AgentsUpdateThreadParameters, AgentsUploadFileParameters } from "../generated/src/parameters.js";
import { createAgent, deleteAgent, getAgent, listAgents, updateAgent } from "./assistants.js";
import { deleteFile, getFile, getFileContent, listFiles, uploadFile } from "./files.js";
import { createThread, deleteThread, getThread, updateThread } from "./threads.js";
import { cancelRun, createRun, createThreadAndRun, getRun, listRuns, submitToolOutputsToRun, updateRun } from "./runs.js";
import { createMessage, listMessages, updateMessage } from "./messages.js";

export interface AgentsOperations {
    /** Creates a new agent. */
    createAgent: (
      options: AgentsCreateAgentParameters,
    ) => Promise<AgentOutput>;
    /** Gets a list of agents that were previously created. */
    listAgents: (
      options?: AgentsListAgentsParameters,
    ) => Promise<OpenAIPageableListOfAgentOutput>;
    /** Retrieves an existing agent. */
    getAgent: (
      assistantId: string,
      options?: AgentsGetAgentParameters,
    ) => Promise<AgentOutput>;
    /** Modifies an existing agent. */
    updateAgent: (
      assistantId: string,
      options?: AgentsUpdateAgentParameters,
    ) => Promise<AgentOutput>;
    /** Deletes an agent. */
    deleteAgent: (
      assistantId: string,
      options?: AgentsDeleteAgentParameters,
    ) => Promise<AgentDeletionStatusOutput>;

    /** Creates a new thread. Threads contain messages and can be run by agents. */
    createThread: (
      options: AgentsCreateThreadParameters,
    ) => Promise<AgentThreadOutput>;
    /** Gets information about an existing thread. */
    getThread: (
      threadId: string,
      options?: AgentsGetThreadParameters,
    ) => Promise<AgentThreadOutput>;
    /** Modifies an existing thread. */
    updateThread: (
      threadId: string,
      options: AgentsUpdateThreadParameters,
    ) => Promise<AgentThreadOutput>;
    /** Deletes an existing thread. */
    deleteThread: (
      threadId: string,
      options?: AgentsDeleteThreadParameters,
    ) => Promise<ThreadDeletionStatusOutput>;

    /** Creates and starts a new run of the specified thread using the specified agent. */
    createRun: (
      threadId: string,
      options: AgentsCreateRunParameters,
    ) => Promise<ThreadRunOutput>;
    /** Gets a list of runs for a specified thread. */
    listRuns: (
      threadId: string,
      options?: AgentsListRunsParameters,
    ) => Promise<OpenAIPageableListOfThreadRunOutput>;
    /** Gets an existing run from an existing thread. */
    getRun: (
      threadId: string,
      runId: string,
      options?: AgentsGetRunParameters,
    ) => Promise<ThreadRunOutput>;
    /** Modifies an existing thread run. */
    updateRun: (
      threadId: string,
      runId: string,
      options: AgentsUpdateRunParameters,
    ) => Promise<ThreadRunOutput>;
    /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
    submitToolOutputsToRun: (
      threadId: string,
      runId: string,
      options: AgentsSubmitToolOutputsToRunParameters,
    ) => Promise<ThreadRunOutput>;
    /** Cancels a run of an in progress thread. */
    cancelRun: (
      threadId: string,
      runId: string,
      options?: AgentsCancelRunParameters,
    ) => Promise<ThreadRunOutput>;
    /** Creates a new thread and immediately starts a run of that thread. */
    createThreadAndRun: (
      options: AgentsCreateThreadAndRunParameters,
    ) => Promise<ThreadRunOutput>;

    /** Creates a new message on a specified thread. */
    createMessage: (
      threadId: string,
      options: AgentsCreateMessageParameters,
    ) => Promise<ThreadMessageOutput>;
    /** Gets a list of messages that exist on a thread. */
    listMessages: (
      threadId: string,
      options?: AgentsListMessagesParameters,
    ) => Promise<ThreadMessageOutput>;
    /** Modifies an existing message on an existing thread. */
    updateMessage: (
      threadId: string,
      messageId: string,
      options: AgentsUpdateMessageParameters,
    ) => Promise<ThreadMessageOutput>;

    /** Gets a list of previously uploaded files. */
    listFiles: (
      options?: AgentsListFilesParameters,
    ) => Promise<FileListResponseOutput>;
    /** Uploads a file for use by other operations. */
    uploadFile: (
      options: AgentsUploadFileParameters,
    ) => Promise<OpenAIFileOutput>;
    /** Delete a previously uploaded file. */
    deleteFile: (
      fileId: string,
      options?: AgentsDeleteFileParameters,
    ) => Promise<FileDeletionStatusOutput>;
    /** Returns information about a specific file. Does not retrieve file content. */
    getFile: (
      fileId: string,
      options?: AgentsGetFileParameters,
    ) => Promise<OpenAIFileOutput>;
    /** Returns the content of a specific file. */
    getFileContent: (
      fileId: string,
      options?: AgentsGetFileContentParameters,
    ) => Promise<FileContentResponseOutput>;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export function getAgents(context: Client)  {
    return {
      createAgent: (options: AgentsCreateAgentParameters) =>
        createAgent(context, options),
      listAgents: (options?: AgentsListAgentsParameters) =>
        listAgents(context, options),
      getAgent: (assistantId: string, options?: AgentsGetAgentParameters) =>
        getAgent(context, assistantId, options),
      updateAgent: (
        assistantId: string,
        options?: AgentsUpdateAgentParameters,
      ) => updateAgent(context, assistantId, options),
      deleteAgent: (
        assistantId: string,
        options?: AgentsDeleteAgentParameters,
      ) => deleteAgent(context, assistantId, options),

      createThread: (options: AgentsCreateThreadParameters) =>
        createThread(context, options),
      getThread: (threadId: string, options?: AgentsGetThreadParameters) =>
        getThread(context, threadId, options),
      updateThread: (threadId: string, options: AgentsUpdateThreadParameters) =>
        updateThread(context, threadId, options),
      deleteThread: (threadId: string, options?: AgentsDeleteThreadParameters) =>
        deleteThread(context, threadId, options),

      createRun: (threadId: string, options: AgentsCreateRunParameters) =>
        createRun(context, threadId, options),
      listRuns: (threadId: string, options?: AgentsListRunsParameters) =>
        listRuns(context, threadId, options),
      getRun: (threadId: string, runId: string, options?: AgentsGetRunParameters) =>
        getRun(context, threadId, runId, options),
      updateRun: (threadId: string, runId: string, options: AgentsUpdateRunParameters) =>
        updateRun(context, threadId, runId, options),
      submitToolOutputsToRun: (threadId: string, runId: string, options: AgentsSubmitToolOutputsToRunParameters) =>
        submitToolOutputsToRun(context, threadId, runId, options),
      cancelRun: (threadId: string, runId: string, options?: AgentsCancelRunParameters) =>
        cancelRun(context, threadId, runId, options),
      createThreadAndRun: (options: AgentsCreateThreadAndRunParameters) =>
        createThreadAndRun(context, options),

      createMessage: (threadId: string, options: AgentsCreateMessageParameters) =>
        createMessage(context, threadId, options),
      listMessages: (threadId: string, options?: AgentsListMessagesParameters) =>
        listMessages(context, threadId, options),
      updateMessage: (threadId: string, messageId: string, options: AgentsUpdateMessageParameters) =>
        updateMessage(context, threadId, messageId, options),

      listFiles: (options?: AgentsListFilesParameters) =>
        listFiles(context, options),
      uploadFile: (options: AgentsUploadFileParameters) =>
        uploadFile(context, options),
      deleteFile: (fileId: string, options?: AgentsDeleteFileParameters) =>
        deleteFile(context, fileId, options),
      getFile: (fileId: string, options?: AgentsGetFileParameters) =>
        getFile(context, fileId, options),
      getFileContent: (fileId: string, options?: AgentsGetFileContentParameters) =>
        getFileContent(context, fileId, options),
    };
}

export function getAgentsOperations(context: Client): AgentsOperations {
    return {
     ...getAgents(context),
    };
}
