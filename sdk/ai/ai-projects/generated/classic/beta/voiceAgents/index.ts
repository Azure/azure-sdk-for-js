// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../../api/aiProjectContext.js";
import {
  BetaVoiceAgentsCampaignsOperations,
  _getBetaVoiceAgentsCampaignsOperations,
} from "./campaigns/index.js";
import {
  BetaVoiceAgentsLiveConversationsOperations,
  _getBetaVoiceAgentsLiveConversationsOperations,
} from "./liveConversations/index.js";

/** Interface representing a BetaVoiceAgents operations. */
export interface BetaVoiceAgentsOperations {
  campaigns: BetaVoiceAgentsCampaignsOperations;
  liveConversations: BetaVoiceAgentsLiveConversationsOperations;
}

export function _getBetaVoiceAgentsOperations(
  context: AIProjectContext,
): BetaVoiceAgentsOperations {
  return {
    campaigns: _getBetaVoiceAgentsCampaignsOperations(context),
    liveConversations: _getBetaVoiceAgentsLiveConversationsOperations(context),
  };
}
