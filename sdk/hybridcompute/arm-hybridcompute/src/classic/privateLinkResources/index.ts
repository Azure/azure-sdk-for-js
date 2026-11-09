// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HybridComputeManagementContext } from "../../api/hybridComputeManagementContext.js";
import { listByPrivateLinkScope, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListByPrivateLinkScopeOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. */
  listByPrivateLinkScope: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkResourcesListByPrivateLinkScopeOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. */
  get: (
    resourceGroupName: string,
    scopeName: string,
    groupName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: HybridComputeManagementContext) {
  return {
    listByPrivateLinkScope: (
      resourceGroupName: string,
      scopeName: string,
      options?: PrivateLinkResourcesListByPrivateLinkScopeOptionalParams,
    ) => listByPrivateLinkScope(context, resourceGroupName, scopeName, options),
    get: (
      resourceGroupName: string,
      scopeName: string,
      groupName: string,
      options?: PrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, scopeName, groupName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: HybridComputeManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
