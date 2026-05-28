// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatusExtendedResult,
  operationStatusExtendedResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { OperationResultsGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  locationName: string,
  operationId: string,
  options: OperationResultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.DBforMySQL/locations/{locationName}/operationResults/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-06-01-preview",
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
): Promise<OperationStatusExtendedResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return operationStatusExtendedResultDeserializer(result.body);
}

/** Get the operation result for a long running operation. */
export async function get(
  context: Client,
  locationName: string,
  operationId: string,
  options: OperationResultsGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatusExtendedResult> {
  const result = await _getSend(context, locationName, operationId, options);
  return _getDeserialize(result);
}
