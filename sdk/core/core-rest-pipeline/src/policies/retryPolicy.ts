// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { delay } from "../util/helpers";
import { createClientLogger } from "@azure/logger";
import { tryCreateSpan, tryProcessError, tryProcessResponse } from "./tracingPolicy";
import { Span } from "@azure/core-tracing";
import { getUserAgentValue } from "../util/userAgent";
import { RetryStrategy, RetryStrategyState } from "../retryStrategies/retryStrategy";
import { RetryError } from "../retryStrategies/retryError";
import { RestError } from "../restError";

const retryPolicyLogger = createClientLogger("core-rest-pipeline retryPolicy");
const DEFAULT_MAX_RETRIES = 3;

/**
 * The programmatic identifier of the retryPolicy.
 */
const retryPolicyName = "retryPolicy";

/**
 * retryPolicy is a generic policy to enable retrying requests when certain conditions are met
 */
export function retryPolicy(...strategies: RetryStrategy[]): PipelinePolicy {
  return {
    name: retryPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      let response: PipelineResponse | undefined;
      let responseError: RestError | undefined;
      let retryCount = -1;
      const retryError = new RetryError();

      let span: Span | undefined;
      if (request.tracingOptions?.tracingContext) {
        span = tryCreateSpan(request, getUserAgentValue(retryPolicyName));
      }

      const strategyState: RetryStrategyState[] = Array(strategies.length);
      retryRequest: while (true) {
        retryCount += 1;
        response = undefined;
        responseError = undefined;

        try {
          retryPolicyLogger.info(
            `Retry ${retryCount}: Attempting to send request`,
            request.requestId
          );
          response = await next(request);
          retryPolicyLogger.info(
            `Retry ${retryCount}: Received a response from request`,
            request.requestId
          );
          if (span) {
            tryProcessResponse(span, response);
          }
        } catch (e) {
          retryPolicyLogger.info(
            `Retry ${retryCount}: Received an error from request`,
            request.requestId
          );
          responseError = e as RestError;
          retryError.errors.push(responseError);
          response = responseError.response;
          if (span) {
            tryProcessError(span, responseError);
          }
        }

        retryPolicyLogger.info(
          `Retry ${retryCount}: Processing ${strategies.length} retry strategies.`
        );

        for (const [i, strategy] of strategies.entries()) {
          const strategyLogger = strategy.logger || retryPolicyLogger;
          strategyLogger.info(`Retry ${retryCount}: Processing retry strategy ${strategy.name}.`);
          let state: RetryStrategyState = {
            ...strategyState[i],
            retryError,
            retryCount,
            response,
            responseError
          };

          if (state.retryCount >= (state.maxRetries || DEFAULT_MAX_RETRIES)) {
            strategyLogger.info(
              `Maximum retries reached. Returning the last received response, or throwing the last received error.`
            );
            if (response) {
              return response;
            }
            throw responseError;
          }

          if (!strategy.meetsConditions || strategy.meetsConditions(state)) {
            state = strategy.updateRetryState(state);
          } else {
            strategyLogger.error(`Retry ${retryCount}: Does not meet conditions.`);
            delete state.retryAfterInMs;
          }
          strategyState[i] = state;

          if (request.abortSignal?.aborted) {
            strategyLogger.error(`Retry ${retryCount}: Request aborted.`);
            retryError.errors.push(new Error("Aborted"));
            throw retryError;
          }

          if (state.throwError) {
            strategyLogger.error(
              `Retry ${retryCount}: Retry strategy ${strategy.name} throws error:`,
              state.throwError
            );
            retryError.errors.push(state.throwError);
            throw retryError;
          }

          if (state.retryAfterInMs) {
            strategyLogger.info(
              `Retry ${retryCount}: Retry strategy ${strategy.name} retries after ${state.retryAfterInMs}`
            );
            await delay(state.retryAfterInMs);
            continue retryRequest;
          }

          if (state.redirectTo) {
            strategyLogger.info(
              `Retry ${retryCount}: Retry strategy ${strategy.name} redirects to ${state.redirectTo}`
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
