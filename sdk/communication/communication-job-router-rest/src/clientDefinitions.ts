// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  UpsertClassificationPolicyParameters,
  GetClassificationPolicyParameters,
  DeleteClassificationPolicyParameters,
  ListClassificationPoliciesParameters,
  UpsertDistributionPolicyParameters,
  GetDistributionPolicyParameters,
  DeleteDistributionPolicyParameters,
  ListDistributionPoliciesParameters,
  UpsertExceptionPolicyParameters,
  GetExceptionPolicyParameters,
  DeleteExceptionPolicyParameters,
  ListExceptionPoliciesParameters,
  UpsertQueueParameters,
  GetQueueParameters,
  DeleteQueueParameters,
  ListQueuesParameters,
  UpsertJobParameters,
  GetJobParameters,
  DeleteJobParameters,
  ReclassifyJobActionParameters,
  CancelJobActionParameters,
  CompleteJobActionParameters,
  CloseJobActionParameters,
  ListJobsParameters,
  GetInQueuePositionParameters,
  UnassignJobActionParameters,
  AcceptJobActionParameters,
  DeclineJobActionParameters,
  GetQueueStatisticsParameters,
  UpsertWorkerParameters,
  GetWorkerParameters,
  DeleteWorkerParameters,
  ListWorkersParameters,
} from "./parameters";
import {
  UpsertClassificationPolicy200Response,
  UpsertClassificationPolicy201Response,
  UpsertClassificationPolicyDefaultResponse,
  GetClassificationPolicy200Response,
  GetClassificationPolicyDefaultResponse,
  DeleteClassificationPolicy204Response,
  DeleteClassificationPolicyDefaultResponse,
  ListClassificationPolicies200Response,
  ListClassificationPoliciesDefaultResponse,
  UpsertDistributionPolicy200Response,
  UpsertDistributionPolicy201Response,
  UpsertDistributionPolicyDefaultResponse,
  GetDistributionPolicy200Response,
  GetDistributionPolicyDefaultResponse,
  DeleteDistributionPolicy204Response,
  DeleteDistributionPolicyDefaultResponse,
  ListDistributionPolicies200Response,
  ListDistributionPoliciesDefaultResponse,
  UpsertExceptionPolicy200Response,
  UpsertExceptionPolicy201Response,
  UpsertExceptionPolicyDefaultResponse,
  GetExceptionPolicy200Response,
  GetExceptionPolicyDefaultResponse,
  DeleteExceptionPolicy204Response,
  DeleteExceptionPolicyDefaultResponse,
  ListExceptionPolicies200Response,
  ListExceptionPoliciesDefaultResponse,
  UpsertQueue200Response,
  UpsertQueue201Response,
  UpsertQueueDefaultResponse,
  GetQueue200Response,
  GetQueueDefaultResponse,
  DeleteQueue204Response,
  DeleteQueueDefaultResponse,
  ListQueues200Response,
  ListQueuesDefaultResponse,
  UpsertJob200Response,
  UpsertJob201Response,
  UpsertJobDefaultResponse,
  GetJob200Response,
  GetJobDefaultResponse,
  DeleteJob204Response,
  DeleteJobDefaultResponse,
  ReclassifyJobAction200Response,
  ReclassifyJobActionDefaultResponse,
  CancelJobAction200Response,
  CancelJobActionDefaultResponse,
  CompleteJobAction200Response,
  CompleteJobActionDefaultResponse,
  CloseJobAction200Response,
  CloseJobAction202Response,
  CloseJobActionDefaultResponse,
  ListJobs200Response,
  ListJobsDefaultResponse,
  GetInQueuePosition200Response,
  GetInQueuePositionDefaultResponse,
  UnassignJobAction200Response,
  UnassignJobActionDefaultResponse,
  AcceptJobAction200Response,
  AcceptJobActionDefaultResponse,
  DeclineJobAction200Response,
  DeclineJobActionDefaultResponse,
  GetQueueStatistics200Response,
  GetQueueStatisticsDefaultResponse,
  UpsertWorker200Response,
  UpsertWorker201Response,
  UpsertWorkerDefaultResponse,
  GetWorker200Response,
  GetWorkerDefaultResponse,
  DeleteWorker204Response,
  DeleteWorkerDefaultResponse,
  ListWorkers200Response,
  ListWorkersDefaultResponse,
} from "./responses";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface UpsertClassificationPolicy {
  /** Creates or updates a classification policy. */
  patch(
    options: UpsertClassificationPolicyParameters
  ): StreamableMethod<
    | UpsertClassificationPolicy200Response
    | UpsertClassificationPolicy201Response
    | UpsertClassificationPolicyDefaultResponse
  >;
  /** Retrieves an existing classification policy by Id. */
  get(
    options?: GetClassificationPolicyParameters
  ): StreamableMethod<GetClassificationPolicy200Response | GetClassificationPolicyDefaultResponse>;
  /** Delete a classification policy by Id. */
  delete(
    options?: DeleteClassificationPolicyParameters
  ): StreamableMethod<
    DeleteClassificationPolicy204Response | DeleteClassificationPolicyDefaultResponse
  >;
}

