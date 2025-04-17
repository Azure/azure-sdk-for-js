// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  RetentionPolicy,
  retentionPolicySerializer,
  retentionPolicyDeserializer,
  _RetentionPolicyListResult,
  _retentionPolicyListResultDeserializer,
} from "../../models/models.js";
import {
  RetentionPoliciesListBySchedulerOptionalParams,
  RetentionPoliciesDeleteOptionalParams,
  RetentionPoliciesUpdateOptionalParams,
  RetentionPoliciesCreateOrReplaceOptionalParams,
  RetentionPoliciesGetOptionalParams,
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

export function _listBySchedulerSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: RetentionPoliciesListBySchedulerOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
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

export async function _listBySchedulerDeserialize(
  result: PathUncheckedResponse,
): Promise<_RetentionPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _retentionPolicyListResultDeserializer(result.body);
}

/** List Retention Policies */
export function listByScheduler(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: RetentionPoliciesListBySchedulerOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<RetentionPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySchedulerSend(context, resourceGroupName, schedulerName, options),
    _listBySchedulerDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: RetentionPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
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
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a Retention Policy */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: RetentionPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, schedulerName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  properties: RetentionPolicy,
  options: RetentionPoliciesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: retentionPolicySerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<RetentionPolicy> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return retentionPolicyDeserializer(result.body);
}

/** Update a Retention Policy */
export function update(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  properties: RetentionPolicy,
  options: RetentionPoliciesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<RetentionPolicy>, RetentionPolicy> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, schedulerName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<RetentionPolicy>, RetentionPolicy>;
}

export function _createOrReplaceSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: RetentionPolicy,
  options: RetentionPoliciesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
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
    body: retentionPolicySerializer(resource),
  });
}

export async function _createOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<RetentionPolicy> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return retentionPolicyDeserializer(result.body);
}

/** Create or Update a Retention Policy */
export function createOrReplace(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  resource: RetentionPolicy,
  options: RetentionPoliciesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<RetentionPolicy>, RetentionPolicy> {
  return getLongRunningPoller(context, _createOrReplaceDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrReplaceSend(context, resourceGroupName, schedulerName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<RetentionPolicy>, RetentionPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: RetentionPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DurableTask/schedulers/{schedulerName}/retentionPolicies/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      schedulerName: schedulerName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RetentionPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return retentionPolicyDeserializer(result.body);
}

/** Get a Retention Policy */
export async function get(
  context: Client,
  resourceGroupName: string,
  schedulerName: string,
  options: RetentionPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<RetentionPolicy> {
  const result = await _getSend(context, resourceGroupName, schedulerName, options);
  return _getDeserialize(result);
}
