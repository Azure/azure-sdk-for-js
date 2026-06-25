// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ReclassifyJobOptions,
  CancelJobOptions,
  CompleteJobOptions,
  CloseJobOptions,
  UnassignJobOptions,
  DeclineJobOfferOptions,
  RouterJobStatusSelector,
  RouterWorkerStateSelector,
} from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface ListWorkersOptionalParams extends OperationOptions {
  /** Number of objects to return per page. */
  maxpagesize?: number;
  /** If specified, select workers by worker state. */
  state?: RouterWorkerStateSelector;
  /** If specified, select workers who have a channel configuration with this channel. */
  channelId?: string;
  /** If specified, select workers who are assigned to this queue. */
  queueId?: string;
  /** If set to true, select only workers who have capacity for the channel specified by `channelId` or for any channel if `channelId` not specified. If set to false, then will return all workers including workers without any capacity for jobs. Defaults to false. */
  hasCapacity?: boolean;
}

/** Optional parameters. */
export interface DeleteWorkerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetWorkerOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpsertWorkerOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
}

/** Optional parameters. */
export interface GetQueueStatisticsOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface DeclineJobOfferOptionalParams extends OperationOptions {
  /** Request model for declining offer. */
  options?: DeclineJobOfferOptions;
}

/** Optional parameters. */
export interface AcceptJobOfferOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UnassignJobOptionalParams extends OperationOptions {
  /** Request body for unassign route. */
  options?: UnassignJobOptions;
}

/** Optional parameters. */
export interface GetQueuePositionOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface ListJobsOptionalParams extends OperationOptions {
  /** Number of objects to return per page. */
  maxpagesize?: number;
  /** If specified, filter jobs by status. */
  status?: RouterJobStatusSelector;
  /** If specified, filter jobs by queue. */
  queueId?: string;
  /** If specified, filter jobs by channel. */
  channelId?: string;
  /** If specified, filter jobs by classificationPolicy. */
  classificationPolicyId?: string;
  /** If specified, filter on jobs that was scheduled before or at given timestamp. Range: (-Inf, scheduledBefore]. */
  scheduledBefore?: Date;
  /** If specified, filter on jobs that was scheduled at or after given value. Range: [scheduledAfter, +Inf). */
  scheduledAfter?: Date;
}

/** Optional parameters. */
export interface CloseJobOptionalParams extends OperationOptions {
  /** Request model for closing job. */
  options?: CloseJobOptions;
}

/** Optional parameters. */
export interface CompleteJobOptionalParams extends OperationOptions {
  /** Request model for completing job. */
  options?: CompleteJobOptions;
}

/** Optional parameters. */
export interface CancelJobOptionalParams extends OperationOptions {
  /** Request model for cancelling job. */
  options?: CancelJobOptions;
}

/** Optional parameters. */
export interface ReclassifyJobOptionalParams extends OperationOptions {
  /** Request object for reclassifying a job. */
  options?: ReclassifyJobOptions;
}

/** Optional parameters. */
export interface DeleteJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface GetJobOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface UpsertJobOptionalParams extends OperationOptions {
  /** The request should only proceed if an entity matches this string. */
  ifMatch?: string;
  /** The request should only proceed if the entity was not modified after this time. */
  ifUnmodifiedSince?: Date;
}