export interface ListClassificationPolicies {
  /** Retrieves existing classification policies. */
  get(
    options?: ListClassificationPoliciesParameters
  ): StreamableMethod<
    ListClassificationPolicies200Response | ListClassificationPoliciesDefaultResponse
  >;
}

export interface UpsertDistributionPolicy {
  /** Creates or updates a distribution policy. */
  patch(
    options: UpsertDistributionPolicyParameters
  ): StreamableMethod<
    | UpsertDistributionPolicy200Response
    | UpsertDistributionPolicy201Response
    | UpsertDistributionPolicyDefaultResponse
  >;
  /** Retrieves an existing distribution policy by Id. */
  get(
    options?: GetDistributionPolicyParameters
  ): StreamableMethod<GetDistributionPolicy200Response | GetDistributionPolicyDefaultResponse>;
  /** Delete a distribution policy by Id. */
  delete(
    options?: DeleteDistributionPolicyParameters
  ): StreamableMethod<
    DeleteDistributionPolicy204Response | DeleteDistributionPolicyDefaultResponse
  >;
}

export interface ListDistributionPolicies {
  /** Retrieves existing distribution policies. */
  get(
    options?: ListDistributionPoliciesParameters
  ): StreamableMethod<
    ListDistributionPolicies200Response | ListDistributionPoliciesDefaultResponse
  >;
}

export interface UpsertExceptionPolicy {
  /** Creates or updates a exception policy. */
  patch(
    options: UpsertExceptionPolicyParameters
  ): StreamableMethod<
    | UpsertExceptionPolicy200Response
    | UpsertExceptionPolicy201Response
    | UpsertExceptionPolicyDefaultResponse
  >;
  /** Retrieves an existing exception policy by Id. */
  get(
    options?: GetExceptionPolicyParameters
  ): StreamableMethod<GetExceptionPolicy200Response | GetExceptionPolicyDefaultResponse>;
  /** Deletes a exception policy by Id. */
  delete(
    options?: DeleteExceptionPolicyParameters
  ): StreamableMethod<DeleteExceptionPolicy204Response | DeleteExceptionPolicyDefaultResponse>;
}

export interface ListExceptionPolicies {
  /** Retrieves existing exception policies. */
  get(
    options?: ListExceptionPoliciesParameters
  ): StreamableMethod<ListExceptionPolicies200Response | ListExceptionPoliciesDefaultResponse>;
}

export interface UpsertQueue {
  /** Creates or updates a queue. */
  patch(
    options: UpsertQueueParameters
  ): StreamableMethod<UpsertQueue200Response | UpsertQueue201Response | UpsertQueueDefaultResponse>;
  /** Retrieves an existing queue by Id. */
  get(
    options?: GetQueueParameters
  ): StreamableMethod<GetQueue200Response | GetQueueDefaultResponse>;
  /** Deletes a queue by Id. */
  delete(
    options?: DeleteQueueParameters
  ): StreamableMethod<DeleteQueue204Response | DeleteQueueDefaultResponse>;
}

