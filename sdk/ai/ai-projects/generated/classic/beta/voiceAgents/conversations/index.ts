// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../../api/aiProjectContext.js";
import {
  downloadAudio,
  getAudio,
  downloadGeneratedAudioItem,
  getGeneratedAudioItem,
  downloadAudioItem,
  getAudioItem,
  getItem,
  listItems,
  listResponseItems,
  getResponse,
  listResponses,
  $delete,
  get,
  list,
} from "../../../../api/beta/voiceAgents/conversations/operations.js";
import {
  BetaVoiceAgentsConversationsDownloadAudioOptionalParams,
  BetaVoiceAgentsConversationsGetAudioOptionalParams,
  BetaVoiceAgentsConversationsDownloadGeneratedAudioItemOptionalParams,
  BetaVoiceAgentsConversationsGetGeneratedAudioItemOptionalParams,
  BetaVoiceAgentsConversationsDownloadAudioItemOptionalParams,
  BetaVoiceAgentsConversationsGetAudioItemOptionalParams,
  BetaVoiceAgentsConversationsGetItemOptionalParams,
  BetaVoiceAgentsConversationsListItemsOptionalParams,
  BetaVoiceAgentsConversationsListResponseItemsOptionalParams,
  BetaVoiceAgentsConversationsGetResponseOptionalParams,
  BetaVoiceAgentsConversationsListResponsesOptionalParams,
  BetaVoiceAgentsConversationsDeleteOptionalParams,
  BetaVoiceAgentsConversationsGetOptionalParams,
  BetaVoiceAgentsConversationsListOptionalParams,
} from "../../../../api/beta/voiceAgents/conversations/options.js";
import {
  VoiceConversation,
  VoiceResponse,
  VoiceAudioItemResponse,
  VoiceGeneratedAudioItemResponse,
  VoiceRecordingResponse,
  BetaVoiceAgentsConversationsDownloadAudioResponse,
  BetaVoiceAgentsConversationsDownloadGeneratedAudioItemResponse,
  BetaVoiceAgentsConversationsDownloadAudioItemResponse,
} from "../../../../models/models.js";
import { RealtimeConversationItemUnion } from "../../../../models/openAI/models.js";
import { PagedAsyncIterableIterator } from "../../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaVoiceAgentsConversations operations. */
export interface BetaVoiceAgentsConversationsOperations {
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
    options?: BetaVoiceAgentsConversationsDownloadAudioOptionalParams,
  ) => Promise<BetaVoiceAgentsConversationsDownloadAudioResponse>;
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
    options?: BetaVoiceAgentsConversationsGetAudioOptionalParams,
  ) => Promise<VoiceRecordingResponse>;
  /**
   * Streams a conversation item's generated audio as a WAV (`audio/wav`) byte stream through the service. This
   * subordinate artifact exists only when playback was interrupted and the service rendered more audio than the
   * listener heard, including when the response ends as cancelled. This route serves Foundry-managed storage only.
   * For bring-your-own-storage (BYOS) recordings the bytes are not proxied, so this route returns `409 Conflict`.
   * Returns `404` when the conversation or item was not persisted, or when no generated audio exists beyond the
   * heard segment.
   */
  downloadGeneratedAudioItem: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsConversationsDownloadGeneratedAudioItemOptionalParams,
  ) => Promise<BetaVoiceAgentsConversationsDownloadGeneratedAudioItemResponse>;
  /**
   * Returns metadata for a conversation item's generated audio. This subordinate artifact is separate from the
   * canonical heard-audio segment and exists only when playback was interrupted and the service rendered more audio
   * than the listener heard, including when the response ends as cancelled. Returns `404` when the conversation or
   * item was not persisted, or when no generated audio exists beyond the heard segment.
   */
  getGeneratedAudioItem: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsConversationsGetGeneratedAudioItemOptionalParams,
  ) => Promise<VoiceGeneratedAudioItemResponse>;
  /**
   * Streams a single conversation item's audio as a WAV (`audio/wav`) byte stream through the service (no SAS
   * URL). This route serves Foundry-managed storage only. For bring-your-own-storage (BYOS) recordings the
   * bytes are not proxied — the caller must download directly from customer storage using the `blob_uri`
   * returned by the item's `/audio` metadata route — so this route returns `409 Conflict` for BYOS recordings.
   * Returns `404` when the conversation, item, or its audio was not persisted (`store = false`).
   */
  downloadAudioItem: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsConversationsDownloadAudioItemOptionalParams,
  ) => Promise<BetaVoiceAgentsConversationsDownloadAudioItemResponse>;
  /**
   * Returns metadata for a single conversation item's audio segment, including the common playback facts
   * (role, format/codec, sample rate, channels, offset, duration) for both Foundry-managed and
   * bring-your-own-storage (BYOS) recordings; for BYOS the response additionally includes `blob_uri`, the URI
   * of the recording in the customer's own storage (no SAS) that the customer downloads with their own credentials.
   * Requires the conversation to have persisted audio (`store = true`); returns `404` when the conversation,
   * item, or its audio was not persisted.
   */
  getAudioItem: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsConversationsGetAudioItemOptionalParams,
  ) => Promise<VoiceAudioItemResponse>;
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
    options?: BetaVoiceAgentsConversationsGetItemOptionalParams,
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
    options?: BetaVoiceAgentsConversationsListItemsOptionalParams,
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
    options?: BetaVoiceAgentsConversationsListResponseItemsOptionalParams,
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
    options?: BetaVoiceAgentsConversationsGetResponseOptionalParams,
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
    options?: BetaVoiceAgentsConversationsListResponsesOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceResponse>;
  /**
   * Deletes a conversation and all of its stored data — responses, items, and any audio (cascade). This is
   * the customer's explicit data-deletion control for voice conversations.
   */
  delete: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsConversationsDeleteOptionalParams,
  ) => Promise<void>;
  /**
   * Retrieves a single conversation recorded for the specified voice agent endpoint by its id.
   * Returns `404` when the conversation was not persisted (`store = false`) or does not exist.
   */
  get: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsConversationsGetOptionalParams,
  ) => Promise<VoiceConversation>;
  /**
   * Returns the conversations persisted for the specified voice agent endpoint.
   * Conversations are present when the session's effective `store` setting is `true`, whether inherited from the
   * agent definition or enabled by the WebSocket session override.
   */
  list: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: BetaVoiceAgentsConversationsListOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceConversation>;
}

