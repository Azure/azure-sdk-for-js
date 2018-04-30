// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventEmitter } from "events";
import * as debugModule from "debug";
import { BlobLease, Lease } from "./blobLease";
import { Dictionary } from "../eventData";
const debug = debugModule("azure:event-hubs:eph:lease-manager");

/**
 * Interface describing the Lease with renew interval and expiry time.
 * @interface LeaseWithDuration
 */
export interface LeaseWithDuration {
  /**
   * @property {Lease} lease - The actual lease.
   */
  lease: Lease;
  /**
   * @property {NodeJS.Timer} [interval] The renew interval.
   */
  interval?: NodeJS.Timer;
  /**
   * @property {number} [expires] The time in which the lease expires.
   */
  expires?: number;
}

/**
 * Describes the LeaseManager module. It is a placeholder for defining some constants pertaining to
 * the lease manager.
 * @namespace LeaseManager
 */
export namespace LeaseManager {
  /**
   * @constant {string} acquired Describes the value "lease:acquired" for the event name when the
   * lease is acquired.
   */
  export const acquired = "lease:acquired";
  /**
   * @constant {string} lost Describes the value "lease:lost" for the event name when the
   * lease is lost.
   */
  export const lost = "lease:lost";
  /**
   * @constant {string} released Describes the value "lease:released" for the event name when the
   * lease is released.
   */
  export const released = "lease:released";
  /**
   * @constant {string} defaultLeaseDuration Describes the value in seconds for the default lease
   * duration after which the lease expires. Default: 15 seconds.
   */
  export let defaultLeaseDuration: number = 15;
}

/**
 * Interface describing the LeaseManager. You can implement your own LeaseManager.
 * @interface
 */
export interface LeaseManager extends EventEmitter {
  /**
   * @property {number} leaseDuration The amount of time for which the lease can be held.
   */
  leaseDuration: number;
  /**
   * @property {object} leases A dictionary of leases that the manager is currently managing.
   */
  leases: Dictionary<LeaseWithDuration>;
  /**
   * Resets the dictionary of leases to an empty object.
   * @method reset
   */
  reset(): void;
  /**
   * Manages the specified lease.
   * @param {Lease} lease The lease to be managed.
   */
  manageLease(lease: Lease): void;
  /**
   * Unmanages the specified lease.
   * @param {Lease} lease The lease to be unmanaged.
   */
  unmanageLease(lease: Lease): Promise<void>;
}

/**
 * Describes the Azure Storage Blob lease manager.
 * @class BlobLeaseManager
 * @extends EventEmitter
 * @implements LeaseManager
 */
export class BlobLeaseManager extends EventEmitter implements LeaseManager {
  // Events
  static acquired: string = "lease:acquired";
  static lost: string = "lease:lost";
  static released: string = "lease:released";
  static renewed: string = "lease:renewed";
  // seconds
  static defaultLeaseDuration: number = 15;

  leaseDuration: number = BlobLeaseManager.defaultLeaseDuration;
  leases: Dictionary<LeaseWithDuration>;
  /**
   * @property {string} hostName The associated hostName with the lease manager.
   */
  hostName: string;

  /**
   * Instantiates a BlobLeaseManager.
   * @constructor
   * @param {number} [leaseDurationInSeconds] The lease duration in seconds for which it
   * can be held. Default value: 60.
   */
  constructor(hostName: string, leaseDurationInSeconds?: number) {
    super();
    this.leases = {};
    this.leaseDuration = leaseDurationInSeconds || BlobLeaseManager.defaultLeaseDuration;
    this.hostName = hostName;
  }

  /**
   * Resets the leases dictionary to an empty object.
   */
  reset(): void {
    this.leases = {};
  }

  /**
   * Manages the specified blob lease.
   * @param {BlobLease} lease The lease to be managed.
   */
  manageLease(lease: BlobLease): void {
    this.leases[lease.fullUri] = { lease: lease };
    this._acquire(lease).catch((err) => {
      debug("[%s] An error occured while acquiring the lease '%s': %O",
        this.hostName, lease.fullUri, err);
    });
  }

