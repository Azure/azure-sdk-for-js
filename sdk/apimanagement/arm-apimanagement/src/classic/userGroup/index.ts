// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list } from "../../api/userGroup/operations.js";
import type { UserGroupListOptionalParams } from "../../api/userGroup/options.js";
import type { GroupContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UserGroup operations. */
export interface UserGroupOperations {
  /** Lists all user groups. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    options?: UserGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<GroupContract>;
}

function _getUserGroup(context: ApiManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      options?: UserGroupListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, userId, options),
  };
}

export function _getUserGroupOperations(context: ApiManagementContext): UserGroupOperations {
  return {
    ..._getUserGroup(context),
  };
}
