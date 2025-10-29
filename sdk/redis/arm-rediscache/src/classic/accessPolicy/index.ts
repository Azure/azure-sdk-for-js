// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext } from "../../api/redisManagementContext.js";
import { list, $delete, createUpdate, get } from "../../api/accessPolicy/operations.js";
import type {
  AccessPolicyListOptionalParams,
  AccessPolicyDeleteOptionalParams,
  AccessPolicyCreateUpdateOptionalParams,
  AccessPolicyGetOptionalParams,
} from "../../api/accessPolicy/options.js";
import type { RedisCacheAccessPolicy } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccessPolicy operations. */
export interface AccessPolicyOperations {
  /** Gets the list of access policies associated with this redis cache */
  list: (
    resourceGroupName: string,
    cacheName: string,
    options?: AccessPolicyListOptionalParams,
  ) => PagedAsyncIterableIterator<RedisCacheAccessPolicy>;
  /** Deletes the access policy from a redis cache */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    cacheName: string,
    accessPolicyName: string,
    options?: AccessPolicyDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Adds an access policy to the redis cache */
  createUpdate: (
    resourceGroupName: string,
    cacheName: string,
    accessPolicyName: string,
    parameters: RedisCacheAccessPolicy,
    options?: AccessPolicyCreateUpdateOptionalParams,
  ) => PollerLike<OperationState<RedisCacheAccessPolicy>, RedisCacheAccessPolicy>;
  /** Gets the detailed information about an access policy of a redis cache */
  get: (
    resourceGroupName: string,
    cacheName: string,
    accessPolicyName: string,
    options?: AccessPolicyGetOptionalParams,
  ) => Promise<RedisCacheAccessPolicy>;
}

function _getAccessPolicy(context: RedisManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      cacheName: string,
      options?: AccessPolicyListOptionalParams,
    ) => list(context, resourceGroupName, cacheName, options),
    delete: (
      resourceGroupName: string,
      cacheName: string,
      accessPolicyName: string,
      options?: AccessPolicyDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cacheName, accessPolicyName, options),
    createUpdate: (
      resourceGroupName: string,
      cacheName: string,
      accessPolicyName: string,
      parameters: RedisCacheAccessPolicy,
      options?: AccessPolicyCreateUpdateOptionalParams,
    ) => createUpdate(context, resourceGroupName, cacheName, accessPolicyName, parameters, options),
    get: (
      resourceGroupName: string,
      cacheName: string,
      accessPolicyName: string,
      options?: AccessPolicyGetOptionalParams,
    ) => get(context, resourceGroupName, cacheName, accessPolicyName, options),
  };
}

export function _getAccessPolicyOperations(
  context: RedisManagementContext,
): AccessPolicyOperations {
  return {
    ..._getAccessPolicy(context),
  };
}
