// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, OperationOptions } from "@azure/core-http";
import { Poller, PollOperation, PollOperationState } from "@azure/core-lro";
import { GeneratedClient } from "../generated/generatedClient";
import { TextDocumentInput } from "../generated/models";
import { TextAnalyticsOperationOptions } from "../textAnalyticsOperationOptions";

/**
 * Options for configuring a polling operation.
 */
export interface PollingOptions {
  /**
   * Delay to wait until next poll, in milliseconds.
   */
  updateIntervalInMs?: number;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  resumeFrom?: string;
}

export interface TextAnalyticsStatusOperationOptions extends OperationOptions {
  /**
   * If set to true, response will contain input and document level statistics.
   */
  includeStatistics?: boolean;
}

/**
 * Common parameters to a Poller.
 */
export interface AnalysisPollerOptions {
  readonly client: GeneratedClient;
  readonly documents: TextDocumentInput[];
  readonly analysisOptions?: TextAnalyticsOperationOptions;
  updateIntervalInMs?: number;
  resumeFrom?: string;
}

/**
 * An interface representing the state of an analysis poller operation.
 */
export interface AnalysisPollOperationState<TResult> extends PollOperationState<TResult> {
  /**
   * The id of the analysis job.
   */
  jobId?: string;
}

/**
 * Common properties and methods of analysis Pollers.
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
 */
export abstract class AnalysisPollOperation<TState, TResult>
  implements PollOperation<TState, TResult> {
  constructor(public state: TState) {}

  /**
   * @summary Meant to reach to the service and update the Poller operation.
   * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
   */
  public abstract update(): Promise<PollOperation<TState, TResult>>;

  /**
   * @summary Meant to reach to the service and cancel the Poller operation.
   * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
   */
  public abstract cancel(): Promise<PollOperation<TState, TResult>>;

  /**
   * @summary Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state
    });
  }
}
