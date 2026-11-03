// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableSqlContainers/operations.js";
import type { RestorableSqlContainersListOptionalParams } from "../../api/restorableSqlContainers/options.js";
import type { RestorableSqlContainerGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableSqlContainers operations. */
export interface RestorableSqlContainersOperations {
  /** Show the event feed of all mutations done on all the Azure Cosmos DB SQL containers under a specific database.  This helps in scenario where container was accidentally deleted.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableSqlContainersListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableSqlContainerGetResult>;
}

function _getRestorableSqlContainers(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableSqlContainersListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableSqlContainersOperations(
  context: CosmosDBManagementContext,
): RestorableSqlContainersOperations {
  return {
    ..._getRestorableSqlContainers(context),
  };
}
