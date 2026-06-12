// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NewRelicObservabilityContext as Client } from "../index.js";
import type {
  ActivateSaaSParameterRequest,
  SaaSResourceDetailsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  activateSaaSParameterRequestSerializer,
  saaSResourceDetailsResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SaaSActivateResourceOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _activateResourceSend(
  context: Client,
  request: ActivateSaaSParameterRequest,
  options: SaaSActivateResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/NewRelic.Observability/activateSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: activateSaaSParameterRequestSerializer(request),
  });
}

export async function _activateResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<SaaSResourceDetailsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return saaSResourceDetailsResponseDeserializer(result.body);
}

/** Resolve the token to get the SaaS resource ID and activate the SaaS resource */
export async function activateResource(
  context: Client,
  request: ActivateSaaSParameterRequest,
  options: SaaSActivateResourceOptionalParams = { requestOptions: {} },
): Promise<SaaSResourceDetailsResponse> {
  const result = await _activateResourceSend(context, request, options);
  return _activateResourceDeserialize(result);
}
