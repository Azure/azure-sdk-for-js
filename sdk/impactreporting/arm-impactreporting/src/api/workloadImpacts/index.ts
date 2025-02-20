// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ImpactContext as Client,
  WorkloadImpactsCreateOptionalParams,
  WorkloadImpactsDeleteOptionalParams,
  WorkloadImpactsGetOptionalParams,
  WorkloadImpactsListBySubscriptionOptionalParams,
} from "../index.js";
import {
  errorResponseDeserializer,
  WorkloadImpact,
  workloadImpactSerializer,
  workloadImpactDeserializer,
  _WorkloadImpactListResult,
  _workloadImpactListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _workloadImpactsListBySubscriptionSend(
  context: Client,
  options: WorkloadImpactsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts",
      context.subscriptionId,
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

export async function _workloadImpactsListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_WorkloadImpactListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _workloadImpactListResultDeserializer(result.body);
}

/** List WorkloadImpact resources by subscription ID */
export function workloadImpactsListBySubscription(
  context: Client,
  options: WorkloadImpactsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<WorkloadImpact> {
  return buildPagedAsyncIterator(
    context,
    () => _workloadImpactsListBySubscriptionSend(context, options),
    _workloadImpactsListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _workloadImpactsDeleteSend(
  context: Client,
  workloadImpactName: string,
  options: WorkloadImpactsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}",
      context.subscriptionId,
      workloadImpactName,
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

export async function _workloadImpactsDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a WorkloadImpact */
export async function workloadImpactsDelete(
  context: Client,
  workloadImpactName: string,
  options: WorkloadImpactsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _workloadImpactsDeleteSend(context, workloadImpactName, options);
  return _workloadImpactsDeleteDeserialize(result);
}

export function _workloadImpactsGetSend(
  context: Client,
  workloadImpactName: string,
  options: WorkloadImpactsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}",
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

export async function _workloadImpactsGetDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkloadImpact> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workloadImpactDeserializer(result.body);
}

/** Get a WorkloadImpact */
export async function workloadImpactsGet(
  context: Client,
  workloadImpactName: string,
  options: WorkloadImpactsGetOptionalParams = { requestOptions: {} },
): Promise<WorkloadImpact> {
  const result = await _workloadImpactsGetSend(context, workloadImpactName, options);
  return _workloadImpactsGetDeserialize(result);
}

export function _workloadImpactsCreateSend(
  context: Client,
  workloadImpactName: string,
  resource: WorkloadImpact,
  options: WorkloadImpactsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}",
      context.subscriptionId,
      workloadImpactName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      queryParameters: { "api-version": context.apiVersion },
      body: workloadImpactSerializer(resource),
    });
}

export async function _workloadImpactsCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkloadImpact> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workloadImpactDeserializer(result.body);
}

/** Create a WorkloadImpact */
export function workloadImpactsCreate(
  context: Client,
  workloadImpactName: string,
  resource: WorkloadImpact,
  options: WorkloadImpactsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkloadImpact>, WorkloadImpact> {
  return getLongRunningPoller(context, _workloadImpactsCreateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _workloadImpactsCreateSend(context, workloadImpactName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<WorkloadImpact>, WorkloadImpact>;
}
