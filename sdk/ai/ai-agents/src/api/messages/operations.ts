// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "../index.js";
import {
  agentV1ErrorDeserializer,
  MessageRole,
  MessageInputContent,
  messageInputContentSerializer,
  messageAttachmentArraySerializer,
  ThreadMessage,
  threadMessageDeserializer,
  _AgentsPagedResultThreadMessage,
  _agentsPagedResultThreadMessageDeserializer,
  MessageDeletionStatus,
  messageDeletionStatusDeserializer,
} from "../../models/models.js";
import {
  MessagesDeleteOptionalParams,
  MessagesUpdateMessageOptionalParams,
  MessagesGetMessageOptionalParams,
  MessagesListMessagesOptionalParams,
  MessagesCreateMessageOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: MessagesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages/{messageId}{?api-version}",
    {
      threadId: threadId,
      messageId: messageId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<MessageDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return messageDeletionStatusDeserializer(result.body);
}

/** Deletes an existing message on an existing thread. */
export async function $delete(
  context: Client,
  threadId: string,
  messageId: string,
  options: MessagesDeleteOptionalParams = { requestOptions: {} },
): Promise<MessageDeletionStatus> {
  const result = await _$deleteSend(context, threadId, messageId, options);
  return _$deleteDeserialize(result);
}

export function _updateMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: MessagesUpdateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages/{messageId}{?api-version}",
    {
      threadId: threadId,
      messageId: messageId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { metadata: options?.metadata },
  });
}

export async function _updateMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return threadMessageDeserializer(result.body);
}

/** Modifies an existing message on an existing thread. */
export async function updateMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: MessagesUpdateMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _updateMessageSend(context, threadId, messageId, options);
  return _updateMessageDeserialize(result);
}

export function _getMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: MessagesGetMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages/{messageId}{?api-version}",
    {
      threadId: threadId,
      messageId: messageId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return threadMessageDeserializer(result.body);
}

/** Retrieves an existing message. */
export async function getMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: MessagesGetMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _getMessageSend(context, threadId, messageId, options);
  return _getMessageDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  threadId: string,
  options: MessagesListMessagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages{?run_id,api-version,limit,order,after,before}",
    {
      threadId: threadId,
      run_id: options?.runId,
      "api-version": context.apiVersion,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listMessagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _agentsPagedResultThreadMessageDeserializer(result.body);
}

/** Gets a list of messages that exist on a thread. */
export function listMessages(
  context: Client,
  threadId: string,
  options: MessagesListMessagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ThreadMessage> {
  return buildPagedAsyncIterator(
    context,
    () => _listMessagesSend(context, threadId, options),
    _listMessagesDeserialize,
    ["200"],
    { itemName: "data" },
  );
}

export function _createMessageSend(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: MessageInputContent,
  options: MessagesCreateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages{?api-version}",
    {
      threadId: threadId,
      "api-version": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: {
      role: role,
      content: messageInputContentSerializer(content),
      attachments: !options?.attachments
        ? options?.attachments
        : messageAttachmentArraySerializer(options?.attachments),
      metadata: options?.metadata,
    },
  });
}

export async function _createMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = agentV1ErrorDeserializer(result.body);
    throw error;
  }

  return threadMessageDeserializer(result.body);
}

/** Creates a new message on a specified thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: MessageInputContent,
  options: MessagesCreateMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _createMessageSend(context, threadId, role, content, options);
  return _createMessageDeserialize(result);
}
