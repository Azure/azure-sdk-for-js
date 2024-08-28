// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class MultiMap<K, V> {
  private _map: Map<K, V[]>;

  constructor() {
    this._map = new Map<K, V[]>();
  }

  set(key: K, value: V): void {
    let values = this._map.get(key);
    if (!values) {
      values = [];
      this._map.set(key, values);
    }
    values.push(value);
  }

  get(key: K): V[] {
    return this._map.get(key) || [];
  }

  has(key: K): boolean {
    return this._map.has(key);
  }

  delete(key: K, value: V): void {
    const values = this._map.get(key);
    if (!values) {
      return;
    }
    if (values.includes(value)) {
      this._map.set(
        key,
        values.filter((v) => value !== v),
      );
    }
  }

  deleteAll(key: K): void {
    this._map.delete(key);
  }

  hasValue(key: K, value: V): boolean {
    const values = this._map.get(key);
    if (!values) {
      return false;
    }
    return values.includes(value);
  }

  get size(): number {
    return this._map.size;
  }

  [Symbol.iterator](): Iterator<[K, V[]]> {
    return this._map[Symbol.iterator]();
  }

  keys(): IterableIterator<K> {
    return this._map.keys();
  }

  values(): Iterable<V> {
    const result: V[] = [];
    for (const key of this.keys()) {
      result.push(...this.get(key));
    }
    return result;
  }

  clear(): void {
    this._map.clear();
  }
}
