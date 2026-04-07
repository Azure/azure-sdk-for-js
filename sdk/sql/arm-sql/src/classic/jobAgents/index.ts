// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByServer,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/jobAgents/operations.js";
import type {
  JobAgentsListByServerOptionalParams,
  JobAgentsDeleteOptionalParams,
  JobAgentsUpdateOptionalParams,
  JobAgentsCreateOrUpdateOptionalParams,
  JobAgentsGetOptionalParams,
} from "../../api/jobAgents/options.js";
import type { JobAgent, JobAgentUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a JobAgents operations. */
export interface JobAgentsOperations {
  /** Gets a list of job agents in a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: JobAgentsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<JobAgent>;
  /** Deletes a job agent. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: JobAgentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: JobAgentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: JobAgentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a job agent. */
  update: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    parameters: JobAgentUpdate,
    options?: JobAgentsUpdateOptionalParams,
  ) => PollerLike<OperationState<JobAgent>, JobAgent>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    parameters: JobAgentUpdate,
    options?: JobAgentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JobAgent>, JobAgent>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    parameters: JobAgentUpdate,
    options?: JobAgentsUpdateOptionalParams,
  ) => Promise<JobAgent>;
  /** Creates or updates a job agent. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    parameters: JobAgent,
    options?: JobAgentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<JobAgent>, JobAgent>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    parameters: JobAgent,
    options?: JobAgentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JobAgent>, JobAgent>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    parameters: JobAgent,
    options?: JobAgentsCreateOrUpdateOptionalParams,
  ) => Promise<JobAgent>;
  /** Gets a job agent. */
  get: (
    resourceGroupName: string,
    serverName: string,
    jobAgentName: string,
    options?: JobAgentsGetOptionalParams,
  ) => Promise<JobAgent>;
}

function _getJobAgents(context: SqlContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: JobAgentsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      options?: JobAgentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, jobAgentName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      options?: JobAgentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, jobAgentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      options?: JobAgentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, jobAgentName, options);
    },
    update: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      parameters: JobAgentUpdate,
      options?: JobAgentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, serverName, jobAgentName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      parameters: JobAgentUpdate,
      options?: JobAgentsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      parameters: JobAgentUpdate,
      options?: JobAgentsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      parameters: JobAgent,
      options?: JobAgentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, jobAgentName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      parameters: JobAgent,
      options?: JobAgentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      parameters: JobAgent,
      options?: JobAgentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        jobAgentName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      jobAgentName: string,
      options?: JobAgentsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, jobAgentName, options),
  };
}

export function _getJobAgentsOperations(context: SqlContext): JobAgentsOperations {
  return {
    ..._getJobAgents(context),
  };
}
