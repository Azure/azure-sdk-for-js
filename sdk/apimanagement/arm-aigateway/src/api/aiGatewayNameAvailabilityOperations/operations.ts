// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext as Client } from "../index.js";
import type {
  AiGatewayCheckNameAvailabilityRequest,
  AiGatewayCheckNameAvailabilityResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  aiGatewayCheckNameAvailabilityRequestSerializer,
  aiGatewayCheckNameAvailabilityResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AiGatewayNameAvailabilityOperationsCheckNameAvailabilityOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkNameAvailabilitySend(
  context: Client,
  location: string,
  body: AiGatewayCheckNameAvailabilityRequest,
  options: AiGatewayNameAvailabilityOperationsCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: aiGatewayCheckNameAvailabilityRequestSerializer(body),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<AiGatewayCheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return aiGatewayCheckNameAvailabilityResponseDeserializer(result.body);
}

/** Checks whether an AI Gateway name is valid and available in a location. */
export async function checkNameAvailability(
  context: Client,
  location: string,
  body: AiGatewayCheckNameAvailabilityRequest,
  options: AiGatewayNameAvailabilityOperationsCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<AiGatewayCheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(context, location, body, options);
  return _checkNameAvailabilityDeserialize(result);
}
