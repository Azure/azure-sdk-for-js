// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../index.js";
import { getBinaryStreamResponse } from "#platform/static-helpers/serialization/get-binary-stream-response";
import {
  apiErrorResponseDeserializer,
  _AgentsPagedResultVoiceConversation,
  _agentsPagedResultVoiceConversationDeserializer,
  VoiceConversation,
  voiceConversationDeserializer,
  _AgentsPagedResultVoiceResponse,
  _agentsPagedResultVoiceResponseDeserializer,
  VoiceResponse,
  voiceResponseDeserializer,
  realtimeConversationItemUnionDeserializer,
  RealtimeConversationItemUnion,
  _AgentsPagedResultRealtimeConversationItem,
  _agentsPagedResultRealtimeConversationItemDeserializer,
  VoiceItemAudioResponse,
  voiceItemAudioResponseDeserializer,
  VoiceRecordingResponse,
  voiceRecordingResponseDeserializer,
  AgentEndpointConversationsGetAgentConversationAudioContentResponse,
  AgentEndpointConversationsGetAgentConversationItemAudioContentResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AgentEndpointConversationsGetAgentConversationAudioContentOptionalParams,
  AgentEndpointConversationsGetAgentConversationAudioOptionalParams,
  AgentEndpointConversationsGetAgentConversationItemAudioContentOptionalParams,
  AgentEndpointConversationsGetAgentConversationItemAudioOptionalParams,
  AgentEndpointConversationsGetAgentConversationItemOptionalParams,
  AgentEndpointConversationsListAgentConversationItemsOptionalParams,
  AgentEndpointConversationsListAgentConversationResponseItemsOptionalParams,
  AgentEndpointConversationsGetAgentConversationResponseOptionalParams,
  AgentEndpointConversationsListAgentConversationResponsesOptionalParams,
  AgentEndpointConversationsDeleteAgentConversationOptionalParams,
  AgentEndpointConversationsGetAgentConversationOptionalParams,
  AgentEndpointConversationsListAgentConversationsOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getAgentConversationAudioContentSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsGetAgentConversationAudioContentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/audio/content{?api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "audio/wav",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAgentConversationAudioContentDeserialize(
  result: PathUncheckedResponse &
    AgentEndpointConversationsGetAgentConversationAudioContentResponse,
): Promise<AgentEndpointConversationsGetAgentConversationAudioContentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/**
 * Streams the whole-call merged stereo recording as a WAV (`audio/wav`) byte stream through the service
 * (no SAS URL). This route serves Foundry-managed storage only. For bring-your-own-storage (BYOS)
 * recordings the bytes are not proxied — the caller must download directly from customer storage using the
 * `blob_uri` returned by the metadata route — so this route returns `409 Conflict` for BYOS recordings.
 * While the conversation is `in_progress`, this route returns retriable `409 Conflict` with
 * `error.code = recording_not_ready` and a `Retry-After` header when retry guidance is available. When the
 * conversation is `failed`, it returns terminal `409 Conflict` with `error.code = recording_unavailable`.
 * For a `completed` conversation, content is available subject to the existing BYOS behavior. A conversation
 * without persisted audio (`store = false`) returns `404`.
 */
export async function getAgentConversationAudioContent(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsGetAgentConversationAudioContentOptionalParams = {
    requestOptions: {},
  },
): Promise<AgentEndpointConversationsGetAgentConversationAudioContentResponse> {
  const streamableMethod = _getAgentConversationAudioContentSend(
    context,
    agentName,
    conversationId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getAgentConversationAudioContentDeserialize(result);
}

export function _getAgentConversationAudioSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsGetAgentConversationAudioOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/audio{?api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAgentConversationAudioDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceRecordingResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceRecordingResponseDeserializer(result.body);
}

/**
 * Returns metadata for the whole-call merged stereo recording (user audio on the left channel, agent audio
 * on the right). The common metadata (format, sample rate, channels, channel layout, duration) is returned
 * for both Foundry-managed and bring-your-own-storage (BYOS) recordings; for BYOS the response additionally
 * includes `blob_uri`, the URI of the recording in the customer's own storage (no SAS) that the customer downloads
 * with their own credentials. The recording is built once from the per-turn segments after persistence
 * finalization succeeds. While the conversation is `in_progress`, this route returns retriable `409 Conflict`
 * with `error.code = recording_not_ready` and a `Retry-After` header when retry guidance is available. When the
 * conversation is `failed`, it returns terminal `409 Conflict` with `error.code = recording_unavailable`.
 * For a `completed` conversation, metadata is available subject to the existing BYOS behavior. Requires the
 * conversation to have persisted audio (`store = true`); otherwise returns `404`.
 */
export async function getAgentConversationAudio(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsGetAgentConversationAudioOptionalParams = {
    requestOptions: {},
  },
): Promise<VoiceRecordingResponse> {
  const result = await _getAgentConversationAudioSend(context, agentName, conversationId, options);
  return _getAgentConversationAudioDeserialize(result);
}

export function _getAgentConversationItemAudioContentSend(
  context: Client,
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemAudioContentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items/{item_id}/audio/content{?api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      item_id: itemId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "audio/wav",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAgentConversationItemAudioContentDeserialize(
  result: PathUncheckedResponse &
    AgentEndpointConversationsGetAgentConversationItemAudioContentResponse,
): Promise<AgentEndpointConversationsGetAgentConversationItemAudioContentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { blobBody: result.blobBody, readableStreamBody: result.readableStreamBody };
}

/**
 * Streams a single conversation item's audio as a WAV (`audio/wav`) byte stream through the service (no SAS
 * URL). This route serves Foundry-managed storage only. For bring-your-own-storage (BYOS) recordings the
 * bytes are not proxied — the caller must download directly from customer storage using the `blob_uri`
 * returned by the item's `/audio` metadata route — so this route returns `409 Conflict` for BYOS recordings.
 * Returns `404` when the conversation, item, or its audio was not persisted (`store = false`).
 */
export async function getAgentConversationItemAudioContent(
  context: Client,
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemAudioContentOptionalParams = {
    requestOptions: {},
  },
): Promise<AgentEndpointConversationsGetAgentConversationItemAudioContentResponse> {
  const streamableMethod = _getAgentConversationItemAudioContentSend(
    context,
    agentName,
    conversationId,
    itemId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getAgentConversationItemAudioContentDeserialize(result);
}

export function _getAgentConversationItemAudioSend(
  context: Client,
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemAudioOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items/{item_id}/audio{?api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      item_id: itemId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAgentConversationItemAudioDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceItemAudioResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceItemAudioResponseDeserializer(result.body);
}

/**
 * Returns metadata for a single conversation item's audio segment, including the common playback facts
 * (role, format/codec, sample rate, channels, offset, duration) for both Foundry-managed and
 * bring-your-own-storage (BYOS) recordings; for BYOS the response additionally includes `blob_uri`, the URI
 * of the recording in the customer's own storage (no SAS) that the customer downloads with their own credentials.
 * Requires the conversation to have persisted audio (`store = true`); returns `404` when the conversation,
 * item, or its audio was not persisted.
 */
export async function getAgentConversationItemAudio(
  context: Client,
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemAudioOptionalParams = {
    requestOptions: {},
  },
): Promise<VoiceItemAudioResponse> {
  const result = await _getAgentConversationItemAudioSend(
    context,
    agentName,
    conversationId,
    itemId,
    options,
  );
  return _getAgentConversationItemAudioDeserialize(result);
}

export function _getAgentConversationItemSend(
  context: Client,
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items/{item_id}{?api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      item_id: itemId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAgentConversationItemDeserialize(
  result: PathUncheckedResponse,
): Promise<RealtimeConversationItemUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return realtimeConversationItemUnionDeserializer(result.body);
}

/**
 * Retrieves a single item from the specified conversation by its id, including its transcript. An
 * `input_audio`/`output_audio` content part indicates that audio is available for the item; the canonical per-item
 * audio metadata is the `/items/{item_id}/audio` resource, and the bytes are streamed by
 * `/items/{item_id}/audio/content`. Returns `404` when the conversation or item was not persisted
 * (`store = false`).
 */
export async function getAgentConversationItem(
  context: Client,
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemOptionalParams = {
    requestOptions: {},
  },
): Promise<RealtimeConversationItemUnion> {
  const result = await _getAgentConversationItemSend(
    context,
    agentName,
    conversationId,
    itemId,
    options,
  );
  return _getAgentConversationItemDeserialize(result);
}

export function _listAgentConversationItemsSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsListAgentConversationItemsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items{?limit,order,after,before,api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAgentConversationItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultRealtimeConversationItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultRealtimeConversationItemDeserializer(result.body);
}

/**
 * Returns a paged collection of items — the complete ordered conversation history, including user input,
 * assistant output, and client-created tool outputs (transcripts + tool events). Returns `404` when the
 * conversation was not persisted (`store = false`).
 */
export function listAgentConversationItems(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsListAgentConversationItemsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<RealtimeConversationItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentConversationItemsSend(context, agentName, conversationId, options),
    _listAgentConversationItemsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _listAgentConversationResponseItemsSend(
  context: Client,
  agentName: string,
  conversationId: string,
  responseId: string,
  options: AgentEndpointConversationsListAgentConversationResponseItemsOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/responses/{response_id}/items{?limit,order,after,before,api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      response_id: responseId,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAgentConversationResponseItemsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultRealtimeConversationItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultRealtimeConversationItemDeserializer(result.body);
}

/**
 * Returns a paged collection of the output items produced by a specific response (the response's output
 * projection). For the complete ordered conversation history — including user input and client-created
 * tool outputs — use the conversation items route instead. Returns `404` when the conversation or
 * response was not persisted (`store = false`).
 */
export function listAgentConversationResponseItems(
  context: Client,
  agentName: string,
  conversationId: string,
  responseId: string,
  options: AgentEndpointConversationsListAgentConversationResponseItemsOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<RealtimeConversationItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listAgentConversationResponseItemsSend(
        context,
        agentName,
        conversationId,
        responseId,
        options,
      ),
    _listAgentConversationResponseItemsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getAgentConversationResponseSend(
  context: Client,
  agentName: string,
  conversationId: string,
  responseId: string,
  options: AgentEndpointConversationsGetAgentConversationResponseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/responses/{response_id}{?api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      response_id: responseId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAgentConversationResponseDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceResponseDeserializer(result.body);
}

/**
 * Retrieves a single response from the specified conversation by its id, including its `output` items,
 * `usage`, and status. Returns `404` when the conversation or response was not persisted (`store = false`).
 */
export async function getAgentConversationResponse(
  context: Client,
  agentName: string,
  conversationId: string,
  responseId: string,
  options: AgentEndpointConversationsGetAgentConversationResponseOptionalParams = {
    requestOptions: {},
  },
): Promise<VoiceResponse> {
  const result = await _getAgentConversationResponseSend(
    context,
    agentName,
    conversationId,
    responseId,
    options,
  );
  return _getAgentConversationResponseDeserialize(result);
}

export function _listAgentConversationResponsesSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsListAgentConversationResponsesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/responses{?limit,order,after,before,api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAgentConversationResponsesDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultVoiceResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultVoiceResponseDeserializer(result.body);
}

/**
 * Returns a paged collection of the responses (model inference turns) recorded for the specified
 * conversation. The per-response `output` projection may be omitted here; use the response-items route
 * for the canonical paged output. Returns `404` when the conversation was not persisted (`store = false`).
 */
export function listAgentConversationResponses(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsListAgentConversationResponsesOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VoiceResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentConversationResponsesSend(context, agentName, conversationId, options),
    _listAgentConversationResponsesDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _deleteAgentConversationSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsDeleteAgentConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}{?api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
  });
}

export async function _deleteAgentConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Deletes a conversation and all of its stored data — responses, items, and any audio (cascade). This is
 * the customer's explicit data-deletion control for voice conversations.
 */
export async function deleteAgentConversation(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsDeleteAgentConversationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAgentConversationSend(context, agentName, conversationId, options);
  return _deleteAgentConversationDeserialize(result);
}

export function _getAgentConversationSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsGetAgentConversationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}{?api-version}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getAgentConversationDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceConversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceConversationDeserializer(result.body);
}

/**
 * Retrieves a single conversation recorded for the specified voice agent endpoint by its id.
 * Returns `404` when the conversation was not persisted (`store = false`) or does not exist.
 */
export async function getAgentConversation(
  context: Client,
  agentName: string,
  conversationId: string,
  options: AgentEndpointConversationsGetAgentConversationOptionalParams = { requestOptions: {} },
): Promise<VoiceConversation> {
  const result = await _getAgentConversationSend(context, agentName, conversationId, options);
  return _getAgentConversationDeserialize(result);
}

export function _listAgentConversationsSend(
  context: Client,
  agentName: string,
  options: AgentEndpointConversationsListAgentConversationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations{?limit,order,after,before,api-version}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      "foundry-features": foundryFeatures,
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listAgentConversationsDeserialize(
  result: PathUncheckedResponse,
): Promise<_AgentsPagedResultVoiceConversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultVoiceConversationDeserializer(result.body);
}

/**
 * Returns the conversations persisted for the specified voice agent endpoint.
 * Conversations are present when the session's effective `store` setting is `true`, whether inherited from the
 * agent definition or enabled by the WebSocket session override.
 */
export function listAgentConversations(
  context: Client,
  agentName: string,
  options: AgentEndpointConversationsListAgentConversationsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VoiceConversation> {
  return buildPagedAsyncIterator(
    context,
    () => _listAgentConversationsSend(context, agentName, options),
    _listAgentConversationsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}
