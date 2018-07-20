import { Constants, StatusCodes } from "../common";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { ErrorResponse } from "../request/request";

/**
 * This class implements the retry policy for endpoint discovery.
 * @hidden
 */
export class EndpointDiscoveryRetryPolicy {
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
  constructor(private globalEndpointManager: GlobalEndpointManager) {
    this.maxRetryAttemptCount = EndpointDiscoveryRetryPolicy.maxRetryAttemptCount;
    this.currentRetryAttemptCount = 0;
    this.retryAfterInMilliseconds = EndpointDiscoveryRetryPolicy.retryAfterInMilliseconds;
  }

  /**
   * Determines whether the request should be retried or not.
   * @param {object} err - Error returned by the request.
   */
  public async shouldRetry(err: ErrorResponse): Promise<boolean> {
    if (err) {
      if (
        this.currentRetryAttemptCount < this.maxRetryAttemptCount &&
        this.globalEndpointManager.enableEndpointDiscovery
      ) {
        this.currentRetryAttemptCount++;
        // TODO: Tracing
        // console.log("Write region was changed, refreshing the regions list from database account
        // and will retry the request.");
        await this.globalEndpointManager.refreshEndpointList();
        return true;
      }
    }
    return false;
  }
}
