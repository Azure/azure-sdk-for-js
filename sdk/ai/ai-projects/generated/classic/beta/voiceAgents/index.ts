// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  BetaVoiceAgentsConversationsOperations,
  _getBetaVoiceAgentsConversationsOperations,
} from "./conversations/index.js";
import {
  BetaVoiceAgentsTelephonyOperations,
  _getBetaVoiceAgentsTelephonyOperations,
} from "./telephony/index.js";

/** Interface representing a BetaVoiceAgents operations. */
export interface BetaVoiceAgentsOperations {
  telephony: BetaVoiceAgentsTelephonyOperations;
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
