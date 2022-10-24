// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineRequest } from "../interfaces.js";
import { RetryInformation, RetryModifiers, RetryStrategy } from "./retryStrategy.js";
import { DEFAULT_CLIENT_MAX_RETRY_INTERVAL, DEFAULT_CLIENT_RETRY_INTERVAL } from "../constants.js";
import { DefaultRetryPolicyOptions } from "../policies/defaultRetryPolicy.js";
import * as retryAfterUtil from "../util/retryAfter.js";

// Workaround for module imports being non-configurable in browser
// Allows for sinon to stub the delay function and remove jitter
export const _retryAfterUtil = { ...retryAfterUtil };

/**
 * An iterator factory for failover hosts. Yields the next host to retry, or yields undefined if failover should be skipped.
 */
export type FailoverHostDelegate = (
  retryState: RetryInformation,
  options: DefaultRetryPolicyOptions
) => Iterator<FailoverHostState | undefined, void, RetryInformation>;

/**
 * A host for failover and its associated state.
 */
export interface FailoverHostState {
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
interface FailoverHosts {
  index: number;
  hostStates: FailoverHostState[];
}

function shouldFailover({ response, responseError }: RetryInformation): boolean {
  const retryableResponse = response && 500 <= response.status && response.status < 600;
  const retryableError =
    responseError?.code && ["ETIMEDOUT", "ECONNREFUSED", "ENOENT"].includes(responseError.code);
  return (retryableResponse || retryableError) as boolean;
}

/**
 * Default behavior for generating hosts for failover.
 *
 * If the request method is GET, HEAD, or OPTIONS, it cycles through `readHosts`. Otherwise, it cycles through `writeHosts`.
 */
export function readWriteFailoverHostDelegate(options: {
  readHosts?: string[];
  writeHosts?: string[];
}): FailoverHostDelegate {
  const { readHosts, writeHosts } = options;
  const readHostStateList: FailoverHosts = {
    index: 0,
    hostStates: (readHosts ?? []).map((url) => {
      const host = new URL(url).host;
      return { host, retryCount: 0 };
    }),
  };
  const writeHostStateList: FailoverHosts = {
    index: 0,
    hostStates: (writeHosts ?? []).map((url) => {
      const host = new URL(url).host;
      return { host, retryCount: 0 };
    }),
  };

  return function* (retryState, factoryOptions) {
    // Optimization for the case where no retry hosts are specified
    if (!readHostStateList.hostStates.length && !writeHostStateList.hostStates.length) {
      return;
    }

    const retryDelayInMs = factoryOptions.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
    const maxRetryDelayInMs = factoryOptions.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

    while (true) {
      const request = retryState.response?.request || retryState.responseError?.request;
      if (!request) {
        throw Error("Request should be defined.");
      }

      // Select correct list of hosts for this request
      const isSafeMethod = ["GET", "HEAD", "OPTIONS"].includes(request.method);
      const currentStateList = isSafeMethod ? readHostStateList : writeHostStateList;

      if (currentStateList.hostStates.length === 0) {
        retryState = yield undefined;
        continue;
      }
      const hostState = currentStateList.hostStates[currentStateList.index];

      const requestFireTime = Math.max(hostState.retryAt?.valueOf() ?? -Infinity, Date.now());

      retryState = yield hostState;

      const exponentialDelay = _retryAfterUtil.exponentialDelayInMs(
        hostState.retryCount,
        retryDelayInMs,
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
  const delegateMap = new WeakMap<PipelineRequest, ReturnType<FailoverHostDelegate>>();
  return {
    name: "failoverRetryStrategy",
    retry(state) {
      if (!shouldFailover(state) || !options.failoverHostDelegate) {
        return { skipStrategy: true };
      }

      const request = state.response?.request || state.responseError?.request;
      if (!request) {
        throw Error("Request should be defined.");
      }

      // Register a delegate for failover hosts for this request (and all of its retries)
      if (!delegateMap.has(request)) {
        delegateMap.set(request, options.failoverHostDelegate(state, options));
      }

      // Get the next host for this request
      const failoverHosts = delegateMap.get(request)!;
      const hostResult = failoverHosts.next(state);

      // Skip if there are no fallback hosts
      if (hostResult.done) {
        return { skipStrategy: true };
      }

      // Skip if the delegate decides not to failover
      const hostState = hostResult.value;
      if (!hostState) {
        return { skipStrategy: true };
      }

      const redirectUrl = new URL(request.url);
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
