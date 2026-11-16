// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list, listByResourceGroup } from "../../api/throughputPools/operations.js";
import type {
  ThroughputPoolsListOptionalParams,
  ThroughputPoolsListByResourceGroupOptionalParams,
} from "../../api/throughputPools/options.js";
import type { ThroughputPoolResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ThroughputPools operations. */
export interface ThroughputPoolsOperations {
  /** Lists all the Azure Cosmos DB Throughput Pools available under the subscription. */
  list: (
    options?: ThroughputPoolsListOptionalParams,
  ) => PagedAsyncIterableIterator<ThroughputPoolResource>;
  /** List all the ThroughputPools in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ThroughputPoolsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ThroughputPoolResource>;
}

function _getThroughputPools(context: CosmosDBManagementContext) {
  return {
    list: (options?: ThroughputPoolsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ThroughputPoolsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
  };
}

export function _getThroughputPoolsOperations(
  context: CosmosDBManagementContext,
): ThroughputPoolsOperations {
  return {
    ..._getThroughputPools(context),
  };
}
