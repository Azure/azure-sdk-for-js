// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext as Client } from "../index.js";
import type {
  HorizonDbParameterGroup,
  HorizonDbParameterGroupForPatchUpdate,
  _HorizonDbParameterGroupListResult,
  _HorizonDbParameterGroupConnectionPropertiesListResult,
  HorizonDbParameterGroupConnectionProperties,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  horizonDbParameterGroupSerializer,
  horizonDbParameterGroupDeserializer,
  horizonDbParameterGroupForPatchUpdateSerializer,
  _horizonDbParameterGroupListResultDeserializer,
  _horizonDbParameterGroupConnectionPropertiesListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  HorizonDbParameterGroupsListVersionsOptionalParams,
  HorizonDbParameterGroupsListConnectionsOptionalParams,
  HorizonDbParameterGroupsListBySubscriptionOptionalParams,
  HorizonDbParameterGroupsListByResourceGroupOptionalParams,
  HorizonDbParameterGroupsDeleteOptionalParams,
  HorizonDbParameterGroupsUpdateOptionalParams,
  HorizonDbParameterGroupsCreateOrUpdateOptionalParams,
  HorizonDbParameterGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listVersionsSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: HorizonDbParameterGroupsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}/versions{?api%2Dversion,version}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
      version: options?.version,
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_HorizonDbParameterGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _horizonDbParameterGroupListResultDeserializer(result.body);
}

/** Lists parameter groups filtered by version number. */
export function listVersions(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: HorizonDbParameterGroupsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HorizonDbParameterGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, resourceGroupName, parameterGroupName, options),
    _listVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-20-preview",
    },
  );
}

export function _listConnectionsSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: HorizonDbParameterGroupsListConnectionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}/connections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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

export async function _listConnectionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_HorizonDbParameterGroupConnectionPropertiesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _horizonDbParameterGroupConnectionPropertiesListResultDeserializer(result.body);
}

/** Gets all connections to a parameter group. */
export function listConnections(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: HorizonDbParameterGroupsListConnectionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HorizonDbParameterGroupConnectionProperties> {
  return buildPagedAsyncIterator(
    context,
    () => _listConnectionsSend(context, resourceGroupName, parameterGroupName, options),
    _listConnectionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-20-preview",
    },
  );
}

export function _listBySubscriptionSend(
  context: Client,
  options: HorizonDbParameterGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HorizonDb/parameterGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_HorizonDbParameterGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _horizonDbParameterGroupListResultDeserializer(result.body);
}

/** Lists all HorizonDb parameter groups in a subscription. */
export function listBySubscription(
  context: Client,
  options: HorizonDbParameterGroupsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HorizonDbParameterGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-20-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: HorizonDbParameterGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_HorizonDbParameterGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _horizonDbParameterGroupListResultDeserializer(result.body);
}

/** Lists all HorizonDb parameter groups in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: HorizonDbParameterGroupsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<HorizonDbParameterGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-01-20-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: HorizonDbParameterGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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

/** Deletes a HorizonDb parameter group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: HorizonDbParameterGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, parameterGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-20-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  properties: HorizonDbParameterGroupForPatchUpdate,
  options: HorizonDbParameterGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: horizonDbParameterGroupForPatchUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<HorizonDbParameterGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return horizonDbParameterGroupDeserializer(result.body);
}

/** Updates an existing HorizonDb parameter group. */
export function update(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  properties: HorizonDbParameterGroupForPatchUpdate,
  options: HorizonDbParameterGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HorizonDbParameterGroup>, HorizonDbParameterGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, parameterGroupName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-01-20-preview",
  }) as PollerLike<OperationState<HorizonDbParameterGroup>, HorizonDbParameterGroup>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  resource: HorizonDbParameterGroup,
  options: HorizonDbParameterGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: horizonDbParameterGroupSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<HorizonDbParameterGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return horizonDbParameterGroupDeserializer(result.body);
}

/** Creates a new HorizonDb parameter group or updates an existing parameter group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  resource: HorizonDbParameterGroup,
  options: HorizonDbParameterGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<HorizonDbParameterGroup>, HorizonDbParameterGroup> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, parameterGroupName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-01-20-preview",
  }) as PollerLike<OperationState<HorizonDbParameterGroup>, HorizonDbParameterGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: HorizonDbParameterGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HorizonDb/parameterGroups/{parameterGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      parameterGroupName: parameterGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-01-20-preview",
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
): Promise<HorizonDbParameterGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return horizonDbParameterGroupDeserializer(result.body);
}

/** Gets information about a HorizonDb parameter group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  parameterGroupName: string,
  options: HorizonDbParameterGroupsGetOptionalParams = { requestOptions: {} },
): Promise<HorizonDbParameterGroup> {
  const result = await _getSend(context, resourceGroupName, parameterGroupName, options);
  return _getDeserialize(result);
}
