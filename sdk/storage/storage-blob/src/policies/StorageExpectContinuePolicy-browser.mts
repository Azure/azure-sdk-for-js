// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import type { ExpectContinueMode, ExpectContinueOptions } from "../Pipeline.js";

/**
 * The programmatic identifier of the storageExpectContinuePolicy.
 */
export const storageExpectContinuePolicyName = "storageExpectContinuePolicy";

/**
 * Browsers don't allow the `Expect` request header, so this policy sends requests unchanged.
 */
export function storageExpectContinuePolicy(
  _options?: ExpectContinueOptions,
  _defaultMode?: ExpectContinueMode,
): PipelinePolicy {
  return {
    name: storageExpectContinuePolicyName,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      return next(request);
    },
  };
}
