// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/workspaceManagerAssignments/operations.js";
import type {
  WorkspaceManagerAssignmentsListOptionalParams,
  WorkspaceManagerAssignmentsDeleteOptionalParams,
  WorkspaceManagerAssignmentsCreateOrUpdateOptionalParams,
  WorkspaceManagerAssignmentsGetOptionalParams,
} from "../../api/workspaceManagerAssignments/options.js";
import type { WorkspaceManagerAssignment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceManagerAssignments operations. */
export interface WorkspaceManagerAssignmentsOperations {
  /** Get all workspace manager assignments for the Sentinel workspace manager. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspaceManagerAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<WorkspaceManagerAssignment>;
  /** Deletes a workspace manager assignment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerAssignmentName: string,
    options?: WorkspaceManagerAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a workspace manager assignment. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerAssignmentName: string,
    workspaceManagerAssignment: WorkspaceManagerAssignment,
    options?: WorkspaceManagerAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<WorkspaceManagerAssignment>;
  /** Gets a workspace manager assignment */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerAssignmentName: string,
    options?: WorkspaceManagerAssignmentsGetOptionalParams,
  ) => Promise<WorkspaceManagerAssignment>;
}

function _getWorkspaceManagerAssignments(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: WorkspaceManagerAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerAssignmentName: string,
      options?: WorkspaceManagerAssignmentsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, workspaceName, workspaceManagerAssignmentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerAssignmentName: string,
      workspaceManagerAssignment: WorkspaceManagerAssignment,
      options?: WorkspaceManagerAssignmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        workspaceManagerAssignmentName,
        workspaceManagerAssignment,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerAssignmentName: string,
      options?: WorkspaceManagerAssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, workspaceManagerAssignmentName, options),
  };
}

export function _getWorkspaceManagerAssignmentsOperations(
  context: SecurityInsightsContext,
): WorkspaceManagerAssignmentsOperations {
  return {
    ..._getWorkspaceManagerAssignments(context),
  };
}
