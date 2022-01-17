// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions } from "@azure/core-http";
import {
  JobRouterDeleteClassificationPolicyOptionalParams,
  JobRouterDeleteDistributionPolicyOptionalParams,
  JobRouterDeleteExceptionPolicyOptionalParams,
  JobRouterDeleteQueueOptionalParams,
  JobRouterListClassificationPoliciesOptionalParams,
  JobRouterListDistributionPoliciesOptionalParams,
  JobRouterListExceptionPoliciesOptionalParams,
  JobRouterListQueuesOptionalParams,
  JobRouterListWorkersOptionalParams,
  JobRouterListJobsOptionalParams,
  JobRouterGetWorkerOptionalParams,
  JobRouterGetQueueOptionalParams,
  JobRouterCreateQueueOptionalParams,
  JobRouterGetJobOptionalParams,
  JobRouterGetInQueuePositionOptionalParams,
  JobRouterCreateJobV2OptionalParams,
  JobRouterGetExceptionPolicyOptionalParams,
  JobRouterCreateExceptionPolicyV2OptionalParams,
  JobRouterPatchExceptionPolicyV2OptionalParams,
  JobRouterGetDistributionPolicyOptionalParams,
  JobRouterCreateDistributionPolicyV2OptionalParams,
  JobRouterPatchDistributionPolicyOptionalParams,
  JobRouterGetClassificationPolicyOptionalParams,
  JobRouterCreateClassificationPolicyV2OptionalParams,
  JobRouterPatchClassificationPolicyV2OptionalParams,
  JobRouterUpdateJobOptionalParams,
  JobRouterDeleteJobOptionalParams,
  JobRouterReleaseAssignmentActionOptionalParams,
  JobRouterCancelJobActionOptionalParams,
  JobRouterRegisterWorkerV2OptionalParams,
  JobRouterDeregisterWorkerV2OptionalParams,
  JobRouterAcceptJobActionOptionalParams,
  JobRouterCloseJobActionOptionalParams,
  JobRouterCompleteJobActionOptionalParams,
  JobRouterDeclineJobActionOptionalParams,
  JobRouterDeleteWorkerOptionalParams,
  JobRouterUpdateQueueOptionalParams
} from "../generated/src";

/**
 * Options to create router client.
 */
export interface RouterClientOptions extends PipelineOptions {
  /** The headers to be set on requests **/
  headers?: { [propertyName: string]: any };
}

/**
 * Options to get a classification policy.
 */
export interface GetClassificationPolicyOptions
  extends JobRouterGetClassificationPolicyOptionalParams {}

/**
 * Options to delete a classification policy.
 */
export interface DeleteClassificationPolicyOptions
  extends JobRouterDeleteClassificationPolicyOptionalParams {}

/**
 * Options to get classification policies.
 */
export interface ListClassificationPoliciesOptions
  extends JobRouterListClassificationPoliciesOptionalParams {}

/**
 * Options to create a distribution policy.
 */
export interface CreateDistributionPolicyOptions
  extends JobRouterCreateDistributionPolicyV2OptionalParams {}

/**
 * Options to update a distribution policy.
 */
export interface UpdateDistributionPolicyOptions
  extends JobRouterPatchDistributionPolicyOptionalParams {}

/**
 * Options to get a distribution policy.
 */
export interface GetDistributionPolicyOptions
  extends JobRouterGetDistributionPolicyOptionalParams {}

/**
 * Options to delete a distribution policy.
 */
export interface DeleteDistributionPolicyOptions
  extends JobRouterDeleteDistributionPolicyOptionalParams {}

/**
 * Options to get distribution policies.
 */
export interface ListDistributionPoliciesOptions
  extends JobRouterListDistributionPoliciesOptionalParams {}

/**
 * Options to create a exception policy.
 */
export interface CreateExceptionPolicyOptions
  extends JobRouterCreateExceptionPolicyV2OptionalParams {}

/**
 * Options to update a exception policy.
 */
export interface UpdateExceptionPolicyOptions
  extends JobRouterPatchExceptionPolicyV2OptionalParams {}

