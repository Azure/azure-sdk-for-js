// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ProcessorContext } from "./processorContext";
import { Dictionary, validateType } from "./util/utils";
import { Lease } from "./lease";
import { CheckpointInfo } from "./checkpointInfo";
import { LeaseManager } from "./leaseManager";
import { delay, ReceiveOptions, OnMessage, EventData, ReceiveHandler, OnError, MessagingError } from "azure-event-hubs";
import * as log from "./log";
import { OnReceivedMessage, OnReceivedError, EPHDiagnosticInfo } from "./eventProcessorHost";
import { PartitionContext } from "./partitionContext";

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
interface RetryConfig<T> {
  operation: () => Promise<T>;
  partitionId?: string;
  retryMessage: string;
  finalFailureMessage: string;
  action: string;
  maxRetries: number;
}
/**
 * @ignore
 */
enum EPHActionStrings {
  checkingLeases = "Checking Leases",
  checkingExpiredLeases = "Checking Expired Leases",
  renewingLease = "Renewing Lease",
  renewingLeases = "Renewing Leases",
  stealingLease = "Stealing Lease",
  creatingLease = "Creating Lease",
  creatingCheckpoint = "Creating Checkpoint",
  creatingCheckpointStore = "Creating Checkpoint Store",
  creatingEventProcessor = "Creating Event Processor",
  creatingLeaseStore = "Creating Lease Store",
  initializingStores = "Initializing Stores",
  partitionManagerCleanup = "Partition Manager Cleanup",
  partitionManagerMainLoop = "Partition Manager Main Loop",
  partitionReceiverManagement = "Partition Receiver Management"
}

/**
 * @ignore
 */
export class PartitionManager {

  private _context: ProcessorContext;
  private _isCancelRequested: boolean = false;
  private _runTask?: Promise<void>;
  private _onMessage?: OnReceivedMessage;
  private _onError?: OnReceivedError;

