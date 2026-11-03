// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listUsages, listMetrics } from "../../api/collectionPartition/operations.js";
import type {
  CollectionPartitionListUsagesOptionalParams,
  CollectionPartitionListMetricsOptionalParams,
} from "../../api/collectionPartition/options.js";
import type { PartitionMetric, PartitionUsage } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CollectionPartition operations. */
export interface CollectionPartitionOperations {
  /** Retrieves the usages (most recent storage data) for the given collection, split by partition. */
  listUsages: (
    resourceGroupName: string,
    accountName: string,
    databaseRid: string,
    collectionRid: string,
    options?: CollectionPartitionListUsagesOptionalParams,
  ) => PagedAsyncIterableIterator<PartitionUsage>;
  /** Retrieves the metrics determined by the given filter for the given collection, split by partition. */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    databaseRid: string,
    collectionRid: string,
    filter: string,
    options?: CollectionPartitionListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<PartitionMetric>;
}

function _getCollectionPartition(context: CosmosDBManagementContext) {
  return {
    listUsages: (
      resourceGroupName: string,
      accountName: string,
      databaseRid: string,
      collectionRid: string,
      options?: CollectionPartitionListUsagesOptionalParams,
    ) => listUsages(context, resourceGroupName, accountName, databaseRid, collectionRid, options),
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      databaseRid: string,
      collectionRid: string,
      filter: string,
      options?: CollectionPartitionListMetricsOptionalParams,
    ) =>
      listMetrics(
        context,
        resourceGroupName,
        accountName,
        databaseRid,
        collectionRid,
        filter,
        options,
      ),
  };
}

export function _getCollectionPartitionOperations(
  context: CosmosDBManagementContext,
): CollectionPartitionOperations {
  return {
    ..._getCollectionPartition(context),
  };
}
