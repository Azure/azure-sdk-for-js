// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  downloadAudio,
  getAudio,
  downloadItemGeneratedAudio,
  getItemGeneratedAudio,
  downloadItemAudio,
  getItemAudio,
  getItem,
  listItems,
  listResponseItems,
  getResponse,
  listResponses,
  $delete,
  get,
  list,
} from "../../../api/beta/agentEndpointConversations/operations.js";
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
} from "../../../api/beta/agentEndpointConversations/options.js";
import {
  VoiceConversation,
  VoiceResponse,
  RealtimeConversationItemUnion,
  VoiceItemAudioResponse,
  VoiceGeneratedItemAudioResponse,
  VoiceRecordingResponse,
  BetaAgentEndpointConversationsDownloadAudioResponse,
  BetaAgentEndpointConversationsDownloadItemGeneratedAudioResponse,
  BetaAgentEndpointConversationsDownloadItemAudioResponse,
} from "../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaAgentEndpointConversations operations. */
export interface BetaAgentEndpointConversationsOperations {
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
  downloadAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaAgentEndpointConversationsDownloadAudioOptionalParams,
  ) => Promise<BetaAgentEndpointConversationsDownloadAudioResponse>;
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
  getAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaAgentEndpointConversationsGetAudioOptionalParams,
  ) => Promise<VoiceRecordingResponse>;
  /**
   * Streams a conversation item's generated audio as a WAV (`audio/wav`) byte stream through the service. This
   * subordinate artifact exists only when playback was interrupted and the service rendered more audio than the
   * listener heard, including when the response ends as cancelled. This route serves Foundry-managed storage only.
   * For bring-your-own-storage (BYOS) recordings the bytes are not proxied, so this route returns `409 Conflict`.
   * Returns `404` when the conversation or item was not persisted, or when no generated audio exists beyond the
   * heard segment.
   */
  downloadItemGeneratedAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaAgentEndpointConversationsDownloadItemGeneratedAudioOptionalParams,
  ) => Promise<BetaAgentEndpointConversationsDownloadItemGeneratedAudioResponse>;
  /**
   * Returns metadata for a conversation item's generated audio. This subordinate artifact is separate from the
   * canonical heard-audio segment and exists only when playback was interrupted and the service rendered more audio
   * than the listener heard, including when the response ends as cancelled. Returns `404` when the conversation or
   * item was not persisted, or when no generated audio exists beyond the heard segment.
   */
  getItemGeneratedAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaAgentEndpointConversationsGetItemGeneratedAudioOptionalParams,
  ) => Promise<VoiceGeneratedItemAudioResponse>;
  /**
   * Streams a single conversation item's audio as a WAV (`audio/wav`) byte stream through the service (no SAS
   * URL). This route serves Foundry-managed storage only. For bring-your-own-storage (BYOS) recordings the
   * bytes are not proxied — the caller must download directly from customer storage using the `blob_uri`
   * returned by the item's `/audio` metadata route — so this route returns `409 Conflict` for BYOS recordings.
   * Returns `404` when the conversation, item, or its audio was not persisted (`store = false`).
   */
  downloadItemAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaAgentEndpointConversationsDownloadItemAudioOptionalParams,
  ) => Promise<BetaAgentEndpointConversationsDownloadItemAudioResponse>;
  /**
   * Returns metadata for a single conversation item's audio segment, including the common playback facts
   * (role, format/codec, sample rate, channels, offset, duration) for both Foundry-managed and
   * bring-your-own-storage (BYOS) recordings; for BYOS the response additionally includes `blob_uri`, the URI
   * of the recording in the customer's own storage (no SAS) that the customer downloads with their own credentials.
   * Requires the conversation to have persisted audio (`store = true`); returns `404` when the conversation,
   * item, or its audio was not persisted.
   */
  getItemAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaAgentEndpointConversationsGetItemAudioOptionalParams,
  ) => Promise<VoiceItemAudioResponse>;
  /**
   * Retrieves a single item from the specified conversation by its id, including its transcript. An
   * `input_audio`/`output_audio` content part indicates that audio is available for the item; the canonical per-item
   * audio metadata is the `/items/{item_id}/audio` resource, and the bytes are streamed by
   * `/items/{item_id}/audio/content`. Returns `404` when the conversation or item was not persisted
   * (`store = false`).
   */
  getItem: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaAgentEndpointConversationsGetItemOptionalParams,
  ) => Promise<RealtimeConversationItemUnion>;
  /**
   * Returns a paged collection of items — the complete ordered conversation history, including user input,
   * assistant output, and client-created tool outputs (transcripts + tool events). Returns `404` when the
   * conversation was not persisted (`store = false`).
   */
  listItems: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaAgentEndpointConversationsListItemsOptionalParams,
  ) => PagedAsyncIterableIterator<RealtimeConversationItemUnion>;
  /**
   * Returns a paged collection of the output items produced by a specific response (the response's output
   * projection). For the complete ordered conversation history — including user input and client-created
   * tool outputs — use the conversation items route instead. Returns `404` when the conversation or
   * response was not persisted (`store = false`).
   */
  listResponseItems: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    responseId: string,
    options?: BetaAgentEndpointConversationsListResponseItemsOptionalParams,
  ) => PagedAsyncIterableIterator<RealtimeConversationItemUnion>;
  /**
   * Retrieves a single response from the specified conversation by its id, including its `output` items,
   * `usage`, and status. Returns `404` when the conversation or response was not persisted (`store = false`).
   */
  getResponse: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    responseId: string,
    options?: BetaAgentEndpointConversationsGetResponseOptionalParams,
  ) => Promise<VoiceResponse>;
  /**
   * Returns a paged collection of the responses (model inference turns) recorded for the specified
   * conversation. The per-response `output` projection may be omitted here; use the response-items route
   * for the canonical paged output. Returns `404` when the conversation was not persisted (`store = false`).
   */
  listResponses: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaAgentEndpointConversationsListResponsesOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceResponse>;
  /**
   * Deletes a conversation and all of its stored data — responses, items, and any audio (cascade). This is
   * the customer's explicit data-deletion control for voice conversations.
   */
  delete: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaAgentEndpointConversationsDeleteOptionalParams,
  ) => Promise<void>;
  /**
   * Retrieves a single conversation recorded for the specified voice agent endpoint by its id.
   * Returns `404` when the conversation was not persisted (`store = false`) or does not exist.
   */
  get: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaAgentEndpointConversationsGetOptionalParams,
  ) => Promise<VoiceConversation>;
  /**
   * Returns the conversations persisted for the specified voice agent endpoint.
   * Conversations are present when the session's effective `store` setting is `true`, whether inherited from the
   * agent definition or enabled by the WebSocket session override.
   */
  list: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: BetaAgentEndpointConversationsListOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceConversation>;
}