export interface ListQueues {
  /** Retrieves existing queues. */
  get(
    options?: ListQueuesParameters
  ): StreamableMethod<ListQueues200Response | ListQueuesDefaultResponse>;
}

export interface UpsertJob {
  /** Creates or updates a router job. */
  patch(
    options: UpsertJobParameters
  ): StreamableMethod<UpsertJob200Response | UpsertJob201Response | UpsertJobDefaultResponse>;
  /** Retrieves an existing job by Id. */
  get(options?: GetJobParameters): StreamableMethod<GetJob200Response | GetJobDefaultResponse>;
  /** Deletes a job and all of its traces. */
  delete(
    options?: DeleteJobParameters
  ): StreamableMethod<DeleteJob204Response | DeleteJobDefaultResponse>;
}

export interface ReclassifyJobAction {
  /** Reclassify a job. */
  post(
    options?: ReclassifyJobActionParameters
  ): StreamableMethod<ReclassifyJobAction200Response | ReclassifyJobActionDefaultResponse>;
}

export interface CancelJobAction {
  /**
   * Submits request to cancel an existing job by Id while supplying free-form
   * cancellation reason.
   */
  post(
    options?: CancelJobActionParameters
  ): StreamableMethod<CancelJobAction200Response | CancelJobActionDefaultResponse>;
}

export interface CompleteJobAction {
  /** Completes an assigned job. */
  post(
    options: CompleteJobActionParameters
  ): StreamableMethod<CompleteJobAction200Response | CompleteJobActionDefaultResponse>;
}

export interface CloseJobAction {
  /** Closes a completed job. */
  post(
    options: CloseJobActionParameters
  ): StreamableMethod<
    CloseJobAction200Response | CloseJobAction202Response | CloseJobActionDefaultResponse
  >;
}

export interface ListJobs {
  /** Retrieves list of jobs based on filter parameters. */
  get(
    options?: ListJobsParameters
  ): StreamableMethod<ListJobs200Response | ListJobsDefaultResponse>;
}

export interface GetInQueuePosition {
  /** Gets a job's position details. */
  get(
    options?: GetInQueuePositionParameters
  ): StreamableMethod<GetInQueuePosition200Response | GetInQueuePositionDefaultResponse>;
}

export interface UnassignJobAction {
  /** Un-assign a job. */
  post(
    options?: UnassignJobActionParameters
  ): StreamableMethod<UnassignJobAction200Response | UnassignJobActionDefaultResponse>;
}

export interface AcceptJobAction {
  /**
   * Accepts an offer to work on a job and returns a 409/Conflict if another agent
   * accepted the job already.
   */
  post(
    options?: AcceptJobActionParameters
  ): StreamableMethod<AcceptJobAction200Response | AcceptJobActionDefaultResponse>;
}

export interface DeclineJobAction {
  /** Declines an offer to work on a job. */
  post(
    options?: DeclineJobActionParameters
  ): StreamableMethod<DeclineJobAction200Response | DeclineJobActionDefaultResponse>;
}

export interface GetQueueStatistics {
  /** Retrieves a queue's statistics. */
  get(
    options?: GetQueueStatisticsParameters
  ): StreamableMethod<GetQueueStatistics200Response | GetQueueStatisticsDefaultResponse>;
}

export interface UpsertWorker {
  /** Creates or updates a worker. */
  patch(
    options: UpsertWorkerParameters
  ): StreamableMethod<
    UpsertWorker200Response | UpsertWorker201Response | UpsertWorkerDefaultResponse
  >;
  /** Retrieves an existing worker by Id. */
  get(
    options?: GetWorkerParameters
  ): StreamableMethod<GetWorker200Response | GetWorkerDefaultResponse>;
  /** Deletes a worker and all of its traces. */
  delete(
    options?: DeleteWorkerParameters
  ): StreamableMethod<DeleteWorker204Response | DeleteWorkerDefaultResponse>;
}

export interface ListWorkers {
  /** Retrieves existing workers. */
  get(
    options?: ListWorkersParameters
  ): StreamableMethod<ListWorkers200Response | ListWorkersDefaultResponse>;
}

