// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import type { BetaVoiceAgentsConversationsOperations } from "./conversations/index.js";
import { _getBetaVoiceAgentsConversationsOperations } from "./conversations/index.js";
import type { BetaVoiceAgentsTelephonyOperations } from "./telephony/index.js";
import { _getBetaVoiceAgentsTelephonyOperations } from "./telephony/index.js";

/** Operations for managing voice agent conversations and telephony. */
export interface BetaVoiceAgentsOperations {
  /** Operations for managing telephony bindings, calls, and campaigns. */
  telephony: BetaVoiceAgentsTelephonyOperations;
  /** Operations for reading persisted voice conversations and audio. */
  conversations: BetaVoiceAgentsConversationsOperations;
}

export function _getBetaVoiceAgentsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsOperations {
  return {
    telephony: _getBetaVoiceAgentsTelephonyOperations(context),
    conversations: _getBetaVoiceAgentsConversationsOperations(context),
  };
}