function _getBetaAgentEndpointConversations(context: AIProjectContext) {
  return {
    downloadAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaAgentEndpointConversationsDownloadAudioOptionalParams,
    ) => downloadAudio(context, foundryFeatures, agentName, conversationId, options),
    getAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaAgentEndpointConversationsGetAudioOptionalParams,
    ) => getAudio(context, foundryFeatures, agentName, conversationId, options),
    downloadItemGeneratedAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaAgentEndpointConversationsDownloadItemGeneratedAudioOptionalParams,
    ) =>
      downloadItemGeneratedAudio(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        itemId,
        options,
      ),
    getItemGeneratedAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaAgentEndpointConversationsGetItemGeneratedAudioOptionalParams,
    ) =>
      getItemGeneratedAudio(context, foundryFeatures, agentName, conversationId, itemId, options),
    downloadItemAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaAgentEndpointConversationsDownloadItemAudioOptionalParams,
    ) => downloadItemAudio(context, foundryFeatures, agentName, conversationId, itemId, options),
    getItemAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaAgentEndpointConversationsGetItemAudioOptionalParams,
    ) => getItemAudio(context, foundryFeatures, agentName, conversationId, itemId, options),
    getItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaAgentEndpointConversationsGetItemOptionalParams,
    ) => getItem(context, foundryFeatures, agentName, conversationId, itemId, options),
    listItems: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaAgentEndpointConversationsListItemsOptionalParams,
    ) => listItems(context, foundryFeatures, agentName, conversationId, options),
    listResponseItems: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      responseId: string,
      options?: BetaAgentEndpointConversationsListResponseItemsOptionalParams,
    ) =>
      listResponseItems(context, foundryFeatures, agentName, conversationId, responseId, options),
    getResponse: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      responseId: string,
      options?: BetaAgentEndpointConversationsGetResponseOptionalParams,
    ) => getResponse(context, foundryFeatures, agentName, conversationId, responseId, options),
    listResponses: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaAgentEndpointConversationsListResponsesOptionalParams,
    ) => listResponses(context, foundryFeatures, agentName, conversationId, options),
    delete: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaAgentEndpointConversationsDeleteOptionalParams,
    ) => $delete(context, foundryFeatures, agentName, conversationId, options),
    get: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaAgentEndpointConversationsGetOptionalParams,
    ) => get(context, foundryFeatures, agentName, conversationId, options),
    list: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: BetaAgentEndpointConversationsListOptionalParams,
    ) => list(context, foundryFeatures, agentName, options),
  };
}

export function _getBetaAgentEndpointConversationsOperations(
  context: AIProjectContext,
): BetaAgentEndpointConversationsOperations {
  return {
    ..._getBetaAgentEndpointConversations(context),
  };
}
