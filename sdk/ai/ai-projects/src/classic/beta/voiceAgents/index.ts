// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type { TokenCredential } from "@azure/core-auth";
import type { BetaVoiceAgentsConversationsOperations } from "./conversations/index.js";
import { _getBetaVoiceAgentsConversationsOperations } from "./conversations/index.js";
import type { BetaVoiceAgentsTelephonyOperations } from "./telephony/index.js";
import { _getBetaVoiceAgentsTelephonyOperations } from "./telephony/index.js";
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

/** Voice agent Realtime/Live connections, persisted conversations, and telephony. */
export interface BetaVoiceAgentsOperations {
  /** Operations for managing telephony bindings and calls. */
  telephony: BetaVoiceAgentsTelephonyOperations;
  /** Operations for reading persisted GPT Live conversations and audio. */
  liveConversations: BetaVoiceAgentsLiveConversationsOperations;
  /** Operations for reading persisted voice conversations and audio. */
  conversations: BetaVoiceAgentsConversationsOperations;
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
    telephony: _getBetaVoiceAgentsTelephonyOperations(context, tracingConfig),
    liveConversations: _getBetaVoiceAgentsLiveConversationsOperations(context),
    conversations: _getBetaVoiceAgentsConversationsOperations(context, tracingConfig),
    // VoiceAgentRealtimeClient defers https-only endpoint validation to connect() (not its
    // constructor), so eagerly constructing it here doesn't reject callers who intentionally use an
    // insecure local endpoint for the REST surface and never touch realtime connections.
    realtime: createVoiceAgentRealtimeClient(endpoint, credential, realtimeOptions, tracingConfig),
    live: new VoiceAgentLiveClient(endpoint, credential, liveOptions),
  };
}
