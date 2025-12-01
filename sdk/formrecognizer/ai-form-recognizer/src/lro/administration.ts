// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PollOperationState, PollerLike } from "@azure/core-lro";
import type { OperationOptions } from "@azure/core-client";
import { FormRecognizerError } from "../error.js";
import type {
  DocumentModelDetails,
  OperationStatus,
  DocumentModelBuildOperationDetails,
  DocumentModelCopyToOperationDetails,
  DocumentModelComposeOperationDetails,
  DocumentClassifierDetails,
  DocumentClassifierBuildOperationDetails,
} from "../generated/index.js";
import type { PollerOptions } from "../options/PollerOptions.js";
import type { OperationContext } from "./util/poller.js";

/**
 * The possible types of all administration operation states.
 * @internal
 */
export type AdministrationOperationState =
  | DocumentModelOperationState
  | DocumentClassifierOperationState;

/**
 * The set of fields common to all administration operations.
 */
export interface ModelAdministrationOperationStateCommon {
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
 * The state of a model creation operation.
 */
export interface DocumentModelOperationState
  extends PollOperationState<DocumentModelDetails>, ModelAdministrationOperationStateCommon {}

/**
 * The respones of a model creation operation.
 * @internal
 */
export type DocumentModelBuildResponse =
  | DocumentModelBuildOperationDetails
  | DocumentModelCopyToOperationDetails
  | DocumentModelComposeOperationDetails;

/**
 * The possible responses of an administration operation.
 * @internal
 */
export type DocumentModelAdministrationResponse =
  | DocumentModelBuildResponse
  | DocumentClassifierBuildOperationDetails;

/**
 * Convert an operation result into a training poller state.
 * @internal
 */
export async function toTrainingPollOperationState(
  response: DocumentModelAdministrationResponse,
): Promise<DocumentModelOperationState | DocumentClassifierOperationState> {
  return {
    operationId: response.operationId,
    status: response.status,
    apiVersion: response.apiVersion,
    percentCompleted: response.percentCompleted ?? 0,
    lastUpdatedOn: response.lastUpdatedOn,
    createdOn: response.createdOn,
    error: response.error && new FormRecognizerError(response.error),
    isCancelled: response.status === "canceled",
    isCompleted: response.status === "succeeded",
    isStarted: response.status !== "notStarted",
    tags: response.tags,

    // The following assertion is required. Technically the type of `response.result` is
    // `DocumentModelDetails | DocumentClassifierDetails | undefined`, which isn't assignable to the type of
    // either operation state's result. We would need some kind of dependent typing to express how the type of `result`
    // actually _determines_ the type of the resulting return value.
    result: response.result,
  } as DocumentModelOperationState | DocumentClassifierOperationState;
}

/**
 * A long-running operation (poller) that tracks the state of a model creation operation, eventually producing a
 * {@link DocumentModelDetails}.
 */
export type DocumentModelPoller = PollerLike<DocumentModelOperationState, DocumentModelDetails>;

/**
 * Defines a training operation.
 * @internal
 */
export interface TrainingOperationDefinition<State extends AdministrationOperationState> {
  /**
   * A function to start the operation, producing an operationLocation.
   */
  start: (ctx: OperationContext) => Promise<{ operationLocation?: string }>;
  /**
   * Options for the poller and requests.
   */
  options: PollerOptions<State> & OperationOptions;
}

/**
 * A long-running operation (poller) that tracks the state of a custom classifier creation operation, eventually
 * producing a {@link DocumentClassifierDetails}.
 */
export type DocumentClassifierPoller = PollerLike<
  DocumentClassifierOperationState,
  DocumentClassifierDetails
>;

/**
 * The state of a model creation operation.
 */
export interface DocumentClassifierOperationState
  extends PollOperationState<DocumentClassifierDetails>, ModelAdministrationOperationStateCommon {}
