// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SearchManagementContext as Client } from "../index.js";
import type {
  SharedPrivateLinkResource,
  _SharedPrivateLinkResourceListResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  sharedPrivateLinkResourceSerializer,
  sharedPrivateLinkResourceDeserializer,
  _sharedPrivateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SharedPrivateLinkResourcesListByServiceOptionalParams,
  SharedPrivateLinkResourcesDeleteOptionalParams,
  SharedPrivateLinkResourcesCreateOrUpdateOptionalParams,
  SharedPrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByServiceSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: SharedPrivateLinkResourcesListByServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/sharedPrivateLinkResources{?api%2Dversion}",
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

export async function _listByServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_SharedPrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _sharedPrivateLinkResourceListResultDeserializer(result.body);
}

/** Gets a list of all shared private link resources managed by the given service. */
export function listByService(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: SharedPrivateLinkResourcesListByServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SharedPrivateLinkResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByServiceSend(context, resourceGroupName, searchServiceName, options),
    _listByServiceDeserialize,
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
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      sharedPrivateLinkResourceName: sharedPrivateLinkResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "404", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/**
 * Initiates the deletion of the shared private link resource from the search service.
 * Returns 202 (Accepted) for asynchronous deletion, 204 (No Content) if the service exists but the shared private link is not found, or 404 (Not Found) if the service is not found.
 * NOTE: The behavior of returning 404 is inconsistent with ARM guidelines. Clients should expect a 204 response in future versions and avoid new dependencies on the 404 response.
 */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "404", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        searchServiceName,
        sharedPrivateLinkResourceName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  sharedPrivateLinkResourceName: string,
  sharedPrivateLinkResource: SharedPrivateLinkResource,
  options: SharedPrivateLinkResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      sharedPrivateLinkResourceName: sharedPrivateLinkResourceName,
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
      ...(options?.clientRequestId !== undefined
        ? { "x-ms-client-request-id": options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: sharedPrivateLinkResourceSerializer(sharedPrivateLinkResource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedPrivateLinkResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sharedPrivateLinkResourceDeserializer(result.body);
}

/** Initiates the creation or update of a shared private link resource managed by the search service in the given resource group. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  sharedPrivateLinkResourceName: string,
  sharedPrivateLinkResource: SharedPrivateLinkResource,
  options: SharedPrivateLinkResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        searchServiceName,
        sharedPrivateLinkResourceName,
        sharedPrivateLinkResource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<SharedPrivateLinkResource>, SharedPrivateLinkResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      sharedPrivateLinkResourceName: sharedPrivateLinkResourceName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<SharedPrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return sharedPrivateLinkResourceDeserializer(result.body);
}

/** Gets the details of the shared private link resource managed by the search service in the given resource group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  sharedPrivateLinkResourceName: string,
  options: SharedPrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<SharedPrivateLinkResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    searchServiceName,
    sharedPrivateLinkResourceName,
    options,
  );
  return _getDeserialize(result);
}
