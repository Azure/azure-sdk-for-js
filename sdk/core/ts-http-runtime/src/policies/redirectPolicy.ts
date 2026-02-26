// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";

/**
 * The programmatic identifier of the redirectPolicy.
 */
export const redirectPolicyName = "redirectPolicy";

/**
 * Methods that are allowed to follow redirects 301 and 302
 */
const allowedRedirect = ["GET", "HEAD"];

/**
 * Options for how redirect responses are handled.
 */
export interface RedirectPolicyOptions {
  /**
   * The maximum number of times the redirect URL will be tried before
   * failing.  Defaults to 20.
   */
  maxRetries?: number;
  /**
   * Whether to follow redirects to a different origin (scheme + host + port).
   * When false (the default), cross-origin redirects are not followed and the
   * redirect response is returned directly to the caller.
   * Defaults to false.
   */
  allowCrossOriginRedirects?: boolean;
}

/**
 * A policy to follow Location headers from the server in order
 * to support server-side redirection.
 * In the browser, this policy is not used.
 * @param options - Options to control policy behavior.
 */
export function redirectPolicy(options: RedirectPolicyOptions = {}): PipelinePolicy {
  const { maxRetries = 20, allowCrossOriginRedirects = false } = options;
  return {
    name: redirectPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response = await next(request);
      return handleRedirect(next, response, maxRetries, allowCrossOriginRedirects);
    },
  };
}

async function handleRedirect(
  next: SendRequest,
  response: PipelineResponse,
  maxRetries: number,
  allowCrossOriginRedirects: boolean,
  currentRetries: number = 0,
): Promise<PipelineResponse> {
  const { request, status, headers } = response;
  const locationHeader = headers.get("location");
  if (
    locationHeader &&
    (status === 300 ||
      (status === 301 && allowedRedirect.includes(request.method)) ||
      (status === 302 && allowedRedirect.includes(request.method)) ||
      (status === 303 && request.method === "POST") ||
      status === 307) &&
    currentRetries < maxRetries
  ) {
    const url = new URL(locationHeader, request.url);

    // Only follow redirects to the same origin by default.
    if (!allowCrossOriginRedirects) {
      const originalUrl = new URL(request.url);
      if (url.origin !== originalUrl.origin) {
        return response;
      }
    }

    request.url = url.toString();

    // POST request with Status code 303 should be converted into a
    // redirected GET request if the redirect url is present in the location header
    if (status === 303) {
      request.method = "GET";
      request.headers.delete("Content-Length");
      delete request.body;
    }

    request.headers.delete("Authorization");

    const res = await next(request);
    return handleRedirect(next, res, maxRetries, allowCrossOriginRedirects, currentRetries + 1);
  }

  return response;
}
