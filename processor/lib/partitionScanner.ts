// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { HostContextWithPumpManager } from "./hostContext";
import { CompleteLease } from "./completeLease";
import { BaseLease } from "./baseLease";
import { randomNumberFromInterval, EPHActionStrings } from "./util/utils";
import * as log from "./log";
import { EPHDiagnosticInfo } from "./modelTypes";

export class PartitionScanner {
  private _context: HostContextWithPumpManager;
  private _allLeaseStates: BaseLease[] = [];
  private _desiredCount: number = 0;
  private _unownedCount: number = 0;
  private _leaseOwnedByOthers: Map<string, BaseLease> = new Map<string, BaseLease>();

  constructor(context: HostContextWithPumpManager) {
    this._context = context;
  }

  async scan(isFirst: boolean): Promise<boolean> {
    const hostName = this._context.hostName;
    const withHost = this._context.withHost;
    let didSteal = false;
    try {
      this._reset();
      log.partitionScanner(withHost("Stating a new iteration to scan partitions."));
      log.partitionScanner(withHost("Getting lease states to find out who owns what."));
      await this._getAllLeaseStates();
      log.partitionScanner(withHost("Sorting leases to find out the desired partition count."));
      const ourLeasesCount: number = await this._sortLeasesAndCalculateDesiredCount(isFirst);
      log.partitionScanner(withHost("Our lease count: %d."), ourLeasesCount);
      const attemptToAcquire: number = this._desiredCount - ourLeasesCount;
      log.partitionScanner(withHost("Attempting to acquire %d leases in parallel starting from " +
        "position 0."), ourLeasesCount);
      const remainingNeeded = await this._acquireExpiredInParallel(0, attemptToAcquire);
      log.partitionScanner(withHost("Looking to steal: %d."), remainingNeeded);
      if (remainingNeeded > 0) {
        const stealThese = await this._findLeasesToSteal(remainingNeeded);
        log.partitionScanner(withHost("Number of lease found to steal: %d."), stealThese.length);
        didSteal = await this._stealLeases(stealThese);
        log.partitionScanner(withHost("Have succesfully stolen: %d leases -> %s."),
          stealThese.length, didSteal);
      } else {
        log.partitionScanner(withHost("No need to scan further since remaining needed: %d."),
          remainingNeeded);
      }
    } catch (err) {
      didSteal = false;
      const msg = `An error occurred while scanning leases: ` +
        `${err ? err.stack : JSON.stringify(err)}.`;
      log.error(withHost("%s"), hostName, msg);
      const info: EPHDiagnosticInfo = {
        action: EPHActionStrings.scanningLeases,
        error: new Error(msg),
        hostName: hostName,
        partitionId: "N/A"
      };
      this._context.onEphError(info);
    }
    return didSteal;
  }

  private _reset(): void {
    this._allLeaseStates = [];
    this._desiredCount = 0;
    this._unownedCount = 0;
    this._leaseOwnedByOthers = new Map<string, BaseLease>();
  }


  private async _getAllLeaseStates(): Promise<void> {
    const result = await this._context.leaseManager.getAllLeases();
    this._allLeaseStates = result.sort();
    log.partitionScanner(this._context.withHost("State of all the leases that we know about:\n%O"),
      this._allLeaseStates);
    return;
  }

