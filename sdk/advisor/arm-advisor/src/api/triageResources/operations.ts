// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  TriageResource,
  triageResourceDeserializer,
  _TriageResourceCollection,
  _triageResourceCollectionDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import { TriageResourcesListOptionalParams, TriageResourcesGetOptionalParams } from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  reviewId: string,
  recommendationId: string,
  options: TriageResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/resiliencyReviews/{reviewId}/providers/Microsoft.Advisor/triageRecommendations/{recommendationId}/providers/Microsoft.Advisor/triageResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      reviewId: reviewId,
      recommendationId: recommendationId,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_TriageResourceCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _triageResourceCollectionDeserializer(result.body);
}

/** List all triage resources that belong to a review and recommendation. */
export function list(
  context: Client,
  reviewId: string,
  recommendationId: string,
  options: TriageResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TriageResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, reviewId, recommendationId, options),
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
  recommendationId: string,
  recommendationResourceId: string,
  options: TriageResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/resiliencyReviews/{reviewId}/providers/Microsoft.Advisor/triageRecommendations/{recommendationId}/providers/Microsoft.Advisor/triageResources/{recommendationResourceId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      reviewId: reviewId,
      recommendationId: recommendationId,
      recommendationResourceId: recommendationResourceId,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TriageResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return triageResourceDeserializer(result.body);
}

/** Get a triage resource for a given review and recommendation. */
export async function get(
  context: Client,
  reviewId: string,
  recommendationId: string,
  recommendationResourceId: string,
  options: TriageResourcesGetOptionalParams = { requestOptions: {} },
): Promise<TriageResource> {
  const result = await _getSend(
    context,
    reviewId,
    recommendationId,
    recommendationResourceId,
    options,
  );
  return _getDeserialize(result);
}
