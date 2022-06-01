// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * `Queue` stores items in the order that they are received.
 *
 * This differs from ordinary Queues in that `shift` returns a Promise for a value.
 * This allows a consumer of the queue to request an item that the queue does not yet have.
 */
export class Queue<T> {
  private readonly _items: T[];

  private _nextItemResolve?: (item: T) => void;
  private _nextItemPromise?: Promise<T>;

  constructor(items?: T[]) {
    this._items = items ?? [];
  }

  public size(): number {
    return this._items.length;
  }

  /**
   * Returns a Promise that will resolve with the first item in the queue.
   */
  public shift(): Promise<T> {
    if (this._nextItemPromise) {
      return this._nextItemPromise;
    }

    const item = this._items.shift();
    if (typeof item !== "undefined") {
      return Promise.resolve(item);
    }

    this._nextItemPromise = new Promise<T>((resolve) => (this._nextItemResolve = resolve));

    return this._nextItemPromise;
  }

  /**
   * Appends new item to the queue.
   * @param item - the item to append
   */
  public push(item: T): void {
    if (!this._resolveNextItem(item)) {
      this._items.push(item);
    }
  }

  private _resolveNextItem(item: T): boolean {
    if (!this._nextItemResolve) {
      return false;
    }
    const resolve = this._nextItemResolve;
    this._nextItemResolve = undefined;
    this._nextItemPromise = undefined;
    resolve(item);
    return true;
  }
}
