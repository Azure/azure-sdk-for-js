// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import { retryPolicy } from "@azure/core-rest-pipeline";

import type { MSIConfiguration } from "./models.js";
import { calculateRetryDelay } from "@azure/core-util";

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

          return calculateRetryDelay(retryCount, {
            retryDelayInMs: msiRetryConfig.startDelayInMs,
            maxRetryDelayInMs: DEFAULT_CLIENT_MAX_RETRY_INTERVAL,
          });
        },
      },
    ],
    {
      maxRetries: msiRetryConfig.maxRetries,
    },
  );
}
