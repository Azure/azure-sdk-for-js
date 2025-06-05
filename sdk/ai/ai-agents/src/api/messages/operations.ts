// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentsContext as Client } from "../index.js";
import {
  MessageRole,
  MessageInputContent,
  messageInputContentSerializer,
  messageAttachmentArraySerializer,
  ThreadMessage,
  threadMessageDeserializer,
  _AgentsPagedResultThreadMessage,
  _agentsPagedResultThreadMessageDeserializer,
} from "../../models/models.js";
import {
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

export function _updateMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: MessagesUpdateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/threads/{threadId}/messages/{messageId}{?api%2Dversion}",
    {
      threadId: threadId,
      messageId: messageId,
      "api%2Dversion": context.apiVersion,
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
    throw createRestError(result);
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
    "/threads/{threadId}/messages/{messageId}{?api%2Dversion}",
    {
      threadId: threadId,
      messageId: messageId,
      "api%2Dversion": context.apiVersion,
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
    throw createRestError(result);
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
    "/threads/{threadId}/messages{?run_id,api%2Dversion,limit,order,after,before}",
    {
      threadId: threadId,
      run_id: options?.runId,
      "api%2Dversion": context.apiVersion,
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
    "/threads/{threadId}/messages{?api%2Dversion}",
    {
      threadId: threadId,
      "api%2Dversion": context.apiVersion,
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
    throw createRestError(result);
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
