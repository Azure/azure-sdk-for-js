// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollerLike, PollOperationState } from "@azure/core-lro";
import { OperationOptions } from "../../../../core/core-client/types/latest/core-client";
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
   * The unique ID of this operation.
   */
  operationId: string;
  /**
   * A number between 0 and 100 representing the progress of the operation.
   */
  percentCompleted: number;
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
    percentCompleted: response.percentCompleted ?? 0,
    result: response.result,
    error: response.error && new FormRecognizerError(response.error),
    isCancelled: response.status === "canceled",
    isCompleted: response.status === "succeeded",
    isStarted: response.status !== "notStarted",
  };
}

/**
 * A long-running operation (poller) that tracks the state of a model creation operation, eventually producing a
 * {@link ModelInfo}.
 */
export type TrainingPoller = PollerLike<TrainingPollOperationState, ModelInfo>;

const operationLocationRegex = /\/operations\/([^?/]+)/;

/**
 * Extract an operation ID from an operationLocation URL.
 * @internal
 */
export function parseOperationLocation(url: string | undefined): string {
  if (url === undefined) {
    throw new Error("Failed to start training operation: no operation-location in the response.");
  }

  const parseResult = operationLocationRegex.exec(url);
  if (!parseResult || !parseResult[1]) {
    throw new Error(`Unable to parse operationLocation: "${url}"`);
  }

  return parseResult[1];
}

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
