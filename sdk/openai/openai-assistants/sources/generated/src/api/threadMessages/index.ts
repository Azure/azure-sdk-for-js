// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OpenAIPageableListOf,
  ThreadMessage,
  MessageRole,
  MessageFile,
} from "../../models/models.js";
import {
  AssistantsContext as Client,
  CreateMessage200Response,
  ListMessageFiles200Response,
  ListMessages200Response,
  ModifyMessage200Response,
  RetrieveMessage200Response,
  RetrieveMessageFile200Response,
} from "../../rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  createRestError,
} from "@azure-rest/core-client";
import {
  ThreadMessagesCreateMessageOptions,
  ThreadMessagesListMessagesOptions,
  ThreadMessagesRetrieveMessageOptions,
  ThreadMessagesModifyMessageOptions,
  ThreadMessagesListMessageFilesOptions,
  ThreadMessagesRetrieveMessageFileOptions,
} from "../../models/options.js";

export function _createMessageSend(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: string,
  options: ThreadMessagesCreateMessageOptions = { requestOptions: {} }
): StreamableMethod<CreateMessage200Response> {
  return context
    .path("/threads/{threadId}/messages", threadId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        role: role,
        content: content,
        file_ids: options?.fileIds,
        metadata: options?.metadata,
      },
    });
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
    content: result.body["content"],
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Creates a new message on a specified thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: string,
  options: ThreadMessagesCreateMessageOptions = { requestOptions: {} }
): Promise<ThreadMessage> {
  const result = await _createMessageSend(
    context,
    threadId,
    role,
    content,
    options
  );
  return _createMessageDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  threadId: string,
  options: ThreadMessagesListMessagesOptions = { requestOptions: {} }
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
): Promise<OpenAIPageableListOf> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    data: result.body["data"].map((p) => ({
      id: p["id"],
      createdAt: new Date(p["created_at"]),
      threadId: p["thread_id"],
      role: p["role"],
      content: p["content"],
      assistantId: p["assistant_id"],
      runId: p["run_id"],
      fileIds: p["file_ids"],
      metadata: p["metadata"],
    })),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Gets a list of messages that exist on a thread. */
export async function listMessages(
  context: Client,
  threadId: string,
  options: ThreadMessagesListMessagesOptions = { requestOptions: {} }
): Promise<OpenAIPageableListOf> {
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
    content: result.body["content"],
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Gets an existing message from an existing thread. */
export async function retrieveMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: ThreadMessagesRetrieveMessageOptions = { requestOptions: {} }
): Promise<ThreadMessage> {
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
  options: ThreadMessagesModifyMessageOptions = { requestOptions: {} }
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
): Promise<ThreadMessage> {
  if (result.status !== "200") {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    role: result.body["role"],
    content: result.body["content"],
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    fileIds: result.body["file_ids"],
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing message on an existing thread. */
export async function modifyMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: ThreadMessagesModifyMessageOptions = { requestOptions: {} }
): Promise<ThreadMessage> {
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
  options: ThreadMessagesListMessageFilesOptions = { requestOptions: {} }
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
): Promise<OpenAIPageableListOf> {
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

/** Gets a list of previously uploaded files associated with a message from a thread. */
export async function listMessageFiles(
  context: Client,
  threadId: string,
  messageId: string,
  options: ThreadMessagesListMessageFilesOptions = { requestOptions: {} }
): Promise<OpenAIPageableListOf> {
  const result = await _listMessageFilesSend(
    context,
    threadId,
    messageId,
    options
  );
  return _listMessageFilesDeserialize(result);
}

export function _retrieveMessageFileSend(
  context: Client,
  threadId: string,
  messageId: string,
  fileId: string,
  options: ThreadMessagesRetrieveMessageFileOptions = { requestOptions: {} }
): StreamableMethod<RetrieveMessageFile200Response> {
  return context
    .path(
      "/threads/{threadId}/messages/{messageId}/files/{fileId}",
      threadId,
      messageId,
      fileId
    )
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
  const result = await _retrieveMessageFileSend(
    context,
    threadId,
    messageId,
    fileId,
    options
  );
  return _retrieveMessageFileDeserialize(result);
}
