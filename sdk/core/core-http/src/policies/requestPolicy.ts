// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "../httpOperationResponse";
import { HttpPipelineLogger } from "../httpPipelineLogger";
import { HttpPipelineLogLevel } from "../httpPipelineLogLevel";
import { WebResourceLike } from "../webResource";

/**
 * Creates a new RequestPolicy per-request that uses the provided nextPolicy.
 */
export type RequestPolicyFactory = {
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike): RequestPolicy;
};

/**
 * The underlying structure of a request policy.
 */
export interface RequestPolicy {
  /**
   * A method that retrieves an {@link HttpOperationResponse} given a {@link WebResourceLike} describing the request to be made.
   * @param httpRequest - {@link WebResourceLike} describing the request to be made.
   */
  sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse>;
}

/**
 * The base class from which all request policies derive.
 */
export abstract class BaseRequestPolicy implements RequestPolicy {
  /**
   * The main method to implement that manipulates a request/response.
   */
  protected constructor(
    /**
     * The next policy in the pipeline. Each policy is responsible for executing the next one if the request is to continue through the pipeline.
     */
    readonly _nextPolicy: RequestPolicy,
    /**
     * The options that can be passed to a given request policy.
     */
    readonly _options: RequestPolicyOptionsLike
  ) {}

  /**
   * Sends a network request based on the given web resource.
   * @param webResource - A {@link WebResourceLike} that describes a HTTP request to be made.
   */
  public abstract sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse>;

  /**
   * Get whether or not a log with the provided log level should be logged.
   * @param logLevel - The log level of the log that will be logged.
   * @returns Whether or not a log with the provided log level should be logged.
   */
  public shouldLog(logLevel: HttpPipelineLogLevel): boolean {
    return this._options.shouldLog(logLevel);
  }

  /**
   * Attempt to log the provided message to the provided logger. If no logger was provided or if
   * the log level does not meat the logger's threshold, then nothing will be logged.
   * @param logLevel - The log level of this log.
   * @param message - The message of this log.
   */
  public log(logLevel: HttpPipelineLogLevel, message: string): void {
    this._options.log(logLevel, message);
  }
}

/**
 * Optional properties that can be used when creating a RequestPolicy.
 */
export interface RequestPolicyOptionsLike {
  /**
   * Get whether or not a log with the provided log level should be logged.
   * @param logLevel - The log level of the log that will be logged.
   * @returns Whether or not a log with the provided log level should be logged.
   */
  shouldLog(logLevel: HttpPipelineLogLevel): boolean;

  /**
   * Attempt to log the provided message to the provided logger. If no logger was provided or if
   * the log level does not meet the logger's threshold, then nothing will be logged.
   * @param logLevel - The log level of this log.
   * @param message - The message of this log.
   */
  log(logLevel: HttpPipelineLogLevel, message: string): void;
}

/**
 * Optional properties that can be used when creating a RequestPolicy.
 */
export class RequestPolicyOptions {
  constructor(private _logger?: HttpPipelineLogger) {}

  /**
   * Get whether or not a log with the provided log level should be logged.
   * @param logLevel - The log level of the log that will be logged.
   * @returns Whether or not a log with the provided log level should be logged.
   */
  public shouldLog(logLevel: HttpPipelineLogLevel): boolean {
    return (
      !!this._logger &&
      logLevel !== HttpPipelineLogLevel.OFF &&
      logLevel <= this._logger.minimumLogLevel
    );
  }

  /**
   * Attempt to log the provided message to the provided logger. If no logger was provided or if
   * the log level does not meet the logger's threshold, then nothing will be logged.
   * @param logLevel - The log level of this log.
   * @param message - The message of this log.
   */
  public log(logLevel: HttpPipelineLogLevel, message: string): void {
    if (this._logger && this.shouldLog(logLevel)) {
      this._logger.log(logLevel, message);
    }
  }
}
