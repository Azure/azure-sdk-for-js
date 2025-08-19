// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatusResult,
  operationStatusResultDeserializer,
} from "../../models/models.js";
import { OperationStatusesGetOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  location: string,
  operationId: string,
  options: OperationStatusesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Chaos/locations/{location}/operationStatuses/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusResultDeserializer(result.body);
}

/** Returns the current status of an async operation. */
export async function get(
  context: Client,
  location: string,
  operationId: string,
  options: OperationStatusesGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatusResult> {
  const result = await _getSend(context, location, operationId, options);
  return _getDeserialize(result);
}
