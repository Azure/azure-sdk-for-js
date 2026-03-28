// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetrics } from "../../api/partitionKeyRangeIdRegion/operations.js";
import type { PartitionKeyRangeIdRegionListMetricsOptionalParams } from "../../api/partitionKeyRangeIdRegion/options.js";
import type { PartitionMetric } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PartitionKeyRangeIdRegion operations. */
export interface PartitionKeyRangeIdRegionOperations {
  /** Retrieves the metrics determined by the given filter for the given partition key range id and region. */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    region: string,
    databaseRid: string,
    collectionRid: string,
    partitionKeyRangeId: string,
    filter: string,
    options?: PartitionKeyRangeIdRegionListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<PartitionMetric>;
}

function _getPartitionKeyRangeIdRegion(context: CosmosDBManagementContext) {
  return {
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      region: string,
      databaseRid: string,
      collectionRid: string,
      partitionKeyRangeId: string,
      filter: string,
      options?: PartitionKeyRangeIdRegionListMetricsOptionalParams,
    ) =>
      listMetrics(
        context,
        resourceGroupName,
        accountName,
        region,
        databaseRid,
        collectionRid,
        partitionKeyRangeId,
        filter,
        options,
      ),
  };
}

export function _getPartitionKeyRangeIdRegionOperations(
  context: CosmosDBManagementContext,
): PartitionKeyRangeIdRegionOperations {
  return {
    ..._getPartitionKeyRangeIdRegion(context),
  };
}
