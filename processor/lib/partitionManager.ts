// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { HostContextWithPumpManager } from "./hostContext";
import { validateType, RetryConfig, retry, EPHActionStrings } from "./util/utils";
import { delay } from "@azure/event-hubs";
import * as log from "./log";
import { OnReceivedMessage, OnReceivedError, CloseReason } from "./modelTypes";
import { PartitionScanner } from "./partitionScanner";

/**
 * @ignore
 */
export class PartitionManager {

  private _context: HostContextWithPumpManager;
  private _partitionScanner: PartitionScanner;
  private _isCancelRequested: boolean = false;
  private _isRunning: boolean = false;
  private _runTask?: Promise<void>;

  constructor(context: HostContextWithPumpManager) {
    this._context = context;
    this._partitionScanner = new PartitionScanner(this._context);
  }

  /**
   * @ignore
   */
  async start(onMessage: OnReceivedMessage, onError: OnReceivedError): Promise<void> {
    validateType("onMessage", onMessage, true, "function");
    validateType("onError", onError, true, "function");
    if (this._isRunning) {
      throw new Error("A partition manager cannot be started multiple times.");
    }

    try {
      this._reset();
      this._isRunning = true;
      this._context.onMessage = onMessage;
      this._context.onError = onError;
      await this._cachePartitionIds();
      await this._initializeStores();
      this._runTask = this._run();
    } catch (err) {
      this._isRunning = false;
      throw err;
    }
  }

  /**
   * @ignore
   */
  async stop(): Promise<void> {
    const withHost = this._context.withHost;
    this._isCancelRequested = true;
    const localRunTask = this._runTask;
    if (localRunTask) {
      try {
        await localRunTask;
      } catch (err) {
        const msg = `An error occurred while stopping the run task: ` +
          `${err ? err.stack : JSON.stringify(err)}.`;
        log.error(withHost("%s"), msg);
      } finally {
        this._isRunning = false;
      }
    }
  }

  /**
   * @ignore
   */
  shouldStop(): boolean {
    if (this._isCancelRequested) {
      log.partitionManager(this._context.withHost("Cancellation was requested -> %s. " +
        "Hence stopping further execution."), this._isCancelRequested);
    }
    return this._isCancelRequested;
  }

  /**
   * @ignore
   */
  private _reset(): void {
    const withHost = this._context.withHost;
    log.partitionManager(withHost("Resetting the partition manager."));
    this._context.blobReferenceByPartition = {};
    this._context.onMessage = undefined;
    this._context.onError = undefined;
    this._isRunning = false;
    this._isCancelRequested = false;
  }

  /**
   * @ignore
   */
  private async _run(): Promise<void> {
    const withHost = this._context.withHost;
    try {
      await this._scan(true);
    } catch (err) {
      const msg = `An error occurred in the main loop of the partition ` +
        `manager: ${err ? err.stack : JSON.stringify(err)}. Hence shutting down.`;
      log.error(withHost("%s"), msg);
      this._context.onEphError({
        hostName: this._context.hostName,
        partitionId: "N/A",
        error: err,
        action: EPHActionStrings.partitionManagerMainLoop
      });
    }
    try {
      // clean up
      log.partitionManager(withHost("Shutting down all the receivers."));
      await this._context.pumpManager.removeAllPumps(CloseReason.shutdown);
    } catch (err) {
      const msg = `An error occurred while shutting down the partition ` +
        `manager: ${err ? err.stack : JSON.stringify(err)}.`;
      log.error(withHost("%s"), msg);
      this._context.onEphError({
        hostName: this._context.hostName,
        partitionId: "N/A",
        error: err,
        action: EPHActionStrings.partitionManagerCleanup
      });
    }
  }

