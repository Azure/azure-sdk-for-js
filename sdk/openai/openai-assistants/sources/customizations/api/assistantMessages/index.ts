// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AssistantMessage,
  AssistantMessageFile,
  ListResponseOf,
} from "../../models/models.js";
import {
  _listMessagesSend,
  _listMessageFilesSend,
} from "../../../generated/src/api/assistantMessages/index.js";
import {
  AssistantsContext as Client,
  ListMessageFiles200Response,
  ListMessages200Response,
  RetrieveMessage200Response,
} from "../../../generated/src/rest/index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import {
  AssistantMessagesListMessagesOptions,
  AssistantMessagesRetrieveMessageOptions,
  AssistantMessagesListMessageFilesOptions,
} from "../../../generated/src/models/options.js";

export async function _listMessagesDeserialize(
  result: ListMessages200Response
): Promise<ListResponseOf<AssistantMessage>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p) => ({
      id: p["id"],
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
): Promise<ListResponseOf<AssistantMessage>> {
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

export async function _listMessageFilesDeserialize(
  result: ListMessageFiles200Response
): Promise<ListResponseOf<AssistantMessageFile>> {
  if (result.status !== "200") {
    throw result.body;
  }

  return {
    object: result.body["object"],
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
  options: AssistantMessagesListMessageFilesOptions = { requestOptions: {} }
): Promise<ListResponseOf<AssistantMessageFile>> {
  const result = await _listMessageFilesSend(
    context,
    threadId,
    messageId,
    options
  );
  return _listMessageFilesDeserialize(result);
}
