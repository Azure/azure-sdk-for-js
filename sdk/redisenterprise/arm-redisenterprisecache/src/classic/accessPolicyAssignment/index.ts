// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RedisEnterpriseManagementContext } from "../../api/redisEnterpriseManagementContext.js";
import { list, $delete, createUpdate, get } from "../../api/accessPolicyAssignment/operations.js";
import {
  AccessPolicyAssignmentListOptionalParams,
  AccessPolicyAssignmentDeleteOptionalParams,
  AccessPolicyAssignmentCreateUpdateOptionalParams,
  AccessPolicyAssignmentGetOptionalParams,
} from "../../api/accessPolicyAssignment/options.js";
import { AccessPolicyAssignment } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  delete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    options?: AccessPolicyAssignmentDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates/Updates a particular access policy assignment for a database */
  createUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    parameters: AccessPolicyAssignment,
    options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
  ) => PollerLike<OperationState<AccessPolicyAssignment>, AccessPolicyAssignment>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdate: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    parameters: AccessPolicyAssignment,
    options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AccessPolicyAssignment>, AccessPolicyAssignment>>;
  /** @deprecated use createUpdate instead */
  beginCreateUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    databaseName: string,
    accessPolicyAssignmentName: string,
    parameters: AccessPolicyAssignment,
    options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
  ) => Promise<AccessPolicyAssignment>;
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
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      options?: AccessPolicyAssignmentDeleteOptionalParams,
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
      options?: AccessPolicyAssignmentDeleteOptionalParams,
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
    beginCreateUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      databaseName: string,
      accessPolicyAssignmentName: string,
      parameters: AccessPolicyAssignment,
      options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
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
      options?: AccessPolicyAssignmentCreateUpdateOptionalParams,
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
