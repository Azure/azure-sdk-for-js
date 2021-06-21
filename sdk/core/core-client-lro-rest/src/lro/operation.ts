// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperation, PollOperationState } from "@azure/core-lro";
import {
  PollerConfig,
  ResumablePollOperationState,
  LRO,
  LROState
} from "./models";
import { getPollingURL } from "./requestUtils";
import { createInitializeState, createPollForLROState } from "./stateMachine";

export class GenericPollOperation<TResult>
  implements PollOperation<PollOperationState<TResult>, TResult> {
  private getLROState?: (
    pollingURL: string,
    pollerConfig: PollerConfig
  ) => Promise<LROState<TResult>>;
  private pollerConfig?: PollerConfig;
  constructor(
    public state: ResumablePollOperationState<TResult>,
    private lro: LRO<TResult>
  ) {}

  public setPollerConfig(pollerConfig: PollerConfig) {
    this.pollerConfig = pollerConfig;
  }

  /**
   * General update function for LROPoller, the general process is as follows
   * 1. Check initial operation result to determine the strategy to use
   *  - Strategies: Location, Azure-AsyncOperation, Original Uri
   * 2. Check if the operation result has a terminal state
   *  - Terminal state will be determined by each strategy
   *  2.1 If it is terminal state Check if a final GET request is required, if so
   *      send final GET request and return result from operation. If no final GET
   *      is required, just return the result from operation.
   *      - Determining what to call for final request is responsibility of each strategy
   *  2.2 If it is not terminal state, call the polling operation and go to step 1
   *      - Determining what to call for polling is responsibility of each strategy
   *      - Strategies will always use the latest URI for polling if provided otherwise
   *        the last known one
   */
  async update(options?: {
    abortSignal?: AbortSignalLike | undefined;
    fireProgress?: ((state: PollOperationState<TResult>) => void) | undefined;
  }): Promise<PollOperation<PollOperationState<TResult>, TResult>> {
    const state = this.state;
    if (!state.isStarted) {
      const initializeState = createInitializeState(
        state,
        this.lro.requestPath,
        this.lro.requestMethod
      );
      await this.lro.sendInitialRequest(initializeState);
    }

    if (!state.isCompleted) {
      if (this.getLROState === undefined) {
        if (state.config === undefined) {
          throw new Error("Bad state: LRO mode is undefined");
        }
        this.getLROState = createPollForLROState(this.lro, state.config);
      }
      if (state.pollingURL === undefined) {
        throw new Error("Bad state: polling URL is undefined");
      }
      const currentState = await this.getLROState(
        state.pollingURL,
        this.pollerConfig!
      );
      if (currentState.done) {
        state.result = currentState.flatResponse;
        state.isCompleted = true;
      } else {
        this.getLROState = currentState.next ?? this.getLROState;
        state.pollingURL = getPollingURL(
          currentState.rawResponse,
          state.pollingURL
        );
      }
    }
    if (options?.fireProgress !== undefined) {
      options.fireProgress(state);
    }
    return this;
  }

  async cancel(): Promise<PollOperation<PollOperationState<TResult>, TResult>> {
    this.state.isCancelled = true;
    return this;
  }

  /**
   * Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state
    });
  }
}
