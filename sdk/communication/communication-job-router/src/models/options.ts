// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PipelineOptions, OperationOptions } from "@azure/core-http";
import {
  JobRouterCloseJobOptionalParams,
  JobRouterCompleteJobOptionalParams,
  JobRouterCreateOrUpdateChannelOptionalParams,
  JobRouterDeleteChannelOptionalParams,
  JobRouterDeleteClassificationPolicyOptionalParams,
  JobRouterDeleteDistributionPolicyOptionalParams,
  JobRouterDeleteExceptionPolicyOptionalParams,
  JobRouterDeleteQueueOptionalParams,
  JobRouterListChannelsOptionalParams,
  JobRouterListClassificationPoliciesOptionalParams,
  JobRouterListDistributionPoliciesOptionalParams,
  JobRouterListExceptionPoliciesOptionalParams,
  JobRouterListEnqueuedJobsOptionalParams,
  JobRouterListQueuesOptionalParams,
  JobRouterListWorkersOptionalParams,
  JobRouterListJobsOptionalParams,
  JobRouterReleaseAssignmentOptionalParams,
  JobRouterGetWorkerOptionalParams,
  JobRouterDeregisterWorkerOptionalParams,
  JobRouterRegisterWorkerOptionalParams,
  JobRouterGetQueueOptionalParams,
  JobRouterCreateOrUpdateQueueOptionalParams,
  JobRouterDeclineJobOptionalParams,
  JobRouterAcceptJobOptionalParams,
  JobRouterCancelJobOptionalParams,
  JobRouterGetJobOptionalParams,
  JobRouterGetInQueuePositionOptionalParams,
  JobRouterUpdateJobClassificationOptionalParams,
  JobRouterUpdateJobLabelsOptionalParams,
  JobRouterCreateJobOptionalParams,
  JobRouterGetExceptionPolicyOptionalParams,
  JobRouterCreateOrUpdateExceptionPolicyOptionalParams,
  JobRouterGetDistributionPolicyOptionalParams,
  JobRouterCreateOrUpdateDistributionPolicyOptionalParams,
  JobRouterGetClassificationPolicyOptionalParams,
  JobRouterCreateOrUpdateClassificationPolicyOptionalParams,
  JobRouterGetChannelOptionalParams
} from "../generated/src/models";

/**
 * Options to create router client.
 */
export interface RouterClientOptions extends PipelineOptions {
  /** The headers to be set on requests **/
  headers?: { [propertyName: string]: any };
}

/**
 * Options to create a channel.
 */
export interface UpsertChannelOptions extends JobRouterCreateOrUpdateChannelOptionalParams {}

/**
 * Options to update a channel.
 */
export interface UpdateChannelOptions extends OperationOptions {}

/**
 * Options to get a channel.
 */
export interface GetChannelOptions extends JobRouterGetChannelOptionalParams {}

/**
 * Options to delete a channel.
 */
export interface DeleteChannelOptions extends JobRouterDeleteChannelOptionalParams {}

/**
 * Options to get all channels.
 */
export interface ListChannelsOptions extends JobRouterListChannelsOptionalParams {}

/**
 * Options to get managed channels.
 */
export interface ListManagedChannelsOptions extends OperationOptions {}

/**
 * Options to create or update a classification policy.
 */
export interface UpsertClassificationPolicyOptions
  extends JobRouterCreateOrUpdateClassificationPolicyOptionalParams {}

/**
 * Options to update a classification policy.
 */
export interface UpdateClassificationPolicyOptions extends OperationOptions {}

/**
 * Options to get a classification policy.
 */
export interface GetClassificationPolicyOptions extends JobRouterGetClassificationPolicyOptionalParams {}

/**
 * Options to delete a classification policy.
 */
export interface DeleteClassificationPolicyOptions extends JobRouterDeleteClassificationPolicyOptionalParams {}

/**
 * Options to get classification policies.
 */
