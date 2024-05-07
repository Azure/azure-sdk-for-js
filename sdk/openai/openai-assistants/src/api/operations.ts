// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import {
  StreamableMethod,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { createFile } from "@azure/core-rest-pipeline";
import { parseToolCallOutput, parseRequiredToolCallOutput } from "../models/helpers.js";
import {
  Assistant,
  AssistantFile,
  CreateThreadOptions,
  FilePurpose,
  GetMessageOptions,
  InputFile,
  ListAssistantFilesOptions,
  ListAssistantsOptions,
  ListMessageFilesOptions,
  ListMessagesOptions,
  ListRunStepsOptions,
  ListRunsOptions,
  MessageFile,
  RunStep,
  RunStepDetails,
  ToolCall,
  UploadFileOptions,
} from "../models/index.js";
import {
  AssistantCreationOptions,
  AssistantDeletionStatus,
  AssistantFileDeletionStatus,
  AssistantThread,
  AssistantThreadCreationOptions,
  CreateAndRunThreadOptions,
  CreateRunOptions,
  FileDeletionStatus,
  FileListResponse,
  ListResponseOf,
  MessageContent,
  MessageRole,
  ThreadDeletionStatus,
  ThreadMessage,
  ThreadRun,
  ToolOutput,
  UpdateAssistantOptions,
} from "../models/models.js";
import {
  CancelRunOptions,
  CreateAssistantFileOptions,
  CreateAssistantOptions,
  CreateMessageOptions,
  CreateRunRequestOptions,
  CreateThreadAndRunOptions,
  DeleteAssistantFileOptions,
  DeleteAssistantOptions,
  DeleteFileOptions,
  DeleteThreadOptions,
  GetAssistantFileOptions,
  GetAssistantOptions,
  GetFileOptions,
  GetMessageFileOptions,
  GetRunOptions,
  GetRunStepOptions,
  GetThreadOptions,
  ListFilesOptions,
  SubmitToolOutputsToRunOptions,
  UpdateAssistantRequestOptions,
  UpdateMessageOptions,
  UpdateRunOptions,
  UpdateThreadOptions,
} from "../models/options.js";
import {
  CancelRun200Response,
  AssistantsContext as Client,
  CreateAssistant200Response,
  CreateAssistantFile200Response,
  CreateMessage200Response,
  CreateRun200Response,
  CreateThread200Response,
  CreateThreadAndRun200Response,
  DeleteAssistant200Response,
  DeleteAssistantFile200Response,
  DeleteFile200Response,
  DeleteThread200Response,
  GetAssistant200Response,
  GetAssistantFile200Response,
  GetFile200Response,
  GetMessage200Response,
  GetMessageFile200Response,
  GetRun200Response,
  GetRunStep200Response,
  GetThread200Response,
  ListAssistantFiles200Response,
  ListAssistants200Response,
  ListFiles200Response,
  ListMessageFiles200Response,
  ListMessages200Response,
  ListRuns200Response,
  RunStepDetailsOutput,
  RunStepOutput,
  SubmitToolOutputsToRun200Response,
  UpdateAssistant200Response,
  UpdateMessage200Response,
  UpdateRun200Response,
  UpdateThread200Response,
  UploadFile200Response,
} from "../rest/index.js";
import { MessageContentOutput } from "../rest/outputModels.js";
import { ListRunSteps200Response } from "../rest/responses.js";
import { camelCaseKeys, unixToDate } from "./util.js";

export function _createAssistantSend(
  context: Client,
  body: AssistantCreationOptions,
  options: CreateAssistantOptions = { requestOptions: {} },
): StreamableMethod<CreateAssistant200Response> {
  return context.path("/assistants").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      model: body["model"],
      name: body["name"],
      description: body["description"],
      instructions: body["instructions"],
      tools: body["tools"],
      file_ids: body["fileIds"],
      metadata: body["metadata"],
    },
  });
}

export async function _createAssistantDeserialize(
  result: CreateAssistant200Response,
): Promise<Assistant> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Creates a new assistant. */
export async function createAssistant(
  context: Client,
  body: AssistantCreationOptions,
  options: CreateAssistantOptions = { requestOptions: {} },
): Promise<Assistant> {
  const result = await _createAssistantSend(context, body, options);
  return _createAssistantDeserialize(result);
}

