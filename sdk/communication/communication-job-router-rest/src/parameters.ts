// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
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

export interface UpsertClassificationPolicyHeaders {
  /** The request should only proceed if an entity matches this string. */
  "If-Match"?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  "If-Unmodified-Since"?: string;
}

/** The resource instance. */
export type ClassificationPolicyResourceMergeAndPatch = Partial<ClassificationPolicy>;

export interface UpsertClassificationPolicyBodyParam {
  /** The resource instance. */
  body: ClassificationPolicyResourceMergeAndPatch;
}

export interface UpsertClassificationPolicyHeaderParam {
  headers?: RawHttpHeadersInput & UpsertClassificationPolicyHeaders;
}

export interface UpsertClassificationPolicyMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type UpsertClassificationPolicyParameters = UpsertClassificationPolicyHeaderParam &
  UpsertClassificationPolicyMediaTypesParam &
  UpsertClassificationPolicyBodyParam &
  RequestParameters;
export type GetClassificationPolicyParameters = RequestParameters;
export type DeleteClassificationPolicyParameters = RequestParameters;

export interface ListClassificationPoliciesQueryParamProperties {
  /** Number of objects to return per page. */
  maxpagesize?: number;
}

export interface ListClassificationPoliciesQueryParam {
  queryParameters?: ListClassificationPoliciesQueryParamProperties;
}

export type ListClassificationPoliciesParameters = ListClassificationPoliciesQueryParam &
  RequestParameters;

export interface UpsertDistributionPolicyHeaders {
  /** The request should only proceed if an entity matches this string. */
  "If-Match"?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  "If-Unmodified-Since"?: string;
}

/** The resource instance. */
export type DistributionPolicyResourceMergeAndPatch = Partial<DistributionPolicy>;

export interface UpsertDistributionPolicyBodyParam {
  /** The resource instance. */
  body: DistributionPolicyResourceMergeAndPatch;
}

export interface UpsertDistributionPolicyHeaderParam {
  headers?: RawHttpHeadersInput & UpsertDistributionPolicyHeaders;
}

export interface UpsertDistributionPolicyMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type UpsertDistributionPolicyParameters = UpsertDistributionPolicyHeaderParam &
  UpsertDistributionPolicyMediaTypesParam &
  UpsertDistributionPolicyBodyParam &
  RequestParameters;
export type GetDistributionPolicyParameters = RequestParameters;
export type DeleteDistributionPolicyParameters = RequestParameters;

export interface ListDistributionPoliciesQueryParamProperties {
  /** Number of objects to return per page. */
  maxpagesize?: number;
}

export interface ListDistributionPoliciesQueryParam {
  queryParameters?: ListDistributionPoliciesQueryParamProperties;
}

export type ListDistributionPoliciesParameters = ListDistributionPoliciesQueryParam &
  RequestParameters;

export interface UpsertExceptionPolicyHeaders {
  /** The request should only proceed if an entity matches this string. */
  "If-Match"?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  "If-Unmodified-Since"?: string;
}

/** The resource instance. */
export type ExceptionPolicyResourceMergeAndPatch = Partial<ExceptionPolicy>;

export interface UpsertExceptionPolicyBodyParam {
  /** The resource instance. */
  body: ExceptionPolicyResourceMergeAndPatch;
}

export interface UpsertExceptionPolicyHeaderParam {
  headers?: RawHttpHeadersInput & UpsertExceptionPolicyHeaders;
}

export interface UpsertExceptionPolicyMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type UpsertExceptionPolicyParameters = UpsertExceptionPolicyHeaderParam &
  UpsertExceptionPolicyMediaTypesParam &
  UpsertExceptionPolicyBodyParam &
  RequestParameters;
export type GetExceptionPolicyParameters = RequestParameters;
export type DeleteExceptionPolicyParameters = RequestParameters;

export interface ListExceptionPoliciesQueryParamProperties {
  /** Number of objects to return per page. */
  maxpagesize?: number;
}

export interface ListExceptionPoliciesQueryParam {
  queryParameters?: ListExceptionPoliciesQueryParamProperties;
}

export type ListExceptionPoliciesParameters = ListExceptionPoliciesQueryParam & RequestParameters;

export interface UpsertQueueHeaders {
  /** The request should only proceed if an entity matches this string. */
  "If-Match"?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  "If-Unmodified-Since"?: string;
}

/** The resource instance. */
export type RouterQueueResourceMergeAndPatch = Partial<RouterQueue>;

export interface UpsertQueueBodyParam {
  /** The resource instance. */
  body: RouterQueueResourceMergeAndPatch;
}

export interface UpsertQueueHeaderParam {
  headers?: RawHttpHeadersInput & UpsertQueueHeaders;
}

export interface UpsertQueueMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type UpsertQueueParameters = UpsertQueueHeaderParam &
  UpsertQueueMediaTypesParam &
  UpsertQueueBodyParam &
  RequestParameters;
export type GetQueueParameters = RequestParameters;
export type DeleteQueueParameters = RequestParameters;

export interface ListQueuesQueryParamProperties {
  /** Number of objects to return per page. */
  maxpagesize?: number;
}

export interface ListQueuesQueryParam {
  queryParameters?: ListQueuesQueryParamProperties;
}

