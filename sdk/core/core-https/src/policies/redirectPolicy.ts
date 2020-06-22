// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { URL } from "../util/url";

/**
 * The programmatic identifier of the redirectPolicy.
 */
export const redirectPolicyName = "redirectPolicy";

/**
 * Options for how redirect responses are handled.
 */
export interface RedirectPolicyOptions {
  /**
   * The maximum number of times the redirect URL will be tried before
   * failing.  Defaults to 20.
   */
  maxRetries?: number;
}

/**
 * A policy to follow Location headers from the server in order
 * to support server-side redirection.
 * @param options Options to control policy behavior.
 */
export function redirectPolicy(options: RedirectPolicyOptions = {}): PipelinePolicy {
  const { maxRetries = 20 } = options;
  return {
    name: redirectPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response = await next(request);
      return handleRedirect(next, response, maxRetries);
    }
  };
}

async function handleRedirect(
  next: SendRequest,
  response: PipelineResponse,
  maxRetries: number,
  currentRetries: number = 0
): Promise<PipelineResponse> {
  const { request, status, headers } = response;
  const locationHeader = headers.get("location");
  if (
    locationHeader &&
    (status === 300 || status === 307 || (status === 303 && request.method === "POST")) &&
    currentRetries < maxRetries
  ) {
    const url = new URL(locationHeader, request.url);
    const req = request.clone();
    req.url = url.toString();

    // POST request with Status code 303 should be converted into a
    // redirected GET request if the redirect url is present in the location header
    if (status === 303) {
      req.method = "GET";
    }

    const res = await next(req);
    return handleRedirect(next, res, maxRetries, currentRetries + 1);
  }

  return response;
}
