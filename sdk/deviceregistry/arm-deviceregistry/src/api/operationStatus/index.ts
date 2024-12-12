// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceRegistryManagementContext as Client,
  OperationStatusGetOptionalParams,
} from "../index.js";
import {
  OperationStatusResult,
  operationStatusResultDeserializer,
} from "../../models/models.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _operationStatusGetSend(
  context: Client,
  subscriptionId: string,
  location: string,
  operationId: string,
  options: OperationStatusGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/locations/{location}/operationStatuses/{operationId}",
      subscriptionId,
      location,
      operationId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _operationStatusGetDeserialize(
  result: PathUncheckedResponse,
): Promise<OperationStatusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return operationStatusResultDeserializer(result.body);
}

/** Returns the current status of an async operation. */
export async function operationStatusGet(
  context: Client,
  subscriptionId: string,
  location: string,
  operationId: string,
  options: OperationStatusGetOptionalParams = { requestOptions: {} },
): Promise<OperationStatusResult> {
  const result = await _operationStatusGetSend(
    context,
    subscriptionId,
    location,
    operationId,
    options,
  );
  return _operationStatusGetDeserialize(result);
}