  private _sortLeasesAndCalculateDesiredCount(isFirst: boolean): number {
    const hostName: string = this._context.hostName;
    const withHost = this._context.withHost;
    log.partitionScanner(withHost("Accounting input: allLeaseStates count is: %d"),
      this._allLeaseStates.length);
    const uniqueOwners: Set<string> = new Set<string>();
    uniqueOwners.add(hostName);
    let ourLeasesCount = 0;
    this._unownedCount = 0;
    for (const lease of this._allLeaseStates) {
      const ownedByUs: boolean = lease.isOwned && lease.owner === hostName;
      if (lease.isOwned && lease.owner) {
        uniqueOwners.add(lease.owner);
      } else {
        this._unownedCount++;
      }
      if (ownedByUs) {
        ourLeasesCount++;
      } else if (lease.isOwned) {
        this._leaseOwnedByOthers.set(lease.partitionId, lease);
      }
    }
    const hostCount = uniqueOwners.size;
    const countPerHost = Math.floor(this._allLeaseStates.length / hostCount);
    this._desiredCount = isFirst ? 1 : countPerHost;
    if (!isFirst && this._unownedCount > 0
      && this._unownedCount < hostCount
      && this._allLeaseStates.length % hostCount !== 0) {
      // distribute leftovers
      this._desiredCount++;
    }

    const sortedHosts: Array<string> = Array.from(uniqueOwners).sort();
    let hostOrdinal: number = -1;
    let startingPoint: number = 0;
    if (isFirst) {
      // If the entire system is starting up, the list of hosts is probably not complete and we
      // can not really compute a meaningful hostOrdinal. But we only want hostOrdinal to
      // calculate startingPoint. Instead, just randomly select a startingPoint.
      startingPoint = randomNumberFromInterval(0, this._allLeaseStates.length - 1);
    } else {
      for (hostOrdinal = 0; hostOrdinal > sortedHosts.length; hostOrdinal++) {
        if (sortedHosts[hostOrdinal] === hostName) {
          break;
        }
      }
      startingPoint = countPerHost * hostOrdinal;
    }
    // rotate this._allLeaseStates.
    log.partitionScanner(withHost("Host ordinal: %d. Rotating leases to start at: %d."),
      hostOrdinal, startingPoint);
    if (startingPoint !== 0) {
      const rotatedList: Array<BaseLease> = [];
      for (let i = 0; i < this._allLeaseStates.length; i++) {
        const index = (i + startingPoint) % this._allLeaseStates.length;
        rotatedList.push(this._allLeaseStates[index]);
      }
      this._allLeaseStates = rotatedList;
    }
    log.partitionScanner(withHost("Host count is %d. So Desired partition count is %d."), hostCount,
      this._desiredCount);
    log.partitionScanner(withHost("our leases count: %d v/s leases owned by others: %d."),
      ourLeasesCount, this._leaseOwnedByOthers.size);
    return ourLeasesCount;
  }

  private _findExpiredLeases(startAt: number, endAt: number): BaseLease[] {
    const withHost = this._context.withHost;
    const expiredLeases: BaseLease[] = [];
    log.partitionScanner(withHost("Finding expired leases from '%s': [%d] upto '%s': [%d]"),
      this._allLeaseStates[startAt].partitionId, startAt,
      endAt < this._allLeaseStates.length ? this._allLeaseStates[endAt].partitionId : "end", endAt);
    for (const lease of this._allLeaseStates.slice(startAt, endAt)) {
      if (!lease.isOwned) {
        expiredLeases.push(lease);
      }
    }
    log.partitionScanner(withHost("Found in range: %d"), expiredLeases.length);
    return expiredLeases;
  }

  private _acquireExpiredInParallel(startAt: number, needed: number): Promise<number> {
    const hostName = this._context.hostName;
    const withHost = this._context.withHost;
    const withHostAndPartition = this._context.withHostAndPartition;
    const resultPromise = Promise.resolve(needed);
    if (startAt < this._allLeaseStates.length) {
      const lease = this._allLeaseStates[startAt];
      const partitionId = lease ? lease.partitionId : "undefined";
      log.partitionScanner(withHost("Examining chunk at '%s': [%d], needed %d."),
        partitionId, startAt, needed);
    } else {
      log.partitionScanner(withHost("Examining chunk skipping, startAt is off end: %d"), startAt);
    }

    if (needed > 0 && this._unownedCount > 0 && startAt < this._allLeaseStates.length) {
      let runningNeeded = needed;
      const endAt = Math.min(startAt + needed, this._allLeaseStates.length);
      log.partitionScanner(withHost("Finding expired leases from inclusive position range %d - %d"),
        startAt, endAt);
      const getThese: BaseLease[] = this._findExpiredLeases(startAt, endAt);
      const leaseManager = this._context.leaseManager;
      const getTheseResult: Promise<void>[] = [];
      for (const thisLease of getThese) {
        let lease: CompleteLease | undefined = undefined;
        const getThisPromise = leaseManager.getLease(thisLease.partitionId).then((receivedLease) => {
          lease = receivedLease;
          if (lease) {
            return leaseManager.acquireLease(lease);
          } else {
            return false;
          }
        }).then((acquired) => {
          if (acquired) {
            runningNeeded--;
            log.partitionScanner(withHostAndPartition(thisLease, "Acquired unowned/expired lease."));
            if (this._leaseOwnedByOthers.has(lease!.partitionId)) {
              this._leaseOwnedByOthers.delete(lease!.partitionId);
              this._unownedCount--;
            }
            return this._context.pumpManager.addPump(lease!);
          } else if (lease) {
            this._leaseOwnedByOthers.set(lease.partitionId, lease);
          }
          return;
        }).catch((err) => {
          const msg = `An error occurred while getting/acquiring lease for partitionId ` +
            `'${thisLease.partitionId}': ${err ? err.stack : JSON.stringify(err)}`;
          log.error(withHostAndPartition(thisLease, "%s"), msg);
          const info: EPHDiagnosticInfo = {
            action: EPHActionStrings.checkingLeases,
            error: new Error(msg),
            hostName: hostName,
            partitionId: thisLease.partitionId
          };
          this._context.onEphError(info);
        });
        getTheseResult.push(getThisPromise);
      }

      return resultPromise.then(() => {
        return Promise.all(getTheseResult).catch((err) => {
          const msg = `An error occurred while getting/acquiring leases for some partitionId: ` +
            `${err ? err.stack : JSON.stringify(err)}`;
          log.error(withHost("%s"), msg);
        }).then(() => {
          log.partitionScanner(withHost("Calling _acquireExpiredInParallel with startAt %d, " +
            "needed %d."), startAt, needed);
          return this._acquireExpiredInParallel(endAt, runningNeeded);
        });
      });
    } else {
      log.partitionScanner(withHost("Short circuit: needed is %d, unowned is: %d, off end -> %s."),
        needed, this._unownedCount, startAt < this._allLeaseStates.length);
    }

    return resultPromise;
  }

