// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext as Client } from "../index.js";
import type {
  CheckNameAvailabilityOutput,
  SearchService,
  SearchServiceUpdate,
  _SearchServiceListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  checkNameAvailabilityOutputDeserializer,
  searchServiceSerializer,
  searchServiceDeserializer,
  searchServiceUpdateSerializer,
  _searchServiceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServicesUpgradeOptionalParams,
  ServicesListBySubscriptionOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
  ServicesCheckNameAvailabilityOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _upgradeSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: ServicesUpgradeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/upgrade{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _upgradeDeserialize(result: PathUncheckedResponse): Promise<SearchService> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return searchServiceDeserializer(result.body);
}

/** Upgrades the Azure AI Search service to the latest version available. */
export function upgrade(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: ServicesUpgradeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SearchService>, SearchService> {
  return getLongRunningPoller(context, _upgradeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _upgradeSend(context, resourceGroupName, searchServiceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<SearchService>, SearchService>;
}

export function _listBySubscriptionSend(
  context: Client,
  options: ServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Search/searchServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SearchServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _searchServiceListResultDeserializer(result.body);
}

/** Gets a list of all search services in the given subscription. */
export function listBySubscription(
  context: Client,
  options: ServicesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SearchService> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SearchServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _searchServiceListResultDeserializer(result.body);
}

/** Gets a list of all search services in the given resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SearchService> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
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

/**
 * Deletes a search service in the given resource group, along with its associated resources.
 * Returns 200 (OK) on successful deletion, or 204 (No Content) if the service is not found.
 */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, searchServiceName, options);
  return _$deleteDeserialize(result);
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  service: SearchServiceUpdate,
  options: ServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: searchServiceUpdateSerializer(service),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SearchService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return searchServiceDeserializer(result.body);
}

/** Updates an existing search service in the given resource group. */
export async function update(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  service: SearchServiceUpdate,
  options: ServicesUpdateOptionalParams = { requestOptions: {} },
): Promise<SearchService> {
  const result = await _updateSend(context, resourceGroupName, searchServiceName, service, options);
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  service: SearchService,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: searchServiceSerializer(service),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SearchService> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return searchServiceDeserializer(result.body);
}

/** Creates or updates a search service in the given resource group. If the search service already exists, all properties will be updated with the given values. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  service: SearchService,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SearchService>, SearchService> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, searchServiceName, service, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<SearchService>, SearchService>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SearchService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return searchServiceDeserializer(result.body);
}

/** Gets the search service with the given name in the given resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): Promise<SearchService> {
  const result = await _getSend(context, resourceGroupName, searchServiceName, options);
  return _getDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  name: string,
  options: ServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Search/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: { name: name, type: "searchServices" },
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return checkNameAvailabilityOutputDeserializer(result.body);
}

/** Checks whether or not the given search service name is available for use. Search service names must be globally unique since they are part of the service URI (https://<name>.search.windows.net). */
export async function checkNameAvailability(
  context: Client,
  name: string,
  options: ServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityOutput> {
  const result = await _checkNameAvailabilitySend(context, name, options);
  return _checkNameAvailabilityDeserialize(result);
}
