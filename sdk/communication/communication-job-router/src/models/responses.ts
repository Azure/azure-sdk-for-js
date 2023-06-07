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
  UnassignJobResult,
} from "../generated/src/models";

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
