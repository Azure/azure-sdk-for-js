// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext as Client } from "./index.js";
import type { PredictionRequest, PredictionResponse } from "../models/models.js";
import {
  predictionRequestSerializer,
  predictionResponseDeserializer,
  armErrorResponseDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type { PredictOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _predictSend(
  context: Client,
  predictionRequest: PredictionRequest,
  options: PredictOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/predict{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: predictionRequestSerializer(predictionRequest),
  });
}

export async function _predictDeserialize(
  result: PathUncheckedResponse,
): Promise<PredictionResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return predictionResponseDeserializer(result.body);
}

/** Predicts a recommendation. */
export async function predict(
  context: Client,
  predictionRequest: PredictionRequest,
  options: PredictOptionalParams = { requestOptions: {} },
): Promise<PredictionResponse> {
  const result = await _predictSend(context, predictionRequest, options);
  return _predictDeserialize(result);
}
