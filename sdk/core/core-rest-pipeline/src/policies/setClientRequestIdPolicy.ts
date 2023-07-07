// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * The programmatic identifier of the setClientRequestIdPolicy.
 */
export const setClientRequestIdPolicyName = "setClientRequestIdPolicy";

/**
 * Options for setting client request id details to outgoing requests.
 */
export interface SetClientRequestIdPolicyOptions {
  /**
   * If specified, the name of the header will be used to pass the request ID to. 
   * The default header name is `x-ms-client-request-id`.
   */
  clientRequestIdHeaderName?: string;
}

/**
 * Each PipelineRequest gets a unique id upon creation.
 * This policy passes that unique id along via an HTTP header to enable better
 * telemetry and tracing.
 * @param options - Options that customize the policy.
 */
export function setClientRequestIdPolicy(
  options: SetClientRequestIdPolicyOptions = {}
): PipelinePolicy {
  return {
    name: setClientRequestIdPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      options.clientRequestIdHeaderName = options.clientRequestIdHeaderName ?? "x-ms-client-request-id";
      if (!request.headers.has(options.clientRequestIdHeaderName)) {
        request.headers.set(options.clientRequestIdHeaderName, request.requestId);
      }
      return next(request);
    },
  };
}
