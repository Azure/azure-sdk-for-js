// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalPipelineRetryOptions, PipelineRequest } from "../interfaces";
import { RetryInformation, RetryModifiers, RetryStrategy } from "./retryStrategy";
import { DEFAULT_CLIENT_MAX_RETRY_INTERVAL, DEFAULT_CLIENT_RETRY_INTERVAL } from "../constants";
import * as retryAfterUtil from "../util/retryAfter";

// Workaround for module imports being non-configurable in browser
// Allows for sinon to stub the delay function and remove jitter
export const _retryAfterUtil = { ...retryAfterUtil };

/**
 * An iterator factory for failover hosts. Yields the next host to retry, or yields undefined if failover should be skipped.
 */
export type FailoverHostDelegate = (
  requestOptions: InternalPipelineRetryOptions
) => (retryState: RetryInformation) => FailoverHostState | undefined;

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
  return function (requestOptions) {
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

    // Optimization for the case where no retry hosts are specified
    if (!readHostStateList.hostStates.length && !writeHostStateList.hostStates.length) {
      return () => undefined;
    }

    const retryDelayInMs = requestOptions.retryDelayInMs ?? DEFAULT_CLIENT_RETRY_INTERVAL;
    const maxRetryDelayInMs = requestOptions.maxRetryDelayInMs ?? DEFAULT_CLIENT_MAX_RETRY_INTERVAL;

    return function (retryState) {
      const request = retryState.response?.request || retryState.responseError?.request;
      if (!request) {
        throw Error("Request should be defined.");
      }

      // Select correct list of hosts for this request
      const isSafeMethod = ["GET", "HEAD", "OPTIONS"].includes(request.method);
      const currentStateList = isSafeMethod ? readHostStateList : writeHostStateList;

      if (currentStateList.hostStates.length === 0) {
        return undefined;
      }

      const hostState = currentStateList.hostStates[currentStateList.index];

      const requestFireTime = Math.max(hostState.retryAt?.valueOf() ?? -Infinity, Date.now());
      const exponentialDelay = _retryAfterUtil.exponentialDelayInMs(
        hostState.retryCount - 1,
        retryDelayInMs,
        maxRetryDelayInMs
      );
      hostState.retryAt = new Date(requestFireTime + exponentialDelay);

      currentStateList.index = (currentStateList.index + 1) % currentStateList.hostStates.length;
      hostState.retryCount++;

      return hostState;
    };
  };
}

/**
 *
 * @param options - Lists of fallback endpoints for read/write operations
 * @returns An exponential retry strategy with support for multiple endpoints
 */
export function failoverRetryStrategy(options: InternalPipelineRetryOptions): RetryStrategy {
  const delegateMap = new WeakMap<PipelineRequest, ReturnType<FailoverHostDelegate>>();
  return {
    name: "failoverRetryStrategy",
    retry(state) {
      if (!options.failoverHostDelegate || !shouldFailover(state)) {
        return { skipStrategy: true };
      }

      const request = state.response?.request || state.responseError?.request;
      if (!request) {
        throw Error("Request should be defined.");
      }

      // Register a delegate for failover hosts for this request (and all of its retries)
      if (!delegateMap.has(request)) {
        delegateMap.set(request, options.failoverHostDelegate(options));
      }

      // Get the next host for this request
      const failoverHosts = delegateMap.get(request)!;
      const hostState = failoverHosts(state);

      // Skip if the delegate decides not to failover
      if (!hostState) {
        return { skipStrategy: true };
      }

      const redirectUrl = new URL(request.url);
      redirectUrl.host = hostState.host;

      const modifiers: RetryModifiers = { redirectTo: redirectUrl.toString() };

      if (hostState.retryAt) {
        const timeUntilRetryAt = hostState.retryAt.getTime() - Date.now();
        if (timeUntilRetryAt > 0) {
          modifiers.retryAfterInMs = timeUntilRetryAt;
        }
      }

      return modifiers;
    },
  };
}
