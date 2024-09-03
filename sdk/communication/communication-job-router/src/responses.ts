// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ClassificationPolicy,
  ExceptionPolicy,
  DistributionPolicy,
  RouterQueue,
  RouterJob,
  RouterWorker,
  JSONValue,
} from "./models";

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

/** Contains response data for the reclassify job operation. */
export type ReclassifyJobResponse = {
  /** The parsed response body. */
  body: JSONValue;
};

/** Contains response data for the cancel job operation. */
export type CancelJobResponse = {
  /** The parsed response body. */
  body: JSONValue;
};

/** Contains response data for the complete job operation. */
export type CompleteJobResponse = {
  /** The parsed response body. */
  body: JSONValue;
};

/** Contains response data for the close job operation. */
export type CloseJobResponse = {
  /** The parsed response body. */
  body: JSONValue;
};

/** Contains response data for the decline job operation. */
export type DeclineJobOfferResponse = {
  /** The parsed response body. */
  body: JSONValue;
};

export {
  AcceptJobOfferResult as AcceptJobOfferResponse,
  UnassignJobResult as UnassignJobResponse,
} from "./generated/src";
