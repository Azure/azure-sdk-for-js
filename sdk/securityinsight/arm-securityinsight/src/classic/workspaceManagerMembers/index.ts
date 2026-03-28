// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspaceManagerMembers/operations.js";
import type {
  WorkspaceManagerMembersListOptionalParams,
  WorkspaceManagerMembersDeleteOptionalParams,
  WorkspaceManagerMembersCreateOrUpdateOptionalParams,
  WorkspaceManagerMembersGetOptionalParams,
} from "../../api/workspaceManagerMembers/options.js";
import type { WorkspaceManagerMember } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceManagerMembers operations. */
export interface WorkspaceManagerMembersOperations {
  /** Gets all workspace manager members that exist for the given Sentinel workspace manager */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspaceManagerMembersListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspaceManagerMember>;
  /** Deletes a workspace manager member */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerMemberName: string,
    options?: WorkspaceManagerMembersDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a workspace manager member */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerMemberName: string,
    workspaceManagerMember: WorkspaceManagerMember,
    options?: WorkspaceManagerMembersCreateOrUpdateOptionalParams,
  ) => Promise<WorkspaceManagerMember>;
  /** Gets a workspace manager member */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerMemberName: string,
    options?: WorkspaceManagerMembersGetOptionalParams,
  ) => Promise<WorkspaceManagerMember>;
}

function _getWorkspaceManagerMembers(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspaceManagerMembersListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerMemberName: string,
      options?: WorkspaceManagerMembersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, workspaceManagerMemberName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerMemberName: string,
      workspaceManagerMember: WorkspaceManagerMember,
      options?: WorkspaceManagerMembersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        workspaceManagerMemberName,
        workspaceManagerMember,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerMemberName: string,
      options?: WorkspaceManagerMembersGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, workspaceManagerMemberName, options),
  };
}

export function _getWorkspaceManagerMembersOperations(
  context: SecurityInsightsContext,
): WorkspaceManagerMembersOperations {
  return {
    ..._getWorkspaceManagerMembers(context),
  };
}
