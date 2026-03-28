// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  BackendAddressPool,
  _LoadBalancerBackendAddressPoolListResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  backendAddressPoolSerializer,
  backendAddressPoolDeserializer,
  _loadBalancerBackendAddressPoolListResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LoadBalancerBackendAddressPoolsListOptionalParams,
  LoadBalancerBackendAddressPoolsDeleteOptionalParams,
  LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams,
  LoadBalancerBackendAddressPoolsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancerBackendAddressPoolsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      "api%2Dversion": "2025-05-01",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_LoadBalancerBackendAddressPoolListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _loadBalancerBackendAddressPoolListResultDeserializer(result.body);
}

/** Gets all the load balancer backed address pools. */
export function list(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  options: LoadBalancerBackendAddressPoolsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<BackendAddressPool> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, loadBalancerName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  backendAddressPoolName: string,
  options: LoadBalancerBackendAddressPoolsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendAddressPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      backendAddressPoolName: backendAddressPoolName,
      "api%2Dversion": "2025-05-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes the specified load balancer backend address pool. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  backendAddressPoolName: string,
  options: LoadBalancerBackendAddressPoolsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, loadBalancerName, backendAddressPoolName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  backendAddressPoolName: string,
  parameters: BackendAddressPool,
  options: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendAddressPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      backendAddressPoolName: backendAddressPoolName,
      "api%2Dversion": "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: backendAddressPoolSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<BackendAddressPool> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return backendAddressPoolDeserializer(result.body);
}

/** Creates or updates a load balancer backend address pool. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  backendAddressPoolName: string,
  parameters: BackendAddressPool,
  options: LoadBalancerBackendAddressPoolsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<BackendAddressPool>, BackendAddressPool> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        loadBalancerName,
        backendAddressPoolName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<BackendAddressPool>, BackendAddressPool>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  backendAddressPoolName: string,
  options: LoadBalancerBackendAddressPoolsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/loadBalancers/{loadBalancerName}/backendAddressPools/{backendAddressPoolName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      loadBalancerName: loadBalancerName,
      backendAddressPoolName: backendAddressPoolName,
      "api%2Dversion": "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<BackendAddressPool> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return backendAddressPoolDeserializer(result.body);
}

/** Gets load balancer backend address pool. */
export async function get(
  context: Client,
  resourceGroupName: string,
  loadBalancerName: string,
  backendAddressPoolName: string,
  options: LoadBalancerBackendAddressPoolsGetOptionalParams = { requestOptions: {} },
): Promise<BackendAddressPool> {
  const result = await _getSend(
    context,
    resourceGroupName,
    loadBalancerName,
    backendAddressPoolName,
    options,
  );
  return _getDeserialize(result);
}
