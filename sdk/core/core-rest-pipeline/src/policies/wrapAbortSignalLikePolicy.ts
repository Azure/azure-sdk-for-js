// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type PipelinePolicy } from "../pipeline.js";
import { wrapAbortSignalLike } from "#platform/wrapAbortSignal";
import { cleanupOnRequestAndResponseCompletion } from "../util/abortSignalCleanup.js";
import type { PipelineResponse } from "../interfaces.js";

export const wrapAbortSignalLikePolicyName = "wrapAbortSignalLikePolicy";

/**
 * Policy that ensure that any AbortSignalLike is wrapped in a native AbortSignal for processing by the pipeline.
 * Since the ts-http-runtime expects a native AbortSignal, this policy is used to ensure that any AbortSignalLike is wrapped in a native AbortSignal.
 *
 * @returns - created policy
 */
export function wrapAbortSignalLikePolicy(): PipelinePolicy {
  return {
    name: wrapAbortSignalLikePolicyName,
    sendRequest: async (request, next) => {
      if (!request.abortSignal) {
        return next(request);
      }

      const originalAbortSignal = request.abortSignal;
      const { abortSignal, cleanup } = wrapAbortSignalLike(originalAbortSignal);
      request.abortSignal = abortSignal;
      let response: PipelineResponse | undefined;
      try {
        response = await next(request);
        return response;
      } finally {
        request.abortSignal = originalAbortSignal;
        if (cleanup !== undefined) {
          cleanupOnRequestAndResponseCompletion(response, cleanup);
        }
      }
    },
  };
}
