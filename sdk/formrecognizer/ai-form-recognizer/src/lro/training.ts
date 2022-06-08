// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, PollerLike } from "@azure/core-lro";
import { OperationOptions } from "@azure/core-client";
import { FormRecognizerError } from "../error";
import { GetOperationResponse, ModelInfo, OperationStatus } from "../generated";
import { PollerOptions } from "../options/PollerOptions";

/**
 * The state of a model creation operation.
 */
export interface TrainingPollOperationState extends PollOperationState<ModelInfo> {
  /**
   * The status of the operation. One of:
   *
   * - "notStarted"
   * - "running"
   * - "succeeded"
   * - "failed"
   * - "canceled"
   */
  status: OperationStatus;

  /**
   * The API version used to train this model.
   */
  apiVersion?: string;

  /**
   * The unique ID of this operation.
   */
  operationId: string;

  /**
   * A number between 0 and 100 representing the progress of the operation.
   */
  percentCompleted: number;

  /**
   * The Date and Time that the operation was created.
   */
  createdOn: Date;

  /**
   * The date & time that the operation state was last modified.
   */
  lastUpdatedOn: Date;

  /**
   * Additional, user-defined key-value pairs associated with the model as metadata.
   */
  tags?: Record<string, string>;
}

/**
 * Convert an operation result into a training poller state.
 * @internal
 */
export async function toTrainingPollOperationState(
  response: GetOperationResponse
): Promise<TrainingPollOperationState> {
  return {
    operationId: response.operationId,
    status: response.status,
    apiVersion: response.apiVersion,
    percentCompleted: response.percentCompleted ?? 0,
    lastUpdatedOn: response.lastUpdatedDateTime,
    createdOn: response.createdDateTime,
    result: response.result as ModelInfo | undefined,
    error: response.error && new FormRecognizerError(response.error),
    isCancelled: response.status === "canceled",
    isCompleted: response.status === "succeeded",
    isStarted: response.status !== "notStarted",
    tags: response.tags,
  };
}

/**
 * A long-running operation (poller) that tracks the state of a model creation operation, eventually producing a
 * {@link ModelInfo}.
 */
export type TrainingPoller = PollerLike<TrainingPollOperationState, ModelInfo>;

/**
 * Defines a training operation.
 * @internal
 */
export interface TrainingOperationDefinition {
  /**
   * A function to start the operation, producing an operationLocation.
   */
  start: () => Promise<{ operationLocation?: string }>;
  /**
   * Options for the poller and requests.
   */
  options: PollerOptions<TrainingPollOperationState> & OperationOptions;
}
