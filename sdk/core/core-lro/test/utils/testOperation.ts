// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse, RequestOptionsBase } from "@azure/core-http";
import { PollOperation, PollOperationState } from "../../src";
import { AbortSignalLike } from "@azure/abort-controller";
import { TestServiceClient } from "./testServiceClient";
import { TestWebResource } from "./testWebResource";

export interface PublicTestOperationState extends PollOperationState<string> {
  previousResponse?: HttpOperationResponse;
}

export interface TestOperationState extends PollOperationState<string> {
  client?: TestServiceClient;
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

  if (!client) {
    // The client property is assigned to the operation state during the instantiation of the `TestPoller`.
    // So the client should always exist.
    // Though `PublicTestOperationState` doesn't have the client property,
    // so we have to make it optional in `TestOperationState`.
    throw new Error("The client property should exist");
  }

  let response: HttpOperationResponse;
  const doFinalResponse = previousResponse && previousResponse.parsedBody.doFinalResponse;
  const newState = { ...this.state };

  if (!initialResponse) {
    response = await client!.sendInitialRequest(new TestWebResource(abortSignal));
    newState.initialResponse = response;
    newState.isStarted = true;
  } else if (doFinalResponse) {
    response = await client!.sendFinalRequest(new TestWebResource(abortSignal));
    newState.isCompleted = true;
    newState.result = "Done";
    newState.previousResponse = response;
  } else {
    response = await client!.sendRequest(new TestWebResource(abortSignal));
    newState.previousResponse = response;
  }

  if (!response) {
    throw new Error("Our tests must not run forever");
  }

  // Progress only after the poller has started and before the poller is done
  if (initialResponse && !doFinalResponse && options.fireProgress) {
    options.fireProgress(newState);
  }

  return makeOperation(newState);
}

async function cancel(
  this: TestOperation,
  options: { abortSignal?: AbortSignalLike } = {}
): Promise<TestOperation> {
  const requestOptions = this.state.requestOptions;
  const abortSignal = options.abortSignal || (requestOptions && requestOptions.abortSignal);

  if (abortSignal && abortSignal.aborted) {
    // Simulating a try catch of an HTTP request that's given an aborted abortSignal.
    return this.update({
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
