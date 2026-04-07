// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { LocationCapabilities } from "../../models/models.js";
import {
  errorResponseDeserializer,
  locationCapabilitiesDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { CapabilitiesListByLocationOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByLocationSend(
  context: Client,
  locationName: string,
  options: CapabilitiesListByLocationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Sql/locations/{locationName}/capabilities{?api%2Dversion,include}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
      include: options?.include,
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

export async function _listByLocationDeserialize(
  result: PathUncheckedResponse,
): Promise<LocationCapabilities> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return locationCapabilitiesDeserializer(result.body);
}

/** Gets the subscription capabilities available for the specified location. */
export async function listByLocation(
  context: Client,
  locationName: string,
  options: CapabilitiesListByLocationOptionalParams = { requestOptions: {} },
): Promise<LocationCapabilities> {
  const result = await _listByLocationSend(context, locationName, options);
  return _listByLocationDeserialize(result);
}
