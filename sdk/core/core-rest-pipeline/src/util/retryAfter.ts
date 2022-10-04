// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getRandomIntegerInclusive } from "@azure/core-util";

export function exponentialDelayInMs(
  retryCount: number,
  retryDelayInMs: number,
  maxRetryDelayInMs: number,
  jitter: boolean = true
): number {
  if (retryCount < 0) {
    return 0;
  }
  const clampedExponentialDelay = Math.min(retryDelayInMs * 2 ** retryCount, maxRetryDelayInMs);
  if (jitter) {
    return getRandomIntegerInclusive(clampedExponentialDelay / 2, clampedExponentialDelay);
  }
  return Math.floor(clampedExponentialDelay);
}
