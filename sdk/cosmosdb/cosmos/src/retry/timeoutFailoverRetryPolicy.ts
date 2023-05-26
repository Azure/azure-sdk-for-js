import { RetryPolicy } from "./RetryPolicy";
import { StatusCodes } from "../common/statusCodes";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { ConnectionPolicy } from "../documents";
import { HTTPMethod, isReadRequest, OperationType, ResourceType } from "../common";
import { ErrorResponse, RequestContext } from "../request";
import { RetryContext } from "./RetryContext";
import { Constants } from "../common/constants";

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
      if (this.requestContext.method === HTTPMethod.get || isQuery) {
        return true;
      }
    }
    return false;
  }

  public async shouldRetry(err: ErrorResponse): Promise<boolean> {
    if (!this.needsRetry()) {
      return false;
    }
    if (!err) {
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
    //check on these numbers
    if (this.failoverRetryCount >= this.maxRetryAttemptCount) {
      return false;
    }

    this.failoverRetryCount++;

    if (this.requestContext.endpoint) {
      if (isReadRequest(this.requestContext.operationType)) {
        this.globalEndpointManager.markCurrentLocationUnavailableForRead(
          this.requestContext.endpoint
        );
      } else {
        this.globalEndpointManager.markCurrentLocationUnavailableForWrite(
          this.requestContext.endpoint
        );
      }
    }
    this.requestContext.endpoint = await this.globalEndpointManager.resolveServiceEndpoint(
      this.requestContext.resourceType,
      this.requestContext.operationType,
      this.requestContext
    );

    return true;
  }
}
