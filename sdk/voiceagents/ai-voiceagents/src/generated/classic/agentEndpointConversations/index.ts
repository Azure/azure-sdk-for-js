// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentsContext } from "../../api/voiceAgentsContext.js";
import {
  getAgentConversationAudioContent,
  getAgentConversationAudio,
  getAgentConversationItemAudioContent,
  getAgentConversationItemAudio,
  getAgentConversationItem,
  listAgentConversationItems,
  listAgentConversationResponseItems,
  getAgentConversationResponse,
  listAgentConversationResponses,
  deleteAgentConversation,
  getAgentConversation,
} from "../../api/agentEndpointConversations/operations.js";
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
} from "../../api/agentEndpointConversations/options.js";
import {
  VoiceConversation,
  VoiceResponse,
  VoiceConversationItemUnion,
  VoiceItemAudioResponse,
  VoiceRecordingResponse,
  AgentEndpointConversationsGetAgentConversationAudioContentResponse,
  AgentEndpointConversationsGetAgentConversationItemAudioContentResponse,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AgentEndpointConversations operations. */
export interface AgentEndpointConversationsOperations {
  /**
   * Streams the whole-call merged stereo recording as a WAV (`audio/wav`) byte stream through the service
   * (no SAS URL). This route serves Foundry-managed storage only. For bring-your-own-storage (BYOS)
   * recordings the bytes are not proxied — the caller must download directly from customer storage using the
   * `blob_uri` returned by the metadata route — so this route returns `409 Conflict` for BYOS recordings.
   * A request against an in-progress session also returns `409` (a distinct condition: session-not-ended
   * versus BYOS-download-required). A conversation without persisted audio (`store = false`) returns `404`.
   */
  getAgentConversationAudioContent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsGetAgentConversationAudioContentOptionalParams,
  ) => Promise<AgentEndpointConversationsGetAgentConversationAudioContentResponse>;
  /**
   * Returns metadata for the whole-call merged stereo recording (user audio on the left channel, agent audio
   * on the right). The common metadata (format, sample rate, channels, channel layout, duration) is returned
   * for both Foundry-managed and bring-your-own-storage (BYOS) recordings; for BYOS the response additionally
   * includes `blob_uri`, the URI of the recording in the customer's own storage (no SAS) that the customer downloads
   * with their own credentials. The recording is built once from the per-turn segments after the session ends;
   * a request against an in-progress session returns `409`. Requires the conversation to have persisted audio
   * (`store = true`); otherwise returns `404`.
   */
  getAgentConversationAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsGetAgentConversationAudioOptionalParams,
  ) => Promise<VoiceRecordingResponse>;
  /**
   * Streams a single conversation item's audio as a WAV (`audio/wav`) byte stream through the service (no SAS
   * URL). This route serves Foundry-managed storage only. For bring-your-own-storage (BYOS) recordings the
   * bytes are not proxied — the caller must download directly from customer storage using the `blob_uri`
   * returned by the item's `/audio` metadata route — so this route returns `409 Conflict` for BYOS recordings.
   * Returns `404` when the conversation, item, or its audio was not persisted (`store = false`).
   */
  getAgentConversationItemAudioContent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: AgentEndpointConversationsGetAgentConversationItemAudioContentOptionalParams,
  ) => Promise<AgentEndpointConversationsGetAgentConversationItemAudioContentResponse>;
  /**
   * Returns metadata for a single conversation item's audio segment, including the common playback facts
   * (role, format/codec, sample rate, channels, offset, duration) for both Foundry-managed and
   * bring-your-own-storage (BYOS) recordings; for BYOS the response additionally includes `blob_uri`, the URI
   * of the recording in the customer's own storage (no SAS) that the customer downloads with their own credentials.
   * Requires the conversation to have persisted audio (`store = true`); returns `404` when the conversation,
   * item, or its audio was not persisted.
   */
  getAgentConversationItemAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: AgentEndpointConversationsGetAgentConversationItemAudioOptionalParams,
  ) => Promise<VoiceItemAudioResponse>;
  /**
   * Retrieves a single item from the specified conversation by its id, including its transcript. An
   * `input_audio`/`output_audio` content part indicates that audio is available for the item; the canonical per-item
   * audio metadata is the `/items/{item_id}/audio` resource, and the bytes are streamed by
   * `/items/{item_id}/audio/content`. Returns `404` when the conversation or item was not persisted
   * (`store = false`).
   */
  getAgentConversationItem: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: AgentEndpointConversationsGetAgentConversationItemOptionalParams,
  ) => Promise<VoiceConversationItemUnion>;
  /**
   * Returns a paged collection of items — the complete ordered conversation history, including user input,
   * assistant output, and client-created tool outputs (transcripts + tool events). Returns `404` when the
   * conversation was not persisted (`store = false`).
   */
  listAgentConversationItems: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsListAgentConversationItemsOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceConversationItemUnion>;
  /**
   * Returns a paged collection of the output items produced by a specific response (the response's output
   * projection). For the complete ordered conversation history — including user input and client-created
   * tool outputs — use the conversation items route instead. Returns `404` when the conversation or
   * response was not persisted (`store = false`).
   */
  listAgentConversationResponseItems: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    responseId: string,
    options?: AgentEndpointConversationsListAgentConversationResponseItemsOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceConversationItemUnion>;
  /**
   * Retrieves a single response from the specified conversation by its id, including its `output` items,
   * `usage`, and status. Returns `404` when the conversation or response was not persisted (`store = false`).
   */
  getAgentConversationResponse: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    responseId: string,
    options?: AgentEndpointConversationsGetAgentConversationResponseOptionalParams,
  ) => Promise<VoiceResponse>;
  /**
   * Returns a paged collection of the responses (model inference turns) recorded for the specified
   * conversation. The per-response `output` projection may be omitted here; use the response-items route
   * for the canonical paged output. Returns `404` when the conversation was not persisted (`store = false`).
   */
  listAgentConversationResponses: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsListAgentConversationResponsesOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceResponse>;
  /**
   * Deletes a conversation and all of its stored data — responses, items, and any audio (cascade). This is
   * the customer's explicit data-deletion control for voice conversations.
   */
  deleteAgentConversation: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsDeleteAgentConversationOptionalParams,
  ) => Promise<void>;
  /**
   * Retrieves a single conversation recorded for the specified voice agent endpoint by its id.
   * Returns `404` when the conversation was not persisted (`store = false`) or does not exist.
   */
  getAgentConversation: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsGetAgentConversationOptionalParams,
  ) => Promise<VoiceConversation>;
}
function _getAgentEndpointConversations(context: VoiceAgentsContext) {
  return {
    getAgentConversationAudioContent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsGetAgentConversationAudioContentOptionalParams,
    ) =>
      getAgentConversationAudioContent(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        options,
      ),
    getAgentConversationAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsGetAgentConversationAudioOptionalParams,
    ) => getAgentConversationAudio(context, foundryFeatures, agentName, conversationId, options),
    getAgentConversationItemAudioContent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: AgentEndpointConversationsGetAgentConversationItemAudioContentOptionalParams,
    ) =>
      getAgentConversationItemAudioContent(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        itemId,
        options,
      ),
    getAgentConversationItemAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: AgentEndpointConversationsGetAgentConversationItemAudioOptionalParams,
    ) =>
      getAgentConversationItemAudio(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        itemId,
        options,
      ),
    getAgentConversationItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: AgentEndpointConversationsGetAgentConversationItemOptionalParams,
    ) =>
      getAgentConversationItem(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        itemId,
        options,
      ),
    listAgentConversationItems: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsListAgentConversationItemsOptionalParams,
    ) => listAgentConversationItems(context, foundryFeatures, agentName, conversationId, options),
    listAgentConversationResponseItems: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      responseId: string,
      options?: AgentEndpointConversationsListAgentConversationResponseItemsOptionalParams,
    ) =>
      listAgentConversationResponseItems(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        responseId,
        options,
      ),
    getAgentConversationResponse: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      responseId: string,
      options?: AgentEndpointConversationsGetAgentConversationResponseOptionalParams,
    ) =>
      getAgentConversationResponse(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        responseId,
        options,
      ),
    listAgentConversationResponses: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsListAgentConversationResponsesOptionalParams,
    ) =>
      listAgentConversationResponses(context, foundryFeatures, agentName, conversationId, options),
    deleteAgentConversation: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsDeleteAgentConversationOptionalParams,
    ) => deleteAgentConversation(context, foundryFeatures, agentName, conversationId, options),
    getAgentConversation: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsGetAgentConversationOptionalParams,
    ) => getAgentConversation(context, foundryFeatures, agentName, conversationId, options),
  };
}
export function _getAgentEndpointConversationsOperations(
  context: VoiceAgentsContext,
): AgentEndpointConversationsOperations {
  return {
    ..._getAgentEndpointConversations(context),
  };
}
