// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftStorageSyncContext as Client } from "./index.js";
import {
  LocationOperationStatus,
  locationOperationStatusDeserializer,
  storageSyncErrorDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import { LocationOperationStatusOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _locationOperationStatusSend(
  context: Client,
  locationName: string,
  operationId: string,
  options: LocationOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.StorageSync/locations/{locationName}/operations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2022-09-01",
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

export async function _locationOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<LocationOperationStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = storageSyncErrorDeserializer(result.body);
    }

    throw error;
  }

  return locationOperationStatusDeserializer(result.body);
}

/** Get Operation status */
export async function locationOperationStatus(
  context: Client,
  locationName: string,
  operationId: string,
  options: LocationOperationStatusOptionalParams = { requestOptions: {} },
): Promise<LocationOperationStatus> {
  const result = await _locationOperationStatusSend(context, locationName, operationId, options);
  return _locationOperationStatusDeserialize(result);
}
