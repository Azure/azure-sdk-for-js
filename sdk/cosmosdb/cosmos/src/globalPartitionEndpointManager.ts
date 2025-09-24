// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { OperationType, ResourceType, isReadRequest } from "./common/index.js";
import {
  Constants,
  DiagnosticNodeInternal,
  type CosmosClientOptions,
  type GlobalEndpointManager,
  type RequestContext,
} from "./index.js";
import { PartitionKeyRangeFailoverInfo } from "./PartitionKeyRangeFailoverInfo.js";
import { normalizeEndpoint } from "./utils/checkURL.js";
import { startBackgroundTask } from "./utils/time.js";
import { assertNotUndefined } from "./utils/typeChecks.js";

/**
 * @hidden
 * This class is used to failover single partitions to different regions.
 */
export class GlobalPartitionEndpointManager {
  private readonly partitionKeyRangeToLocationForWrite: Map<string, PartitionKeyRangeFailoverInfo>;
  private readonly partitionKeyRangeToLocationForReadAndWrite: Map<
    string,
    PartitionKeyRangeFailoverInfo
  >;
  private preferredLocations: string[];
  public preferredLocationsCount: number;
  private circuitBreakerFailbackBackgroundRefresher: NodeJS.Timeout;

  /**
   * @internal
   */
  constructor(
    options: CosmosClientOptions,
    private globalEndpointManager: GlobalEndpointManager,
  ) {
    this.partitionKeyRangeToLocationForWrite = new Map<string, PartitionKeyRangeFailoverInfo>();
    this.partitionKeyRangeToLocationForReadAndWrite = new Map<
      string,
      PartitionKeyRangeFailoverInfo
    >();
    this.preferredLocations = options.connectionPolicy.preferredLocations;
    this.preferredLocationsCount = this.preferredLocations ? this.preferredLocations.length : 0;
    if (
      this.globalEndpointManager.enablePartitionLevelCircuitBreaker ||
      this.globalEndpointManager.enablePartitionLevelFailover
    ) {
      this.initiateCircuitBreakerFailbackLoop();
    }
  }

