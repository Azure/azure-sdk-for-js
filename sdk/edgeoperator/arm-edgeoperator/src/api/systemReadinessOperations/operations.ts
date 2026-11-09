// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeOperatorContext as Client } from "../index.js";
import type { SystemReadiness } from "../../models/models.js";
import { errorResponseDeserializer, systemReadinessDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { SystemReadinessOperationsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  options: SystemReadinessOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOperator/systemReadiness/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SystemReadiness> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return systemReadinessDeserializer(result.body);
}

/** Gets the Azure Local Disconnected Operations (ALDO) system readiness status. */
export async function get(
  context: Client,
  options: SystemReadinessOperationsGetOptionalParams = { requestOptions: {} },
): Promise<SystemReadiness> {
  const result = await _getSend(context, options);
  return _getDeserialize(result);
}
