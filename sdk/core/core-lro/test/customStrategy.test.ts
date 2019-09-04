// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { SimpleTokenCredential, HttpHeaders, HttpOperationResponse, ServiceClientCredentials, ServiceClientOptions, TokenCredential, WebResource, RestError } from "@azure/core-http";
import { LROPollState, LROPollStrategy, LROServiceClient } from "../src";

const fakeHttpHeaders: HttpHeaders = new HttpHeaders();
const fakeRequest: WebResource = new WebResource();

class CustomLROPollStrategy extends LROPollStrategy {
  public sendPollRequest(): Promise<void> {
    const lroPollState: LROPollState = this._pollState;
    return this.updateOperationStatus(lroPollState.appState.statusURL || "", false).then((response: HttpOperationResponse) => {
      const statusCode: number = response.status;
      const parsedResponse: any = response.parsedBody;

      if (statusCode !== 200 && statusCode !== 201 && statusCode !== 204) {
        const error = new RestError(`Invalid status code (${statusCode}) with response body "${response.bodyAsText}" occurred when polling for operation status.`);
        error.statusCode = statusCode;
        error.request = response.request;
        error.response = response;
        error.body = parsedResponse;
        throw error;
      }

      lroPollState.state = parsedResponse!.provisioningState;
      lroPollState.mostRecentResponse = response;
      lroPollState.mostRecentRequest = response.request;
    });
  }

  protected shouldDoFinalGetResourceRequest(): boolean {
    const lroPollState: LROPollState = this._pollState;
    const initialResponse: HttpOperationResponse = lroPollState.initialResponse!;
    const initialResponseStatusCode: number = initialResponse.status;
    return initialResponseStatusCode === 201;
  }

  protected doFinalGetResourceRequest(): Promise<void> {
    const lroPollState: LROPollState = this._pollState;
    return this.updateState(lroPollState.appState.statusURL, true);
  } 

  public isFinalStatusAcceptable(): boolean {
    const lroPollState: LROPollState = this._pollState;
    const mostRecentResponse: HttpOperationResponse = lroPollState.mostRecentResponse!;
    const mostRecentResponseStatusCode: number = mostRecentResponse.status;
    return mostRecentResponseStatusCode === 200;
  }
} 

class FakeClient extends LROServiceClient {
  constructor(credentials: TokenCredential | ServiceClientCredentials, options?: ServiceClientOptions) {
    super(credentials, options);
    this.totalRequests = 0;

    this.responses = [{
      status: 204,
      headers: fakeHttpHeaders,
      parsedBody: {
      },
      request: fakeRequest
    }, {
      status: 201,
      headers: fakeHttpHeaders,
      parsedBody: {
      },
      request: fakeRequest
    }, {
      status: 200,
      headers: fakeHttpHeaders,
      parsedBody: {
        provisioningState: "Succeeded"
      },
      request: fakeRequest
    }];
  }

  private totalRequests: number;

  private responses: HttpOperationResponse[];

  async sendRequest(): Promise<HttpOperationResponse> {
    return this.responses[this.totalRequests++];
  }
} 

describe("LROPollStrategy - custom strategy", function () {
  it("Writing a custom strategy", async function () {
    const client = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    const lroPollState: LROPollState = {
      appState: {
        statusUrl: ""
      }
    };
    const strategy = new CustomLROPollStrategy(client, lroPollState);
    await strategy.pollUntilFinished();
    assert.equal(lroPollState.mostRecentResponse!.parsedBody.provisioningState, "Succeeded");
  });
}); 
