// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * The programmatic identifier of the disableResponseDecompressionPolicy.
 */
export const disableResponseDecompressionPolicyName = "disableResponseDecompressionPolicy";

/**
 * A policy to disable response decompression according to Accept-Encoding header
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding
 */
export function disableResponseDecompressionPolicy(): PipelinePolicy {
  return {
    name: disableResponseDecompressionPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.skipDecompressResponse = true;
      return next(request);
    }
  };
}
