// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { HealthStatus, OperationType, ResourceType, isReadRequest } from "./common/index.js";
import {
  Constants,
  ErrorResponse,
  type CosmosClientOptions,
  type GlobalEndpointManager,
  type RequestContext,
} from "./index.js";
import semaphore from "semaphore";
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
  // A boolean flag indicating if the background connection initialization recursive task is active.
  private isBackgroundConnectionInitActive: boolean = false;
  private backgroundConnectionSemaphore: semaphore.Semaphore;

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
    this.backgroundConnectionSemaphore = semaphore(1);
    this.initializeAndStartCircuitBreakerFailbackBackgroundRefresh();
  }

  /**
   * Marks the current location unavailable for write. Future
   * requests will be routed to the next location if available.
   */
  public async tryMarkEndpointUnavailableForPartitionKeyRange(
    requestContext: RequestContext,
  ): Promise<boolean> {
    if (!(await this.isRequestEligibleForPartitionFailover(requestContext, true))) {
      return false;
    }
    if (
      this.isRequestEligibleForPerPartitionAutomaticFailover(requestContext) ||
      (this.IsRequestEligibleForPartitionLevelCircuitBreaker(requestContext) &&
        (await this.incrementRequestFailureCounterAndCheckIfPartitionCanFailover(requestContext)))
    ) {
      return this.tryMarkEndpointUnavailableForPKRange(requestContext);
    }
    return false;
  }

  private async tryMarkEndpointUnavailableForPKRange(
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
      return this.TryAddOrUpdatePartitionFailoverInfoAndMoveToNextLocation(
        partitionKeyRangeId,
        failedEndPoint,
        readEndPoints,
        this.partitionKeyRangeToLocationForWrite,
      );
    } else if (this.IsRequestEligibleForPartitionLevelCircuitBreaker(requestContext)) {
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
      return this.TryAddOrUpdatePartitionFailoverInfoAndMoveToNextLocation(
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
  ): Promise<boolean | [boolean, string]> {
    if (!(await this.isRequestEligibleForPartitionFailover(requestContext, false))) {
      return false;
    }

    const partitionKeyRangeId = requestContext.partitionKeyRangeId;

    if (this.isRequestEligibleForPerPartitionAutomaticFailover(requestContext)) {
      if (this.partitionKeyRangeToLocationForWrite.has(partitionKeyRangeId)) {
        const partitionFailOver = this.partitionKeyRangeToLocationForWrite.get(partitionKeyRangeId);
        return [true, partitionFailOver.currentEndPoint];
      }
    } else if (this.IsRequestEligibleForPartitionLevelCircuitBreaker(requestContext)) {
      if (this.partitionKeyRangeToLocationForReadAndWrite.has(partitionKeyRangeId)) {
        const partitionFailOver =
          this.partitionKeyRangeToLocationForReadAndWrite.get(partitionKeyRangeId);

        const canCircuitBreakerTriggerPartitionFailOver =
          await partitionFailOver.CanCircuitBreakerTriggerPartitionFailOver(
            isReadRequest(requestContext.operationType),
          );
        if (canCircuitBreakerTriggerPartitionFailOver) {
          return [true, partitionFailOver.currentEndPoint];
        }
      }
    }
    return false;
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
    } else if (this.IsRequestEligibleForPartitionLevelCircuitBreaker(requestContext)) {
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

    const currentTime = Date.now();
    await partitionKeyRangeFailoverInfo.incrementRequestFailureCounts(
      isReadRequest(requestContext.operationType),
      currentTime,
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

    const canUsePartitionLevelFailoverLocations = await this.CanUsePartitionLevelFailoverLocations(
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
  private async CanUsePartitionLevelFailoverLocations(
    operationType?: OperationType,
    resourceType?: ResourceType,
  ): Promise<boolean> {
    // TODO: check for this check
    if (this.preferredLocationsCount <= 0) {
      return false;
    }
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
  private IsRequestEligibleForPartitionLevelCircuitBreaker(
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
  private async TryAddOrUpdatePartitionFailoverInfoAndMoveToNextLocation(
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
    if (await partitionFailOver.TryMoveNextLocation(nextEndPoints, failedEndPoint)) {
      return true;
    }
    // All the locations have been tried. Remove the override information
    partitionKeyRangeToLocation.delete(partitionKeyRangeId);
    return false;
  }
  // todoujjwal : take help from nackgorund refresh task
  /**  Initialize and start the background connection periodic refresh task. */
  private async initializeAndStartCircuitBreakerFailbackBackgroundRefresh() {
    if (this.isBackgroundConnectionInitActive) {
      return;
    }
    return new Promise<void>((resolve, reject) => {
      this.backgroundConnectionSemaphore.take(async () => {
        try {
          if (this.isBackgroundConnectionInitActive) {
            return;
          }
          this.isBackgroundConnectionInitActive = true;
          // Proceed with the task
          await this.initiateCircuitBreakerFailbackLoop();
          resolve();
        } catch (error) {
          this.isBackgroundConnectionInitActive = false;
          reject(error);
        } finally {
          // Release the semaphore lock
          this.backgroundConnectionSemaphore.leave();
        }
      });
    });
  }

  /**
   * This method that will run a continious loop with a delay of one minute to refresh
   *  the connection to the failed backend replicas.
   */
  private async initiateCircuitBreakerFailbackLoop(): Promise<void> {
    while (true) {
      try {
        await this.delay(Constants.StalePartitionUnavailabilityRefreshIntervalInMs);
        await this.tryOpenConnectionToUnhealthyEndpointsAndInitiateFailbackAsync();
      } catch (err) {
        throw new ErrorResponse(err.message);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
        now.getTime() - firstRequestFailureTime.getTime() >
        Constants.AllowedPartitionUnavailabilityDurationInMs
      ) {
        const originalFailedLocation = partitionFailover.firstFailedEndPoint;
        pkRangeToEndpointMappings.set(pkRange, [originalFailedLocation, HealthStatus.Unhealthy]);
      }
    }

    if (pkRangeToEndpointMappings.size > 0) {
      await this.backgroundOpenConnectionTask(pkRangeToEndpointMappings);

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
  private async backgroundOpenConnectionTask(
    pkRangeToEndpointMappings: Map<string, [string, HealthStatus]>,
  ): Promise<void> {
    for (const [pkRange, [originalFailedLocation, _]] of pkRangeToEndpointMappings) {
      // Un-deterministically marking the original failed endpoint for the PkRange back to healthy.
      pkRangeToEndpointMappings.set(pkRange, [originalFailedLocation, HealthStatus.Connected]);
    }
    return;
  }
}
/**
 * @hidden
 */
export class PartitionKeyRangeFailoverInfo {
  private failedEndPoints: string[] = [];
  public currentEndPoint: string;
  public firstFailedEndPoint: string;
  private consecutiveReadRequestFailureCount: number = 0;
  private consecutiveWriteRequestFailureCount: number = 0;
  private readRequestFailureCounterThreshold: number = 10;
  private writeRequestFailureCounterThreshold: number = 5;
  private failureCountSemaphore: semaphore.Semaphore;
  private firstRequestFailureTime = new Date();
  private lastRequestFailureTime = new Date();
  private timestampSemaphore: semaphore.Semaphore;
  private timeoutCounterResetWindow: number = 1000 * 60 * 1; // 1 minute
  private tryMoveNextLocationSemaphore: semaphore.Semaphore;

  /**
   * @internal
   */
  constructor(currentEndpoint: string) {
    this.currentEndPoint = currentEndpoint;
    this.firstFailedEndPoint = currentEndpoint;
    this.failureCountSemaphore = semaphore(1);
    this.timestampSemaphore = semaphore(1);
    this.tryMoveNextLocationSemaphore = semaphore(1);
  }

  public async CanCircuitBreakerTriggerPartitionFailOver(
    isReadOnlyRequest: boolean,
  ): Promise<boolean> {
    const { consecutiveReadRequestFailureCount, consecutiveWriteRequestFailureCount } =
      await this.snapshotConsecutiveRequestFailureCount();

    return isReadOnlyRequest
      ? consecutiveReadRequestFailureCount > this.readRequestFailureCounterThreshold
      : consecutiveWriteRequestFailureCount > this.writeRequestFailureCounterThreshold;
  }

  public async incrementRequestFailureCounts(
    isReadOnlyRequest: boolean,
    currentTime: number,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.failureCountSemaphore.take(async () => {
        try {
          const { lastRequestFailureTime } = await this.snapshotPartitionFailoverTimestamps();

          if (currentTime - lastRequestFailureTime.getTime() > this.timeoutCounterResetWindow) {
            this.consecutiveReadRequestFailureCount = 0;
            this.consecutiveWriteRequestFailureCount = 0;
          }

          if (isReadOnlyRequest) {
            this.consecutiveReadRequestFailureCount++;
          } else {
            this.consecutiveWriteRequestFailureCount++;
          }
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          // Release the semaphore lock
          this.failureCountSemaphore.leave();
        }
      });
    });
  }

  public async snapshotConsecutiveRequestFailureCount(): Promise<{
    consecutiveReadRequestFailureCount: number;
    consecutiveWriteRequestFailureCount: number;
  }> {
    return new Promise((resolve, reject) => {
      this.failureCountSemaphore.take(() => {
        try {
          const consecutiveReadRequestFailureCount = this.consecutiveReadRequestFailureCount;
          const consecutiveWriteRequestFailureCount = this.consecutiveWriteRequestFailureCount;
          resolve({ consecutiveReadRequestFailureCount, consecutiveWriteRequestFailureCount });
        } catch (err) {
          reject(err);
        } finally {
          this.failureCountSemaphore.leave();
        }
      });
    });
  }

  public async snapshotPartitionFailoverTimestamps(): Promise<{
    firstRequestFailureTime: Date;
    lastRequestFailureTime: Date;
  }> {
    return new Promise((resolve, reject) => {
      this.timestampSemaphore.take(() => {
        try {
          const firstRequestFailureTime = this.firstRequestFailureTime;
          const lastRequestFailureTime = this.lastRequestFailureTime;
          resolve({ firstRequestFailureTime, lastRequestFailureTime });
        } catch (err) {
          reject(err);
        } finally {
          this.timestampSemaphore.leave();
        }
      });
    });
  }

  public async TryMoveNextLocation(
    endPoints: readonly string[],
    failedEndPoint: string,
  ): Promise<boolean> {
    if (failedEndPoint !== this.currentEndPoint) {
      return true;
    }
    return new Promise((resolve, reject) => {
      this.tryMoveNextLocationSemaphore.take(() => {
        try {
          for (const endpoint of endPoints) {
            if (this.currentEndPoint === endpoint) {
              continue;
            }

            if (this.failedEndPoints.includes(endpoint)) {
              continue;
            }

            this.failedEndPoints.push(failedEndPoint);
            this.currentEndPoint = endpoint;
            return resolve(true);
          }
          return resolve(false);
        } catch (err) {
          reject(err);
        } finally {
          this.tryMoveNextLocationSemaphore.leave();
        }
      });
    });
  }
}
