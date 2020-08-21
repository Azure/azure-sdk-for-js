// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { Shard } from "./Shard";
import { SegmentCursor, ShardCursor } from "./models/ChangeFeedCursor";
import { CommonOptions } from '@azure/storage-blob';
import { AbortSignalLike } from '@azure/core-http';

/**
 * Options to configure {@link Segment.getChange} operation.
 *
 * @export
 * @interface SegmentGetChangeOptions
 */
export interface SegmentGetChangeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof SegmentGetChangeOptions
   */
  abortSignal?: AbortSignalLike;
}

export class Segment {
  private readonly _shards: Shard[];

  // Track shards that we have finished reading from.
  private _shardDone: boolean[];
  private _shardDoneCount: number;

  private _shardIndex: number;

  // Assuming the dateTime of segments is rounded to hour. If not, our logic for fetching
  // change events between a time range would be incorrect.
  private _dateTime: Date;
  public get dateTime(): Date {
    return this._dateTime;
  }

  constructor(shards: Shard[], shardIndex: number, dateTime: Date, private readonly _manifestPath: string) {
    this._shards = shards;
    this._shardIndex = shardIndex;
    this._dateTime = dateTime;

    // TODO: add polyfill for Array.prototype.fill for IE11
    this._shardDone = Array(shards.length).fill(false);
    this._shardDoneCount = 0;
  }

  public hasNext(): boolean {
    return this._shards.length > this._shardDoneCount;
  }

  public async getChange(options: SegmentGetChangeOptions = {}): Promise<BlobChangeFeedEvent | undefined> {
    if (this._shardIndex >= this._shards.length || this._shardIndex < 0) {
      throw new Error("shardIndex invalid.");
    }

    let event: BlobChangeFeedEvent | undefined = undefined;
    while (event === undefined && this.hasNext()) {
      if (this._shardDone[this._shardIndex]) {
        this._shardIndex = (this._shardIndex + 1) % this._shards.length; // find next available shard
        continue;
      }

      const currentShard = this._shards[this._shardIndex];
      event = await currentShard.getChange({ abortSignal: options.abortSignal });

      if (!currentShard.hasNext()) {
        this._shardDone[this._shardIndex] = true;
        this._shardDoneCount++;
      }
      // Round robin with shards
      this._shardIndex = (this._shardIndex + 1) % this._shards.length;
    }
    return event;
  }

  public getCursor(): SegmentCursor {
    const shardCursors: ShardCursor[] = [];
    for (const shard of this._shards) {
      const shardCursor = shard.getCursor();
      if (shardCursor) {
        shardCursors.push(shardCursor);
      }
    }

    return {
      SegmentPath: this._manifestPath,
      ShardCursors: shardCursors,
      CurrentShardPath: this._shards[this._shardIndex].shardPath
    };
  }
}
