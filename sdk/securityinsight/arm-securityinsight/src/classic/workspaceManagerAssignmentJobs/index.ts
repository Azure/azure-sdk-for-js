// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, get, create } from "../../api/workspaceManagerAssignmentJobs/operations.js";
import type {
  WorkspaceManagerAssignmentJobsListOptionalParams,
  WorkspaceManagerAssignmentJobsDeleteOptionalParams,
  WorkspaceManagerAssignmentJobsGetOptionalParams,
  WorkspaceManagerAssignmentJobsCreateOptionalParams,
} from "../../api/workspaceManagerAssignmentJobs/options.js";
import type { Job } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a WorkspaceManagerAssignmentJobs operations. */
export interface WorkspaceManagerAssignmentJobsOperations {
  /** Get all jobs for the specified workspace manager assignment */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerAssignmentName: string,
    options?: WorkspaceManagerAssignmentJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<Job>;
  /** Deletes the specified job from the specified workspace manager assignment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerAssignmentName: string,
    jobName: string,
    options?: WorkspaceManagerAssignmentJobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Gets a job */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerAssignmentName: string,
    jobName: string,
    options?: WorkspaceManagerAssignmentJobsGetOptionalParams,
  ) => Promise<Job>;
  /** Create a job for the specified workspace manager assignment */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    workspaceManagerAssignmentName: string,
    options?: WorkspaceManagerAssignmentJobsCreateOptionalParams,
  ) => Promise<Job>;
}

function _getWorkspaceManagerAssignmentJobs(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerAssignmentName: string,
      options?: WorkspaceManagerAssignmentJobsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, workspaceManagerAssignmentName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerAssignmentName: string,
      jobName: string,
      options?: WorkspaceManagerAssignmentJobsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        workspaceName,
        workspaceManagerAssignmentName,
        jobName,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerAssignmentName: string,
      jobName: string,
      options?: WorkspaceManagerAssignmentJobsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        workspaceName,
        workspaceManagerAssignmentName,
        jobName,
        options,
      ),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      workspaceManagerAssignmentName: string,
      options?: WorkspaceManagerAssignmentJobsCreateOptionalParams,
    ) => create(context, resourceGroupName, workspaceName, workspaceManagerAssignmentName, options),
  };
}

export function _getWorkspaceManagerAssignmentJobsOperations(
  context: SecurityInsightsContext,
): WorkspaceManagerAssignmentJobsOperations {
  return {
    ..._getWorkspaceManagerAssignmentJobs(context),
  };
}