  constructor(context: ProcessorContext) {
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
  private async _initializeStores(): Promise<void> {
    this._isCancelRequested = false;
    this._context.contextByPartition = {};
    this._context.receiverByPartition = {};
    log.partitionManager("[%s] Ensuring that the lease store exists.", this._context.hostName);
    const leaseManager = this._context.leaseManager;
    const checkpointManager = this._context.checkpointManager;
    if (!await leaseManager.leaseStoreExists()) {
      const config: RetryConfig<boolean> = {
        operation: () => leaseManager.createLeaseStoreIfNotExists(),
        retryMessage: "Failure creating lease store for this Event Hub, retrying",
        finalFailureMessage: "Out of retries creating lease store for this Event Hub",
        action: EPHActionStrings.creatingLeaseStore,
        maxRetries: 5
      };
      await this._retry<boolean>(config);
    }

    log.partitionManager("[%s] Get the list of partition ids.", this._context.hostName);
    const partitionIds = await this._context.eventHubClient.getPartitionIds();

    log.partitionManager("[%s] Ensure that the leases exist.", this._context.hostName);
    for (const id of partitionIds) {
      const config: RetryConfig<Lease> = {
        operation: () => leaseManager.createLeaseIfNotExists(id),
        retryMessage: "Failure creating lease for partition, retrying",
        finalFailureMessage: "Out of retries creating lease for partition",
        action: EPHActionStrings.creatingLease,
        maxRetries: 5
      };
      await this._retry<Lease>(config);
    }

    log.partitionManager("[%s] Ensure the checkpointstore exists.", this._context.hostName);
    if (! await checkpointManager.checkpointStoreExists()) {
      const config: RetryConfig<boolean> = {
        operation: () => checkpointManager.createCheckpointStoreIfNotExists(),
        retryMessage: "Failure creating checkpoint store for this Event Hub, retrying",
        finalFailureMessage: "Out of retries creating checkpoint store for this Event Hub",
        action: EPHActionStrings.creatingCheckpointStore,
        maxRetries: 5
      };
      await this._retry<boolean>(config);
    }

    log.partitionManager("[%s] Ensure that the checkpoint exists.", this._context.hostName);
    for (const id of partitionIds) {
      const config: RetryConfig<CheckpointInfo> = {
        operation: () => checkpointManager.createCheckpointIfNotExists(id),
        retryMessage: "Failure creating checkpoint for partition, retrying",
        finalFailureMessage: "Out of retries creating checkpoint blob for partition",
        action: EPHActionStrings.creatingCheckpoint,
        maxRetries: 5
      };
      await this._retry<CheckpointInfo>(config);
    }
  }

  /**
   * @ignore
   */
  private async _retry<T>(config: RetryConfig<T>): Promise<void> {
    let createdOK: boolean = false;
    let retryCount: number = 0;
    do {
      try {
        await config.operation();
        createdOK = true;
        log.partitionManager("[%s] Retry attempt: %d. Action '%s' suceeded.", this._context.hostName,
          retryCount, config.action);
      } catch (err) {
        if (config.partitionId) {
          log.error("[%s] An error occurred. Retry attempt: %d. PartitionId: '%s'. %s: %O",
            this._context.hostName, config.partitionId, retryCount, config.retryMessage, err);
        } else {
          log.error("[%s] An error occurred. Retry attempt: %d. %s: %O", this._context.hostName,
            retryCount, config.retryMessage, err);
        }
        retryCount++;
      }
    } while (!createdOK && (retryCount < config.maxRetries));

    if (!createdOK) {
      const msg = `${config.finalFailureMessage} while performing the action "${config.action}".`;
      log.error("[%s] %s", this._context.hostName, msg);
      const info: EPHDiagnosticInfo = {
        action: config.action,
        hostName: this._context.hostName,
        partitionId: config.partitionId || "N/A",
        error: new Error(msg)
      };
      throw info;
    }
  }

  /**
   * @ignore
   */
  private async _runLoop(): Promise<void> {
    while (!this._isCancelRequested) {
      const leaseManager: LeaseManager = this._context.leaseManager!;
      const allLeases: Dictionary<Lease> = {};
      const leasesOwnedByOthers: Lease[] = [];
      const renewLeasePromises: Array<Promise<void>> = [];
      let ourLeaseCount = 0;

      const gettingAllLeases = await leaseManager.getAllLeases();
      for (const getLeasePromise of gettingAllLeases) {
        try {
          const lease = await getLeasePromise;
          if (lease) {
            allLeases[lease.partitionId] = lease;
            if (lease.owner === this._context.hostName) {
              ourLeaseCount++;
              const renewLeasePromise = leaseManager.renewLease(lease).then((renewResult) => {
                if (!renewResult) {
                  log.error("[%s] RenewResult: %s, PartitionId: '%s', Failed to renew lease.",
                    this._context.hostName, renewResult, lease.partitionId);
                  this._context.onEphError({
                    hostName: this._context.hostName,
                    partitionId: lease.partitionId,
                    error: new Error("Failed to renew the lease."),
                    action: EPHActionStrings.renewingLease
                  });
                }
              }).catch((err) => {
                log.error("[%s] PartitionId: '%s', Failed to renew lease. Error: %O",
                  this._context.hostName, lease.partitionId, err);
                this._context.onEphError({
                  hostName: this._context.hostName,
                  partitionId: lease.partitionId,
                  error: err,
                  action: EPHActionStrings.renewingLease
                });
              });
              renewLeasePromises.push(renewLeasePromise);
            } else {
              leasesOwnedByOthers.push(lease);
            }
          }
        } catch (err) {
          log.error("[%s] Failure during checking lease. Error: %O", this._context.hostName, err);
          this._context.onEphError({
            hostName: this._context.hostName,
            partitionId: "N/A",
            error: err,
            action: EPHActionStrings.checkingLeases
          });
        }
      }

      try {
        log.partitionManager("[%s] Waiting until we are done with renewing our own leases here.",
          this._context.hostName);
        await Promise.all(renewLeasePromises);
        log.error("[%s] Lease renewal is finished.", this._context.hostName);
      } catch (err) {
        log.error("[%s] An error occurred while renewing leases: %O", this._context.hostName, err);
        this._context.onEphError({
          hostName: this._context.hostName,
          partitionId: "N/A",
          error: err,
          action: EPHActionStrings.renewingLeases
        });
      }

      log.partitionManager("[%s] Check any expired leases that can be grabbed.",
        this._context.hostName);
      for (const partitionId in allLeases) {
        const possibleLease = allLeases[partitionId];
        try {
          if (await possibleLease.isExpired()) {
            if (await leaseManager.acquireLease(possibleLease)) {
              ourLeaseCount++;
            }
          }
        } catch (err) {
          log.error("[%s] An error occurred while renewing leases: %O", this._context.hostName, err);
          this._context.onEphError({
            hostName: this._context.hostName,
            partitionId: possibleLease.partitionId,
            error: err,
            action: EPHActionStrings.checkingExpiredLeases
          });
        }
      }

      log.partitionManager("[%s] Grab more leases if available and needed for load balancing.",
        this._context.hostName);
      if (leasesOwnedByOthers.length > 0) {
        const stealThisLease: Lease | undefined = this._whichLeaseToSteal(leasesOwnedByOthers, ourLeaseCount);
        if (stealThisLease) {
          try {
            if (await leaseManager.acquireLease(stealThisLease)) {
              log.partitionManager("[%s] Succeeded in stealing the lease: %O", this._context.hostName,
                stealThisLease.getInfo());
            } else {
              log.error("[%s] Failed in stealing the lease: %O", this._context.hostName,
                stealThisLease.getInfo());
            }
          } catch (err) {
            const msg = `An error occurred while stealing the lease for partition ` +
              `'${stealThisLease.partitionId}': ${err ? err.stack : JSON.stringify(err)}`;
            log.error("[%s] %s", this._context.hostName, msg);
            this._context.onEphError({
              hostName: this._context.hostName,
              partitionId: stealThisLease.partitionId,
              error: err,
              action: EPHActionStrings.stealingLease
            });
          }
        }
      }

      // update receiver with new state of lease
      for (const partitionId of Object.keys(allLeases)) {
        try {
          const updatedLease: Lease = allLeases[partitionId];
          log.partitionManager("[%s] Lease on partition '%s' owned by '%s'.", this._context.hostName,
            updatedLease.partitionId, updatedLease.owner);
          if (updatedLease.owner === this._context.hostName) {
            // check and add receiver
            await this._checkAndAddReceiver(partitionId, updatedLease);
          } else {
            // remove receiver
            await this._removeReceiver(partitionId, CloseReason.leaseLost);
          }
        } catch (err) {
          const msg = `An error occurred while adding/removing receivers on partition ` +
            `'${partitionId}': ${err ? err.stack : JSON.stringify(err)}`;
          log.error("[%s] %s", this._context.hostName, msg);
          this._context.onEphError({
            hostName: this._context.hostName,
            partitionId: partitionId,
            error: err,
            action: EPHActionStrings.partitionReceiverManagement
          });
        }
      }
      await delay(leaseManager.leaseRenewInterval);
    }
  }

  /**
   * @ignore
   */
  private async _checkAndAddReceiver(partitionId: string, lease: Lease): Promise<void> {
    const receiveHandler = this._context.receiverByPartition[partitionId];
    if (receiveHandler) {
      const isOpen: boolean = receiveHandler.isReceiverOpen;
      if (!isOpen) {
        log.error("[%s] The existing receiver with address '%s' and epoch %d is open -> %s.",
          this._context.hostName, receiveHandler.address, receiveHandler.epoch, isOpen);
        await this._removeReceiver(partitionId, CloseReason.shutdown);
      } else {
        log.partitionManager("[%s] Updating lease for receiver '%s'.", this._context.hostName,
          receiveHandler.address);
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
      // add a new receiver
      await this._createNewReceiver(partitionId, lease);
    }
  }

  /**
   * @ignore
   */
  private async _createNewReceiver(partitionId: string, lease: Lease): Promise<void> {
    const partitionContext = new PartitionContext(this._context, partitionId, lease);
    this._context.contextByPartition[partitionId] = partitionContext;
    const eventPosition = await partitionContext.getInitialOffset();
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
    const onError: OnError = (error: MessagingError | Error) => {
      log.error("[%s] Receiver '%s' received an error: %O.", this._context.hostName,
        receiveHandler.name, error);
      this._onError!(error);
    };
    receiveHandler = this._context.eventHubClient.receive(partitionId, onMessage, onError, rcvrOptions);
    log.partitionManager("[%s] Attaching receiver '%s' for partition '%s' with offset: %s",
      this._context.hostName, receiveHandler.name, partitionId, eventPosition.offset!);
    this._context.receiverByPartition[partitionId] = receiveHandler;
  }

  private async _removeReceiver(partitionId: string, reason: CloseReason): Promise<void> {
    const receiveHandler = this._context.receiverByPartition[partitionId];
    const partitionContext = this._context.contextByPartition[partitionId];
    if (receiveHandler) {
      try {
        delete this._context.receiverByPartition[partitionId];
        delete this._context.contextByPartition[partitionId];
        await receiveHandler.stop();
      } catch (err) {
        const msg = `An error occurred while closing the receiver '${receiveHandler.address}' : ` +
          `${err ? err.stack : JSON.stringify(err)}`;
        log.error("[%s] %s", this._context.hostName, msg);
      }
      if (reason !== CloseReason.leaseLost) {
        try {
          await this._context.leaseManager.releaseLease(partitionContext.lease);
        } catch (err) {
          const msg = `An error occurred while releasing the lease %s the receiver ` +
            `'${receiveHandler.address}' : ${err ? err.stack : JSON.stringify(err)} `;
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
    await Promise.all(tasks);
  }

  /**
   * @ignore
   */
  private async _reset(): Promise<void> {
    this._context.receiverByPartition = {};
    this._context.contextByPartition = {};
    this._context.blobReferenceByPartition = {};
    this._onMessage = undefined;
    this._onError = undefined;
    await this._context.eventHubClient.close();
  }

  /**
   * @ignore
   */
  private _whichLeaseToSteal(stealableLeases: Lease[], heaveLeaseCount: number): Lease | undefined {
    const countsByOwner: { [x: string]: number } = this._countLeasesByOwner(stealableLeases);
    const biggestOwner: (string | number)[][] = Object.keys(countsByOwner).map((key) => {
      return [key, countsByOwner[key]];
    }).sort((first, second) => { return (second[1] as number) - (first[1] as number); });

    let stealThisLease: Lease | undefined;

    // If the number of leases is a multiple of the number of hosts, then the desired configuration is
    // that all hosts own the name number of leases, and the difference between the "biggest" owner and
    // any other is 0.
    //
    // If the number of leases is not a multiple of the number of hosts, then the most even configuration
    // possible is for some hosts to have (leases/hosts) leases and others to have ((leases/hosts) + 1).
    // For example, for 16 partitions distributed over five hosts, the distribution would be 4, 3, 3, 3, 3,
    // or any of the possible reorderings.
    //
    // In either case, if the difference between this host and the biggest owner is 2 or more, then the
    // system is not in the most evenly-distributed configuration, so steal one lease from the biggest.
    // If there is a tie for biggest, we pick whichever appears first in the list because
    // it doesn't really matter which "biggest" is trimmed down.
    //
    // Stealing one at a time prevents flapping because it reduces the difference between the biggest and
    // this host by two at a time. If the starting difference is two or greater, then the difference cannot
    // end up below 0. This host may become tied for biggest, but it cannot become larger than the host that
    // it is stealing from.
    log.partitionManager("[%s] The biggest owner is: %o", this._context.hostName, biggestOwner);
    if ((biggestOwner[0][1] as number) - heaveLeaseCount >= 2) {
      stealThisLease = stealableLeases.find((l) => { return l.owner === biggestOwner[0][0]; }) as Lease;
    }
    log.partitionManager("[%s] The lease to be stolen is: %O", this._context.hostName, stealThisLease);
    return stealThisLease;
  }

  private _countLeasesByOwner(leases: Lease[]): Dictionary<number> {
    const result: Dictionary<number> = {};
    for (const l of leases) {
      if (result[l.owner] == undefined) {
        result[l.owner] = 0;
      } else {
        result[l.owner] += 1;
      }
    }
    log.partitionManager("[%s] Owner to lease count mapping.", this._context.hostName);
    log.partitionManager("[%s] %O", result);
    log.partitionManager("[%s] Total hosts: %d.", this._context.hostName, Object.keys(result));
    return result;
  }
}
