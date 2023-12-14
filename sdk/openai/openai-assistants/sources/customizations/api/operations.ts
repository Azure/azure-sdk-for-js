// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ThreadMessage,
  InputFile,
  ListResponseOf,
  MessageContent,
} from "../models/models.js";
import {
  ThreadRun,
  CreateAndRunThreadOptions,
  RunStep,
  FilePurpose,
} from "../../generated/src/models/models.js";
import {
  AssistantsContext as Client,
  CreateMessage200Response,
  CreateThreadAndRun200Response,
  ListMessageFiles200Response,
  ListMessages200Response,
  ListRuns200Response,
  ListRunSteps200Response,
  ModifyMessage200Response,
  RetrieveMessage200Response,
  RetrieveFile200Response,
  UploadFile200Response,
} from "../../generated/src/rest/index.js";
import { StreamableMethod, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { createFile } from "@azure/core-rest-pipeline";
import { _retrieveFileSend } from "../../generated/src/api/files/index.js";
import {
  ThreadMessagesListMessagesOptions,
  ThreadMessagesRetrieveMessageOptions,
  ThreadMessagesModifyMessageOptions,
  ThreadMessagesListMessageFilesOptions,
  ThreadRunsListRunsOptions,
  ThreadRunsCreateThreadAndRunOptions,
  RunStepsListRunStepsOptions,
  FilesRetrieveFileOptions,
  FilesUploadFileOptions,
} from "../../generated/src/models/options.js";

export function _listMessagesSend(
  context: Client,
  threadId: string,
  options: ThreadMessagesListMessagesOptions = { requestOptions: {} }
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

/** Returns a list of messages from a thread. */
export async function listMessages(
  context: Client,
  threadId: string,
  options: ThreadMessagesListMessagesOptions = { requestOptions: {} }
): Promise<ListResponseOf<ThreadMessage>> {
  const result = await _listMessagesSend(context, threadId, options);
  return _listMessagesDeserialize(result);
}

export function _retrieveMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: ThreadMessagesRetrieveMessageOptions = { requestOptions: {} }
): StreamableMethod<RetrieveMessage200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

/** Retrieves a message associated with a thread. */
export async function retrieveMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: ThreadMessagesRetrieveMessageOptions = { requestOptions: {} }
): Promise<ThreadMessage> {
  const result = await _retrieveMessageSend(context, threadId, messageId, options);
  return _retrieveMessageDeserialize(result);
}

export function _modifyMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: ThreadMessagesModifyMessageOptions = { requestOptions: {} }
): StreamableMethod<ModifyMessage200Response> {
  return context.path("/threads/{threadId}/messages/{messageId}", threadId, messageId).post({
    ...operationOptionsToRequestParameters(options),
    body: { metadata: options?.metadata },
  });
}

/** Modifies an existing message associated with a thread. */
export async function modifyMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: ThreadMessagesModifyMessageOptions = { requestOptions: {} }
): Promise<ThreadMessage> {
  const result = await _modifyMessageSend(context, threadId, messageId, options);
  return _modifyMessageDeserialize(result);
}

export function _listMessageFilesSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: ThreadMessagesListMessageFilesOptions = { requestOptions: {} }
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

export async function _listMessageFilesDeserialize(
  result: ListMessageFiles200Response
): Promise<ListResponseOf<ThreadMessageFile>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
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
  options: ThreadMessagesListMessageFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf<ThreadMessageFile>> {
  const result = await _listMessageFilesSend(context, threadId, messageId, options);
  return _listMessageFilesDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  threadId: string,
  options: ThreadRunsListRunsOptions = { requestOptions: {} }
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

export async function _listRunsDeserialize(
  result: ListRuns200Response
): Promise<ListResponseOf<ThreadRun>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: (result.body["data"] ?? []).map((p) => ({
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
      tools: (p["tools"] ?? []).map((p) => ({ type: p["type"] })),
      fileIds: p["file_ids"],
      metadata: p["metadata"],
      createdAt: new Date(p["created_at"]),
      expiresAt: p["expires_at"] === null ? null : new Date(p["expires_at"]),
      startedAt: p["started_at"] === null ? null : new Date(p["started_at"]),
      completedAt: p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt: p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
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
  options: ThreadRunsListRunsOptions = { requestOptions: {} }
): Promise<ListResponseOf<ThreadRun>> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export function _listRunStepsSend(
  context: Client,
  threadId: string,
  runId: string,
  options: RunStepsListRunStepsOptions = { requestOptions: {} }
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

export async function _listRunStepsDeserialize(
  result: ListRunSteps200Response
): Promise<ListResponseOf<RunStep>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
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
      completedAt: p["completed_at"] === null ? null : new Date(p["completed_at"]),
      cancelledAt: p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
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
  options: RunStepsListRunStepsOptions = { requestOptions: {} }
): Promise<ListResponseOf<RunStep>> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}

export function _createThreadAndRunSend(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: ThreadRunsCreateThreadAndRunOptions = { requestOptions: {} }
): StreamableMethod<CreateThreadAndRun200Response> {
  return context.path("/threads/runs").post({
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
      tools: (body["tools"] ?? []).map((p) => ({
        type: p["type"],
        function: p["function"] || undefined,
      })),
      metadata: body["metadata"],
    },
  });
}

export async function _createThreadAndRunDeserialize(
  result: CreateThreadAndRun200Response
): Promise<ThreadRun> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
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
    tools: (result.body["tools"] ?? []).map((p) => ({
      type: p["type"],
      function: p["function"] || undefined,
    })),
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
    createdAt: new Date(result.body["created_at"]),
    expiresAt: result.body["expires_at"] === null ? null : new Date(result.body["expires_at"]),
    startedAt: result.body["started_at"] === null ? null : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null ? null : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null ? null : new Date(result.body["cancelled_at"]),
    failedAt: result.body["failed_at"] === null ? null : new Date(result.body["failed_at"]),
  };
}

/** Creates a new assistant thread and immediately starts a run using that new thread. */
export async function createThreadAndRun(
  context: Client,
  body: CreateAndRunThreadOptions,
  options: ThreadRunsCreateThreadAndRunOptions = { requestOptions: {} }
): Promise<ThreadRun> {
  const result = await _createThreadAndRunSend(context, body, options);
  return _createThreadAndRunDeserialize(result);
}

export async function _uploadFileDeserialize(result: UploadFile200Response): Promise<InputFile> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
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
  options: FilesUploadFileOptions = { requestOptions: {} }
): Promise<InputFile> {
  const result = await _uploadFileSend(context, file, purpose, options);
  return _uploadFileDeserialize(result);
}

export async function _retrieveFileDeserialize(
  result: RetrieveFile200Response
): Promise<InputFile> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: new Date(result.body["created_at"]),
    purpose: result.body["purpose"],
  };
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function retrieveFile(
  context: Client,
  fileId: string,
  options: FilesRetrieveFileOptions = { requestOptions: {} }
): Promise<InputFile> {
  const result = await _retrieveFileSend(context, fileId, options);
  return _retrieveFileDeserialize(result);
}

