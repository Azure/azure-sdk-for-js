// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  create,
  listByAgent,
  listByJob,
  cancel,
  createOrUpdate,
  get,
} from "../../api/jobExecutions/operations.js";
import type {
  JobExecutionsCreateOptionalParams,
  JobExecutionsListByAgentOptionalParams,
  JobExecutionsListByJobOptionalParams,
  JobExecutionsCancelOptionalParams,
  JobExecutionsCreateOrUpdateOptionalParams,
  JobExecutionsGetOptionalParams,
} from "../../api/jobExecutions/options.js";
import type { JobExecution } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a JobExecutions operations. */
export interface JobExecutionsOperations {
  /** Starts an elastic job execution. */
  create: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    options?: JobExecutionsCreateOptionalParams,
  ) => PollerLike<OperationState<JobExecution>, JobExecution>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    options?: JobExecutionsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JobExecution>, JobExecution>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    options?: JobExecutionsCreateOptionalParams,
  ) => Promise<JobExecution>;
  /** Lists all executions in a job agent. */
  listByAgent: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: JobExecutionsListByAgentOptionalParams,
  ) => PagedAsyncIterableIterator<JobExecution>;
  /** Lists a job's executions. */
  listByJob: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    options?: JobExecutionsListByJobOptionalParams,
  ) => PagedAsyncIterableIterator<JobExecution>;
  /** Requests cancellation of a job execution. */
  cancel: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    options?: JobExecutionsCancelOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a job execution. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    options?: JobExecutionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<JobExecution>, JobExecution>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    options?: JobExecutionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JobExecution>, JobExecution>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    options?: JobExecutionsCreateOrUpdateOptionalParams,
  ) => Promise<JobExecution>;
  /** Gets a job execution. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    jobName: string,
    jobExecutionId: string,
    options?: JobExecutionsGetOptionalParams,
  ) => Promise<JobExecution>;
}

function _getJobExecutions(context: SqlManagementContext) {
  return {
    create: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      options?: JobExecutionsCreateOptionalParams,
    ) => create(context, resourceGroupName, serverName, jobAgentName, jobName, options),
    beginCreate: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      options?: JobExecutionsCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, serverName, jobAgentName, jobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      options?: JobExecutionsCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, serverName, jobAgentName, jobName, options);
    },
    listByAgent: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      options?: JobExecutionsListByAgentOptionalParams,
    ) => listByAgent(context, resourceGroupName, serverName, jobAgentName, options),
    listByJob: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      options?: JobExecutionsListByJobOptionalParams,
    ) => listByJob(context, resourceGroupName, serverName, jobAgentName, jobName, options),
    cancel: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      options?: JobExecutionsCancelOptionalParams,
    ) =>
      cancel(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      options?: JobExecutionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      options?: JobExecutionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      options?: JobExecutionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        jobName,
        jobExecutionId,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      jobName: string,
      jobExecutionId: string,
      options?: JobExecutionsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, serverName, jobAgentName, jobName, jobExecutionId, options),
  };
}

export function _getJobExecutionsOperations(
  context: SqlManagementContext,
): JobExecutionsOperations {
  return {
    ..._getJobExecutions(context),
  };
}
