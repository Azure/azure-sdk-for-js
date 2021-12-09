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
import { RestError } from "../restError";
import { AbortError } from "@azure/abort-controller";

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

      const strategyState: RetryStrategyState[] = Array(strategies.length);
      retryRequest: while (true) {
        retryCount += 1;
        response = undefined;
        responseError = undefined;

        let retrySpan: Span | undefined;
        if (request.tracingOptions?.tracingContext) {
          retrySpan = tryCreateSpan(request, getUserAgentValue(retryPolicyName));
        }

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
          tryProcessResponse(response, retrySpan);
        } catch (e) {
          retryPolicyLogger.info(
            `Retry ${retryCount}: Received an error from request`,
            request.requestId
          );
          responseError = e as RestError;
          if (responseError.name !== "RestError") {
            tryProcessError(responseError, retrySpan);
            throw responseError;
          }
          response = responseError.response;
          tryProcessError(responseError, retrySpan);
        }

        retryPolicyLogger.info(
          `Retry ${retryCount}: Processing ${strategies.length} retry strategies.`
        );

        for (const [i, strategy] of strategies.entries()) {
          const strategyLogger = strategy.logger || retryPolicyLogger;
          strategyLogger.info(`Retry ${retryCount}: Processing retry strategy ${strategy.name}.`);
          let state: RetryStrategyState = {
            ...strategyState[i],
            retryCount,
            response,
            responseError
          };

          let strategySpan: Span | undefined;
          if (request.tracingOptions?.tracingContext) {
            strategySpan = tryCreateSpan(request, getUserAgentValue(strategy.name));
          }

          if (state.retryCount >= (state.maxRetries || DEFAULT_MAX_RETRIES)) {
            strategyLogger.info(
              `Maximum retries reached. Returning the last received response, or throwing the last received error.`
            );
            if (response) {
              tryProcessResponse(response, strategySpan);
              return response;
            }
            tryProcessError(responseError, strategySpan);
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
            const abortError = new AbortError();
            tryProcessError(abortError, strategySpan);
            throw abortError;
          }

          if (state.throwError) {
            strategyLogger.error(
              `Retry ${retryCount}: Retry strategy ${strategy.name} throws error:`,
              state.throwError
            );
            tryProcessError(state.throwError, strategySpan);
            throw state.throwError;
          }

          if (strategySpan) {
            if (response) {
              tryProcessResponse(response, strategySpan);
            } else if (responseError) {
              tryProcessError(responseError, strategySpan);
            } else {
              strategySpan.end();
            }
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
