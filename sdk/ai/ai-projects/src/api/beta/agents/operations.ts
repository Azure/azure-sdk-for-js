// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIProjectContext as Client } from "../../index.js";
import type { Agent, GenerateAgentRequest } from "../../../models/models.js";
import {
  agentDeserializer,
  apiErrorResponseDeserializer,
  generateAgentRequestSerializer,
} from "../../../models/models.js";
import { expandUrlTemplate } from "../../../static-helpers/urlTemplate.js";
import type { BetaAgentsCreateFromPromptOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _createFromPromptSend(
  context: Client,
  body: GenerateAgentRequest,
  options: BetaAgentsCreateFromPromptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const foundryFeatures = "VoiceAgents=V1Preview";

  const path = expandUrlTemplate(
    "/agents:generate{?api-version}",
    {
      "api-version": context.apiVersion ?? "v1",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
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
  body: GenerateAgentRequest,
  options: BetaAgentsCreateFromPromptOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _createFromPromptSend(context, body, options);
  return _createFromPromptDeserialize(result);
}
