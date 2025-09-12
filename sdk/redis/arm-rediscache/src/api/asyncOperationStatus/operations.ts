// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext as Client } from "../index.js";
import type { OperationStatus } from "../../models/models.js";
import { errorResponseDeserializer, operationStatusDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { AsyncOperationStatusGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  operationId: string,
  options: AsyncOperationStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Cache/locations/{location}/asyncOperations/{operationId}{?api%2Dversion}",
    {
      location: location,
      operationId: operationId,
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusDeserializer(result.body);
}

/** For checking the ongoing status of an operation */
export async function get(
  context: Client,
  location: string,
  operationId: string,
  options: AsyncOperationStatusGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatus> {
  const result = await _getSend(context, location, operationId, options);
  return _getDeserialize(result);
}
