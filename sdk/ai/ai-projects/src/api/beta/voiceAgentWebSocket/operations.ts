// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import { apiErrorResponseDeserializer } from "../../../models/models.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import { BetaVoiceAgentWebSocketConnectVoiceAgentOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _connectVoiceAgentSend(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentWebSocketConnectVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice{?foundry_features,store,x%2Dagent%2Dversion%2Doverride,api%2Dversion}",
    {
      agent_name: agentName,
      foundry_features: options?.foundryFeaturesQuery,
      store: options?.store,
      "x%2Dagent%2Dversion%2Doverride": options?.agentVersionOverride,
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
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
 * If the target agent is disabled, the HTTP WebSocket handshake fails before the `101 Switching Protocols`
 * upgrade. The service returns `409 Conflict` using the shared Foundry `ApiErrorResponse` shape with
 * `error.code = agent_disabled`. This failure is terminal until the caller enables the agent.
 */
export async function connectVoiceAgent(
  context: Client,
  agentName: string,
  options: BetaVoiceAgentWebSocketConnectVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _connectVoiceAgentSend(context, agentName, options);
  return _connectVoiceAgentDeserialize(result);
}
