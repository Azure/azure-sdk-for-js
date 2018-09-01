// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { CompleteLease } from "./completeLease";
import { BaseLease } from "./baseLease";

/**
 * @interface LeaseManager
 * If you wish to have EventProcessorHost store leases somewhere other than Azure Storage,
 * you can write your own lease manager using this interface.
 *
 * The Azure Storage managers use the same storage for both lease and checkpoints, so both
 * interfaces are implemented by the same class. You are free to do the same thing if you have
 * a unified store for both types of data.
 *
 * This interface does not specify initialization methods because we have no way of knowing what
 * information your implementation will require.
 */
export interface LeaseManager {
  /**
   * @property {number} leaseRenewInterval The sleep interval **in seconds** between scans.
   *
   * Allows a lease manager implementation to specify to PartitionManager how often it should
   * scan leases and renew them. In order to redistribute leases in a timely fashion after a host
   * ceases operating, we recommend a relatively short interval, such as ten seconds. Obviously it
   * should be less than half of the lease length, to prevent accidental expiration.
   */
  leaseRenewInterval: number;
  /**
   * @property {number} leaseDuration Duration of a lease **in seconds** before it expires
   * unless renewed.
   */
  leaseDuration: number;
  /**
   * Does the lease store exist?
   * @returns {Promise<boolean>} Promise<boolean> `true` if it exists, `false` if it does not exist.
   */
  leaseStoreExists(): Promise<boolean>;
  /**
   * Create the lease store if it doesn't exist. Do nothing if it does exist.
   * @returns {Promise<void>} Promise<void>  resolves with `undefined`; rejects with an `Error`.
   */
  createLeaseStoreIfNotExists(): Promise<void>;
  /**
   * Delete lease store.
   * @returns {Promise<void>} Promise<void> resolves with `undefined`; rejects with an `Error`.
   */
  deleteLeaseStore(): Promise<void>;
  /**
   * Gets the lease info for the specified partition. Can return `undefined` if no lease has been
   * created in the store for the specified partition.
   * @param {string} partitionId Partition id to get the lease for.
   * @returns {Promise<CompleteLease | undefined>} Promise<Lease | undefined>
   */
  getLease(partitionId: string): Promise<CompleteLease | undefined>;
  /**
   * Returns lightweight BaseLease for all leases, which includes name of owning host and whether
   * lease is expired. An implementation is free to return CompleteLease or its own class derived
   * from CompleteLease, but it is important that getAllLeases run as fast as possible. If it is
   * faster to obtain only the information required for a BaseLease, we heavily recommend doing that.
   * @returns {Promise<Array<BaseLease | undefined>>} Promise<Array<BaseLease | undefined>>
   */
  getAllLeases(): Promise<Array<BaseLease | undefined>>;
  /**
   * Create in the store the lease info for the given partition, if it does not exist. Do nothing
   * if it does exist in the store already.
   *
   * @param {string[]} partitionIds ids of partitions to create lease info for
   * @returns {Promise<void>} Promise<void> undefined on success, rejects on error.
   */
  createAllLeasesIfNotExists(partitionIds: string[]): Promise<void>;
  /**
   * Delete the lease info for the given partition from the store. If there is no stored lease for
   * the given partition, that is treated as success.
   *
   * @param {CompleteLease} lease Lease info for the desired partition as previously obtained from
   * `getLease()`.
   * @returns {Promise<void>} Promise<void> resolves with `undefined`; rejects with an `Error`.
   */
  deleteLease(lease: CompleteLease): Promise<void>;
  /**
   * Acquire the lease on the desired partition for this EventProcessorHost.
   *
   * Note that it is legal to acquire a lease that is already owned by another host.
   * Lease-stealing is how partitions are redistributed when additional hosts are started.
   * 
   * The existing Azure Storage implementation can experience races between two host instances
   * attempting to acquire or steal the lease at the same time. To avoid situations where two host
   * instances both believe that they own the lease, acquisition can fail without errors by
   * returning false and should do so when there is any doubt -- the worst that can happen is that
   * no host instance owns the lease for a short time. This is qualitatively different from,
   * for example, the underlying store throwing an access exception, which is an error.
   *
   * @param {CompleteLease} lease Lease info for the desired partition as previously obtained from
   * `getLease()`.
   * @returns {Promise<boolean>} Promise<boolean> `true` if acquired successfully; `false` otherwise.
   */
  acquireLease(lease: CompleteLease): Promise<boolean>;
  /**
   * Renew a lease currently held by this host.
   *
   * If the lease has been taken by another host instance (either stolen or after expiration)
   * or explicitly released, renewLease must return false. With the Azure Storage-based
   * implementation, it IS possible to renew an expired lease that has not been taken by another
   * host, so your implementation can allow that or not, whichever is convenient. If it does not,
   * renewLease should return false.
   *
   * @param {CompleteLease} lease lease to be renewed.
   * @returns {Promise<boolean>} Promise<boolean> `true` if renewed successfully; `false` otherwise.
   */
  renewLease(lease: CompleteLease): Promise<boolean>;
  /**
   * Give up a lease currently held by this host.
   *
   * If the lease has been stolen, or expired, releasing it is unnecessary, and will fail if
   * attempted.
   *
   * @param {CompleteLease} lease Lease info for the desired partition as previously obtained from
   * `getLease()`.
   * @returns {Promise<void>} Promise<void> resolves with `undefined`; rejects with an `Error`.
   */
  releaseLease(lease: CompleteLease): Promise<void>;
  /**
   * Update the store with the information in the provided lease.
   *
   * It is necessary to currently hold a lease in order to update it. If the lease has been stolen,
   * or expired, or released, it cannot be updated. Lease manager implementations should renew the
   * lease before performing the update to avoid lease expiration during the process.
   *
   * @param {CompleteLease} lease New lease information to be stored.
   * @returns {Promise<boolean>} Promise<boolean> `true` if updated successfully; `false` otherwise.
   */
  updateLease(lease: CompleteLease): Promise<boolean>;
}
