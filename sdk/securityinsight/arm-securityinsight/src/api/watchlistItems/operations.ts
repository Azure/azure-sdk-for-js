// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { WatchlistItem, _WatchlistItemList } from "../../models/models.js";
import {
  cloudErrorDeserializer,
  watchlistItemSerializer,
  watchlistItemDeserializer,
  _watchlistItemListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WatchlistItemsListOptionalParams,
  WatchlistItemsDeleteOptionalParams,
  WatchlistItemsCreateOrUpdateOptionalParams,
  WatchlistItemsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  watchlistAlias: string,
  options: WatchlistItemsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}/watchlistItems{?api%2Dversion,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      watchlistAlias: watchlistAlias,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_WatchlistItemList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return _watchlistItemListDeserializer(result.body);
}

/** Get all watchlist Items. */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  watchlistAlias: string,
  options: WatchlistItemsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<WatchlistItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, workspaceName, watchlistAlias, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  watchlistAlias: string,
  watchlistItemId: string,
  options: WatchlistItemsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}/watchlistItems/{watchlistItemId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      watchlistAlias: watchlistAlias,
      watchlistItemId: watchlistItemId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

/** Delete a watchlist item. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  watchlistAlias: string,
  watchlistItemId: string,
  options: WatchlistItemsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    watchlistAlias,
    watchlistItemId,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  watchlistAlias: string,
  watchlistItemId: string,
  watchlistItem: WatchlistItem,
  options: WatchlistItemsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}/watchlistItems/{watchlistItemId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      watchlistAlias: watchlistAlias,
      watchlistItemId: watchlistItemId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: watchlistItemSerializer(watchlistItem),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<WatchlistItem> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return watchlistItemDeserializer(result.body);
}

/** Create or update a watchlist item. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  watchlistAlias: string,
  watchlistItemId: string,
  watchlistItem: WatchlistItem,
  options: WatchlistItemsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<WatchlistItem> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    workspaceName,
    watchlistAlias,
    watchlistItemId,
    watchlistItem,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  watchlistAlias: string,
  watchlistItemId: string,
  options: WatchlistItemsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/watchlists/{watchlistAlias}/watchlistItems/{watchlistItemId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      watchlistAlias: watchlistAlias,
      watchlistItemId: watchlistItemId,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<WatchlistItem> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return watchlistItemDeserializer(result.body);
}

/** Get a watchlist item. */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  watchlistAlias: string,
  watchlistItemId: string,
  options: WatchlistItemsGetOptionalParams = { requestOptions: {} },
): Promise<WatchlistItem> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    watchlistAlias,
    watchlistItemId,
    options,
  );
  return _getDeserialize(result);
}