  /**
   * Checks eligibility of the request for partition failover and
   * tries to mark the endpoint unavailable for the partition key range. Future
   * requests will be routed to the next location if available.
   */
  public async tryPartitionLevelFailover(
    requestContext: RequestContext,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<boolean> {
    if (!(await this.isRequestEligibleForPartitionFailover(requestContext, true))) {
      return false;
    }

    const isRequestEligibleForPerPartitionAutomaticFailover =
      this.isRequestEligibleForPerPartitionAutomaticFailover(requestContext);
    const isRequestEligibleForPartitionLevelCircuitBreaker =
      this.isRequestEligibleForPartitionLevelCircuitBreaker(requestContext);

    if (
      isRequestEligibleForPerPartitionAutomaticFailover ||
      (isRequestEligibleForPartitionLevelCircuitBreaker &&
        (await this.incrementFailureCounterAndCheckFailover(
          requestContext,
          isRequestEligibleForPerPartitionAutomaticFailover,
          isRequestEligibleForPartitionLevelCircuitBreaker,
        )))
    ) {
      return this.tryMarkEndpointUnavailableForPartitionKeyRange(
        requestContext,
        diagnosticNode,
        isRequestEligibleForPerPartitionAutomaticFailover,
        isRequestEligibleForPartitionLevelCircuitBreaker,
      );
    }
    return false;
  }

  /**
   * Updates the DocumentServiceRequest routing location to point
   * new a location based if a partition level failover occurred.
   */
  public async tryAddPartitionLevelLocationOverride(
    requestContext: RequestContext,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<RequestContext> {
    if (!(await this.isRequestEligibleForPartitionFailover(requestContext, false))) {
      return requestContext;
    }

    const partitionKeyRangeId = requestContext.partitionKeyRangeId;

    if (this.isRequestEligibleForPerPartitionAutomaticFailover(requestContext)) {
      if (this.partitionKeyRangeToLocationForWrite.has(partitionKeyRangeId)) {
        const partitionFailOver = this.partitionKeyRangeToLocationForWrite.get(partitionKeyRangeId);
        requestContext.endpoint = partitionFailOver.getCurrentEndPoint();
        diagnosticNode.recordEndpointResolution(requestContext.endpoint);
        return requestContext;
      }
    } else if (this.isRequestEligibleForPartitionLevelCircuitBreaker(requestContext)) {
      if (this.partitionKeyRangeToLocationForReadAndWrite.has(partitionKeyRangeId)) {
        const partitionFailOver =
          this.partitionKeyRangeToLocationForReadAndWrite.get(partitionKeyRangeId);

        const canCircuitBreakerTriggerPartitionFailOver =
          await partitionFailOver.canCircuitBreakerTriggerPartitionFailOver(
            isReadRequest(requestContext.operationType),
          );
        if (canCircuitBreakerTriggerPartitionFailOver) {
          requestContext.endpoint = partitionFailOver.getCurrentEndPoint();
          diagnosticNode.recordEndpointResolution(requestContext.endpoint);
          return requestContext;
        }
      }
    }
    return requestContext;
  }

  /**
   * This method clears the background refresher for circuit breaker failback
   * and stops the periodic checks for unhealthy endpoints.
   */
  public dispose(): void {
    if (this.circuitBreakerFailbackBackgroundRefresher) {
      clearTimeout(this.circuitBreakerFailbackBackgroundRefresher);
    }
  }

  private async tryMarkEndpointUnavailableForPartitionKeyRange(
    requestContext: RequestContext,
    diagnosticNode: DiagnosticNodeInternal,
    isRequestEligibleForPerPartitionAutomaticFailover: boolean,
    isRequestEligibleForPartitionLevelCircuitBreaker: boolean,
  ): Promise<boolean> {
    const partitionKeyRangeId = requestContext.partitionKeyRangeId;
    const failedEndPoint = requestContext.endpoint;

    const readLocations = await this.globalEndpointManager.getReadLocations();
    const readEndPoints: string[] = [];

    if (isRequestEligibleForPerPartitionAutomaticFailover) {
      // For any single master write accounts, the next locations to fail over will be the read regions configured at the account level.
      for (const location of readLocations) {
        readEndPoints.push(location.databaseAccountEndpoint);
      }
      return this.tryAddOrUpdatePartitionFailoverInfoAndMoveToNextLocation(
        partitionKeyRangeId,
        failedEndPoint,
        readEndPoints,
        this.partitionKeyRangeToLocationForWrite,
        diagnosticNode,
      );
    } else if (isRequestEligibleForPartitionLevelCircuitBreaker) {
      // For the read requests or multi-master write requests, the next locations to fail over will be the preferred locations
      // configured at the account level plus any other read locations that are not already in the preferred locations.
      if (this.preferredLocations && this.preferredLocations.length > 0) {
        for (const preferredLocation of this.preferredLocations) {
          const location = readLocations.find(
            (loc) => normalizeEndpoint(loc.name) === normalizeEndpoint(preferredLocation),
          );
          if (location) {
            readEndPoints.push(location.databaseAccountEndpoint);
          }
        }

        // Add the rest of the locations not already added
        for (const location of readLocations) {
          if (!readEndPoints.includes(location.databaseAccountEndpoint)) {
            readEndPoints.push(location.databaseAccountEndpoint);
          }
        }
      } else {
        for (const location of readLocations) {
          readEndPoints.push(location.databaseAccountEndpoint);
        }
      }
      return this.tryAddOrUpdatePartitionFailoverInfoAndMoveToNextLocation(
        partitionKeyRangeId,
        failedEndPoint,
        readEndPoints,
        this.partitionKeyRangeToLocationForReadAndWrite,
        diagnosticNode,
      );
    }
    return false;
  }

  /**
   * Increments the failure counter for the specified partition and checks if the partition can fail over.
   * This method is used to determine if a partition should be failed over based on the number of request failures.
   */
  private async incrementFailureCounterAndCheckFailover(
    requestContext: RequestContext,
    isRequestEligibleForPerPartitionAutomaticFailover: boolean,
    isRequestEligibleForPartitionLevelCircuitBreaker: boolean,
  ): Promise<boolean> {
    const partitionKeyRangeId = requestContext.partitionKeyRangeId;
    const failedEndPoint = requestContext.endpoint;
    let partitionKeyRangeFailoverInfo: PartitionKeyRangeFailoverInfo;

    if (isRequestEligibleForPerPartitionAutomaticFailover) {
      if (!this.partitionKeyRangeToLocationForWrite.has(partitionKeyRangeId)) {
        // If the partition key range is not already in the map, add it
        const failoverInfo = new PartitionKeyRangeFailoverInfo(failedEndPoint);
        this.partitionKeyRangeToLocationForWrite.set(partitionKeyRangeId, failoverInfo);
      }
      partitionKeyRangeFailoverInfo =
        this.partitionKeyRangeToLocationForWrite.get(partitionKeyRangeId);
    } else if (isRequestEligibleForPartitionLevelCircuitBreaker) {
      if (!this.partitionKeyRangeToLocationForReadAndWrite.has(partitionKeyRangeId)) {
        // If the partition key range is not already in the map, add it
        const failoverInfo = new PartitionKeyRangeFailoverInfo(failedEndPoint);
        this.partitionKeyRangeToLocationForReadAndWrite.set(partitionKeyRangeId, failoverInfo);
      }
      partitionKeyRangeFailoverInfo =
        this.partitionKeyRangeToLocationForReadAndWrite.get(partitionKeyRangeId);
    } else {
      return false;
    }

    assertNotUndefined(
      partitionKeyRangeFailoverInfo,
      "partitionKeyRangeFailoverInfo should be set if failover flags are true.",
    );

    const currentTimeInMilliseconds = Date.now();
    await partitionKeyRangeFailoverInfo.incrementRequestFailureCounts(
      isReadRequest(requestContext.operationType),
      currentTimeInMilliseconds,
    );

    return partitionKeyRangeFailoverInfo.canCircuitBreakerTriggerPartitionFailOver(
      isReadRequest(requestContext.operationType),
    );
  }

  /** Validates if the given request is eligible for partition failover. */
  private async isRequestEligibleForPartitionFailover(
    requestContext: RequestContext,
    shouldValidateFailedLocation: boolean,
  ): Promise<boolean> {
    if (
      !requestContext ||
      !requestContext.operationType ||
      !requestContext.resourceType ||
      !requestContext.partitionKeyRangeId
    ) {
      return false;
    }

    const canUsePartitionLevelFailoverLocations = await this.canUsePartitionLevelFailoverLocations(
      requestContext.operationType,
      requestContext.resourceType,
    );
    if (!canUsePartitionLevelFailoverLocations) {
      return false;
    }

    if (shouldValidateFailedLocation && !requestContext.endpoint) {
      return false;
    }
    return true;
  }

  /** Determines if partition level failover locations can be used for the given request. */
  private async canUsePartitionLevelFailoverLocations(
    operationType?: OperationType,
    resourceType?: ResourceType,
  ): Promise<boolean> {
    const readEndPoints = await this.globalEndpointManager.getReadEndpoints();
    if (readEndPoints.length <= 1) {
      return false;
    }
    if (
      resourceType === ResourceType.item ||
      (resourceType === ResourceType.sproc && operationType === OperationType.Execute)
    ) {
      // Right now, for single-master only reads are supported for circuit breaker, and writes are supported for automatic.
      // failover. For multi master, both reads and writes are supported. Hence return true for both the cases.
      return true;
    }
    return false;
  }

  /**
   * Determines if a request is eligible for per-partition automatic failover.
   * A request is eligible if it is a write request, partition level failover is enabled,
   * and the global endpoint manager cannot use multiple write locations for the request.
   */
  private isRequestEligibleForPerPartitionAutomaticFailover(
    requestContext: RequestContext,
  ): boolean {
    return (
      this.globalEndpointManager.enablePartitionLevelFailover &&
      !isReadRequest(requestContext.operationType) &&
      !this.globalEndpointManager.canUseMultipleWriteLocations(
        requestContext.resourceType,
        requestContext.operationType,
      )
    );
  }

  /**
   * Determines if a request is eligible for partition-level circuit breaker.
   * This method checks if partition-level circuit breaker is enabled, and if the request is a read-only request or
   * the global endpoint manager can use multiple write locations for the request.
   */
  private isRequestEligibleForPartitionLevelCircuitBreaker(
    requestContext: RequestContext,
  ): boolean {
    const enablePartitionLevelCircuitBreaker =
      this.globalEndpointManager.enablePartitionLevelCircuitBreaker ||
      this.globalEndpointManager.enablePartitionLevelFailover;
    if (!enablePartitionLevelCircuitBreaker) {
      return false;
    }
    if (isReadRequest(requestContext.operationType)) {
      return true;
    }
    return this.globalEndpointManager.canUseMultipleWriteLocations(
      requestContext.resourceType,
      requestContext.operationType,
    );
  }

  /**
   * Attempts to add or update the partition failover information and move to the next available location.
   * This method checks if the current location for the partition key range has failed and updates the failover
   * information to route the request to the next available location. If all locations have been tried, it removes
   * the failover information for the partition key range. Return True if the failover information was successfully
   * updated and the request was routed to a new location, otherwise false.
   */
  private async tryAddOrUpdatePartitionFailoverInfoAndMoveToNextLocation(
    partitionKeyRangeId: string,
    failedEndPoint: string,
    nextEndPoints: readonly string[],
    partitionKeyRangeToLocation: Map<string, PartitionKeyRangeFailoverInfo>,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<boolean> {
    if (!partitionKeyRangeToLocation.has(partitionKeyRangeId)) {
      // If the partition key range is not already in the map, add it
      const failoverInfo = new PartitionKeyRangeFailoverInfo(failedEndPoint);
      partitionKeyRangeToLocation.set(partitionKeyRangeId, failoverInfo);
    }
    const partitionFailOver = partitionKeyRangeToLocation.get(partitionKeyRangeId);

    // Will return true if it was able to update to a new region
    if (
      await partitionFailOver.tryMoveNextLocation(
        nextEndPoints,
        failedEndPoint,
        diagnosticNode,
        partitionKeyRangeId,
      )
    ) {
      return true;
    }
    // All the locations have been tried. Remove the override information
    partitionKeyRangeToLocation.delete(partitionKeyRangeId);
    return false;
  }

  /**
   * Initiates a background loop that periodically checks for unhealthy endpoints
   * and attempts to open connections to them. If a connection is successfully
   * established, it initiates a failback to the original location for the partition key range.
   * This is useful for scenarios where a partition key range has been marked as unavailable
   * due to a circuit breaker, and we want to periodically check if the original location
   * has become healthy again.
   * The loop runs at a defined interval specified by Constants.StalePartitionUnavailabilityRefreshIntervalInMs.
   */
  private initiateCircuitBreakerFailbackLoop(): void {
    this.circuitBreakerFailbackBackgroundRefresher = startBackgroundTask(async () => {
      try {
        await this.openConnectionToUnhealthyEndpointsWithFailback();
      } catch (err) {
        console.error("Failed to open connection to unhealthy endpoints: ", err);
      }
    }, Constants.StalePartitionUnavailabilityRefreshIntervalInMs);
  }

  /**
   * Attempts to open connections to unhealthy endpoints and initiates failback if the connections are successful.
   * This method checks the partition key ranges that have failed locations and tries to re-establish connections
   * to those locations. If a connection is successfully re-established, it initiates a failback to the original
   * location for the partition key range.
   */
  private async openConnectionToUnhealthyEndpointsWithFailback(): Promise<void> {
    // If partition level circuit breaker or failover is not enabled, dispose the timer.
    const enablePartitionLevelCircuitBreaker =
      this.globalEndpointManager.enablePartitionLevelCircuitBreaker ||
      this.globalEndpointManager.enablePartitionLevelFailover;
    if (!enablePartitionLevelCircuitBreaker) {
      this.dispose();
      return;
    }

    for (const pkRange of this.partitionKeyRangeToLocationForReadAndWrite.keys()) {
      const partitionFailover = this.partitionKeyRangeToLocationForReadAndWrite.get(pkRange);
      if (!partitionFailover) continue;

      const { firstRequestFailureTime } =
        await partitionFailover.snapshotPartitionFailoverTimestamps();
      const now = new Date();

      if (
        now.getTime() - firstRequestFailureTime >
        Constants.AllowedPartitionUnavailabilityDurationInMs
      ) {
        // Un-deterministically marking the original failed endpoint for the PkRange back to healthy.
        // Initiate Failback to the original failed location.
        this.partitionKeyRangeToLocationForReadAndWrite.delete(pkRange);
      }
    }
  }
}
