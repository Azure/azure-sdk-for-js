import { RetryPolicy } from "./RetryPolicy";
import { StatusCodes } from "../common/statusCodes";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { ConnectionPolicy } from "../documents";
import { HTTPMethod, isReadRequest } from "../common";
import { ErrorResponse, RequestContext } from "../request";
import { Constants } from "../common/constants";
import { RetryContext } from "./RetryContext";

export class TimeoutFailoverRetryPolicy implements RetryPolicy {
  private maxRetryAttemptCount = 120;
  private maxServiceUnavailableRetryCount = 1;
  public retryAfterInMs = 0;
  public failoverRetryCount = 0;
  public request: any;
  public locationEndpoint: any;

  constructor(
    private connectionPolicy: ConnectionPolicy,
    private globalEndpointManager: GlobalEndpointManager,
    private requestContext: RequestContext
  ) {
    this.maxRetryAttemptCount = this.connectionPolicy.retryOptions.maxRetryAttemptCount;
  }

  private needsRetry(): boolean {
    if (this.requestContext) {
      const isQuery = Constants.HttpHeaders.IsQuery in this.requestContext.headers;
      const isQueryPlan = Constants.HttpHeaders.IsQueryPlan in this.requestContext.headers;
      if (this.requestContext.method === HTTPMethod.get || isQuery || isQueryPlan) {
        return true;
      }
    }
    return false;
  }

  public async shouldRetry(
    err: ErrorResponse,
    retryContext?: RetryContext,
    locationEndpoint?: string
  ): Promise<boolean> {
    if (!err) {
      return false;
    }

    if (!retryContext || !locationEndpoint) {
      return false;
    }

    if (!this.needsRetry()) {
      return false;
    }

    if (!this.connectionPolicy.enableEndpointDiscovery) {
      return false;
    }

    if (
      err.statusCode === StatusCodes.ServiceUnavailable &&
      this.failoverRetryCount >= this.maxServiceUnavailableRetryCount
    ) {
      return false;
    }

    if (this.failoverRetryCount >= this.maxRetryAttemptCount) {
      return false;
    }
    const canUseMultipleWriteLocations = this.globalEndpointManager.canUseMultipleWriteLocations(
      this.requestContext.resourceType,
      this.requestContext.operationType
    );
    const readRequest = isReadRequest(this.requestContext.operationType);

    if (!canUseMultipleWriteLocations && !readRequest) {
      return false;
    }
    this.failoverRetryCount++;
    retryContext.retryCount++;

    if (readRequest) {
      this.globalEndpointManager.markCurrentLocationUnavailableForRead(locationEndpoint);
    } else {
      this.globalEndpointManager.markCurrentLocationUnavailableForWrite(
        this.requestContext.endpoint
      );
    }
    return true;
  }
}
