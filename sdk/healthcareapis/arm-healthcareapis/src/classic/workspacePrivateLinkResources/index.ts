// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthcareApisManagementContext } from "../../api/healthcareApisManagementContext.js";
import { listByWorkspace, get } from "../../api/workspacePrivateLinkResources/operations.js";
import type {
  WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  WorkspacePrivateLinkResourcesGetOptionalParams,
} from "../../api/workspacePrivateLinkResources/options.js";
import type { PrivateLinkResourceDescription } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspacePrivateLinkResources operations. */
export interface WorkspacePrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a workspace. */
  listByWorkspace: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResourceDescription>;
  /** Gets a private link resource that need to be created for a workspace. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    groupName: string,
    options?: WorkspacePrivateLinkResourcesGetOptionalParams,
  ) => Promise<PrivateLinkResourceDescription>;
}

function _getWorkspacePrivateLinkResources(context: HealthcareApisManagementContext) {
  return {
    listByWorkspace: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
    ) => listByWorkspace(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      groupName: string,
      options?: WorkspacePrivateLinkResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, groupName, options),
  };
}

export function _getWorkspacePrivateLinkResourcesOperations(
  context: HealthcareApisManagementContext,
): WorkspacePrivateLinkResourcesOperations {
  return {
    ..._getWorkspacePrivateLinkResources(context),
  };
}