export interface ListClassificationPoliciesOptions extends JobRouterListClassificationPoliciesOptionalParams {}

/**
 * Options to create or update a distribution policy.
 */
export interface UpsertDistributionPolicyOptions
  extends JobRouterCreateOrUpdateDistributionPolicyOptionalParams {}

/**
 * Options to get a distribution policy.
 */
export interface GetDistributionPolicyOptions extends JobRouterGetDistributionPolicyOptionalParams {}

/**
 * Options to delete a distribution policy.
 */
export interface DeleteDistributionPolicyOptions extends JobRouterDeleteDistributionPolicyOptionalParams {}

/**
 * Options to get distribution policies.
 */
export interface ListDistributionPoliciesOptions extends JobRouterListDistributionPoliciesOptionalParams {}

/**
 * Options to create or update a exception policy.
 */
export interface UpsertExceptionPolicyOptions
  extends JobRouterCreateOrUpdateExceptionPolicyOptionalParams {}

/**
 * Options to get a exception policy.
 */
export interface GetExceptionPolicyOptions extends JobRouterGetExceptionPolicyOptionalParams {}

/**
 * Options to delete a exception policy.
 */
export interface DeleteExceptionPolicyOptions extends JobRouterDeleteExceptionPolicyOptionalParams {}

/**
 * Options to get exception policies.
 */
export interface ListExceptionPoliciesOptions extends JobRouterListExceptionPoliciesOptionalParams {}

/**
 * Options to create a job.
 */
export interface CreateJobOptions extends JobRouterCreateJobOptionalParams {
  /** If specified, the client directs that the request is repeatable; that is, that the client can make the request multiple times with the same Idempotency-Token and get back an appropriate response without the server executing the request multiple times. The value of the Idempotency-Token is an opaque string representing a client-generated, globally unique for all time, identifier for the request. It is recommended to use version 4 (random) UUIDs. */
  idempotencyToken?: string;
}

/**
 * Options to update or insert a job's labels.
 */
export interface UpdateJobLabelsOptions extends JobRouterUpdateJobLabelsOptionalParams {}

/**
 * Options to update and classify a job.
 */
export interface UpdateJobClassificationOptions
  extends JobRouterUpdateJobClassificationOptionalParams {}

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
export interface CancelJobOptions extends JobRouterCancelJobOptionalParams {}

/**
 * Options to accept a job.
 */
export interface AcceptJobOptions extends JobRouterAcceptJobOptionalParams {}

/**
 * Options to decline a job.
 */
export interface DeclineJobOptions extends JobRouterDeclineJobOptionalParams {}

/**
 * Options to complete a job.
 */
export interface CompleteJobOptions extends JobRouterCompleteJobOptionalParams {}

/**
 * Options to close a job.
 */
export interface CloseJobOptions extends JobRouterCloseJobOptionalParams {}

/**
 * Options to get router jobs.
 */
export interface ListJobsOptions extends JobRouterListJobsOptionalParams {}

/**
 * Options to get enqueued router jobs.
 */
export interface ListEnqueuedJobsOptions extends JobRouterListEnqueuedJobsOptionalParams {}

/**
 * Options to register a worker.
 */
export interface RegisterWorkerOptions extends JobRouterRegisterWorkerOptionalParams {}

/**
 * Options to deregister a worker.
 */
export interface DeregisterWorkerOptions extends JobRouterDeregisterWorkerOptionalParams {}

/**
 * Options to release a worker.
 */
export interface ReleaseWorkerOptions extends JobRouterReleaseAssignmentOptionalParams {}

/**
 * Options to get a worker.
 */
export interface GetWorkerOptions extends JobRouterGetWorkerOptionalParams {}

/**
 * Options to get existing workers.
 */
export interface ListWorkersOptions extends JobRouterListWorkersOptionalParams {}

/**
 * Options to create or update a queue.
 */
export interface UpsertQueueOptions extends JobRouterCreateOrUpdateQueueOptionalParams {}

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
