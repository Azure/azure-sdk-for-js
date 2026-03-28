// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/workspaceManagerGroups/operations.js";
import type {
  WorkspaceManagerGroupsListOptionalParams,
  WorkspaceManagerGroupsDeleteOptionalParams,
  WorkspaceManagerGroupsCreateOrUpdateOptionalParams,
  WorkspaceManagerGroupsGetOptionalParams,
} from "../../api/workspaceManagerGroups/options.js";
import type { WorkspaceManagerGroup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceManagerGroups operations. */
export interface WorkspaceManagerGroupsOperations {
  /** Gets all workspace manager groups in the Sentinel workspace manager */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspaceManagerGroupsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspaceManagerGroup>;
  /** Deletes a workspace manager group */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerGroupName: string,
    options?: WorkspaceManagerGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a workspace manager group. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerGroupName: string,
    workspaceManagerGroup: WorkspaceManagerGroup,
    options?: WorkspaceManagerGroupsCreateOrUpdateOptionalParams,
  ) => Promise<WorkspaceManagerGroup>;
  /** Gets a workspace manager group */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerGroupName: string,
    options?: WorkspaceManagerGroupsGetOptionalParams,
  ) => Promise<WorkspaceManagerGroup>;
}

function _getWorkspaceManagerGroups(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspaceManagerGroupsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerGroupName: string,
      options?: WorkspaceManagerGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, workspaceManagerGroupName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerGroupName: string,
      workspaceManagerGroup: WorkspaceManagerGroup,
      options?: WorkspaceManagerGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        workspaceManagerGroupName,
        workspaceManagerGroup,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerGroupName: string,
      options?: WorkspaceManagerGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, workspaceManagerGroupName, options),
  };
}

export function _getWorkspaceManagerGroupsOperations(
  context: SecurityInsightsContext,
): WorkspaceManagerGroupsOperations {
  return {
    ..._getWorkspaceManagerGroups(context),
  };
}
