// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetrics } from "../../api/collectionRegion/operations.js";
import type { CollectionRegionListMetricsOptionalParams } from "../../api/collectionRegion/options.js";
import type { Metric } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CollectionRegion operations. */
export interface CollectionRegionOperations {
  /** Retrieves the metrics determined by the given filter for the given database account, collection and region. */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    region: string,
    databaseRid: string,
    collectionRid: string,
    filter: string,
    options?: CollectionRegionListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<Metric>;
}

function _getCollectionRegion(context: CosmosDBManagementContext) {
  return {
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      region: string,
      databaseRid: string,
      collectionRid: string,
      filter: string,
      options?: CollectionRegionListMetricsOptionalParams,
    ) =>
      listMetrics(
        context,
        resourceGroupName,
        accountName,
        region,
        databaseRid,
        collectionRid,
        filter,
        options,
      ),
  };
}

export function _getCollectionRegionOperations(
  context: CosmosDBManagementContext,
): CollectionRegionOperations {
  return {
    ..._getCollectionRegion(context),
  };
}
