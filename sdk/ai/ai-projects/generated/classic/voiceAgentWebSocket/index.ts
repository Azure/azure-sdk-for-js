// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext } from "../../api/aiProjectContext.js";
import { connectVoiceAgent } from "../../api/voiceAgentWebSocket/operations.js";
import { VoiceAgentWebSocketConnectVoiceAgentOptionalParams } from "../../api/voiceAgentWebSocket/options.js";

/** Interface representing a VoiceAgentWebSocket operations. */
export interface VoiceAgentWebSocketOperations {
  /**
   * Connects to a voice agent over WebSocket. The client must send an HTTP GET with `Upgrade: websocket`
   * headers. The optional `realtime` subprotocol is the only accepted subprotocol value. Supply the
   * `VoiceAgents=V1Preview` opt-in through either the `Foundry-Features` header or the `foundry_features`
   * query parameter.
   *
   * Handshake failures are evaluated in the following order, independent of the requested `transport`:
   *
   * 1. Agent enablement (any transport): if the target agent is disabled, the handshake fails before the
   * `101 Switching Protocols` upgrade with `409 Conflict`, using the shared Foundry `ApiErrorResponse` shape
   * with `error.code = agent_disabled`. This failure is terminal until the caller enables the agent, and it
   * takes precedence over the WebRTC-specific checks below.
   * 2. WebRTC availability (only when `transport=webrtc`, and only once the agent itself is enabled): the agent
   * must have the WebRTC transport capability configured. If the agent is enabled but WebRTC is not available
   * for it, the handshake fails with `404 Not Found`. This is distinct from the `409 agent_disabled` case
   * above, which concerns the agent itself rather than its WebRTC capability.
   * 3. WebRTC compatibility (only when `transport=webrtc`): WebRTC does not support bring-your-own-model (BYOM)
   * or hosted-agent voice agents; those requests fail with `400 Bad Request`.
   */
  connectVoiceAgent: (
    agentName: string,
    options?: VoiceAgentWebSocketConnectVoiceAgentOptionalParams,
  ) => Promise<void>;
}

function _getVoiceAgentWebSocket(context: AIProjectContext) {
  return {
    connectVoiceAgent: (
      agentName: string,
      options?: VoiceAgentWebSocketConnectVoiceAgentOptionalParams,
    ) => connectVoiceAgent(context, agentName, options),
  };
}

export function _getVoiceAgentWebSocketOperations(
  context: AIProjectContext,
): VoiceAgentWebSocketOperations {
  return {
    ..._getVoiceAgentWebSocket(context),
  };
}
