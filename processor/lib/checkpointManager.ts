// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { CheckpointInfo } from "./checkpointInfo";
import { CompleteLease } from "./completeLease";

/**
 * @interface CheckpointManager
 * If you wish to have EventProcessorHost store checkpoints somewhere other than Azure Storage,
 * you can write your own checkpoint manager using this interface.
 *
 * The Azure Storage managers use the same storage for both lease and checkpoints, so both the
 * interfaces are implemented by the same class. You are free to do the same thing if you have
 * a unified store for both types of data.
 *
 * This interface does not specify initialization methods because we have no way of knowing what
 * information your implementation will require.
 */
export interface CheckpointManager {
  /**
   * Does the checkpoint store exist?
   * @returns {Promise<boolean>} Promise<boolean> `true` if it exists, `false` if it does not exist.
   */
  checkpointStoreExists(): Promise<boolean>;
  /**
   * Create the checkpoint store if it doesn't exist. Does nothing if it exists.
   * @returns {Promise<boolean>} Promise<void> resolves with `undefined`; rejects with an `Error`.
   */
  createCheckpointStoreIfNotExists(): Promise<void>;
  /**
   * Deletes the checkpoint store.
   * @returns {Promise<void>} Promise<void> resolves with `undefined`; rejects with an `Error`.
   */
  deleteCheckpointStore(): Promise<void>;
  /**
   * Creates the checkpoint HOLDERs for the given partitions. Does nothing for any checkpoint
   * HOLDERs that already exist.
   *
   * The semantics of this are complicated because it is possible to use the same store for both
   * leases and checkpoints (the Azure Storage implementation does so) and it is required to
   * have a lease for every partition but it is not required to have a checkpoint for a partition.
   * It is a valid scenario to never use checkpoints at all, so it is important for the store to
   * distinguish between creating the structure(s) that will hold a checkpoint and actually creating
   * a checkpoint (storing an offset/sequence number pair in the structure).
   *
   * @param {string[]} partitionIds  List of partitions to create checkpoint HOLDERs for.
   * @returns {Promise<void>} Promise<void> resolves with `undefined`; rejects with an `Error`.
   */
  createAllCheckpointsIfNotExists(partitionIds: string[]): Promise<void>;
  /**
   * Gets the checkpoint info associated with the given partition. Could return undefined if no
   * checkpoint has been created for that partition.
   * @param {string} partitionId The partitionId to get the checkpoint info for.
   * @returns {Promise<CheckpointInfo | undefined>} Promise<CheckpointInfo | undefined> Checkpoint
   * info for the given partition, or undefined if none has been previously stored.
   */
  getCheckpoint(partitionId: string): Promise<CheckpointInfo | undefined>;
  /**
   * Update the checkpoint in the store with the offset/sequenceNumber in the provided checkpoint.
   * @param {CompleteLease} lease Partition information against which to perform a checkpoint.
   * @param {CheckpointInfo} checkpoint offset/sequeceNumber to update the store with
   * @returns {Promise<boolean>} Promise<void> resolves with `undefined`; rejects with an `Error`.
   */
  updateCheckpoint(lease: CompleteLease, checkpoint: CheckpointInfo): Promise<void>;
  /**
   * Delete the stored checkpoint for the given partition. If there is no stored checkpoint for the
   * given partition, that is treated as success. Deleting the checkpoint HOLDER is allowed
   * but not required; your implementation is free to do whichever is more convenient.
   * @param {string} partitionId The partitionId to delete the checkpoint from the store.
   * @returns {Promise<void>} Promise<void> resolves with `undefined`; rejects with an `Error`.
   */
  deleteCheckpoint(partitionId: string): Promise<void>;
}
