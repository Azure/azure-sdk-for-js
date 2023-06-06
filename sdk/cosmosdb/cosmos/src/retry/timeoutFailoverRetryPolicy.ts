import { RetryPolicy } from "./RetryPolicy";
import { StatusCodes } from "../common/statusCodes";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { HTTPMethod, isReadRequest } from "../common";
import { ErrorResponse } from "../request";
import { Constants, ResourceType } from "../common/constants";
import { RetryContext } from "./RetryContext";
import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { OperationType, TimeoutError } from "@azure/cosmos";
import { TimeoutErrorCode } from "../request/TimeoutError";

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
    //add check on retry
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
    retryContext.retryCount++;
    retryContext.retryLocationIndex = this.failoverRetryCount;
    return true;
  }
}
