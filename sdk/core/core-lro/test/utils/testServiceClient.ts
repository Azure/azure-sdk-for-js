// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpOperationResponse,
  RequestOptionsBase,
  ServiceClient,
  ServiceClientCredentials,
  ServiceClientOptions,
  TokenCredential,
} from "@azure/core-http";

interface TestServiceClientOptions extends ServiceClientOptions {}

export class TestServiceClient extends ServiceClient {
  private responses: HttpOperationResponse[] = [];
  private initialResponse?: HttpOperationResponse;
  private finalResponse?: HttpOperationResponse;
  public credentials: TokenCredential | ServiceClientCredentials;
  public totalSentRequests: number;

  constructor(
    credentials: TokenCredential | ServiceClientCredentials,
    options?: TestServiceClientOptions
  ) {
    super(credentials, options);
    this.credentials = credentials;
    this.totalSentRequests = 0;
  }

  public setResponses(responses: HttpOperationResponse[]): void {
    this.initialResponse = responses[0];
    this.responses = responses.slice(1, -1);
    this.finalResponse = responses[responses.length - 1];
  }

  // Normally we would call this.client.sendRequest, from the ServiceClient class.
  public async sendRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    if (options && options.abortSignal && options.abortSignal.aborted) {
      throw new Error("The operation was aborted.");
    }
    this.totalSentRequests += 1;
    return this.responses.shift()!;
  }
  public async sendInitialRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    if (options && options.abortSignal && options.abortSignal.aborted) {
      throw new Error("The operation was aborted.");
    }
    this.totalSentRequests += 1;
    return this.initialResponse!;
  }
  public async sendFinalRequest(options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    if (options && options.abortSignal && options.abortSignal.aborted) {
      throw new Error("The operation was aborted.");
    }
    this.totalSentRequests += 1;
    return this.finalResponse!;
  }
}
