// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PipelinePolicy, retryPolicy } from "@azure/core-rest-pipeline";

import { MSIConfiguration } from "./models";
import { getRandomIntegerInclusive } from "@azure/core-util";

// Matches the default retry configuration in expontentialRetryStrategy.ts
const DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 64;

/**
 * An additional policy that retries on 404 errors. The default retry policy does not retry on
 * 404s, but the IMDS endpoint can return 404s when the token is not yet available. This policy
 * will retry on 404s with an exponential backoff.
 *
 * @param msiRetryConfig - The retry configuration for the MSI credential.
 * @returns - The policy that will retry on 404s.
 */
export function imdsRetryPolicy(msiRetryConfig: MSIConfiguration["retryConfig"]): PipelinePolicy {
  return retryPolicy(
    [
      {
        name: "imdsRetryPolicy",
        retry: ({ retryCount, response }) => {
          if (response?.status !== 404) {
            return { skipStrategy: true };
          }

          // Exponentially increase the delay each time
          const exponentialDelay = msiRetryConfig.startDelayInMs * Math.pow(2, retryCount);

          // Don't let the delay exceed the maximum
          const clampedExponentialDelay = Math.min(
            DEFAULT_CLIENT_MAX_RETRY_INTERVAL,
            exponentialDelay,
          );

          // Allow the final value to have some "jitter" (within 50% of the delay size) so
          // that retries across multiple clients don't occur simultaneously.
          const retryAfterInMs =
            clampedExponentialDelay / 2 + getRandomIntegerInclusive(0, clampedExponentialDelay / 2);

          return { retryAfterInMs };
        },
      },
    ],
    {
      maxRetries: msiRetryConfig.maxRetries,
    },
  );
}
