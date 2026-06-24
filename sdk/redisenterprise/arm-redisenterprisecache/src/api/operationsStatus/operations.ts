// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatus,
  operationStatusDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { OperationsStatusGetOptionalParams } from "./options.js";
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
  options: OperationsStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Cache/locations/{location}/operationsStatus/{operationId}{?api%2Dversion}",
    {
      location: location,
      subscriptionId: context.subscriptionId,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

/** Gets the status of operation. */
export async function get(
  context: Client,
  location: string,
  operationId: string,
  options: OperationsStatusGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatus> {
  const result = await _getSend(context, location, operationId, options);
  return _getDeserialize(result);
}
