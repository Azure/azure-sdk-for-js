// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type PipelinePolicy } from "../pipeline.js";
import { wrapAbortSignalLike } from "../util/wrapAbortSignal.js";

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

      const { abortSignal, cleanup } = wrapAbortSignalLike(request.abortSignal);
      // eslint-disable-next-line no-param-reassign
      request.abortSignal = abortSignal;
      try {
        return await next(request);
      } finally {
        cleanup?.();
      }
    },
  };
}
