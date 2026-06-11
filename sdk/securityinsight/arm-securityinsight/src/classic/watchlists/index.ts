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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    options?: WatchlistsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    options?: WatchlistsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    options?: WatchlistsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a Watchlist and its Watchlist Items (bulk creation, e.g. through text/csv content type). To create a Watchlist and its Items, we should call this endpoint with rawContent and contentType properties. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    watchlist: Watchlist,
    options?: WatchlistsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Watchlist>, Watchlist>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    watchlist: Watchlist,
    options?: WatchlistsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Watchlist>, Watchlist>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    watchlistAlias: string,
    watchlist: Watchlist,
    options?: WatchlistsCreateOrUpdateOptionalParams,
  ) => Promise<Watchlist>;
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
    beginDelete: async (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      options?: WatchlistsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, workspaceName, watchlistAlias, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      options?: WatchlistsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, workspaceName, watchlistAlias, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      watchlist: Watchlist,
      options?: WatchlistsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, workspaceName, watchlistAlias, watchlist, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      watchlist: Watchlist,
      options?: WatchlistsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        watchlistAlias,
        watchlist,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      watchlistAlias: string,
      watchlist: Watchlist,
      options?: WatchlistsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        watchlistAlias,
        watchlist,
        options,
      );
    },
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
