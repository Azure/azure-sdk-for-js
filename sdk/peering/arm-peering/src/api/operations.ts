// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "./index.js";
import type {
  CheckServiceProviderAvailabilityInput,
  CheckServiceProviderAvailabilityResponse,
} from "../models/models.js";
import {
  checkServiceProviderAvailabilityInputSerializer,
  errorResponseDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { CheckServiceProviderAvailabilityOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkServiceProviderAvailabilitySend(
  context: Client,
  checkServiceProviderAvailabilityInput: CheckServiceProviderAvailabilityInput,
  options: CheckServiceProviderAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/checkServiceProviderAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkServiceProviderAvailabilityInputSerializer(checkServiceProviderAvailabilityInput),
  });
}

export async function _checkServiceProviderAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckServiceProviderAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return { body: result.body };
}

/** Checks if the peering service provider is present within 1000 miles of customer's location */
export async function checkServiceProviderAvailability(
  context: Client,
  checkServiceProviderAvailabilityInput: CheckServiceProviderAvailabilityInput,
  options: CheckServiceProviderAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckServiceProviderAvailabilityResponse> {
  const result = await _checkServiceProviderAvailabilitySend(
    context,
    checkServiceProviderAvailabilityInput,
    options,
  );
  return _checkServiceProviderAvailabilityDeserialize(result);
}
