// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateLinkScopesContext } from "../../api/privateLinkScopesContext.js";
import { listByPrivateLinkScope, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListByPrivateLinkScopeOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResource, PrivateLinkResourceListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. */
  listByPrivateLinkScope: (
    resourceGroupName: string,
    scopeName: string,
    options?: PrivateLinkResourcesListByPrivateLinkScopeOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
  /** Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. */
  get: (
    resourceGroupName: string,
    scopeName: string,
    groupName: string,
    options?: PrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResources(context: PrivateLinkScopesContext) {
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
  context: PrivateLinkScopesContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
