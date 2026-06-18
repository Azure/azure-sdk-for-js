// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SubscriptionContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  SubscriptionCreationResult,
  subscriptionCreationResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { SubscriptionOperationGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SubscriptionCreationResult | undefined> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? subscriptionCreationResultDeserializer(result.body) : undefined;
}

/** Get the status of the pending Microsoft.Subscription API operations. */
export async function get(
  context: Client,
  operationId: string,
  options: SubscriptionOperationGetOptionalParams = { requestOptions: {} },
): Promise<SubscriptionCreationResult | undefined> {
  const result = await _getSend(context, operationId, options);
  return _getDeserialize(result);
}
