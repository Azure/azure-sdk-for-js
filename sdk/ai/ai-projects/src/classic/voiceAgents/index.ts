// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../api/aiProjectContext.js";
import type { VoiceAgentsConversationsOperations } from "./conversations/index.js";
import { _getVoiceAgentsConversationsOperations } from "./conversations/index.js";
import type { VoiceAgentsTelephonyOperations } from "./telephony/index.js";
import { _getVoiceAgentsTelephonyOperations } from "./telephony/index.js";
import type { ResolvedTracingConfig } from "../../tracing/configuration.js";

/** Operations for managing voice-agent telephony calls and stored Realtime conversations. */
export interface VoiceAgentsOperations {
  /** Operations for managing voice-agent telephony bindings, calls, and call jobs. */
  telephony: VoiceAgentsTelephonyOperations;
  /** Operations for reading and deleting stored Realtime conversations and their audio. */
  conversations: VoiceAgentsConversationsOperations;
}

export function _getVoiceAgentsOperations(
  context: AIProjectContext,
  tracingConfig?: ResolvedTracingConfig,
): VoiceAgentsOperations {
  return {
    telephony: _getVoiceAgentsTelephonyOperations(context, tracingConfig),
    conversations: _getVoiceAgentsConversationsOperations(context, tracingConfig),
  };
}
