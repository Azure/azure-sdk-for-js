// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import type {
  VirtualHubRouteTableV2,
  _ListVirtualHubRouteTableV2SResult,
} from "../../models/microsoft/network/models.js";
import {
  cloudErrorDeserializer,
  errorDeserializer,
  virtualHubRouteTableV2Serializer,
  virtualHubRouteTableV2Deserializer,
  _listVirtualHubRouteTableV2SResultDeserializer,
} from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualHubRouteTableV2SListOptionalParams,
  VirtualHubRouteTableV2SDeleteOptionalParams,
  VirtualHubRouteTableV2SCreateOrUpdateOptionalParams,
  VirtualHubRouteTableV2SGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubRouteTableV2SListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
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
): Promise<_ListVirtualHubRouteTableV2SResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _listVirtualHubRouteTableV2SResultDeserializer(result.body);
}

/** Retrieves the details of all VirtualHubRouteTableV2s. */
export function list(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  options: VirtualHubRouteTableV2SListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<VirtualHubRouteTableV2> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, virtualHubName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  routeTableName: string,
  options: VirtualHubRouteTableV2SDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables/{routeTableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      routeTableName: routeTableName,
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
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a VirtualHubRouteTableV2. */
/**
 *  @fixme Delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  routeTableName: string,
  options: VirtualHubRouteTableV2SDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, virtualHubName, routeTableName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  routeTableName: string,
  virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2,
  options: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables/{routeTableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      routeTableName: routeTableName,
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
    body: virtualHubRouteTableV2Serializer(virtualHubRouteTableV2Parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualHubRouteTableV2> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return virtualHubRouteTableV2Deserializer(result.body);
}

/** Creates a VirtualHubRouteTableV2 resource if it doesn't exist else updates the existing VirtualHubRouteTableV2. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  routeTableName: string,
  virtualHubRouteTableV2Parameters: VirtualHubRouteTableV2,
  options: VirtualHubRouteTableV2SCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<VirtualHubRouteTableV2>, VirtualHubRouteTableV2> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        virtualHubName,
        routeTableName,
        virtualHubRouteTableV2Parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-05-01",
  }) as PollerLike<OperationState<VirtualHubRouteTableV2>, VirtualHubRouteTableV2>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  routeTableName: string,
  options: VirtualHubRouteTableV2SGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualHubs/{virtualHubName}/routeTables/{routeTableName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      virtualHubName: virtualHubName,
      routeTableName: routeTableName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualHubRouteTableV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorDeserializer(result.body);

    throw error;
  }

  return virtualHubRouteTableV2Deserializer(result.body);
}

/** Retrieves the details of a VirtualHubRouteTableV2. */
export async function get(
  context: Client,
  resourceGroupName: string,
  virtualHubName: string,
  routeTableName: string,
  options: VirtualHubRouteTableV2SGetOptionalParams = { requestOptions: {} },
): Promise<VirtualHubRouteTableV2> {
  const result = await _getSend(
    context,
    resourceGroupName,
    virtualHubName,
    routeTableName,
    options,
  );
  return _getDeserialize(result);
}
