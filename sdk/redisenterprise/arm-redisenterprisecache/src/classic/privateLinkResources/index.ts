// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import { listByCluster } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesListByClusterOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a Redis Enterprise cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: PrivateLinkResourcesListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: RedisEnterpriseManagementContext) {
  return {
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: PrivateLinkResourcesListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: RedisEnterpriseManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
