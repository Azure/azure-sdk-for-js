// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VoiceAgentTransport, VoiceAgentWebSocketSubprotocol } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VoiceAgentWebSocketConnectVoiceAgentOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "VoiceAgents=V1Preview";
  /**
   * A query alternative to the `Foundry-Features` header for clients that cannot set headers during a
   * WebSocket handshake. Set this to `VoiceAgents=V1Preview`. Either this query parameter or the header is
   * required.
   */
  foundryFeaturesQuery?: "VoiceAgents=V1Preview";
  /**
   * Selects the connection transport. Omit or send `websocket` for the default, where signaling and audio are
   * exchanged as JSON events over this WebSocket. Send `webrtc` to negotiate a WebRTC connection: the WebSocket
   * then carries only SDP signaling (`rtc.call.sdp.create` / `rtc.call.sdp.created`) while media and the data
   * channel are peer-to-peer.
   */
  transport?: VoiceAgentTransport;
  /**
   * Whether to persist the conversation created by this WebSocket session. If omitted, the service honors the
   * persisted voice agent definition's configured `store` value. If supplied, this value overrides the
   * definition's `store` setting for this session only.
   */
  store?: boolean;
  /**
   * Per-session values for the voice agent's declared `structured_inputs`, serialized as a JSON object and
   * URL-encoded as this query parameter. Supplied values override definition defaults when rendering the
   * agent's instructions and session-start greeting for this session only. The decoded value must be a JSON
   * object no larger than 32 KiB with a maximum nesting depth of 16.
   */
  structuredInput?: string;
  /** Selects a specific version of the voice agent for this session. */
  agentVersionOverride?: string;
  /** The requested WebSocket subprotocol. Omit this header or request exactly `realtime`. */
  websocketSubprotocol?: VoiceAgentWebSocketSubprotocol;
}
