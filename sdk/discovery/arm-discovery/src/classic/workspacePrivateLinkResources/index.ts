// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryContext } from "../../api/discoveryContext.js";
import { listByWorkspace, get } from "../../api/workspacePrivateLinkResources/operations.js";
import {
  WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  WorkspacePrivateLinkResourcesGetOptionalParams,
} from "../../api/workspacePrivateLinkResources/options.js";
import { WorkspacePrivateLinkResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspacePrivateLinkResources operations. */
export interface WorkspacePrivateLinkResourcesOperations {
  /** Lists all private link resources for the workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspacePrivateLinkResource>;
  /** Gets the specified private link resource for the workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    privateLinkResourceName: string,
    options?: WorkspacePrivateLinkResourcesGetOptionalParams,
  ) => Promise<WorkspacePrivateLinkResource>;
}

function _getWorkspacePrivateLinkResources(context: DiscoveryContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      privateLinkResourceName: string,
      options?: WorkspacePrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, privateLinkResourceName, options),
  };
}

export function _getWorkspacePrivateLinkResourcesOperations(
  context: DiscoveryContext,
): WorkspacePrivateLinkResourcesOperations {
  return {
    ..._getWorkspacePrivateLinkResources(context),
  };
}
