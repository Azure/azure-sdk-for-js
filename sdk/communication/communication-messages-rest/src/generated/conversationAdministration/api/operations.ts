// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConversationAdministrationContext as Client } from "./index.js";
import {
  CommunicationConversation,
  communicationConversationSerializer,
  communicationConversationDeserializer,
  messageSerializer,
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
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AnalyzeConversationOptionalParams,
  RemoveParticipantsOptionalParams,
  AddParticipantsOptionalParams,
  ListMessagesOptionalParams,
  ListConversationsOptionalParams,
  TerminateConversationOptionalParams,
  DeleteConversationOptionalParams,
  GetConversationOptionalParams,
  CreateConversationOptionalParams,
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

export function _terminateConversationSend(
  context: Client,
  conversationId: string,
  options: TerminateConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations/{conversationId}:terminate{?api%2Dversion}",
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _terminateConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Terminates a specific conversation. */
export async function terminateConversation(
  context: Client,
  conversationId: string,
  options: TerminateConversationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _terminateConversationSend(context, conversationId, options);
  return _terminateConversationDeserialize(result);
}

export function _deleteConversationSend(
  context: Client,
  conversationId: string,
  options: DeleteConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations/{conversationId}{?api%2Dversion}",
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
    .delete({
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
        ...options.requestOptions?.headers,
      },
    });
}

export async function _deleteConversationDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Deletes a specific conversation. */
export async function deleteConversation(
  context: Client,
  conversationId: string,
  options: DeleteConversationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteConversationSend(context, conversationId, options);
  return _deleteConversationDeserialize(result);
}

export function _getConversationSend(
  context: Client,
  conversationId: string,
  options: GetConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations/{conversationId}{?api%2Dversion}",
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

export async function _getConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunicationConversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return communicationConversationDeserializer(result.body);
}

/** Gets the details of a specific conversation. */
export async function getConversation(
  context: Client,
  conversationId: string,
  options: GetConversationOptionalParams = { requestOptions: {} },
): Promise<CommunicationConversation> {
  const result = await _getConversationSend(context, conversationId, options);
  return _getConversationDeserialize(result);
}

export function _createConversationSend(
  context: Client,
  conversation: CommunicationConversation,
  options: CreateConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/messages/conversations{?api%2Dversion}",
    {
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
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: {
        conversation: communicationConversationSerializer(conversation),
        initialMessage: !options?.initialMessage
          ? options?.initialMessage
          : messageSerializer(options?.initialMessage),
      },
    });
}

export async function _createConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<CommunicationConversation> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return communicationConversationDeserializer(result.body);
}

/** Creates a new conversation. This is only for create operation. */
export async function createConversation(
  context: Client,
  conversation: CommunicationConversation,
  options: CreateConversationOptionalParams = { requestOptions: {} },
): Promise<CommunicationConversation> {
  const result = await _createConversationSend(context, conversation, options);
  return _createConversationDeserialize(result);
}
