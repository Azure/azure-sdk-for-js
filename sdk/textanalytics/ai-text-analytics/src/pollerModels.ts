// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState } from "@azure/core-lro";
import { State } from "./generated/models";

/**
 * Metadata information for an analysis poller operation.
 */
export interface OperationMetadata {
  /**
   * The date and time the operation was created.
   */
  createdOn: Date;
  /**
   * The date and time when the operation results will expire on the server.
   */
  expiresOn?: Date;
  /**
   * The operation id.
   */
  operationId: string;
  /**
   * The time the operation status was last updated.
   */
  lastModifiedOn: Date;
  /**
   * The current status of the operation.
   */
  status: State;
}

/**
 * An interface representing the state of an analysis poller operation.
 */
export interface AnalysisPollOperationState<TResult>
  extends PollOperationState<TResult>,
    OperationMetadata {}
