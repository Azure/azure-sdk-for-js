// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext } from "../../api/containerAppsAPIContext.js";
import {
  getDetector,
  listDetectors,
  proxyGet,
  stopExecution,
  suspend,
  resume,
  listSecrets,
  stopMultipleExecutions,
  start,
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/jobs/operations.js";
import {
  JobsGetDetectorOptionalParams,
  JobsListDetectorsOptionalParams,
  JobsProxyGetOptionalParams,
  JobsStopExecutionOptionalParams,
  JobsSuspendOptionalParams,
  JobsResumeOptionalParams,
  JobsListSecretsOptionalParams,
  JobsStopMultipleExecutionsOptionalParams,
  JobsStartOptionalParams,
  JobsListBySubscriptionOptionalParams,
  JobsListByResourceGroupOptionalParams,
  JobsDeleteOptionalParams,
  JobsUpdateOptionalParams,
  JobsCreateOrUpdateOptionalParams,
  JobsGetOptionalParams,
} from "../../api/jobs/options.js";
import {
  Job,
  JobPatchProperties,
  JobExecutionBase,
  ContainerAppJobExecutions,
  JobSecretsCollection,
  Diagnostics,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Jobs operations. */
export interface JobsOperations {
  /** Get the diagnostics data for a Container App Job. */
  getDetector: (
    resourceGroupName: string,
    jobName: string,
    detectorName: string,
    options?: JobsGetDetectorOptionalParams,
  ) => Promise<Diagnostics>;
  /** Get the list of diagnostics for a Container App Job. */
  listDetectors: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsListDetectorsOptionalParams,
  ) => PagedAsyncIterableIterator<Diagnostics>;
  /** Get the properties of a Container App Job. */
  proxyGet: (
    resourceGroupName: string,
    jobName: string,
    apiName: string,
    options?: JobsProxyGetOptionalParams,
  ) => Promise<Job>;
  /** Terminates execution of a running container apps job */
  stopExecution: (
    resourceGroupName: string,
    jobName: string,
    jobExecutionName: string,
    options?: JobsStopExecutionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use stopExecution instead */
  beginStopExecution: (
    resourceGroupName: string,
    jobName: string,
    jobExecutionName: string,
    options?: JobsStopExecutionOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use stopExecution instead */
  beginStopExecutionAndWait: (
    resourceGroupName: string,
    jobName: string,
    jobExecutionName: string,
    options?: JobsStopExecutionOptionalParams,
  ) => Promise<void>;
  /** Suspends a job */
  suspend: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsSuspendOptionalParams,
  ) => PollerLike<OperationState<Job>, Job>;
  /** @deprecated use suspend instead */
  beginSuspend: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsSuspendOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Job>, Job>>;
  /** @deprecated use suspend instead */
  beginSuspendAndWait: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsSuspendOptionalParams,
  ) => Promise<Job>;
  /** Resumes a suspended job */
  resume: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsResumeOptionalParams,
  ) => PollerLike<OperationState<Job>, Job>;
  /** @deprecated use resume instead */
  beginResume: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsResumeOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Job>, Job>>;
  /** @deprecated use resume instead */
  beginResumeAndWait: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsResumeOptionalParams,
  ) => Promise<Job>;
  /** List secrets for a container apps job */
  listSecrets: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsListSecretsOptionalParams,
  ) => Promise<JobSecretsCollection>;
  /** Terminates execution of a running container apps job */
  stopMultipleExecutions: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsStopMultipleExecutionsOptionalParams,
  ) => PollerLike<OperationState<ContainerAppJobExecutions>, ContainerAppJobExecutions>;
  /** @deprecated use stopMultipleExecutions instead */
  beginStopMultipleExecutions: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsStopMultipleExecutionsOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ContainerAppJobExecutions>, ContainerAppJobExecutions>
  >;
  /** @deprecated use stopMultipleExecutions instead */
  beginStopMultipleExecutionsAndWait: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsStopMultipleExecutionsOptionalParams,
  ) => Promise<ContainerAppJobExecutions>;
  /** Start a Container Apps Job */
  start: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsStartOptionalParams,
  ) => PollerLike<OperationState<JobExecutionBase>, JobExecutionBase>;
  /** @deprecated use start instead */
  beginStart: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsStartOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<JobExecutionBase>, JobExecutionBase>>;
  /** @deprecated use start instead */
  beginStartAndWait: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsStartOptionalParams,
  ) => Promise<JobExecutionBase>;
  /** Get the Container Apps Jobs in a given subscription. */
  listBySubscription: (
    options?: JobsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Job>;
  /** Get the Container Apps Jobs in a given resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: JobsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Job>;
  /** Delete a Container Apps Job. */
  delete: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsDeleteOptionalParams,
  ) => Promise<void>;
  /** Patches a Container Apps Job using JSON Merge Patch */
  update: (
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: JobPatchProperties,
    options?: JobsUpdateOptionalParams,
  ) => PollerLike<OperationState<Job>, Job>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: JobPatchProperties,
    options?: JobsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Job>, Job>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: JobPatchProperties,
    options?: JobsUpdateOptionalParams,
  ) => Promise<Job>;
  /** Create or Update a Container Apps Job. */
  createOrUpdate: (
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: Job,
    options?: JobsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Job>, Job>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: Job,
    options?: JobsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Job>, Job>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    jobName: string,
    jobEnvelope: Job,
    options?: JobsCreateOrUpdateOptionalParams,
  ) => Promise<Job>;
  /** Get the properties of a Container Apps Job. */
  get: (
    resourceGroupName: string,
    jobName: string,
    options?: JobsGetOptionalParams,
  ) => Promise<Job>;
}

