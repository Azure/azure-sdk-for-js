// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  ClassificationPolicy,
  DistributionPolicy,
  ExceptionPolicy,
  RouterQueue,
  RouterJob,
  CancelJobRequest,
  CompleteJobRequest,
  CloseJobRequest,
  UnassignJobRequest,
  DeclineJobOfferRequest,
  RouterWorker,
} from "./models";

/**
 * Model of classification policy properties to be patched. See also:
 * https://datatracker.ietf.org/doc/html/rfc7386.
 */
export type ClassificationPolicyResourceMergeAndPatch =
  Partial<ClassificationPolicy>;

export interface UpsertClassificationPolicyBodyParam {
  /**
   * Model of classification policy properties to be patched. See also:
   * https://datatracker.ietf.org/doc/html/rfc7386.
   */
  body: ClassificationPolicyResourceMergeAndPatch;
}

export interface UpsertClassificationPolicyMediaTypesParam {
  /** content type */
  contentType: "application/merge-patch+json";
}

export type UpsertClassificationPolicyParameters =
  UpsertClassificationPolicyMediaTypesParam &
    UpsertClassificationPolicyBodyParam &
    RequestParameters;
export type GetClassificationPolicyParameters = RequestParameters;
export type DeleteClassificationPolicyParameters = RequestParameters;

export interface ListClassificationPoliciesQueryParamProperties {
  /** Maximum page size. */
  maxpagesize: number;
}

export interface ListClassificationPoliciesQueryParam {
  queryParameters: ListClassificationPoliciesQueryParamProperties;
}

export type ListClassificationPoliciesParameters =
  ListClassificationPoliciesQueryParam & RequestParameters;
/**
 * Model of distribution policy properties to be patched. See also:
 * https://datatracker.ietf.org/doc/html/rfc7386.
 */
export type DistributionPolicyResourceMergeAndPatch =
  Partial<DistributionPolicy>;

export interface UpsertDistributionPolicyBodyParam {
  /**
   * Model of distribution policy properties to be patched. See also:
   * https://datatracker.ietf.org/doc/html/rfc7386.
   */
  body: DistributionPolicyResourceMergeAndPatch;
}

export interface UpsertDistributionPolicyMediaTypesParam {
  /** content type */
  contentType: "application/merge-patch+json";
}

export type UpsertDistributionPolicyParameters =
  UpsertDistributionPolicyMediaTypesParam &
    UpsertDistributionPolicyBodyParam &
    RequestParameters;
export type GetDistributionPolicyParameters = RequestParameters;
export type DeleteDistributionPolicyParameters = RequestParameters;

export interface ListDistributionPoliciesQueryParamProperties {
  /** Maximum page size. */
  maxpagesize: number;
}

export interface ListDistributionPoliciesQueryParam {
  queryParameters: ListDistributionPoliciesQueryParamProperties;
}

export type ListDistributionPoliciesParameters =
  ListDistributionPoliciesQueryParam & RequestParameters;
/**
 * Model of exception policy properties to be patched. See also:
 * https://datatracker.ietf.org/doc/html/rfc7386
 */
export type ExceptionPolicyResourceMergeAndPatch = Partial<ExceptionPolicy>;

export interface UpsertExceptionPolicyBodyParam {
  /**
   * Model of exception policy properties to be patched. See also:
   * https://datatracker.ietf.org/doc/html/rfc7386
   */
  body: ExceptionPolicyResourceMergeAndPatch;
}

export interface UpsertExceptionPolicyMediaTypesParam {
  /** content type */
  contentType: "application/merge-patch+json";
}

export type UpsertExceptionPolicyParameters =
  UpsertExceptionPolicyMediaTypesParam &
    UpsertExceptionPolicyBodyParam &
    RequestParameters;
export type GetExceptionPolicyParameters = RequestParameters;
export type DeleteExceptionPolicyParameters = RequestParameters;

export interface ListExceptionPoliciesQueryParamProperties {
  /** Number of objects to return per page. */
  maxpagesize: number;
}

export interface ListExceptionPoliciesQueryParam {
  queryParameters: ListExceptionPoliciesQueryParamProperties;
}

export type ListExceptionPoliciesParameters = ListExceptionPoliciesQueryParam &
  RequestParameters;
/**
 * Model of queue properties to be patched. See also:
 * https://datatracker.ietf.org/doc/html/rfc7386.
 */
export type RouterQueueResourceMergeAndPatch = Partial<RouterQueue>;

export interface UpsertQueueBodyParam {
  /**
   * Model of queue properties to be patched. See also:
   * https://datatracker.ietf.org/doc/html/rfc7386.
   */
  body: RouterQueueResourceMergeAndPatch;
}

export interface UpsertQueueMediaTypesParam {
  /** content type */
  contentType: "application/merge-patch+json";
}

export type UpsertQueueParameters = UpsertQueueMediaTypesParam &
  UpsertQueueBodyParam &
  RequestParameters;
export type GetQueueParameters = RequestParameters;
export type DeleteQueueParameters = RequestParameters;

export interface ListQueuesQueryParamProperties {
  /** Number of objects to return per page. */
  maxpagesize: number;
}

