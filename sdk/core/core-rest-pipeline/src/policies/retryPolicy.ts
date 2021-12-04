// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "..";
import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { delay } from "../util/helpers";

/**
 * The programmatic identifier of the retryPolicy.
 */
export const retryPolicyName = "retryPolicy";

export interface RetryStrategyState {
  // Retry count
  retryCount: number;
  // Request
  request: PipelineRequest;
  // Results from the previous retry
  previous: {
    // Response from the last request
    response?: PipelineResponse;
    // Error from the last request
    error?: RestError;
  };
  next: {
    // Retry after the given number of milliseconds.
    retryAfterInMs?: number;
    // Throw this RestError instead of retrying
    errorWith?: RestError;
    // Retry with this new URL
    redirectTo?: string;
  };
}

export interface RetryStrategy<TState = RetryStrategyState> {
  name: string;
  shouldRetry(state: TState): TState;
}

const DEFAULT_MAX_RETRIES = 3;

export const defaultRetryStrategy: RetryStrategy = {
  name: `Max retries to ${DEFAULT_MAX_RETRIES}`,
  shouldRetry(state) {
    const { retryCount, request } = state;
    const { response, error } = state.previous;
    if (retryCount >= DEFAULT_MAX_RETRIES) {
      state.next.errorWith = new RestError(`Exceeded number of retries: ${DEFAULT_MAX_RETRIES}`, {
        request,
        response,
        code: error?.code,
        statusCode: response?.status
      });
    }
    return state;
  }
};

/**
 * retryPolicy is a generic policy to enable retrying requests when certain conditions are met
 */
export function retryPolicy(strategies: RetryStrategy[]): PipelinePolicy {
  return {
    name: retryPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      let response: PipelineResponse | undefined;
      let error: RestError | undefined;

      const strategyState: RetryStrategyState[] = Array(strategies.length);
      retryRequest: while (true) {
        try {
          response = await next(request);
        } catch (e) {
          error = e as RestError;
          response = error.response;
        }
        for (const [i, strategy] of strategies.entries()) {
          let state: RetryStrategyState = strategyState[i];
          strategyState[i] = {
            ...state,
            retryCount: (state.retryCount ?? 0) + 1,
            previous: {
              response,
              error
            }
          };
          state = strategy.shouldRetry(state);
          strategyState[i] = state;
          if (state.next.errorWith) {
            throw state.next.errorWith;
          } else if (state.next.retryAfterInMs) {
            await delay(state.next.retryAfterInMs);
            continue retryRequest;
          } else if (state.next.redirectTo) {
            request.url = state.next.redirectTo;
            continue retryRequest;
          }
        }
        if (response) {
          return response;
        }
      }
    }
  };
}
