// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { listMetrics } from "../../api/partitionKeyRangeId/operations.js";
import type { PartitionKeyRangeIdListMetricsOptionalParams } from "../../api/partitionKeyRangeId/options.js";
import type { PartitionMetric } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PartitionKeyRangeId operations. */
export interface PartitionKeyRangeIdOperations {
  /** Retrieves the metrics determined by the given filter for the given partition key range id. */
  listMetrics: (
    resourceGroupName: string,
    accountName: string,
    databaseRid: string,
    collectionRid: string,
    partitionKeyRangeId: string,
    filter: string,
    options?: PartitionKeyRangeIdListMetricsOptionalParams,
  ) => PagedAsyncIterableIterator<PartitionMetric>;
}

function _getPartitionKeyRangeId(context: CosmosDBManagementContext) {
  return {
    listMetrics: (
      resourceGroupName: string,
      accountName: string,
      databaseRid: string,
      collectionRid: string,
      partitionKeyRangeId: string,
      filter: string,
      options?: PartitionKeyRangeIdListMetricsOptionalParams,
    ) =>
      listMetrics(
        context,
        resourceGroupName,
        accountName,
        databaseRid,
        collectionRid,
        partitionKeyRangeId,
        filter,
        options,
      ),
  };
}

export function _getPartitionKeyRangeIdOperations(
  context: CosmosDBManagementContext,
): PartitionKeyRangeIdOperations {
  return {
    ..._getPartitionKeyRangeId(context),
  };
}
