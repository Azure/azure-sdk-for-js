// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMapsManagementContext } from "../../api/azureMapsManagementContext.js";
import { listByAccount, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListByAccountOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that are available to be used for the Maps Account. */
  listByAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: PrivateLinkResourcesListByAccountOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets a private link resource by name which can be used for the Maps Account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: AzureMapsManagementContext) {
  return {
    listByAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: PrivateLinkResourcesListByAccountOptionalParams,
    ) => listByAccount(context, resourceGroupName, accountName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      privateLinkResourceName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, privateLinkResourceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: AzureMapsManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
