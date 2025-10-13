// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DashboardManagementContext as Client } from "../index.js";
import type {
  ManagedGrafana,
  ManagedGrafanaUpdateParameters,
  _ManagedGrafanaListResponse,
  EnterpriseDetails,
  GrafanaAvailablePluginListResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedGrafanaSerializer,
  managedGrafanaDeserializer,
  managedGrafanaUpdateParametersSerializer,
  _managedGrafanaListResponseDeserializer,
  enterpriseDetailsDeserializer,
  grafanaAvailablePluginListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  GrafanaFetchAvailablePluginsOptionalParams,
  GrafanaCheckEnterpriseDetailsOptionalParams,
  GrafanaListOptionalParams,
  GrafanaListByResourceGroupOptionalParams,
  GrafanaDeleteOptionalParams,
  GrafanaUpdateOptionalParams,
  GrafanaCreateOptionalParams,
  GrafanaGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _fetchAvailablePluginsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: GrafanaFetchAvailablePluginsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/fetchAvailablePlugins{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _fetchAvailablePluginsDeserialize(
  result: PathUncheckedResponse,
): Promise<GrafanaAvailablePluginListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return grafanaAvailablePluginListResponseDeserializer(result.body);
}

/** A synchronous resource action. */
export async function fetchAvailablePlugins(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: GrafanaFetchAvailablePluginsOptionalParams = { requestOptions: {} },
): Promise<GrafanaAvailablePluginListResponse> {
  const result = await _fetchAvailablePluginsSend(
    context,
    resourceGroupName,
    workspaceName,
    options,
  );
  return _fetchAvailablePluginsDeserialize(result);
}

export function _checkEnterpriseDetailsSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: GrafanaCheckEnterpriseDetailsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/checkEnterpriseDetails{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _checkEnterpriseDetailsDeserialize(
  result: PathUncheckedResponse,
): Promise<EnterpriseDetails> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return enterpriseDetailsDeserializer(result.body);
}

/** Retrieve enterprise add-on details information */
export async function checkEnterpriseDetails(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: GrafanaCheckEnterpriseDetailsOptionalParams = { requestOptions: {} },
): Promise<EnterpriseDetails> {
  const result = await _checkEnterpriseDetailsSend(
    context,
    resourceGroupName,
    workspaceName,
    options,
  );
  return _checkEnterpriseDetailsDeserialize(result);
}

export function _listSend(
  context: Client,
  options: GrafanaListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Dashboard/grafana{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedGrafanaListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedGrafanaListResponseDeserializer(result.body);
}

/** List all resources of workspaces for Grafana under the specified subscription. */
export function list(
  context: Client,
  options: GrafanaListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedGrafana> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: GrafanaListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana{?api%2Dversion}",
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
): Promise<_ManagedGrafanaListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedGrafanaListResponseDeserializer(result.body);
}

/** List all resources of workspaces for Grafana under the specified resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: GrafanaListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedGrafana> {
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
  workspaceName: string,
  options: GrafanaDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete a workspace for Grafana resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: GrafanaDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, workspaceName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  requestBodyParameters: ManagedGrafanaUpdateParameters,
  options: GrafanaUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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
    body: managedGrafanaUpdateParametersSerializer(requestBodyParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<ManagedGrafana> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedGrafanaDeserializer(result.body);
}

/** Update a workspace for Grafana resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  requestBodyParameters: ManagedGrafanaUpdateParameters,
  options: GrafanaUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedGrafana>, ManagedGrafana> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, workspaceName, requestBodyParameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ManagedGrafana>, ManagedGrafana>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  requestBodyParameters: ManagedGrafana,
  options: GrafanaCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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
    body: managedGrafanaSerializer(requestBodyParameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<ManagedGrafana> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedGrafanaDeserializer(result.body);
}

/** Create or update a workspace for Grafana resource. This API is idempotent, so user can either create a new grafana or update an existing grafana. */
export function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  requestBodyParameters: ManagedGrafana,
  options: GrafanaCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedGrafana>, ManagedGrafana> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, workspaceName, requestBodyParameters, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ManagedGrafana>, ManagedGrafana>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: GrafanaGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ManagedGrafana> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedGrafanaDeserializer(result.body);
}

/** Get the properties of a specific workspace for Grafana resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: GrafanaGetOptionalParams = { requestOptions: {} },
): Promise<ManagedGrafana> {
  const result = await _getSend(context, resourceGroupName, workspaceName, options);
  return _getDeserialize(result);
}
