// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import type { Request100ContinueMode, Request100ContinueOptions } from "../Pipeline.js";
import { HeaderConstants } from "../utils/constants.js";

/**
 * The programmatic identifier of the storageExpectContinuePolicy.
 */
export const storageExpectContinuePolicyName = "storageExpectContinuePolicy";

const EXPECT_CONTINUE = "100-continue";
const DISABLE_ENVIRONMENT_VARIABLE = "AZURE_STORAGE_DISABLE_EXPECT_CONTINUE_HEADER";
const DEFAULT_AUTO_INTERVAL_IN_MS = 60 * 1000;
// Statuses the service returns while it is throttling or overloaded.
const THROTTLING_STATUSES: ReadonlySet<number> = new Set([429, 500, 503]);

function isDisabledByEnvironment(): boolean {
  const value = process.env[DISABLE_ENVIRONMENT_VARIABLE]?.trim().toLowerCase();
  return value === "true" || value === "1";
}

function resolveMode(
  mode: Request100ContinueMode | undefined,
  defaultMode: Request100ContinueMode,
): Request100ContinueMode {
  if (isDisabledByEnvironment()) {
    return "never";
  }
  // Unset and unknown values, such as ones from untyped callers, get the default.
  return mode === "auto" || mode === "always" || mode === "never" ? mode : defaultMode;
}

/**
 * storageExpectContinuePolicy sends the `Expect: 100-continue` header on requests with a body,
 * always or, in `auto` mode, for a while after a 429, 500 or 503 response. Add it after the retry
 * phase so that the retry of a throttled attempt already carries the header.
 */
export function storageExpectContinuePolicy(
  options?: Request100ContinueOptions,
  defaultMode: Request100ContinueMode = "auto",
): PipelinePolicy {
  const mode = resolveMode(options?.mode, defaultMode);
  const contentLengthThreshold = options?.contentLengthThreshold ?? 0;
  const autoIntervalInMs = options?.autoIntervalInMs ?? DEFAULT_AUTO_INTERVAL_IN_MS;
  let lastThrottledAt: number | undefined;

  function shouldSendHeader(request: PipelineRequest): boolean {
    if (
      mode === "never" ||
      request.body === undefined ||
      request.body === null ||
      request.headers.has(HeaderConstants.EXPECT)
    ) {
      return false;
    }
    if (
      mode === "auto" &&
      (lastThrottledAt === undefined || performance.now() - lastThrottledAt >= autoIntervalInMs)
    ) {
      return false;
    }
    const contentLength = request.headers.get(HeaderConstants.CONTENT_LENGTH);
    if (contentLength === undefined) {
      // A body of unknown length is treated as a large one.
      return true;
    }
    const length = Number(contentLength);
    return length > 0 && length >= contentLengthThreshold;
  }

  return {
    name: storageExpectContinuePolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const sendHeader = shouldSendHeader(request);
      if (sendHeader) {
        request.headers.set(HeaderConstants.EXPECT, EXPECT_CONTINUE);
      }
      try {
        const response = await next(request);
        if (mode === "auto" && THROTTLING_STATUSES.has(response.status)) {
          lastThrottledAt = performance.now();
        }
        return response;
      } finally {
        // The retry policy sends the same request object again, so each attempt decides afresh.
        if (sendHeader) {
          request.headers.delete(HeaderConstants.EXPECT);
        }
      }
    },
  };
}
