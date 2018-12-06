// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { generate_uuid } from "rhea-promise";
import { delay, AsyncLock } from "@azure/amqp-common";
import * as log from "../log";

/**
 * Describes a map that ensures, deleting a an entry from the map is concurrency safe.
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

  private async _scheduleCleanup(): Promise<void> {
    if (this._cleanupScheduled || this._map.size < 0) {
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
}
