// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OracleDatabaseManagementContext as Client } from "../index.js";
import type {
  VirtualNetworkAddress,
  _VirtualNetworkAddressListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  virtualNetworkAddressSerializer,
  virtualNetworkAddressDeserializer,
  _virtualNetworkAddressListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  VirtualNetworkAddressesListByParentOptionalParams,
  VirtualNetworkAddressesDeleteOptionalParams,
  VirtualNetworkAddressesGetOptionalParams,
  VirtualNetworkAddressesCreateOrUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByParentSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  options: VirtualNetworkAddressesListByParentOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/virtualNetworkAddresses{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
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

export async function _listByParentDeserialize(
  result: PathUncheckedResponse,
): Promise<_VirtualNetworkAddressListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _virtualNetworkAddressListResultDeserializer(result.body);
}

/** List VirtualNetworkAddress resources by CloudVmCluster */
export function listByParent(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  options: VirtualNetworkAddressesListByParentOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<VirtualNetworkAddress> {
  return buildPagedAsyncIterator(
    context,
    () => _listByParentSend(context, resourceGroupName, cloudvmclustername, options),
    _listByParentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  virtualnetworkaddressname: string,
  options: VirtualNetworkAddressesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/virtualNetworkAddresses/{virtualnetworkaddressname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
      virtualnetworkaddressname: virtualnetworkaddressname,
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

/** Delete a VirtualNetworkAddress */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  virtualnetworkaddressname: string,
  options: VirtualNetworkAddressesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        cloudvmclustername,
        virtualnetworkaddressname,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  virtualnetworkaddressname: string,
  options: VirtualNetworkAddressesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/virtualNetworkAddresses/{virtualnetworkaddressname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
      virtualnetworkaddressname: virtualnetworkaddressname,
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
): Promise<VirtualNetworkAddress> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return virtualNetworkAddressDeserializer(result.body);
}

/** Get a VirtualNetworkAddress */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  virtualnetworkaddressname: string,
  options: VirtualNetworkAddressesGetOptionalParams = { requestOptions: {} },
): Promise<VirtualNetworkAddress> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudvmclustername,
    virtualnetworkaddressname,
    options,
  );
  return _getDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  virtualnetworkaddressname: string,
  resource: VirtualNetworkAddress,
  options: VirtualNetworkAddressesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Oracle.Database/cloudVmClusters/{cloudvmclustername}/virtualNetworkAddresses/{virtualnetworkaddressname}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudvmclustername: cloudvmclustername,
      virtualnetworkaddressname: virtualnetworkaddressname,
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
    body: virtualNetworkAddressSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<VirtualNetworkAddress> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return virtualNetworkAddressDeserializer(result.body);
}

/** Create a VirtualNetworkAddress */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudvmclustername: string,
  virtualnetworkaddressname: string,
  resource: VirtualNetworkAddress,
  options: VirtualNetworkAddressesCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<VirtualNetworkAddress>, VirtualNetworkAddress> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        cloudvmclustername,
        virtualnetworkaddressname,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<VirtualNetworkAddress>, VirtualNetworkAddress>;
}
