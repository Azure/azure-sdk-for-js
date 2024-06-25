// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";
import { HeaderConstants } from "../utils/constants";
import { isNode } from "@azure-tools/test-utils";

/**
 * The programmatic identifier of the storageCorrectContentLengthPolicy.
 */
export const storageCorrectContentLengthPolicyName = "StorageCorrectContentLengthPolicy";


/**
 * storageCorrectConentLengthPolicy to correctly set Content-Length header with request body length.
 */
export function storageCorrectContentLengthPolicy(): PipelinePolicy {
  function correctContentLength(request: PipelineRequest): void {
    if (isNode) {
        if (
        request.body &&
        (typeof request.body === "string" || Buffer.isBuffer(request.body)) &&
        request.body.length > 0
        ) {
        request.headers.set(HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
        }
    }
  }

  return {
    name: storageCorrectContentLengthPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      correctContentLength(request);
      return next(request);
    },
  };
}
