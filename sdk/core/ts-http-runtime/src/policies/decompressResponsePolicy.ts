// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * The programmatic identifier of the decompressResponsePolicy.
 */
export const decompressResponsePolicyName = "decompressResponsePolicy";

/**
 * A policy to enable response decompression according to Accept-Encoding header
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
 */
export function decompressResponsePolicy(): PipelinePolicy {
  return {
    name: decompressResponsePolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // HEAD requests have no body
      if (request.method !== "HEAD") {
        request.headers.set("Accept-Encoding", "gzip,deflate");
      }
      return next(request);
    },
  };
}
