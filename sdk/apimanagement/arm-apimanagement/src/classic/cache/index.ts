// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/cache/operations.js";
import type {
  CacheListByServiceOptionalParams,
  CacheDeleteOptionalParams,
  CacheUpdateOptionalParams,
  CacheCreateOrUpdateOptionalParams,
  CacheGetEntityTagOptionalParams,
  CacheGetOptionalParams,
} from "../../api/cache/options.js";
import type { CacheContract, CacheUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Cache operations. */
export interface CacheOperations {
  /** Lists a collection of all external Caches in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: CacheListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<CacheContract>;
  /** Deletes specific Cache. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    cacheId: string,
    ifMatch: string,
    options?: CacheDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the cache specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    cacheId: string,
    ifMatch: string,
    parameters: CacheUpdateParameters,
    options?: CacheUpdateOptionalParams,
  ) => Promise<CacheContract>;
  /** Creates or updates an External Cache to be used in Api Management instance. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    cacheId: string,
    parameters: CacheContract,
    options?: CacheCreateOrUpdateOptionalParams,
  ) => Promise<CacheContract>;
  /** Gets the entity state (Etag) version of the Cache specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    cacheId: string,
    options?: CacheGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the Cache specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    cacheId: string,
    options?: CacheGetOptionalParams,
  ) => Promise<CacheContract>;
}

function _getCache(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: CacheListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      cacheId: string,
      ifMatch: string,
      options?: CacheDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, cacheId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      cacheId: string,
      ifMatch: string,
      parameters: CacheUpdateParameters,
      options?: CacheUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, cacheId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      cacheId: string,
      parameters: CacheContract,
      options?: CacheCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, cacheId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      cacheId: string,
      options?: CacheGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, cacheId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      cacheId: string,
      options?: CacheGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, cacheId, options),
  };
}

export function _getCacheOperations(context: ApiManagementContext): CacheOperations {
  return {
    ..._getCache(context),
  };
}
