// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementContext as Client } from "../index.js";
import { errorResponseDeserializer } from "../../models/models.js";
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
  location: string,
  operationId: string,
  options: OperationResultsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ServiceFabric/locations/{location}/managedClusterOperationResults/{operationId}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Get long running operation result. */
export async function get(
  context: Client,
  location: string,
  operationId: string,
  options: OperationResultsGetOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getSend(context, location, operationId, options);
  return _getDeserialize(result);
}
