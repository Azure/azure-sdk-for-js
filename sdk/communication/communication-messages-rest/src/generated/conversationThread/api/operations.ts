// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConversationThreadContext as Client } from "./index.js";
import {
  CommunicationConversation,
  _PagedConversation,
  _pagedConversationDeserializer,
  _PagedConversationMessageItem,
  _pagedConversationMessageItemDeserializer,
  ConversationMessageItem,
  AddParticipantsOptions,
  addParticipantsOptionsSerializer,
  AddParticipantsResult,
  addParticipantsResultDeserializer,
  RemoveParticipantsOptions,
  removeParticipantsOptionsSerializer,
  RemoveParticipantsResult,
  removeParticipantsResultDeserializer,
  GetConversationThreadAnalysisResult,
  getConversationThreadAnalysisResultDeserializer,
  SendConversationMessageOptions,
  sendConversationMessageOptionsSerializer,
  SendConversationMessageResult,
  sendConversationMessageResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AnalyzeConversationOptionalParams,
  SendMessageOptionalParams,
  ListMessagesOptionalParams,
  ListConversationsOptionalParams,
  RemoveParticipantsOptionalParams,
  AddParticipantsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _analyzeConversationSend(
  context: Client,
  conversationId: string,
  options: AnalyzeConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations/{conversationId}:analyze{?api%2Dversion}",
    {
      conversationId: conversationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.repeatabilityRequestId !== undefined
          ? { "repeatability-request-id": options?.repeatabilityRequestId }
          : {}),
        ...(options?.repeatabilityFirstSent !== undefined
          ? {
              "repeatability-first-sent": !options?.repeatabilityFirstSent
                ? options?.repeatabilityFirstSent
                : options?.repeatabilityFirstSent.toUTCString(),
            }
          : {}),
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _analyzeConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<GetConversationThreadAnalysisResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return getConversationThreadAnalysisResultDeserializer(result.body);
}

/** Get AI Analysis of a conversation. */
export async function analyzeConversation(
  context: Client,
  conversationId: string,
  options: AnalyzeConversationOptionalParams = { requestOptions: {} },
): Promise<GetConversationThreadAnalysisResult> {
  const result = await _analyzeConversationSend(context, conversationId, options);
  return _analyzeConversationDeserialize(result);
}

export function _sendMessageSend(
  context: Client,
  conversationId: string,
  options: SendConversationMessageOptions,
  optionalParams: SendMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations/{conversationId}/messages:send{?api%2Dversion}",
    {
      conversationId: conversationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: optionalParams?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(optionalParams),
      contentType: "application/json",
      headers: {
        ...(optionalParams?.repeatabilityRequestId !== undefined
          ? { "repeatability-request-id": optionalParams?.repeatabilityRequestId }
          : {}),
        ...(optionalParams?.repeatabilityFirstSent !== undefined
          ? {
              "repeatability-first-sent": !optionalParams?.repeatabilityFirstSent
                ? optionalParams?.repeatabilityFirstSent
                : optionalParams?.repeatabilityFirstSent.toUTCString(),
            }
          : {}),
        ...(optionalParams?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": optionalParams?.clientRequestId }
          : {}),
        accept: "application/json",
        ...optionalParams.requestOptions?.headers,
      },
      body: sendConversationMessageOptionsSerializer(options),
    });
}

export async function _sendMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<SendConversationMessageResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return sendConversationMessageResultDeserializer(result.body);
}

/** Sends a conversation message from Business to User. */
export async function sendMessage(
  context: Client,
  conversationId: string,
  options: SendConversationMessageOptions,
  optionalParams: SendMessageOptionalParams = { requestOptions: {} },
): Promise<SendConversationMessageResult> {
  const result = await _sendMessageSend(context, conversationId, options, optionalParams);
  return _sendMessageDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  conversationId: string,
  options: ListMessagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations/{conversationId}/messages{?api%2Dversion,maxPageSize,participantId}",
    {
      conversationId: conversationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      maxPageSize: options?.maxPageSize,
      participantId: options?.participantId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listMessagesDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedConversationMessageItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedConversationMessageItemDeserializer(result.body);
}

/** Retrieves list of conversation messages. */
export function listMessages(
  context: Client,
  conversationId: string,
  options: ListMessagesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ConversationMessageItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listMessagesSend(context, conversationId, options),
    _listMessagesDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _listConversationsSend(
  context: Client,
  options: ListConversationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations{?api%2Dversion,maxPageSize,participantId,channelId}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
      maxPageSize: options?.maxPageSize,
      participantId: options?.participantId,
      channelId: options?.channelId,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.clientRequestId }
          : {}),
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listConversationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PagedConversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _pagedConversationDeserializer(result.body);
}

