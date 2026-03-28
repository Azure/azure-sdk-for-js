// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { Recommendation, RecommendationPatch } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  recommendationDeserializer,
  recommendationPatchSerializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { UpdateRecommendationOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _recommendationSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  recommendationId: string,
  recommendationPatch: RecommendationPatch,
  options: UpdateRecommendationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/recommendations/{recommendationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      recommendationId: recommendationId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recommendationPatchSerializer(recommendationPatch),
  });
}

export async function _recommendationDeserialize(
  result: PathUncheckedResponse,
): Promise<Recommendation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return recommendationDeserializer(result.body);
}

/** Patch a recommendation. */
export async function recommendation(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  recommendationId: string,
  recommendationPatch: RecommendationPatch,
  options: UpdateRecommendationOptionalParams = { requestOptions: {} },
): Promise<Recommendation> {
  const result = await _recommendationSend(
    context,
    resourceGroupName,
    workspaceName,
    recommendationId,
    recommendationPatch,
    options,
  );
  return _recommendationDeserialize(result);
}