export function _listAssistantsSend(
  context: Client,
  options: ListAssistantsOptions = { requestOptions: {} },
): StreamableMethod<ListAssistants200Response> {
  return context.path("/assistants").get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
}

export function _getAssistantSend(
  context: Client,
  assistantId: string,
  options: GetAssistantOptions = { requestOptions: {} },
): StreamableMethod<GetAssistant200Response> {
  return context
    .path("/assistants/{assistantId}", assistantId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getAssistantDeserialize(
  result: GetAssistant200Response,
): Promise<Assistant> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Retrieves an existing assistant. */
export async function getAssistant(
  context: Client,
  assistantId: string,
  options: GetAssistantOptions = { requestOptions: {} },
): Promise<Assistant> {
  const result = await _getAssistantSend(context, assistantId, options);
  return _getAssistantDeserialize(result);
}

export function _updateAssistantSend(
  context: Client,
  assistantId: string,
  body: UpdateAssistantOptions,
  options: UpdateAssistantRequestOptions = { requestOptions: {} },
): StreamableMethod<UpdateAssistant200Response> {
  return context.path("/assistants/{assistantId}", assistantId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      model: body["model"],
      name: body["name"],
      description: body["description"],
      instructions: body["instructions"],
      tools: body["tools"],
      file_ids: body["fileIds"],
      metadata: body["metadata"],
    },
  });
}

export async function _updateAssistantDeserialize(
  result: UpdateAssistant200Response,
): Promise<Assistant> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing assistant. */
export async function updateAssistant(
  context: Client,
  assistantId: string,
  body: UpdateAssistantOptions,
  options: UpdateAssistantRequestOptions = { requestOptions: {} },
): Promise<Assistant> {
  const result = await _updateAssistantSend(context, assistantId, body, options);
  return _updateAssistantDeserialize(result);
}

export function _deleteAssistantSend(
  context: Client,
  assistantId: string,
  options: DeleteAssistantOptions = { requestOptions: {} },
): StreamableMethod<DeleteAssistant200Response> {
  return context
    .path("/assistants/{assistantId}", assistantId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAssistantDeserialize(
  result: DeleteAssistant200Response,
): Promise<AssistantDeletionStatus> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    deleted: result.body["deleted"],
  };
}

/** Deletes an assistant. */
export async function deleteAssistant(
  context: Client,
  assistantId: string,
  options: DeleteAssistantOptions = { requestOptions: {} },
): Promise<AssistantDeletionStatus> {
  const result = await _deleteAssistantSend(context, assistantId, options);
  return _deleteAssistantDeserialize(result);
}

export function _createAssistantFileSend(
  context: Client,
  assistantId: string,
  fileId: string,
  options: CreateAssistantFileOptions = { requestOptions: {} },
): StreamableMethod<CreateAssistantFile200Response> {
  return context.path("/assistants/{assistantId}/files", assistantId).post({
    ...operationOptionsToRequestParameters(options),
    body: { file_id: fileId },
  });
}

export async function _createAssistantFileDeserialize(
  result: CreateAssistantFile200Response,
): Promise<AssistantFile> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    assistantId: result.body["assistant_id"],
  };
}

/** Attaches a previously uploaded file to an assistant for use by tools that can read files. */
export async function createAssistantFile(
  context: Client,
  assistantId: string,
  fileId: string,
  options: CreateAssistantFileOptions = { requestOptions: {} },
): Promise<AssistantFile> {
  const result = await _createAssistantFileSend(context, assistantId, fileId, options);
  return _createAssistantFileDeserialize(result);
}

export function _listAssistantFilesSend(
  context: Client,
  assistantId: string,
  options: ListAssistantFilesOptions = { requestOptions: {} },
): StreamableMethod<ListAssistantFiles200Response> {
  return context.path("/assistants/{assistantId}/files", assistantId).get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
}

export function _getAssistantFileSend(
  context: Client,
  assistantId: string,
  fileId: string,
  options: GetAssistantFileOptions = { requestOptions: {} },
): StreamableMethod<GetAssistantFile200Response> {
  return context
    .path("/assistants/{assistantId}/files/{fileId}", assistantId, fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getAssistantFileDeserialize(
  result: GetAssistantFile200Response,
): Promise<AssistantFile> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    assistantId: result.body["assistant_id"],
  };
}

