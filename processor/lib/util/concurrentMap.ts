// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as uuid from "uuid/v4";
import * as AsyncLock from "async-lock";
import { AsyncLockOptions, validateType } from "./utils";

export interface ConcurrentMapOptions {
  /**
   * @property {number} [timeout] The max timeout. Default is: 0 (never timeout).
   */
  timeout?: number;
  /**
   * @property {number} [maxPending] Maximum pending tasks. Default is: Infinity.
   */
  maxPending?: number;
}

export class ConcurrentMap<K, V> {
  private _lock: AsyncLock;
  private _maxPending: number;
  private _map: Map<K, V>;
  private _timeout: number;
  private _lockIdentifier: string = `ConcurrentMap-${uuid}`;
  constructor(entries?: ReadonlyArray<[K, V]> | null, options?: ConcurrentMapOptions) {
    if (!options) options = {};

    validateType("options.timeout", options.timeout, false, "number");
    validateType("options.maxPending", options.maxPending, false, "number");

    this._maxPending = options.maxPending || Infinity;
    this._timeout = options.timeout != undefined ? options.timeout : 0;
    this._map = new Map<K, V>(entries);
    const lockOptions: AsyncLockOptions = {
      maxPending: this._maxPending,
      timeout: this._timeout
    };
    this._lock = new AsyncLock(lockOptions);
  }

  get size(): Promise<number> {
    return this._lock.acquire(this._lockIdentifier, () => { return this._map.size; });
  }

  async get(key: K): Promise<V | undefined> {
    return await this._lock.acquire(this._lockIdentifier, () => { return this._map.get(key); });
  }

  async has(key: K): Promise<boolean> {
    return await this._lock.acquire(this._lockIdentifier, () => { return this._map.has(key); });
  }

  async set(key: K, value: V): Promise<ConcurrentMap<K, V>> {
    this._map = await this._lock.acquire(this._lockIdentifier, () => { return this._map.set(key, value); });
    return this;
  }

  /**
   * Removes the specified element from a Map object.
   * @param key The key of the element to remove from the Map object.
   * @returns {Promise<boolean>} Promise<boolean> true if an element in the Map object existed
   * and has been removed, or false if the element does not exist.
   */
  async delete(key: K): Promise<boolean> {
    return await this._lock.acquire(this._lockIdentifier, () => { return this._map.delete(key); });
  }

  async clear(): Promise<void> {
    return await this._lock.acquire(this._lockIdentifier, () => { return this._map.clear(); });
  }

  async keys(): Promise<IterableIterator<K>> {
    return await this._lock.acquire(this._lockIdentifier, () => { return this._map.keys(); });
  }

  async values(): Promise<IterableIterator<V>> {
    return await this._lock.acquire(this._lockIdentifier, () => { return this._map.values(); });
  }

  async entries(): Promise<IterableIterator<[K, V]>> {
    return await this._lock.acquire(this._lockIdentifier, () => { return this._map.entries(); });
  }
}
