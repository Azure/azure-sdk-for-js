// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Assistant,
  ListResponseOf,
  AssistantFile,
  AssistantThreadCreationOptions,
  AssistantMessage,
  AssistantRole,
  AssistantThread,
  AssistantMessageFile,
  AssistantRun,
  CreateAndRunThreadOptions,
  RunStep,
  FilePurpose,
  File,
} from "../generated/src/models/models.js";
import {
  AssistantsContext as Client,
  CancelRun200Response,
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
  ListAssistantFiles200Response,
  ListAssistants200Response,
  ListFiles200Response,
  ListMessageFiles200Response,
  ListMessages200Response,
  ListRuns200Response,
  ListRunSteps200Response,
  ModifyAssistant200Response,
  ModifyMessage200Response,
  ModifyRun200Response,
  ModifyThread200Response,
  RetrieveAssistant200Response,
  RetrieveAssistantFile200Response,
  RetrieveFile200Response,
  RetrieveFileContent200Response,
  RetrieveMessage200Response,
  RetrieveMessageFile200Response,
  RetrieveRun200Response,
  RetrieveRunStep200Response,
  RetrieveThread200Response,
  SubmitRunToolOutputs200Response,
  UploadFile200Response,
} from "../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { createFile } from "@azure/core-rest-pipeline";
import { stringToUint8Array } from "@azure/core-util";
import {
  CreateAssistantOptions,
  ListAssistantsOptions,
  RetrieveAssistantOptions,
  ModifyAssistantOptions,
  DeleteAssistantOptions,
  CreateAssistantFileOptions,
  ListAssistantFilesOptions,
  RetrieveAssistantFileOptions,
  DeleteAssistantFileOptions,
  CreateThreadOptions,
  RetrieveThreadOptions,
  ModifyThreadOptions,
  DeleteThreadOptions,
  CreateMessageOptions,
  ListMessagesOptions,
  RetrieveMessageOptions,
  ModifyMessageOptions,
  ListMessageFilesOptions,
  RetrieveMessageFileOptions,
  CreateRunOptions,
  ListRunsOptions,
  RetrieveRunOptions,
  ModifyRunOptions,
  SubmitRunToolOutputsOptions,
  CancelRunOptions,
  CreateThreadAndRunOptions,
  RetrieveRunStepOptions,
  ListRunStepsOptions,
  ListFilesOptions,
  UploadFileOptions,
  DeleteFileOptions,
  RetrieveFileOptions,
  RetrieveFileContentOptions,
} from "../models/options.js";

export function _listAssistantsSend(
  context: Client,
  options: ListAssistantsOptions = { requestOptions: {} }
): StreamableMethod<ListAssistants200Response> {
  return context
    .path("/assistants")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listAssistantsDeserialize(
  result: ListAssistants200Response
): Promise<ListResponseOf<Assistant>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      createdAt: new Date(p["created_at"]),
      name: p["name"],
      description: p["description"],
      model: p["model"],
      instructions: p["instructions"],
      tools: (p["tools"] ?? []).map((p) => ({ type: p["type"] })),
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
  options: ListAssistantsOptions = { requestOptions: {} }
): Promise<ListResponseOf<Assistant>> {
  const result = await _listAssistantsSend(context, options);
  return _listAssistantsDeserialize(result);
}

export function _listAssistantFilesSend(
  context: Client,
  assistantId: string,
  options: ListAssistantFilesOptions = { requestOptions: {} }
): StreamableMethod<ListAssistantFiles200Response> {
  return context
    .path("/assistants/{assistantId}/files", assistantId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listAssistantFilesDeserialize(
  result: ListAssistantFiles200Response
): Promise<ListResponseOf<AssistantFile>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      createdAt: new Date(p["created_at"]),
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
  options: ListAssistantFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantFile>> {
  const result = await _listAssistantFilesSend(context, assistantId, options);
  return _listAssistantFilesDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  threadId: string,
  options: ListMessagesOptions = { requestOptions: {} }
): StreamableMethod<ListMessages200Response> {
  return context
    .path("/threads/{threadId}/messages", threadId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listMessagesDeserialize(
  result: ListMessages200Response
): Promise<ListResponseOf<AssistantMessage>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      createdAt: new Date(p["created_at"]),
      threadId: p["thread_id"],
      role: p["role"],
      content: (p["content"] ?? []).map((p) => ({
        type: p["type"],
        text: p["text"] || undefined, 
        file_ids: p["file_ids"] || undefined, 
        metadata: p["metadata"] || undefined, 
        image_file: p["image_file"] || undefined
      })),
      assistantId: p["assistant_id"],
      runId: p["run_id"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of messages from a thread. */
export async function listMessages(
  context: Client,
  threadId: string,
  options: ListMessagesOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantMessage>> {
  const result = await _listMessagesSend(context, threadId, options);
  return _listMessagesDeserialize(result);
}

export function _retrieveMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: RetrieveMessageOptions = { requestOptions: {} }
): StreamableMethod<RetrieveMessage200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveMessageDeserialize(
  result: RetrieveMessage200Response
): Promise<AssistantMessage> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map((p) => ({
      type: p["type"],
      text: p["text"] || undefined, 
      file_ids: p["file_ids"] || undefined, 
      metadata: p["metadata"] || undefined, 
      image_file: p["image_file"] || undefined
    })),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

/** Retrieves a message associated with a thread. */
export async function retrieveMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: RetrieveMessageOptions = { requestOptions: {} }
): Promise<AssistantMessage> {
  const result = await _retrieveMessageSend(
    context,
    threadId,
    messageId,
    options
  );
  return _retrieveMessageDeserialize(result);
}

export function _modifyMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: ModifyMessageOptions = { requestOptions: {} }
): StreamableMethod<ModifyMessage200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { metadata: options?.metadata },
    });
}

