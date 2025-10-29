// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext } from "../../api/redisManagementContext.js";
import { listByRedisCache } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesListByRedisCacheOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a redis cache. */
  listByRedisCache: (
    resourceGroupName: string,
    cacheName: string,
    options?: PrivateLinkResourcesListByRedisCacheOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: RedisManagementContext) {
  return {
    listByRedisCache: (
      resourceGroupName: string,
      cacheName: string,
      options?: PrivateLinkResourcesListByRedisCacheOptionalParams,
    ) => listByRedisCache(context, resourceGroupName, cacheName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: RedisManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
