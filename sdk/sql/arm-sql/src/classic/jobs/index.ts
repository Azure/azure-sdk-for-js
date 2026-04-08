// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import { listByAgent, $delete, createOrUpdate, get } from "../../api/jobs/operations.js";
import type {
  JobsListByAgentOptionalParams,
  JobsDeleteOptionalParams,
  JobsCreateOrUpdateOptionalParams,
  JobsGetOptionalParams,
} from "../../api/jobs/options.js";
import type { Job } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Jobs operations. */
export interface JobsOperations {
  /** Gets a list of jobs. */
  listByAgent: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: JobsListByAgentOptionalParams,
  ) => PagedAsyncIterableIterator<Job>;
  /** Deletes a job. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a job. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    parameters: Job,
    options?: JobsCreateOrUpdateOptionalParams,
  ) => Promise<Job>;
  /** Gets a job. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    options?: JobsGetOptionalParams,
  ) => Promise<Job>;
}

function _getJobs(context: SqlManagementContext) {
  return {
    listByAgent: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      options?: JobsListByAgentOptionalParams,
    ) => listByAgent(context, resourceGroupName, serverName, jobAgentName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      options?: JobsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, jobAgentName, jobName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      parameters: Job,
      options?: JobsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      options?: JobsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, jobAgentName, jobName, options),
  };
}

export function _getJobsOperations(context: SqlManagementContext): JobsOperations {
  return {
    ..._getJobs(context),
  };
}
