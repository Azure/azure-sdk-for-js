// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * `AwaitableQueue` stores items in the order that they are received.
 *
 * This differs from ordinary Queues in that `shift` returns a Promise for a value.
 * This allows a consumer of the queue to request an item that the queue does not yet have.
 *
 * @internal
 */
export class AwaitableQueue<T> {
  private readonly _items: T[];

  private readonly _resolvers: Array<(value: T) => void> = [];

  constructor() {
    this._items = [];
  }

  public size(): number {
    return this._items.length;
  }

  /**
   * Returns a Promise that will resolve with the next item in the queue.
   */
  public shift(): Promise<T> {
    const item = this._items.shift();
    if (typeof item !== "undefined") {
      return Promise.resolve(item);
    }

    return new Promise<T>((resolve) => this._resolvers.push(resolve));
  }

  /**
   * Appends new item to the queue.
   */
  public push(item: T): void {
    if (!this._resolveNextItem(item)) {
      this._items.push(item);
    }
  }

  private _resolveNextItem(item: T) {
    const resolver = this._resolvers.shift();
    if (!resolver) {
      return false;
    }

    resolver(item);
    return true;
  }
}
