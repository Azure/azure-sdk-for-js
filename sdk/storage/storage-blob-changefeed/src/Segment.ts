import { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent";
import { Shard } from "./Shard";
import { SegmentCursor, ShardCursor } from "./models/ChangeFeedCursor";

export class Segment {
  private readonly _shards: Shard[];

  // Track shards that we have finished reading from.
  private _shardDone: boolean[];
  private _shardDoneCount: number;

  private _shardIndex: number;

  private _finalized: boolean;
  public get finalized(): boolean {
    return this._finalized;
  }

  // Assuming the dateTime of segments is rounded to hour. If not, our logic for fetching
  // change events between a time range would be incorrect.
  private _dateTime: Date;
  public get dateTime(): Date {
    return this._dateTime;
  }

  constructor(shards: Shard[], shardIndex: number, dateTime: Date, finalized: boolean) {
    this._shards = shards;
    this._shardIndex = shardIndex;
    this._dateTime = dateTime;
    this._finalized = finalized;

    // TODO: add polyfill for Array.prototype.fill for IE11
    this._shardDone = Array(shards.length).fill(false);
    this._shardDoneCount = 0;
  }

  public hasNext(): boolean {
    return this._shards.length > this._shardDoneCount;
  }

  public async getChange(): Promise<BlobChangeFeedEvent | undefined> {
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
      event = await currentShard.getChange();

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
      shardCursors.push(shard.getCursor());
    }

    return {
      shardCursors,
      shardIndex: this._shardIndex,
      segmentTime: this._dateTime.toJSON()
    };
  }
}
