// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "../httpOperationResponse";
import { URLBuilder } from "../url";
import { WebResourceLike } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";

/**
 * Options for how redirect responses are handled.
 */
export interface RedirectOptions {
  /*
   * When true, redirect responses are followed.  Defaults to true.
   */
  handleRedirects: boolean;

  /*
   * The maximum number of times the redirect URL will be tried before
   * failing.  Defaults to 20.
   */
  maxRetries?: number;
}

export const DefaultRedirectOptions: RedirectOptions = {
  handleRedirects: true,
  maxRetries: 20
};

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

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this._nextPolicy
      .sendRequest(request)
      .then((response) => handleRedirect(this, response, 0));
  }
}

function handleRedirect(
  policy: RedirectPolicy,
  response: HttpOperationResponse,
  currentRetries: number
): Promise<HttpOperationResponse> {
  const { request, status } = response;
  const locationHeader = response.headers.get("location");
  if (
    locationHeader &&
    (status === 300 || status === 307 || (status === 303 && request.method === "POST")) &&
    (!policy.maxRetries || currentRetries < policy.maxRetries)
  ) {
    const builder = URLBuilder.parse(request.url);
    builder.setPath(locationHeader);
    request.url = builder.toString();

    // POST request with Status code 303 should be converted into a
    // redirected GET request if the redirect url is present in the location header
    if (status === 303) {
      request.method = "GET";
    }

    return policy._nextPolicy
      .sendRequest(request)
      .then((res) => handleRedirect(policy, res, currentRetries + 1));
  }

  return Promise.resolve(response);
}
