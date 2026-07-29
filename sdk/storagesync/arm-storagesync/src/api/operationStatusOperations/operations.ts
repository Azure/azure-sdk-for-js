// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext as Client } from "../index.js";
import type { OperationStatus } from "../../models/models.js";
import { storageSyncErrorDeserializer, operationStatusDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { OperationStatusOperationsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getSend(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  workflowId: string,
  operationId: string,
  options: OperationStatusOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageSync/locations/{locationName}/workflows/{workflowId}/operations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      locationName: locationName,
      workflowId: workflowId,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return operationStatusDeserializer(result.body);
}

/** Get Operation status */
export async function get(
  context: Client,
  resourceGroupName: string,
  locationName: string,
  workflowId: string,
  operationId: string,
  options: OperationStatusOperationsGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatus> {
  const result = await _getSend(
    context,
    resourceGroupName,
    locationName,
    workflowId,
    operationId,
    options,
  );
  return _getDeserialize(result);
}
