// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  Recommendation,
  recommendationDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { GetSingleRecommendationOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _singleRecommendationSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  recommendationId: string,
  options: GetSingleRecommendationOptionalParams = { requestOptions: {} },
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
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _singleRecommendationDeserialize(
  result: PathUncheckedResponse,
): Promise<Recommendation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return recommendationDeserializer(result.body);
}

/** Gets a recommendation by its id. */
export async function singleRecommendation(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  recommendationId: string,
  options: GetSingleRecommendationOptionalParams = { requestOptions: {} },
): Promise<Recommendation> {
  const result = await _singleRecommendationSend(
    context,
    resourceGroupName,
    workspaceName,
    recommendationId,
    options,
  );
  return _singleRecommendationDeserialize(result);
}
