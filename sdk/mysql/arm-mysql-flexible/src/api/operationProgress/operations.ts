// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import type { OperationProgressResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  operationProgressResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OperationProgressGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  locationName: string,
  operationId: string,
  options: OperationProgressGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/operationProgress/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      operationId: operationId,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationProgressResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationProgressResultDeserializer(result.body);
}

/** Get the operation result for a long running operation. */
export async function get(
  context: Client,
  locationName: string,
  operationId: string,
  options: OperationProgressGetOptionalParams = { requestOptions: {} },
): Promise<OperationProgressResult> {
  const result = await _getSend(context, locationName, operationId, options);
  return _getDeserialize(result);
}
