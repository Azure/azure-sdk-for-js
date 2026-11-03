// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { list, get } from "../../api/workspaceDiscoveries/operations.js";
import type {
  WorkspaceDiscoveriesListOptionalParams,
  WorkspaceDiscoveriesGetOptionalParams,
} from "../../api/workspaceDiscoveries/options.js";
import type { WorkspaceDiscovery } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceDiscoveries operations. */
export interface WorkspaceDiscoveriesOperations {
  /** Lists retained discovery results under the workspace. Each result has its canonical ID; latest is an alias and is not a separate collection entry. This operation does not extend result retention. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspaceDiscoveriesListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspaceDiscovery>;
  /** Gets a retained discovery result by its ID, or uses latest to select the most recently durably admitted discovery. Returns 200 with the current representation while processing or terminal. A Failed result can contain errors without a snapshot. Returns 404 if no qualifying retained result exists. This is not an LRO polling endpoint. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    discoveryName: string,
    options?: WorkspaceDiscoveriesGetOptionalParams,
  ) => Promise<WorkspaceDiscovery>;
}

function _getWorkspaceDiscoveries(context: ChaosManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspaceDiscoveriesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      discoveryName: string,
      options?: WorkspaceDiscoveriesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, discoveryName, options),
  };
}

export function _getWorkspaceDiscoveriesOperations(
  context: ChaosManagementContext,
): WorkspaceDiscoveriesOperations {
  return {
    ..._getWorkspaceDiscoveries(context),
  };
}