  /**
   * Unmanages the specified blob lease.
   * @param {BlobLease} lease The lease to be unmanaged.
   */
  async unmanageLease(lease: BlobLease): Promise<void> {
    try {
      if (this.leases && this.leases[lease.fullUri] && this.leases[lease.fullUri].interval) {
        this._unmanage(lease);
        await lease.release();
        debug("[%s] Released lease: '%s'.", this.hostName, lease.fullUri);
        lease.isHeld = false;
        this.emit(BlobLeaseManager.released, lease);
      }
    } catch (ignored) {
      debug("[%s] Ignoring error when unmanaging lease, as it likely means it was not held: %O",
        this.hostName, ignored);
      this.emit(BlobLeaseManager.released, lease);
    }
  }

  private _unmanage(lease: BlobLease): void {
    if (this.leases && this.leases[lease.fullUri] && this.leases[lease.fullUri].interval) {
      clearInterval(this.leases[lease.fullUri].interval as NodeJS.Timer);
      delete this.leases[lease.fullUri].interval;
    }
  }

  private async _acquire(lease: BlobLease): Promise<void> {
    try {
      const acquireLease = async (): Promise<void> => {
        try {
          await lease.acquire({ leaseDuration: this.leaseDuration });
          debug("[%s] Acquired lease: '%s'.", this.hostName, lease.fullUri);
          lease.isHeld = true;
          this._unmanage(lease);
          this.leases[lease.fullUri].expires = Date.now() + (this.leaseDuration * 1000);
          this._maintain(lease).catch((err) => {
            debug("[%s] An error occured while maintaining the lease '%s': %O",
              this.hostName, lease.fullUri, err);
          });
          this.emit(BlobLeaseManager.acquired, lease);
        } catch (error) {
          debug("[%s] Failed to acquire lease for '%s': %O. Will retry.",
            this.hostName, lease.fullUri, error);
        }
      };
      this.leases[lease.fullUri].interval = setInterval(acquireLease, this.leaseDuration * 1000);
      await acquireLease(); // Best-case scenario, it acquires immediately and clears the interval.
    } catch (err) {
      debug("[%s] An error occured while acquiring the lease '%s': %O.",
        this.hostName, lease.fullUri, err);
    }
  }

  private async _maintain(lease: BlobLease): Promise<void> {
    try {
      const renewPeriod = (this.leaseDuration / 4) * 1000;
      this.leases[lease.fullUri].interval = setInterval(async () => {
        try {
          await lease.renew({ leaseDuration: this.leaseDuration });
          debug("[%s] Renewed '%s'.", this.hostName, lease.fullUri);
          this.leases[lease.fullUri].expires = Date.now() + (this.leaseDuration * 1000);
          this.emit(BlobLeaseManager.renewed, lease);
        } catch (error) {
          if ((this.leases[lease.fullUri].expires as number) < Date.now() + renewPeriod) {
            // We"ll expire before next renewal comes in.
            // Alert a lease loss, delay a bit, and then queue up a re-acquire.
            this._unmanage(lease);
            this.emit(BlobLeaseManager.lost, lease);
            lease.isHeld = false;
            setTimeout(() => {
              debug("[%s] Lease '%s' lost. Attempting to re-acquire.",
                this.hostName, lease.fullUri);
              this._acquire(lease).catch((err) => {
                debug("[%s] An error occured while acquiring the lease '%s': %O",
                  this.hostName, lease.fullUri, err);
              });
            }, renewPeriod * 2);

          } else {
            debug("[%s] Failed to renew lease for '%s': %O. Will retry.",
              this.hostName, lease.fullUri, error);
          }
        }
      }, renewPeriod);
    } catch (err) {
      debug("[%s] An error occured while renewing the lease for '%s': %O.",
        this.hostName, lease.fullUri, err);
    }
  }
}
