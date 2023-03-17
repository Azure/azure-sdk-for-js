// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ClassificationPolicy,
  DistributionPolicy,
  ExceptionPolicy,
  JobQueue,
  RouterJob,
  RouterWorker,
} from "../generated/src";

export {
  JobRouterCancelJobActionResponse,
  JobRouterCloseJobActionResponse,
  JobRouterCompleteJobActionResponse,
  JobRouterDeclineJobActionResponse,
} from "../generated/src/models";

export interface UnAssignJobResponse {
  /** The Id of the job unassigned. */
  jobId: string;
  /** The number of times a job is unassigned. At a maximum 3. */
  unAssignmentCount: number;
}

export interface RouterJobResponse extends RouterJob {
  readonly id: string;
}

export interface RouterWorkerResponse extends RouterWorker {
  readonly id: string;
}

export interface JobQueueResponse extends JobQueue {
  readonly id: string;
}

export interface ClassificationPolicyResponse extends ClassificationPolicy {
  readonly id: string;
}

export interface DistributionPolicyResponse extends DistributionPolicy {
  readonly id: string;
}

export interface ExceptionPolicyResponse extends ExceptionPolicy {
  readonly id: string;
}
