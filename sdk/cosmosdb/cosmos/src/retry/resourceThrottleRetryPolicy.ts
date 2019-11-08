// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ErrorResponse } from "../request";

/**
 * This class implements the resource throttle retry policy for requests.
 * @hidden
 */
export class ResourceThrottleRetryPolicy {
  /** Current retry attempt count. */
  public currentRetryAttemptCount: number = 0;
  /** Cummulative wait time in milliseconds for a request while the retries are happening. */
  public cummulativeWaitTimeinMs: number = 0;
  /** Max wait time in milliseconds to wait for a request while the retries are happening. */
  public retryAfterInMs: number = 0;

  /** Max number of retries to be performed for a request. */
  private timeoutInMs: number;
  /**
   * @constructor ResourceThrottleRetryPolicy
   * @param {int} maxTries - Max number of retries to be performed for a request.
   * @param {int} fixedRetryIntervalInMs   - Fixed retry interval in milliseconds to wait between each \
   * retry ignoring the retryAfter returned as part of the response.
   * @param {int} timeoutInSeconds               - Max wait time in seconds to wait for a request while the \
   * retries are happening.
   */
  constructor(
    private maxTries: number = 9,
    private fixedRetryIntervalInMs: number = 0,
    timeoutInSeconds: number = 30
  ) {
    this.timeoutInMs = timeoutInSeconds * 1000;
    this.currentRetryAttemptCount = 0;
    this.cummulativeWaitTimeinMs = 0;
  }
  /**
   * Determines whether the request should be retried or not.
   * @param {object} err - Error returned by the request.
   */
  public async shouldRetry(err: ErrorResponse): Promise<boolean> {
    // TODO: any custom error object
    if (err) {
      if (this.currentRetryAttemptCount < this.maxTries) {
        this.currentRetryAttemptCount++;
        this.retryAfterInMs = 0;

        if (this.fixedRetryIntervalInMs) {
          this.retryAfterInMs = this.fixedRetryIntervalInMs;
        } else if (err.retryAfterInMs) {
          this.retryAfterInMs = err.retryAfterInMs;
        }

        if (this.cummulativeWaitTimeinMs < this.timeoutInMs) {
          this.cummulativeWaitTimeinMs += this.retryAfterInMs;
          return true;
        }
      }
    }
    return false;
  }
}
