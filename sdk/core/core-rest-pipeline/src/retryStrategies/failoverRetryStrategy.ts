// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest } from "../interfaces";
import { RetryInformation, RetryModifiers, RetryStrategy } from "./retryStrategy";
import { DEFAULT_CLIENT_MAX_RETRY_INTERVAL, DEFAULT_CLIENT_RETRY_INTERVAL } from "../constants";
import { DefaultRetryPolicyOptions } from "../policies/defaultRetryPolicy";

/**
 * A generator for failover hosts. Yields the next host to retry, or yields undefined if failover should be skipped.
 */
export type FailoverHostGenerator = (
  retryState: RetryInformation,
  options: DefaultRetryPolicyOptions
) => Generator<FailoverHostState | undefined, void, RetryInformation>;

/**
 * A host for failover and its associated state.
 */
export declare interface FailoverHostState {
  /**
   * The host which this policy will try next.
   */
  host: string;
  /**
   * How many times this host has been tried.
   */
  retryCount: number;
  /**
   * The policy should wait until `retryAt` has elapsed to try this host.
   */
  retryAt?: Date;
}
declare interface FailoverHosts {
  index: number;
  hostStates: FailoverHostState[];
}

/**
 * Default behavior for generating hosts for failover.
 *
 * If the request method is GET, HEAD, or OPTIONS, it cycles through `readHosts`. Otherwise, it cycles through `writeHosts`.
 */
export function defaultFailoverHostGenerator(
  readHosts: string[] = [],
  writeHosts: string[] = []
): FailoverHostGenerator {
  const readHostStateList: FailoverHosts = {
    index: 0,
    hostStates: readHosts.map((url) => {
      const host = new URL(url).host;
      return { host, retryCount: 0 };
    }),
  };
  const writeHostStateList: FailoverHosts = {
    index: 0,
    hostStates: writeHosts.map((url) => {
      const host = new URL(url).host;
      return { host, retryCount: 0 };
    }),
  };
  return function* (retryState, options) {
    while (retryState) {
      const response = retryState.response;
      const retryDelayInMs = options.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
      const maxRetryDelayInMs = options.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
      if (!response) {
        return;
      }

      // Select correct list of hosts for this request
      const isSafeMethod = ["GET", "HEAD", "OPTIONS"].includes(response.request.method);
      const currentStateList = isSafeMethod ? readHostStateList : writeHostStateList;

      if (currentStateList.hostStates.length === 0) {
        yield undefined;
        continue;
      }
      const hostState = currentStateList.hostStates[currentStateList.index];

      const requestFireTime = Math.max(hostState.retryAt?.valueOf() ?? -Infinity, Date.now());

      retryState = yield hostState;

      const exponentialDelay = Math.min(
        retryDelayInMs * 2 ** hostState.retryCount,
        maxRetryDelayInMs
      );
      const nextRetryAt = new Date(requestFireTime + exponentialDelay);
      hostState.retryAt = nextRetryAt;

      currentStateList.index = (currentStateList.index + 1) % currentStateList.hostStates.length;
      hostState.retryCount++;
    }
  };
}

/**
 *
 * @param options - Lists of fallback endpoints for read/write operations
 * @returns An exponential retry strategy with support for multiple endpoints
 */
export function failoverRetryStrategy(options: DefaultRetryPolicyOptions): RetryStrategy {
  const generatorMap = new WeakMap<PipelineRequest, ReturnType<FailoverHostGenerator>>();
  return {
    name: "failoverRetryStrategy",
    retry(state) {
      const response = state.response;
      // Only fallback to another host on a 5xx response
      if (!(response && 500 <= response.status && response.status < 600)) {
        return { skipStrategy: true };
      }

      if (!options.failoverHostGenerator) {
        return { skipStrategy: true };
      }

      // Register a generator for failover hosts for this request (and all of its retries)
      if (!generatorMap.has(response.request)) {
        generatorMap.set(response.request, options.failoverHostGenerator(state, options));
      }

      // Get the next host for this request
      const failoverHosts = generatorMap.get(response.request)!;
      const hostResult = failoverHosts.next(state);

      // Skip if there are no fallback hosts
      if (hostResult.done) {
        return { skipStrategy: true };
      }

      // Skip if the generator decides not to failover
      const hostState = hostResult.value;
      if (!hostState) {
        return { skipStrategy: true };
      }

      const redirectUrl = new URL(response.request.url);
      redirectUrl.host = hostState.host;

      const modifiers: RetryModifiers = { redirectTo: redirectUrl.toString() };

      if (hostState.retryAt) {
        const timeUntilRetryAt = hostState.retryAt.valueOf() - Date.now();
        if (timeUntilRetryAt > 0) {
          modifiers.retryAfterInMs = timeUntilRetryAt;
        }
      }

      return modifiers;
    },
  };
}