/** Retrieves a file attached to an assistant. */
export async function getAssistantFile(
  context: Client,
  assistantId: string,
  fileId: string,
  options: GetAssistantFileOptions = { requestOptions: {} },
): Promise<AssistantFile> {
  const result = await _getAssistantFileSend(context, assistantId, fileId, options);
  return _getAssistantFileDeserialize(result);
}

export function _deleteAssistantFileSend(
  context: Client,
  assistantId: string,
  fileId: string,
  options: DeleteAssistantFileOptions = { requestOptions: {} },
): StreamableMethod<DeleteAssistantFile200Response> {
  return context
    .path("/assistants/{assistantId}/files/{fileId}", assistantId, fileId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAssistantFileDeserialize(
  result: DeleteAssistantFile200Response,
): Promise<AssistantFileDeletionStatus> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    deleted: result.body["deleted"],
  };
}

/**
 * Unlinks a previously attached file from an assistant, rendering it unavailable for use by tools that can read
 * files.
 */
export async function deleteAssistantFile(
  context: Client,
  assistantId: string,
  fileId: string,
  options: DeleteAssistantFileOptions = { requestOptions: {} },
): Promise<AssistantFileDeletionStatus> {
  const result = await _deleteAssistantFileSend(context, assistantId, fileId, options);
  return _deleteAssistantFileDeserialize(result);
}

export async function _createThreadDeserialize(
  result: CreateThread200Response,
): Promise<AssistantThread> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    metadata: result.body["metadata"],
  };
}

/** Creates a new thread. Threads contain messages and can be run by assistants. */
export async function createThread(
  context: Client,
  body: AssistantThreadCreationOptions,
  options: CreateThreadOptions = { requestOptions: {} },
): Promise<AssistantThread> {
  const result = await _createThreadSend(context, body, options);
  return _createThreadDeserialize(result);
}

export function _getThreadSend(
  context: Client,
  threadId: string,
  options: GetThreadOptions = { requestOptions: {} },
): StreamableMethod<GetThread200Response> {
  return context
    .path("/threads/{threadId}", threadId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getThreadDeserialize(
  result: GetThread200Response,
): Promise<AssistantThread> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    metadata: result.body["metadata"],
  };
}

/** Gets information about an existing thread. */
export async function getThread(
  context: Client,
  threadId: string,
  options: GetThreadOptions = { requestOptions: {} },
): Promise<AssistantThread> {
  const result = await _getThreadSend(context, threadId, options);
  return _getThreadDeserialize(result);
}

export function _updateThreadSend(
  context: Client,
  threadId: string,
  options: UpdateThreadOptions = { requestOptions: {} },
): StreamableMethod<UpdateThread200Response> {
  return context.path("/threads/{threadId}", threadId).post({
    ...operationOptionsToRequestParameters(options),
    body: { metadata: options?.metadata },
  });
}

export async function _updateThreadDeserialize(
  result: UpdateThread200Response,
): Promise<AssistantThread> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing thread. */
export async function updateThread(
  context: Client,
  threadId: string,
  options: UpdateThreadOptions = { requestOptions: {} },
): Promise<AssistantThread> {
  const result = await _updateThreadSend(context, threadId, options);
  return _updateThreadDeserialize(result);
}

export function _deleteThreadSend(
  context: Client,
  threadId: string,
  options: DeleteThreadOptions = { requestOptions: {} },
): StreamableMethod<DeleteThread200Response> {
  return context
    .path("/threads/{threadId}", threadId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteThreadDeserialize(
  result: DeleteThread200Response,
): Promise<ThreadDeletionStatus> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    deleted: result.body["deleted"],
  };
}

/** Deletes an existing thread. */
export async function deleteThread(
  context: Client,
  threadId: string,
  options: DeleteThreadOptions = { requestOptions: {} },
): Promise<ThreadDeletionStatus> {
  const result = await _deleteThreadSend(context, threadId, options);
  return _deleteThreadDeserialize(result);
}

export function _createMessageSend(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: string,
  options: CreateMessageOptions = { requestOptions: {} },
): StreamableMethod<CreateMessage200Response> {
  return context.path("/threads/{threadId}/messages", threadId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      role: role,
      content: content,
      file_ids: options?.fileIds,
      metadata: options?.metadata,
    },
  });
}

