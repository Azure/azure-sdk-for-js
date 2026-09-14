// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type { TokenCredential } from "@azure/core-auth";
import type { BetaVoiceAgentsConversationsOperations } from "./conversations/index.js";
import { _getBetaVoiceAgentsConversationsOperations } from "./conversations/index.js";
import type { BetaVoiceAgentsTelephonyOperations } from "./telephony/index.js";
import { _getBetaVoiceAgentsTelephonyOperations } from "./telephony/index.js";
import {
  VoiceAgentRealtimeClient,
  type VoiceAgentRealtimeClientOptions,
} from "../../../realtime/voiceAgentRealtimeClient.js";

/** Operations for managing voice agent conversations and telephony. */
export interface BetaVoiceAgentsOperations {
  /** Operations for managing telephony bindings, calls, and campaigns. */
  telephony: BetaVoiceAgentsTelephonyOperations;
  /** Operations for reading persisted voice conversations and audio. */
  conversations: BetaVoiceAgentsConversationsOperations;
  /** Realtime voice-agent connections. */
  realtime: VoiceAgentRealtimeClient;
}

export function _getBetaVoiceAgentsOperations(
  context: AIProjectContext,
  credential: TokenCredential,
  endpoint: string,
  realtimeOptions?: VoiceAgentRealtimeClientOptions,
): BetaVoiceAgentsOperations {
  return {
    telephony: _getBetaVoiceAgentsTelephonyOperations(context),
    conversations: _getBetaVoiceAgentsConversationsOperations(context),
    // VoiceAgentRealtimeClient defers https-only endpoint validation to connect() (not its
    // constructor), so eagerly constructing it here doesn't reject callers who intentionally use an
    // insecure local endpoint for the REST surface and never touch realtime connections.
    realtime: new VoiceAgentRealtimeClient(endpoint, credential, realtimeOptions),
  };
}
