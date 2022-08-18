// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  JobRouterCancelJobActionResponse,
  JobRouterCloseJobActionResponse,
  JobRouterCompleteJobActionResponse,
  JobRouterDeclineJobActionResponse
} from "../generated/src/models";

export interface JobPositionDetailsResponse {
  /** Id of the job these details are about. */
  jobId: string;
  /** Position of the job in question within that queue. */
  position: number;
  /** Id of the queue this job is enqueued in. */
  queueId: string;
  /** Length of the queue: total number of enqueued jobs. */
  queueLength: number;
  /** Estimated wait time of the job rounded up to the nearest minute */
  estimatedWaitTimeInMinutes: number;
}

export interface UnAssignJobResponse {
  /** The Id of the job unassigned. */
  jobId: string;
  /** The number of times a job is unassigned. At a maximum 3. */
  unAssignmentCount: number;
}