/** Creates a new message on a specified thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: string,
  options: CreateMessageOptions = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _createMessageSend(context, threadId, role, content, options);
  return _createMessageDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  threadId: string,
  options: ListMessagesOptions = { requestOptions: {} },
): StreamableMethod<ListMessages200Response> {
  return context.path("/threads/{threadId}/messages", threadId).get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
}

export function _updateMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: UpdateMessageOptions = { requestOptions: {} },
): StreamableMethod<UpdateMessage200Response> {
  return context.path("/threads/{threadId}/messages/{messageId}", threadId, messageId).post({
    ...operationOptionsToRequestParameters(options),
    body: { metadata: options?.metadata },
  });
}

/** Modifies an existing message on an existing thread. */
export async function updateMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: UpdateMessageOptions = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _updateMessageSend(context, threadId, messageId, options);
  return _updateMessageDeserialize(result);
}

export function _listMessageFilesSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: ListMessageFilesOptions = { requestOptions: {} },
): StreamableMethod<ListMessageFiles200Response> {
  return context.path("/threads/{threadId}/messages/{messageId}/files", threadId, messageId).get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
}

export function _getMessageFileSend(
  context: Client,
  threadId: string,
  messageId: string,
  fileId: string,
  options: GetMessageFileOptions = { requestOptions: {} },
): StreamableMethod<GetMessageFile200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}/files/{fileId}", threadId, messageId, fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getMessageFileDeserialize(
  result: GetMessageFile200Response,
): Promise<MessageFile> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    messageId: result.body["message_id"],
  };
}

/** Gets information about a file attachment to a message within a thread. */
export async function getMessageFile(
  context: Client,
  threadId: string,
  messageId: string,
  fileId: string,
  options: GetMessageFileOptions = { requestOptions: {} },
): Promise<MessageFile> {
  const result = await _getMessageFileSend(context, threadId, messageId, fileId, options);
  return _getMessageFileDeserialize(result);
}

export function _createRunSend(
  context: Client,
  threadId: string,
  createRunOptions: CreateRunOptions,
  options: CreateRunRequestOptions = { requestOptions: {} },
): StreamableMethod<CreateRun200Response> {
  return context.path("/threads/{threadId}/runs", threadId).post({
    ...operationOptionsToRequestParameters(options),
    body: {
      assistant_id: createRunOptions["assistantId"],
      model: createRunOptions["model"],
      instructions: createRunOptions["instructions"],
      additional_instructions: createRunOptions["additionalInstructions"],
      tools: createRunOptions["tools"],
      metadata: createRunOptions["metadata"],
    },
  });
}

/** Creates a new run for an assistant thread. */
export async function createRun(
  context: Client,
  threadId: string,
  createRunOptions: CreateRunOptions,
  options: CreateRunRequestOptions = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _createRunSend(context, threadId, createRunOptions, options);
  return _createRunDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  threadId: string,
  options: ListRunsOptions = { requestOptions: {} },
): StreamableMethod<ListRuns200Response> {
  return context.path("/threads/{threadId}/runs", threadId).get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
}

export function _getRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: GetRunOptions = { requestOptions: {} },
): StreamableMethod<GetRun200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}", threadId, runId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

/** Gets an existing run from an existing thread. */
export async function getRun(
  context: Client,
  threadId: string,
  runId: string,
  options: GetRunOptions = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _getRunSend(context, threadId, runId, options);
  return _getRunDeserialize(result);
}

export function _updateRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: UpdateRunOptions = { requestOptions: {} },
): StreamableMethod<UpdateRun200Response> {
  return context.path("/threads/{threadId}/runs/{runId}", threadId, runId).post({
    ...operationOptionsToRequestParameters(options),
    body: { metadata: options?.metadata },
  });
}

export async function _updateRunDeserialize(result: UpdateRun200Response): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: result.body.required_action,
    lastError: result.body.last_error,
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    createdAt: unixToDate(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null ? null : unixToDate(Number(result.body["expires_at"])),
    startedAt:
      result.body["started_at"] === null ? null : unixToDate(Number(result.body["started_at"])),
    completedAt:
      result.body["completed_at"] === null ? null : unixToDate(Number(result.body["completed_at"])),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : unixToDate(Number(result.body["cancelled_at"])),
    failedAt:
      result.body["failed_at"] === null ? null : unixToDate(Number(result.body["failed_at"])),
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing thread run. */
export async function updateRun(
  context: Client,
  threadId: string,
  runId: string,
  options: UpdateRunOptions = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _updateRunSend(context, threadId, runId, options);
  return _updateRunDeserialize(result);
}

export function _submitToolOutputsToRunSend(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: SubmitToolOutputsToRunOptions = { requestOptions: {} },
): StreamableMethod<SubmitToolOutputsToRun200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}/submit_tool_outputs", threadId, runId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        tool_outputs: toolOutputs.map((p) => ({
          tool_call_id: p["toolCallId"],
          output: p["output"],
        })),
      },
    });
}

/** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
export async function submitToolOutputsToRun(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: SubmitToolOutputsToRunOptions = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _submitToolOutputsToRunSend(context, threadId, runId, toolOutputs, options);
  return _submitToolOutputsToRunDeserialize(result);
}

export function _cancelRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: CancelRunOptions = { requestOptions: {} },
): StreamableMethod<CancelRun200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}/cancel", threadId, runId)
    .post({ ...operationOptionsToRequestParameters(options) });
}

/** Cancels a run of an in progress thread. */
export async function cancelRun(
  context: Client,
  threadId: string,
  runId: string,
  options: CancelRunOptions = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _cancelRunSend(context, threadId, runId, options);
  return _cancelRunDeserialize(result);
}

/** Creates a new assistant thread and immediately starts a run using that new thread. */
export async function createThreadAndRun(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: CreateThreadAndRunOptions = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _createThreadAndRunSend(context, body, options);
  return _createThreadAndRunDeserialize(result);
}

export function _getRunStepSend(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: GetRunStepOptions = { requestOptions: {} },
): StreamableMethod<GetRunStep200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}/steps/{stepId}", threadId, runId, stepId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

/** Gets a single run step from a thread run. */
export async function getRunStep(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: GetRunStepOptions = { requestOptions: {} },
): Promise<RunStep> {
  const result = await _getRunStepSend(context, threadId, runId, stepId, options);
  return _getRunStepDeserialize(result);
}

export function _listRunStepsSend(
  context: Client,
  threadId: string,
  runId: string,
  options: ListRunStepsOptions = { requestOptions: {} },
): StreamableMethod<ListRunSteps200Response> {
  return context.path("/threads/{threadId}/runs/{runId}/steps", threadId, runId).get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: {
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
  });
}

export function _listFilesSend(
  context: Client,
  options: ListFilesOptions = { requestOptions: {} },
): StreamableMethod<ListFiles200Response> {
  return context.path("/files").get({
    ...operationOptionsToRequestParameters(options),
    queryParameters: { purpose: options?.purpose },
  });
}

export async function _listFilesDeserialize(
  result: ListFiles200Response,
): Promise<FileListResponse> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      bytes: p["bytes"],
      filename: p["filename"],
      createdAt: unixToDate(p["created_at"]),
      purpose: p["purpose"],
    })),
  };
}

/** Gets a list of previously uploaded files. */
export async function listFiles(
  context: Client,
  options: ListFilesOptions = { requestOptions: {} },
): Promise<FileListResponse> {
  const result = await _listFilesSend(context, options);
  return _listFilesDeserialize(result);
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: UploadFileOptions = { requestOptions: {} },
): Promise<InputFile> {
  const result = await _uploadFileSend(context, file, purpose, options);
  return _uploadFileDeserialize(result);
}

export function _deleteFileSend(
  context: Client,
  fileId: string,
  options: DeleteFileOptions = { requestOptions: {} },
): StreamableMethod<DeleteFile200Response> {
  return context
    .path("/files/{fileId}", fileId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteFileDeserialize(
  result: DeleteFile200Response,
): Promise<FileDeletionStatus> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    deleted: result.body["deleted"],
  };
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options: DeleteFileOptions = { requestOptions: {} },
): Promise<FileDeletionStatus> {
  const result = await _deleteFileSend(context, fileId, options);
  return _deleteFileDeserialize(result);
}

