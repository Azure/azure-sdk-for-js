// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeRecommenderManagementContext as Client } from "../index.js";
import type {
  SkuMixPlacementBase,
  SkuMixPlacementRequest,
  SkuMixPlacementResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  skuMixPlacementBaseDeserializer,
  skuMixPlacementRequestSerializer,
  skuMixPlacementResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SkuMixPlacementScoresPostOptionalParams,
  SkuMixPlacementScoresGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  location: string,
  skuMixPlacementRequest: SkuMixPlacementRequest,
  options: SkuMixPlacementScoresPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/skuMixPlacementScores/recommendations/generate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-09-05-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: skuMixPlacementRequestSerializer(skuMixPlacementRequest),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuMixPlacementResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return skuMixPlacementResponseDeserializer(result.body);
}

/** Generates placement scores for VM SKU mix placement. */
export async function post(
  context: Client,
  location: string,
  skuMixPlacementRequest: SkuMixPlacementRequest,
  options: SkuMixPlacementScoresPostOptionalParams = { requestOptions: {} },
): Promise<SkuMixPlacementResponse> {
  const result = await _postSend(context, location, skuMixPlacementRequest, options);
  return _postDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  options: SkuMixPlacementScoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/skuMixPlacementScores/recommendations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-09-05-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SkuMixPlacementBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return skuMixPlacementBaseDeserializer(result.body);
}

/** Gets SkuMixPlacement scoring metadata. */
export async function get(
  context: Client,
  location: string,
  options: SkuMixPlacementScoresGetOptionalParams = { requestOptions: {} },
): Promise<SkuMixPlacementBase> {
  const result = await _getSend(context, location, options);
  return _getDeserialize(result);
}