export async function _modifyMessageDeserialize(
  result: ModifyMessage200Response
): Promise<AssistantMessage> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map((p) => ({
      type: p["type"],
      text: p["text"] || undefined, 
      file_ids: p["file_ids"] || undefined, 
      metadata: p["metadata"] || undefined, 
      image_file: p["image_file"] || undefined
    })),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing message associated with a thread. */
export async function modifyMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: ModifyMessageOptions = { requestOptions: {} }
): Promise<AssistantMessage> {
  const result = await _modifyMessageSend(
    context,
    threadId,
    messageId,
    options
  );
  return _modifyMessageDeserialize(result);
}

export function _listMessageFilesSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: ListMessageFilesOptions = { requestOptions: {} }
): StreamableMethod<ListMessageFiles200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}/files", threadId, messageId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listMessageFilesDeserialize(
  result: ListMessageFiles200Response
): Promise<ListResponseOf<AssistantMessageFile>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      createdAt: new Date(p["created_at"]),
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
  options: ListMessageFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantMessageFile>> {
  const result = await _listMessageFilesSend(
    context,
    threadId,
    messageId,
    options
  );
  return _listMessageFilesDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  threadId: string,
  options: ListRunsOptions = { requestOptions: {} }
): StreamableMethod<ListRuns200Response> {
  return context
    .path("/threads/{threadId}/runs", threadId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listRunsDeserialize(
  result: ListRuns200Response
): Promise<ListResponseOf<AssistantRun>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      threadId: p["thread_id"],
      assistantId: p["assistant_id"],
      status: p["status"],
      requiredAction: !p.required_action
        ? undefined
        : { type: p.required_action?.["type"] },
      lastError: !p.last_error
        ? undefined
        : { code: p.last_error?.["code"], message: p.last_error?.["message"] },
      model: p["model"],
      instructions: p["instructions"],
      tools: (p["tools"] ?? []).map((p) => ({ type: p["type"] })),
      fileIds: p["file_ids"],
      metadata: p["metadata"],
      createdAt: new Date(p["created_at"]),
      expiresAt: p["expires_at"] === null ? null : new Date(p["expires_at"]),
      startedAt: p["started_at"] === null ? null : new Date(p["started_at"]),
      completedAt:
        p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt:
        p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
      failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of runs associated with an assistant thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: ListRunsOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantRun>> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export function _listRunStepsSend(
  context: Client,
  threadId: string,
  runId: string,
  options: ListRunStepsOptions = { requestOptions: {} }
): StreamableMethod<ListRunSteps200Response> {
  return context
    .path("/threads/{threadId}/runs/{runId}/steps", threadId, runId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listRunStepsDeserialize(
  result: ListRunSteps200Response
): Promise<ListResponseOf<RunStep>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      object: p["object"],
      assistantId: p["assistant_id"],
      threadId: p["thread_id"],
      runId: p["run_id"],
      status: p["status"],
      stepDetails: { type: p.step_details["type"] },
      lastError:
        p.last_error === null
          ? null
          : { code: p.last_error["code"], message: p.last_error["message"] },
      createdAt: new Date(p["created_at"]),
      expiredAt: p["expired_at"] === null ? null : new Date(p["expired_at"]),
      completedAt:
        p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt:
        p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
      failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of run steps associated an assistant thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options: ListRunStepsOptions = { requestOptions: {} }
): Promise<ListResponseOf<RunStep>> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}

export function _uploadFileSend(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: UploadFileOptions = { requestOptions: {} }
): StreamableMethod<UploadFile200Response> {
  return context
    .path("/files")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: {
        file: createFile(file, options?.filename || "unknown.txt"),
        purpose: purpose,
      },
    });
}

export async function _uploadFileDeserialize(
  result: UploadFile200Response
): Promise<File> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: new Date(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

/** Upload a file that can be used across various endpoints. */
export async function uploadFile(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: UploadFileOptions = { requestOptions: {} }
): Promise<File> {
  const result = await _uploadFileSend(context, file, purpose, options);
  return _uploadFileDeserialize(result);
}

export function _createThreadAndRunSend(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: CreateThreadAndRunOptions = { requestOptions: {} }
): StreamableMethod<CreateThreadAndRun200Response> {
  return context
    .path("/threads/runs")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        assistant_id: body["assistantId"],
        thread: !body.thread
          ? undefined
          : {
              messages: (body.thread?.["messages"] ?? []).map((p) => ({
                role: p["role"],
                content: p["content"],
              })),
              metadata: body.thread?.["metadata"],
            },
        model: body["model"],
        instructions: body["instructions"],
        tools: (body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
        metadata: body["metadata"],
      },
    });
}

export async function _createThreadAndRunDeserialize(
  result: CreateThreadAndRun200Response
): Promise<AssistantRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"],
    requiredAction: !result.body.required_action
      ? undefined
      : { type: result.body.required_action?.["type"] },
    lastError: !result.body.last_error
      ? undefined
      : {
          code: result.body.last_error?.["code"],
          message: result.body.last_error?.["message"],
        },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: (result.body["tools"] ?? []).map((p) => ({ type: p["type"], function: p["function"] || undefined })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
  };
}

/** Creates a new assistant thread and immediately starts a run using that new thread. */
export async function createThreadAndRun(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: CreateThreadAndRunOptions = { requestOptions: {} }
): Promise<AssistantRun> {
  const result = await _createThreadAndRunSend(context, body, options);
  return _createThreadAndRunDeserialize(result);
}
