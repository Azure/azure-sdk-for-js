// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeRecommenderManagementContext as Client } from "../index.js";
import type {
  ComputeDiagnosticBase,
  SpotPlacementScoresInput,
  SpotPlacementScoresResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  computeDiagnosticBaseDeserializer,
  spotPlacementScoresInputSerializer,
  spotPlacementScoresResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SpotPlacementScoresPostOptionalParams,
  SpotPlacementScoresGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  location: string,
  spotPlacementScoresInput: SpotPlacementScoresInput,
  options: SpotPlacementScoresPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/placementScores/spot/generate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: spotPlacementScoresInputSerializer(spotPlacementScoresInput),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<SpotPlacementScoresResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return spotPlacementScoresResponseDeserializer(result.body);
}

/** Generates placement scores for Spot VM skus. */
export async function post(
  context: Client,
  location: string,
  spotPlacementScoresInput: SpotPlacementScoresInput,
  options: SpotPlacementScoresPostOptionalParams = { requestOptions: {} },
): Promise<SpotPlacementScoresResponse> {
  const result = await _postSend(context, location, spotPlacementScoresInput, options);
  return _postDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  options: SpotPlacementScoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/placementScores/spot{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ComputeDiagnosticBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return computeDiagnosticBaseDeserializer(result.body);
}

/** Gets Spot Placement Scores metadata. */
export async function get(
  context: Client,
  location: string,
  options: SpotPlacementScoresGetOptionalParams = { requestOptions: {} },
): Promise<ComputeDiagnosticBase> {
  const result = await _getSend(context, location, options);
  return _getDeserialize(result);
}
