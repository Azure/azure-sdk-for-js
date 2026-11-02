// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AIInfraOptimizationContext as Client } from "../index.js";
import type { RecommendVmSkuRequest, RecommendVmSkuResponse } from "../../models/models.js";
import {
  errorResponseDeserializer,
  recommendVmSkuRequestSerializer,
  recommendVmSkuResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RecommendationsRecommendVmSkuOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _recommendVmSkuSend(
  context: Client,
  location: string,
  body: RecommendVmSkuRequest,
  options: RecommendationsRecommendVmSkuOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AIInfraOptimization/locations/{location}/recommendVmSku{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recommendVmSkuRequestSerializer(body),
  });
}

export async function _recommendVmSkuDeserialize(
  result: PathUncheckedResponse,
): Promise<RecommendVmSkuResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return recommendVmSkuResponseDeserializer(result.body);
}

/** Recommends Azure virtual machine sizes for an AI workload in the specified subscription and azure location. */
export async function recommendVmSku(
  context: Client,
  location: string,
  body: RecommendVmSkuRequest,
  options: RecommendationsRecommendVmSkuOptionalParams = { requestOptions: {} },
): Promise<RecommendVmSkuResponse> {
  const result = await _recommendVmSkuSend(context, location, body, options);
  return _recommendVmSkuDeserialize(result);
}
