// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { __asyncValues } from "tslib";
import { Shard } from "./Shard.js";
import { tracingClient } from "./utils/tracing.js";
export class ShardFactory {
    constructor(chunkFactory) {
        this.chunkFactory = chunkFactory;
    }
    async create(containerClient, shardPath, shardCursor, options = {}) {
        return tracingClient.withSpan("ShardFactory-create", options, async (updatedOptions) => {
            var _a, e_1, _b, _c;
            const chunks = [];
            const blockOffset = (shardCursor === null || shardCursor === void 0 ? void 0 : shardCursor.BlockOffset) || 0;
            const eventIndex = (shardCursor === null || shardCursor === void 0 ? void 0 : shardCursor.EventIndex) || 0;
            try {
                for (var _d = true, _e = __asyncValues(containerClient.listBlobsFlat({
                    prefix: shardPath,
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                })), _f; _f = await _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const blobItem = _c;
                    chunks.push(blobItem.name);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            const currentChunkPath = shardCursor === null || shardCursor === void 0 ? void 0 : shardCursor.CurrentChunkPath;
            let chunkIndex = -1;
            let currentChunk = undefined;
            // Chunks can be empty right after hour flips.
            if (chunks.length !== 0) {
                // Fast forward to current Chunk
                if (currentChunkPath) {
                    for (let i = 0; i < chunks.length; i++) {
                        if (chunks[i] === currentChunkPath) {
                            chunkIndex = i;
                            break;
                        }
                    }
                    if (chunkIndex === -1) {
                        throw new Error(`Chunk ${currentChunkPath} not found.`);
                    }
                }
                else {
                    chunkIndex = 0;
                }
                // Fast forward to current Chunk.
                if (chunkIndex > 0) {
                    chunks.splice(0, chunkIndex);
                }
                currentChunk = await this.chunkFactory.create(containerClient, chunks.shift(), blockOffset, eventIndex, {
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                });
            }
            return new Shard(containerClient, this.chunkFactory, chunks, currentChunk, shardPath);
        });
    }
}
//# sourceMappingURL=ShardFactory.js.map