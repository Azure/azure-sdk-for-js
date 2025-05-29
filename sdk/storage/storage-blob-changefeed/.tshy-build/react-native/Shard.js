// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { tracingClient } from "./utils/tracing.js";
export class Shard {
    constructor(containerClient, chunkFactory, chunks, currentChunk, shardPath) {
        this.shardPath = shardPath;
        this.containerClient = containerClient;
        this.chunkFactory = chunkFactory;
        this.chunks = chunks;
        this.currentChunk = currentChunk;
    }
    hasNext() {
        return (this.chunks.length > 0 || (this.currentChunk !== undefined && this.currentChunk.hasNext()));
    }
    async getChange(options = {}) {
        return tracingClient.withSpan("Shard-getChange", options, async (updatedOptions) => {
            let event = undefined;
            while (event === undefined && this.hasNext()) {
                event = await this.currentChunk.getChange();
                // Remove currentChunk if it doesn't have more events.
                if (!this.currentChunk.hasNext() && this.chunks.length > 0) {
                    this.currentChunk = await this.chunkFactory.create(this.containerClient, this.chunks.shift(), undefined, undefined, {
                        abortSignal: options.abortSignal,
                        tracingOptions: updatedOptions.tracingOptions,
                    });
                }
            }
            return event;
        });
    }
    getCursor() {
        return this.currentChunk === undefined
            ? undefined
            : {
                CurrentChunkPath: this.currentChunk.chunkPath,
                BlockOffset: this.currentChunk.blockOffset,
                EventIndex: this.currentChunk.eventIndex,
            };
    }
}
//# sourceMappingURL=Shard.js.map