export interface Routes {
  /** Resource for '/routing/classificationPolicies/\{id\}' has methods for the following verbs: patch, get, delete */
  (path: "/routing/classificationPolicies/{id}", id: string): UpsertClassificationPolicy;
  /** Resource for '/routing/classificationPolicies' has methods for the following verbs: get */
  (path: "/routing/classificationPolicies"): ListClassificationPolicies;
  /** Resource for '/routing/distributionPolicies/\{id\}' has methods for the following verbs: patch, get, delete */
  (path: "/routing/distributionPolicies/{id}", id: string): UpsertDistributionPolicy;
  /** Resource for '/routing/distributionPolicies' has methods for the following verbs: get */
  (path: "/routing/distributionPolicies"): ListDistributionPolicies;
  /** Resource for '/routing/exceptionPolicies/\{id\}' has methods for the following verbs: patch, get, delete */
  (path: "/routing/exceptionPolicies/{id}", id: string): UpsertExceptionPolicy;
  /** Resource for '/routing/exceptionPolicies' has methods for the following verbs: get */
  (path: "/routing/exceptionPolicies"): ListExceptionPolicies;
  /** Resource for '/routing/queues/\{id\}' has methods for the following verbs: patch, get, delete */
  (path: "/routing/queues/{id}", id: string): UpsertQueue;
  /** Resource for '/routing/queues' has methods for the following verbs: get */
  (path: "/routing/queues"): ListQueues;
  /** Resource for '/routing/jobs/\{id\}' has methods for the following verbs: patch, get, delete */
  (path: "/routing/jobs/{id}", id: string): UpsertJob;
  /** Resource for '/routing/jobs/\{id\}:reclassify' has methods for the following verbs: post */
  (path: "/routing/jobs/{id}:reclassify", id: string): ReclassifyJobAction;
  /** Resource for '/routing/jobs/\{id\}:cancel' has methods for the following verbs: post */
  (path: "/routing/jobs/{id}:cancel", id: string): CancelJobAction;
  /** Resource for '/routing/jobs/\{id\}:complete' has methods for the following verbs: post */
  (path: "/routing/jobs/{id}:complete", id: string): CompleteJobAction;
  /** Resource for '/routing/jobs/\{id\}:close' has methods for the following verbs: post */
  (path: "/routing/jobs/{id}:close", id: string): CloseJobAction;
  /** Resource for '/routing/jobs' has methods for the following verbs: get */
  (path: "/routing/jobs"): ListJobs;
  /** Resource for '/routing/jobs/\{id\}/position' has methods for the following verbs: get */
  (path: "/routing/jobs/{id}/position", id: string): GetInQueuePosition;
  /** Resource for '/routing/jobs/\{id\}/assignments/\{assignmentId\}:unassign' has methods for the following verbs: post */
  (
    path: "/routing/jobs/{id}/assignments/{assignmentId}:unassign",
    id: string,
    assignmentId: string
  ): UnassignJobAction;
  /** Resource for '/routing/workers/\{workerId\}/offers/\{offerId\}:accept' has methods for the following verbs: post */
  (
    path: "/routing/workers/{workerId}/offers/{offerId}:accept",
    workerId: string,
    offerId: string
  ): AcceptJobAction;
  /** Resource for '/routing/workers/\{workerId\}/offers/\{offerId\}:decline' has methods for the following verbs: post */
  (
    path: "/routing/workers/{workerId}/offers/{offerId}:decline",
    workerId: string,
    offerId: string
  ): DeclineJobAction;
  /** Resource for '/routing/queues/\{id\}/statistics' has methods for the following verbs: get */
  (path: "/routing/queues/{id}/statistics", id: string): GetQueueStatistics;
  /** Resource for '/routing/workers/\{workerId\}' has methods for the following verbs: patch, get, delete */
  (path: "/routing/workers/{workerId}", workerId: string): UpsertWorker;
  /** Resource for '/routing/workers' has methods for the following verbs: get */
  (path: "/routing/workers"): ListWorkers;
}

export type AzureCommunicationRoutingServiceClient = Client & {
  path: Routes;
};
