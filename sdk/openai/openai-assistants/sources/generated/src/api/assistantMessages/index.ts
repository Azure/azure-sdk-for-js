// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListResponseOf,
  AssistantMessage,
  AssistantRole,
  AssistantMessageFile,
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
} from "@azure-rest/core-client";
import {
  AssistantMessagesCreateMessageOptions,
  AssistantMessagesListMessagesOptions,
  AssistantMessagesRetrieveMessageOptions,
  AssistantMessagesModifyMessageOptions,
  AssistantMessagesListMessageFilesOptions,
  AssistantMessagesRetrieveMessageFileOptions,
} from "../../models/options.js";

export function _createMessageSend(
  context: Client,
  threadId: string,
  role: AssistantRole,
  content: string,
  options: AssistantMessagesCreateMessageOptions = { requestOptions: {} }
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
    content: result.body["content"].map((p) => ({ type: p["type"] })),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    metadata: result.body["metadata"],
  };
}

/** Returns a list of messages from a thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  role: AssistantRole,
  content: string,
  options: AssistantMessagesCreateMessageOptions = { requestOptions: {} }
): Promise<AssistantMessage> {
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
  options: AssistantMessagesListMessagesOptions = { requestOptions: {} }
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
): Promise<ListResponseOf> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p) => ({
      id: p["id"],
      object: p["object"],
      createdAt: new Date(p["created_at"]),
      threadId: p["thread_id"],
      role: p["role"],
      content: p["content"].map((p) => ({ type: p["type"] })),
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
  options: AssistantMessagesListMessagesOptions = { requestOptions: {} }
): Promise<ListResponseOf> {
  const result = await _listMessagesSend(context, threadId, options);
  return _listMessagesDeserialize(result);
}

export function _retrieveMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: AssistantMessagesRetrieveMessageOptions = { requestOptions: {} }
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
    content: result.body["content"].map((p) => ({ type: p["type"] })),
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
  options: AssistantMessagesRetrieveMessageOptions = { requestOptions: {} }
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
  options: AssistantMessagesModifyMessageOptions = { requestOptions: {} }
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
    content: result.body["content"].map((p) => ({ type: p["type"] })),
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
  options: AssistantMessagesModifyMessageOptions = { requestOptions: {} }
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
  options: AssistantMessagesListMessageFilesOptions = { requestOptions: {} }
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
): Promise<ListResponseOf> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p) => ({
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
  options: AssistantMessagesListMessageFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf> {
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
  options: AssistantMessagesRetrieveMessageFileOptions = { requestOptions: {} }
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
): Promise<AssistantMessageFile> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    messageId: result.body["message_id"],
  };
}

/** Retrieves a file attached to a message within a thread. */
export async function retrieveMessageFile(
  context: Client,
  threadId: string,
  messageId: string,
  fileId: string,
  options: AssistantMessagesRetrieveMessageFileOptions = { requestOptions: {} }
): Promise<AssistantMessageFile> {
  const result = await _retrieveMessageFileSend(
    context,
    threadId,
    messageId,
    fileId,
    options
  );
  return _retrieveMessageFileDeserialize(result);
}
