// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type { TokenCredential } from "@azure/core-auth";
import type { BetaVoiceAgentsTelephonyOperations } from "./telephony/index.js";
import { _getBetaVoiceAgentsTelephonyOperations } from "./telephony/index.js";
import type { VoiceAgentRealtimeClient } from "../../../realtime/voiceAgentRealtimeClient.js";
import type { ResolvedTracingConfig } from "../../../tracing/configuration.js";
import type { BetaVoiceAgentsLiveConversationsOperations } from "./liveConversations/index.js";
import { _getBetaVoiceAgentsLiveConversationsOperations } from "./liveConversations/index.js";
import { VoiceAgentLiveClient } from "../../../live/voiceAgentLiveClient.js";
import type { VoiceAgentLiveClientOptions } from "../../../live/voiceAgentLiveClient.js";

/** Preview GPT Live connections, stored Live conversations, and campaigns, with a legacy Realtime alias. */
export interface BetaVoiceAgentsOperations {
  /** Operations for managing telephony campaigns. */
  telephony: BetaVoiceAgentsTelephonyOperations;
  /** Operations for reading persisted GPT Live conversations and audio. */
  liveConversations: BetaVoiceAgentsLiveConversationsOperations;
  /**
   * Compatibility alias for the GA Realtime client.
   * @deprecated Use `project.voiceAgents.realtime` instead.
   */
  realtime: VoiceAgentRealtimeClient;
  /** Native GPT Live voice-agent connections. */
  live: VoiceAgentLiveClient;
}

export function _getBetaVoiceAgentsOperations(
  context: AIProjectContext,
  credential: TokenCredential,
  endpoint: string,
  getRealtimeClient: () => VoiceAgentRealtimeClient,
  tracingConfig?: ResolvedTracingConfig,
  liveOptions?: VoiceAgentLiveClientOptions,
): BetaVoiceAgentsOperations {
  return {
    telephony: _getBetaVoiceAgentsTelephonyOperations(context),
    liveConversations: _getBetaVoiceAgentsLiveConversationsOperations(context, tracingConfig),
    realtime: getRealtimeClient(),
    live: new VoiceAgentLiveClient(endpoint, credential, liveOptions),
  };
}
