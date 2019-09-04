// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { HttpHeaders, HttpOperationResponse, SimpleTokenCredential, WebResource, ServiceClient,  HttpOperationResponse, OperationArguments, OperationSpec, RequestOptionsBase, RequestPrepareOptions, ServiceClient, ServiceClientCredentials, ServiceClientOptions, TokenCredential, WebResource, getDefaultUserAgentValue as getDefaultUserAgentValueFromMsRest } from "@azure/core-http";
import { getDelayInSeconds, isFinished, LROPollState } from "../src";

class CustomLROPollStrategy extends LROPollStrategy {
  public sendPollRequest(): Promise<void> {
    const lroPollState: LROPollState = this._pollState;
    return this.updateOperationStatus(lroPollState.appState?.statusURL!, false).then((response: HttpOperationResponse) => {
      const statusCode: number = response.status;
      const parsedResponse: any = response.parsedBody;

      if (statusCode !== 200 && statusCode !== 204) {
        const error = new RestError(`Invalid status code (${statusCode}) with response body "${response.bodyAsText}" occurred when polling for operation status.`);
        error.statusCode = statusCode;
        error.request = stripRequest(response.request);
        error.response = response;
        error.body = parsedResponse;
        throw error;
      }

      lroPollState.state = parsedResponse.status;
      lroPollState.mostRecentResponse = response;
      lroPollState.mostRecentRequest = response.request;
    });
  }

  protected shouldDoFinalGetResourceRequest(): boolean {
    const lroPollState: LROPollState = this._pollState;
    const initialResponse: HttpOperationResponse = lroPollState.initialResponse;
    const initialRequestMethod: HttpMethods = initialResponse.request.method;
    const initialResponseStatusCode: number = initialResponse.status;
    return initialResponseStatusCode === 204;
  }

  public isFinalStatusAcceptable(): boolean {
    const lroPollState: LROPollState = this._pollState;
    const mostRecentResponse: HttpOperationResponse = lroPollState.mostRecentResponse;
    const mostRecentResponseStatusCode: number = mostRecentResponse.status;
    return initialResponseStatusCode === 200;
  }
} 

class FakeClient extends ServiceClient {
  constructor(credentials: TokenCredential | ServiceClientCredentials, options?: AzureServiceClientOptions) {
    super(credentials, options = updateOptionsWithDefaultValues(options));
    this.totalRequests = 0;

    this.responses = [{
      status: 204,
      parsedBody: {
        status: "fake service pending"
      },
      request: {}
    }, {
      status: 200,
      parsedBody: {
        "status": "fake services succeeded"
      },
      request: {}
    }];
  }

  private totalRequests: number;

  private responses: []HttpOperationResponse;

  async sendRequest(operationArguments: OperationArguments, operationSpec: OperationSpec, options?: RequestOptionsBase): Promise<HttpOperationResponse> {
    return this.responses[this.totalRequests++];
  }
} 

describe("LROPollStrategy - custom strategy", function () {
  it("Writing a custom strategy", function () {
    const fakeClient = new FakeClient(new SimpleTokenCredential("my-fake-token"));
    const strategy = new CustomLROPollStrategy(client, lroPollState);
    await strategy.pollUntilFinished();
  });
}); 
