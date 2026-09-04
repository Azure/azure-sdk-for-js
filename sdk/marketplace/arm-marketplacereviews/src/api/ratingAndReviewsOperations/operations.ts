// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MarketplaceContext as Client } from "../index.js";
import type { UserHasReview } from "../../models/models.js";
import { errorResponseDeserializer, userHasReviewDeserializer } from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { RatingAndReviewsOperationsCheckUserHasReviewOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkUserHasReviewSend(
  context: Client,
  uniqueProductId: string,
  options: RatingAndReviewsOperationsCheckUserHasReviewOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Marketplace/products/{uniqueProductId}/checkUserHasReview{?api%2Dversion}",
    {
      uniqueProductId: uniqueProductId,
      "api%2Dversion": context.apiVersion ?? "2023-01-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _checkUserHasReviewDeserialize(
  result: PathUncheckedResponse,
): Promise<UserHasReview> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return userHasReviewDeserializer(result.body);
}

/** Check user has review. */
export async function checkUserHasReview(
  context: Client,
  uniqueProductId: string,
  options: RatingAndReviewsOperationsCheckUserHasReviewOptionalParams = { requestOptions: {} },
): Promise<UserHasReview> {
  const result = await _checkUserHasReviewSend(context, uniqueProductId, options);
  return _checkUserHasReviewDeserialize(result);
}
