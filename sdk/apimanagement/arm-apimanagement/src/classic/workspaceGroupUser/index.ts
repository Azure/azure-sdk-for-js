// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  $delete,
  create,
  checkEntityExists,
  list,
} from "../../api/workspaceGroupUser/operations.js";
import type {
  WorkspaceGroupUserDeleteOptionalParams,
  WorkspaceGroupUserCreateOptionalParams,
  WorkspaceGroupUserCheckEntityExistsOptionalParams,
  WorkspaceGroupUserListOptionalParams,
} from "../../api/workspaceGroupUser/options.js";
import type { UserContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceGroupUser operations. */
export interface WorkspaceGroupUserOperations {
  /** Remove existing user from existing group. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    groupId: string,
    userId: string,
    options?: WorkspaceGroupUserDeleteOptionalParams,
  ) => Promise<void>;
  /** Add existing user to existing group */
  create: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    groupId: string,
    userId: string,
    options?: WorkspaceGroupUserCreateOptionalParams,
  ) => Promise<UserContract>;
  /** Checks that user entity specified by identifier is associated with the group entity. */
  checkEntityExists: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    groupId: string,
    userId: string,
    options?: WorkspaceGroupUserCheckEntityExistsOptionalParams,
  ) => Promise<void>;
  /** Lists a collection of user entities associated with the group. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    workspaceId: string,
    groupId: string,
    options?: WorkspaceGroupUserListOptionalParams,
  ) => PagedAsyncIterableIterator<UserContract>;
}

function _getWorkspaceGroupUser(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      groupId: string,
      userId: string,
      options?: WorkspaceGroupUserDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, workspaceId, groupId, userId, options),
    create: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      groupId: string,
      userId: string,
      options?: WorkspaceGroupUserCreateOptionalParams,
    ) => create(context, resourceGroupName, serviceName, workspaceId, groupId, userId, options),
    checkEntityExists: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      groupId: string,
      userId: string,
      options?: WorkspaceGroupUserCheckEntityExistsOptionalParams,
    ) =>
      checkEntityExists(
        context,
        resourceGroupName,
        serviceName,
        workspaceId,
        groupId,
        userId,
        options,
      ),
    list: (
      resourceGroupName: string,
      serviceName: string,
      workspaceId: string,
      groupId: string,
      options?: WorkspaceGroupUserListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, workspaceId, groupId, options),
  };
}

export function _getWorkspaceGroupUserOperations(
  context: ApiManagementContext,
): WorkspaceGroupUserOperations {
  return {
    ..._getWorkspaceGroupUser(context),
  };
}
