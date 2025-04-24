// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  WorkloadImpact,
  workloadImpactSerializer,
  workloadImpactDeserializer,
  _WorkloadImpactListResult,
  _workloadImpactListResultDeserializer,
} from "../../models/models.js";
import {
  WorkloadImpactsListBySubscriptionOptionalParams,
  WorkloadImpactsDeleteOptionalParams,
  WorkloadImpactsGetOptionalParams,
  WorkloadImpactsCreateOptionalParams,
} from "./options.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: WorkloadImpactsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
export function listBySubscription(
  context: Client,
  options: WorkloadImpactsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<WorkloadImpact> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  workloadImpactName: string,
  options: WorkloadImpactsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workloadImpactName: workloadImpactName,
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

/** Delete a WorkloadImpact */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  workloadImpactName: string,
  options: WorkloadImpactsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, workloadImpactName, options);
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  workloadImpactName: string,
  options: WorkloadImpactsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}{?api%2Dversion}",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WorkloadImpact> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workloadImpactDeserializer(result.body);
}

/** Get a WorkloadImpact */
export async function get(
  context: Client,
  workloadImpactName: string,
  options: WorkloadImpactsGetOptionalParams = { requestOptions: {} },
): Promise<WorkloadImpact> {
  const result = await _getSend(context, workloadImpactName, options);
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  workloadImpactName: string,
  resource: WorkloadImpact,
  options: WorkloadImpactsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Impact/workloadImpacts/{workloadImpactName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      workloadImpactName: workloadImpactName,
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
    body: workloadImpactSerializer(resource),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<WorkloadImpact> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return workloadImpactDeserializer(result.body);
}

/** Create a WorkloadImpact */
export function create(
  context: Client,
  workloadImpactName: string,
  resource: WorkloadImpact,
  options: WorkloadImpactsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<WorkloadImpact>, WorkloadImpact> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createSend(context, workloadImpactName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<WorkloadImpact>, WorkloadImpact>;
}