export function _getFileSend(
  context: Client,
  fileId: string,
  options: GetFileOptions = { requestOptions: {} },
): StreamableMethod<GetFile200Response> {
  return context
    .path("/files/{fileId}", fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function getFile(
  context: Client,
  fileId: string,
  options: GetFileOptions = { requestOptions: {} },
): Promise<InputFile> {
  const result = await _getFileSend(context, fileId, options);
  return _getFileDeserialize(result);
}

export async function _createRunDeserialize(result: CreateRun200Response): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  const {
    required_action,
    last_error,
    created_at,
    expires_at,
    started_at,
    completed_at,
    cancelled_at,
    failed_at,
    ...rest
  } = result.body;
  return {
    ...camelCaseKeys(rest),
    requiredAction: !required_action
      ? undefined
      : {
          type: required_action?.["type"],
          submitToolOutputs: !required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput,
                ),
              },
        },
    lastError: !last_error
      ? undefined
      : {
          code: last_error?.["code"],
          message: last_error?.["message"],
        },
    createdAt: unixToDate(created_at),
    expiresAt: expires_at === null ? null : unixToDate(Number(expires_at)),
    startedAt: started_at === null ? null : unixToDate(Number(started_at)),
    completedAt: completed_at === null ? null : unixToDate(Number(completed_at)),
    cancelledAt: cancelled_at === null ? null : unixToDate(Number(cancelled_at)),
    failedAt: failed_at === null ? null : unixToDate(Number(failed_at)),
  };
}

export async function _listRunsDeserialize(
  result: ListRuns200Response,
): Promise<ListResponseOf<ThreadRun>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map(
      (p) =>
        ({
          id: p["id"],
          threadId: p["thread_id"],
          assistantId: p["assistant_id"],
          status: p["status"],
          requiredAction: !p.required_action ? undefined : { type: p.required_action?.["type"] },
          lastError: !p.last_error
            ? undefined
            : { code: p.last_error?.["code"], message: p.last_error?.["message"] },
          model: p["model"],
          instructions: p["instructions"],
          tools: p["tools"],
          fileIds: p["file_ids"],
          metadata: p["metadata"],
          createdAt: unixToDate(p["created_at"]),
          expiresAt: p["expires_at"] === null ? null : unixToDate(Number(p["expires_at"])),
          startedAt: p["started_at"] === null ? null : unixToDate(Number(p["started_at"])),
          completedAt: p["completed_at"] === null ? null : unixToDate(Number(p["completed_at"])),
          cancelledAt: p["cancelled_at"] === null ? null : unixToDate(Number(p["cancelled_at"])),
          failedAt: p["failed_at"] === null ? null : unixToDate(Number(p["failed_at"])),
        }) as ThreadRun,
    ),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

export function _createThreadAndRunSend(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: CreateThreadAndRunOptions = { requestOptions: {} },
): StreamableMethod<CreateThreadAndRun200Response> {
  return context.path("/threads/runs").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      assistant_id: body["assistantId"],
      thread: !body.thread
        ? undefined
        : {
            messages: body.thread?.["messages"]?.map((p) => ({
              role: p["role"],
              content: p["content"],
              file_ids: p["fileIds"],
            })),
            metadata: body.thread?.["metadata"],
          },
      model: body["model"],
      instructions: body["instructions"],
      tools: body["tools"],
      metadata: body["metadata"],
    },
  });
}

