// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { HostContext } from "./hostContext";
import { validateType, RetryConfig, retry, EPHActionStrings } from "./util/utils";
import { delay } from "azure-event-hubs";
import * as log from "./log";
import { OnReceivedMessage, OnReceivedError, CloseReason } from "./modelTypes";
import { PumpManager } from "./pumpManager";
import { PartitionScanner } from './partitionScanner';

/**
 * @ignore
 */
export class PartitionManager {

  private _context: HostContext;
  private _pumpManager: PumpManager;
  private _partitionScanner: PartitionScanner;
  private _isCancelRequested: boolean = false;
  private _runTask?: Promise<void>;

  constructor(context: HostContext) {
    this._context = context;
    this._pumpManager = new PumpManager(this._context);
    this._partitionScanner = new PartitionScanner(this._context, this._pumpManager);
  }

  /**
   * @ignore
   */
  async start(onMessage: OnReceivedMessage, onError: OnReceivedError): Promise<void> {
    validateType("onMessage", onMessage, true, "function");
    validateType("onError", onError, true, "function");
    if (this._runTask) {
      throw new Error("A partition manager cannot be started multiple times.");
    }
    this._context.onMessage = onMessage;
    this._context.onError = onError;
    await this._cachePartitionIds();
    await this._initializeStores();
    this._runTask = this._run();
  }

  /**
   * @ignore
   */
  async stop(): Promise<void> {
    this._isCancelRequested = true;
    const localRunTask = this._runTask;
    if (localRunTask) {
      try {
        await localRunTask;
      } catch (err) {
        const msg = `An error occurred while stopping the run task: ` +
          `${err ? err.stack : JSON.stringify(err)}.`;
        log.error("[%s] %s", this._context.hostName, msg);
      } finally {
        await this._reset();
      }
    }
    this._runTask = undefined;
  }

  /**
   * @ignore
   */
  private async _reset(): Promise<void> {
    log.partitionManager("[%s] Resetting the partition manager.", this._context.hostName);
    this._context.receiverByPartition = {};
    this._context.contextByPartition = {};
    this._context.blobReferenceByPartition = {};
    this._context.onMessage = undefined;
    this._context.onError = undefined;
  }

  /**
   * @ignore
   */
  private async _run(): Promise<void> {
    try {
      await this._scan(true);
    } catch (err) {
      const msg = `An error occurred in the main loop of the partition ` +
        `manager: ${err ? err.stack : JSON.stringify(err)}. Hence shutting down.`;
      log.error("[%s] %s", this._context.hostName, msg);
      this._context.onEphError({
        hostName: this._context.hostName,
        partitionId: "N/A",
        error: err,
        action: EPHActionStrings.partitionManagerMainLoop
      });
    }
    try {
      // clean up
      log.partitionManager("[%s] Shutting down all the receivers.", this._context.hostName);
      await this._pumpManager.removeAllPumps(CloseReason.shutdown);
    } catch (err) {
      const msg = `An error occurred while shutting down the partition ` +
        `manager: ${err ? err.stack : JSON.stringify(err)}.`;
      log.error("[%s] %s", this._context.hostName, msg);
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
    if (!this._context.partitionIds.length) {
      log.partitionManager("[%s] Get the list of partition ids.", hostName);
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
    this._isCancelRequested = false;
    this._context.contextByPartition = {};
    this._context.receiverByPartition = {};
    const hostName = this._context.hostName;

    validateType("this._context.onMessage", this._context.onMessage, true, "function");
    validateType("this._context.onError", this._context.onError, true, "function");
    log.partitionManager("[%s] Ensuring that the lease store exists.", hostName);
    const leaseManager = this._context.leaseManager;
    const checkpointManager = this._context.checkpointManager;
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

    log.partitionManager("[%s] Ensure the checkpointstore exists.", hostName);
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

    log.partitionManager("[%s] Ensure that the leases exist.", hostName);
    const leaseConfig: RetryConfig<void> = {
      hostName: hostName,
      operation: () => leaseManager.createAllLeasesIfNotExists(this._context.partitionIds),
      retryMessage: "Failure creating lease for partition, retrying",
      finalFailureMessage: "Out of retries for creating lease for partition",
      action: EPHActionStrings.creatingLease,
      maxRetries: 5
    };
    await retry<void>(leaseConfig);

    log.partitionManager("[%s] Ensure that the checkpoint exists.", hostName);
    const checkpointConfig: RetryConfig<void> = {
      hostName: hostName,
      operation: () => checkpointManager.createAllCheckpointsIfNotExists(this._context.partitionIds),
      retryMessage: "Failure creating checkpoint for partition, retrying",
      finalFailureMessage: "Out of retries for creating checkpoint for partition",
      action: EPHActionStrings.creatingCheckpoint,
      maxRetries: 5
    };
    await retry<void>(checkpointConfig);
  }

  /**
   * @ignore
   */
  private async _scan(isFirst: boolean): Promise<void> {
    while (!this._isCancelRequested) {
      const didSteal = await this._partitionScanner.scan(isFirst);
      let seconds: number = didSteal ? this._context.fastScanInterval! : this._context.slowScanInterval!;
      if (isFirst) {
        seconds = this._context.startupScanDelay!;
        isFirst = false;
      }
      await delay(seconds * 1000);
    }
  }
}
