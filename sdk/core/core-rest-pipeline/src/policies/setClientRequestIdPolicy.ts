// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * The programmatic identifier of the setClientRequestIdPolicy.
 */
export const setClientRequestIdPolicyName = "setClientRequestIdPolicy";

/**
 * Options for how HTTP connections generate the client request id header
 * requests.
 */
export interface SetClientRequestIdPolicyOptions {
  /**
   * The header name to use for the client request id
   */
  requestIdHeaderName?: string;
  /**
   * Whether or not to include a the generateClientRequestPolicyId pipeline
   */
  disable?: boolean;
}

/**
 * Default options for ClientRequestId policy
 */
export const DefaultSetClientRequestIdPolicyOptions: SetClientRequestIdPolicyOptions = {
  requestIdHeaderName: "x-ms-client-request-id",
  disable: false
};

/**
 * Each PipelineRequest gets a unique id upon creation.
 * This policy passes that unique id along via an HTTP header to enable better
 * telemetry and tracing.
 * @param requestIdHeaderName - The name of the header to pass the request ID to.
 */
export function setClientRequestIdPolicy(
  requestIdHeaderName = "x-ms-client-request-id"
): PipelinePolicy {
  return {
    name: setClientRequestIdPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.headers.has(requestIdHeaderName)) {
        request.headers.set(requestIdHeaderName, request.requestId);
      }
      return next(request);
    }
  };
}
