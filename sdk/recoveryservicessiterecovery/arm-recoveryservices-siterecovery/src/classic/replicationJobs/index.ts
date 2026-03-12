// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  $export,
  resume,
  restart,
  cancel,
  list,
  get,
} from "../../api/replicationJobs/operations.js";
import type {
  ReplicationJobsExportOptionalParams,
  ReplicationJobsResumeOptionalParams,
  ReplicationJobsRestartOptionalParams,
  ReplicationJobsCancelOptionalParams,
  ReplicationJobsListOptionalParams,
  ReplicationJobsGetOptionalParams,
} from "../../api/replicationJobs/options.js";
import type { Job, ResumeJobParams, JobQueryParameter } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ReplicationJobs operations. */
export interface ReplicationJobsOperations {
  /** The operation to export the details of the Azure Site Recovery jobs of the vault. */
  /**
   *  @fixme export is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  export: (
    resourceGroupName: string,
    resourceName: string,
    jobQueryParameter: JobQueryParameter,
    options?: ReplicationJobsExportOptionalParams,
  ) => PollerLike<OperationState<Job>, Job>;
  /** @deprecated use export instead */
  beginExport: (
    resourceGroupName: string,
    resourceName: string,
    jobQueryParameter: JobQueryParameter,
    options?: ReplicationJobsExportOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Job>, Job>>;
  /** @deprecated use export instead */
  beginExportAndWait: (
    resourceGroupName: string,
    resourceName: string,
    jobQueryParameter: JobQueryParameter,
    options?: ReplicationJobsExportOptionalParams,
  ) => Promise<Job>;
  /** The operation to resume an Azure Site Recovery job. */
  resume: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    resumeJobParams: ResumeJobParams,
    options?: ReplicationJobsResumeOptionalParams,
  ) => PollerLike<OperationState<Job>, Job>;
  /** @deprecated use resume instead */
  beginResume: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    resumeJobParams: ResumeJobParams,
    options?: ReplicationJobsResumeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Job>, Job>>;
  /** @deprecated use resume instead */
  beginResumeAndWait: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    resumeJobParams: ResumeJobParams,
    options?: ReplicationJobsResumeOptionalParams,
  ) => Promise<Job>;
  /** The operation to restart an Azure Site Recovery job. */
  restart: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    options?: ReplicationJobsRestartOptionalParams,
  ) => PollerLike<OperationState<Job>, Job>;
  /** @deprecated use restart instead */
  beginRestart: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    options?: ReplicationJobsRestartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Job>, Job>>;
  /** @deprecated use restart instead */
  beginRestartAndWait: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    options?: ReplicationJobsRestartOptionalParams,
  ) => Promise<Job>;
  /** The operation to cancel an Azure Site Recovery job. */
  cancel: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    options?: ReplicationJobsCancelOptionalParams,
  ) => PollerLike<OperationState<Job>, Job>;
  /** @deprecated use cancel instead */
  beginCancel: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    options?: ReplicationJobsCancelOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Job>, Job>>;
  /** @deprecated use cancel instead */
  beginCancelAndWait: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    options?: ReplicationJobsCancelOptionalParams,
  ) => Promise<Job>;
  /** Gets the list of Azure Site Recovery Jobs for the vault. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationJobsListOptionalParams,
  ) => PagedAsyncIterableIterator<Job>;
  /** Get the details of an Azure Site Recovery job. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    jobName: string,
    options?: ReplicationJobsGetOptionalParams,
  ) => Promise<Job>;
}

function _getReplicationJobs(context: SiteRecoveryManagementContext) {
  return {
    export: (
      resourceGroupName: string,
      resourceName: string,
      jobQueryParameter: JobQueryParameter,
      options?: ReplicationJobsExportOptionalParams,
    ) => $export(context, resourceGroupName, resourceName, jobQueryParameter, options),
    beginExport: async (
      resourceGroupName: string,
      resourceName: string,
      jobQueryParameter: JobQueryParameter,
      options?: ReplicationJobsExportOptionalParams,
    ) => {
      const poller = $export(context, resourceGroupName, resourceName, jobQueryParameter, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginExportAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      jobQueryParameter: JobQueryParameter,
      options?: ReplicationJobsExportOptionalParams,
    ) => {
      return await $export(context, resourceGroupName, resourceName, jobQueryParameter, options);
    },
    resume: (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      resumeJobParams: ResumeJobParams,
      options?: ReplicationJobsResumeOptionalParams,
    ) => resume(context, resourceGroupName, resourceName, jobName, resumeJobParams, options),
    beginResume: async (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      resumeJobParams: ResumeJobParams,
      options?: ReplicationJobsResumeOptionalParams,
    ) => {
      const poller = resume(
        context,
        resourceGroupName,
        resourceName,
        jobName,
        resumeJobParams,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumeAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      resumeJobParams: ResumeJobParams,
      options?: ReplicationJobsResumeOptionalParams,
    ) => {
      return await resume(
        context,
        resourceGroupName,
        resourceName,
        jobName,
        resumeJobParams,
        options,
      );
    },
    restart: (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      options?: ReplicationJobsRestartOptionalParams,
    ) => restart(context, resourceGroupName, resourceName, jobName, options),
    beginRestart: async (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      options?: ReplicationJobsRestartOptionalParams,
    ) => {
      const poller = restart(context, resourceGroupName, resourceName, jobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginRestartAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      options?: ReplicationJobsRestartOptionalParams,
    ) => {
      return await restart(context, resourceGroupName, resourceName, jobName, options);
    },
    cancel: (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      options?: ReplicationJobsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, resourceName, jobName, options),
    beginCancel: async (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      options?: ReplicationJobsCancelOptionalParams,
    ) => {
      const poller = cancel(context, resourceGroupName, resourceName, jobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCancelAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      options?: ReplicationJobsCancelOptionalParams,
    ) => {
      return await cancel(context, resourceGroupName, resourceName, jobName, options);
    },
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: ReplicationJobsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    get: (
      resourceGroupName: string,
      resourceName: string,
      jobName: string,
      options?: ReplicationJobsGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, jobName, options),
  };
}

export function _getReplicationJobsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationJobsOperations {
  return {
    ..._getReplicationJobs(context),
  };
}
