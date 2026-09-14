// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  BetaVoiceAgentsConversationsOperations,
  _getBetaVoiceAgentsConversationsOperations,
} from "./conversations/index.js";
import {
  BetaVoiceAgentsRealtimeOperations,
  _getBetaVoiceAgentsRealtimeOperations,
} from "./realtime/index.js";
import {
  BetaVoiceAgentsTelephonyOperations,
  _getBetaVoiceAgentsTelephonyOperations,
} from "./telephony/index.js";

/** Interface representing a BetaVoiceAgents operations. */
export interface BetaVoiceAgentsOperations {
  telephony: BetaVoiceAgentsTelephonyOperations;
  conversations: BetaVoiceAgentsConversationsOperations;
  realtime: BetaVoiceAgentsRealtimeOperations;
}

export function _getBetaVoiceAgentsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsOperations {
  return {
    telephony: _getBetaVoiceAgentsTelephonyOperations(context),
    conversations: _getBetaVoiceAgentsConversationsOperations(context),
    realtime: _getBetaVoiceAgentsRealtimeOperations(context),
  };
}
