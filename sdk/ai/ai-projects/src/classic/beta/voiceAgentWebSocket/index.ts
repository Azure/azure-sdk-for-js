// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext } from "../../../api/aiProjectContext.js";
import { connectVoiceAgent } from "../../../api/beta/voiceAgentWebSocket/operations.js";
import type { BetaVoiceAgentWebSocketConnectVoiceAgentOptionalParams } from "../../../api/beta/voiceAgentWebSocket/options.js";

/** Interface representing a VoiceAgentWebSocket operations. */
export interface BetaVoiceAgentWebSocketOperations {
  /**
   * Connects to a voice agent over WebSocket. The client must send an HTTP GET with `Upgrade: websocket`
   * headers. The optional `realtime` subprotocol is the only accepted subprotocol value. Supply the
   * `VoiceAgents=V1Preview` opt-in through either the `Foundry-Features` header or the `foundry_features`
   * query parameter.
   *
   * If the target agent is disabled, the HTTP WebSocket handshake fails before the `101 Switching Protocols`
   * upgrade. The service returns `409 Conflict` using the shared Foundry `ApiErrorResponse` shape with
   * `error.code = agent_disabled`. This failure is terminal until the caller enables the agent.
   */
  connectVoiceAgent: (
    agentName: string,
    options?: BetaVoiceAgentWebSocketConnectVoiceAgentOptionalParams,
  ) => Promise<void>;
}

function _getVoiceAgentWebSocket(context: AIProjectContext) {
  return {
    connectVoiceAgent: (
      agentName: string,
      options?: BetaVoiceAgentWebSocketConnectVoiceAgentOptionalParams,
    ) => connectVoiceAgent(context, agentName, options),
  };
}

export function _getBetaVoiceAgentWebSocketOperations(
  context: AIProjectContext,
): BetaVoiceAgentWebSocketOperations {
  return {
    ..._getVoiceAgentWebSocket(context),
  };
}
