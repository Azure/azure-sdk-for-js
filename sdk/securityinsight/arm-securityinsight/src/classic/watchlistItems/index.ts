// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/watchlistItems/operations.js";
import type {
  WatchlistItemsListOptionalParams,
  WatchlistItemsDeleteOptionalParams,
  WatchlistItemsCreateOrUpdateOptionalParams,
  WatchlistItemsGetOptionalParams,
} from "../../api/watchlistItems/options.js";
import type { WatchlistItem } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WatchlistItems operations. */
export interface WatchlistItemsOperations {
  /** Get all watchlist Items. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    options?: WatchlistItemsListOptionalParams,
  ) => PagedAsyncIterableIterator<WatchlistItem>;
  /** Delete a watchlist item. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    watchlistItemId: string,
    options?: WatchlistItemsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a watchlist item. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    watchlistItemId: string,
    watchlistItem: WatchlistItem,
    options?: WatchlistItemsCreateOrUpdateOptionalParams,
  ) => Promise<WatchlistItem>;
  /** Get a watchlist item. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    watchlistItemId: string,
    options?: WatchlistItemsGetOptionalParams,
  ) => Promise<WatchlistItem>;
}

function _getWatchlistItems(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      options?: WatchlistItemsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, watchlistAlias, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      watchlistItemId: string,
      options?: WatchlistItemsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, workspaceName, watchlistAlias, watchlistItemId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      watchlistItemId: string,
      watchlistItem: WatchlistItem,
      options?: WatchlistItemsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        watchlistAlias,
        watchlistItemId,
        watchlistItem,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      watchlistItemId: string,
      options?: WatchlistItemsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, watchlistAlias, watchlistItemId, options),
  };
}

export function _getWatchlistItemsOperations(
  context: SecurityInsightsContext,
): WatchlistItemsOperations {
  return {
    ..._getWatchlistItems(context),
  };
}
