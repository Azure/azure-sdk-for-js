// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  Insight,
  insightSerializer,
  insightDeserializer,
  _InsightListResult,
  _insightListResultDeserializer,
} from "../../models/models.js";
import {
  InsightsDeleteOptionalParams,
  InsightsCreateOptionalParams,
  InsightsListBySubscriptionOptionalParams,
  InsightsGetOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  options: InsightsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}/insights/{insightName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workloadImpactName: workloadImpactName,
      insightName: insightName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete Insight resource, This is Admin only operation */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  options: InsightsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, workloadImpactName, insightName, options);
  return _$deleteDeserialize(result);
}

export function _createSend(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  resource: Insight,
  options: InsightsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}/insights/{insightName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workloadImpactName: workloadImpactName,
      insightName: insightName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: insightSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Insight> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return insightDeserializer(result.body);
}

/** Create Insight resource, This is Admin only operation */
export async function create(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  resource: Insight,
  options: InsightsCreateOptionalParams = { requestOptions: {} },
): Promise<Insight> {
  const result = await _createSend(context, workloadImpactName, insightName, resource, options);
  return _createDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  workloadImpactName: string,
  options: InsightsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}/insights{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workloadImpactName: workloadImpactName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
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
export function listBySubscription(
  context: Client,
  workloadImpactName: string,
  options: InsightsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Insight> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, workloadImpactName, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  options: InsightsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}/insights/{insightName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workloadImpactName: workloadImpactName,
      insightName: insightName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Insight> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return insightDeserializer(result.body);
}

/** Get Insight resources by workloadImpactName and insightName */
export async function get(
  context: Client,
  workloadImpactName: string,
  insightName: string,
  options: InsightsGetOptionalParams = { requestOptions: {} },
): Promise<Insight> {
  const result = await _getSend(context, workloadImpactName, insightName, options);
  return _getDeserialize(result);
}
