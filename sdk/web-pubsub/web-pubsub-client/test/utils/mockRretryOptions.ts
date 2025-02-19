// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubRetryOptions } from "../../src/index.js";

export function createFullRetryOptions(
  options: WebPubSubRetryOptions = {},
): Required<WebPubSubRetryOptions> {
  const { maxRetries = 0, maxRetryDelayInMs = 0, mode = "Fixed", retryDelayInMs = 0 } = options;
  return {
    maxRetries,
    maxRetryDelayInMs,
    mode,
    retryDelayInMs,
  };
}
