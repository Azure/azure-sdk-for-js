// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentsContext } from "../../api/voiceAgentsContext.js";
import { connectVoiceAgent } from "../../api/voiceAgentWebSocket/operations.js";
import { VoiceAgentWebSocketConnectVoiceAgentOptionalParams } from "../../api/voiceAgentWebSocket/options.js";

/** Interface representing a VoiceAgentWebSocket operations. */
export interface VoiceAgentWebSocketOperations {
  /**
   * Connects to a voice agent over WebSocket. The client must send an HTTP GET with `Upgrade: websocket`
   * headers. The optional `realtime` subprotocol is the only accepted subprotocol value.
   */
  connectVoiceAgent: (
    foundryFeatures: "VoiceAgents=V1Preview",
    agentName: string,
    options?: VoiceAgentWebSocketConnectVoiceAgentOptionalParams,
  ) => Promise<void>;
}
function _getVoiceAgentWebSocket(context: VoiceAgentsContext) {
  return {
    connectVoiceAgent: (
      foundryFeatures: "VoiceAgents=V1Preview",
      agentName: string,
      options?: VoiceAgentWebSocketConnectVoiceAgentOptionalParams,
    ) => connectVoiceAgent(context, foundryFeatures, agentName, options),
  };
}
export function _getVoiceAgentWebSocketOperations(
  context: VoiceAgentsContext,
): VoiceAgentWebSocketOperations {
  return {
    ..._getVoiceAgentWebSocket(context),
  };
}
