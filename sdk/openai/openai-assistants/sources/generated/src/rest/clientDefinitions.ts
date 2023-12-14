// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CreateAssistantParameters,
  ListAssistantsParameters,
  RetrieveAssistantParameters,
  ModifyAssistantParameters,
  DeleteAssistantParameters,
  CreateAssistantFileParameters,
  ListAssistantFilesParameters,
  RetrieveAssistantFileParameters,
  DeleteAssistantFileParameters,
  CreateThreadParameters,
  RetrieveThreadParameters,
  ModifyThreadParameters,
  DeleteThreadParameters,
  CreateMessageParameters,
  ListMessagesParameters,
  RetrieveMessageParameters,
  ModifyMessageParameters,
  ListMessageFilesParameters,
  RetrieveMessageFileParameters,
  CreateRunParameters,
  ListRunsParameters,
  RetrieveRunParameters,
  ModifyRunParameters,
  SubmitRunToolOutputsParameters,
  CancelRunParameters,
  CreateThreadAndRunParameters,
  RetrieveRunStepParameters,
  ListRunStepsParameters,
  ListFilesParameters,
  UploadFileParameters,
  DeleteFileParameters,
  RetrieveFileParameters,
  RetrieveFileContentParameters,
} from "./parameters.js";
import {
  CreateAssistant200Response,
  ListAssistants200Response,
  RetrieveAssistant200Response,
  ModifyAssistant200Response,
  DeleteAssistant200Response,
  CreateAssistantFile200Response,
  ListAssistantFiles200Response,
  RetrieveAssistantFile200Response,
  DeleteAssistantFile200Response,
  CreateThread200Response,
  RetrieveThread200Response,
  ModifyThread200Response,
  DeleteThread200Response,
  CreateMessage200Response,
  ListMessages200Response,
  RetrieveMessage200Response,
  ModifyMessage200Response,
  ListMessageFiles200Response,
  RetrieveMessageFile200Response,
  CreateRun200Response,
  ListRuns200Response,
  RetrieveRun200Response,
  ModifyRun200Response,
  SubmitRunToolOutputs200Response,
  CancelRun200Response,
  CreateThreadAndRun200Response,
  RetrieveRunStep200Response,
  ListRunSteps200Response,
  ListFiles200Response,
  UploadFile200Response,
  DeleteFile200Response,
  RetrieveFile200Response,
  RetrieveFileContent200Response,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface CreateAssistant {
  /** Creates a new assistant. */
  post(
    options?: CreateAssistantParameters
  ): StreamableMethod<CreateAssistant200Response>;
  /** Gets a list of assistants that were previously created. */
  get(
    options?: ListAssistantsParameters
  ): StreamableMethod<ListAssistants200Response>;
}

export interface RetrieveAssistant {
  /** Retrieves an existing assistant. */
  get(
    options?: RetrieveAssistantParameters
  ): StreamableMethod<RetrieveAssistant200Response>;
  /** Modifies an existing assistant. */
  post(
    options: ModifyAssistantParameters
  ): StreamableMethod<ModifyAssistant200Response>;
  /** Deletes an assistant. */
  delete(
    options?: DeleteAssistantParameters
  ): StreamableMethod<DeleteAssistant200Response>;
}

export interface CreateAssistantFile {
  /** Attaches a previously uploaded file to an assistant for use by tools that can read files. */
  post(
    options?: CreateAssistantFileParameters
  ): StreamableMethod<CreateAssistantFile200Response>;
  /** Gets a list of files attached to a specific assistant, as used by tools that can read files. */
  get(
    options?: ListAssistantFilesParameters
  ): StreamableMethod<ListAssistantFiles200Response>;
}

export interface RetrieveAssistantFile {
  /** Retrieves a file attached to an assistant. */
  get(
    options?: RetrieveAssistantFileParameters
  ): StreamableMethod<RetrieveAssistantFile200Response>;
  /**
   * Unlinks a previously attached file from an assistant, rendering it unavailable for use by tools that can read
   * files.
   */
  delete(
    options?: DeleteAssistantFileParameters
  ): StreamableMethod<DeleteAssistantFile200Response>;
}

export interface CreateThread {
  /** Creates a new thread. Threads contain messages and can be run by assistants. */
  post(
    options?: CreateThreadParameters
  ): StreamableMethod<CreateThread200Response>;
}

export interface RetrieveThread {
  /** Gets information about an existing thread. */
  get(
    options?: RetrieveThreadParameters
  ): StreamableMethod<RetrieveThread200Response>;
  /** Modifies an existing thread. */
  post(
    options?: ModifyThreadParameters
  ): StreamableMethod<ModifyThread200Response>;
  /** Deletes an existing thread. */
  delete(
    options?: DeleteThreadParameters
  ): StreamableMethod<DeleteThread200Response>;
}

export interface CreateMessage {
  /** Creates a new message on a specified thread. */
  post(
    options?: CreateMessageParameters
  ): StreamableMethod<CreateMessage200Response>;
  /** Gets a list of messages that exist on a thread. */
  get(
    options?: ListMessagesParameters
  ): StreamableMethod<ListMessages200Response>;
}

export interface RetrieveMessage {
  /** Gets an existing message from an existing thread. */
  get(
    options?: RetrieveMessageParameters
  ): StreamableMethod<RetrieveMessage200Response>;
  /** Modifies an existing message on an existing thread. */
  post(
    options?: ModifyMessageParameters
  ): StreamableMethod<ModifyMessage200Response>;
}

export interface ListMessageFiles {
  /** Gets a list of previously uploaded files associated with a message from a thread. */
  get(
    options?: ListMessageFilesParameters
  ): StreamableMethod<ListMessageFiles200Response>;
}

export interface RetrieveMessageFile {
  /** Gets information about a file attachment to a message within a thread. */
  get(
    options?: RetrieveMessageFileParameters
  ): StreamableMethod<RetrieveMessageFile200Response>;
}

export interface CreateRun {
  /** Creates a new run for an assistant thread. */
  post(options?: CreateRunParameters): StreamableMethod<CreateRun200Response>;
  /** Gets a list of runs for a specified thread. */
  get(options?: ListRunsParameters): StreamableMethod<ListRuns200Response>;
}

export interface RetrieveRun {
  /** Gets an existing run from an existing thread. */
  get(
    options?: RetrieveRunParameters
  ): StreamableMethod<RetrieveRun200Response>;
  /** Modifies an existing thread run. */
  post(options?: ModifyRunParameters): StreamableMethod<ModifyRun200Response>;
}

export interface SubmitRunToolOutputs {
  /** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
  post(
    options?: SubmitRunToolOutputsParameters
  ): StreamableMethod<SubmitRunToolOutputs200Response>;
}

export interface CancelRun {
  /** Cancels a thread run. */
  post(options?: CancelRunParameters): StreamableMethod<CancelRun200Response>;
}

export interface CreateThreadAndRun {
  /** Creates a new assistant thread and immediately starts a run using that new thread. */
  post(
    options?: CreateThreadAndRunParameters
  ): StreamableMethod<CreateThreadAndRun200Response>;
}

export interface RetrieveRunStep {
  /** Gets a single run step from a thread run. */
  get(
    options?: RetrieveRunStepParameters
  ): StreamableMethod<RetrieveRunStep200Response>;
}

export interface ListRunSteps {
  /** Gets a list of run steps from a thread run. */
  get(
    options?: ListRunStepsParameters
  ): StreamableMethod<ListRunSteps200Response>;
}

export interface ListFiles {
  /** Gets a list of previously uploaded files. */
  get(options?: ListFilesParameters): StreamableMethod<ListFiles200Response>;
  /** Uploads a file for use by other operations. */
  post(options: UploadFileParameters): StreamableMethod<UploadFile200Response>;
}

export interface DeleteFile {
  /** Delete a previously uploaded file. */
  delete(
    options?: DeleteFileParameters
  ): StreamableMethod<DeleteFile200Response>;
  /** Returns information about a specific file. Does not retrieve file content. */
  get(
    options?: RetrieveFileParameters
  ): StreamableMethod<RetrieveFile200Response>;
}

export interface RetrieveFileContent {
  /** Returns the contents of a specified file. */
  get(
    options?: RetrieveFileContentParameters
  ): StreamableMethod<RetrieveFileContent200Response>;
}

export interface Routes {
  /** Resource for '/assistants' has methods for the following verbs: post, get */
  (path: "/assistants"): CreateAssistant;
  /** Resource for '/assistants/\{assistantId\}' has methods for the following verbs: get, post, delete */
  (path: "/assistants/{assistantId}", assistantId: string): RetrieveAssistant;
  /** Resource for '/assistants/\{assistantId\}/files' has methods for the following verbs: post, get */
  (
    path: "/assistants/{assistantId}/files",
    assistantId: string
  ): CreateAssistantFile;
  /** Resource for '/assistants/\{assistantId\}/files/\{fileId\}' has methods for the following verbs: get, delete */
  (
    path: "/assistants/{assistantId}/files/{fileId}",
    assistantId: string,
    fileId: string
  ): RetrieveAssistantFile;
  /** Resource for '/threads' has methods for the following verbs: post */
  (path: "/threads"): CreateThread;
  /** Resource for '/threads/\{threadId\}' has methods for the following verbs: get, post, delete */
  (path: "/threads/{threadId}", threadId: string): RetrieveThread;
  /** Resource for '/threads/\{threadId\}/messages' has methods for the following verbs: post, get */
  (path: "/threads/{threadId}/messages", threadId: string): CreateMessage;
  /** Resource for '/threads/\{threadId\}/messages/\{messageId\}' has methods for the following verbs: get, post */
  (
    path: "/threads/{threadId}/messages/{messageId}",
    threadId: string,
    messageId: string
  ): RetrieveMessage;
  /** Resource for '/threads/\{threadId\}/messages/\{messageId\}/files' has methods for the following verbs: get */
  (
    path: "/threads/{threadId}/messages/{messageId}/files",
    threadId: string,
    messageId: string
  ): ListMessageFiles;
  /** Resource for '/threads/\{threadId\}/messages/\{messageId\}/files/\{fileId\}' has methods for the following verbs: get */
  (
    path: "/threads/{threadId}/messages/{messageId}/files/{fileId}",
    threadId: string,
    messageId: string,
    fileId: string
  ): RetrieveMessageFile;
  /** Resource for '/threads/\{threadId\}/runs' has methods for the following verbs: post, get */
  (path: "/threads/{threadId}/runs", threadId: string): CreateRun;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}' has methods for the following verbs: get, post */
  (
    path: "/threads/{threadId}/runs/{runId}",
    threadId: string,
    runId: string
  ): RetrieveRun;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}/submit_tool_outputs' has methods for the following verbs: post */
  (
    path: "/threads/{threadId}/runs/{runId}/submit_tool_outputs",
    threadId: string,
    runId: string
  ): SubmitRunToolOutputs;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}/cancel' has methods for the following verbs: post */
  (
    path: "/threads/{threadId}/runs/{runId}/cancel",
    threadId: string,
    runId: string
  ): CancelRun;
  /** Resource for '/threads/runs' has methods for the following verbs: post */
  (path: "/threads/runs"): CreateThreadAndRun;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}/steps/\{stepId\}' has methods for the following verbs: get */
  (
    path: "/threads/{threadId}/runs/{runId}/steps/{stepId}",
    threadId: string,
    runId: string,
    stepId: string
  ): RetrieveRunStep;
  /** Resource for '/threads/\{threadId\}/runs/\{runId\}/steps' has methods for the following verbs: get */
  (
    path: "/threads/{threadId}/runs/{runId}/steps",
    threadId: string,
    runId: string
  ): ListRunSteps;
  /** Resource for '/files' has methods for the following verbs: get, post */
  (path: "/files"): ListFiles;
  /** Resource for '/files/\{fileId\}' has methods for the following verbs: delete, get */
  (path: "/files/{fileId}", fileId: string): DeleteFile;
  /** Resource for '/files/\{fileId\}/content' has methods for the following verbs: get */
  (path: "/files/{fileId}/content", fileId: string): RetrieveFileContent;
}

export type AssistantsContext = Client & {
  path: Routes;
};
