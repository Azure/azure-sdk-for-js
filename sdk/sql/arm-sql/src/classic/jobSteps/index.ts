// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByVersion,
  getByVersion,
  listByJob,
  $delete,
  createOrUpdate,
  get,
} from "../../api/jobSteps/operations.js";
import type {
  JobStepsListByVersionOptionalParams,
  JobStepsGetByVersionOptionalParams,
  JobStepsListByJobOptionalParams,
  JobStepsDeleteOptionalParams,
  JobStepsCreateOrUpdateOptionalParams,
  JobStepsGetOptionalParams,
} from "../../api/jobSteps/options.js";
import type { JobStep } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JobSteps operations. */
export interface JobStepsOperations {
  /** Gets all job steps in the specified job version. */
  listByVersion: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobVersion: number,
    options?: JobStepsListByVersionOptionalParams,
  ) => PagedAsyncIterableIterator<JobStep>;
  /** Gets the specified version of a job step. */
  getByVersion: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobVersion: number,
    stepName: string,
    options?: JobStepsGetByVersionOptionalParams,
  ) => Promise<JobStep>;
  /** Gets all job steps for a job's current version. */
  listByJob: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    options?: JobStepsListByJobOptionalParams,
  ) => PagedAsyncIterableIterator<JobStep>;
  /** Deletes a job step. This will implicitly create a new job version. */
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
    stepName: string,
    options?: JobStepsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a job step. This will implicitly create a new job version. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    stepName: string,
    parameters: JobStep,
    options?: JobStepsCreateOrUpdateOptionalParams,
  ) => Promise<JobStep>;
  /** Gets a job step in a job's current version. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    stepName: string,
    options?: JobStepsGetOptionalParams,
  ) => Promise<JobStep>;
}

function _getJobSteps(context: SqlManagementContext) {
  return {
    listByVersion: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobVersion: number,
      options?: JobStepsListByVersionOptionalParams,
    ) =>
      listByVersion(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobVersion,
        options,
      ),
    getByVersion: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobVersion: number,
      stepName: string,
      options?: JobStepsGetByVersionOptionalParams,
    ) =>
      getByVersion(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobVersion,
        stepName,
        options,
      ),
    listByJob: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      options?: JobStepsListByJobOptionalParams,
    ) => listByJob(context, resourceGroupName, serverName, jobAgentName, jobName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      stepName: string,
      options?: JobStepsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, jobAgentName, jobName, stepName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      stepName: string,
      parameters: JobStep,
      options?: JobStepsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        stepName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      stepName: string,
      options?: JobStepsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, jobAgentName, jobName, stepName, options),
  };
}

export function _getJobStepsOperations(context: SqlManagementContext): JobStepsOperations {
  return {
    ..._getJobSteps(context),
  };
}
