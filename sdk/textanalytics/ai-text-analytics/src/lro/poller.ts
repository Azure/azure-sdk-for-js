// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { GeneratedClient } from "../generated/generatedClient";
import { State, TextDocumentInput } from "../generated/models";
import { delay } from "../util";

/**
 * Common parameters to a Poller.
 * @internal
 */
export interface AnalysisPollerOptions {
  readonly client: GeneratedClient;
  readonly documents: TextDocumentInput[];
  readonly analysisOptions?: OperationOptions;
  updateIntervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Metadata information for an analysis poller operation.
 */
export interface OperationMetadata {
  /**
   * The date and time the operation was created.
   */
  createdOn?: Date;
  /**
   * The date and time when the operation results will expire on the server.
   */
  expiresOn?: Date;
  /**
   * The operation id.
   */
  operationId?: string;
  /**
   * The time the operation status was last updated.
   */
  lastModifiedOn?: Date;
  /**
   * The current status of the operation.
   */
  status?: State;
}

/**
 * An interface representing the state of an analysis poller operation.
 */
export interface AnalysisPollOperationState<TResult>
  extends PollOperationState<TResult>,
    OperationMetadata {}

/**
 * Common properties and methods of analysis Pollers.
 * @internal
 */
export abstract class AnalysisPoller<TState, TResult> extends Poller<TState, TResult> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public updateIntervalInMs: number = 2000;

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  async delay(): Promise<void> {
    return delay(this.updateIntervalInMs);
  }
}

/**
 * Common properties and methods of polling operations.
 * @internal
 */
export abstract class AnalysisPollOperation<TState, TResult>
  implements PollOperation<TState, TResult> {
  constructor(public state: TState) {}

  /**
   * Meant to reach to the service and update the Poller operation.
   * @param options - The optional parameters, which is only an abortSignal from \@azure/abort-controller
   */
  public abstract update(): Promise<PollOperation<TState, TResult>>;

  /**
   * Meant to reach to the service and cancel the Poller operation.
   * @param options - The optional parameters, which is only an abortSignal from \@azure/abort-controller
   */
  public abstract cancel(): Promise<PollOperation<TState, TResult>>;

  /**
   * Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state
    });
  }
}
