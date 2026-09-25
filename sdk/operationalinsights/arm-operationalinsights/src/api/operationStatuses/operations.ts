// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationalInsightsManagementContext as Client } from "../index.js";
import type { OperationStatus } from "../../models/models.js";
import { errorResponseDeserializer, operationStatusDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OperationStatusesGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  asyncOperationId: string,
  options: OperationStatusesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.OperationalInsights/locations/{location}/operationStatuses/{asyncOperationId}{?api%2Dversion}",
    {
      location: location,
      asyncOperationId: asyncOperationId,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusDeserializer(result.body);
}
/** Get the status of a long running azure asynchronous operation. */
export async function get(
  context: Client,
  location: string,
  asyncOperationId: string,
  options: OperationStatusesGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatus> {
  const result = await _getSend(context, location, asyncOperationId, options);
  return _getDeserialize(result);
}
