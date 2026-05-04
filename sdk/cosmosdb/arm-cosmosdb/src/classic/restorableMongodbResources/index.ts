// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableMongodbResources/operations.js";
import type { RestorableMongodbResourcesListOptionalParams } from "../../api/restorableMongodbResources/options.js";
import type { RestorableMongodbResourcesGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableMongodbResources operations. */
export interface RestorableMongodbResourcesOperations {
  /** Return a list of database and collection combo that exist on the account at the given timestamp and location. This helps in scenarios to validate what resources exist at given timestamp and location. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission. */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableMongodbResourcesListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableMongodbResourcesGetResult>;
}

function _getRestorableMongodbResources(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableMongodbResourcesListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableMongodbResourcesOperations(
  context: CosmosDBManagementContext,
): RestorableMongodbResourcesOperations {
  return {
    ..._getRestorableMongodbResources(context),
  };
}
