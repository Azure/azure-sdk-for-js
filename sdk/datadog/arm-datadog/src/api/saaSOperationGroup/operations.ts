// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftDatadogContext as Client } from "../index.js";
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
import type { SaaSOperationGroupActivateResourceOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _activateResourceSend(
  context: Client,
  body: ActivateSaaSParameterRequest,
  options: SaaSOperationGroupActivateResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Datadog/activateSaaS{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-26-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: activateSaaSParameterRequestSerializer(body),
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
  body: ActivateSaaSParameterRequest,
  options: SaaSOperationGroupActivateResourceOptionalParams = { requestOptions: {} },
): Promise<SaaSResourceDetailsResponse> {
  const result = await _activateResourceSend(context, body, options);
  return _activateResourceDeserialize(result);
}
