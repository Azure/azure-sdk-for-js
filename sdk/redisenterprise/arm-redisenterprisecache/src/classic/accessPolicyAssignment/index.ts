// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import { list, $delete, createUpdate, get } from "../../api/accessPolicyAssignment/operations.js";
import type {
  AccessPolicyAssignmentListOptionalParams,
  AccessPolicyAssignmentDeleteOptionalParams,
  AccessPolicyAssignmentCreateUpdateOptionalParams,
  AccessPolicyAssignmentGetOptionalParams,
} from "../../api/accessPolicyAssignment/options.js";
import type { AccessPolicyAssignment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccessPolicyAssignment operations. */
export interface AccessPolicyAssignmentOperations {
  /** Gets all access policy assignments.. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: AccessPolicyAssignmentListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessPolicyAssignment>;
  /** Deletes a single access policy assignment. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates/Updates a particular access policy assignment for a database */
  createUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    parameters: AccessPolicyAssignment,
    options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessPolicyAssignment>, AccessPolicyAssignment>;
  /** Gets information about access policy assignment for database. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentGetOptionalParams,
  ) => Promise<AccessPolicyAssignment>;
}

function _getAccessPolicyAssignment(context: RedisEnterpriseManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: AccessPolicyAssignmentListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, databaseName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      options?: AccessPolicyAssignmentDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        options,
      ),
    createUpdate: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      parameters: AccessPolicyAssignment,
      options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
    ) =>
      createUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      options?: AccessPolicyAssignmentGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        options,
      ),
  };
}

export function _getAccessPolicyAssignmentOperations(
  context: RedisEnterpriseManagementContext,
): AccessPolicyAssignmentOperations {
  return {
    ..._getAccessPolicyAssignment(context),
  };
}
