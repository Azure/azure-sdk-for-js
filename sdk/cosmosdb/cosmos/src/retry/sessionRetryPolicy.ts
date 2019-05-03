﻿import { Helper } from "../common";
import { ConnectionPolicy } from "../documents";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { ErrorResponse } from "../request/request";
import { RequestContext } from "../request/RequestContext";
import { IRetryPolicy } from "./IRetryPolicy";
import { RetryContext } from "./RetryContext";

/**
 * This class implements the retry policy for session consistent reads.
 * @hidden
 */
export class SessionRetryPolicy implements IRetryPolicy {
  /** Current retry attempt count. */
  public currentRetryAttemptCount = 0;
  /** Retry interval in milliseconds. */
  public retryAfterInMilliseconds = 0;

  /**
   * @constructor SessionReadRetryPolicy
   * @param {object} globalEndpointManager                           - The GlobalEndpointManager instance.
   * @property {object} request                                      - The Http request information
   */
  constructor(
    private globalEndpointManager: GlobalEndpointManager,
    private request: RequestContext,
    private connectionPolicy: ConnectionPolicy
  ) {}

  /**
   * Determines whether the request should be retried or not.
   * @param {object} err - Error returned by the request.
   * @param {function} callback - The callback function which takes bool argument which specifies whether the request\
   * will be retried or not.
   */
  public async shouldRetry(err: ErrorResponse, retryContext?: RetryContext): Promise<boolean> {
    if (!err) {
      return false;
    }

    if (!retryContext) {
      return false;
    }

    if (!this.connectionPolicy.EnableEndpointDiscovery) {
      return false;
    }

    if (this.globalEndpointManager.canUseMultipleWriteLocations(this.request)) {
      // If we can write to multiple locations, we should against every write endpoint until we succeed
      const endpoints = Helper.isReadRequest(this.request)
        ? await this.globalEndpointManager.getReadEndpoints()
        : await this.globalEndpointManager.getWriteEndpoints();
      if (this.currentRetryAttemptCount > endpoints.length) {
        return false;
      } else {
        retryContext.retryCount = ++this.currentRetryAttemptCount - 1;
        retryContext.retryRequestOnPreferredLocations = this.currentRetryAttemptCount > 1;
        retryContext.clearSessionTokenNotAvailable = this.currentRetryAttemptCount === endpoints.length;
        return true;
      }
    } else {
      if (this.currentRetryAttemptCount > 1) {
        return false;
      } else {
        retryContext.retryCount = ++this.currentRetryAttemptCount - 1;
        retryContext.retryRequestOnPreferredLocations = false; // Forces all operations to primary write endpoint
        retryContext.clearSessionTokenNotAvailable = true;
        return true;
      }
    }
  }
}
