// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { delay } from "../util/helpers";
import { createClientLogger } from "@azure/logger";
import { RetryStrategy, RetryInformation, RetryModifiers } from "../retryStrategies/retryStrategy";
import { RestError } from "../restError";
import { AbortError } from "@azure/abort-controller";

const retryPolicyLogger = createClientLogger("core-rest-pipeline retryPolicy");
const DEFAULT_MAX_RETRIES = 3;

/**
 * The programmatic identifier of the retryPolicy.
 */
const retryPolicyName = "retryPolicy";

/**
 * Options to the {@link retryPolicy}
 */
export interface RetryPolicyOptions {
  /**
   * Maximum number of retries. If not specified, it will limit to 3 retries.
   */
  maxRetries: number;
}

/**
 * retryPolicy is a generic policy to enable retrying requests when certain conditions are met
 */
export function retryPolicy(
  strategies: RetryStrategy[],
  options: RetryPolicyOptions = { maxRetries: DEFAULT_MAX_RETRIES }
): PipelinePolicy {
  return {
    name: retryPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      let response: PipelineResponse | undefined;
      let responseError: RestError | undefined;
      let retryCount = -1;

      // eslint-disable-next-line no-constant-condition
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
        } catch (e) {
          retryPolicyLogger.info(
            `Retry ${retryCount}: Received an error from request`,
            request.requestId
          );
          responseError = e as RestError;
          if (responseError.name !== "RestError") {
            throw responseError;
          }
          response = responseError.response;
        }
        if (retryCount >= options.maxRetries ?? DEFAULT_MAX_RETRIES) {
          strategyLogger.info(
            `Maximum retries reached. Returning the last received response, or throwing the last received error.`
          );
          if (response !== undefined) {
            return response;
          }
          throw responseError;
        }
        retryPolicyLogger.info(
          `Retry ${retryCount}: Processing ${strategies.length} retry strategies.`
        );

        strategiesLoop: for (const strategy of strategies) {
          const strategyLogger = strategy.logger || retryPolicyLogger;
          strategyLogger.info(`Retry ${retryCount}: Processing retry strategy ${strategy.name}.`);

          const information: RetryInformation = {
            retryCount,
            response,
            responseError
          };


          let modifiers: RetryModifiers;
          try {
            modifiers = strategy.retry(information);
          } catch (e) {
            const error = e as Error;
            if (error.name === "SkipRetryError") {
              strategyLogger.error(`Retry ${retryCount}: Skipped. ${error.message}`);
              continue strategiesLoop;
            }
            throw e;
          }

          if (request.abortSignal?.aborted) {
            strategyLogger.error(`Retry ${retryCount}: Request aborted.`);
            const abortError = new AbortError();
            throw abortError;
          }

          const { throwError, retryAfterInMs, redirectTo } = modifiers;

          if (throwError) {
            strategyLogger.error(
              `Retry ${retryCount}: Retry strategy ${strategy.name} throws error:`,
              throwError
            );
            throw throwError;
          }

          if (retryAfterInMs) {
            strategyLogger.info(
              `Retry ${retryCount}: Retry strategy ${strategy.name} retries after ${retryAfterInMs}`
            );
            await delay(retryAfterInMs);
            continue retryRequest;
          }

          if (redirectTo) {
            strategyLogger.info(
              `Retry ${retryCount}: Retry strategy ${strategy.name} redirects to ${redirectTo}`
            );
            request.url = redirectTo;
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
