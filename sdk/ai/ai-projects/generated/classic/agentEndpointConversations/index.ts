// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  getAgentConversationItemGeneratedAudioContent,
  getAgentConversationItemGeneratedAudio,
} from "../../api/agentEndpointConversations/operations.js";
import {
  AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentOptionalParams,
  AgentEndpointConversationsGetAgentConversationItemGeneratedAudioOptionalParams,
} from "../../api/agentEndpointConversations/options.js";
import {
  VoiceGeneratedItemAudioResponse,
  AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentResponse,
} from "../../models/models.js";

/** Interface representing a AgentEndpointConversations operations. */
export interface AgentEndpointConversationsOperations {
  /**
   * Streams a conversation item's generated audio as a WAV (`audio/wav`) byte stream through the service. This
   * subordinate artifact exists only when playback was interrupted and the service rendered more audio than the
   * listener heard, including when the response ends as cancelled. This route serves Foundry-managed storage only.
   * For bring-your-own-storage (BYOS) recordings the bytes are not proxied, so this route returns `409 Conflict`.
   * Returns `404` when the conversation or item was not persisted, or when no generated audio exists beyond the
   * heard segment.
   */
  getAgentConversationItemGeneratedAudioContent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentOptionalParams,
  ) => Promise<AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentResponse>;
  /**
   * Returns metadata for a conversation item's generated audio. This subordinate artifact is separate from the
   * canonical heard-audio segment and exists only when playback was interrupted and the service rendered more audio
   * than the listener heard, including when the response ends as cancelled. Returns `404` when the conversation or
   * item was not persisted, or when no generated audio exists beyond the heard segment.
   */
  getAgentConversationItemGeneratedAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: AgentEndpointConversationsGetAgentConversationItemGeneratedAudioOptionalParams,
  ) => Promise<VoiceGeneratedItemAudioResponse>;
}

function _getAgentEndpointConversations(context: AIProjectContext) {
  return {
    getAgentConversationItemGeneratedAudioContent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: AgentEndpointConversationsGetAgentConversationItemGeneratedAudioContentOptionalParams,
    ) =>
      getAgentConversationItemGeneratedAudioContent(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        itemId,
        options,
      ),
    getAgentConversationItemGeneratedAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: AgentEndpointConversationsGetAgentConversationItemGeneratedAudioOptionalParams,
    ) =>
      getAgentConversationItemGeneratedAudio(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        itemId,
        options,
      ),
  };
}

export function _getAgentEndpointConversationsOperations(
  context: AIProjectContext,
): AgentEndpointConversationsOperations {
  return {
    ..._getAgentEndpointConversations(context),
  };
}
