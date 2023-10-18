// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Debugger } from "../logger/logger";
import { PipelineRequest, PipelineResponse, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { logger as coreLogger } from "../log";
import { Sanitizer } from "../util/sanitizer";

/**
 * The programmatic identifier of the logPolicy.
 */
export const logPolicyName = "logPolicy";

/**
 * Options to configure the logPolicy.
 */
export interface LogPolicyOptions {
  /**
   * Header names whose values will be logged when logging is enabled.
   * Defaults include a list of well-known safe headers. Any headers
   * specified in this field will be added to that list.  Any other values will
   * be written to logs as "REDACTED".
   */
  additionalAllowedHeaderNames?: string[];

  /**
   * Query string names whose values will be logged when logging is enabled. By default no
   * query string values are logged.
   */
  additionalAllowedQueryParameters?: string[];

  /**
   * The log function to use for writing pipeline logs.
   * Defaults to core-http's built-in logger.
   * Compatible with the `debug` library.
   */
  logger?: Debugger;
}

/**
 * A policy that logs all requests and responses.
 * @param options - Options to configure logPolicy.
 */
export function logPolicy(options: LogPolicyOptions = {}): PipelinePolicy {
  const logger = options.logger ?? coreLogger.info;
  const sanitizer = new Sanitizer({
    additionalAllowedHeaderNames: options.additionalAllowedHeaderNames,
    additionalAllowedQueryParameters: options.additionalAllowedQueryParameters,
  });
  return {
    name: logPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!logger.enabled) {
        return next(request);
      }

      logger(`Request: ${sanitizer.sanitize(request)}`);

      const response = await next(request);

      logger(`Response status code: ${response.status}`);
      logger(`Headers: ${sanitizer.sanitize(response.headers)}`);

      return response;
    },
  };
}
