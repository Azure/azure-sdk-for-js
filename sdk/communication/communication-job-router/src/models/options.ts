// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import {
  JobRouterReclassifyJobActionOptionalParams,
  JobRouterUpsertClassificationPolicyOptionalParams,
  JobRouterUpsertDistributionPolicyOptionalParams,
  JobRouterUpsertExceptionPolicyOptionalParams,
  JobRouterUpsertJobOptionalParams,
  JobRouterUpsertQueueOptionalParams,
  JobRouterUpsertWorkerOptionalParams,
  JobStateSelector,
  RouterJob,
  WorkerStateSelector
} from "../generated/src";
import * as coreHttp from "@azure/core-http";

/**
 * Options to create router client.
 */
export interface RouterClientOptions extends PipelineOptions {
  /** The headers to be set on requests **/
  headers?: { [propertyName: string]: any };
}

/**
 * Options to create a classification policy.
 */
export interface CreateClassificationPolicyOptions
  extends JobRouterUpsertClassificationPolicyOptionalParams {}

/**
 * Options to update a classification policy.
 */
export interface UpdateClassificationPolicyOptions
  extends JobRouterUpsertClassificationPolicyOptionalParams {}

/**
 * Options to get a classification policy.
 */
export interface GetClassificationPolicyOptions extends coreHttp.OperationOptions {}

/**
 * Options to delete a classification policy.
 */
export interface DeleteClassificationPolicyOptions extends coreHttp.OperationOptions {}

/**
 * Options to get classification policies.
 */
export interface ListClassificationPoliciesOptions extends coreHttp.OperationOptions {
  /** Maximum page size */
  maxpagesize?: number;
}

/**
 * Options to create a distribution policy.
 */
export interface CreateDistributionPolicyOptions
  extends JobRouterUpsertDistributionPolicyOptionalParams {}

/**
 * Options to update a distribution policy.
 */
export interface UpdateDistributionPolicyOptions
  extends JobRouterUpsertDistributionPolicyOptionalParams {}

/**
 * Options to get a distribution policy.
 */
export interface GetDistributionPolicyOptions extends coreHttp.OperationOptions {}

/**
 * Options to delete a distribution policy.
 */
export interface DeleteDistributionPolicyOptions extends coreHttp.OperationOptions {}

/**
 * Options to get distribution policies.
 */
export interface ListDistributionPoliciesOptions extends coreHttp.OperationOptions {
  /** Maximum page size */
  maxpagesize?: number;
}

/**
 * Options to create a exception policy.
 */
export interface CreateExceptionPolicyOptions
  extends JobRouterUpsertExceptionPolicyOptionalParams {}

/**
 * Options to update a exception policy.
 */
export interface UpdateExceptionPolicyOptions
  extends JobRouterUpsertExceptionPolicyOptionalParams {}

/**
 * Options to get a exception policy.
 */
export interface GetExceptionPolicyOptions extends coreHttp.OperationOptions {}

/**
 * Options to delete a exception policy.
 */
export interface DeleteExceptionPolicyOptions extends coreHttp.OperationOptions {}

/**
 * Options to get exception policies.
 */
export interface ListExceptionPoliciesOptions extends coreHttp.OperationOptions {
  /** Number of objects to return per page */
  maxpagesize?: number;
}

/**
 * Options to create a job.
 */
export interface CreateJobOptions extends JobRouterUpsertJobOptionalParams {}

/**
 * Options to update a job.
 */
export interface UpdateJobOptions extends JobRouterUpsertJobOptionalParams {}

/**
 * Options to reclassify a job.
 */
export interface ReclassifyJobOptions extends JobRouterReclassifyJobActionOptionalParams {}

/**
 * Options to update or insert a job's labels.
 */
export interface UpdateJobLabelsOptions extends coreHttp.OperationOptions {
  /** Request model for patching a job */
  patch?: RouterJob;
  /** If set to true, will force classification. Defaults to false. */
  forceClassification?: boolean;
}

/**
 * Options to update a job's classification.
 */
export interface UpdateJobClassificationOptions extends coreHttp.OperationOptions {
  /** Request model for patching a job */
  patch?: RouterJob;
  /** If set to true, will force classification. Defaults to false. */
  forceClassification?: boolean;
}

/**
 * Options to get a job's position details.
 */