function _getJobs(context: ContainerAppsAPIContext) {
  return {
    getDetector: (
      resourceGroupName: string,
      jobName: string,
      detectorName: string,
      options?: JobsGetDetectorOptionalParams,
    ) => getDetector(context, resourceGroupName, jobName, detectorName, options),
    listDetectors: (
      resourceGroupName: string,
      jobName: string,
      options?: JobsListDetectorsOptionalParams,
    ) => listDetectors(context, resourceGroupName, jobName, options),
    proxyGet: (
      resourceGroupName: string,
      jobName: string,
      apiName: string,
      options?: JobsProxyGetOptionalParams,
    ) => proxyGet(context, resourceGroupName, jobName, apiName, options),
    stopExecution: (
      resourceGroupName: string,
      jobName: string,
      jobExecutionName: string,
      options?: JobsStopExecutionOptionalParams,
    ) => stopExecution(context, resourceGroupName, jobName, jobExecutionName, options),
    beginStopExecution: async (
      resourceGroupName: string,
      jobName: string,
      jobExecutionName: string,
      options?: JobsStopExecutionOptionalParams,
    ) => {
      const poller = stopExecution(context, resourceGroupName, jobName, jobExecutionName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopExecutionAndWait: async (
      resourceGroupName: string,
      jobName: string,
      jobExecutionName: string,
      options?: JobsStopExecutionOptionalParams,
    ) => {
      return await stopExecution(context, resourceGroupName, jobName, jobExecutionName, options);
    },
    suspend: (resourceGroupName: string, jobName: string, options?: JobsSuspendOptionalParams) =>
      suspend(context, resourceGroupName, jobName, options),
    beginSuspend: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsSuspendOptionalParams,
    ) => {
      const poller = suspend(context, resourceGroupName, jobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSuspendAndWait: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsSuspendOptionalParams,
    ) => {
      return await suspend(context, resourceGroupName, jobName, options);
    },
    resume: (resourceGroupName: string, jobName: string, options?: JobsResumeOptionalParams) =>
      resume(context, resourceGroupName, jobName, options),
    beginResume: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsResumeOptionalParams,
    ) => {
      const poller = resume(context, resourceGroupName, jobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginResumeAndWait: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsResumeOptionalParams,
    ) => {
      return await resume(context, resourceGroupName, jobName, options);
    },
    listSecrets: (
      resourceGroupName: string,
      jobName: string,
      options?: JobsListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, jobName, options),
    stopMultipleExecutions: (
      resourceGroupName: string,
      jobName: string,
      options?: JobsStopMultipleExecutionsOptionalParams,
    ) => stopMultipleExecutions(context, resourceGroupName, jobName, options),
    beginStopMultipleExecutions: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsStopMultipleExecutionsOptionalParams,
    ) => {
      const poller = stopMultipleExecutions(context, resourceGroupName, jobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStopMultipleExecutionsAndWait: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsStopMultipleExecutionsOptionalParams,
    ) => {
      return await stopMultipleExecutions(context, resourceGroupName, jobName, options);
    },
    start: (resourceGroupName: string, jobName: string, options?: JobsStartOptionalParams) =>
      start(context, resourceGroupName, jobName, options),
    beginStart: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsStartOptionalParams,
    ) => {
      const poller = start(context, resourceGroupName, jobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginStartAndWait: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsStartOptionalParams,
    ) => {
      return await start(context, resourceGroupName, jobName, options);
    },
    listBySubscription: (options?: JobsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: JobsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, jobName: string, options?: JobsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, jobName, options),
    beginDelete: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, jobName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      jobName: string,
      options?: JobsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, jobName, options);
    },
    update: (
      resourceGroupName: string,
      jobName: string,
      jobEnvelope: JobPatchProperties,
      options?: JobsUpdateOptionalParams,
    ) => update(context, resourceGroupName, jobName, jobEnvelope, options),
    beginUpdate: async (
      resourceGroupName: string,
      jobName: string,
      jobEnvelope: JobPatchProperties,
      options?: JobsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, jobName, jobEnvelope, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      jobName: string,
      jobEnvelope: JobPatchProperties,
      options?: JobsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, jobName, jobEnvelope, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      jobName: string,
      jobEnvelope: Job,
      options?: JobsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, jobName, jobEnvelope, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      jobName: string,
      jobEnvelope: Job,
      options?: JobsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, jobName, jobEnvelope, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      jobName: string,
      jobEnvelope: Job,
      options?: JobsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, jobName, jobEnvelope, options);
    },
    get: (resourceGroupName: string, jobName: string, options?: JobsGetOptionalParams) =>
      get(context, resourceGroupName, jobName, options),
  };
}

export function _getJobsOperations(context: ContainerAppsAPIContext): JobsOperations {
  return {
    ..._getJobs(context),
  };
}
