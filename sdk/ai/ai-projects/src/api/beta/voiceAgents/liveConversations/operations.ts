// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../../index.js";
import {
  apiErrorResponseDeserializer,
  voiceAudioItemDeserializer,
  voiceRecordingDeserializer,
  _agentsPagedResultVoiceAgentLiveConversationDeserializer,
  voiceAgentLiveConversationDeserializer,
  _agentsPagedResultVoiceAgentLiveConversationItemDeserializer,
  voiceAgentLiveConversationItemUnionDeserializer,
} from "../../../../models/models.js";
import type {
  VoiceAudioItem,
  VoiceRecording,
  _AgentsPagedResultVoiceAgentLiveConversation,
  VoiceAgentLiveConversation,
  _AgentsPagedResultVoiceAgentLiveConversationItem,
  VoiceAgentLiveConversationItemUnion,
  BetaVoiceAgentsLiveConversationsDownloadAudioResponse,
  BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse,
} from "../../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import { buildPagedAsyncIterator } from "../../../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../../../static-helpers/urlTemplate.js";
import type {
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
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import { getBinaryStreamResponse } from "#platform/static-helpers/serialization/get-binary-stream-response";

export function _downloadAudioSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsDownloadAudioOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/audio/content{?api-version}",
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
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsDownloadAudioOptionalParams = { requestOptions: {} },
): Promise<BetaVoiceAgentsLiveConversationsDownloadAudioResponse> {
  const streamableMethod = _downloadAudioSend(context, agentName, conversationId, options);
  const result = await getBinaryStreamResponse(streamableMethod);
  return _downloadAudioDeserialize(result);
}

export function _getAudioSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsGetAudioOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/audio{?api-version}",
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
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsGetAudioOptionalParams = { requestOptions: {} },
): Promise<VoiceRecording> {
  const result = await _getAudioSend(context, agentName, conversationId, options);
  return _getAudioDeserialize(result);
}

export function _downloadAudioItemSend(
  context: Client,
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsDownloadAudioItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/items/{item_id}/audio/content{?api-version}",
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
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsDownloadAudioItemOptionalParams = { requestOptions: {} },
): Promise<BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse> {
  const streamableMethod = _downloadAudioItemSend(
    context,
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
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsGetAudioItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/items/{item_id}/audio{?api-version}",
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
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsGetAudioItemOptionalParams = { requestOptions: {} },
): Promise<VoiceAudioItem> {
  const result = await _getAudioItemSend(context, agentName, conversationId, itemId, options);
  return _getAudioItemDeserialize(result);
}

export function _getItemSend(
  context: Client,
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsGetItemOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/items/{item_id}{?api-version}",
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
  agentName: string,
  conversationId: string,
  itemId: string,
  options: BetaVoiceAgentsLiveConversationsGetItemOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentLiveConversationItemUnion> {
  const result = await _getItemSend(context, agentName, conversationId, itemId, options);
  return _getItemDeserialize(result);
}

export function _listItemsSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsListItemsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}/items{?after,api-version,before,limit,order}",
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
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsListItemsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VoiceAgentLiveConversationItemUnion> {
  return buildPagedAsyncIterator(
    context,
    () => _listItemsSend(context, agentName, conversationId, options),
    _listItemsDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
      nextPageRequestOptions: {
        ...operationOptionsToRequestParameters(options),
        headers: {
          "foundry-features": "VoiceAgents=V1Preview",
          accept: "application/json",
          ...options.requestOptions?.headers,
        },
      },
    },
  );
}

export function _$deleteSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}{?api-version}",
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
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, agentName, conversationId, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations/{conversation_id}{?api-version}",
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
  agentName: string,
  conversationId: string,
  options: BetaVoiceAgentsLiveConversationsGetOptionalParams = { requestOptions: {} },
): Promise<VoiceAgentLiveConversation> {
  const result = await _getSend(context, agentName, conversationId, options);
  return _getDeserialize(result);
}

export function _listSend(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentsLiveConversationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice/live/conversations{?after,api-version,before,limit,order}",
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
  agentName: string,
  options: BetaVoiceAgentsLiveConversationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VoiceAgentLiveConversation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, agentName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "data",
      apiVersion: context.apiVersion ?? "v1",
      cursorFieldName: "last_id",
      hasMoreFieldName: "has_more",
      nextPageRequestOptions: {
        ...operationOptionsToRequestParameters(options),
        headers: {
          "foundry-features": "VoiceAgents=V1Preview",
          accept: "application/json",
          ...options.requestOptions?.headers,
        },
      },
    },
  );
}
