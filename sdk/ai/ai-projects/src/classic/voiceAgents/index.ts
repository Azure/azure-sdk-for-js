// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import type { TokenCredential } from "@azure/core-auth";
import type { VoiceAgentsConversationsOperations } from "./conversations/index.js";
import { _getVoiceAgentsConversationsOperations } from "./conversations/index.js";
import type { VoiceAgentsTelephonyOperations } from "./telephony/index.js";
import { _getVoiceAgentsTelephonyOperations } from "./telephony/index.js";
import type { ResolvedTracingConfig } from "../../tracing/configuration.js";
import type {
  VoiceAgentRealtimeClient,
  VoiceAgentRealtimeClientOptions,
} from "../../realtime/voiceAgentRealtimeClient.js";
import { createVoiceAgentRealtimeClient } from "../../realtime/voiceAgentRealtimeClient.js";

/** Realtime voice-agent connections, telephony calls, and stored Realtime conversations. */
export interface VoiceAgentsOperations {
  /** Realtime and cascaded voice-agent connections, with explicit opt-in for preview features. */
  realtime: VoiceAgentRealtimeClient;
  /** Operations for managing voice-agent telephony bindings, calls, and call jobs. */
  telephony: VoiceAgentsTelephonyOperations;
  /** Operations for reading and deleting stored Realtime conversations and their audio. */
  conversations: VoiceAgentsConversationsOperations;
}

export function _getVoiceAgentsOperations(
  context: AIProjectContext,
  credential: TokenCredential,
  endpoint: string,
  realtimeOptions?: VoiceAgentRealtimeClientOptions,
  tracingConfig?: ResolvedTracingConfig,
): VoiceAgentsOperations {
  return {
    // Keep endpoint validation deferred to connect() so REST-only clients can use local endpoints.
    realtime: createVoiceAgentRealtimeClient(endpoint, credential, realtimeOptions, tracingConfig),
    telephony: _getVoiceAgentsTelephonyOperations(context, tracingConfig),
    conversations: _getVoiceAgentsConversationsOperations(context, tracingConfig),
  };
}
