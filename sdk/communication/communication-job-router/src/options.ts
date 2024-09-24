// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  JobRouterAdministrationUpsertClassificationPolicyOptionalParams,
  JobRouterAdministrationUpsertDistributionPolicyOptionalParams,
  JobRouterAdministrationUpsertExceptionPolicyOptionalParams,
  JobRouterAdministrationUpsertQueueOptionalParams,
  JobRouterCloseJobActionOptionalParams,
  JobRouterDeclineJobActionOptionalParams,
  JobRouterReclassifyJobActionOptionalParams,
  JobRouterUpsertJobOptionalParams,
  JobRouterUpsertWorkerOptionalParams,
  JobRouterUnassignJobActionOptionalParams,
  ChannelConfiguration,
} from "./generated/src";
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import {
  JSONObject,
  RouterJobMatchingMode,
  RouterJobNote,
  RouterRuleUnion,
  WorkerSelectorAttachmentUnion,
  RouterWorkerSelector,
  DistributionModeUnion,
  QueueSelectorAttachmentUnion,
  ExceptionRule,
  RouterJobStatusSelector,
  RouterWorkerStateSelector,
} from "./models";

/**
 * Options to create a job router administration client.
 */
export interface JobRouterAdministrationClientOptions extends CommonClientOptions {}

/**
 * Options to create a job router client.
 */
export interface JobRouterClientOptions extends CommonClientOptions {
  /** The headers to be set on requests **/
  headers?: JSONObject;
}

/**
 * Options to create a classification policy.
 */
export interface CreateClassificationPolicyOptions
  extends JobRouterAdministrationUpsertClassificationPolicyOptionalParams {
  /** Friendly name of this policy. */
  name?: string;
  /** The fallback queue to select if the queue selector doesn't find a match. */
  fallbackQueueId?: string;
  /** The queue selectors to resolve a queue for a given job. */
  queueSelectors?: QueueSelectorAttachmentUnion[];
  /** The worker selectors to determine workers that are eligible for a given job. */
  workerSelectors?: WorkerSelectorAttachmentUnion[];
  /** Prioritization rule to determine the priority for a given job. */
  prioritizationRule?: RouterRuleUnion;
}

/**
 * Options to update a classification policy.
 */
export interface UpdateClassificationPolicyOptions
  extends JobRouterAdministrationUpsertClassificationPolicyOptionalParams {
  /** Friendly name of this policy. */
  name?: string;
  /** The fallback queue to select if the queue selector doesn't find a match. */
  fallbackQueueId?: string;
  /** The queue selectors to resolve a queue for a given job. */
  queueSelectors?: QueueSelectorAttachmentUnion[];
  /** The worker selectors to determine workers that are eligible for a given job. */
  workerSelectors?: WorkerSelectorAttachmentUnion[];
  /** Prioritization rule to determine the priority for a given job. */
  prioritizationRule?: RouterRuleUnion;
}

/**
 * Options to list classification policies.
 */
export interface ListClassificationPoliciesOptions extends OperationOptions {
  /** Maximum page size */
  maxPageSize?: number;
}

/**
 * Options to create a distribution policy.
 */
export interface CreateDistributionPolicyOptions
  extends JobRouterAdministrationUpsertDistributionPolicyOptionalParams {
  /** The human readable name of the policy. */
  name?: string;
  /** The expiry time of any offers created under this policy will be governed by the offer time to live. */
  offerExpiresAfterSeconds?: number;
  /** The distribution mode used to distribute offers to workers on this queue. */
  mode?: DistributionModeUnion;
}

/**
 * Options to update a distribution policy.
 */
export interface UpdateDistributionPolicyOptions
  extends JobRouterAdministrationUpsertDistributionPolicyOptionalParams {
  /** The human readable name of the policy. */
  name?: string;
  /** The expiry time of any offers created under this policy will be governed by the offer time to live. */
  offerExpiresAfterSeconds?: number;
  /** The distribution mode used to distribute offers to workers on this queue. */
  mode?: DistributionModeUnion;
}

/**
 * Options to list distribution policies.
 */
export interface ListDistributionPoliciesOptions extends OperationOptions {
  /** Maximum page size */
  maxPageSize?: number;
}

/**
 * Options to create an exception policy.
 */
export interface CreateExceptionPolicyOptions
  extends JobRouterAdministrationUpsertExceptionPolicyOptionalParams {
  /** (Optional) The name of the exception policy. */
  name?: string;
  /** (Optional) A dictionary collection of exception rules on the exception policy. Key is the Id of each exception rule. */
  exceptionRules?: { [propertyName: string]: ExceptionRule };
}

/**
 * Options to update an exception policy.
 */
