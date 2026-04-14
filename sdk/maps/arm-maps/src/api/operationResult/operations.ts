// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMapsManagementContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OperationResultGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getSend(
  context: Client,
  location: string,
  operationId: string,
  options: OperationResultGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Maps/locations/{location}/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Get the result of a long running azure asynchronous operation. */
export function get(
  context: Client,
  location: string,
  operationId: string,
  options: OperationResultGetOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _getDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _getSend(context, location, operationId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}
