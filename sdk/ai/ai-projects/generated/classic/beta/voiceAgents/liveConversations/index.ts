// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../../api/aiProjectContext.js";
import {
  downloadAudio,
  getAudio,
  downloadAudioItem,
  getAudioItem,
  getItem,
  listItems,
  $delete,
  get,
  list,
} from "../../../../api/beta/voiceAgents/liveConversations/operations.js";
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
} from "../../../../api/beta/voiceAgents/liveConversations/options.js";
import {
  VoiceAudioItem,
  VoiceRecording,
  VoiceAgentLiveConversation,
  VoiceAgentLiveConversationItemUnion,
  BetaVoiceAgentsLiveConversationsDownloadAudioResponse,
  BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse,
} from "../../../../models/models.js";
import { PagedAsyncIterableIterator } from "../../../../static-helpers/pagingHelpers.js";

/** Interface representing a BetaVoiceAgentsLiveConversations operations. */
export interface BetaVoiceAgentsLiveConversationsOperations {
  /** Streams the merged stereo WAV. BYOS returns 409; use blob_uri. Returns 404 for no audio, or 409 recording_not_ready/recording_unavailable for pending/failed finalization. */
  downloadAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsDownloadAudioOptionalParams,
  ) => Promise<BetaVoiceAgentsLiveConversationsDownloadAudioResponse>;
  /** Gets merged stereo recording metadata (user left, assistant right). BYOS uses unsigned blob_uri. Returns 404 for no audio, or 409 recording_not_ready/recording_unavailable for pending/failed finalization; pending responses may include Retry-After. */
  getAudio: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsGetAudioOptionalParams,
  ) => Promise<VoiceRecording>;
  /** Streams captured speech as WAV. BYOS returns 409; use blob_uri. Returns 404 for missing audio, unstored conversations, or delegation items. */
  downloadAudioItem: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsLiveConversationsDownloadAudioItemOptionalParams,
  ) => Promise<BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse>;
  /** Gets captured speech-audio metadata. BYOS uses unsigned blob_uri. Returns 404 for missing audio, unstored conversations, or delegation items. */
  getAudioItem: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsLiveConversationsGetAudioItemOptionalParams,
  ) => Promise<VoiceAudioItem>;
  /** Gets a stored item by ID. Returns 404 if the item or conversation is absent. */
  getItem: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsLiveConversationsGetItemOptionalParams,
  ) => Promise<VoiceAgentLiveConversationItemUnion>;
  /** Lists stored speech and delegation items in order; cursors use item IDs. Returns 404 if the conversation is absent or unstored. */
  listItems: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsListItemsOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceAgentLiveConversationItemUnion>;
  /** Deletes the stored conversation and its items/audio, without closing the Live session. */
  delete: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets a stored Live conversation; fetch items separately. Returns 404 if absent or not stored. */
  get: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsGetOptionalParams,
  ) => Promise<VoiceAgentLiveConversation>;
  /** Lists stored Live conversations for this agent, including sessions stored via an override. */
  list: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: BetaVoiceAgentsLiveConversationsListOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceAgentLiveConversation>;
}

function _getBetaVoiceAgentsLiveConversations(context: AIProjectContext) {
  return {
    downloadAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsDownloadAudioOptionalParams,
    ) => downloadAudio(context, foundryFeatures, agentName, conversationId, options),
    getAudio: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsGetAudioOptionalParams,
    ) => getAudio(context, foundryFeatures, agentName, conversationId, options),
    downloadAudioItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsLiveConversationsDownloadAudioItemOptionalParams,
    ) => downloadAudioItem(context, foundryFeatures, agentName, conversationId, itemId, options),
    getAudioItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsLiveConversationsGetAudioItemOptionalParams,
    ) => getAudioItem(context, foundryFeatures, agentName, conversationId, itemId, options),
    getItem: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsLiveConversationsGetItemOptionalParams,
    ) => getItem(context, foundryFeatures, agentName, conversationId, itemId, options),
    listItems: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsListItemsOptionalParams,
    ) => listItems(context, foundryFeatures, agentName, conversationId, options),
    delete: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsDeleteOptionalParams,
    ) => $delete(context, foundryFeatures, agentName, conversationId, options),
    get: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsGetOptionalParams,
    ) => get(context, foundryFeatures, agentName, conversationId, options),
    list: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: BetaVoiceAgentsLiveConversationsListOptionalParams,
    ) => list(context, foundryFeatures, agentName, options),
  };
}

export function _getBetaVoiceAgentsLiveConversationsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsLiveConversationsOperations {
  return {
    ..._getBetaVoiceAgentsLiveConversations(context),
  };
}