export interface UpdateExceptionPolicyOptions
  extends JobRouterAdministrationUpsertExceptionPolicyOptionalParams {
  /** (Optional) The name of the exception policy. */
  name?: string;
  /** (Optional) A dictionary collection of exception rules on the exception policy. Key is the Id of each exception rule. */
  exceptionRules?: { [propertyName: string]: ExceptionRule };
}

/**
 * Options to list exception policies.
 */
export interface ListExceptionPoliciesOptions extends OperationOptions {
  /** Number of objects to return per page */
  maxPageSize?: number;
}

/**
 * Options to create a queue.
 */
export interface CreateQueueOptions extends JobRouterAdministrationUpsertQueueOptionalParams {
  /** The name of this queue. */
  name?: string;
  /** The ID of the distribution policy that will determine how a job is distributed to workers. */
  distributionPolicyId?: string;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** (Optional) The ID of the exception policy that determines various job escalation rules. */
  exceptionPolicyId?: string;
}

/**
 * Options to update a queue.
 */
export interface UpdateQueueOptions extends JobRouterAdministrationUpsertQueueOptionalParams {
  /** The name of this queue. */
  name?: string;
  /** The ID of the distribution policy that will determine how a job is distributed to workers. */
  distributionPolicyId?: string;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** (Optional) The ID of the exception policy that determines various job escalation rules. */
  exceptionPolicyId?: string;
}

/**
 * Options to list queues.
 */
export interface ListQueuesOptions extends OperationOptions {
  /** Number of objects to return per page */
  maxPageSize?: number;
}

/**
 * Options to create a job.
 */
export interface CreateJobOptions extends JobRouterUpsertJobOptionalParams {
  /** Reference to an external parent context, eg. call ID. */
  channelReference?: string;
  /** The channel identifier. eg. voice, chat, etc. */
  channelId?: string;
  /** The Id of the Classification policy used for classifying a job. */
  classificationPolicyId?: string;
  /** The Id of the Queue that this job is queued to. */
  queueId?: string;
  /** The priority of this job. */
  priority?: number;
  /** Reason code for cancelled or closed jobs. */
  dispositionCode?: string;
  /** A collection of manually specified label selectors, which a worker must satisfy in order to process this job. */
  requestedWorkerSelectors?: RouterWorkerSelector[];
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** A set of non-identifying attributes attached to this job */
  tags?: JSONObject;
  /** Notes attached to a job, sorted by timestamp */
  notes?: RouterJobNote[];
  /** The mode the job is matched as. */
  matchingMode?: RouterJobMatchingMode;
}

/**
 * Options to update a job.
 */
export interface UpdateJobOptions extends JobRouterUpsertJobOptionalParams {
  /** Reference to an external parent context, eg. call ID. */
  channelReference?: string;
  /** The channel identifier. eg. voice, chat, etc. */
  channelId?: string;
  /** The Id of the Classification policy used for classifying a job. */
  classificationPolicyId?: string;
  /** The Id of the Queue that this job is queued to. */
  queueId?: string;
  /** The priority of this job. */
  priority?: number;
  /** Reason code for cancelled or closed jobs. */
  dispositionCode?: string;
  /** A collection of manually specified label selectors, which a worker must satisfy in order to process this job. */
  requestedWorkerSelectors?: RouterWorkerSelector[];
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** A set of non-identifying attributes attached to this job */
  tags?: JSONObject;
  /** Notes attached to a job, sorted by timestamp */
  notes?: RouterJobNote[];
  /** The mode the job is matched as. */
  matchingMode?: RouterJobMatchingMode;
}

/**
 * Options to get router jobs.
 */
export interface ListJobsOptions extends OperationOptions {
  /** Number of objects to return per page */
  maxPageSize?: number;
  /** (Optional) If specified, filter jobs by status. */
  statusSelector?: RouterJobStatusSelector;
  /** (Optional) If specified, filter jobs by queue. */
  queueId?: string;
  /** (Optional) If specified, filter jobs by channel. */
  channelId?: string;
  /** (Optional) If specified, filter jobs by classificationPolicy. */
  classificationPolicyId?: string;
  /** (Optional) If specified, filter on jobs that was scheduled before or at given timestamp. Range: (-Inf, scheduledBefore] */
  scheduledBefore?: Date;
  /** (Optional) If specified, filter on jobs that was scheduled at or after given value. Range: [scheduledAfter, +Inf). */
  scheduledAfter?: Date;
}

/**
 * Options to reclassify a job.
 */
export interface ReclassifyJobOptions extends JobRouterReclassifyJobActionOptionalParams {
  /** Request object for reclassifying a job. */
  reclassifyJobRequest?: JSONObject;
}

/**
 * Options to cancel a job.
 */
