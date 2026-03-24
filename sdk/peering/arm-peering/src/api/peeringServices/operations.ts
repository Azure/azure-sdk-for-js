// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PeeringManagementContext as Client } from "../index.js";
import type {
  ResourceTags,
  PeeringService,
  _PeeringServiceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  resourceTagsSerializer,
  peeringServiceSerializer,
  peeringServiceDeserializer,
  _peeringServiceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PeeringServicesInitializeConnectionMonitorOptionalParams,
  PeeringServicesListBySubscriptionOptionalParams,
  PeeringServicesListByResourceGroupOptionalParams,
  PeeringServicesDeleteOptionalParams,
  PeeringServicesUpdateOptionalParams,
  PeeringServicesCreateOrUpdateOptionalParams,
  PeeringServicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _initializeConnectionMonitorSend(
  context: Client,
  options: PeeringServicesInitializeConnectionMonitorOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/initializeConnectionMonitor{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
}

export async function _initializeConnectionMonitorDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Initialize Peering Service for Connection Monitor functionality */
export async function initializeConnectionMonitor(
  context: Client,
  options: PeeringServicesInitializeConnectionMonitorOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _initializeConnectionMonitorSend(context, options);
  return _initializeConnectionMonitorDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: PeeringServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Peering/peeringServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PeeringServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _peeringServiceListResultDeserializer(result.body);
}

/** Lists all of the peerings under the given subscription. */
export function listBySubscription(
  context: Client,
  options: PeeringServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeeringService> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PeeringServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PeeringServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _peeringServiceListResultDeserializer(result.body);
}

/** Lists all of the peering services under the given subscription and resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PeeringServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PeeringService> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  options: PeeringServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

/** Deletes an existing peering service with the specified name under the given subscription and resource group. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  options: PeeringServicesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, peeringServiceName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  tags: ResourceTags,
  options: PeeringServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceTagsSerializer(tags),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<PeeringService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringServiceDeserializer(result.body);
}

/** Updates tags for a peering service with the specified name under the given subscription and resource group. */
export async function update(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  tags: ResourceTags,
  options: PeeringServicesUpdateOptionalParams = { requestOptions: {} },
): Promise<PeeringService> {
  const result = await _updateSend(context, resourceGroupName, peeringServiceName, tags, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  peeringService: PeeringService,
  options: PeeringServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: peeringServiceSerializer(peeringService),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PeeringService> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringServiceDeserializer(result.body);
}

/** Creates a new peering service or updates an existing peering with the specified name under the given subscription and resource group. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  peeringService: PeeringService,
  options: PeeringServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PeeringService> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    peeringServiceName,
    peeringService,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  options: PeeringServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Peering/peeringServices/{peeringServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      peeringServiceName: peeringServiceName,
      "api%2Dversion": context.apiVersion ?? "2025-05-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PeeringService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return peeringServiceDeserializer(result.body);
}

/** Gets an existing peering service with the specified name under the given subscription and resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  peeringServiceName: string,
  options: PeeringServicesGetOptionalParams = { requestOptions: {} },
): Promise<PeeringService> {
  const result = await _getSend(context, resourceGroupName, peeringServiceName, options);
  return _getDeserialize(result);
}
