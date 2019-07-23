// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { generate_uuid } from "rhea-promise";
import { delay, AsyncLock } from "@azure/amqp-common";
import * as log from "../log";

/**
 * Describes a map that ensures, deleting a an entry from the map is concurrency safe.
 * @internal
 * @class ConcurrentExpiringMap<TKey>
 */
export class ConcurrentExpiringMap<TKey> {
  private readonly _map: Map<TKey, Date> = new Map();
  private _cleanupScheduled: boolean = false;
  private _delayBetweenCleanupInSeconds: number;
  private _lockId: string = generate_uuid();
  private _lockStore: AsyncLock = new AsyncLock({ maxPending: 1000000 });

  constructor(options?: { delayBetweenCleanupInSeconds?: number }) {
    if (!options) options = {};
    this._delayBetweenCleanupInSeconds = options.delayBetweenCleanupInSeconds || 30;
  }

  private async _scheduleCleanup(): Promise<void> {
    if (this._cleanupScheduled || this._map.size === 0) {
      return;
    }

    await this._lockStore.acquire(this._lockId, () => {
      this._cleanupScheduled = true;
      this._collectExpiredEntries().catch((err) => {
        log.error("An error occurred while collecting expired entries: %O", err);
      });
    });
  }

  private async _collectExpiredEntries(): Promise<void> {
    if (this._map.size === 0) {
      return;
    }

    await delay(this._delayBetweenCleanupInSeconds);
    this._cleanupScheduled = false;
    for (const key of this._map.keys()) {
      if (Date.now() > this._map.get(key)!.getTime()) {
        this._map.delete(key);
        log.map("Deleted the key '%s' from the map.", key);
      }
    }
    this._scheduleCleanup().catch((err) => {
      log.error(
        "An error occurred while scheduling the cleanup, after " + "collecting expired entries: %O",
        err
      );
    });
  }

  /**
   * Sets the key and it's expiration time as the value in the map.
   * @param key The key to be set.
   * @param expiration Expiration time for the key.
   * @returns void
   */
  set(key: TKey, expiration: Date): void {
    this._map.set(key, expiration);
    this._scheduleCleanup().catch((err) => {
      log.error(
        "An error occurred while scheduling the cleanup, after " + "setting the key: '%s': %O",
        key,
        err
      );
    });
  }

  /**
   * Determines whether the key is present in the map.
   * @param key The key whose presence in the map needs to be checked.
   * @returns boolean
   */
  has(key: TKey): boolean {
    const value = this._map.get(key) as Date;
    const result: boolean = value && value.getTime() > Date.now();
    log.map("Key '%s' is present in the map? -> %s", key, result);
    return result;
  }

  /**
   * Removes an entry from the the map if present
   * @param key The key which needs to be removed from the map.
   * @returns True if the key was found and removed from the map, False otherwise
   */
  delete(key: TKey): boolean {
    log.map("Deleting key '%s' from the map", key);
    return this._map.delete(key);
  }

  /**
   * Clears all the entries from the underlying map.
   */
  clear(): void {
    log.map("Clearing the map of all the entries");
    this._map.clear();
  }
}
