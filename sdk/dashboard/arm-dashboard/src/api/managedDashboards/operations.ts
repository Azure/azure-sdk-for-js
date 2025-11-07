// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DashboardManagementContext as Client } from "../index.js";
import type {
  ManagedDashboard,
  ManagedDashboardUpdateParameters,
  _ManagedDashboardListResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedDashboardSerializer,
  managedDashboardDeserializer,
  managedDashboardUpdateParametersSerializer,
  _managedDashboardListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedDashboardsListBySubscriptionOptionalParams,
  ManagedDashboardsListOptionalParams,
  ManagedDashboardsDeleteOptionalParams,
  ManagedDashboardsUpdateOptionalParams,
  ManagedDashboardsCreateOptionalParams,
  ManagedDashboardsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: ManagedDashboardsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Dashboard/dashboards{?api%2Dversion}",
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
): Promise<_ManagedDashboardListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedDashboardListResponseDeserializer(result.body);
}

/** List all resources of dashboards under the specified subscription. */
export function listBySubscription(
  context: Client,
  options: ManagedDashboardsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ManagedDashboard> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: ManagedDashboardsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedDashboardListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedDashboardListResponseDeserializer(result.body);
}

/** List all resources of dashboards under the specified resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: ManagedDashboardsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedDashboard> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  options: ManagedDashboardsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dashboardName: dashboardName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
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

/** Delete a dashboard for Grafana resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  options: ManagedDashboardsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, dashboardName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  requestBodyParameters: ManagedDashboardUpdateParameters,
  options: ManagedDashboardsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dashboardName: dashboardName,
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
    body: managedDashboardUpdateParametersSerializer(requestBodyParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ManagedDashboard> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedDashboardDeserializer(result.body);
}

/** Update a dashboard for Grafana resource. */
export async function update(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  requestBodyParameters: ManagedDashboardUpdateParameters,
  options: ManagedDashboardsUpdateOptionalParams = { requestOptions: {} },
): Promise<ManagedDashboard> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    dashboardName,
    requestBodyParameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  requestBodyParameters: ManagedDashboard,
  options: ManagedDashboardsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dashboardName: dashboardName,
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
    body: managedDashboardSerializer(requestBodyParameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<ManagedDashboard> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedDashboardDeserializer(result.body);
}

/** Create or update a dashboard for grafana resource. This API is idempotent, so user can either create a new dashboard or update an existing dashboard. */
export function create(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  requestBodyParameters: ManagedDashboard,
  options: ManagedDashboardsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedDashboard>, ManagedDashboard> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, dashboardName, requestBodyParameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ManagedDashboard>, ManagedDashboard>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  options: ManagedDashboardsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/dashboards/{dashboardName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      dashboardName: dashboardName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedDashboard> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedDashboardDeserializer(result.body);
}

/** Get the properties of a specific dashboard for grafana resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  dashboardName: string,
  options: ManagedDashboardsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedDashboard> {
  const result = await _getSend(context, resourceGroupName, dashboardName, options);
  return _getDeserialize(result);
}
