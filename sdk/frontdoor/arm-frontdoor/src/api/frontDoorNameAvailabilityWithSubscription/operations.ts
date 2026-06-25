// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  CheckNameAvailabilityInput,
  checkNameAvailabilityInputSerializer,
  CheckNameAvailabilityOutput,
  checkNameAvailabilityOutputDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { FrontDoorNameAvailabilityWithSubscriptionCheckOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
  return context
    .path(path)
    .post({
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

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
