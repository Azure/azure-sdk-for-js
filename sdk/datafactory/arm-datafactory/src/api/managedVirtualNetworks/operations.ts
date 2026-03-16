// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  ManagedVirtualNetworkResource,
  _ManagedVirtualNetworkListResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  managedVirtualNetworkResourceSerializer,
  managedVirtualNetworkResourceDeserializer,
  _managedVirtualNetworkListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedVirtualNetworksListByFactoryOptionalParams,
  ManagedVirtualNetworksCreateOrUpdateOptionalParams,
  ManagedVirtualNetworksGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: ManagedVirtualNetworksListByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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

export async function _listByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedVirtualNetworkListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _managedVirtualNetworkListResponseDeserializer(result.body);
}

/** Lists managed Virtual Networks. */
export function listByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  options: ManagedVirtualNetworksListByFactoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedVirtualNetworkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByFactorySend(context, resourceGroupName, factoryName, options),
    _listByFactoryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-06-01" },
  );
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  managedVirtualNetwork: ManagedVirtualNetworkResource,
  options: ManagedVirtualNetworksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      managedVirtualNetworkName: managedVirtualNetworkName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: managedVirtualNetworkResourceSerializer(managedVirtualNetwork),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedVirtualNetworkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return managedVirtualNetworkResourceDeserializer(result.body);
}

/** Creates or updates a managed Virtual Network. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  managedVirtualNetwork: ManagedVirtualNetworkResource,
  options: ManagedVirtualNetworksCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ManagedVirtualNetworkResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    factoryName,
    managedVirtualNetworkName,
    managedVirtualNetwork,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  options: ManagedVirtualNetworksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      managedVirtualNetworkName: managedVirtualNetworkName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedVirtualNetworkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return managedVirtualNetworkResourceDeserializer(result.body);
}

/** Gets a managed Virtual Network. */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  options: ManagedVirtualNetworksGetOptionalParams = { requestOptions: {} },
): Promise<ManagedVirtualNetworkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    factoryName,
    managedVirtualNetworkName,
    options,
  );
  return _getDeserialize(result);
}
