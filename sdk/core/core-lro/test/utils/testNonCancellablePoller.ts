// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse, RequestOptionsBase, delay } from "@azure/core-http";
import { TestOperationState, makeOperation } from "./testOperation";
import { Poller } from "../../src";
import { TestServiceClient } from "./testServiceClient";

export class TestNonCancellablePoller extends Poller<TestOperationState, string> {
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
      unsupportedCancel: true,
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
   * Can be used to get a publicly safe version of the poller state.
   */
  public getOperationState(): TestOperationState {
    return this.operation.state;
  }
}