export type ListQueuesParameters = ListQueuesQueryParam & RequestParameters;

export interface UpsertJobHeaders {
  /** The request should only proceed if an entity matches this string. */
  "If-Match"?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  "If-Unmodified-Since"?: string;
}

/** The resource instance. */
export type RouterJobResourceMergeAndPatch = Partial<RouterJob>;

export interface UpsertJobBodyParam {
  /** The resource instance. */
  body: RouterJobResourceMergeAndPatch;
}

export interface UpsertJobHeaderParam {
  headers?: RawHttpHeadersInput & UpsertJobHeaders;
}

export interface UpsertJobMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type UpsertJobParameters = UpsertJobHeaderParam &
  UpsertJobMediaTypesParam &
  UpsertJobBodyParam &
  RequestParameters;
export type GetJobParameters = RequestParameters;
export type DeleteJobParameters = RequestParameters;

export interface ReclassifyJobActionBodyParam {
  /** Request object for reclassifying a job. */
  body?: Record<string, string>;
}

export type ReclassifyJobActionParameters = ReclassifyJobActionBodyParam & RequestParameters;

export interface CancelJobActionBodyParam {
  /** Request model for cancelling job. */
  body?: CancelJobRequest;
}

export type CancelJobActionParameters = CancelJobActionBodyParam & RequestParameters;

export interface CompleteJobActionBodyParam {
  /** Request model for completing job. */
  body: CompleteJobRequest;
}

export type CompleteJobActionParameters = CompleteJobActionBodyParam & RequestParameters;

export interface CloseJobActionBodyParam {
  /** Request model for closing job. */
  body: CloseJobRequest;
}

export type CloseJobActionParameters = CloseJobActionBodyParam & RequestParameters;

export interface ListJobsQueryParamProperties {
  /** Number of objects to return per page. */
  maxpagesize?: number;
  /**
   * If specified, filter jobs by status.
   *
   * Possible values: all, pendingClassification, queued, assigned, completed, closed, cancelled, classificationFailed, created, pendingSchedule, scheduled, scheduleFailed, waitingForActivation, active
   */
  status?: string;
  /** If specified, filter jobs by queue. */
  queueId?: string;
  /** If specified, filter jobs by channel. */
  channelId?: string;
  /** If specified, filter jobs by classificationPolicy. */
  classificationPolicyId?: string;
  /**
   * If specified, filter on jobs that was scheduled before or at given timestamp.
   * Range: (-Inf, scheduledBefore].
   */
  scheduledBefore?: Date | string;
  /**
   * If specified, filter on jobs that was scheduled at or after given value. Range:
   * [scheduledAfter, +Inf).
   */
  scheduledAfter?: Date | string;
}

export interface ListJobsQueryParam {
  queryParameters?: ListJobsQueryParamProperties;
}

export type ListJobsParameters = ListJobsQueryParam & RequestParameters;
export type GetInQueuePositionParameters = RequestParameters;

export interface UnassignJobActionBodyParam {
  /** Request body for unassign route. */
  body?: UnassignJobRequest;
}

export type UnassignJobActionParameters = UnassignJobActionBodyParam & RequestParameters;
export type AcceptJobActionParameters = RequestParameters;

export interface DeclineJobActionBodyParam {
  /** Request model for declining offer. */
  body?: DeclineJobOfferRequest;
}

export type DeclineJobActionParameters = DeclineJobActionBodyParam & RequestParameters;
export type GetQueueStatisticsParameters = RequestParameters;

export interface UpsertWorkerHeaders {
  /** The request should only proceed if an entity matches this string. */
  "If-Match"?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  "If-Unmodified-Since"?: string;
}

/** The resource instance. */
export type RouterWorkerResourceMergeAndPatch = Partial<RouterWorker>;

export interface UpsertWorkerBodyParam {
  /** The resource instance. */
  body: RouterWorkerResourceMergeAndPatch;
}

export interface UpsertWorkerHeaderParam {
  headers?: RawHttpHeadersInput & UpsertWorkerHeaders;
}

export interface UpsertWorkerMediaTypesParam {
  /** This request has a JSON Merge Patch body. */
  contentType: "application/merge-patch+json";
}

export type UpsertWorkerParameters = UpsertWorkerHeaderParam &
  UpsertWorkerMediaTypesParam &
  UpsertWorkerBodyParam &
  RequestParameters;
export type GetWorkerParameters = RequestParameters;
export type DeleteWorkerParameters = RequestParameters;

export interface ListWorkersQueryParamProperties {
  /** Number of objects to return per page. */
  maxpagesize?: number;
  /**
   * If specified, select workers by worker state.
   *
   * Possible values: active, draining, inactive, all
   */
  state?: string;
  /** If specified, select workers who have a channel configuration with this channel. */
  channelId?: string;
  /** If specified, select workers who are assigned to this queue. */
  queueId?: string;
  /**
   * If set to true, select only workers who have capacity for the channel specified
   * by `channelId` or for any channel if `channelId` not specified. If set to
   * false, then will return all workers including workers without any capacity for
   * jobs. Defaults to false.
   */
  hasCapacity?: boolean;
}

export interface ListWorkersQueryParam {
  queryParameters?: ListWorkersQueryParamProperties;
}

export type ListWorkersParameters = ListWorkersQueryParam & RequestParameters;
