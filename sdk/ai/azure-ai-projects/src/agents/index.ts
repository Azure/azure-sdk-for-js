
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Client } from "@azure-rest/core-client";
import { AgentDeletionStatusOutput, AgentOutput, FileContentResponseOutput, FileDeletionStatusOutput, FileListResponseOutput, OpenAIFileOutput, OpenAIPageableListOfAgentOutput } from "../generated/src/outputModels.js";
import { AgentsCreateAgentParameters, AgentsDeleteAgentParameters, AgentsDeleteFileParameters, AgentsGetAgentParameters, AgentsGetFileContentParameters, AgentsGetFileParameters, AgentsListAgentsParameters, AgentsListFilesParameters, AgentsUpdateAgentParameters, AgentsUploadFileParameters } from "../generated/src/parameters.js";
import { createAgent, deleteAgent, getAgent, listAgents, updateAgent } from "./assistants.js";
import { deleteFile, getFile, getFileContent, listFiles, uploadFile } from "./files.js";

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
