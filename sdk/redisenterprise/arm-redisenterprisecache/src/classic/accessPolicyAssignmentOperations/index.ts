// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import {
  list,
  $delete,
  createUpdate,
  get,
} from "../../api/accessPolicyAssignmentOperations/operations.js";
import type {
  AccessPolicyAssignmentOperationsListOptionalParams,
  AccessPolicyAssignmentOperationsDeleteOptionalParams,
  AccessPolicyAssignmentOperationsCreateUpdateOptionalParams,
  AccessPolicyAssignmentOperationsGetOptionalParams,
} from "../../api/accessPolicyAssignmentOperations/options.js";
import type { AccessPolicyAssignment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AccessPolicyAssignmentOperations operations. */
export interface AccessPolicyAssignmentOperationsOperations {
  /** Gets all access policy assignments.. */
  list: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    options?: AccessPolicyAssignmentOperationsListOptionalParams,
  ) => PagedAsyncIterableIterator<AccessPolicyAssignment>;
  /** Deletes a single access policy assignment. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentOperationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentOperationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates/Updates a particular access policy assignment for a database */
  createUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    parameters: AccessPolicyAssignment,
    options?: AccessPolicyAssignmentOperationsCreateUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessPolicyAssignment>, AccessPolicyAssignment>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    parameters: AccessPolicyAssignment,
    options?: AccessPolicyAssignmentOperationsCreateUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessPolicyAssignment>, AccessPolicyAssignment>>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    parameters: AccessPolicyAssignment,
    options?: AccessPolicyAssignmentOperationsCreateUpdateOptionalParams,
  ) => Promise<AccessPolicyAssignment>;
  /** Gets information about access policy assignment for database. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentOperationsGetOptionalParams,
  ) => Promise<AccessPolicyAssignment>;
}

function _getAccessPolicyAssignmentOperations(context: RedisEnterpriseManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      options?: AccessPolicyAssignmentOperationsListOptionalParams,
    ) => list(context, resourceGroupName, clusterName, databaseName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      options?: AccessPolicyAssignmentOperationsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      options?: AccessPolicyAssignmentOperationsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      options?: AccessPolicyAssignmentOperationsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        options,
      );
    },
    createUpdate: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      parameters: AccessPolicyAssignment,
      options?: AccessPolicyAssignmentOperationsCreateUpdateOptionalParams,
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
    beginCreateUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      parameters: AccessPolicyAssignment,
      options?: AccessPolicyAssignmentOperationsCreateUpdateOptionalParams,
    ) => {
      const poller = createUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      parameters: AccessPolicyAssignment,
      options?: AccessPolicyAssignmentOperationsCreateUpdateOptionalParams,
    ) => {
      return await createUpdate(
        context,
        resourceGroupName,
        clusterName,
        databaseName,
        accessPolicyAssignmentName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      options?: AccessPolicyAssignmentOperationsGetOptionalParams,
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

export function _getAccessPolicyAssignmentOperationsOperations(
  context: RedisEnterpriseManagementContext,
): AccessPolicyAssignmentOperationsOperations {
  return {
    ..._getAccessPolicyAssignmentOperations(context),
  };
}
