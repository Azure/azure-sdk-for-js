// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  QueryKey,
  queryKeyDeserializer,
  _ListQueryKeysResult,
  _listQueryKeysResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  QueryKeysDeleteOptionalParams,
  QueryKeysListBySearchServiceOptionalParams,
  QueryKeysCreateOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  key: string,
  options: QueryKeysDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/deleteQueryKey/{key}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      key: key,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
        ...(options?.searchManagementRequestOptions?.clientRequestId !== undefined
          ? { "x-ms-client-request-id": options?.searchManagementRequestOptions?.clientRequestId }
          : {}),
        ...options.requestOptions?.headers,
      },
    });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204", "404"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/**
 * Deletes the specified query key. Unlike admin keys, query keys are not regenerated. The process for regenerating a query key is to delete and then recreate it.
 * Returns 200 (OK) on successful deletion, 204 (No Content) if the service exists but the query keys not found, or 404 (Not Found) if the service is not found.
 * NOTE: The behavior of returning 404 is inconsistent with ARM guidelines. Clients should expect a 204 response in future versions and avoid new dependencies on the 404 response.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  key: string,
  options: QueryKeysDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, searchServiceName, key, options);
  return _$deleteDeserialize(result);
}

export function _listBySearchServiceSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: QueryKeysListBySearchServiceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/listQueryKeys{?api%2Dversion}",
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
  return context
    .path(path)
    .post({
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

export async function _listBySearchServiceDeserialize(
  result: PathUncheckedResponse,
): Promise<_ListQueryKeysResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _listQueryKeysResultDeserializer(result.body);
}

/** Returns the list of query API keys for the given Azure AI Search service. */
export function listBySearchService(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  options: QueryKeysListBySearchServiceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<QueryKey> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySearchServiceSend(context, resourceGroupName, searchServiceName, options),
    _listBySearchServiceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  name: string,
  options: QueryKeysCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Search/searchServices/{searchServiceName}/createQueryKey/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      searchServiceName: searchServiceName,
      name: name,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
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

export async function _createDeserialize(result: PathUncheckedResponse): Promise<QueryKey> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return queryKeyDeserializer(result.body);
}

/** Generates a new query key for the specified search service. You can create up to 50 query keys per service. */
export async function create(
  context: Client,
  resourceGroupName: string,
  searchServiceName: string,
  name: string,
  options: QueryKeysCreateOptionalParams = { requestOptions: {} },
): Promise<QueryKey> {
  const result = await _createSend(context, resourceGroupName, searchServiceName, name, options);
  return _createDeserialize(result);
}
