// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AdvisorManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  TriageRecommendation,
  triageRecommendationDeserializer,
  _TriageRecommendationCollection,
  _triageRecommendationCollectionDeserializer,
  RecommendationRejectBody,
  recommendationRejectBodySerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  TriageRecommendationsResetTriageRecommendationOptionalParams,
  TriageRecommendationsRejectTriageRecommendationOptionalParams,
  TriageRecommendationsApproveTriageRecommendationOptionalParams,
  TriageRecommendationsListOptionalParams,
  TriageRecommendationsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _resetTriageRecommendationSend(
  context: Client,
  reviewId: string,
  recommendationId: string,
  options: TriageRecommendationsResetTriageRecommendationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/resiliencyReviews/{reviewId}/providers/Microsoft.Advisor/triageRecommendations/{recommendationId}/reset{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _resetTriageRecommendationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Reset an existing triage recommendation for a given id. */
export async function resetTriageRecommendation(
  context: Client,
  reviewId: string,
  recommendationId: string,
  options: TriageRecommendationsResetTriageRecommendationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resetTriageRecommendationSend(context, reviewId, recommendationId, options);
  return _resetTriageRecommendationDeserialize(result);
}

export function _rejectTriageRecommendationSend(
  context: Client,
  reviewId: string,
  recommendationId: string,
  recommendationRejectBody: RecommendationRejectBody,
  options: TriageRecommendationsRejectTriageRecommendationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/resiliencyReviews/{reviewId}/providers/Microsoft.Advisor/triageRecommendations/{recommendationId}/reject{?api%2Dversion}",
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
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: recommendationRejectBodySerializer(recommendationRejectBody),
  });
}

export async function _rejectTriageRecommendationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Reject an existing triage recommendation for a given id. */
export async function rejectTriageRecommendation(
  context: Client,
  reviewId: string,
  recommendationId: string,
  recommendationRejectBody: RecommendationRejectBody,
  options: TriageRecommendationsRejectTriageRecommendationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _rejectTriageRecommendationSend(
    context,
    reviewId,
    recommendationId,
    recommendationRejectBody,
    options,
  );
  return _rejectTriageRecommendationDeserialize(result);
}

export function _approveTriageRecommendationSend(
  context: Client,
  reviewId: string,
  recommendationId: string,
  options: TriageRecommendationsApproveTriageRecommendationOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/resiliencyReviews/{reviewId}/providers/Microsoft.Advisor/triageRecommendations/{recommendationId}/approve{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _approveTriageRecommendationDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Approve a triage recommendation for a given id. */
export async function approveTriageRecommendation(
  context: Client,
  reviewId: string,
  recommendationId: string,
  options: TriageRecommendationsApproveTriageRecommendationOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _approveTriageRecommendationSend(
    context,
    reviewId,
    recommendationId,
    options,
  );
  return _approveTriageRecommendationDeserialize(result);
}

export function _listSend(
  context: Client,
  reviewId: string,
  options: TriageRecommendationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/resiliencyReviews/{reviewId}/providers/Microsoft.Advisor/triageRecommendations{?api%2Dversion,%24top,%24skip}",
    {
      subscriptionId: context.subscriptionId,
      reviewId: reviewId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      "%24top": options?.top,
      "%24skip": options?.skip,
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
): Promise<_TriageRecommendationCollection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _triageRecommendationCollectionDeserializer(result.body);
}

/** Get list of recommendations for an existing Azure Advisor Resiliency Review Id. */
export function list(
  context: Client,
  reviewId: string,
  options: TriageRecommendationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<TriageRecommendation> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, reviewId, options),
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
  options: TriageRecommendationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/resiliencyReviews/{reviewId}/providers/Microsoft.Advisor/triageRecommendations/{recommendationId}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<TriageRecommendation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return triageRecommendationDeserializer(result.body);
}

/** Get an existing recommendation by id for an existing Azure Advisor Resiliency Review Id. */
export async function get(
  context: Client,
  reviewId: string,
  recommendationId: string,
  options: TriageRecommendationsGetOptionalParams = { requestOptions: {} },
): Promise<TriageRecommendation> {
  const result = await _getSend(context, reviewId, recommendationId, options);
  return _getDeserialize(result);
}