export interface GetJobPositionOptions extends coreHttp.OperationOptions {}

/**
 * Options to get a job.
 */
export interface GetJobOptions extends coreHttp.OperationOptions {}

/**
 * Options to cancel a job.
 */
export interface CancelJobOptions extends coreHttp.OperationOptions {
  /** (Optional) A note that will be appended to the jobs' Notes collection with th current timestamp. */
  note?: string;
  /**
   * Indicates the outcome of the job, populate this field with your own custom values.
   * If not provided, default value of "Cancelled" is set.
   */
  dispositionCode?: string;
}

/**
 * Options to accept a job.
 */
export interface AcceptJobOptions extends coreHttp.OperationOptions {}

/**
 * Options to decline a job.
 */
export interface DeclineJobOptions extends coreHttp.OperationOptions {}

/**
 * Options to complete a job.
 */
export interface CompleteJobOptions extends coreHttp.OperationOptions {
  /** (Optional) A note that will be appended to the jobs' Notes collection with th current timestamp. */
  note?: string;
}

/**
 * Options to close a job.
 */
export interface CloseJobOptions extends coreHttp.OperationOptions {
  /** Indicates the outcome of the job, populate this field with your own custom values. */
  dispositionCode?: string;
  /**
   * If not provided, worker capacity is released immediately along with a JobClosedEvent notification.
   * If provided, worker capacity is released along with a JobClosedEvent notification at a future time.
   */
  closeTime?: Date;
  /** (Optional) A note that will be appended to the jobs' Notes collection with th current timestamp. */
  note?: string;
}

/**
 * Options to get router jobs.
 */
export interface ListJobsOptions extends coreHttp.OperationOptions {
  /** Number of objects to return per page */
  maxpagesize?: number;
  /** (Optional) If specified, filter jobs by status. */
  status?: JobStateSelector;
  /** (Optional) If specified, filter jobs by queue. */
  queueId?: string;
  /** (Optional) If specified, filter jobs by channel. */
  channelId?: string;
}

/**
 * Options to delete a job.
 */
export interface DeleteJobOptions extends coreHttp.OperationOptions {}

/**
 * Options to create a worker.
 */
export interface CreateWorkerOptions extends JobRouterUpsertWorkerOptionalParams {}

/**
 * Options to update a worker.
 */
export interface UpdateWorkerOptions extends JobRouterUpsertWorkerOptionalParams {}

/**
 * Options to update a worker.
 */
export interface RegisterWorkerOptions extends JobRouterUpsertWorkerOptionalParams {}

/**
 * Options to update a worker.
 */
export interface DeregisterWorkerOptions extends JobRouterUpsertWorkerOptionalParams {}

/**
 * Options to get a worker.
 */
export interface GetWorkerOptions extends coreHttp.OperationOptions {}

/**
 * Options to get existing workers.
 */
export interface ListWorkersOptions extends coreHttp.OperationOptions {
  /** Number of objects to return per page */
  maxpagesize?: number;
  /** (Optional) If specified, select workers who are assigned to this queue */
  queueId?: string;
  /** (Optional) If specified, select workers who have a channel configuration with this channel */
  channelId?: string;
  /** (Optional) If specified, select workers by worker status. */
  status?: WorkerStateSelector;
  /**
   * (Optional) If set to true, select only workers who have capacity for the channel specified by `channelId` or for any channel
   *             if `channelId` not specified. If set to false, then will return all workers including workers without any capacity for jobs. Defaults to false.
   */
  hasCapacity?: boolean;
}

/**
 * Options to delete a worker.
 */
export interface DeleteWorkerOptions extends coreHttp.OperationOptions {}

/**
 * Options to create a queue.
 */
export interface CreateQueueOptions extends JobRouterUpsertQueueOptionalParams {}

/**
 * Options to update a queue.
 */
export interface UpdateQueueOptions extends JobRouterUpsertQueueOptionalParams {}

/**
 * Options to get a queue.
 */
export interface GetQueueOptions extends coreHttp.OperationOptions {}

/**
 * Options to list queues.
 */
export interface ListQueuesOptions extends coreHttp.OperationOptions {
  /** Number of objects to return per page */
  maxpagesize?: number;
}

/**
 * Options to delete a queue.
 */
export interface DeleteQueueOptions extends coreHttp.OperationOptions {}
