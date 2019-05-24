// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpOperationResponse } from "../httpOperationResponse";
import { URLBuilder } from "../url";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";

export function redirectPolicy(maximumRetries = 20): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new RedirectPolicy(nextPolicy, options, maximumRetries);
    }
  };
}

export class RedirectPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, readonly maxRetries = 20) {
    super(nextPolicy, options);
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this._nextPolicy.sendRequest(request).then(response => handleRedirect(this, response, 0));
  }
}

function handleRedirect(policy: RedirectPolicy, response: HttpOperationResponse, currentRetries: number): Promise<HttpOperationResponse> {
  const { request, status } = response;
  const locationHeader = response.headers.get("location");
  if (locationHeader &&
    (status === 300 || status === 307 || (status === 303 && request.method === "POST")) &&
    (!policy.maxRetries || currentRetries < policy.maxRetries)) {

    const builder = URLBuilder.parse(request.url);
    builder.setPath(locationHeader);
    request.url = builder.toString();

    // POST request with Status code 303 should be converted into a
    // redirected GET request if the redirect url is present in the location header
    if (status === 303) {
      request.method = "GET";
    }

    return policy._nextPolicy.sendRequest(request)
      .then(res => handleRedirect(policy, res, currentRetries + 1));
  }

  return Promise.resolve(response);
}