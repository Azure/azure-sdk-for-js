// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { DiagnosticNodeInternal } from "./index.js";
import { Constants } from "./index.js";
import semaphore from "semaphore";

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

  private failureCountSemaphore: semaphore.Semaphore;
  private tryMoveNextLocationSemaphore: semaphore.Semaphore;

  /**
   * @internal
   */
  constructor(currentEndpoint: string) {
    this.currentEndPoint = currentEndpoint;
    this.failureCountSemaphore = semaphore(1);
    this.tryMoveNextLocationSemaphore = semaphore(1);
  }

  /**
   * Checks if the circuit breaker can trigger a partition failover based on the failure counts.
   * Returns true if the number of consecutive failures exceeds the defined thresholds for read or write requests.
   */
  public async canCircuitBreakerTriggerPartitionFailOver(
    isReadOnlyRequest: boolean,
  ): Promise<boolean> {
    const { consecutiveReadRequestFailureCount, consecutiveWriteRequestFailureCount } =
      await this.snapshotConsecutiveRequestFailureCount();

    return isReadOnlyRequest
      ? consecutiveReadRequestFailureCount > Constants.ReadRequestFailureCountThreshold
      : consecutiveWriteRequestFailureCount > Constants.WriteRequestFailureCountThreshold;
  }

  /**
   * Increments the failure counts for read or write requests and updates the timestamps.
   * If the time since the last failure exceeds the reset window, it resets the failure counts.
   */
  public async incrementRequestFailureCounts(
    isReadOnlyRequest: boolean,
    currentTimeInMilliseconds: number,
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.failureCountSemaphore.take(async () => {
        try {
          const { lastRequestFailureTime } = await this.snapshotPartitionFailoverTimestamps();

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
          return resolve();
        } catch (error) {
          reject(error);
        } finally {
          // Release the semaphore lock
          this.failureCountSemaphore.leave();
        }
      });
    });
  }

  /**
   * Returns a snapshot of the first and last request failure timestamps.
   * This method is used to retrieve the current state of failure timestamps without modifying them.
   */
  public async snapshotPartitionFailoverTimestamps(): Promise<{
    firstRequestFailureTime: number;
    lastRequestFailureTime: number;
  }> {
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
  public async tryMoveNextLocation(
    endPoints: readonly string[],
    failedEndPoint: string,
    diagnosticNode: DiagnosticNodeInternal,
    partitionKeyRangeId: string,
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
          diagnosticNode.addData({
            partitionKeyRangeFailoverInfo: `PartitionKeyRangeId: ${partitionKeyRangeId}, failedLocations: ${this.failedEndPoints}, newLocation: ${this.currentEndPoint}`,
          });
          return resolve(false);
        } catch (err) {
          reject(err);
        } finally {
          this.tryMoveNextLocationSemaphore.leave();
        }
      });
    });
  }

  /** Returns the current endpoint being used for partition key range operations.*/
  public getCurrentEndPoint(): string {
    return this.currentEndPoint;
  }

  /**
   * Returns a snapshot of the current consecutive request failure counts for read and write requests.
   * This method is used to retrieve the current state of failure counts without modifying them.
   */
  private async snapshotConsecutiveRequestFailureCount(): Promise<{
    consecutiveReadRequestFailureCount: number;
    consecutiveWriteRequestFailureCount: number;
  }> {
    return {
      consecutiveReadRequestFailureCount: this.consecutiveReadRequestFailureCount,
      consecutiveWriteRequestFailureCount: this.consecutiveWriteRequestFailureCount,
    };
  }
}
