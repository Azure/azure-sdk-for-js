// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { isReadRequest, OperationType, ResourceType } from "../common";
import { ConnectionPolicy } from "../documents";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { ErrorResponse } from "../request";
import { RetryContext } from "./RetryContext";
import { RetryPolicy } from "./RetryPolicy";

/**
 * This class implements the retry policy for session consistent reads.
 * @hidden
 */
export class SessionRetryPolicy implements RetryPolicy {
  /** Current retry attempt count. */
  public currentRetryAttemptCount = 0;
  /** Retry interval in milliseconds. */
  public retryAfterInMs = 0;

  /**
   * @constructor SessionReadRetryPolicy
   * @param {object} globalEndpointManager                           - The GlobalEndpointManager instance.
   * @property {object} request                                      - The Http request information
   */
  constructor(
    private globalEndpointManager: GlobalEndpointManager,
    private resourceType: ResourceType,
    private operationType: OperationType,
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

    if (!this.connectionPolicy.enableEndpointDiscovery) {
      return false;
    }

    if (
      this.globalEndpointManager.canUseMultipleWriteLocations(this.resourceType, this.operationType)
    ) {
      // If we can write to multiple locations, we should against every write endpoint until we succeed
      const endpoints = isReadRequest(this.operationType)
        ? await this.globalEndpointManager.getReadEndpoints()
        : await this.globalEndpointManager.getWriteEndpoints();
      if (this.currentRetryAttemptCount > endpoints.length) {
        return false;
      } else {
        retryContext.retryCount = ++this.currentRetryAttemptCount - 1;
        retryContext.retryRequestOnPreferredLocations = this.currentRetryAttemptCount > 1;
        retryContext.clearSessionTokenNotAvailable =
          this.currentRetryAttemptCount === endpoints.length;
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
