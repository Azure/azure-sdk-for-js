import { HttpOperationResponse, RequestOptionsBase } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "../../src";
import { TestServiceClient } from "./testServiceClient";
import { TestWebResource } from "./testWebResource";

export interface TestOperationProperties {
  client: TestServiceClient;
  requestOptions?: RequestOptionsBase;
  initialResponse?: HttpOperationResponse;
  previousResponse?: HttpOperationResponse;
  resultValue?: string;
  unsupportedCancel?: boolean;
}

export interface TestOperation extends PollOperation<TestOperationProperties, string> {}

async function update(
  this: TestOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (properties: TestOperationProperties) => void;
  } = {}
): Promise<TestOperation> {
  const { client, requestOptions, initialResponse, previousResponse } = this.properties;
  const abortSignal = options.abortSignal || (requestOptions && requestOptions.abortSignal);

  let response: HttpOperationResponse;
  const doFinalResponse = previousResponse && previousResponse.parsedBody.doFinalResponse;

  if (!initialResponse) {
    response = await client.sendInitialRequest(new TestWebResource(abortSignal));
    this.properties.initialResponse = response;
  } else if (doFinalResponse) {
    response = await client.sendFinalRequest(new TestWebResource(abortSignal));
    this.state.completed = true;
    this.state.result = "Done";
  } else {
    response = await client.sendRequest(new TestWebResource(abortSignal));
  }

  const properties: TestOperationProperties = {
    ...this.properties,
    previousResponse: response
  };

  // Progress only after the poller has started and before the poller is done
  if (!(!initialResponse || doFinalResponse) && options.fireProgress) {
    options.fireProgress(properties);
  }

  return makeOperation({ ...this.state }, properties);
}

async function cancel(
  this: TestOperation,
  options: { abortSignal?: AbortSignal } = {}
): Promise<TestOperation> {
  const requestOptions = this.properties.requestOptions;
  const abortSignal = options.abortSignal || (requestOptions && requestOptions.abortSignal);

  if (abortSignal && abortSignal.aborted) {
    // Simulating a try catch of an HTTP request that's given an aborted abortSignal.
    return await this.update({
      abortSignal
    }); // This will throw
  }

  if (this.properties.unsupportedCancel) {
    throw new Error("Cancellation not supported");
  }

  // Simulating the response of an HTTP Request
  const response = {
    status: 205
  } as HttpOperationResponse;

  return makeOperation(
    {
      ...this.state,
      cancelled: true
    },
    {
      ...this.properties,
      previousResponse: response
    }
  );
}

function toString(this: TestOperation): string {
  return JSON.stringify({
    state: {
      ...this.state
    },
    properties: this.properties
  });
}

export function makeOperation(
  state: PollOperationState<string>,
  properties: TestOperationProperties
): TestOperation {
  return {
    state,
    properties,
    update,
    cancel,
    toString
  };
}
