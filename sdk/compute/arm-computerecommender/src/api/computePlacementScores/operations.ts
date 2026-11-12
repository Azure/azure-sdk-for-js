// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeRecommenderManagementContext as Client } from "../index.js";
import type {
  ComputePlacementScoresBase,
  ComputePlacementScoresInput,
  ComputePlacementScoresResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  computePlacementScoresBaseDeserializer,
  computePlacementScoresInputSerializer,
  computePlacementScoresResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ComputePlacementScoresPostOptionalParams,
  ComputePlacementScoresGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _postSend(
  context: Client,
  location: string,
  computePlacementScoresInput: ComputePlacementScoresInput,
  options: ComputePlacementScoresPostOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/placementScores/regular/generate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-10-05-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: computePlacementScoresInputSerializer(computePlacementScoresInput),
  });
}

export async function _postDeserialize(
  result: PathUncheckedResponse,
): Promise<ComputePlacementScoresResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return computePlacementScoresResponseDeserializer(result.body);
}

/** Generates placement scores for Compute VM skus. */
export async function post(
  context: Client,
  location: string,
  computePlacementScoresInput: ComputePlacementScoresInput,
  options: ComputePlacementScoresPostOptionalParams = { requestOptions: {} },
): Promise<ComputePlacementScoresResponse> {
  const result = await _postSend(context, location, computePlacementScoresInput, options);
  return _postDeserialize(result);
}

export function _getSend(
  context: Client,
  location: string,
  options: ComputePlacementScoresGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/placementScores/regular{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-10-05-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ComputePlacementScoresBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return computePlacementScoresBaseDeserializer(result.body);
}

/** Gets Compute Placement Scores metadata. */
export async function get(
  context: Client,
  location: string,
  options: ComputePlacementScoresGetOptionalParams = { requestOptions: {} },
): Promise<ComputePlacementScoresBase> {
  const result = await _getSend(context, location, options);
  return _getDeserialize(result);
}
