import { HttpOperationResponse, RequestOptionsBase } from "@azure/core-http";
import { PollOperationState, PollOperation } from "../../src"
import { FakeServiceClient } from "./fakeServiceClient";
import { FakeWebResource } from "./fakeWebResource";

export interface HttpPollProperties {
  client: FakeServiceClient,
  requestOptions?: RequestOptionsBase,
  initialResponse?: HttpOperationResponse,
  previousResponse?: HttpOperationResponse,
}

interface HttpPollOperation extends PollOperation<HttpPollProperties> {
}

export class FakeOperation implements HttpPollOperation {
  public state: PollOperationState<HttpPollProperties>;

  constructor(properties: HttpPollProperties) {
    const state: PollOperationState<HttpPollProperties> = {
      properties
    };
    this.state = state;
  }

  async update(): Promise<HttpPollOperation> {
    const { client, requestOptions, initialResponse, previousResponse } = this.state.properties;
    let response: HttpOperationResponse;
    
    if (!initialResponse) {
      response = await client.sendInitialRequest(new FakeWebResource(
        requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
      ));
      this.state.properties.initialResponse = response;
    } else
    if (previousResponse && previousResponse.parsedBody.isFinal) {
      response = await client.sendFinalRequest(new FakeWebResource(
        requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
      ));
    } else {
      response = await client.sendRequest(new FakeWebResource(
        requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
      ));
    }
    
    this.state.properties.previousResponse = response;
    return this;
  }
 
  async cancel(): Promise<HttpPollOperation> {
    const requestOptions = this.state.properties.requestOptions;

    if (requestOptions && requestOptions.abortSignal && requestOptions.abortSignal.aborted) {
      // Simulating a try catch of an HTTP request that's given an aborted abortSignal.
      return await this.update(); // This will throw
    }
  
    // Simulating the response of an HTTP Request
    this.state.properties.previousResponse = {
      status: 205
    } as HttpOperationResponse;
  
    return this;
  }
}

export class FakeNonCancellableOperation implements HttpPollOperation {
  public state: PollOperationState<HttpPollProperties>;

  constructor(properties: HttpPollProperties) {
    const state: PollOperationState<HttpPollProperties> = {
      properties
    };
    this.state = state;
  }
 
  async update(): Promise<HttpPollOperation> {
    const { client, requestOptions, initialResponse, previousResponse } = this.state.properties;
    let response: HttpOperationResponse;
    
    if (!initialResponse) {
      response = await client.sendInitialRequest(new FakeWebResource(
        requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
      ));
      this.state.properties.initialResponse = response;
    } else
    if (previousResponse && previousResponse.parsedBody.isFinal) {
      response = await client.sendFinalRequest(new FakeWebResource(
        requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
      ));
    } else {
      response = await client.sendRequest(new FakeWebResource(
        requestOptions && requestOptions.abortSignal, // abortSignal?: AbortSignalLike,
      ));
    }
    
    this.state.properties.previousResponse = response;
    return this;
  }
 
  
  async cancel(): Promise<HttpPollOperation> {
    const requestOptions = this.state.properties.requestOptions;
  
    if (requestOptions && requestOptions.abortSignal && requestOptions.abortSignal.aborted) {
      // Simulating a try catch of an HTTP request that's given an aborted abortSignal.
      return await this.update(); // This will throw
    }
  
    throw new Error("Cancellation not supported");
  }
}
