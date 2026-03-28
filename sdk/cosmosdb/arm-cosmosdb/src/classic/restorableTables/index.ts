// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableTables/operations.js";
import type { RestorableTablesListOptionalParams } from "../../api/restorableTables/options.js";
import type { RestorableTableGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableTables operations. */
export interface RestorableTablesOperations {
  /** Show the event feed of all mutations done on all the Azure Cosmos DB Tables. This helps in scenario where table was accidentally deleted. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableTablesListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableTableGetResult>;
}

function _getRestorableTables(context: CosmosDBManagementContext) {
  return {
    list: (location: string, instanceId: string, options?: RestorableTablesListOptionalParams) =>
      list(context, location, instanceId, options),
  };
}

export function _getRestorableTablesOperations(
  context: CosmosDBManagementContext,
): RestorableTablesOperations {
  return {
    ..._getRestorableTables(context),
  };
}
