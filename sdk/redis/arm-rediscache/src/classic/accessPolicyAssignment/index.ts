// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext } from "../../api/redisManagementContext.js";
import { list, $delete, createUpdate, get } from "../../api/accessPolicyAssignment/operations.js";
import type {
  AccessPolicyAssignmentListOptionalParams,
  AccessPolicyAssignmentDeleteOptionalParams,
  AccessPolicyAssignmentCreateUpdateOptionalParams,
  AccessPolicyAssignmentGetOptionalParams,
} from "../../api/accessPolicyAssignment/options.js";
import type { RedisCacheAccessPolicyAssignment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccessPolicyAssignment operations. */
export interface AccessPolicyAssignmentOperations {
  /** Gets the list of access policy assignments associated with this redis cache */
  list: (
    resourceGroupName: string,
    cacheName: string,
    options?: AccessPolicyAssignmentListOptionalParams,
  ) => PagedAsyncIterableIterator<RedisCacheAccessPolicyAssignment>;
  /** Deletes the access policy assignment from a redis cache */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    cacheName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Adds the access policy assignment to the specified users */
  createUpdate: (
    resourceGroupName: string,
    cacheName: string,
    accessPolicyAssignmentName: string,
    parameters: RedisCacheAccessPolicyAssignment,
    options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
  ) => PollerLike<
    OperationState<RedisCacheAccessPolicyAssignment>,
    RedisCacheAccessPolicyAssignment
  >;
  /** Gets the list of assignments for an access policy of a redis cache */
  get: (
    resourceGroupName: string,
    cacheName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentGetOptionalParams,
  ) => Promise<RedisCacheAccessPolicyAssignment>;
}

function _getAccessPolicyAssignment(context: RedisManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      cacheName: string,
      options?: AccessPolicyAssignmentListOptionalParams,
    ) => list(context, resourceGroupName, cacheName, options),
    delete: (
      resourceGroupName: string,
      cacheName: string,
      accessPolicyAssignmentName: string,
      options?: AccessPolicyAssignmentDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cacheName, accessPolicyAssignmentName, options),
    createUpdate: (
      resourceGroupName: string,
      cacheName: string,
      accessPolicyAssignmentName: string,
      parameters: RedisCacheAccessPolicyAssignment,
      options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
    ) =>
      createUpdate(
        context,
        resourceGroupName,
        cacheName,
        accessPolicyAssignmentName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      cacheName: string,
      accessPolicyAssignmentName: string,
      options?: AccessPolicyAssignmentGetOptionalParams,
    ) => get(context, resourceGroupName, cacheName, accessPolicyAssignmentName, options),
  };
}

export function _getAccessPolicyAssignmentOperations(
  context: RedisManagementContext,
): AccessPolicyAssignmentOperations {
  return {
    ..._getAccessPolicyAssignment(context),
  };
}