  private _findLeasesToSteal(stealAsk: number): BaseLease[] {
    // Generate a map of hostnames and owned counts.
    const hostOwns: Map<string, number> = new Map<string, number>();
    for (const lease of this._leaseOwnedByOthers.values()) {
      if (hostOwns.has(lease.owner)) {
        const newCount = hostOwns.get(lease.owner)! + 1;
        hostOwns.set(lease.owner, newCount);
      } else {
        hostOwns.set(lease.owner, 1);
      }
    }

    // Extract hosts which own more than the desired count
    const bigOwners: Array<string> = [];
    const withHost = this._context.withHost;
    for (const entry of hostOwns.entries()) {
      if (entry[1] > this._desiredCount) {
        bigOwners.push(entry[0]);
        log.partitionScanner(withHost("Big owner %s has %d"), entry[0], entry[1]);
      }
    }
    const stealLeases: BaseLease[] = [];
    if (bigOwners.length > 0) {
      // Randomly pick one of the big owners
      const index: number = randomNumberFromInterval(0, bigOwners.length);
      const bigVictim: string = bigOwners[index];
      const victimExtra = hostOwns.get(bigVictim)! - this._desiredCount - 1;
      const stealCount = Math.min(victimExtra, stealAsk);
      log.partitionScanner(withHost("Stealing %d from %s."), stealCount, bigVictim);

      // Grab stealCount partitions owned by bigVictim and return the leases.
      for (const candidate of this._allLeaseStates) {
        if (candidate.owner != undefined && candidate.owner === bigVictim) {
          stealLeases.push(candidate);
          if (stealLeases.length >= stealCount) {
            break;
          }
        }
      }
    } else {
      log.partitionScanner(withHost("No big owners found, skipping steal."));
    }
    return stealLeases;
  }

  private async _stealLeases(stealThese: BaseLease[]): Promise<boolean> {
    const withHostAndPartition = this._context.withHostAndPartition;
    if (stealThese.length > 0) {
      const steals: Promise<boolean>[] = [];
      for (const stealableLease of stealThese) {
        let lease: CompleteLease | undefined = undefined;
        const tryStealPromise: Promise<boolean> =
          this._context.leaseManager.getLease(stealableLease.partitionId).then((receivedLease) => {
            lease = receivedLease;
            if (receivedLease) {
              return this._context.leaseManager.acquireLease(receivedLease);
            } else {
              return false;
            }
          }).then((acquired) => {
            if (acquired) {
              this._context.pumpManager.addPump(lease!).catch();
              log.partitionScanner(withHostAndPartition(stealableLease,
                "Successfully stolen the lease."));
            }
            return acquired;
          }).catch((err) => {
            const msg = `An error occurred while stealing the lease for partitionId ` +
              `'${stealableLease.partitionId}': ${err ? err.stack : JSON.stringify(err)}`;
            log.error(withHostAndPartition(stealableLease, "%s"), msg);
            const info: EPHDiagnosticInfo = {
              action: EPHActionStrings.stealingLease,
              partitionId: stealableLease.partitionId,
              hostName: this._context.hostName,
              error: err
            };
            this._context.onEphError(info);
            return false;
          });
        steals.push(tryStealPromise);
      }

      const stealResult = await Promise.all<boolean>(steals);
      // If we found at least one case where the lease could not be stolen then `.some()`
      // returns true. The final result will be true if `.some()` was not able to find a single
      // lease that could not be stolen.
      const result = !stealResult.some((x) => { return !x; });
      return result;
    } else {
      return false;
    }
  }
}