/** Retrieves list of conversations. */
export function listConversations(
  context: Client,
  options: ListConversationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CommunicationConversation> {
  return buildPagedAsyncIterator(
    context,
    () => _listConversationsSend(context, options),
    _listConversationsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-09-01-preview",
    },
  );
}

export function _removeParticipantsSend(
  context: Client,
  conversationId: string,
  options: RemoveParticipantsOptions,
  optionalParams: RemoveParticipantsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations/{conversationId}/participants:remove{?api%2Dversion}",
    {
      conversationId: conversationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: optionalParams?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(optionalParams),
      contentType: "application/json",
      headers: {
        ...(optionalParams?.repeatabilityRequestId !== undefined
          ? { "repeatability-request-id": optionalParams?.repeatabilityRequestId }
          : {}),
        ...(optionalParams?.repeatabilityFirstSent !== undefined
          ? {
              "repeatability-first-sent": !optionalParams?.repeatabilityFirstSent
                ? optionalParams?.repeatabilityFirstSent
                : optionalParams?.repeatabilityFirstSent.toUTCString(),
            }
          : {}),
        ...(optionalParams?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": optionalParams?.clientRequestId }
          : {}),
        accept: "application/json",
        ...optionalParams.requestOptions?.headers,
      },
      body: removeParticipantsOptionsSerializer(options),
    });
}

export async function _removeParticipantsDeserialize(
  result: PathUncheckedResponse,
): Promise<RemoveParticipantsResult> {
  const expectedStatuses = ["207"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return removeParticipantsResultDeserializer(result.body);
}

/** remove a participant from a conversation */
export async function removeParticipants(
  context: Client,
  conversationId: string,
  options: RemoveParticipantsOptions,
  optionalParams: RemoveParticipantsOptionalParams = { requestOptions: {} },
): Promise<RemoveParticipantsResult> {
  const result = await _removeParticipantsSend(context, conversationId, options, optionalParams);
  return _removeParticipantsDeserialize(result);
}

export function _addParticipantsSend(
  context: Client,
  conversationId: string,
  options: AddParticipantsOptions,
  optionalParams: AddParticipantsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations/{conversationId}/participants:add{?api%2Dversion}",
    {
      conversationId: conversationId,
      "api%2Dversion": context.apiVersion ?? "2025-09-01-preview",
    },
    {
      allowReserved: optionalParams?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(optionalParams),
      contentType: "application/json",
      headers: {
        ...(optionalParams?.repeatabilityRequestId !== undefined
          ? { "repeatability-request-id": optionalParams?.repeatabilityRequestId }
          : {}),
        ...(optionalParams?.repeatabilityFirstSent !== undefined
          ? {
              "repeatability-first-sent": !optionalParams?.repeatabilityFirstSent
                ? optionalParams?.repeatabilityFirstSent
                : optionalParams?.repeatabilityFirstSent.toUTCString(),
            }
          : {}),
        ...(optionalParams?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": optionalParams?.clientRequestId }
          : {}),
        accept: "application/json",
        ...optionalParams.requestOptions?.headers,
      },
      body: addParticipantsOptionsSerializer(options),
    });
}

export async function _addParticipantsDeserialize(
  result: PathUncheckedResponse,
): Promise<AddParticipantsResult> {
  const expectedStatuses = ["207"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return addParticipantsResultDeserializer(result.body);
}

/** Adds participants to a specific conversation. */
export async function addParticipants(
  context: Client,
  conversationId: string,
  options: AddParticipantsOptions,
  optionalParams: AddParticipantsOptionalParams = { requestOptions: {} },
): Promise<AddParticipantsResult> {
  const result = await _addParticipantsSend(context, conversationId, options, optionalParams);
  return _addParticipantsDeserialize(result);
}
