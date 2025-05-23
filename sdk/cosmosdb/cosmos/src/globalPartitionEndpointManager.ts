// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { OperationType, ResourceType, isReadRequest } from "./common/index.js";
import type { CosmosClientOptions, GlobalEndpointManager, RequestContext } from "./index.js";

/**
 * @hidden
 * This class is used to failover single partitions to different regions.
 */
export class GlobalPartitionEndpointManager {
  private readonly partitionKeyRangeToLocation: Map<string, PartitionKeyRangeFailoverInfo>;
  private enablePartitionLevelFailover: boolean;
  private preferredLocations: string[];
  public preferredLocationsCount: number;

  constructor(
    options: CosmosClientOptions,
    private globalEndpointManager: GlobalEndpointManager,
  ) {
    this.partitionKeyRangeToLocation = new Map<string, PartitionKeyRangeFailoverInfo>();
    this.enablePartitionLevelFailover = options.connectionPolicy.enablePartitionLevelFailover;
    this.preferredLocations = options.connectionPolicy.preferredLocations;
    this.preferredLocationsCount = this.preferredLocations ? this.preferredLocations.length : 0;
  }

  /**
   * Marks the current location unavailable for write. Future
   * requests will be routed to the next location if available.
   */
  public async tryMarkEndpointUnavailableForPartitionKeyRange(
    requestContext: RequestContext,
  ): Promise<boolean> {
    const isRequestEligibleForPartitionFailover = await this.IsRequestEligibleForPartitionFailover(
      requestContext,
      true,
    );
    if (!isRequestEligibleForPartitionFailover) {
      return false;
    }

    const partitionKeyRangeId = requestContext.partitionKeyRangeId;
    const failedEndPoint = requestContext.endpoint;

    if (this.isRequestEligibleForPerPartitionAutomaticFailover(requestContext)) {
      // For any single master write accounts, the next locations to fail over will be the read regions configured at the account level.
      const readEndPoints = await this.globalEndpointManager.getAvailableReadEndpoints();
      return this.TryAddOrUpdatePartitionFailoverInfoAndMoveToNextLocation(
        partitionKeyRangeId,
        failedEndPoint,
        readEndPoints,
      );
    }
  }

  /**
   * Updates the DocumentServiceRequest routing location to point
   * new a location based if a partition level failover occurred.
   */
  public async tryAddPartitionLevelLocationOverride(
    requestContext: RequestContext,
  ): Promise<boolean | [boolean, string]> {
    const isRequestEligibleForPartitionFailover = await this.IsRequestEligibleForPartitionFailover(
      requestContext,
      false,
    );
    if (!isRequestEligibleForPartitionFailover) {
      return false;
    }

    const partitionKeyRangeId = requestContext.partitionKeyRangeId;

    if (this.partitionKeyRangeToLocation.has(partitionKeyRangeId)) {
      const partitionFailOver = this.partitionKeyRangeToLocation.get(partitionKeyRangeId);
      return [true, partitionFailOver.currentEndPoint];
    }
    return false;
  }

  /** Validates if the given request is eligible for partition failover. */
  private async IsRequestEligibleForPartitionFailover(
    requestContext: RequestContext,
    shouldValidateFailedLocation: boolean,
  ): Promise<boolean> {
    if (!requestContext) {
      return false;
    }

    if (
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

    if (shouldValidateFailedLocation) {
      if (!requestContext.endpoint) {
        return false;
      }
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
  private async isRequestEligibleForPerPartitionAutomaticFailover(
    requestContext: RequestContext,
  ): Promise<boolean> {
    if (!this.enablePartitionLevelFailover) {
      return false;
    }
    if (isReadRequest(requestContext.operationType)) {
      return false;
    }
    const canUseMultipleWriteLocations = this.globalEndpointManager.canUseMultipleWriteLocations(
      requestContext.resourceType,
      requestContext.operationType,
    );
    if (canUseMultipleWriteLocations) {
      return false;
    }
    return true;
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
  ): Promise<boolean> {
    if (!this.partitionKeyRangeToLocation.has(partitionKeyRangeId)) {
      // If the partition key range is not already in the map, add it
      const failoverInfo = new PartitionKeyRangeFailoverInfo(failedEndPoint);
      this.partitionKeyRangeToLocation.set(partitionKeyRangeId, failoverInfo);
    }
    const partitionFailOver = this.partitionKeyRangeToLocation.get(partitionKeyRangeId);

    // Will return true if it was able to update to a new region
    if (partitionFailOver.TryMoveNextLocation(nextEndPoints, failedEndPoint)) {
      return true;
    }
    // All the locations have been tried. Remove the override information
    this.partitionKeyRangeToLocation.delete(partitionKeyRangeId);
    return false;
  }
}

class PartitionKeyRangeFailoverInfo {
  private failedEndPoints: string[] = [];
  public currentEndPoint: string;

  constructor(currentEndpoint: string) {
    this.currentEndPoint = currentEndpoint;
  }

  public TryMoveNextLocation(endPoints: readonly string[], failedEndPoint: string): boolean {
    if (failedEndPoint !== this.currentEndPoint) {
      return true;
    }

    for (const endpoint of endPoints) {
      if (this.currentEndPoint === endpoint) {
        continue;
      }

      if (this.failedEndPoints.includes(endpoint)) {
        continue;
      }

      this.failedEndPoints.push(failedEndPoint);
      this.currentEndPoint = endpoint;
      return true;
    }

    return false;
  }
}
