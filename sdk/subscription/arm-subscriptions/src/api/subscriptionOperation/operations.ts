// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SubscriptionContext as Client } from "../index.js";
import type { SubscriptionCreationResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  subscriptionCreationResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SubscriptionOperationGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  operationId: string,
  options: SubscriptionOperationGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Subscription/subscriptionOperations/{operationId}{?api%2Dversion}",
    {
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionCreationResult> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return subscriptionCreationResultDeserializer(result.body);
}

/** Get the status of the pending Microsoft.Subscription API operations. */
export async function get(
  context: Client,
  operationId: string,
  options: SubscriptionOperationGetOptionalParams = { requestOptions: {} },
): Promise<SubscriptionCreationResult> {
  const result = await _getSend(context, operationId, options);
  return _getDeserialize(result);
}
