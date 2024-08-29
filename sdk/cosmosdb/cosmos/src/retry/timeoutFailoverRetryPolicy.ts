// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { RetryPolicy } from "./RetryPolicy";
import { StatusCodes } from "../common/statusCodes";
import { GlobalEndpointManager } from "../globalEndpointManager";
import { HTTPMethod, isReadRequest } from "../common";
import { Constants, OperationType, ResourceType } from "../common/constants";
import { RetryContext } from "./RetryContext";
import { CosmosHeaders } from "../queryExecutionContext/CosmosHeaders";
import { TimeoutErrorCode } from "../request/TimeoutError";
import { ErrorResponse } from "../request";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";

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
    private enableEndPointDiscovery: boolean,
  ) {}

  /**
   * Checks if a timeout request is valid for the timeout failover retry policy.
   * A valid request should be a data plane, metadata, or query plan request.
   * @returns
   */
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
    diagnosticNode: DiagnosticNodeInternal,
    retryContext?: RetryContext,
    locationEndpoint?: string,
  ): Promise<boolean> {
    if (!err) {
      return false;
    }
    if (!retryContext || !locationEndpoint) {
      return false;
    }
    // Check if the error is a timeout error (TimeoutErrorCode) and if it is not a valid HTTP network timeout request
    if (err.code === TimeoutErrorCode && !this.isValidRequestForTimeoutError()) {
      return false;
    }
    if (!this.enableEndPointDiscovery) {
      return false;
    }
    if (
      err.code === StatusCodes.ServiceUnavailable &&
      this.failoverRetryCount >= this.maxServiceUnavailableRetryCount
    ) {
      return false;
    }
    if (this.failoverRetryCount >= this.maxRetryAttemptCount) {
      return false;
    }
    const canUseMultipleWriteLocations = this.globalEndpointManager.canUseMultipleWriteLocations(
      this.resourceType,
      this.operationType,
    );
    const readRequest = isReadRequest(this.operationType);

    if (!canUseMultipleWriteLocations && !readRequest) {
      // Write requests on single master cannot be retried, no other regions available
      return false;
    }
    this.failoverRetryCount++;
    // Setting the retryLocationIndex to the next available location for retry.
    // The retryLocationIndex is determined based on the failoverRetryCount, starting from zero.
    retryContext.retryLocationServerIndex = await this.findEndpointIndex(this.failoverRetryCount);
    diagnosticNode.addData({ successfulRetryPolicy: "timeout-failover" });
    return true;
  }

  /**
   * Determines index of endpoint to be used for retry based upon failoverRetryCount and avalable locations
   * @param failoverRetryCount - count of failovers
   * @returns
   */
  private async findEndpointIndex(failoverRetryCount: number): Promise<number> {
    // count of preferred locations specified by user
    const preferredLocationsCount = this.globalEndpointManager.preferredLocationsCount;
    const readRequest = isReadRequest(this.operationType);
    let endpointIndex = 0;
    // If preferredLocationsCount is not zero, it indicates that the user has specified preferred locations.
    if (preferredLocationsCount !== 0) {
      // The endpointIndex is set based on the preferred location and the failover retry count.
      endpointIndex = failoverRetryCount % preferredLocationsCount;
    } else {
      // In the absence of preferred locations, the endpoint selection is based on the failover count and the number of available locations.
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
