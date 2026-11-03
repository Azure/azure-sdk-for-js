// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext } from "../../api/cosmosDBManagementContext.js";
import { list } from "../../api/restorableMongodbCollections/operations.js";
import type { RestorableMongodbCollectionsListOptionalParams } from "../../api/restorableMongodbCollections/options.js";
import type { RestorableMongodbCollectionGetResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RestorableMongodbCollections operations. */
export interface RestorableMongodbCollectionsOperations {
  /** Show the event feed of all mutations done on all the Azure Cosmos DB MongoDB collections under a specific database.  This helps in scenario where container was accidentally deleted.  This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission */
  list: (
    location: string,
    instanceId: string,
    options?: RestorableMongodbCollectionsListOptionalParams,
  ) => PagedAsyncIterableIterator<RestorableMongodbCollectionGetResult>;
}

function _getRestorableMongodbCollections(context: CosmosDBManagementContext) {
  return {
    list: (
      location: string,
      instanceId: string,
      options?: RestorableMongodbCollectionsListOptionalParams,
    ) => list(context, location, instanceId, options),
  };
}

export function _getRestorableMongodbCollectionsOperations(
  context: CosmosDBManagementContext,
): RestorableMongodbCollectionsOperations {
  return {
    ..._getRestorableMongodbCollections(context),
  };
}
