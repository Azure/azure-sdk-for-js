// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { OperationType } from "../common";
import { isReadRequest } from "../common/helper";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { ErrorResponse } from "../request";
import { RetryContext } from "./RetryContext";
import { RetryPolicy } from "./RetryPolicy";

/**
 * This class implements the retry policy for endpoint discovery.
 * @hidden
 */
export class EndpointDiscoveryRetryPolicy implements RetryPolicy {
  /** Current retry attempt count. */
  public currentRetryAttemptCount: number;
  /** Retry interval in milliseconds. */
  public retryAfterInMs: number;

  /** Max number of retry attempts to perform. */
  private maxTries: number;
  private static readonly maxTries = 120; // TODO: Constant?
  private static readonly retryAfterInMs = 1000;

  /**
   * @constructor EndpointDiscoveryRetryPolicy
   * @param {object} globalEndpointManager The GlobalEndpointManager instance.
   */
  constructor(
    private globalEndpointManager: GlobalEndpointManager,
    private operationType: OperationType
  ) {
    this.maxTries = EndpointDiscoveryRetryPolicy.maxTries;
    this.currentRetryAttemptCount = 0;
    this.retryAfterInMs = EndpointDiscoveryRetryPolicy.retryAfterInMs;
  }

  /**
   * Determines whether the request should be retried or not.
   * @param {object} err - Error returned by the request.
   */
  public async shouldRetry(
    err: ErrorResponse,
    retryContext?: RetryContext,
    locationEndpoint?: string
  ): Promise<boolean | [boolean, string]> {
    if (!err) {
      return false;
    }

    if (!retryContext || !locationEndpoint) {
      return false;
    }

    if (!this.globalEndpointManager.enableEndpointDiscovery) {
      return false;
    }

    if (this.currentRetryAttemptCount >= this.maxTries) {
      return false;
    }

    this.currentRetryAttemptCount++;

    if (isReadRequest(this.operationType)) {
      await this.globalEndpointManager.markCurrentLocationUnavailableForRead(locationEndpoint);
    } else {
      await this.globalEndpointManager.markCurrentLocationUnavailableForWrite(locationEndpoint);
    }

    retryContext.retryCount = this.currentRetryAttemptCount;
    retryContext.clearSessionTokenNotAvailable = false;
    retryContext.retryRequestOnPreferredLocations = false;

    return true;
  }
}