export interface ListQueuesQueryParam {
  queryParameters: ListQueuesQueryParamProperties;
}

export type ListQueuesParameters = ListQueuesQueryParam & RequestParameters;
/**
 * Model of job properties to be created or patched. See also:
 * https://datatracker.ietf.org/doc/html/rfc7386.
 */
export type RouterJobResourceMergeAndPatch = Partial<RouterJob>;

export interface UpsertJobBodyParam {
  /**
   * Model of job properties to be created or patched. See also:
   * https://datatracker.ietf.org/doc/html/rfc7386.
   */
  body: RouterJobResourceMergeAndPatch;
}

export interface UpsertJobMediaTypesParam {
  /** content type */
  contentType: "application/merge-patch+json";
}

export type UpsertJobParameters = UpsertJobMediaTypesParam &
  UpsertJobBodyParam &
  RequestParameters;
export type GetJobParameters = RequestParameters;
export type DeleteJobParameters = RequestParameters;

export interface ReclassifyJobActionBodyParam {
  /** Request object for reclassifying a job. */
  body: {};
}

export type ReclassifyJobActionParameters = ReclassifyJobActionBodyParam &
  RequestParameters;

export interface CancelJobActionBodyParam {
  /** Request model for cancelling job. */
  body: CancelJobRequest;
}

export type CancelJobActionParameters = CancelJobActionBodyParam &
  RequestParameters;

export interface CompleteJobActionBodyParam {
  /** Request model for completing job. */
  body: CompleteJobRequest;
}

export type CompleteJobActionParameters = CompleteJobActionBodyParam &
  RequestParameters;

export interface CloseJobActionBodyParam {
  /** Request model for closing job. */
  body: CloseJobRequest;
}

export type CloseJobActionParameters = CloseJobActionBodyParam &
  RequestParameters;

export interface ListJobsQueryParamProperties {
  /**
   * If specified, filter jobs by status.
   *
   * Possible values: all, pendingClassification, queued, assigned, completed, closed, cancelled, classificationFailed, created, pendingSchedule, scheduled, scheduleFailed, waitingForActivation, active
   */
  status: string;
  /** If specified, filter jobs by queue. */
  queueId: string;
  /** If specified, filter jobs by channel. */
  channelId: string;
  /** If specified, filter jobs by classificationPolicy. */
  classificationPolicyId: string;
  /**
   * If specified, filter on jobs that was scheduled before or at given timestamp.
   * Range: (-Inf, scheduledBefore].
   */
  scheduledBefore: Date | string;
  /**
   * If specified, filter on jobs that was scheduled at or after given value. Range:
   * [scheduledAfter, +Inf).
   */
  scheduledAfter: Date | string;
  /** Number of objects to return per page. */
  maxpagesize: number;
}

export interface ListJobsQueryParam {
  queryParameters: ListJobsQueryParamProperties;
}

export type ListJobsParameters = ListJobsQueryParam & RequestParameters;
export type GetInQueuePositionParameters = RequestParameters;

export interface UnassignJobActionBodyParam {
  /** Request body for unassign route. */
  body: UnassignJobRequest;
}

export type UnassignJobActionParameters = UnassignJobActionBodyParam &
  RequestParameters;
export type AcceptJobActionParameters = RequestParameters;

export interface DeclineJobActionBodyParam {
  /** Request model for declining offer. */
  body: DeclineJobOfferRequest;
}

export type DeclineJobActionParameters = DeclineJobActionBodyParam &
  RequestParameters;
export type GetQueueStatisticsParameters = RequestParameters;
/**
 * Model of worker properties to be created or patched. See also:
 * https://datatracker.ietf.org/doc/html/rfc7386.
 */
export type RouterWorkerResourceMergeAndPatch = Partial<RouterWorker>;

export interface UpsertWorkerBodyParam {
  /**
   * Model of worker properties to be created or patched. See also:
   * https://datatracker.ietf.org/doc/html/rfc7386.
   */
  body: RouterWorkerResourceMergeAndPatch;
}

export interface UpsertWorkerMediaTypesParam {
  /** content type */
  contentType: "application/merge-patch+json";
}

export type UpsertWorkerParameters = UpsertWorkerMediaTypesParam &
  UpsertWorkerBodyParam &
  RequestParameters;
export type GetWorkerParameters = RequestParameters;
export type DeleteWorkerParameters = RequestParameters;

export interface ListWorkersQueryParamProperties {
  /**
   * If specified, select workers by worker state.
   *
   * Possible values: active, draining, inactive, all
   */
  state: string;
  /** If specified, select workers who have a channel configuration with this channel. */
  channelId: string;
  /** If specified, select workers who are assigned to this queue. */
  queueId: string;
  /**
   * If set to true, select only workers who have capacity for the channel specified
   * by `channelId` or for any channel if `channelId` not specified. If set to
   * false, then will return all workers including workers without any capacity for
   * jobs. Defaults to false.
   */
  hasCapacity: boolean;
  /** Number of objects to return per page. */
  maxpagesize: number;
}

export interface ListWorkersQueryParam {
  queryParameters: ListWorkersQueryParamProperties;
}

export type ListWorkersParameters = ListWorkersQueryParam & RequestParameters;
