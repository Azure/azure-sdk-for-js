// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentWebSocketSubprotocol } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

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
   * Whether to persist the conversation created by this WebSocket session. If omitted, the service honors the
   * persisted voice agent definition's configured `store` value. If supplied, this value overrides the
   * definition's `store` setting for this session only.
   */
  store?: boolean;
  /** Selects a specific version of the voice agent for this session. */
  agentVersionOverride?: string;
  /** The requested WebSocket subprotocol. Omit this header or request exactly `realtime`. */
  websocketSubprotocol?: VoiceAgentWebSocketSubprotocol;
}
