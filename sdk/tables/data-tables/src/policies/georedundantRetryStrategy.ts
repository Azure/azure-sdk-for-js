// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRetryOptions, RetryModifiers, RetryStrategy } from "@azure/core-rest-pipeline";

/**
 * Options for the georedundant retry strategy
 */
export declare interface GeoredundantRetryOptions extends PipelineRetryOptions {
  /**
   * List of fallback hosts for read operations
   */
  readHosts?: string[];
  /**
   * List of fallback hosts for write operations
   */
  writeHosts?: string[];
}

/**
 *
 * @param options - Lists of fallback endpoints for read/write operations
 * @returns An exponential retry strategy with support for multiple endpoints
 */
export function georedundantRetryStrategy(options: GeoredundantRetryOptions): RetryStrategy {
  // Store each host with the timestamp when it should be retried
  const readHostState: { host: string; retryAt?: number }[] = [];
  for (const host of options.readHosts ?? []) {
    readHostState.push({ host });
  }
  const writeHostState: { host: string; retryAt?: number }[] = [];
  for (const host of options.writeHosts ?? []) {
    writeHostState.push({ host });
  }

  const retryDelayInMs = options.retryDelayInMs ?? 1000;
  const maxRetryDelayInMs = options.maxRetryDelayInMs ?? 64000;

  return {
    name: "georedundantRetryStrategy",
    retry({ retryCount, response }) {
      // Only fallback to another host on a 5xx response
      if (!(response && 500 <= response.status && response.status < 600)) {
        return { skipStrategy: true };
      }

      // Determine whether this is a read or write operation and use the corresponding host list
      const isReadOperation =
        response.request.method === "GET" || response.request.method === "HEAD";
      const hostState = isReadOperation ? readHostState : writeHostState;

      // Skip if there are no fallback hosts
      if (hostState.length === 0) {
        return { skipStrategy: true };
      }

      // Fallback should wrap around if there are more retry attempts than hosts
      const index = retryCount % hostState.length;
      const modifiers: RetryModifiers = { redirectTo: hostState[index].host };

      // If this is not the first request to this host, delay the retry
      const now = Date.now();
      if (retryCount >= hostState.length) {
        const retryAfterInMs = hostState[index].retryAt ?? 0 - now;
        if (retryAfterInMs > 0) {
          modifiers.retryAfterInMs = retryAfterInMs;
        }
      }

      // Store the timestamp of this response to calculate the delay of the next retry
      hostState[index].retryAt =
        now +
        Math.min(
          retryDelayInMs * 2 ** Math.floor(retryCount / hostState.length),
          maxRetryDelayInMs
        );

      return modifiers;
    },
  };
}