/**
 * Options to get a exception policy.
 */
export interface GetExceptionPolicyOptions extends JobRouterGetExceptionPolicyOptionalParams {}

/**
 * Options to delete a exception policy.
 */
export interface DeleteExceptionPolicyOptions
  extends JobRouterDeleteExceptionPolicyOptionalParams {}

/**
 * Options to get exception policies.
 */
export interface ListExceptionPoliciesOptions
  extends JobRouterListExceptionPoliciesOptionalParams {}

/**
 * Options to create a job.
 */
export interface CreateJobOptions extends JobRouterCreateJobV2OptionalParams {
  /** If specified, the client directs that the request is repeatable; that is, that the client can make the request multiple times with the same Idempotency-Token and get back an appropriate response without the server executing the request multiple times. The value of the Idempotency-Token is an opaque string representing a client-generated, globally unique for all time, identifier for the request. It is recommended to use version 4 (random) UUIDs. */
  idempotencyToken?: string;
}

/**
 * Options to update or insert a job's labels.
 */
export interface UpdateJobLabelsOptions extends JobRouterUpdateJobOptionalParams {}

/**
 * Options to create a classification policy.
 */
export interface CreateClassificationPolicyOptions
  extends JobRouterCreateClassificationPolicyV2OptionalParams {}

/**
 * Options to update a classification policy.
 */
export interface UpdateClassificationPolicyOptions
  extends JobRouterPatchClassificationPolicyV2OptionalParams {}

/**
 * Options to get a job's position details.
 */
export interface GetJobPositionOptions extends JobRouterGetInQueuePositionOptionalParams {}

/**
 * Options to get a job.
 */
export interface GetJobOptions extends JobRouterGetJobOptionalParams {}

/**
 * Options to cancel a job.
 */
export interface CancelJobOptions extends JobRouterCancelJobActionOptionalParams {}

/**
 * Options to accept a job.
 */
export interface AcceptJobOptions extends JobRouterAcceptJobActionOptionalParams {}

/**
 * Options to decline a job.
 */
export interface DeclineJobOptions extends JobRouterDeclineJobActionOptionalParams {}

/**
 * Options to complete a job.
 */
export interface CompleteJobOptions extends JobRouterCompleteJobActionOptionalParams {}

/**
 * Options to close a job.
 */
export interface CloseJobOptions extends JobRouterCloseJobActionOptionalParams {}

/**
 * Options to get router jobs.
 */
export interface ListJobsOptions extends JobRouterListJobsOptionalParams {}

/**
 * Options to delete a job.
 */
export interface DeleteJobOptions extends JobRouterDeleteJobOptionalParams {}

/**
 * Options to register a worker.
 */
export interface RegisterWorkerOptions extends JobRouterRegisterWorkerV2OptionalParams {}

/**
 * Options to deregister a worker.
 */
export interface DeregisterWorkerOptions extends JobRouterDeregisterWorkerV2OptionalParams {}

/**
 * Options to release a worker.
 */
export interface ReleaseWorkerOptions extends JobRouterReleaseAssignmentActionOptionalParams {}

/**
 * Options to get a worker.
 */
export interface GetWorkerOptions extends JobRouterGetWorkerOptionalParams {}

/**
 * Options to get existing workers.
 */
export interface ListWorkersOptions extends JobRouterListWorkersOptionalParams {}

/**
 * Options to delete a worker.
 */
export interface DeleteWorkerOptions extends JobRouterDeleteWorkerOptionalParams {}

/**
 * Options to create a queue.
 */
export interface CreateQueueOptions extends JobRouterCreateQueueOptionalParams {}

/**
 * Options to update a queue.
 */
export interface UpdateQueueOptions extends JobRouterUpdateQueueOptionalParams {}

/**
 * Options to get a queue.
 */
export interface GetQueueOptions extends JobRouterGetQueueOptionalParams {}

/**
 * Options to list queues.
 */
export interface ListQueuesOptions extends JobRouterListQueuesOptionalParams {}

/**
 * Options to delete a queue.
 */
export interface DeleteQueueOptions extends JobRouterDeleteQueueOptionalParams {}