function _getBetaVoiceAgentsConversations(context: AIProjectContext) {
  return {
    downloadAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsConversationsDownloadAudioOptionalParams,
    ) => downloadAudio(context, foundryFeatures, agentName, conversationId, options),
    getAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsConversationsGetAudioOptionalParams,
    ) => getAudio(context, foundryFeatures, agentName, conversationId, options),
    downloadGeneratedAudioItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsConversationsDownloadGeneratedAudioItemOptionalParams,
    ) =>
      downloadGeneratedAudioItem(
        context,
        foundryFeatures,
        agentName,
        conversationId,
        itemId,
        options,
      ),
    getGeneratedAudioItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsConversationsGetGeneratedAudioItemOptionalParams,
    ) =>
      getGeneratedAudioItem(context, foundryFeatures, agentName, conversationId, itemId, options),
    downloadAudioItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsConversationsDownloadAudioItemOptionalParams,
    ) => downloadAudioItem(context, foundryFeatures, agentName, conversationId, itemId, options),
    getAudioItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsConversationsGetAudioItemOptionalParams,
    ) => getAudioItem(context, foundryFeatures, agentName, conversationId, itemId, options),
    getItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsConversationsGetItemOptionalParams,
    ) => getItem(context, foundryFeatures, agentName, conversationId, itemId, options),
    listItems: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsConversationsListItemsOptionalParams,
    ) => listItems(context, foundryFeatures, agentName, conversationId, options),
    listResponseItems: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      responseId: string,
      options?: BetaVoiceAgentsConversationsListResponseItemsOptionalParams,
    ) =>
      listResponseItems(context, foundryFeatures, agentName, conversationId, responseId, options),
    getResponse: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      responseId: string,
      options?: BetaVoiceAgentsConversationsGetResponseOptionalParams,
    ) => getResponse(context, foundryFeatures, agentName, conversationId, responseId, options),
    listResponses: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsConversationsListResponsesOptionalParams,
    ) => listResponses(context, foundryFeatures, agentName, conversationId, options),
    delete: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsConversationsDeleteOptionalParams,
    ) => $delete(context, foundryFeatures, agentName, conversationId, options),
    get: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsConversationsGetOptionalParams,
    ) => get(context, foundryFeatures, agentName, conversationId, options),
    list: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: BetaVoiceAgentsConversationsListOptionalParams,
    ) => list(context, foundryFeatures, agentName, options),
  };
}

export function _getBetaVoiceAgentsConversationsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsConversationsOperations {
  return {
    ..._getBetaVoiceAgentsConversations(context),
  };
}
