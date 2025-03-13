// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ImpactContext as Client,
  InsightsCreateOptionalParams,
  InsightsDeleteOptionalParams,
  InsightsGetOptionalParams,
  InsightsListBySubscriptionOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  Insight,
  insightSerializer,
  insightDeserializer,
  _InsightListResult,
  _insightListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _insightsDeleteSend(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  options: InsightsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}/insights/{insightName}",
      context.subscriptionId,
      workloadImpactName,
      insightName,
    )
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _insightsDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete Insight resource, This is Admin only operation */
export async function insightsDelete(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  options: InsightsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _insightsDeleteSend(context, workloadImpactName, insightName, options);
  return _insightsDeleteDeserialize(result);
}

export function _insightsCreateSend(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  resource: Insight,
  options: InsightsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}/insights/{insightName}",
      context.subscriptionId,
      workloadImpactName,
      insightName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: insightSerializer(resource),
    });
}

export async function _insightsCreateDeserialize(result: PathUncheckedResponse): Promise<Insight> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return insightDeserializer(result.body);
}

/** Create Insight resource, This is Admin only operation */
export async function insightsCreate(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  resource: Insight,
  options: InsightsCreateOptionalParams = { requestOptions: {} },
): Promise<Insight> {
  const result = await _insightsCreateSend(
    context,
    workloadImpactName,
    insightName,
    resource,
    options,
  );
  return _insightsCreateDeserialize(result);
}

export function _insightsListBySubscriptionSend(
  context: Client,
  workloadImpactName: string,
  options: InsightsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}/insights",
      context.subscriptionId,
      workloadImpactName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _insightsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_InsightListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _insightListResultDeserializer(result.body);
}

/** List Insight resources by workloadImpactName */
export function insightsListBySubscription(
  context: Client,
  workloadImpactName: string,
  options: InsightsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Insight> {
  return buildPagedAsyncIterator(
    context,
    () => _insightsListBySubscriptionSend(context, workloadImpactName, options),
    _insightsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _insightsGetSend(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  options: InsightsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}/insights/{insightName}",
      context.subscriptionId,
      workloadImpactName,
      insightName,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
    });
}

export async function _insightsGetDeserialize(result: PathUncheckedResponse): Promise<Insight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return insightDeserializer(result.body);
}

/** Get Insight resources by workloadImpactName and insightName */
export async function insightsGet(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  options: InsightsGetOptionalParams = { requestOptions: {} },
): Promise<Insight> {
  const result = await _insightsGetSend(context, workloadImpactName, insightName, options);
  return _insightsGetDeserialize(result);
}
