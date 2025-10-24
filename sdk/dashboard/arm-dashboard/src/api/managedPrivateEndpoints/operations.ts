// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DashboardManagementContext as Client } from "../index.js";
import type {
  ManagedPrivateEndpointModel,
  ManagedPrivateEndpointUpdateParameters,
  _ManagedPrivateEndpointModelListResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  managedPrivateEndpointModelSerializer,
  managedPrivateEndpointModelDeserializer,
  managedPrivateEndpointUpdateParametersSerializer,
  _managedPrivateEndpointModelListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedPrivateEndpointsListOptionalParams,
  ManagedPrivateEndpointsDeleteOptionalParams,
  ManagedPrivateEndpointsUpdateOptionalParams,
  ManagedPrivateEndpointsCreateOptionalParams,
  ManagedPrivateEndpointsGetOptionalParams,
  ManagedPrivateEndpointsRefreshOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ManagedPrivateEndpointsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints{?api%2Dversion}",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedPrivateEndpointModelListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _managedPrivateEndpointModelListResponseDeserializer(result.body);
}

/** List all managed private endpoints of a grafana resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ManagedPrivateEndpointsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedPrivateEndpointModel> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedPrivateEndpointName: string,
  options: ManagedPrivateEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints/{managedPrivateEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedPrivateEndpointName: managedPrivateEndpointName,
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

/** Delete a managed private endpoint for a grafana resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedPrivateEndpointName: string,
  options: ManagedPrivateEndpointsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, workspaceName, managedPrivateEndpointName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedPrivateEndpointName: string,
  requestBodyParameters: ManagedPrivateEndpointUpdateParameters,
  options: ManagedPrivateEndpointsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints/{managedPrivateEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedPrivateEndpointName: managedPrivateEndpointName,
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
    body: managedPrivateEndpointUpdateParametersSerializer(requestBodyParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedPrivateEndpointModel> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedPrivateEndpointModelDeserializer(result.body);
}

/** Update a managed private endpoint for an existing grafana resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedPrivateEndpointName: string,
  requestBodyParameters: ManagedPrivateEndpointUpdateParameters,
  options: ManagedPrivateEndpointsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedPrivateEndpointModel>, ManagedPrivateEndpointModel> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        workspaceName,
        managedPrivateEndpointName,
        requestBodyParameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<ManagedPrivateEndpointModel>, ManagedPrivateEndpointModel>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedPrivateEndpointName: string,
  requestBodyParameters: ManagedPrivateEndpointModel,
  options: ManagedPrivateEndpointsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints/{managedPrivateEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedPrivateEndpointName: managedPrivateEndpointName,
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
    body: managedPrivateEndpointModelSerializer(requestBodyParameters),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedPrivateEndpointModel> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedPrivateEndpointModelDeserializer(result.body);
}

/** Create or update a managed private endpoint for a grafana resource. */
export function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedPrivateEndpointName: string,
  requestBodyParameters: ManagedPrivateEndpointModel,
  options: ManagedPrivateEndpointsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ManagedPrivateEndpointModel>, ManagedPrivateEndpointModel> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        workspaceName,
        managedPrivateEndpointName,
        requestBodyParameters,
        options,
      ),
    resourceLocationConfig: "original-uri",
  }) as PollerLike<OperationState<ManagedPrivateEndpointModel>, ManagedPrivateEndpointModel>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedPrivateEndpointName: string,
  options: ManagedPrivateEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/managedPrivateEndpoints/{managedPrivateEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      managedPrivateEndpointName: managedPrivateEndpointName,
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
): Promise<ManagedPrivateEndpointModel> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return managedPrivateEndpointModelDeserializer(result.body);
}

/** Get a specific managed private endpoint of a grafana resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  managedPrivateEndpointName: string,
  options: ManagedPrivateEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedPrivateEndpointModel> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    managedPrivateEndpointName,
    options,
  );
  return _getDeserialize(result);
}

export function _refreshSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ManagedPrivateEndpointsRefreshOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Dashboard/grafana/{workspaceName}/refreshManagedPrivateEndpoints{?api%2Dversion}",
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
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _refreshDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Refresh and sync managed private endpoints of a grafana resource to latest state. */
export function refresh(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  options: ManagedPrivateEndpointsRefreshOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _refreshDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _refreshSend(context, resourceGroupName, workspaceName, options),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<void>, void>;
}
