"use strict";
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const debugModule = require("debug");
const debug = debugModule("cerulean:lease-manager");
var LeaseManager;
(function (LeaseManager) {
    LeaseManager.acquired = "lease:acquired";
    LeaseManager.lost = "lease:lost";
    LeaseManager.released = "lease:released";
})(LeaseManager = exports.LeaseManager || (exports.LeaseManager = {}));
/**
 * Describes the Azure Storage Blob lease manager.
 * @class BlobLeaseManager
 * @extends EventEmitter
 * @implements LeaseManager
 */
class BlobLeaseManager extends events_1.EventEmitter {
    /**
     * Instantiates a BlobLeaseManager.
     * @constructor
     * @param {number} [leaseDurationInSeconds] The lease duration in seconds for which it can be held. Default value: 60.
     */
    constructor(leaseDurationInSeconds) {
        super();
        this.leaseDuration = BlobLeaseManager.defaultLeaseDuration;
        this.leases = {};
        this.leaseDuration = leaseDurationInSeconds || BlobLeaseManager.defaultLeaseDuration;
    }
    /**
     * Resets the leases dictionary to an empty object.
     */
    reset() {
        this.leases = {};
    }
    /**
     * Manages the specified blob lease.
     * @param {BlobLease} lease The lease to be managed.
     */
    manageLease(lease) {
        this.leases[lease.fullUri] = { lease: lease };
        this._acquire(lease);
    }
    /**
     * Unmanages the specified blob lease.
     * @param {BlobLease} lease The lease to be unmanaged.
     */
    async unmanageLease(lease) {
        try {
            if (this.leases[lease.fullUri].interval) {
                this._unmanage(lease);
                await lease.release();
                debug("Released " + lease.fullUri);
                lease.isHeld = false;
                this.emit(BlobLeaseManager.released, lease);
            }
        }
        catch (ignored) {
            debug("Ignoring error when unmanaging lease, as it likely means it was not held: ", ignored);
            this.emit(BlobLeaseManager.released, lease);
        }
    }
    _unmanage(lease) {
        if (this.leases[lease.fullUri].interval)
            clearInterval(this.leases[lease.fullUri].interval);
        delete this.leases[lease.fullUri].interval;
    }
    async _acquire(lease) {
        try {
            const acquireLease = async () => {
                try {
                    await lease.acquire({ leaseDuration: this.leaseDuration });
                    debug("Acquired " + lease.fullUri);
                    lease.isHeld = true;
                    this._unmanage(lease);
                    this.leases[lease.fullUri].expires = Date.now() + (this.leaseDuration * 1000);
                    this._maintain(lease);
                    this.emit(BlobLeaseManager.acquired, lease);
                }
                catch (error) {
                    const msg = `Failed to acquire lease for "${lease.fullUri}": "${error}". Will retry.`;
                    debug(msg);
                }
            };
            this.leases[lease.fullUri].interval = setInterval(acquireLease, this.leaseDuration * 1000);
            await acquireLease(); // Best-case scenario, it acquires immediately and clears the interval.
        }
        catch (err) {
            const msg = `An error occured while acquiring the lease for "${lease.fullUri}". `;
            debug(msg, err);
        }
    }
    async _maintain(lease) {
        try {
            const renewPeriod = (this.leaseDuration / 4) * 1000;
            this.leases[lease.fullUri].interval = setInterval(async () => {
                try {
                    await lease.renew({ leaseDuration: this.leaseDuration });
                    debug(`Renewed "${lease.fullUri}"`);
                    this.leases[lease.fullUri].expires = Date.now() + (this.leaseDuration * 1000);
                }
                catch (error) {
                    if (this.leases[lease.fullUri].expires < Date.now() + renewPeriod) {
                        // We"ll expire before next renewal comes in.
                        // Alert a lease loss, delay a bit, and then queue up a re-acquire.
                        this._unmanage(lease);
                        this.emit(BlobLeaseManager.lost, lease);
                        lease.isHeld = false;
                        setTimeout(() => {
                            debug(`Lease "${lease.fullUri}" lost. Attempting to re-acquire.`);
                            this._acquire(lease);
                        }, renewPeriod * 2);
                    }
                    else {
                        debug(`Failed to renew lease for "${lease.fullUri}": "${error}". Will retry.`);
                    }
                }
            }, renewPeriod);
        }
        catch (err) {
            const msg = `An error occured while renewing the lease for "${lease.fullUri}". `;
            debug(msg, err);
        }
    }
}
// Events
BlobLeaseManager.acquired = "lease:acquired";
BlobLeaseManager.lost = "lease:lost";
BlobLeaseManager.released = "lease:released";
// seconds
BlobLeaseManager.defaultLeaseDuration = 60;
exports.default = BlobLeaseManager;
