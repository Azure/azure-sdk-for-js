// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AdvisorManagementContext as Client } from "../index.js";
import type {
  ResourceRecommendationBase,
  RecommendationPatchPayload,
  _ResourceRecommendationBaseListResult,
} from "../../models/models.js";
import {
  armErrorResponseDeserializer,
  resourceRecommendationBaseDeserializer,
  recommendationPatchPayloadSerializer,
  errorResponseDeserializer,
  _resourceRecommendationBaseListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RecommendationsGetGenerateStatusOptionalParams,
  RecommendationsGenerateOptionalParams,
  RecommendationsListByTenantOptionalParams,
  RecommendationsListOptionalParams,
  RecommendationsUpdateOptionalParams,
  RecommendationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _getGenerateStatusSend(
  context: Client,
  operationId: string,
  options: RecommendationsGetGenerateStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/generateRecommendations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getGenerateStatusDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Retrieves the status of the recommendation computation or generation process. Invoke this API after calling the generation recommendation. The URI of this API is returned in the Location field of the response header. */
export async function getGenerateStatus(
  context: Client,
  operationId: string,
  options: RecommendationsGetGenerateStatusOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _getGenerateStatusSend(context, operationId, options);
  return _getGenerateStatusDeserialize(result);
}

export function _generateSend(
  context: Client,
  options: RecommendationsGenerateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/generateRecommendations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _generateDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Initiates the recommendation generation or computation process for a subscription. This operation is asynchronous. The generated recommendations are stored in a cache in the Advisor service. */
export async function generate(
  context: Client,
  options: RecommendationsGenerateOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _generateSend(context, options);
  return _generateDeserialize(result);
}

export function _listByTenantSend(
  context: Client,
  resourceUri: string,
  options: RecommendationsListByTenantOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Advisor/recommendations{?api%2Dversion,%24filter,%24top,%24skipToken}",
    {
      resourceUri: resourceUri,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listByTenantDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceRecommendationBaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceRecommendationBaseListResultDeserializer(result.body);
}

/** Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. */
export function listByTenant(
  context: Client,
  resourceUri: string,
  options: RecommendationsListByTenantOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceRecommendationBase> {
  return buildPagedAsyncIterator(
    context,
    () => _listByTenantSend(context, resourceUri, options),
    _listByTenantDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-01-preview",
    },
  );
}

export function _listSend(
  context: Client,
  options: RecommendationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/recommendations{?api%2Dversion,%24filter,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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
): Promise<_ResourceRecommendationBaseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _resourceRecommendationBaseListResultDeserializer(result.body);
}

/** Obtains cached recommendations for a subscription. The recommendations are generated or computed by invoking generateRecommendations. */
export function list(
  context: Client,
  options: RecommendationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ResourceRecommendationBase> {
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

export function _updateSend(
  context: Client,
  recommendationId: string,
  properties: RecommendationPatchPayload,
  options: RecommendationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Advisor/recommendations/{recommendationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      recommendationId: recommendationId,
      "api%2Dversion": context.apiVersion ?? "2026-02-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: recommendationPatchPayloadSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceRecommendationBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceRecommendationBaseDeserializer(result.body);
}

/** Update the state of a Recommendation */
export async function update(
  context: Client,
  recommendationId: string,
  properties: RecommendationPatchPayload,
  options: RecommendationsUpdateOptionalParams = { requestOptions: {} },
): Promise<ResourceRecommendationBase> {
  const result = await _updateSend(context, recommendationId, properties, options);
  return _updateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceUri: string,
  recommendationId: string,
  options: RecommendationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceUri}/providers/Microsoft.Advisor/recommendations/{recommendationId}{?api%2Dversion}",
    {
      resourceUri: resourceUri,
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
): Promise<ResourceRecommendationBase> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = armErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceRecommendationBaseDeserializer(result.body);
}

/** Obtains details of a cached recommendation. */
export async function get(
  context: Client,
  resourceUri: string,
  recommendationId: string,
  options: RecommendationsGetOptionalParams = { requestOptions: {} },
): Promise<ResourceRecommendationBase> {
  const result = await _getSend(context, resourceUri, recommendationId, options);
  return _getDeserialize(result);
}
