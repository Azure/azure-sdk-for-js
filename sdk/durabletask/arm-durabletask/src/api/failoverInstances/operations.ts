// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DurableTaskContext as Client } from "../index.js";
import type { FailoverInstance, _FailoverInstanceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  failoverInstanceSerializer,
  failoverInstanceDeserializer,
  _failoverInstanceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FailoverInstancesForceFailoverAllowDataLossOptionalParams,
  FailoverInstancesFailoverOptionalParams,
  FailoverInstancesListBySchedulerOptionalParams,
  FailoverInstancesDeleteOptionalParams,
  FailoverInstancesCreateOrReplaceOptionalParams,
  FailoverInstancesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _forceFailoverAllowDataLossSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesForceFailoverAllowDataLossOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/failoverInstances/default/forceFailoverAllowDataLoss{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _forceFailoverAllowDataLossDeserialize(
  result: PathUncheckedResponse,
): Promise<FailoverInstance> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return failoverInstanceDeserializer(result.body);
}

/** Trigger a forced failover with potential data loss for the parent scheduler */
export function forceFailoverAllowDataLoss(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesForceFailoverAllowDataLossOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailoverInstance>, FailoverInstance> {
  return getLongRunningPoller(
    context,
    _forceFailoverAllowDataLossDeserialize,
    ["200", "202", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _forceFailoverAllowDataLossSend(context, resourceGroupName, schedulerName, options),
      resourceLocationConfig: "location",
      apiVersion: context.apiVersion ?? "2026-07-01-preview",
    },
  ) as PollerLike<OperationState<FailoverInstance>, FailoverInstance>;
}

export function _failoverSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesFailoverOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/failoverInstances/default/failover{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _failoverDeserialize(
  result: PathUncheckedResponse,
): Promise<FailoverInstance> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return failoverInstanceDeserializer(result.body);
}

/** Trigger a graceful failover for the parent scheduler */
export function failover(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesFailoverOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailoverInstance>, FailoverInstance> {
  return getLongRunningPoller(context, _failoverDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _failoverSend(context, resourceGroupName, schedulerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<FailoverInstance>, FailoverInstance>;
}

export function _listBySchedulerSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesListBySchedulerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/failoverInstances{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _listBySchedulerDeserialize(
  result: PathUncheckedResponse,
): Promise<_FailoverInstanceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _failoverInstanceListResultDeserializer(result.body);
}

/** List Failover Instances */
export function listByScheduler(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesListBySchedulerOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FailoverInstance> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySchedulerSend(context, resourceGroupName, schedulerName, options),
    _listBySchedulerDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/failoverInstances/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a Failover Instance */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, schedulerName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: FailoverInstance,
  options: FailoverInstancesCreateOrReplaceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/failoverInstances/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: failoverInstanceSerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<FailoverInstance> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return failoverInstanceDeserializer(result.body);
}

/** Create or Update a Failover Instance */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: FailoverInstance,
  options: FailoverInstancesCreateOrReplaceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FailoverInstance>, FailoverInstance> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, schedulerName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<FailoverInstance>, FailoverInstance>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/failoverInstances/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<FailoverInstance> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return failoverInstanceDeserializer(result.body);
}

/** Get a Failover Instance */
export async function get(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: FailoverInstancesGetOptionalParams = { requestOptions: {} },
): Promise<FailoverInstance> {
  const result = await _getSend(context, resourceGroupName, schedulerName, options);
  return _getDeserialize(result);
}
