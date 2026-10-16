// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../../index.js";
import {
  apiErrorResponseDeserializer,
  VoiceAudioItem,
  voiceAudioItemDeserializer,
  VoiceRecording,
  voiceRecordingDeserializer,
  _AgentsPagedResultVoiceAgentLiveConversation,
  _agentsPagedResultVoiceAgentLiveConversationDeserializer,
  VoiceAgentLiveConversation,
  voiceAgentLiveConversationDeserializer,
  _AgentsPagedResultVoiceAgentLiveConversationItem,
  _agentsPagedResultVoiceAgentLiveConversationItemDeserializer,
  voiceAgentLiveConversationItemUnionDeserializer,
  VoiceAgentLiveConversationItemUnion,
  BetaVoiceAgentsLiveConversationsDownloadAudioResponse,
  BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse,
} from "../../../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../../static-helpers/urlTemplate.js";
import {
  BetaVoiceAgentsLiveConversationsDownloadAudioOptionalParams,
  BetaVoiceAgentsLiveConversationsGetAudioOptionalParams,
  BetaVoiceAgentsLiveConversationsDownloadAudioItemOptionalParams,
  BetaVoiceAgentsLiveConversationsGetAudioItemOptionalParams,
  BetaVoiceAgentsLiveConversationsGetItemOptionalParams,
  BetaVoiceAgentsLiveConversationsListItemsOptionalParams,
  BetaVoiceAgentsLiveConversationsDeleteOptionalParams,
  BetaVoiceAgentsLiveConversationsGetOptionalParams,
  BetaVoiceAgentsLiveConversationsListOptionalParams,
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
  options: BetaVoiceAgentsLiveConversationsDownloadAudioOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/audio/content{?api%2Dversion}",
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
  result: PathUncheckedResponse & BetaVoiceAgentsLiveConversationsDownloadAudioResponse,
): Promise<BetaVoiceAgentsLiveConversationsDownloadAudioResponse> {
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

/** Streams the merged stereo WAV. BYOS returns 409; use blob_uri. Returns 404 for no audio, or 409 recording_not_ready/recording_unavailable for pending/failed finalization. */
export async function downloadAudio(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsDownloadAudioOptionalParams = { requestOptions: {} },
): Promise<BetaVoiceAgentsLiveConversationsDownloadAudioResponse> {
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
  options: BetaVoiceAgentsLiveConversationsGetAudioOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/audio{?api%2Dversion}",
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

export async function _getAudioDeserialize(result: PathUncheckedResponse): Promise<VoiceRecording> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceRecordingDeserializer(result.body);
}

/** Gets merged stereo recording metadata (user left, assistant right). BYOS uses unsigned blob_uri. Returns 404 for no audio, or 409 recording_not_ready/recording_unavailable for pending/failed finalization; pending responses may include Retry-After. */
export async function getAudio(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsGetAudioOptionalParams = { requestOptions: {} },
): Promise<VoiceRecording> {
  const result = await _getAudioSend(context, foundryFeatures, agentName, conversationId, options);
  return _getAudioDeserialize(result);
}

export function _downloadAudioItemSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsDownloadAudioItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/items/{item_id}/audio/content{?api%2Dversion}",
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

export async function _downloadAudioItemDeserialize(
  result: PathUncheckedResponse & BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse,
): Promise<BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse> {
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

/** Streams captured speech as WAV. BYOS returns 409; use blob_uri. Returns 404 for missing audio, unstored conversations, or delegation items. */
export async function downloadAudioItem(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsDownloadAudioItemOptionalParams = { requestOptions: {} },
): Promise<BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse> {
  const streamableMethod = _downloadAudioItemSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    itemId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadAudioItemDeserialize(result);
}

export function _getAudioItemSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsGetAudioItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/items/{item_id}/audio{?api%2Dversion}",
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

export async function _getAudioItemDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceAudioItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceAudioItemDeserializer(result.body);
}

/** Gets captured speech-audio metadata. BYOS uses unsigned blob_uri. Returns 404 for missing audio, unstored conversations, or delegation items. */
export async function getAudioItem(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsGetAudioItemOptionalParams = { requestOptions: {} },
): Promise<VoiceAudioItem> {
  const result = await _getAudioItemSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    itemId,
    options,
  );
  return _getAudioItemDeserialize(result);
}

export function _getItemSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsGetItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/items/{item_id}{?api%2Dversion}",
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
): Promise<VoiceAgentLiveConversationItemUnion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceAgentLiveConversationItemUnionDeserializer(result.body);
}

/** Gets a stored item by ID. Returns 404 if the item or conversation is absent. */
export async function getItem(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsGetItemOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentLiveConversationItemUnion> {
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
  options: BetaVoiceAgentsLiveConversationsListItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/items{?limit,order,after,before,api%2Dversion}",
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
): Promise<_AgentsPagedResultVoiceAgentLiveConversationItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultVoiceAgentLiveConversationItemDeserializer(result.body);
}

/** Lists stored speech and delegation items in order; cursors use item IDs. Returns 404 if the conversation is absent or unstored. */
export function listItems(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsListItemsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VoiceAgentLiveConversationItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listItemsSend(context, foundryFeatures, agentName, conversationId, options),
    _listItemsDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}

export function _$deleteSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}{?api%2Dversion}",
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

/** Deletes the stored conversation and its items/audio, without closing the Live session. */
export async function $delete(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, foundryFeatures, agentName, conversationId, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VoiceAgentLiveConversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return voiceAgentLiveConversationDeserializer(result.body);
}

/** Gets a stored Live conversation; fetch items separately. Returns 404 if absent or not stored. */
export async function get(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsGetOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentLiveConversation> {
  const result = await _getSend(context, foundryFeatures, agentName, conversationId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: BetaVoiceAgentsLiveConversationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations{?limit,order,after,before,api%2Dversion}",
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
): Promise<_AgentsPagedResultVoiceAgentLiveConversation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _agentsPagedResultVoiceAgentLiveConversationDeserializer(result.body);
}

/** Lists stored Live conversations for this agent, including sessions stored via an override. */
export function list(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: BetaVoiceAgentsLiveConversationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VoiceAgentLiveConversation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, foundryFeatures, agentName, options),
    _listDeserialize,
    ["200"],
    { itemName: "data", apiVersion: context.apiVersion ?? "v1" },
  );
}
