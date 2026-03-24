// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/watchlists/operations.js";
import type {
  WatchlistsListOptionalParams,
  WatchlistsDeleteOptionalParams,
  WatchlistsCreateOrUpdateOptionalParams,
  WatchlistsGetOptionalParams,
} from "../../api/watchlists/options.js";
import type { Watchlist } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Watchlists operations. */
export interface WatchlistsOperations {
  /** Get all watchlists, without watchlist items. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WatchlistsListOptionalParams,
  ) => PagedAsyncIterableIterator<Watchlist>;
  /** Delete a watchlist. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    options?: WatchlistsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a Watchlist and its Watchlist Items (bulk creation, e.g. through text/csv content type). To create a Watchlist and its Items, we should call this endpoint with rawContent and contentType properties. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    watchlist: Watchlist,
    options?: WatchlistsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Watchlist>, Watchlist>;
  /** Get a watchlist, without its watchlist items. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    options?: WatchlistsGetOptionalParams,
  ) => Promise<Watchlist>;
}

function _getWatchlists(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WatchlistsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      options?: WatchlistsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, watchlistAlias, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      watchlist: Watchlist,
      options?: WatchlistsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, workspaceName, watchlistAlias, watchlist, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      options?: WatchlistsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, watchlistAlias, options),
  };
}

export function _getWatchlistsOperations(context: SecurityInsightsContext): WatchlistsOperations {
  return {
    ..._getWatchlists(context),
  };
}
