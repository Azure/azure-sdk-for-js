// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { OperationType, ResourceType, isReadRequest } from "./common/index.js";
import type { GlobalEndpointManager, RequestContext } from "./index.js";

/**
 * @hidden
 * This class is used to failover single partitions to different regions.
 */
export class GlobalPartitionEndpointManager {
  private readonly partitionKeyRangeToLocation: Map<string, PartitionKeyRangeFailoverInfo>;

  constructor(private globalEndpointManager: GlobalEndpointManager) {
    this.partitionKeyRangeToLocation = new Map<string, PartitionKeyRangeFailoverInfo>();
  }

  private async CanUsePartitionLevelFailoverLocations(
    operationType?: OperationType,
    resourceType?: ResourceType,
  ): Promise<boolean> {
    if (this.globalEndpointManager.getReadEndpoint.length <= 1) {
      return false;
    }
    if (
      resourceType === ResourceType.item ||
      (resourceType === ResourceType.sproc && operationType === OperationType.Execute)
    ) {
      // Disable for multimaster because it currently
      // depends on 403.3 to signal the primary region is backup
      // and to fail back over
      if (!this.globalEndpointManager.canUseMultipleWriteLocations(resourceType, operationType)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Marks the current location unavailable for write. Future
   * requests will be routed to the next location if available.
   */
  public async tryMarkEndpointUnavailableForPartitionKeyRange(
    requestContext: RequestContext,
  ): Promise<boolean> {
    if (!requestContext) {
      return false;
    }
    if (requestContext.operationType && isReadRequest(requestContext.operationType)) {
      return false;
    }
    if (
      requestContext.operationType &&
      requestContext.resourceType &&
      !this.CanUsePartitionLevelFailoverLocations(
        requestContext.operationType,
        requestContext.resourceType,
      )
    ) {
      return false;
    }

    const partitionKeyRangeId = requestContext.partitionKeyRangeId;
    if (!partitionKeyRangeId) {
      return false;
    }

    const failedEndPoint = requestContext.endpoint;
    if (!failedEndPoint) {
      return false;
    }

    if (!this.partitionKeyRangeToLocation.has(partitionKeyRangeId)) {
      // If the partition key range is not already in the map, add it
      const failoverInfo = new PartitionKeyRangeFailoverInfo(failedEndPoint);
      this.partitionKeyRangeToLocation.set(partitionKeyRangeId, failoverInfo);
    }
    const partitionFailOver = this.partitionKeyRangeToLocation.get(partitionKeyRangeId);

    const readEndPoints = await this.globalEndpointManager.getAvailableReadEndpoints();
    if (partitionFailOver.TryMoveNextLocation(readEndPoints, failedEndPoint)) {
      return true;
    }
    // All the locations have been tried. Remove the override information
    this.partitionKeyRangeToLocation.delete(partitionKeyRangeId);
    return false;
  }

  /**
   * Updates the DocumentServiceRequest routing location to point
   * new a location based if a partition level failover occurred.
   */
  public async tryAddPartitionLevelLocationOverride(
    requestContext: RequestContext,
  ): Promise<boolean | [boolean, string]> {
    if (!requestContext) {
      return false;
    }
    if (requestContext.operationType && isReadRequest(requestContext.operationType)) {
      return false;
    }
    if (
      requestContext.operationType &&
      requestContext.resourceType &&
      !this.CanUsePartitionLevelFailoverLocations(
        requestContext.operationType,
        requestContext.resourceType,
      )
    ) {
      return false;
    }

    const partitionKeyRangeId = requestContext.partitionKeyRangeId;
    if (!partitionKeyRangeId) {
      return false;
    }

    if (this.partitionKeyRangeToLocation.has(partitionKeyRangeId)) {
      const partitionFailOver = this.partitionKeyRangeToLocation.get(partitionKeyRangeId);
      return [true, partitionFailOver.currentEndPoint];
    }
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
