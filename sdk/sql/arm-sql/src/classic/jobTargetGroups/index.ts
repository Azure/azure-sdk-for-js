// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByAgent, $delete, createOrUpdate, get } from "../../api/jobTargetGroups/operations.js";
import {
  JobTargetGroupsListByAgentOptionalParams,
  JobTargetGroupsDeleteOptionalParams,
  JobTargetGroupsCreateOrUpdateOptionalParams,
  JobTargetGroupsGetOptionalParams,
} from "../../api/jobTargetGroups/options.js";
import { JobTargetGroup } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobTargetGroups operations. */
export interface JobTargetGroupsOperations {
  /** Gets all target groups in an agent. */
  listByAgent: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: JobTargetGroupsListByAgentOptionalParams,
  ) => PagedAsyncIterableIterator<JobTargetGroup>;
  /** Deletes a target group. */
  delete: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    targetGroupName: string,
    options?: JobTargetGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a target group. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    targetGroupName: string,
    parameters: JobTargetGroup,
    options?: JobTargetGroupsCreateOrUpdateOptionalParams,
  ) => Promise<JobTargetGroup>;
  /** Gets a target group. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    targetGroupName: string,
    options?: JobTargetGroupsGetOptionalParams,
  ) => Promise<JobTargetGroup>;
}

function _getJobTargetGroups(context: SqlManagementContext) {
  return {
    listByAgent: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      options?: JobTargetGroupsListByAgentOptionalParams,
    ) => listByAgent(context, resourceGroupName, serverName, jobAgentName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      targetGroupName: string,
      options?: JobTargetGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, jobAgentName, targetGroupName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      targetGroupName: string,
      parameters: JobTargetGroup,
      options?: JobTargetGroupsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        targetGroupName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      targetGroupName: string,
      options?: JobTargetGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, jobAgentName, targetGroupName, options),
  };
}

export function _getJobTargetGroupsOperations(
  context: SqlManagementContext,
): JobTargetGroupsOperations {
  return {
    ..._getJobTargetGroups(context),
  };
}
