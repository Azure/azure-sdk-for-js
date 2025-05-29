// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { tracingClient } from "./utils/tracing.js";
export class Segment {
    get dateTime() {
        return this._dateTime;
    }
    constructor(shards, shardIndex, dateTime, manifestPath) {
        this.manifestPath = manifestPath;
        this.shards = shards;
        this.shardIndex = shardIndex;
        this._dateTime = dateTime;
        this.shardDone = Array(shards.length).fill(false);
        this.shardDoneCount = 0;
    }
    hasNext() {
        return this.shards.length > this.shardDoneCount;
    }
    async getChange(options = {}) {
        return tracingClient.withSpan("Segment-getChange", options, async (updatedOptions) => {
            if (this.shardIndex >= this.shards.length || this.shardIndex < 0) {
                throw new Error("shardIndex invalid.");
            }
            let event = undefined;
            while (event === undefined && this.hasNext()) {
                if (this.shardDone[this.shardIndex]) {
                    this.shardIndex = (this.shardIndex + 1) % this.shards.length; // find next available shard
                    continue;
                }
                const currentShard = this.shards[this.shardIndex];
                event = await currentShard.getChange({
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                });
                if (!currentShard.hasNext()) {
                    this.shardDone[this.shardIndex] = true;
                    this.shardDoneCount++;
                }
                // Round robin with shards
                this.shardIndex = (this.shardIndex + 1) % this.shards.length;
            }
            return event;
        });
    }
    getCursor() {
        const shardCursors = [];
        for (const shard of this.shards) {
            const shardCursor = shard.getCursor();
            if (shardCursor) {
                shardCursors.push(shardCursor);
            }
        }
        return {
            SegmentPath: this.manifestPath,
            ShardCursors: shardCursors,
            CurrentShardPath: this.shards[this.shardIndex].shardPath,
        };
    }
}
//# sourceMappingURL=Segment.js.map