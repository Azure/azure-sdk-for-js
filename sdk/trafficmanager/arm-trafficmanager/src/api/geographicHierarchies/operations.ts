// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TrafficManagerManagementContext as Client } from "../index.js";
import type { TrafficManagerGeographicHierarchy } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  trafficManagerGeographicHierarchyDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { GeographicHierarchiesGetDefaultOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getDefaultSend(
  context: Client,
  options: GeographicHierarchiesGetDefaultOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Network/trafficManagerGeographicHierarchies/default{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2024-04-01-preview",
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

export async function _getDefaultDeserialize(
  result: PathUncheckedResponse,
): Promise<TrafficManagerGeographicHierarchy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return trafficManagerGeographicHierarchyDeserializer(result.body);
}

/** Gets the default Geographic Hierarchy used by the Geographic traffic routing method. */
export async function getDefault(
  context: Client,
  options: GeographicHierarchiesGetDefaultOptionalParams = { requestOptions: {} },
): Promise<TrafficManagerGeographicHierarchy> {
  const result = await _getDefaultSend(context, options);
  return _getDefaultDeserialize(result);
}
