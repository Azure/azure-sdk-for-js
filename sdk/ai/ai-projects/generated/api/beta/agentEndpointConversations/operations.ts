// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
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
  VoiceGeneratedItemAudioResponse,
  voiceGeneratedItemAudioResponseDeserializer,
  VoiceRecordingResponse,
  voiceRecordingResponseDeserializer,
  BetaAgentEndpointConversationsDownloadAudioResponse,
  BetaAgentEndpointConversationsDownloadItemGeneratedAudioResponse,
  BetaAgentEndpointConversationsDownloadItemAudioResponse,
} from "../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import {
  BetaAgentEndpointConversationsDownloadAudioOptionalParams,
  BetaAgentEndpointConversationsGetAudioOptionalParams,
  BetaAgentEndpointConversationsDownloadItemGeneratedAudioOptionalParams,
  BetaAgentEndpointConversationsGetItemGeneratedAudioOptionalParams,
  BetaAgentEndpointConversationsDownloadItemAudioOptionalParams,
  BetaAgentEndpointConversationsGetItemAudioOptionalParams,
  BetaAgentEndpointConversationsGetItemOptionalParams,
  BetaAgentEndpointConversationsListItemsOptionalParams,
  BetaAgentEndpointConversationsListResponseItemsOptionalParams,
  BetaAgentEndpointConversationsGetResponseOptionalParams,
  BetaAgentEndpointConversationsListResponsesOptionalParams,
  BetaAgentEndpointConversationsDeleteOptionalParams,
  BetaAgentEndpointConversationsGetOptionalParams,
  BetaAgentEndpointConversationsListOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
  getBinaryStreamResponse,
} from "@azure-rest/core-client";

