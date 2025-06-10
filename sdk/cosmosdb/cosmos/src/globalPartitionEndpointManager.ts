// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { HealthStatus, OperationType, ResourceType, isReadRequest } from "./common/index.js";
import {
  Constants,
  type CosmosClientOptions,
  type GlobalEndpointManager,
  type RequestContext,
} from "./index.js";
import { PartitionKeyRangeFailoverInfo } from "./PartitionKeyRangeFailoverInfo.js";
import { normalizeEndpoint } from "./utils/checkURL.js";

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
  private enablePartitionLevelFailover: boolean;
  private enablePartitionLevelCircuitBreaker: boolean;
  private preferredLocations: string[];
  public preferredLocationsCount: number;
  circuitBreakerFailbackBackgroundRefresher: NodeJS.Timeout;

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

    this.enablePartitionLevelFailover = options.connectionPolicy.enablePartitionLevelFailover;
    this.enablePartitionLevelCircuitBreaker =
      options.connectionPolicy.enablePartitionLevelCircuitBreaker ||
      options.connectionPolicy.enablePartitionLevelFailover;

    this.preferredLocations = options.connectionPolicy.preferredLocations;
    this.preferredLocationsCount = this.preferredLocations ? this.preferredLocations.length : 0;
    this.initiateCircuitBreakerFailbackLoop();
  }

  /**
   * Checks eligibility of the request for partition failover and
   * tries to mark the endpoint unavailable for the partition key range. Future
   * requests will be routed to the next location if available.
   */
  public async checkRequestEligibilityAndTryMarkEndpointUnavailableForPartitionKeyRange(
    requestContext: RequestContext,
  ): Promise<boolean> {
    if (!(await this.isRequestEligibleForPartitionFailover(requestContext, true))) {
      return false;
    }
    if (
      this.isRequestEligibleForPerPartitionAutomaticFailover(requestContext) ||
      (this.isRequestEligibleForPartitionLevelCircuitBreaker(requestContext) &&
        (await this.incrementRequestFailureCounterAndCheckIfPartitionCanFailover(requestContext)))
    ) {
      return this.tryMarkEndpointUnavailableForPartitionKeyRange(requestContext);
    }
    return false;
  }

  private async tryMarkEndpointUnavailableForPartitionKeyRange(
    requestContext: RequestContext,
  ): Promise<boolean> {
    const partitionKeyRangeId = requestContext.partitionKeyRangeId;
    const failedEndPoint = requestContext.endpoint;

    const readLocations = await this.globalEndpointManager.getAvailableReadLocations();
    const readEndPoints: string[] = [];

    if (this.isRequestEligibleForPerPartitionAutomaticFailover(requestContext)) {
      // For any single master write accounts, the next locations to fail over will be the read regions configured at the account level.
      for (const location of readLocations) {
        readEndPoints.push(location.databaseAccountEndpoint);
      }
      return this.tryAddOrUpdatePartitionFailoverInfoAndMoveToNextLocation(
        partitionKeyRangeId,
        failedEndPoint,
        readEndPoints,
        this.partitionKeyRangeToLocationForWrite,
      );
    } else if (this.isRequestEligibleForPartitionLevelCircuitBreaker(requestContext)) {
      // For multi master write accounts, since all the regions are treated as write regions, the next locations to fail over
      // will be the preferred read regions that are configured in the application preferred regions in the CosmosClientOptions.
      if (this.preferredLocations && this.preferredLocations.length > 0) {
        for (const preferredLocation of this.preferredLocations) {
          const location = readLocations.find(
            (loc) =>
              loc.unavailable !== true &&
              normalizeEndpoint(loc.name) === normalizeEndpoint(preferredLocation),
          );
          if (location) {
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
  ): Promise<{ overridden: boolean; newLocation?: string }> {
    if (!(await this.isRequestEligibleForPartitionFailover(requestContext, false))) {
      return { overridden: false };
    }

    const partitionKeyRangeId = requestContext.partitionKeyRangeId;

    if (this.isRequestEligibleForPerPartitionAutomaticFailover(requestContext)) {
      if (this.partitionKeyRangeToLocationForWrite.has(partitionKeyRangeId)) {
        const partitionFailOver = this.partitionKeyRangeToLocationForWrite.get(partitionKeyRangeId);
        return {
          overridden: true,
          newLocation: partitionFailOver.currentEndPoint,
        };
      }
    } else if (this.isRequestEligibleForPartitionLevelCircuitBreaker(requestContext)) {
      if (this.partitionKeyRangeToLocationForReadAndWrite.has(partitionKeyRangeId)) {
        const partitionFailOver =
          this.partitionKeyRangeToLocationForReadAndWrite.get(partitionKeyRangeId);

        const canCircuitBreakerTriggerPartitionFailOver =
          await partitionFailOver.CanCircuitBreakerTriggerPartitionFailOver(
            isReadRequest(requestContext.operationType),
          );
        if (canCircuitBreakerTriggerPartitionFailOver) {
          return {
            overridden: true,
            newLocation: partitionFailOver.currentEndPoint,
          };
        }
      }
    }
    return { overridden: false };
  }

  /**
   * Increments the failure counter for the specified partition and checks if the partition can fail over.
   * This method is used to determine if a partition should be failed over based on the number of request failures.
   */
  private async incrementRequestFailureCounterAndCheckIfPartitionCanFailover(
    requestContext: RequestContext,
  ): Promise<boolean> {
    const partitionKeyRangeId = requestContext.partitionKeyRangeId;
    const failedEndPoint = requestContext.endpoint;
    let partitionKeyRangeFailoverInfo: PartitionKeyRangeFailoverInfo;

    if (this.isRequestEligibleForPerPartitionAutomaticFailover(requestContext)) {
      if (!this.partitionKeyRangeToLocationForWrite.has(partitionKeyRangeId)) {
        // If the partition key range is not already in the map, add it
        const failoverInfo = new PartitionKeyRangeFailoverInfo(failedEndPoint);
        this.partitionKeyRangeToLocationForWrite.set(partitionKeyRangeId, failoverInfo);
      }
      partitionKeyRangeFailoverInfo =
        this.partitionKeyRangeToLocationForWrite.get(partitionKeyRangeId);
    } else if (this.isRequestEligibleForPartitionLevelCircuitBreaker(requestContext)) {
      if (!this.partitionKeyRangeToLocationForReadAndWrite.has(partitionKeyRangeId)) {
        // If the partition key range is not already in the map, add it
        const failoverInfo = new PartitionKeyRangeFailoverInfo(failedEndPoint);
        this.partitionKeyRangeToLocationForReadAndWrite.set(partitionKeyRangeId, failoverInfo);
      }
      partitionKeyRangeFailoverInfo =
        this.partitionKeyRangeToLocationForReadAndWrite.get(partitionKeyRangeId);
    }

    if (!partitionKeyRangeFailoverInfo) {
      return false;
    }

    const currentTimeInMilliseconds = Date.now();
    await partitionKeyRangeFailoverInfo.incrementRequestFailureCounts(
      isReadRequest(requestContext.operationType),
      currentTimeInMilliseconds,
    );

    return partitionKeyRangeFailoverInfo.CanCircuitBreakerTriggerPartitionFailOver(
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
      this.enablePartitionLevelFailover &&
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
    if (!this.enablePartitionLevelCircuitBreaker) {
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
  ): Promise<boolean> {
    if (!partitionKeyRangeToLocation.has(partitionKeyRangeId)) {
      // If the partition key range is not already in the map, add it
      const failoverInfo = new PartitionKeyRangeFailoverInfo(failedEndPoint);
      partitionKeyRangeToLocation.set(partitionKeyRangeId, failoverInfo);
    }
    const partitionFailOver = partitionKeyRangeToLocation.get(partitionKeyRangeId);

    // Will return true if it was able to update to a new region
    if (await partitionFailOver.tryMoveNextLocation(nextEndPoints, failedEndPoint)) {
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
    this.circuitBreakerFailbackBackgroundRefresher = setInterval(() => {
      (async () => {
        try {
          await this.tryOpenConnectionToUnhealthyEndpointsAndInitiateFailbackAsync();
        } catch (err) {
          console.error("Failed to open connection to unhealthy endpoints: ", err);
        }
      })();
    }, Constants.StalePartitionUnavailabilityRefreshIntervalInMs);
  }

  /**
   * Attempts to open connections to unhealthy endpoints and initiates failback if the connections are successful.
   * This method checks the partition key ranges that have failed locations and tries to re-establish connections
   * to those locations. If a connection is successfully re-established, it initiates a failback to the original
   * location for the partition key range.
   */
  private async tryOpenConnectionToUnhealthyEndpointsAndInitiateFailbackAsync(): Promise<void> {
    const pkRangeToEndpointMappings = new Map<string, [string, HealthStatus]>();

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
        const originalFailedLocation = partitionFailover.firstFailedEndPoint;
        pkRangeToEndpointMappings.set(pkRange, [originalFailedLocation, HealthStatus.Unhealthy]);
      }
    }

    if (pkRangeToEndpointMappings.size > 0) {
      this.backgroundOpenConnectionTask(pkRangeToEndpointMappings);

      for (const pkRange of pkRangeToEndpointMappings.keys()) {
        const [_, currentHealthState] = pkRangeToEndpointMappings.get(pkRange);
        if (currentHealthState === HealthStatus.Connected) {
          // Initiate Failback to the original failed location.
          this.partitionKeyRangeToLocationForReadAndWrite.delete(pkRange);
        }
      }
    }
  }

  /**
   * Attempts to mark the unhealthy endpoints for a faulty partition to healthy state, un-deterministically. This is done
   * specifically for the gateway mode to get the faulty partition failed back to the original location.
   */
  private backgroundOpenConnectionTask(
    pkRangeToEndpointMappings: Map<string, [string, HealthStatus]>,
  ): Promise<void> {
    for (const [pkRange, [originalFailedLocation, _]] of pkRangeToEndpointMappings) {
      // Un-deterministically marking the original failed endpoint for the PkRange back to healthy.
      pkRangeToEndpointMappings.set(pkRange, [originalFailedLocation, HealthStatus.Connected]);
    }
    return;
  }
}
