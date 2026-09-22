// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetrics } from "../../api/collectionPartitionRegion/operations.js";
import type { CollectionPartitionRegionListMetricsOptionalParams } from "../../api/collectionPartitionRegion/options.js";
import type { PartitionMetric } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CollectionPartitionRegion operations. */
export interface CollectionPartitionRegionOperations {
  /** Retrieves the metrics determined by the given filter for the given collection and region, split by partition. */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    region: string,
    databaseRid: string,
    collectionRid: string,
    filter: string,
    options?: CollectionPartitionRegionListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<PartitionMetric>;
}

function _getCollectionPartitionRegion(context: CosmosDBManagementContext) {
  return {
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      region: string,
      databaseRid: string,
      collectionRid: string,
      filter: string,
      options?: CollectionPartitionRegionListMetricsOptionalParams,
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

export function _getCollectionPartitionRegionOperations(
  context: CosmosDBManagementContext,
): CollectionPartitionRegionOperations {
  return {
    ..._getCollectionPartitionRegion(context),
  };
}
