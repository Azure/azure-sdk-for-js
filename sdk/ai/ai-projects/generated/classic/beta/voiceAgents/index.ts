// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  BetaVoiceAgentsLiveConversationsOperations,
  _getBetaVoiceAgentsLiveConversationsOperations,
} from "./liveConversations/index.js";
import {
  BetaVoiceAgentsTelephonyOperations,
  _getBetaVoiceAgentsTelephonyOperations,
} from "./telephony/index.js";

/** Interface representing a BetaVoiceAgents operations. */
export interface BetaVoiceAgentsOperations {
  telephony: BetaVoiceAgentsTelephonyOperations;
  liveConversations: BetaVoiceAgentsLiveConversationsOperations;
}

export function _getBetaVoiceAgentsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsOperations {
  return {
    telephony: _getBetaVoiceAgentsTelephonyOperations(context),
    liveConversations: _getBetaVoiceAgentsLiveConversationsOperations(context),
  };
}
