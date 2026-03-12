// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  _ExadbVmClusterListResult,
  ExadbVmCluster,
  ExadbVmClusterUpdate,
  RemoveVirtualMachineFromExadbVmClusterDetails,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _exadbVmClusterListResultDeserializer,
  exadbVmClusterSerializer,
  exadbVmClusterDeserializer,
  exadbVmClusterUpdateSerializer,
  removeVirtualMachineFromExadbVmClusterDetailsSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ExadbVmClustersRemoveVmsOptionalParams,
  ExadbVmClustersListByResourceGroupOptionalParams,
  ExadbVmClustersDeleteOptionalParams,
  ExadbVmClustersUpdateOptionalParams,
  ExadbVmClustersGetOptionalParams,
  ExadbVmClustersCreateOrUpdateOptionalParams,
  ExadbVmClustersListBySubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _removeVmsSend(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  body: RemoveVirtualMachineFromExadbVmClusterDetails,
  options: ExadbVmClustersRemoveVmsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}/removeVms{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exadbVmClusterName: exadbVmClusterName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: removeVirtualMachineFromExadbVmClusterDetailsSerializer(body),
  });
}

export async function _removeVmsDeserialize(
  result: PathUncheckedResponse,
): Promise<ExadbVmCluster> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return exadbVmClusterDeserializer(result.body);
}

/** Remove VMs from the VM Cluster */
export function removeVms(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  body: RemoveVirtualMachineFromExadbVmClusterDetails,
  options: ExadbVmClustersRemoveVmsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExadbVmCluster>, ExadbVmCluster> {
  return getLongRunningPoller(context, _removeVmsDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _removeVmsSend(context, resourceGroupName, exadbVmClusterName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ExadbVmCluster>, ExadbVmCluster>;
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ExadbVmClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExadbVmClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _exadbVmClusterListResultDeserializer(result.body);
}

/** List ExadbVmCluster resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ExadbVmClustersListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ExadbVmCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  options: ExadbVmClustersDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exadbVmClusterName: exadbVmClusterName,
      "api%2Dversion": context.apiVersion,
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
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a ExadbVmCluster */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  options: ExadbVmClustersDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, exadbVmClusterName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  properties: ExadbVmClusterUpdate,
  options: ExadbVmClustersUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exadbVmClusterName: exadbVmClusterName,
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
    body: exadbVmClusterUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ExadbVmCluster> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return exadbVmClusterDeserializer(result.body);
}

/** Update a ExadbVmCluster */
export function update(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  properties: ExadbVmClusterUpdate,
  options: ExadbVmClustersUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExadbVmCluster>, ExadbVmCluster> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, exadbVmClusterName, properties, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ExadbVmCluster>, ExadbVmCluster>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  options: ExadbVmClustersGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exadbVmClusterName: exadbVmClusterName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExadbVmCluster> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return exadbVmClusterDeserializer(result.body);
}

/** Get a ExadbVmCluster */
export async function get(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  options: ExadbVmClustersGetOptionalParams = { requestOptions: {} },
): Promise<ExadbVmCluster> {
  const result = await _getSend(context, resourceGroupName, exadbVmClusterName, options);
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  resource: ExadbVmCluster,
  options: ExadbVmClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/exadbVmClusters/{exadbVmClusterName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      exadbVmClusterName: exadbVmClusterName,
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
    body: exadbVmClusterSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExadbVmCluster> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return exadbVmClusterDeserializer(result.body);
}

/** Create a ExadbVmCluster */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  exadbVmClusterName: string,
  resource: ExadbVmCluster,
  options: ExadbVmClustersCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExadbVmCluster>, ExadbVmCluster> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, exadbVmClusterName, resource, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ExadbVmCluster>, ExadbVmCluster>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: ExadbVmClustersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Oracle.Database/exadbVmClusters{?api%2Dversion}",
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
): Promise<_ExadbVmClusterListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _exadbVmClusterListResultDeserializer(result.body);
}

/** List ExadbVmCluster resources by subscription ID */
export function listBySubscription(
  context: Client,
  options: ExadbVmClustersListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ExadbVmCluster> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
