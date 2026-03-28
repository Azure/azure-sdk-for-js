// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { $delete, create, checkEntityExists, list } from "../../api/groupUser/operations.js";
import type {
  GroupUserDeleteOptionalParams,
  GroupUserCreateOptionalParams,
  GroupUserCheckEntityExistsOptionalParams,
  GroupUserListOptionalParams,
} from "../../api/groupUser/options.js";
import type { UserContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GroupUser operations. */
export interface GroupUserOperations {
  /** Remove existing user from existing group. */
  /**
   *  @fixme Delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    userId: string,
    options?: GroupUserDeleteOptionalParams,
  ) => Promise<void>;
  /** Add existing user to existing group */
  create: (
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    userId: string,
    options?: GroupUserCreateOptionalParams,
  ) => Promise<UserContract>;
  /** Checks that user entity specified by identifier is associated with the group entity. */
  checkEntityExists: (
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    userId: string,
    options?: GroupUserCheckEntityExistsOptionalParams,
  ) => Promise<void>;
  /** Lists a collection of user entities associated with the group. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    groupId: string,
    options?: GroupUserListOptionalParams,
  ) => PagedAsyncIterableIterator<UserContract>;
}

function _getGroupUser(context: ApiManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      serviceName: string,
      groupId: string,
      userId: string,
      options?: GroupUserDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, groupId, userId, options),
    create: (
      resourceGroupName: string,
      serviceName: string,
      groupId: string,
      userId: string,
      options?: GroupUserCreateOptionalParams,
    ) => create(context, resourceGroupName, serviceName, groupId, userId, options),
    checkEntityExists: (
      resourceGroupName: string,
      serviceName: string,
      groupId: string,
      userId: string,
      options?: GroupUserCheckEntityExistsOptionalParams,
    ) => checkEntityExists(context, resourceGroupName, serviceName, groupId, userId, options),
    list: (
      resourceGroupName: string,
      serviceName: string,
      groupId: string,
      options?: GroupUserListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, groupId, options),
  };
}

export function _getGroupUserOperations(context: ApiManagementContext): GroupUserOperations {
  return {
    ..._getGroupUser(context),
  };
}
