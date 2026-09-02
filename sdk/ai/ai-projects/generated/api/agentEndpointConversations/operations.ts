// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import {
  apiErrorResponseDeserializer,
  VoiceGeneratedItemAudioResponse,
  voiceGeneratedItemAudioResponseDeserializer,
  AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentResponse,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentOptionalParams,
  AgentEndpointConversationsGetAgentConversationItemGeneratedAudioOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
  getBinaryStreamResponse,
} from "@azure-rest/core-client";

export function _getAgentConversationItemGeneratedAudioContentSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentOptionalParams = {
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

export async function _getAgentConversationItemGeneratedAudioContentDeserialize(
  result: PathUncheckedResponse &
    AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentResponse,
): Promise<AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentResponse> {
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
export async function getAgentConversationItemGeneratedAudioContent(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentOptionalParams = {
    requestOptions: {},
  },
): Promise<AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentResponse> {
  const streamableMethod = _getAgentConversationItemGeneratedAudioContentSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    itemId,
    options,
  );
  const result = await getBinaryStreamResponse(streamableMethod);
  return _getAgentConversationItemGeneratedAudioContentDeserialize(result);
}

export function _getAgentConversationItemGeneratedAudioSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemGeneratedAudioOptionalParams = {
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

export async function _getAgentConversationItemGeneratedAudioDeserialize(
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
export async function getAgentConversationItemGeneratedAudio(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  conversationId: string,
  itemId: string,
  options: AgentEndpointConversationsGetAgentConversationItemGeneratedAudioOptionalParams = {
    requestOptions: {},
  },
): Promise<VoiceGeneratedItemAudioResponse> {
  const result = await _getAgentConversationItemGeneratedAudioSend(
    context,
    foundryFeatures,
    agentName,
    conversationId,
    itemId,
    options,
  );
  return _getAgentConversationItemGeneratedAudioDeserialize(result);
}
