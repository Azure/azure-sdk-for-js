// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { URLBuilder } from "../url";
import { WebResourceLike } from "../webResource";

/**
 * Methods that are allowed to follow redirects 301 and 302
 */
const allowedRedirect = ["GET", "HEAD"];

/**
 * Options for how redirect responses are handled.
 */
export interface RedirectOptions {
  /**
   * When true, redirect responses are followed.  Defaults to true.
   */
  handleRedirects: boolean;

  /**
   * The maximum number of times the redirect URL will be tried before
   * failing.  Defaults to 20.
   */
  maxRetries?: number;
}

export const DefaultRedirectOptions: RedirectOptions = {
  handleRedirects: true,
  maxRetries: 20,
};

/**
 * Creates a redirect policy, which sends a repeats the request to a new destination if a response arrives with a "location" header, and a status code between 300 and 307.
 * @param maximumRetries - Maximum number of redirects to follow.
 * @returns An instance of the {@link RedirectPolicy}
 */
export function redirectPolicy(maximumRetries = 20): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new RedirectPolicy(nextPolicy, options, maximumRetries);
    },
  };
}

/**
 * Resends the request to a new destination if a response arrives with a "location" header, and a status code between 300 and 307.
 */
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
    (status === 300 ||
      (status === 301 && allowedRedirect.includes(request.method)) ||
      (status === 302 && allowedRedirect.includes(request.method)) ||
      (status === 303 && request.method === "POST") ||
      status === 307) &&
    (!policy.maxRetries || currentRetries < policy.maxRetries)
  ) {
    const builder = URLBuilder.parse(request.url);
    builder.setPath(locationHeader);
    request.url = builder.toString();

    // POST request with Status code 303 should be converted into a
    // redirected GET request if the redirect url is present in the location header
    if (status === 303) {
      request.method = "GET";
      delete request.body;
    }

    return policy._nextPolicy
      .sendRequest(request)
      .then((res) => handleRedirect(policy, res, currentRetries + 1));
  }

  return Promise.resolve(response);
}
