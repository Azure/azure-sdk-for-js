// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger } from "@azure/logger";
import { RestError } from "..";
import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { delay } from "../util/helpers";
import { custom } from "../util/inspect";
import { Sanitizer } from "../util/sanitizer";
import { createClientLogger } from "@azure/logger";

const retryPolicyLogger = createClientLogger("core-rest-pipeline retryPolicy");

/**
 * The programmatic identifier of the retryPolicy.
 */
export const retryPolicyName = "retryPolicy";

const errorSanitizer = new Sanitizer();

/**
 * A custom error type for failed retry requests.
 */
export class RetryError extends Error {
  constructor(message: string = "Failed to retry.") {
    super(message);
    this.name = "RetryError";
    this.errors = [];
    Object.setPrototypeOf(this, RestError.prototype);
  }

  public errors: RestError[];
  push(error: RestError) {
    this.errors.push(error);
  }

  /**
   * Logging method for util.inspect in Node
   */
  [custom](): string {
    return (
      `RetryError: Total errors ${this.errors.length}\n` +
      this.errors
        .map((error) => `RestError: ${error.message} \n ${errorSanitizer.sanitize(error)}`)
        .join("\n")
    );
  }
}

export interface RetryStrategyState {
  // Retry count
  retryCount: number;
  // Retry error
  retryError: RetryError;
  // Response from the last request
  response?: PipelineResponse;
  // Error from the last request
  responseError?: RestError;
  // Retry after the given number of milliseconds.
  retryAfterInMs?: number;
  // Throw this RestError instead of retrying
  throwError?: RestError;
  // Retry with this new URL
  redirectTo?: string;
}

export interface RetryStrategy<TState = RetryStrategyState> {
  name: string;
  logger?: AzureLogger;
  updateRetryState(state: TState): TState;
}

/**
 * retryPolicy is a generic policy to enable retrying requests when certain conditions are met
 */
export function retryPolicy(...strategies: RetryStrategy[]): PipelinePolicy {
  return {
    name: retryPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      let response: PipelineResponse | undefined;
      let responseError: RestError | undefined;
      const retryError = new RetryError();

      const strategyState: RetryStrategyState[] = Array(strategies.length);
      retryRequest: while (true) {
        try {
          retryPolicyLogger.info("Attempting to send request", request.requestId);
          response = await next(request);
          retryPolicyLogger.info("Received a response from request", request.requestId);
        } catch (e) {
          retryPolicyLogger.info("Received an error from request", request.requestId);
          responseError = e as RestError;
          retryError.push(responseError);
          response = responseError.response;
        }

        retryPolicyLogger.info(`Processing ${strategies.length} retry strategies.`);

        for (const [i, strategy] of strategies.entries()) {
          retryPolicyLogger.info(`Processing retry strategy ${strategy.name}.`);
          let state: RetryStrategyState = strategyState[i];
          strategyState[i] = {
            ...state,
            retryError,
            retryCount: (state.retryCount ?? 0) + 1,
            response,
            responseError
          };
          state = strategy.updateRetryState(state);
          strategyState[i] = state;
          if (state.throwError) {
            retryPolicyLogger.error(
              `Retry strategy ${strategy.name} throws error:`,
              state.throwError
            );
            retryError.push(state.throwError);
            throw retryError;
          } else if (state.retryAfterInMs) {
            retryPolicyLogger.info(
              `Retry strategy ${strategy.name} retries after ${state.retryAfterInMs}`
            );
            await delay(state.retryAfterInMs);
            continue retryRequest;
          } else if (state.redirectTo) {
            retryPolicyLogger.info(
              `Retry strategy ${strategy.name} redirects to ${state.redirectTo}`
            );
            request.url = state.redirectTo;
            continue retryRequest;
          }
        }
        retryPolicyLogger.info(`No retry strategy left. Returning the last received response.`);
        if (response) {
          return response;
        }
      }
    }
  };
}

const DEFAULT_MAX_RETRIES = 3;

export const defaultMaxRetriesStrategy: RetryStrategy = {
  name: `Max retries to ${DEFAULT_MAX_RETRIES}`,
  updateRetryState(state) {
    const { retryCount, response, responseError } = state;
    if (retryCount >= DEFAULT_MAX_RETRIES) {
      state.throwError = new RestError(`Exceeded number of retries: ${DEFAULT_MAX_RETRIES}`, {
        request: response?.request,
        response,
        code: responseError?.code,
        statusCode: response?.status
      });
    }
    return state;
  }
};

/**
 * defaultRetryPolicy is a policy that adds a default retry strategy, but also allows specifying custom retry strategies on top
 */
export function defaultRetryPolicy(...strategies: RetryStrategy[]): PipelinePolicy {
  return retryPolicy(defaultMaxRetriesStrategy, ...strategies);
}
