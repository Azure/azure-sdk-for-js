// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableTableResources/operations.js";
import { RestorableTableResourcesListOptionalParams } from "../../api/restorableTableResources/options.js";
import { RestorableTableResourcesGetResult } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableTableResources operations. */
export interface RestorableTableResourcesOperations {
  /** Return a list of tables that exist on the account at the given timestamp and location. This helps in scenarios to validate what resources exist at given timestamp and location. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission. */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableTableResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableTableResourcesGetResult>;
}

function _getRestorableTableResources(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableTableResourcesListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableTableResourcesOperations(
  context: CosmosDBManagementContext,
): RestorableTableResourcesOperations {
  return {
    ..._getRestorableTableResources(context),
  };
}
