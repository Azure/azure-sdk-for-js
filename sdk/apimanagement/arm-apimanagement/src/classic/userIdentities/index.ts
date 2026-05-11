// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list } from "../../api/userIdentities/operations.js";
import { UserIdentitiesListOptionalParams } from "../../api/userIdentities/options.js";
import { UserIdentityContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a UserIdentities operations. */
export interface UserIdentitiesOperations {
  /** List of all user identities. */
  list: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    options?: UserIdentitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<UserIdentityContract>;
}

function _getUserIdentities(context: ApiManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      options?: UserIdentitiesListOptionalParams,
    ) => list(context, resourceGroupName, serviceName, userId, options),
  };
}

export function _getUserIdentitiesOperations(
  context: ApiManagementContext,
): UserIdentitiesOperations {
  return {
    ..._getUserIdentities(context),
  };
}
