// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { list } from "../../api/userIdentities/operations.js";
import type { UserIdentitiesListOptionalParams } from "../../api/userIdentities/options.js";
import type { UserIdentityContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