/** Returns a list of runs associated with an assistant thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: ListRunsOptions = { requestOptions: {} },
): Promise<ListResponseOf<ThreadRun>> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export async function _getRunDeserialize(result: GetRun200Response): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: !result.body.required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput,
                ),
              },
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: unixToDate(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null ? null : unixToDate(Number(result.body["expires_at"])),
    startedAt:
      result.body["started_at"] === null ? null : unixToDate(Number(result.body["started_at"])),
    completedAt:
      result.body["completed_at"] === null ? null : unixToDate(Number(result.body["completed_at"])),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : unixToDate(Number(result.body["cancelled_at"])),
    failedAt:
      result.body["failed_at"] === null ? null : unixToDate(Number(result.body["failed_at"])),
  };
}

export async function _submitToolOutputsToRunDeserialize(
  result: SubmitToolOutputsToRun200Response,
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: !result.body.required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput,
                ),
              },
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: unixToDate(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null ? null : unixToDate(Number(result.body["expires_at"])),
    startedAt:
      result.body["started_at"] === null ? null : unixToDate(Number(result.body["started_at"])),
    completedAt:
      result.body["completed_at"] === null ? null : unixToDate(Number(result.body["completed_at"])),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : unixToDate(Number(result.body["cancelled_at"])),
    failedAt:
      result.body["failed_at"] === null ? null : unixToDate(Number(result.body["failed_at"])),
  };
}

export async function _createThreadAndRunDeserialize(
  result: CreateThreadAndRun200Response,
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: !result.body.required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput,
                ),
              },
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: unixToDate(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null ? null : unixToDate(Number(result.body["expires_at"])),
    startedAt:
      result.body["started_at"] === null ? null : unixToDate(Number(result.body["started_at"])),
    completedAt:
      result.body["completed_at"] === null ? null : unixToDate(Number(result.body["completed_at"])),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : unixToDate(Number(result.body["cancelled_at"])),
    failedAt:
      result.body["failed_at"] === null ? null : unixToDate(Number(result.body["failed_at"])),
  };
}

export async function _cancelRunDeserialize(result: CancelRun200Response): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : {
          type: result.body.required_action?.["type"],
          submitToolOutputs: !result.body.required_action?.submit_tool_outputs?.["tool_calls"]
            ? undefined
            : {
                toolCalls: result.body.required_action?.submit_tool_outputs?.tool_calls?.map(
                  parseRequiredToolCallOutput,
                ),
              },
        },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error["code"],
          message: result.body.last_error["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"],
    fileIds: result.body["file_ids"],
    createdAt: unixToDate(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null ? null : unixToDate(Number(result.body["expires_at"])),
    startedAt:
      result.body["started_at"] === null ? null : unixToDate(Number(result.body["started_at"])),
    completedAt:
      result.body["completed_at"] === null ? null : unixToDate(Number(result.body["completed_at"])),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : unixToDate(Number(result.body["cancelled_at"])),
    failedAt:
      result.body["failed_at"] === null ? null : unixToDate(Number(result.body["failed_at"])),
    metadata: result.body["metadata"],
  };
}

export async function listMessages(
  context: Client,
  threadId: string,
  options: ListMessagesOptions = { requestOptions: {} },
): Promise<ListResponseOf<ThreadMessage>> {
  const result = await _listMessagesSend(context, threadId, options);
  return _listMessagesDeserialize(result);
}

export function _getMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: GetMessageOptions = { requestOptions: {} },
): StreamableMethod<GetMessage200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

/** Retrieves a message associated with a thread. */
export async function getMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: GetMessageOptions = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _getMessageSend(context, threadId, messageId, options);
  return _getMessageDeserialize(result);
}

