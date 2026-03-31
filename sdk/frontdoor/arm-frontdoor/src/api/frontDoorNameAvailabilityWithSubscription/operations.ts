// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FrontDoorManagementContext as Client } from "../index.js";
import type {
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  checkNameAvailabilityInputSerializer,
  checkNameAvailabilityOutputDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { FrontDoorNameAvailabilityWithSubscriptionCheckOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkSend(
  context: Client,
  checkFrontDoorNameAvailabilityInput: CheckNameAvailabilityInput,
  options: FrontDoorNameAvailabilityWithSubscriptionCheckOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/checkFrontDoorNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityInputSerializer(checkFrontDoorNameAvailabilityInput),
  });
}

export async function _checkDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return checkNameAvailabilityOutputDeserializer(result.body);
}

/** Check the availability of a Front Door subdomain. */
export async function check(
  context: Client,
  checkFrontDoorNameAvailabilityInput: CheckNameAvailabilityInput,
  options: FrontDoorNameAvailabilityWithSubscriptionCheckOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityOutput> {
  const result = await _checkSend(context, checkFrontDoorNameAvailabilityInput, options);
  return _checkDeserialize(result);
}
