// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext as Client } from "../index.js";
import type { ResiliencyReview, _ResiliencyReviewCollection } from "../../models/models.js";
import {
  errorResponseDeserializer,
  resiliencyReviewDeserializer,
  _resiliencyReviewCollectionDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ResiliencyReviewsListOptionalParams,
  ResiliencyReviewsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  options: ResiliencyReviewsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/resiliencyReviews{?api%2Dversion,%24top,%24skip,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      "%24top": options?.top,
      "%24skip": options?.skip,
      "%24filter": options?.filter,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResiliencyReviewCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resiliencyReviewCollectionDeserializer(result.body);
}

/** Get list of Azure Advisor resiliency reviews. */
export function list(
  context: Client,
  options: ResiliencyReviewsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResiliencyReview> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  reviewId: string,
  options: ResiliencyReviewsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/resiliencyReviews/{reviewId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      reviewId: reviewId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ResiliencyReview> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resiliencyReviewDeserializer(result.body);
}

/** Get existing Azure Advisor resiliency review by id. */
export async function get(
  context: Client,
  reviewId: string,
  options: ResiliencyReviewsGetOptionalParams = { requestOptions: {} },
): Promise<ResiliencyReview> {
  const result = await _getSend(context, reviewId, options);
  return _getDeserialize(result);
}
