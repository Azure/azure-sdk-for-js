// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { listByPrivateLinkScope, get } from "../../api/privateLinkResources/operations.js";
import type {
  PrivateLinkResourcesListByPrivateLinkScopeOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "../../api/privateLinkResources/options.js";
import type { MicrosoftPrivateLinkScopesPrivateLinkResource } from "../../models/microsoft/privateLinkScopes/models.js";
import type { PrivateLinkResourceListResult } from "../../models/models.js";

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
  ) => Promise<MicrosoftPrivateLinkScopesPrivateLinkResource>;
}

function _getPrivateLinkResources(context: MonitorContext) {
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
  context: MonitorContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
