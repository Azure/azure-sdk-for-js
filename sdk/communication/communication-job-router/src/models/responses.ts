// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ClassificationPolicy,
  DistributionPolicy,
  ExceptionPolicy,
  RouterQueue,
  RouterJob,
  RouterWorker,
} from "../generated/src";

import {
  JobRouterReclassifyJobActionResponse as JobRouterReclassifyJobActionResponseGenerated,
  JobRouterCancelJobActionResponse as JobRouterCancelJobActionResponseGenerated,
  JobRouterCompleteJobActionResponse as JobRouterCompleteJobActionResponseGenerated,
  JobRouterCloseJobActionResponse as JobRouterCloseJobActionResponseGenerated,
  JobRouterDeclineJobActionResponse as JobRouterDeclineJobActionResponseGenerated,
} from "../generated/src/models";

import { JSONValue } from "./models";

export { UnassignJobResult } from "../generated/src/models";

export interface RouterJobResponse extends RouterJob {
  readonly id: string;
}

export interface RouterWorkerResponse extends RouterWorker {
  readonly id: string;
}

export interface RouterQueueResponse extends RouterQueue {
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

/** Contains response data for the reclassifyJobAction operation. */
export interface JobRouterReclassifyJobActionResponse
  extends Omit<JobRouterReclassifyJobActionResponseGenerated, "body"> {
  /** The parsed response body. */
  body?: JSONValue;
}

/** Contains response data for the cancelJobAction operation. */
export interface JobRouterCancelJobActionResponse
  extends Omit<JobRouterCancelJobActionResponseGenerated, "body"> {
  /** The parsed response body. */
  body?: JSONValue;
}

/** Contains response data for the completeJobAction operation. */
export interface JobRouterCompleteJobActionResponse
  extends Omit<JobRouterCompleteJobActionResponseGenerated, "body"> {
  /** The parsed response body. */
  body?: JSONValue;
}

/** Contains response data for the closeJobAction operation. */
export interface JobRouterCloseJobActionResponse
  extends Omit<JobRouterCloseJobActionResponseGenerated, "body"> {
  /** The parsed response body. */
  body?: JSONValue;
}

/** Contains response data for the declineJobAction operation. */
export interface JobRouterDeclineJobActionResponse
  extends Omit<JobRouterDeclineJobActionResponseGenerated, "body"> {
  /** The parsed response body. */
  body?: JSONValue;
}