export function _downloadAudioSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsDownloadAudioOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/audio/content{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "audio/wav",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _downloadAudioDeserialize(
  result: PathUncheckedResponse & BetaAgentEndpointConversationsDownloadAudioResponse,
): Promise<BetaAgentEndpointConversationsDownloadAudioResponse> {
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
export async function downloadAudio(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsDownloadAudioOptionalParams = { requestOptions: {} },
): Promise<BetaAgentEndpointConversationsDownloadAudioResponse> {
  const streamableMethod = _downloadAudioSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadAudioDeserialize(result);
}

export function _getAudioSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsGetAudioOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/audio{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getAudioDeserialize(
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
export async function getAudio(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsGetAudioOptionalParams = { requestOptions: {} },
): Promise<VoiceRecordingResponse> {
  const result = await _getAudioSend(context, foundryFeatures, agentName, conversationId, options);
  return _getAudioDeserialize(result);
}

export function _downloadItemGeneratedAudioSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsDownloadItemGeneratedAudioOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items/{item_id}/audio/generated/content{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      item_id: itemId,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "audio/wav",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _downloadItemGeneratedAudioDeserialize(
  result: PathUncheckedResponse & BetaAgentEndpointConversationsDownloadItemGeneratedAudioResponse,
): Promise<BetaAgentEndpointConversationsDownloadItemGeneratedAudioResponse> {
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
 * Streams a conversation item's generated audio as a WAV (`audio/wav`) byte stream through the service. This
 * subordinate artifact exists only when playback was interrupted and the service rendered more audio than the
 * listener heard, including when the response ends as cancelled. This route serves Foundry-managed storage only.
 * For bring-your-own-storage (BYOS) recordings the bytes are not proxied, so this route returns `409 Conflict`.
 * Returns `404` when the conversation or item was not persisted, or when no generated audio exists beyond the
 * heard segment.
 */
export async function downloadItemGeneratedAudio(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsDownloadItemGeneratedAudioOptionalParams = {
    requestOptions: {},
  },
): Promise<BetaAgentEndpointConversationsDownloadItemGeneratedAudioResponse> {
  const streamableMethod = _downloadItemGeneratedAudioSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    itemId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadItemGeneratedAudioDeserialize(result);
}

export function _getItemGeneratedAudioSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsGetItemGeneratedAudioOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items/{item_id}/audio/generated{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      item_id: itemId,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getItemGeneratedAudioDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceGeneratedItemAudioResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceGeneratedItemAudioResponseDeserializer(result.body);
}

/**
 * Returns metadata for a conversation item's generated audio. This subordinate artifact is separate from the
 * canonical heard-audio segment and exists only when playback was interrupted and the service rendered more audio
 * than the listener heard, including when the response ends as cancelled. Returns `404` when the conversation or
 * item was not persisted, or when no generated audio exists beyond the heard segment.
 */
export async function getItemGeneratedAudio(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsGetItemGeneratedAudioOptionalParams = {
    requestOptions: {},
  },
): Promise<VoiceGeneratedItemAudioResponse> {
  const result = await _getItemGeneratedAudioSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    itemId,
    options,
  );
  return _getItemGeneratedAudioDeserialize(result);
}

export function _downloadItemAudioSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsDownloadItemAudioOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items/{item_id}/audio/content{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      item_id: itemId,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "audio/wav",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _downloadItemAudioDeserialize(
  result: PathUncheckedResponse & BetaAgentEndpointConversationsDownloadItemAudioResponse,
): Promise<BetaAgentEndpointConversationsDownloadItemAudioResponse> {
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
export async function downloadItemAudio(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsDownloadItemAudioOptionalParams = { requestOptions: {} },
): Promise<BetaAgentEndpointConversationsDownloadItemAudioResponse> {
  const streamableMethod = _downloadItemAudioSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    itemId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadItemAudioDeserialize(result);
}

export function _getItemAudioSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsGetItemAudioOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items/{item_id}/audio{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      item_id: itemId,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getItemAudioDeserialize(
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
export async function getItemAudio(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsGetItemAudioOptionalParams = { requestOptions: {} },
): Promise<VoiceItemAudioResponse> {
  const result = await _getItemAudioSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    itemId,
    options,
  );
  return _getItemAudioDeserialize(result);
}

export function _getItemSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsGetItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items/{item_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      item_id: itemId,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getItemDeserialize(
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
export async function getItem(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaAgentEndpointConversationsGetItemOptionalParams = { requestOptions: {} },
): Promise<RealtimeConversationItemUnion> {
  const result = await _getItemSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    itemId,
    options,
  );
  return _getItemDeserialize(result);
}

export function _listItemsSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsListItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/items{?limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listItemsDeserialize(
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
export function listItems(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsListItemsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RealtimeConversationItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listItemsSend(context, foundryFeatures, agentName, conversationId, options),
    _listItemsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _listResponseItemsSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  responseId: string,
  options: BetaAgentEndpointConversationsListResponseItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/responses/{response_id}/items{?limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      response_id: responseId,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listResponseItemsDeserialize(
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
export function listResponseItems(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  responseId: string,
  options: BetaAgentEndpointConversationsListResponseItemsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RealtimeConversationItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listResponseItemsSend(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        responseId,
        options,
      ),
    _listResponseItemsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _getResponseSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  responseId: string,
  options: BetaAgentEndpointConversationsGetResponseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/responses/{response_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      response_id: responseId,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getResponseDeserialize(
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
export async function getResponse(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  responseId: string,
  options: BetaAgentEndpointConversationsGetResponseOptionalParams = { requestOptions: {} },
): Promise<VoiceResponse> {
  const result = await _getResponseSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    responseId,
    options,
  );
  return _getResponseDeserialize(result);
}

export function _listResponsesSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsListResponsesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}/responses{?limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listResponsesDeserialize(
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
export function listResponses(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsListResponsesOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VoiceResponse> {
  return buildPagedAsyncIterator(
    context,
    () => _listResponsesSend(context, foundryFeatures, agentName, conversationId, options),
    _listResponsesDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _$deleteSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: { "foundry-features": foundryFeatures, ...options.requestOptions?.headers },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
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
export async function $delete(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, foundryFeatures, agentName, conversationId, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations/{conversation_id}{?api%2Dversion}",
    {
      agent_name: agentName,
      conversation_id: conversationId,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<VoiceConversation> {
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
export async function get(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaAgentEndpointConversationsGetOptionalParams = { requestOptions: {} },
): Promise<VoiceConversation> {
  const result = await _getSend(context, foundryFeatures, agentName, conversationId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: BetaAgentEndpointConversationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/conversations{?limit,order,after,before,api%2Dversion}",
    {
      agent_name: agentName,
      limit: options?.limit,
      order: options?.order,
      after: options?.after,
      before: options?.before,
      "api%2Dversion": context.apiVersion ?? "v1",
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
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listDeserialize(
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
export function list(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: BetaAgentEndpointConversationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VoiceConversation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, agentName, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}
