// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgrammableConnectivityContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  OperatorApiConnection,
  operatorApiConnectionSerializer,
  operatorApiConnectionDeserializer,
  OperatorApiConnectionUpdate,
  operatorApiConnectionUpdateSerializer,
  _OperatorApiConnectionListResult,
  _operatorApiConnectionListResultDeserializer,
} from "../../models/models.js";
import {
  OperatorApiConnectionsListBySubscriptionOptionalParams,
  OperatorApiConnectionsListByResourceGroupOptionalParams,
  OperatorApiConnectionsDeleteOptionalParams,
  OperatorApiConnectionsUpdateOptionalParams,
  OperatorApiConnectionsCreateOptionalParams,
  OperatorApiConnectionsGetOptionalParams,
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
  options: OperatorApiConnectionsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProgrammableConnectivity/operatorApiConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_OperatorApiConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _operatorApiConnectionListResultDeserializer(result.body);
}

/** List OperatorApiConnection resources by subscription ID. */
export function listBySubscription(
  context: Client,
  options: OperatorApiConnectionsListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OperatorApiConnection> {
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
  options: OperatorApiConnectionsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProgrammableConnectivity/operatorApiConnections{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_OperatorApiConnectionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _operatorApiConnectionListResultDeserializer(result.body);
}

/** List OperatorApiConnection resources by resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: OperatorApiConnectionsListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<OperatorApiConnection> {
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
  operatorApiConnectionName: string,
  options: OperatorApiConnectionsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProgrammableConnectivity/operatorApiConnections/{operatorApiConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      operatorApiConnectionName: operatorApiConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .delete({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Delete an Operator API Connection. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  operatorApiConnectionName: string,
  options: OperatorApiConnectionsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(
    context,
    _$deleteDeserialize,
    ["202", "204", "200"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _$deleteSend(
          context,
          resourceGroupName,
          operatorApiConnectionName,
          options,
        ),
      resourceLocationConfig: "location",
    },
  ) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  operatorApiConnectionName: string,
  properties: OperatorApiConnectionUpdate,
  options: OperatorApiConnectionsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProgrammableConnectivity/operatorApiConnections/{operatorApiConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      operatorApiConnectionName: operatorApiConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: operatorApiConnectionUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<OperatorApiConnection> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operatorApiConnectionDeserializer(result.body);
}

/** Update an Operator API Connection. */
export function update(
  context: Client,
  resourceGroupName: string,
  operatorApiConnectionName: string,
  properties: OperatorApiConnectionUpdate,
  options: OperatorApiConnectionsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperatorApiConnection>, OperatorApiConnection> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        operatorApiConnectionName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<
    OperationState<OperatorApiConnection>,
    OperatorApiConnection
  >;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  operatorApiConnectionName: string,
  resource: OperatorApiConnection,
  options: OperatorApiConnectionsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProgrammableConnectivity/operatorApiConnections/{operatorApiConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      operatorApiConnectionName: operatorApiConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
      body: operatorApiConnectionSerializer(resource),
    });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<OperatorApiConnection> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operatorApiConnectionDeserializer(result.body);
}

/** Create an Operator API Connection. */
export function create(
  context: Client,
  resourceGroupName: string,
  operatorApiConnectionName: string,
  resource: OperatorApiConnection,
  options: OperatorApiConnectionsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<OperatorApiConnection>, OperatorApiConnection> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        operatorApiConnectionName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<
    OperationState<OperatorApiConnection>,
    OperatorApiConnection
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  operatorApiConnectionName: string,
  options: OperatorApiConnectionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProgrammableConnectivity/operatorApiConnections/{operatorApiConnectionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      operatorApiConnectionName: operatorApiConnectionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: {
        accept: "application/json",
        ...options.requestOptions?.headers,
      },
    });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<OperatorApiConnection> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return operatorApiConnectionDeserializer(result.body);
}

/** Get an Operator API Connection. */
export async function get(
  context: Client,
  resourceGroupName: string,
  operatorApiConnectionName: string,
  options: OperatorApiConnectionsGetOptionalParams = { requestOptions: {} },
): Promise<OperatorApiConnection> {
  const result = await _getSend(
    context,
    resourceGroupName,
    operatorApiConnectionName,
    options,
  );
  return _getDeserialize(result);
}
