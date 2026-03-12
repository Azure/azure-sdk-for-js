// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PurviewManagementContext } from "../../api/purviewManagementContext.js";
import { listByAccount, getByGroupId } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListByAccountOptionalParams,
  PrivateLinkResourcesGetByGroupIdOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets a list of privately linkable resources for an account */
  listByAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: PrivateLinkResourcesListByAccountOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets a privately linkable resources for an account with given group identifier */
  getByGroupId: (
    resourceGroupName: string,
    accountName: string,
    groupId: string,
    options?: PrivateLinkResourcesGetByGroupIdOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: PurviewManagementContext) {
  return {
    listByAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: PrivateLinkResourcesListByAccountOptionalParams,
    ) => listByAccount(context, resourceGroupName, accountName, options),
    getByGroupId: (
      resourceGroupName: string,
      accountName: string,
      groupId: string,
      options?: PrivateLinkResourcesGetByGroupIdOptionalParams,
    ) => getByGroupId(context, resourceGroupName, accountName, groupId, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: PurviewManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
