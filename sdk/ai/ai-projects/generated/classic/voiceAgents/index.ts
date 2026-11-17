// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import {
  VoiceAgentsConversationsOperations,
  _getVoiceAgentsConversationsOperations,
} from "./conversations/index.js";
import {
  VoiceAgentsTelephonyOperations,
  _getVoiceAgentsTelephonyOperations,
} from "./telephony/index.js";

/** Interface representing a VoiceAgents operations. */
export interface VoiceAgentsOperations {
  telephony: VoiceAgentsTelephonyOperations;
  conversations: VoiceAgentsConversationsOperations;
}

export function _getVoiceAgentsOperations(context: AIProjectContext): VoiceAgentsOperations {
  return {
    telephony: _getVoiceAgentsTelephonyOperations(context),
    conversations: _getVoiceAgentsConversationsOperations(context),
  };
}
