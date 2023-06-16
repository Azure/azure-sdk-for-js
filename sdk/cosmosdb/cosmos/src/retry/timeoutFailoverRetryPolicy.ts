import { RetryPolicy } from "./RetryPolicy";
import { StatusCodes } from "../common/statusCodes";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { HTTPMethod, isReadRequest } from "../common";
import { ErrorResponse } from "../request";
import { Constants, OperationType, ResourceType } from "../common/constants";
import { RetryContext } from "./RetryContext";
import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { TimeoutErrorCode } from "../request/TimeoutError";

/**
 * This class TimeoutFailoverRetryPolicy handles retries for read operations
 * (including data plane,metadata, and query plan) in case of request timeouts
 * (TimeoutError) or service unavailability (503 status code) by performing failover
 * and retrying on other regions.
 * @hidden
 */
export class TimeoutFailoverRetryPolicy implements RetryPolicy {
  private maxRetryAttemptCount = 120;
  private maxServiceUnavailableRetryCount = 1;
  public retryAfterInMs = 0;
  public failoverRetryCount = 0;
  public request: any;
  public locationEndpoint: any;

  constructor(
    private globalEndpointManager: GlobalEndpointManager,
    private headers: CosmosHeaders,
    private methodType: HTTPMethod,
    private resourceType: ResourceType,
    private operationType: OperationType,
    private enableEndPointDiscovery: boolean
  ) {}

  private isValidRequestForTimeoutError(): boolean {
    const isQuery = Constants.HttpHeaders.IsQuery in this.headers;
    const isQueryPlan = Constants.HttpHeaders.IsQueryPlan in this.headers;
    if (this.methodType === HTTPMethod.get || isQuery || isQueryPlan) {
      return true;
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
    if (err.statusCode === TimeoutErrorCode && !this.isValidRequestForTimeoutError()) {
      return false;
    }
    if (!this.enableEndPointDiscovery) {
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
      this.resourceType,
      this.operationType
    );
    const readRequest = isReadRequest(this.operationType);

    if (!canUseMultipleWriteLocations && !readRequest) {
      return false;
    }
    this.failoverRetryCount++;
    retryContext.retryLocationIndex = await this.findEndpointIndex(this.failoverRetryCount);
    return true;
  }

  private async findEndpointIndex(failoverRetryCount: number): Promise<number> {
    const preferredLocationsCount = this.globalEndpointManager.preferredLocationsCount;
    let readRequest = isReadRequest(this.operationType);
    let endpointIndex = 0;
    if (preferredLocationsCount !== 0) {
      endpointIndex = failoverRetryCount % preferredLocationsCount;
    } else {
      if (readRequest) {
        const getReadEndpoints = await this.globalEndpointManager.getReadEndpoints();
        if (getReadEndpoints && getReadEndpoints.length > 0) {
          endpointIndex = failoverRetryCount % getReadEndpoints.length;
        }
      } else {
        const getWriteEndpoints = await this.globalEndpointManager.getWriteEndpoints();
        if (getWriteEndpoints && getWriteEndpoints.length > 0) {
          endpointIndex = failoverRetryCount % getWriteEndpoints.length;
        }
      }
    }
    return endpointIndex;
  }
}
