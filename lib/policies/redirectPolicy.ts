// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import * as parse from "url-parse";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyCreator, RequestPolicyOptions } from "./requestPolicy";

export function redirectPolicy(maximumRetries = 20): RequestPolicyCreator {
  return (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
    return new RedirectPolicy(nextPolicy, options, maximumRetries);
  };
}

export class RedirectPolicy extends BaseRequestPolicy {

  maximumRetries?: number;

  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, maximumRetries = 20) {
    super(nextPolicy, options);
    this.maximumRetries = maximumRetries;
  }

  async handleRedirect(response: HttpOperationResponse, currentRetries: number): Promise<HttpOperationResponse> {
    const request = response.request;
    const locationHeader = response.headers.get("location");
    if (locationHeader &&
      (response.status === 300 || response.status === 307 || (response.status === 303 && request.method === "POST")) &&
      (!this.maximumRetries || currentRetries < this.maximumRetries)) {

      request.url = parse(locationHeader, parse(request.url)).href;

      // POST request with Status code 303 should be converted into a
      // redirected GET request if the redirect url is present in the location header
      if (response.status === 303) {
        request.method = "GET";
      }
      let res: HttpOperationResponse;
      try {
        res = await this._nextPolicy.sendRequest(request);
        currentRetries++;
      } catch (err) {
        return Promise.reject(err);
      }
      return this.handleRedirect(res, currentRetries);
    }
    return Promise.resolve(response);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const response: HttpOperationResponse = await this._nextPolicy.sendRequest(request);
    return this.handleRedirect(response, 0);
  }
}
