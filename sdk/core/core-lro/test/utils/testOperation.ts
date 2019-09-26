import { HttpOperationResponse, RequestOptionsBase } from "@azure/core-http";
import { PollOperationState, PollOperation } from "../../src"
import { TestServiceClient } from "./testServiceClient";
import { TestWebResource } from "./testWebResource";

export interface HttpPollProperties {
  client: TestServiceClient,
  requestOptions?: RequestOptionsBase,
  initialResponse?: HttpOperationResponse,
  previousResponse?: HttpOperationResponse,
  resultValue?: string,
}

interface HttpPollOperation extends PollOperation<HttpPollProperties> {
}
 
async function update(this: HttpPollOperation): Promise<HttpPollOperation> {
  const { client, requestOptions, initialResponse, previousResponse } = this.properties;
  let response: HttpOperationResponse;
  
  if (!initialResponse) {
    response = await client.sendInitialRequest(new TestWebResource(
      requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
    ));
    this.properties.initialResponse = response;
  } else
  if (previousResponse && previousResponse.parsedBody.doFinalResponse) {
    response = await client.sendFinalRequest(new TestWebResource(
      requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
    ));
    this.state.completed = true;
  } else {
    response = await client.sendRequest(new TestWebResource(
      requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
    ));
  }

  return makeOperation(
    {
      ...this.state
    },
    {
      ...this.properties,
      previousResponse: response,
    }
  );
}

async function cancel(this: HttpPollOperation): Promise<HttpPollOperation> {
  const requestOptions = this.properties.requestOptions;

  if (requestOptions && requestOptions.abortSignal && requestOptions.abortSignal.aborted) {
    // Simulating a try catch of an HTTP request that's given an aborted abortSignal.
    return await this.update(); // This will throw
  }

  // Simulating the response of an HTTP Request
  const response = {
    status: 205
  } as HttpOperationResponse;

  return makeOperation(
    {
      ...this.state,
      cancelled: true,
    },
    {
      ...this.properties,
      previousResponse: response,
    }
  );
}

function toString(this: HttpPollOperation): string {
  return JSON.stringify({
    state: {
      ...this.state,
    },
    properties: JSON.stringify(this.properties),
  });
}

async function unsupportedCancel(this: HttpPollOperation): Promise<HttpPollOperation> {
  const requestOptions = this.properties.requestOptions;

  if (requestOptions && requestOptions.abortSignal && requestOptions.abortSignal.aborted) {
    // Simulating a try catch of an HTTP request that's given an aborted abortSignal.
    return await this.update(); // This will throw
  }

  throw new Error("Cancellation not supported");
}

export function makeOperation(state: PollOperationState, properties: HttpPollProperties): HttpPollOperation {
  return {
    state,
    properties,
    update,
    cancel,
    toString,
  }
}

export function makeNonCancellableOperation(state: PollOperationState, properties: HttpPollProperties): HttpPollOperation {
  return {
    state,
    properties,
    update,
    cancel: unsupportedCancel,
    toString,
  }
}
