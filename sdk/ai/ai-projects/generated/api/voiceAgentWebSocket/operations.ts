// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../index.js";
import { apiErrorResponseDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { VoiceAgentWebSocketConnectVoiceAgentOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _connectVoiceAgentSend(
  context: Client,
  agentName: string,
  options: VoiceAgentWebSocketConnectVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice{?foundry_features,transport,store,structured_input,x%2Dagent%2Dversion%2Doverride,api%2Dversion}",
    {
      agent_name: agentName,
      foundry_features: options?.foundryFeaturesQuery,
      transport: options?.transport,
      store: options?.store,
      structured_input: options?.structuredInput,
      "x%2Dagent%2Dversion%2Doverride": options?.agentVersionOverride,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        ...(options?.foundryFeatures !== undefined
          ? { "foundry-features": options?.foundryFeatures }
          : {}),
        ...(options?.websocketSubprotocol !== undefined
          ? { "sec-websocket-protocol": options?.websocketSubprotocol }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _connectVoiceAgentDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["101"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

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
export async function connectVoiceAgent(
  context: Client,
  agentName: string,
  options: VoiceAgentWebSocketConnectVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _connectVoiceAgentSend(context, agentName, options);
  return _connectVoiceAgentDeserialize(result);
}