  /**
   * @ignore
   */
  private async _cachePartitionIds(): Promise<void> {
    const hostName = this._context.hostName;
    const withHost = this._context.withHost;
    if (!this._context.partitionIds.length) {
      log.partitionManager(withHost("Get the list of partition ids."));
      const config: RetryConfig<string[]> = {
        hostName: hostName,
        operation: () => this._context.getPartitionIds(),
        retryMessage: "Failure getting partition ids for this Event Hub, retrying",
        finalFailureMessage: "Out of retries for getting partition ids for this Event Hub",
        action: EPHActionStrings.gettingPartitionIds,
        maxRetries: 5
      };
      await retry<string[]>(config);
    }
  }

  /**
   * @ignore
   */
  private async _initializeStores(): Promise<void> {
    const hostName = this._context.hostName;
    const withHost = this._context.withHost;
    const leaseManager = this._context.leaseManager;
    const checkpointManager = this._context.checkpointManager;

    validateType("this._context.onMessage", this._context.onMessage, true, "function");
    validateType("this._context.onError", this._context.onError, true, "function");

    log.partitionManager(withHost("Ensuring that the lease store exists."));
    if (!await leaseManager.leaseStoreExists()) {
      const config: RetryConfig<void> = {
        hostName: hostName,
        operation: () => leaseManager.createLeaseStoreIfNotExists(),
        retryMessage: "Failure creating lease store for this Event Hub, retrying",
        finalFailureMessage: "Out of retries for creating lease store for this Event Hub",
        action: EPHActionStrings.creatingLeaseStore,
        maxRetries: 5
      };
      await retry<void>(config);
    }

    if (this.shouldStop()) return;

    log.partitionManager(withHost("Ensure the checkpointstore exists."));
    if (!await checkpointManager.checkpointStoreExists()) {
      const config: RetryConfig<void> = {
        hostName: hostName,
        operation: () => checkpointManager.createCheckpointStoreIfNotExists(),
        retryMessage: "Failure creating checkpoint store for this Event Hub, retrying",
        finalFailureMessage: "Out of retries for creating checkpoint store for this Event Hub",
        action: EPHActionStrings.creatingCheckpointStore,
        maxRetries: 5
      };
      await retry<void>(config);
    }

    if (this.shouldStop()) return;

    log.partitionManager(withHost("Ensure that the leases exist."));
    const leaseConfig: RetryConfig<void> = {
      hostName: hostName,
      operation: () => leaseManager.createAllLeasesIfNotExists(this._context.partitionIds),
      retryMessage: "Failure creating lease for partition, retrying",
      finalFailureMessage: "Out of retries for creating lease for partition",
      action: EPHActionStrings.creatingLease,
      maxRetries: 5
    };
    await retry<void>(leaseConfig);

    if (this.shouldStop()) return;

    log.partitionManager(withHost("Ensure that the checkpoint exists."));
    const checkpointConfig: RetryConfig<void> = {
      hostName: hostName,
      operation: () => checkpointManager.createAllCheckpointsIfNotExists(this._context.partitionIds),
      retryMessage: "Failure creating checkpoint for partition, retrying",
      finalFailureMessage: "Out of retries for creating checkpoint for partition",
      action: EPHActionStrings.creatingCheckpoint,
      maxRetries: 5
    };
    await retry<void>(checkpointConfig);

    if (this.shouldStop()) return;
  }

  /**
   * @ignore
   */
  private async _scan(isFirst: boolean): Promise<void> {
    const withHost = this._context.withHost;
    while (!this.shouldStop()) {
      if (isFirst) {
        log.partitionManager(withHost("Starting the first scan."));
      }
      const didSteal = await this._partitionScanner.scan(isFirst);
      log.partitionManager(withHost("Did we steal any leases in this scan: %s."), didSteal);
      let seconds: number = didSteal ? this._context.fastScanInterval! : this._context.slowScanInterval!;
      if (isFirst) {
        seconds = this._context.startupScanDelay!;
        isFirst = false;
      }
      log.partitionManager(withHost("Sleeping for %d seconds before starting the next scan."), seconds);
      await delay(seconds * 1000);
    }
  }
}
