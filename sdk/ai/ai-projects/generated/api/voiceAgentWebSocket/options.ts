// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentWebSocketSubprotocol } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface VoiceAgentWebSocketConnectVoiceAgentOptionalParams extends OperationOptions {
  /** An optional identifier used to correlate the voice session. */
  agentSessionId?: string;
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
  /** A JSON object that maps structured-input names to their values for this session. */
  structuredInputs?: string;
}
