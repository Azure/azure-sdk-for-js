// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants, DiagnosticNodeInternal } from "./index.js";

/**
 * @hidden
 * This class manages the failover information for partition key ranges in Cosmos DB.
 * It tracks the current endpoint, failed endpoints, and the number of consecutive read/write request failures.
 */
export class PartitionKeyRangeFailoverInfo {
  private failedEndPoints: string[] = [];
  private currentEndPoint: string;

  private consecutiveReadRequestFailureCount: number = 0;
  private consecutiveWriteRequestFailureCount: number = 0;
  private firstRequestFailureTime: number = Date.now();
  private lastRequestFailureTime: number = Date.now();

  /**
   * @internal
   */
  constructor(currentEndpoint: string) {
    this.currentEndPoint = currentEndpoint;
  }

  /**
   * Checks if the circuit breaker can trigger a partition failover based on the failure counts.
   * Returns true if the number of consecutive failures exceeds the defined thresholds for read or write requests.
   */
  public canCircuitBreakerTriggerPartitionFailOver(isReadOnlyRequest: boolean): boolean {
    const { consecutiveReadRequestFailureCount, consecutiveWriteRequestFailureCount } =
      this.snapshotConsecutiveRequestFailureCount();

    return isReadOnlyRequest
      ? consecutiveReadRequestFailureCount > Constants.ReadRequestFailureCountThreshold
      : consecutiveWriteRequestFailureCount > Constants.WriteRequestFailureCountThreshold;
  }

  /**
   * Increments the failure counts for read or write requests and updates the timestamps.
   * If the time since the last failure exceeds the reset window, it resets the failure counts.
   */
  public incrementRequestFailureCounts(
    isReadOnlyRequest: boolean,
    currentTimeInMilliseconds: number,
  ): void {
    const { lastRequestFailureTime } = this.snapshotPartitionFailoverTimestamps();

    if (
      currentTimeInMilliseconds - lastRequestFailureTime >
      Constants.ConsecutiveFailureCountResetIntervalInMS
    ) {
      this.consecutiveReadRequestFailureCount = 0;
      this.consecutiveWriteRequestFailureCount = 0;
    }

    if (isReadOnlyRequest) {
      this.consecutiveReadRequestFailureCount++;
    } else {
      this.consecutiveWriteRequestFailureCount++;
    }
    this.lastRequestFailureTime = currentTimeInMilliseconds;
  }

  /**
   * Returns a snapshot of the first and last request failure timestamps.
   * This method is used to retrieve the current state of failure timestamps without modifying them.
   */
  public snapshotPartitionFailoverTimestamps(): {
    firstRequestFailureTime: number;
    lastRequestFailureTime: number;
  } {
    return {
      firstRequestFailureTime: this.firstRequestFailureTime,
      lastRequestFailureTime: this.lastRequestFailureTime,
    };
  }

  /**
   * Attempts to move to the next available location for the partition key range.
   * If the current endpoint is the same as the failed endpoint, it tries to find a new endpoint
   * from the provided list of endpoints. If a new endpoint is found, it updates the current endpoint
   * and returns true. If no new endpoint is found, it returns false.
   */
  public tryMoveNextLocation(
    endPoints: readonly string[],
    failedEndPoint: string,
    diagnosticNode: DiagnosticNodeInternal,
    partitionKeyRangeId: string,
  ): boolean {
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

    diagnosticNode.addData({
      partitionKeyRangeFailoverInfo: `PartitionKeyRangeId: ${partitionKeyRangeId}, failedLocations: ${this.failedEndPoints}, newLocation: ${this.currentEndPoint}`,
    });

    return false;
  }

  /** Returns the current endpoint being used for partition key range operations.*/
  public getCurrentEndPoint(): string {
    return this.currentEndPoint;
  }

  /**
   * Returns a snapshot of the current consecutive request failure counts for read and write requests.
   * This method is used to retrieve the current state of failure counts without modifying them.
   */
  private snapshotConsecutiveRequestFailureCount(): {
    consecutiveReadRequestFailureCount: number;
    consecutiveWriteRequestFailureCount: number;
  } {
    return {
      consecutiveReadRequestFailureCount: this.consecutiveReadRequestFailureCount,
      consecutiveWriteRequestFailureCount: this.consecutiveWriteRequestFailureCount,
    };
  }
}
