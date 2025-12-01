// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext as Client } from "../index.js";
import type {
  ActiveDirectoryConfig,
  ActiveDirectoryConfigUpdate,
  _ActiveDirectoryConfigListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  activeDirectoryConfigSerializer,
  activeDirectoryConfigDeserializer,
  activeDirectoryConfigUpdateSerializer,
  _activeDirectoryConfigListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ActiveDirectoryConfigsListBySubscriptionOptionalParams,
  ActiveDirectoryConfigsListByResourceGroupOptionalParams,
  ActiveDirectoryConfigsDeleteOptionalParams,
  ActiveDirectoryConfigsUpdateOptionalParams,
  ActiveDirectoryConfigsCreateOrUpdateOptionalParams,
  ActiveDirectoryConfigsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: ActiveDirectoryConfigsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.NetApp/activeDirectoryConfigs{?api%2Dversion}",
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
): Promise<_ActiveDirectoryConfigListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _activeDirectoryConfigListResultDeserializer(result.body);
}

/** List all active directory configurations within the subscription */
export function listBySubscription(
  context: Client,
  options: ActiveDirectoryConfigsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ActiveDirectoryConfig> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ActiveDirectoryConfigsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/activeDirectoryConfigs{?api%2Dversion}",
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
): Promise<_ActiveDirectoryConfigListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _activeDirectoryConfigListResultDeserializer(result.body);
}

/** List all active directory configurations within the resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ActiveDirectoryConfigsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ActiveDirectoryConfig> {
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
  activeDirectoryConfigName: string,
  options: ActiveDirectoryConfigsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/activeDirectoryConfigs/{activeDirectoryConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      activeDirectoryConfigName: activeDirectoryConfigName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete the specified Active Directory configuration */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  activeDirectoryConfigName: string,
  options: ActiveDirectoryConfigsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, activeDirectoryConfigName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  activeDirectoryConfigName: string,
  body: ActiveDirectoryConfigUpdate,
  options: ActiveDirectoryConfigsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/activeDirectoryConfigs/{activeDirectoryConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      activeDirectoryConfigName: activeDirectoryConfigName,
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
    body: activeDirectoryConfigUpdateSerializer(body),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ActiveDirectoryConfig> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return activeDirectoryConfigDeserializer(result.body);
}

/** Patch the specified active directory configuration */
export function update(
  context: Client,
  resourceGroupName: string,
  activeDirectoryConfigName: string,
  body: ActiveDirectoryConfigUpdate,
  options: ActiveDirectoryConfigsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ActiveDirectoryConfig>, ActiveDirectoryConfig> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, activeDirectoryConfigName, body, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ActiveDirectoryConfig>, ActiveDirectoryConfig>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  activeDirectoryConfigName: string,
  body: ActiveDirectoryConfig,
  options: ActiveDirectoryConfigsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/activeDirectoryConfigs/{activeDirectoryConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      activeDirectoryConfigName: activeDirectoryConfigName,
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
    body: activeDirectoryConfigSerializer(body),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ActiveDirectoryConfig> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return activeDirectoryConfigDeserializer(result.body);
}

/** Create or update the specified active directory configuration */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  activeDirectoryConfigName: string,
  body: ActiveDirectoryConfig,
  options: ActiveDirectoryConfigsCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ActiveDirectoryConfig>, ActiveDirectoryConfig> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, activeDirectoryConfigName, body, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ActiveDirectoryConfig>, ActiveDirectoryConfig>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  activeDirectoryConfigName: string,
  options: ActiveDirectoryConfigsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetApp/activeDirectoryConfigs/{activeDirectoryConfigName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      activeDirectoryConfigName: activeDirectoryConfigName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ActiveDirectoryConfig> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return activeDirectoryConfigDeserializer(result.body);
}

/** Get the details of the specified active directory configuration */
export async function get(
  context: Client,
  resourceGroupName: string,
  activeDirectoryConfigName: string,
  options: ActiveDirectoryConfigsGetOptionalParams = { requestOptions: {} },
): Promise<ActiveDirectoryConfig> {
  const result = await _getSend(context, resourceGroupName, activeDirectoryConfigName, options);
  return _getDeserialize(result);
}