export interface CancelJobOptions extends OperationOptions {
  /** (Optional) A note that will be appended to the jobs' Notes collection with the current timestamp. */
  note?: string;
  /**
   * Indicates the outcome of the job, populate this field with your own custom values.
   * If not provided, default value of "Cancelled" is set.
   */
  dispositionCode?: string;
}

/**
 * Options to complete a job.
 */
export interface CompleteJobOptions extends OperationOptions {
  /** (Optional) A note that will be appended to the jobs' Notes collection with the current timestamp. */
  note?: string;
}

/**
 * Options to close a job.
 */
export interface CloseJobOptions extends JobRouterCloseJobActionOptionalParams {
  /** Indicates the outcome of the job, populate this field with your own custom values. */
  dispositionCode?: string;
  /**
   * If not provided, worker capacity is released immediately along with a JobClosedEvent notification.
   * If provided, worker capacity is released along with a JobClosedEvent notification at a future time in UTC.
   */
  closeAt?: Date;
  /** (Optional) A note that will be appended to the jobs' Notes collection with the current timestamp. */
  note?: string;
}

/**
 * Options to unassign a job.
 */
export interface UnassignJobOptions extends JobRouterUnassignJobActionOptionalParams {
  /** If WaitForActivation is true, then the job is not queued for re-matching with a worker. */
  suspendMatching?: boolean;
}

/**
 * Options to decline a job.
 */
export interface DeclineJobOfferOptions extends JobRouterDeclineJobActionOptionalParams {
  /**
   * If the reoffer time is not provided, then this job will not be re-offered to the worker who declined this job unless
   * the worker is de-registered and re-registered.  If a reoffer time is provided, then the job will be re-matched to
   * eligible workers after the reoffer time.  The worker that declined the job will also be eligible for the job at that time.
   */
  retryOfferAt?: Date;
}

/**
 * Options to create a worker.
 */
export interface CreateWorkerOptions extends JobRouterUpsertWorkerOptionalParams {
  /** The queue(s) that this worker can receive work from. */
  queueAssignments?: JSONObject;
  /** The total capacity score this worker has to manage multiple concurrent jobs. */
  totalCapacity?: number;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** A set of non-identifying attributes attached to this worker. */
  tags?: JSONObject;
  /** The channel(s) this worker can handle and their impact on the workers capacity. */
  channelConfigurations?: { [propertyName: string]: ChannelConfiguration };
  /** A flag indicating this worker is open to receive offers or not. */
  availableForOffers?: boolean;
}

/**
 * Options to update a worker.
 */
export interface UpdateWorkerOptions extends JobRouterUpsertWorkerOptionalParams {
  /** The queue(s) that this worker can receive work from. */
  queueAssignments?: JSONObject;
  /** The total capacity score this worker has to manage multiple concurrent jobs. */
  totalCapacity?: number;
  /** A set of key/value pairs that are identifying attributes used by the rules engines to make decisions. */
  labels?: JSONObject;
  /** A set of non-identifying attributes attached to this worker. */
  tags?: JSONObject;
  /** The channel(s) this worker can handle and their impact on the workers capacity. */
  channelConfigurations?: { [propertyName: string]: ChannelConfiguration };
  /** A flag indicating this worker is open to receive offers or not. */
  availableForOffers?: boolean;
}

/**
 * Options to list workers.
 */
export interface ListWorkersOptions extends OperationOptions {
  /** Number of objects to return per page */
  maxPageSize?: number;
  /** (Optional) If specified, select workers who are assigned to this queue */
  queueId?: string;
  /** (Optional) If specified, select workers who have a channel configuration with this channel */
  channelId?: string;
  /** (Optional) If specified, select workers by worker status. */
  status?: RouterWorkerStateSelector;
  /** (Optional) If true, select workers who have capacity for the channel specified by `channelId` (any channel if `channelId` not specified). If false, does not effect list behavior. Defaults to false. */
  hasCapacity?: boolean;
}

export {
  JobRouterAdministrationUpsertClassificationPolicyOptionalParams,
  JobRouterAdministrationUpsertDistributionPolicyOptionalParams,
  JobRouterAdministrationUpsertExceptionPolicyOptionalParams,
  JobRouterAdministrationUpsertQueueOptionalParams,
  JobRouterReclassifyJobActionOptionalParams,
  JobRouterUnassignJobActionOptionalParams,
  JobRouterCompleteJobActionOptionalParams,
  JobRouterCancelJobActionOptionalParams,
  JobRouterCloseJobActionOptionalParams,
  JobRouterDeclineJobActionOptionalParams,
  JobRouterUpsertJobOptionalParams,
  JobRouterUpsertWorkerOptionalParams,
  DeclineJobOfferRequest,
  UnassignJobRequest,
} from "./generated/src";