export async function _listMessageFilesDeserialize(
  result: ListMessageFiles200Response,
): Promise<ListResponseOf<MessageFile>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: unixToDate(p["created_at"]),
      messageId: p["message_id"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of files associated with a message from a thread. */
export async function listMessageFiles(
  context: Client,
  threadId: string,
  messageId: string,
  options: ListMessageFilesOptions = { requestOptions: {} },
): Promise<ListResponseOf<MessageFile>> {
  const result = await _listMessageFilesSend(context, threadId, messageId, options);
  return _listMessageFilesDeserialize(result);
}

export async function _createMessageDeserialize(
  result: CreateMessage200Response,
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map(parseMessageContentOutput),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

export async function _listMessagesDeserialize(
  result: ListMessages200Response,
): Promise<ListResponseOf<ThreadMessage>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      createdAt: unixToDate(p["created_at"]),
      threadId: p["thread_id"],
      role: p["role"],
      content: (p["content"] ?? []).map(parseMessageContentOutput),
      assistantId: p["assistant_id"],
      runId: p["run_id"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

export async function _getMessageDeserialize(
  result: GetMessage200Response,
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map(parseMessageContentOutput),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

export async function _updateMessageDeserialize(
  result: UpdateMessage200Response,
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: unixToDate(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map(parseMessageContentOutput),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

export async function _listRunStepsDeserialize(
  result: ListRunSteps200Response,
): Promise<ListResponseOf<RunStep>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map(parseRunStepOutput),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

export async function _getRunStepDeserialize(result: GetRunStep200Response): Promise<RunStep> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  const {
    step_details,
    last_error,
    created_at,
    expired_at,
    completed_at,
    cancelled_at,
    failed_at,
    ...rest
  } = result.body;
  return {
    ...camelCaseKeys(rest),
    stepDetails: parseRunStepDetails(step_details),
    lastError:
      last_error === null
        ? null
        : {
            code: last_error["code"],
            message: last_error["message"],
          },
    createdAt: unixToDate(created_at),
    expiredAt: expired_at === null ? null : unixToDate(Number(expired_at)),
    completedAt: completed_at === null ? null : unixToDate(Number(completed_at)),
    cancelledAt: cancelled_at === null ? null : unixToDate(Number(cancelled_at)),
    failedAt: failed_at === null ? null : unixToDate(Number(failed_at)),
  };
}

/** Returns a list of run steps associated an assistant thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options: ListRunStepsOptions = { requestOptions: {} },
): Promise<ListResponseOf<RunStep>> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}

export async function _listAssistantsDeserialize(
  result: ListAssistants200Response,
): Promise<ListResponseOf<Assistant>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: unixToDate(p["created_at"]),
      name: p["name"],
      description: p["description"],
      model: p["model"],
      instructions: p["instructions"],
      tools: p["tools"],
      fileIds: p["file_ids"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of assistants. */
export async function listAssistants(
  context: Client,
  options: ListAssistantsOptions = { requestOptions: {} },
): Promise<ListResponseOf<Assistant>> {
  const result = await _listAssistantsSend(context, options);
  return _listAssistantsDeserialize(result);
}

export async function _listAssistantFilesDeserialize(
  result: ListAssistantFiles200Response,
): Promise<ListResponseOf<AssistantFile>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: unixToDate(p["created_at"]),
      assistantId: p["assistant_id"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of assistant files. */
export async function listAssistantFiles(
  context: Client,
  assistantId: string,
  options: ListAssistantFilesOptions = { requestOptions: {} },
): Promise<ListResponseOf<AssistantFile>> {
  const result = await _listAssistantFilesSend(context, assistantId, options);
  return _listAssistantFilesDeserialize(result);
}

export function _createThreadSend(
  context: Client,
  body: AssistantThreadCreationOptions,
  options: CreateThreadOptions = { requestOptions: {} },
): StreamableMethod<CreateThread200Response> {
  return context.path("/threads").post({
    ...operationOptionsToRequestParameters(options),
    body: {
      messages: (body["messages"] ?? []).map((p) => ({
        role: p["role"],
        content: p["content"],
        file_ids: p["fileIds"],
      })),
      metadata: body["metadata"],
    },
  });
}

export function _uploadFileSend(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: UploadFileOptions = { requestOptions: {} },
): StreamableMethod<UploadFile200Response> {
  return context.path("/files").post({
    ...operationOptionsToRequestParameters(options),
    contentType: (options.contentType as any) ?? "multipart/form-data",
    body: {
      file: createFile(file, options?.filename || "unknown.txt"),
      purpose: purpose,
    },
  });
}

export async function _uploadFileDeserialize(result: UploadFile200Response): Promise<InputFile> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: unixToDate(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

export async function _getFileDeserialize(result: GetFile200Response): Promise<InputFile> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: unixToDate(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

function parseMessageContentOutput(messageContentOutput: MessageContentOutput): MessageContent {
  const messageContent = { type: "", text: {}, imageFile: {} };
  switch (messageContentOutput.type) {
    case "image_file":
      messageContent.type = "image_file";
      messageContent.imageFile = messageContentOutput.image_file;
      break;
    case "text":
      messageContent.type = "text";
      messageContent.text = messageContentOutput.text;
      break;
  }

  return messageContent as unknown as MessageContent;
}

function parseRunStepDetails(runStepDetailsOutput: RunStepDetailsOutput): RunStepDetails {
  const { type } = runStepDetailsOutput;
  const details = { type, messageCreation: {}, toolCalls: [] as ToolCall[] };
  switch (type) {
    case "message_creation":
      details.messageCreation = runStepDetailsOutput["message_creation"];
      break;
    case "tool_calls":
      details.toolCalls = runStepDetailsOutput["tool_calls"].map(parseToolCallOutput);
      break;
  }

  return details as RunStepDetails;
}

function parseRunStepOutput(runStepOutput: RunStepOutput): RunStep {
  const {
    step_details,
    last_error,
    created_at,
    expired_at,
    completed_at,
    cancelled_at,
    failed_at,
    ...rest
  } = runStepOutput;
  return {
    ...camelCaseKeys(rest),
    stepDetails: parseRunStepDetails(step_details),
    lastError:
      last_error === null ? null : { code: last_error["code"], message: last_error["message"] },
    createdAt: unixToDate(created_at),
    expiredAt: expired_at === null ? null : unixToDate(Number(expired_at)),
    completedAt: completed_at === null ? null : unixToDate(Number(completed_at)),
    cancelledAt: cancelled_at === null ? null : unixToDate(Number(cancelled_at)),
    failedAt: failed_at === null ? null : unixToDate(Number(failed_at)),
  } as RunStep;
}
