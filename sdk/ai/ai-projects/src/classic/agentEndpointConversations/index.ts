// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
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
  listAgentConversations,
} from "../../api/agentEndpointConversations/operations.js";
import type {
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
} from "../../api/agentEndpointConversations/options.js";
import type {
  VoiceConversation,
  VoiceResponse,
  RealtimeConversationItemUnion,
  VoiceItemAudioResponse,
  VoiceRecordingResponse,
  AgentEndpointConversationsGetAgentConversationAudioContentResponse,
  AgentEndpointConversationsGetAgentConversationItemAudioContentResponse,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";

/** Interface representing a AgentEndpointConversations operations. */
export interface AgentEndpointConversationsOperations {
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
  getAgentConversationAudioContent: (
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsGetAgentConversationAudioContentOptionalParams,
  ) => Promise<AgentEndpointConversationsGetAgentConversationAudioContentResponse>;
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
  getAgentConversationAudio: (
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
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: AgentEndpointConversationsGetAgentConversationItemOptionalParams,
  ) => Promise<RealtimeConversationItemUnion>;
  /**
   * Returns a paged collection of items — the complete ordered conversation history, including user input,
   * assistant output, and client-created tool outputs (transcripts + tool events). Returns `404` when the
   * conversation was not persisted (`store = false`).
   */
  listAgentConversationItems: (
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsListAgentConversationItemsOptionalParams,
  ) => PagedAsyncIterableIterator<RealtimeConversationItemUnion>;
  /**
   * Returns a paged collection of the output items produced by a specific response (the response's output
   * projection). For the complete ordered conversation history — including user input and client-created
   * tool outputs — use the conversation items route instead. Returns `404` when the conversation or
   * response was not persisted (`store = false`).
   */
  listAgentConversationResponseItems: (
    agentName: string,
    conversationId: string,
    responseId: string,
    options?: AgentEndpointConversationsListAgentConversationResponseItemsOptionalParams,
  ) => PagedAsyncIterableIterator<RealtimeConversationItemUnion>;
  /**
   * Retrieves a single response from the specified conversation by its id, including its `output` items,
   * `usage`, and status. Returns `404` when the conversation or response was not persisted (`store = false`).
   */
  getAgentConversationResponse: (
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
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsListAgentConversationResponsesOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceResponse>;
  /**
   * Deletes a conversation and all of its stored data — responses, items, and any audio (cascade). This is
   * the customer's explicit data-deletion control for voice conversations.
   */
  deleteAgentConversation: (
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsDeleteAgentConversationOptionalParams,
  ) => Promise<void>;
  /**
   * Retrieves a single conversation recorded for the specified voice agent endpoint by its id.
   * Returns `404` when the conversation was not persisted (`store = false`) or does not exist.
   */
  getAgentConversation: (
    agentName: string,
    conversationId: string,
    options?: AgentEndpointConversationsGetAgentConversationOptionalParams,
  ) => Promise<VoiceConversation>;
  /**
   * Returns the conversations persisted for the specified voice agent endpoint.
   * Conversations are present when the session's effective `store` setting is `true`, whether inherited from the
   * agent definition or enabled by the WebSocket session override.
   */
  listAgentConversations: (
    agentName: string,
    options?: AgentEndpointConversationsListAgentConversationsOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceConversation>;
}

function _getAgentEndpointConversations(context: AIProjectContext) {
  return {
    getAgentConversationAudioContent: (
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsGetAgentConversationAudioContentOptionalParams,
    ) =>
      getAgentConversationAudioContent(
        context,
        agentName,
        conversationId,
        options,
      ),
    getAgentConversationAudio: (
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsGetAgentConversationAudioOptionalParams,
    ) => getAgentConversationAudio(context, agentName, conversationId, options),
    getAgentConversationItemAudioContent: (
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: AgentEndpointConversationsGetAgentConversationItemAudioContentOptionalParams,
    ) =>
      getAgentConversationItemAudioContent(
        context,
        agentName,
        conversationId,
        itemId,
        options,
      ),
    getAgentConversationItemAudio: (
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: AgentEndpointConversationsGetAgentConversationItemAudioOptionalParams,
    ) =>
      getAgentConversationItemAudio(
        context,
        agentName,
        conversationId,
        itemId,
        options,
      ),
    getAgentConversationItem: (
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: AgentEndpointConversationsGetAgentConversationItemOptionalParams,
    ) =>
      getAgentConversationItem(
        context,
        agentName,
        conversationId,
        itemId,
        options,
      ),
    listAgentConversationItems: (
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsListAgentConversationItemsOptionalParams,
    ) => listAgentConversationItems(context, agentName, conversationId, options),
    listAgentConversationResponseItems: (
      agentName: string,
      conversationId: string,
      responseId: string,
      options?: AgentEndpointConversationsListAgentConversationResponseItemsOptionalParams,
    ) =>
      listAgentConversationResponseItems(
        context,
        agentName,
        conversationId,
        responseId,
        options,
      ),
    getAgentConversationResponse: (
      agentName: string,
      conversationId: string,
      responseId: string,
      options?: AgentEndpointConversationsGetAgentConversationResponseOptionalParams,
    ) =>
      getAgentConversationResponse(
        context,
        agentName,
        conversationId,
        responseId,
        options,
      ),
    listAgentConversationResponses: (
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsListAgentConversationResponsesOptionalParams,
    ) =>
      listAgentConversationResponses(context, agentName, conversationId, options),
    deleteAgentConversation: (
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsDeleteAgentConversationOptionalParams,
    ) => deleteAgentConversation(context, agentName, conversationId, options),
    getAgentConversation: (
      agentName: string,
      conversationId: string,
      options?: AgentEndpointConversationsGetAgentConversationOptionalParams,
    ) => getAgentConversation(context, agentName, conversationId, options),
    listAgentConversations: (
      agentName: string,
      options?: AgentEndpointConversationsListAgentConversationsOptionalParams,
    ) => listAgentConversations(context, agentName, options),
  };
}

export function _getAgentEndpointConversationsOperations(
  context: AIProjectContext,
): AgentEndpointConversationsOperations {
  return {
    ..._getAgentEndpointConversations(context),
  };
}
