// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse, RequestOptionsBase } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "../../src";
import { TestServiceClient } from "./testServiceClient";
import { TestWebResource } from "./testWebResource";

export interface TestOperationState extends PollOperationState<string> {
  client: TestServiceClient;
  requestOptions?: RequestOptionsBase;
  initialResponse?: HttpOperationResponse;
  previousResponse?: HttpOperationResponse;
  unsupportedCancel?: boolean;
}

export interface TestOperation extends PollOperation<TestOperationState, string> {}

async function update(
  this: TestOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: TestOperationState) => void;
  } = {}
): Promise<TestOperation> {
  const { client, requestOptions, initialResponse, previousResponse } = this.state;
  const abortSignal = options.abortSignal || (requestOptions && requestOptions.abortSignal);

  let response: HttpOperationResponse;
  const doFinalResponse = previousResponse && previousResponse.parsedBody.doFinalResponse;

  if (!initialResponse) {
    response = await client.sendInitialRequest(new TestWebResource(abortSignal));
    this.state.initialResponse = response;
    this.state.isStarted = true;
  } else if (doFinalResponse) {
    response = await client.sendFinalRequest(new TestWebResource(abortSignal));
    this.state.isCompleted = true;
    this.state.result = "Done";
    this.state.previousResponse = response;
  } else {
    response = await client.sendRequest(new TestWebResource(abortSignal));
    this.state.previousResponse = response;
  }

  if (!response) {
    throw new Error("Our tests must not run forever");
  }

  // Progress only after the poller has started and before the poller is done
  if (initialResponse && !doFinalResponse && options.fireProgress) {
    options.fireProgress(this.state);
  }

  return makeOperation(this.state);
}

async function cancel(
  this: TestOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<TestOperation> {
  const requestOptions = this.state.requestOptions;
  const abortSignal = options.abortSignal || (requestOptions && requestOptions.abortSignal);

  if (abortSignal && abortSignal.aborted) {
    // Simulating a try catch of an HTTP request that's given an aborted abortSignal.
    return await this.update({
      abortSignal
    }); // This will throw
  }

  if (this.state.unsupportedCancel) {
    throw new Error("Cancellation not supported");
  }

  // Simulating the response of an HTTP Request
  const response = {
    status: 205
  } as HttpOperationResponse;

  return makeOperation({
    ...this.state,
    isCancelled: true,
    previousResponse: response
  });
}

function toString(this: TestOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

export function makeOperation(state: TestOperationState): TestOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
