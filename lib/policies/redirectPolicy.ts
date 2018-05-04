// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as parse from "url-parse";
import { HttpOperationResponse } from "../httpOperationResponse";
import * as utils from "../util/utils";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicyCreator, RequestPolicy } from "./requestPolicy";

export function redirectPolicy(maximumRetries = 20): RequestPolicyCreator {
  return (nextPolicy: RequestPolicy) => {
    const result = new RedirectPolicy(maximumRetries);
    result.nextPolicy = nextPolicy;
    return result;
  };
}

export class RedirectPolicy extends BaseRequestPolicy {

  maximumRetries?: number;

  constructor(maximumRetries = 20) {
    super();
    this.maximumRetries = maximumRetries;
  }

  async handleRedirect(operationResponse: HttpOperationResponse, currentRetries: number): Promise<HttpOperationResponse> {
    const request = operationResponse.request;
    const response = operationResponse.response;
    if (response && response.headers && response.headers.get("location") &&
      (response.status === 300 || response.status === 307 || (response.status === 303 && request.method === "POST")) &&
      (!this.maximumRetries || currentRetries < this.maximumRetries)) {

      request.url = parse(response.headers.get("location")!, parse(request.url)).href;

      // POST request with Status code 303 should be converted into a
      // redirected GET request if the redirect url is present in the location header
      if (response.status === 303) {
        request.method = "GET";
      }
      let res: HttpOperationResponse;
      try {
        res = await utils.dispatchRequest(request);
        currentRetries++;
      } catch (err) {
        return Promise.reject(err);
      }
      return this.handleRedirect(res, currentRetries);
    }
    return Promise.resolve(operationResponse);
  }

  after(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse> {
    return this.handleRedirect(operationResponse, 0);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const response: HttpOperationResponse = await this.nextPolicy!.sendRequest(request);
    return this.after(response);
  }
}
