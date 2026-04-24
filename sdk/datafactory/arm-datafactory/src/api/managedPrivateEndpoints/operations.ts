// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  ManagedPrivateEndpointResource,
  _ManagedPrivateEndpointListResponse,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  managedPrivateEndpointResourceSerializer,
  managedPrivateEndpointResourceDeserializer,
  _managedPrivateEndpointListResponseDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ManagedPrivateEndpointsListByFactoryOptionalParams,
  ManagedPrivateEndpointsDeleteOptionalParams,
  ManagedPrivateEndpointsCreateOrUpdateOptionalParams,
  ManagedPrivateEndpointsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByFactorySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  options: ManagedPrivateEndpointsListByFactoryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints{?api%2Dversion}",
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
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listByFactoryDeserialize(
  result: PathUncheckedResponse,
): Promise<_ManagedPrivateEndpointListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _managedPrivateEndpointListResponseDeserializer(result.body);
}

/** Lists managed private endpoints. */
export function listByFactory(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  options: ManagedPrivateEndpointsListByFactoryOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ManagedPrivateEndpointResource> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByFactorySend(
        context,
        resourceGroupName,
        factoryName,
        managedVirtualNetworkName,
        options,
      ),
    _listByFactoryDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2018-06-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  managedPrivateEndpointName: string,
  options: ManagedPrivateEndpointsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      managedVirtualNetworkName: managedVirtualNetworkName,
      managedPrivateEndpointName: managedPrivateEndpointName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a managed private endpoint. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  managedPrivateEndpointName: string,
  options: ManagedPrivateEndpointsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    factoryName,
    managedVirtualNetworkName,
    managedPrivateEndpointName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  managedPrivateEndpointName: string,
  managedPrivateEndpoint: ManagedPrivateEndpointResource,
  options: ManagedPrivateEndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      managedVirtualNetworkName: managedVirtualNetworkName,
      managedPrivateEndpointName: managedPrivateEndpointName,
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
    body: managedPrivateEndpointResourceSerializer(managedPrivateEndpoint),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ManagedPrivateEndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return managedPrivateEndpointResourceDeserializer(result.body);
}

/** Creates or updates a managed private endpoint. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  managedPrivateEndpointName: string,
  managedPrivateEndpoint: ManagedPrivateEndpointResource,
  options: ManagedPrivateEndpointsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<ManagedPrivateEndpointResource> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    factoryName,
    managedVirtualNetworkName,
    managedPrivateEndpointName,
    managedPrivateEndpoint,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  managedPrivateEndpointName: string,
  options: ManagedPrivateEndpointsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/managedVirtualNetworks/{managedVirtualNetworkName}/managedPrivateEndpoints/{managedPrivateEndpointName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      managedVirtualNetworkName: managedVirtualNetworkName,
      managedPrivateEndpointName: managedPrivateEndpointName,
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
): Promise<ManagedPrivateEndpointResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return managedPrivateEndpointResourceDeserializer(result.body);
}

/** Gets a managed private endpoint. */
export async function get(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  managedVirtualNetworkName: string,
  managedPrivateEndpointName: string,
  options: ManagedPrivateEndpointsGetOptionalParams = { requestOptions: {} },
): Promise<ManagedPrivateEndpointResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    factoryName,
    managedVirtualNetworkName,
    managedPrivateEndpointName,
    options,
  );
  return _getDeserialize(result);
}
