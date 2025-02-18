// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RetryOptions } from "../../src/index.js";

export function createFullRetryOptions(options: RetryOptions = {}): Required<RetryOptions> {
  const {
    maxRetries = 0,
    maxRetryDelayInMs = 0,
    mode = "Fixed",
    retryDelayInMs = 0,
    timeoutInMs = 100,
  } = options;
  return {
    maxRetries,
    maxRetryDelayInMs,
    mode,
    retryDelayInMs,
    timeoutInMs,
  };
}
