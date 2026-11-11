// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type { TokenCredential } from "@azure/core-auth";
import type { BetaVoiceAgentsCampaignsOperations } from "./campaigns/index.js";
import type {
  VoiceAgentRealtimeClient,
  VoiceAgentRealtimeClientOptions,
} from "../../../realtime/voiceAgentRealtimeClient.js";
import { createVoiceAgentRealtimeClient } from "../../../realtime/voiceAgentRealtimeClient.js";
import type { ResolvedTracingConfig } from "../../../tracing/configuration.js";
import type { BetaVoiceAgentsLiveConversationsOperations } from "./liveConversations/index.js";
import { _getBetaVoiceAgentsLiveConversationsOperations } from "./liveConversations/index.js";
import { VoiceAgentLiveClient } from "../../../live/voiceAgentLiveClient.js";
import type { VoiceAgentLiveClientOptions } from "../../../live/voiceAgentLiveClient.js";
import { _getBetaVoiceAgentsCampaignsOperations } from "./campaigns/index.js";

/** Preview voice agent Realtime/Live connections, GPT Live conversations, and telephony campaigns. */
export interface BetaVoiceAgentsOperations {
  campaigns: BetaVoiceAgentsCampaignsOperations;
  /** Operations for reading persisted GPT Live conversations and audio. */
  liveConversations: BetaVoiceAgentsLiveConversationsOperations;
  /** Realtime voice-agent connections. */
  realtime: VoiceAgentRealtimeClient;
  /** Native GPT Live voice-agent connections. */
  live: VoiceAgentLiveClient;
}

export function _getBetaVoiceAgentsOperations(
  context: AIProjectContext,
  credential: TokenCredential,
  endpoint: string,
  realtimeOptions?: VoiceAgentRealtimeClientOptions,
  tracingConfig?: ResolvedTracingConfig,
  liveOptions?: VoiceAgentLiveClientOptions,
): BetaVoiceAgentsOperations {
  return {
    campaigns: _getBetaVoiceAgentsCampaignsOperations(context),
    liveConversations: _getBetaVoiceAgentsLiveConversationsOperations(context, tracingConfig),
    // VoiceAgentRealtimeClient defers https-only endpoint validation to connect() (not its
    // constructor), so eagerly constructing it here doesn't reject callers who intentionally use an
    // insecure local endpoint for the REST surface and never touch realtime connections.
    realtime: createVoiceAgentRealtimeClient(endpoint, credential, realtimeOptions, tracingConfig),
    live: new VoiceAgentLiveClient(endpoint, credential, liveOptions),
  };
}
