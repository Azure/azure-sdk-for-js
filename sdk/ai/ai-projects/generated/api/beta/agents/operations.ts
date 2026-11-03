// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectContext as Client } from "../../index.js";
import {
  Agent,
  agentDeserializer,
  apiErrorResponseDeserializer,
  GenerateAgentRequest,
  generateAgentRequestSerializer,
} from "../../../models/models.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import { BetaAgentsCreateFromPromptOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createFromPromptSend(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  body: GenerateAgentRequest,
  options: BetaAgentsCreateFromPromptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/agents:generate{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        "foundry-features": foundryFeatures,
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: generateAgentRequestSerializer(body),
    });
}

export async function _createFromPromptDeserialize(result: PathUncheckedResponse): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = apiErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return agentDeserializer(result.body);
}

/**
 * Generates and creates an agent from kind-specific high-level inputs.
 * The generated definition remains fully editable through the standard agent versioning operations.
 */
export async function createFromPrompt(
  context: Client,
  foundryFeatures: "VoiceAgents=V1Preview",
  body: GenerateAgentRequest,
  options: BetaAgentsCreateFromPromptOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _createFromPromptSend(context, foundryFeatures, body, options);
  return _createFromPromptDeserialize(result);
}
