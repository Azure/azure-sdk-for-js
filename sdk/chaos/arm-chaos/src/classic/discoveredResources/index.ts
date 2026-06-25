// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { listByWorkspace, get } from "../../api/discoveredResources/operations.js";
import {
  DiscoveredResourcesListByWorkspaceOptionalParams,
  DiscoveredResourcesGetOptionalParams,
} from "../../api/discoveredResources/options.js";
import { DiscoveredResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DiscoveredResources operations. */
export interface DiscoveredResourcesOperations {
  /** Get a list of discovered resources for a workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: DiscoveredResourcesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<DiscoveredResource>;
  /** Get a discovered resource. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    discoveredResourceName: string,
    options?: DiscoveredResourcesGetOptionalParams,
  ) => Promise<DiscoveredResource>;
}

function _getDiscoveredResources(context: ChaosManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: DiscoveredResourcesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      discoveredResourceName: string,
      options?: DiscoveredResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, discoveredResourceName, options),
  };
}

export function _getDiscoveredResourcesOperations(
  context: ChaosManagementContext,
): DiscoveredResourcesOperations {
  return {
    ..._getDiscoveredResources(context),
  };
}
