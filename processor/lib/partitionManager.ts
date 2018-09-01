// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { HostContext } from "./hostContext";
import { Dictionary, validateType, RetryConfig, retry, EPHActionStrings } from "./util/utils";
import { CompleteLease } from "./completeLease";
import { CheckpointInfo } from "./checkpointInfo";
import { LeaseManager } from "./leaseManager";
import {
  delay, ReceiveOptions, OnMessage, EventData, ReceiveHandler, OnError, MessagingError, EventPosition
} from "azure-event-hubs";
import * as log from "./log";
import { OnReceivedMessage, OnReceivedError } from "./modelTypes";
import { PartitionContext } from "./partitionContext";
import { AzureStorageCheckpointLeaseManager } from './azureStorageCheckpointLeaseManager';

/**
 * @ignore
 */
enum CloseReason {
  leaseLost = "LeaseLost",
  shutdown = "ShutDown"
}

/**
 * @ignore
 */
export class PartitionManager {

  private _context: HostContext;
  private _isCancelRequested: boolean = false;
  private _runTask?: Promise<void>;
  private _onMessage?: OnReceivedMessage;
  private _onError?: OnReceivedError;

  constructor(context: HostContext) {
    this._context = context;
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
    this._onMessage = onMessage;
    this._onError = onError;
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
    this._onMessage = undefined;
    this._onError = undefined;
    log.partitionManager("[%s] Closing the event hub client.", this._context.hostName);
    await this._context.eventHubClient.close();
  }

