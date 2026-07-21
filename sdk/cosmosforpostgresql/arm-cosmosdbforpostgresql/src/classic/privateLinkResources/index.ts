// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBForPostgreSQLContext } from "../../api/cosmosDBForPostgreSQLContext.js";
import { listByCluster, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListByClusterOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources for cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: PrivateLinkResourcesListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets a private link resource for cluster. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: CosmosDBForPostgreSQLContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: PrivateLinkResourcesListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    get: (
      resourceGroupName: string,
      clusterName: string,
      privateLinkResourceName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, privateLinkResourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: CosmosDBForPostgreSQLContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
