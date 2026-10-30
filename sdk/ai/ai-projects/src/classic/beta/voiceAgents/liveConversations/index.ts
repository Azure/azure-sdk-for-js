// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../../api/aiProjectContext.js";
import type {
  VoiceAudioItem,
  VoiceRecording,
  VoiceAgentLiveConversation,
  VoiceAgentLiveConversationItemUnion,
  BetaVoiceAgentsLiveConversationsDownloadAudioResponse,
  BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse,
} from "../../../../models/models.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
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
} from "../../../../api/beta/voiceAgents/liveConversations/options.js";
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

/** Operations for BetaVoiceAgentsLiveConversationsOperations. */
export interface BetaVoiceAgentsLiveConversationsOperations {
  /** Streams the merged stereo WAV. BYOS returns 409; use blob_uri. Returns 404 for no audio, or 409 recording_not_ready/recording_unavailable for pending/failed finalization. */
  downloadAudio: (
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsDownloadAudioOptionalParams,
  ) => Promise<BetaVoiceAgentsLiveConversationsDownloadAudioResponse>;
  /** Gets merged stereo recording metadata (user left, assistant right). BYOS uses unsigned blob_uri. Returns 404 for no audio, or 409 recording_not_ready/recording_unavailable for pending/failed finalization; pending responses may include Retry-After. */
  getAudio: (
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsGetAudioOptionalParams,
  ) => Promise<VoiceRecording>;
  /** Streams captured speech as WAV. BYOS returns 409; use blob_uri. Returns 404 for missing audio, unstored conversations, or delegation items. */
  downloadAudioItem: (
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsLiveConversationsDownloadAudioItemOptionalParams,
  ) => Promise<BetaVoiceAgentsLiveConversationsDownloadAudioItemResponse>;
  /** Gets captured speech-audio metadata. BYOS uses unsigned blob_uri. Returns 404 for missing audio, unstored conversations, or delegation items. */
  getAudioItem: (
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsLiveConversationsGetAudioItemOptionalParams,
  ) => Promise<VoiceAudioItem>;
  /** Gets a stored item by ID. Returns 404 if the item or conversation is absent. */
  getItem: (
    agentName: string,
    conversationId: string,
    itemId: string,
    options?: BetaVoiceAgentsLiveConversationsGetItemOptionalParams,
  ) => Promise<VoiceAgentLiveConversationItemUnion>;
  /** Lists stored speech and delegation items in order; cursors use item IDs. Returns 404 if the conversation is absent or unstored. */
  listItems: (
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsListItemsOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceAgentLiveConversationItemUnion>;
  /** Deletes the stored conversation and its items/audio, without closing the Live session. */
  delete: (
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets a stored Live conversation; fetch items separately. Returns 404 if absent or not stored. */
  get: (
    agentName: string,
    conversationId: string,
    options?: BetaVoiceAgentsLiveConversationsGetOptionalParams,
  ) => Promise<VoiceAgentLiveConversation>;
  /** Lists stored Live conversations for this agent, including sessions stored via an override. */
  list: (
    agentName: string,
    options?: BetaVoiceAgentsLiveConversationsListOptionalParams,
  ) => PagedAsyncIterableIterator<VoiceAgentLiveConversation>;
}

export function _getBetaVoiceAgentsLiveConversationsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsLiveConversationsOperations {
  return {
    downloadAudio: (
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsDownloadAudioOptionalParams,
    ) => downloadAudio(context, agentName, conversationId, options),
    getAudio: (
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsGetAudioOptionalParams,
    ) => getAudio(context, agentName, conversationId, options),
    downloadAudioItem: (
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsLiveConversationsDownloadAudioItemOptionalParams,
    ) => downloadAudioItem(context, agentName, conversationId, itemId, options),
    getAudioItem: (
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsLiveConversationsGetAudioItemOptionalParams,
    ) => getAudioItem(context, agentName, conversationId, itemId, options),
    getItem: (
      agentName: string,
      conversationId: string,
      itemId: string,
      options?: BetaVoiceAgentsLiveConversationsGetItemOptionalParams,
    ) => getItem(context, agentName, conversationId, itemId, options),
    listItems: (
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsListItemsOptionalParams,
    ) => listItems(context, agentName, conversationId, options),
    delete: (
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsDeleteOptionalParams,
    ) => $delete(context, agentName, conversationId, options),
    get: (
      agentName: string,
      conversationId: string,
      options?: BetaVoiceAgentsLiveConversationsGetOptionalParams,
    ) => get(context, agentName, conversationId, options),
    list: (agentName: string, options?: BetaVoiceAgentsLiveConversationsListOptionalParams) =>
      list(context, agentName, options),
  };
}
