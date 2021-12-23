// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse, RequestOptionsBase, delay } from "@azure/core-http";
import { PublicTestOperationState, TestOperationState, makeOperation } from "./testOperation";
import { Poller } from "../../src";
import { TestServiceClient } from "./testServiceClient";

export class TestPoller extends Poller<TestOperationState, string> {
  public intervalInMs: number;

  constructor(
    client: TestServiceClient,
    intervalInMs: number = 10,
    requestOptions?: RequestOptionsBase,
    baseOperation?: string,
    onProgress?: (state: TestOperationState) => void
  ) {
    let state: TestOperationState = {
      client,
    };

    if (baseOperation) {
      state = {
        ...JSON.parse(baseOperation).state,
        ...state,
      };
    }

    const operation = makeOperation({
      ...state,
      client,
      requestOptions,
    });

    super(operation);

    if (onProgress) {
      this.onProgress(onProgress);
    }
    this.intervalInMs = intervalInMs;
  }

  public get initialResponse(): HttpOperationResponse | undefined {
    return this.operation.state.initialResponse;
  }

  public get previousResponse(): HttpOperationResponse | undefined {
    return this.operation.state.previousResponse;
  }

  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * The getOperationState() from TestPoller returns an object
   * with the subset of properties from TestOperationState that are
   * safe to be shared with the public.
   */
  public getOperationState(): PublicTestOperationState {
    const state: PublicTestOperationState = this.operation.state;
    return {
      // Properties from PollOperationState<TResult>
      isStarted: state.isStarted,
      isCompleted: state.isCompleted,
      isCancelled: state.isCancelled,
      error: state.error,
      result: state.result,

      // The only other property needed by PublicTestOperationState.
      // The other properties from TestOperationState will be hidden from the user.
      previousResponse: state.previousResponse,
    };
  }
}
