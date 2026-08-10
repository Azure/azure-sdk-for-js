// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VoiceAgentsContext as Client } from "../index.js";
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
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentWebSocketConnectVoiceAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents/{agent_name}/endpoint/protocols/voice{?agent_session_id,x%2Dagent%2Dversion%2Doverride,api%2Dversion}",
    {
      agent_name: agentName,
      agent_session_id: options?.agentSessionId,
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
        "foundry-features": foundryFeatures,
        ...(options?.websocketSubprotocol !== undefined
          ? { "sec-websocket-protocol": options?.websocketSubprotocol }
          : {}),
        ...(options?.structuredInputs !== undefined
          ? { "x-ms-voice-structured-inputs": options?.structuredInputs }
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
 * headers. The optional `realtime` subprotocol is the only accepted subprotocol value.
 */
export async function connectVoiceAgent(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  agentName: string,
  options: VoiceAgentWebSocketConnectVoiceAgentOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _connectVoiceAgentSend(context, foundryFeatures, agentName, options);
  return _connectVoiceAgentDeserialize(result);
}