  /**
   * @ignore
   */
  private async _run(): Promise<void> {
    try {
      await this._runLoop();
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
      await this._removeAllReceivers(CloseReason.shutdown);
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

    validateType("this._onMessage", this._onMessage, true, "function");
    validateType("this._onError", this._onError, true, "function");

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

    log.partitionManager("[%s] Ensure that the leases exist.", hostName);
    const leases: Promise<CompleteLease>[] = [];
    for (const id of partitionIds) {
      const config: RetryConfig<CompleteLease> = {
        hostName: hostName,
        operation: () => leaseManager.createLeaseIfNotExists(id),
        retryMessage: "Failure creating lease for partition, retrying",
        finalFailureMessage: "Out of retries for creating lease for partition",
        action: EPHActionStrings.creatingLease,
        maxRetries: 5,
        partitionId: id
      };
      leases.push(retry<CompleteLease>(config));
    }
    await Promise.all(leases);
    if (!(this._context.checkpointManager instanceof AzureStorageCheckpointLeaseManager)) {
      log.partitionManager("[%s] Ensure the checkpointstore exists.", hostName);
      if (!await checkpointManager.checkpointStoreExists()) {
        const config: RetryConfig<boolean> = {
          hostName: hostName,
          operation: () => checkpointManager.createCheckpointStoreIfNotExists(),
          retryMessage: "Failure creating checkpoint store for this Event Hub, retrying",
          finalFailureMessage: "Out of retries for creating checkpoint store for this Event Hub",
          action: EPHActionStrings.creatingCheckpointStore,
          maxRetries: 5
        };
        await retry<boolean>(config);
      }
      const checkpoints: Promise<CheckpointInfo>[] = [];
      log.partitionManager("[%s] Ensure that the checkpoint exists.", hostName);
      for (const id of partitionIds) {
        const config: RetryConfig<CheckpointInfo> = {
          hostName: hostName,
          operation: () => checkpointManager.createCheckpointIfNotExists(id),
          retryMessage: "Failure creating checkpoint for partition, retrying",
          finalFailureMessage: "Out of retries for creating checkpoint for partition",
          action: EPHActionStrings.creatingCheckpoint,
          maxRetries: 5,
          partitionId: id
        };
        checkpoints.push(retry<CheckpointInfo>(config));
      }
      await Promise.all(checkpoints);
    }
  }

  /**
   * @ignore
   */
  private async _runLoop(): Promise<void> {
    while (!this._isCancelRequested) {
      const leaseManager: LeaseManager = this._context.leaseManager!;
      const allLeases: Dictionary<CompleteLease> = {};
      const leasesOwnedByOthers: CompleteLease[] = [];
      const renewLeasePromises: Array<Promise<void>> = [];
      let ourLeaseCount = 0;
      const hostName = this._context.hostName;
      let step = 0;
      let subStep = 1;
      log.partitionManager("[%s] Starting a new iteration of the loop to scan partitions.", hostName);
      log.partitionManager("[%s] ourLeaseCount: %d", hostName, ourLeaseCount);
      log.partitionManager("[%s] Step %d - Checking all the leases.", hostName, ++step);
      const gettingAllLeases = await leaseManager.getAllLeases();
      for (const getLeasePromise of gettingAllLeases) {
        try {
          const lease = await getLeasePromise;
          if (lease) {
            allLeases[lease.partitionId] = lease;
            if (lease.owner === hostName) {
              log.partitionManager("[%s] Step %d.%d - Renewing lease '%s' for partitionId '%s' " +
                "since we are the owner.", hostName, step, subStep, lease.token, lease.partitionId);
              const renewLeasePromise = leaseManager.renewLease(lease).then((renewResult) => {
                if (renewResult) {
                  ourLeaseCount++;
                  log.error("[%s] Step %d.%d - result: %s, PartitionId: '%s', Successfully renewed lease.",
                    hostName, step, subStep, renewResult, lease.partitionId);
                  log.partitionManager("[%s] ourLeaseCount: %d", hostName, ourLeaseCount);
                } else {
                  log.error("[%s] Step %d.%d - result: %s, PartitionId: '%s', Failed to renew lease.",
                    hostName, step, subStep, renewResult, lease.partitionId);
                  this._context.onEphError({
                    hostName: hostName,
                    partitionId: lease.partitionId,
                    error: new Error("Failed to renew the lease."),
                    action: EPHActionStrings.renewingLease
                  });
                }
              }).catch((err) => {
                log.error("[%s] Step %d.%d - result: false, PartitionId: '%s', Failed to renew lease.",
                  hostName, step, subStep, lease.partitionId);
                log.error("[%s] PartitionId: '%s', Failed to renew lease. Error: %O",
                  hostName, lease.partitionId, err);
                this._context.onEphError({
                  hostName: hostName,
                  partitionId: lease.partitionId,
                  error: err,
                  action: EPHActionStrings.renewingLease
                });
              });
              renewLeasePromises.push(renewLeasePromise);
            } else {
              log.partitionManager("[%s] Step %d.%d - lease for partitionId '%s' owned by '%s'.",
                hostName, step, subStep, lease.partitionId, lease.owner);
              leasesOwnedByOthers.push(lease);
            }
          }
        } catch (err) {
          log.error("[%s] Failure during checking lease. Error: %O", hostName, err);
          this._context.onEphError({
            hostName: hostName,
            partitionId: "N/A",
            error: err,
            action: EPHActionStrings.checkingLeases
          });
        }
      }

      try {
        log.partitionManager("[%s] Step %d.%d - Waiting until we are done with renewing " +
          "our own %d leases here.", hostName, step, subStep++, renewLeasePromises.length);
        await Promise.all(renewLeasePromises);
        log.partitionManager("[%s] Step %d.%d - Lease renewal is finished.", hostName, step, subStep);
      } catch (err) {
        log.error("[%s] Step %d.%d - An error occurred while renewing leases: %O", hostName, step,
          subStep, err);
        this._context.onEphError({
          hostName: hostName,
          partitionId: "N/A",
          error: err,
          action: EPHActionStrings.renewingLeases
        });
      }

      log.partitionManager("[%s] Step %d - Check any expired leases that can be grabbed.",
        hostName, ++step);
      for (const partitionId in allLeases) {
        const possibleLease = allLeases[partitionId];
        try {
          const isExpired = await possibleLease.isExpired();
          if (isExpired) {
            log.partitionManager("[%s] Step %d.%d - Lease '%s' with owner '%s' for partitionId '%s' is expired -> %s.",
              hostName, step, subStep = 1, possibleLease.token, possibleLease.owner,
              possibleLease.partitionId, isExpired);
            const isAcquired = await leaseManager.acquireLease(possibleLease);
            if (isAcquired) {
              ourLeaseCount++;
              log.partitionManager("[%s] Step %d.%d - Lease '%s' with owner '%s' for partitionId '%s' is acquired -> %s.",
                hostName, step, subStep++, possibleLease.token, possibleLease.owner,
                possibleLease.partitionId, isAcquired);
              log.partitionManager("[%s] ourLeaseCount: %d", hostName, ourLeaseCount);
            }
          }
        } catch (err) {
          log.error("[%s] Step %d.%d - An error occurred while either checking for expiry or " +
            "acquiring lease: %O", hostName, step, subStep, err);
          this._context.onEphError({
            hostName: hostName,
            partitionId: possibleLease.partitionId,
            error: err,
            action: EPHActionStrings.checkingExpiredLeases
          });
        }
      }

      log.partitionManager("[%s] Step %d - Grab more leases if available and needed for load balancing.",
        hostName, ++step);
      log.partitionManager("[%s] Step %d - Our lease count: %d v/s Lease owned by others count: %d.",
        hostName, step, ourLeaseCount, leasesOwnedByOthers.length);
      if (leasesOwnedByOthers.length > 0) {
        const stealThisLease: CompleteLease | undefined = this._whichLeaseToSteal(leasesOwnedByOthers,
          ourLeaseCount);
        if (stealThisLease) {
          try {
            log.partitionManager("[%s] Step %d.%d - Trying to steal the lease '%s' for " +
              "partitionId '%s' from owner '%s'.", hostName, step, subStep = 1, stealThisLease.token,
              stealThisLease.partitionId, stealThisLease.owner);
            if (await leaseManager.acquireLease(stealThisLease)) {
              log.partitionManager("[%s] Step %d.%d - Succeeded in stealing the lease: %O", hostName,
                step, subStep, stealThisLease.getInfo());
            } else {
              log.error("[%s] Step %d.%d - Failed in stealing the lease: %O", hostName,
                step, subStep, stealThisLease.getInfo());
            }
          } catch (err) {
            const msg = `An error occurred while stealing the lease for partition ` +
              `'${stealThisLease.partitionId}': ${err ? err.stack : JSON.stringify(err)}`;
            log.error("[%s] Step %d.%d - %s", hostName, step, subStep, msg);
            this._context.onEphError({
              hostName: hostName,
              partitionId: stealThisLease.partitionId,
              error: err,
              action: EPHActionStrings.stealingLease
            });
          }
        }
      }

      log.partitionManager("[%s] Step %d - Update receiver with new state of lease.", hostName, ++step);
      for (const partitionId of Object.keys(allLeases)) {
        try {
          subStep = 1;
          const updatedLease: CompleteLease = allLeases[partitionId];
          log.partitionManager("[%s] Step %d - Lease on partition '%s' owned by '%s'.", hostName,
            step, updatedLease.partitionId, updatedLease.owner);
          if (updatedLease.owner === hostName) {
            log.partitionManager("[%s] Step %d.%d - Check and add receiver for partitionId '%s'.",
              hostName, step, subStep++, partitionId);
            await this._checkAndAddReceiver(partitionId, updatedLease);
          } else {
            log.partitionManager("[%s] Step %d.%d - Remove receiver for partitionId '%s' since " +
              "lease is lost.", hostName, step, subStep, partitionId);
            await this._removeReceiver(partitionId, CloseReason.leaseLost);
          }
        } catch (err) {
          const msg = `An error occurred while adding/removing receivers on partition ` +
            `'${partitionId}': ${err ? err.stack : JSON.stringify(err)}`;
          log.error("[%s] Step %d.%d - %s", hostName, msg, step, subStep);
          this._context.onEphError({
            hostName: hostName,
            partitionId: partitionId,
            error: err,
            action: EPHActionStrings.partitionReceiverManagement
          });
        }
      }
      log.partitionManager("[%s] Step %d - Sleeping for %d seconds.", hostName, ++step,
        leaseManager.leaseRenewInterval);
      await delay(leaseManager.leaseRenewInterval * 1000);
      log.partitionManager("[%s] Step %d - Ready for next iteration...", hostName, step);
    }
  }

  /**
   * @ignore
   */
  private _whichLeaseToSteal(stealableLeases: CompleteLease[], heaveLeaseCount: number): CompleteLease | undefined {
    const countsByOwner: { [x: string]: number } = this._countLeasesByOwner(stealableLeases);
    const biggestOwner: (string | number)[][] = Object.keys(countsByOwner).map((key) => {
      return [key, countsByOwner[key]];
    }).sort((first, second) => { return (second[1] as number) - (first[1] as number); });

    let stealThisLease: CompleteLease | undefined;

    // If the number of leases is a multiple of the number of hosts, then the desired configuration
    // is that all hosts own the name number of leases, and the difference between the "biggest"
    // owner and any other is 0.
    //
    // If the number of leases is not a multiple of the number of hosts, then the most even
    // configuration possible is for some hosts to have (leases/hosts) leases and others to have
    // ((leases/hosts) + 1). For example, for 16 partitions distributed over five hosts, the
    // distribution would be 4, 3, 3, 3, 3, or any of the possible reorderings.
    //
    // In either case, if the difference between this host and the biggest owner is 2 or more,
    // then the system is not in the most evenly-distributed configuration, so steal one lease
    // from the biggest. If there is a tie for biggest, we pick whichever appears first in the
    // list because it doesn't really matter which "biggest" is trimmed down.
    //
    // Stealing one at a time prevents flapping because it reduces the difference between the
    // biggest and this host by two at a time. If the starting difference is two or greater,
    // then the difference cannot end up below 0. This host may become tied for biggest, but
    // it cannot become larger than the host that it is stealing from.

    log.partitionManager("[%s] The biggest owner is: %o", this._context.hostName, biggestOwner);
    if ((biggestOwner[0][1] as number) - heaveLeaseCount >= 2) {
      stealThisLease = stealableLeases.find((l) => {
        return l.owner === biggestOwner[0][0];
      }) as CompleteLease;
    }
    log.partitionManager("[%s] The lease to be stolen is: %O", this._context.hostName,
      stealThisLease ? stealThisLease.getInfo() : undefined);
    return stealThisLease;
  }

  /**
   * @ignore
   */
  private _countLeasesByOwner(leases: CompleteLease[]): Dictionary<number> {
    const result: Dictionary<number> = {};
    for (const l of leases) {
      if (result[l.owner] == undefined) {
        result[l.owner] = 1;
      } else {
        result[l.owner] += 1;
      }
    }
    log.partitionManager("[%s] Owner to lease count mapping: %O.", this._context.hostName, result);
    log.partitionManager("[%s] Total hosts in list of stealable leases: %d.", this._context.hostName,
      Object.keys(result).length);
    return result;
  }

  /**
   * @ignore
   */
  private async _checkAndAddReceiver(partitionId: string, lease: CompleteLease): Promise<void> {
    const receiveHandler = this._context.receiverByPartition[partitionId];
    if (receiveHandler) {
      const isOpen: boolean = receiveHandler.isReceiverOpen;
      if (!isOpen) {
        log.error("[%s] The existing receiver '%s' and epoch %d is open -> %s.",
          this._context.hostName, receiveHandler.address, receiveHandler.epoch, isOpen);
        await this._removeReceiver(partitionId, CloseReason.shutdown);
      } else {
        log.partitionManager("[%s] Updating lease for receiver '%s' since it is open -> %s.",
          this._context.hostName, receiveHandler.address, isOpen);
        if (this._context.contextByPartition[partitionId]) {
          this._context.contextByPartition[partitionId].lease = lease;
        } else {
          log.partitionManager("[%s] PartitionContext for partition '%s' was not found. " +
            "Hence adding a new partition context.", this._context.hostName, partitionId);
          this._context.contextByPartition[partitionId] = new PartitionContext(this._context,
            partitionId, lease);
        }
      }
    } else {
      log.partitionManager("[%s] Creating a new receiver for partitionId '%s' with lease %o.",
        this._context.hostName, partitionId, lease.getInfo());
      await this._createNewReceiver(partitionId, lease);
    }
  }

  /**
   * @ignore
   */
  private async _createNewReceiver(partitionId: string, lease: CompleteLease): Promise<void> {
    const partitionContext = new PartitionContext(this._context, partitionId, lease);
    this._context.contextByPartition[partitionId] = partitionContext;
    const eventPosition: EventPosition = await partitionContext.getInitialOffset();
    let receiveHandler: ReceiveHandler;
    const rcvrOptions: ReceiveOptions = {
      consumerGroup: this._context.consumerGroup,
      eventPosition: eventPosition,
      epoch: lease.epoch
    };
    const onMessage: OnMessage = (eventData: EventData) => {
      partitionContext.setOffsetAndSequenceNumber(eventData);
      this._onMessage!(partitionContext, eventData);
    };
    const onError: OnError = async (error: MessagingError | Error) => {
      log.error("[%s] Receiver '%s' received an error: %O.", this._context.hostName,
        receiveHandler.address, error);
      this._onError!(error);
      try {
        await this._removeReceiver(partitionId, CloseReason.shutdown);
      } catch (err) {
        log.error("[%s] Since we received an error %O on the error handler for receiver with " +
          "address '%s', we tried closing it. However, an error occurred while closing it " +
          "and it is: %O", this._context.hostName, error, receiveHandler.address, err);
      }
    };
    receiveHandler = this._context.eventHubClient.receive(partitionId, onMessage, onError, rcvrOptions);
    log.partitionManager("[%s] Attaching receiver '%s' for partition '%s' with eventPosition: %s",
      this._context.hostName, receiveHandler.address, partitionId, eventPosition.getExpression());
    this._context.receiverByPartition[partitionId] = receiveHandler;
  }

  private async _removeReceiver(partitionId: string, reason: CloseReason): Promise<void> {
    const receiveHandler = this._context.receiverByPartition[partitionId];
    const partitionContext = this._context.contextByPartition[partitionId];
    if (receiveHandler && partitionContext) {
      const leaseId = partitionContext.lease.token;
      try {
        log.partitionManager("[%s] Removing receiver '%s' for partitionId '%s' due to reason '%s'.",
          this._context.hostName, receiveHandler.address, partitionId, reason);
        delete this._context.receiverByPartition[partitionId];
        delete this._context.contextByPartition[partitionId];
        await receiveHandler.stop();
        log.partitionManager("[%s] Successfully stopped the receiver '%s' for partitionId '%s' " +
          "due to reason '%s'.", this._context.hostName, receiveHandler.address, partitionId, reason);
      } catch (err) {
        const msg = `An error occurred while closing the receiver '${receiveHandler.address}' : ` +
          `${err ? err.stack : JSON.stringify(err)}`;
        log.error("[%s] %s", this._context.hostName, msg);
      }
      if (reason !== CloseReason.leaseLost) {
        try {
          log.partitionManager("[%s] Releasing lease %s after closing the receiver '%s' due to " +
            "reason '%s'.", this._context.hostName, leaseId, receiveHandler.address, reason);
          await this._context.leaseManager.releaseLease(partitionContext.lease);
        } catch (err) {
          const msg = `An error occurred while releasing the lease ${leaseId} ` +
            `the receiver '${receiveHandler.address}' : ${err ? err.stack : JSON.stringify(err)} `;
          log.error("[%s] %s", this._context.hostName, msg);
          if (err.name && err.name !== "LeaseLostError") {
            throw err;
          }
        }
      }
    } else {
      log.partitionManager("[%s] No receiver was found to remove for partitionId '%s'",
        this._context.hostName, partitionId);
    }
  }

  /**
   * @ignore
   */
  private async _removeAllReceivers(reason: CloseReason): Promise<void> {
    const tasks: Promise<void>[] = [];
    for (const id of Object.keys(this._context.receiverByPartition)) {
      tasks.push(this._removeReceiver(id, reason));
    }
    log.partitionManager("[%s] Removing all the receivers due to reason %s.",
      this._context.hostName, reason);
    await Promise.all(tasks);
  }
}
