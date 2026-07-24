// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DevCenterContext as Client } from "../index.js";
import type {
  CheckNameAvailabilityResponse,
  CheckScopedNameAvailabilityRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  checkNameAvailabilityResponseDeserializer,
  checkScopedNameAvailabilityRequestSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { CheckScopedNameAvailabilityExecuteOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _executeSend(
  context: Client,
  nameAvailabilityRequest: CheckScopedNameAvailabilityRequest,
  options: CheckScopedNameAvailabilityExecuteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DevCenter/checkScopedNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkScopedNameAvailabilityRequestSerializer(nameAvailabilityRequest),
  });
}

export async function _executeDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Check the availability of name for resource. */
export async function execute(
  context: Client,
  nameAvailabilityRequest: CheckScopedNameAvailabilityRequest,
  options: CheckScopedNameAvailabilityExecuteOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _executeSend(context, nameAvailabilityRequest, options);
  return _executeDeserialize(result);
}
