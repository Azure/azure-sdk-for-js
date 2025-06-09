// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSiteRecoveryManagementServiceAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperationStatus,
  operationStatusDeserializer,
} from "../../models/models.js";
import { OperationResultsGetOptionalParams } from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  operationId: string,
  options: OperationResultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataReplication/operationResults/{operationId}/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<OperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operationStatusDeserializer(result.body);
}

/** Gets the operations. */
export async function get(
  context: Client,
  resourceGroupName: string,
  operationId: string,
  options: OperationResultsGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatus> {
  const result = await _getSend(context, resourceGroupName, operationId, options);
  return _getDeserialize(result);
}
