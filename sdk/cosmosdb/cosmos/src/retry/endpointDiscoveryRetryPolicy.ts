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
  public retryAfterInMilliseconds: number;

  /** Max number of retry attempts to perform. */
  private maxRetryAttemptCount: number;
  private static readonly maxRetryAttemptCount = 120; // TODO: Constant?
  private static readonly retryAfterInMilliseconds = 1000;

  /**
   * @constructor EndpointDiscoveryRetryPolicy
   * @param {object} globalEndpointManager The GlobalEndpointManager instance.
   */
  constructor(private globalEndpointManager: GlobalEndpointManager, private operationType: OperationType) {
    this.maxRetryAttemptCount = EndpointDiscoveryRetryPolicy.maxRetryAttemptCount;
    this.currentRetryAttemptCount = 0;
    this.retryAfterInMilliseconds = EndpointDiscoveryRetryPolicy.retryAfterInMilliseconds;
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

    if (this.currentRetryAttemptCount >= this.maxRetryAttemptCount) {
      return false;
    }

    this.currentRetryAttemptCount++;

    if (isReadRequest(this.operationType)) {
      this.globalEndpointManager.markCurrentLocationUnavailableForRead(locationEndpoint);
    } else {
      this.globalEndpointManager.markCurrentLocationUnavailableForWrite(locationEndpoint);
    }

    // Check location index increment
    // TODO: Tracing
    // console.log("Write region was changed, refreshing the regions list from database account
    // and will retry the request.");
    await this.globalEndpointManager.refreshEndpointList();

    retryContext.retryCount = this.currentRetryAttemptCount;
    retryContext.clearSessionTokenNotAvailable = false;
    retryContext.retryRequestOnPreferredLocations = false;

    return true;
  }
}
