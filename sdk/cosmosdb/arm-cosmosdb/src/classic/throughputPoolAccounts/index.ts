// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/throughputPoolAccounts/operations.js";
import type { ThroughputPoolAccountsListOptionalParams } from "../../api/throughputPoolAccounts/options.js";
import type { ThroughputPoolAccountResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ThroughputPoolAccounts operations. */
export interface ThroughputPoolAccountsOperations {
  /** Lists all the Azure Cosmos DB accounts available under the subscription. */
  list: (
    resourceGroupName: string,
    throughputPoolName: string,
    options?: ThroughputPoolAccountsListOptionalParams,
  ) => PagedAsyncIterableIterator<ThroughputPoolAccountResource>;
}

function _getThroughputPoolAccounts(context: CosmosDBManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      throughputPoolName: string,
      options?: ThroughputPoolAccountsListOptionalParams,
    ) => list(context, resourceGroupName, throughputPoolName, options),
  };
}

export function _getThroughputPoolAccountsOperations(
  context: CosmosDBManagementContext,
): ThroughputPoolAccountsOperations {
  return {
    ..._getThroughputPoolAccounts(context),
  };
}
