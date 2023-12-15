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
import {
  ListResponseOf,
  MessageContent,
  MessageFile,
  MessageRole,
  ThreadMessage,
} from "../../models/models.js";
import {
  ThreadMessagesCreateMessageOptions,
  ThreadMessagesListMessageFilesOptions,
  ThreadMessagesListMessagesOptions,
  ThreadMessagesModifyMessageOptions,
  ThreadMessagesRetrieveMessageFileOptions,
  ThreadMessagesRetrieveMessageOptions,
} from "../../models/options.js";
import {
  AssistantsContext as Client,
  CreateMessage200Response,
  ListMessageFiles200Response,
  ListMessages200Response,
  ModifyMessage200Response,
  RetrieveMessage200Response,
  RetrieveMessageFile200Response,
} from "../../rest/index.js";

export function _createMessageSend(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: string,
  options: ThreadMessagesCreateMessageOptions = { requestOptions: {} }
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
  options: ThreadMessagesCreateMessageOptions = { requestOptions: {} }
): Promise<ThreadMessage> {
  const result = await _createMessageSend(context, threadId, role, content, options);
  return _createMessageDeserialize(result);
}

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

/** Modifies an existing message on an existing thread. */
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

export function _retrieveMessageFileSend(
  context: Client,
  threadId: string,
  messageId: string,
  fileId: string,
  options: ThreadMessagesRetrieveMessageFileOptions = { requestOptions: {} }
): StreamableMethod<RetrieveMessageFile200Response> {
  return context
    .path("/threads/{threadId}/messages/{messageId}/files/{fileId}", threadId, messageId, fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _retrieveMessageFileDeserialize(
  result: RetrieveMessageFile200Response
): Promise<MessageFile> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: new Date(result.body["created_at"]),
    messageId: result.body["message_id"],
  };
}

/** Gets information about a file attachment to a message within a thread. */
export async function retrieveMessageFile(
  context: Client,
  threadId: string,
  messageId: string,
  fileId: string,
  options: ThreadMessagesRetrieveMessageFileOptions = { requestOptions: {} }
): Promise<MessageFile> {
  const result = await _retrieveMessageFileSend(context, threadId, messageId, fileId, options);
  return _retrieveMessageFileDeserialize(result);
}

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

export async function _listMessageFilesDeserialize(
  result: ListMessageFiles200Response
): Promise<ListResponseOf<MessageFile>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
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
): Promise<ListResponseOf<MessageFile>> {
  const result = await _listMessageFilesSend(context, threadId, messageId, options);
  return _listMessageFilesDeserialize(result);
}

export async function _createMessageDeserialize(
  result: CreateMessage200Response
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map(
      (p) =>
        ({
          type: p["type"],
          text: p["text"] || undefined,
          imageFile: p["image_file"] || undefined,
        } as MessageContent)
    ),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

export async function _listMessagesDeserialize(
  result: ListMessages200Response
): Promise<ListResponseOf<ThreadMessage>> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: (result.body["data"] ?? []).map((p) => ({
      id: p["id"],
      createdAt: new Date(p["created_at"]),
      threadId: p["thread_id"],
      role: p["role"],
      content: (p["content"] ?? []).map(
        (p) =>
          ({
            type: p["type"],
            text: p["text"] || undefined,
            imageFile: p["image_file"] || undefined,
          } as MessageContent)
      ),
      assistantId: p["assistant_id"],
      runId: p["run_id"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

export async function _retrieveMessageDeserialize(
  result: RetrieveMessage200Response
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map(
      (p) =>
        ({
          type: p["type"],
          text: p["text"] || undefined,
          imageFile: p["image_file"] || undefined,
        } as MessageContent)
    ),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

export async function _modifyMessageDeserialize(
  result: ModifyMessage200Response
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: (result.body["content"] ?? []).map(
      (p) =>
        ({
          type: p["type"],
          text: p["text"] || undefined,
          imageFile: p["image_file"] || undefined,
        } as MessageContent)
    ),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}
