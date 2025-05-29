// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { CHANGE_FEED_CONTAINER_NAME } from "./utils/constants.js";
import { Segment } from "./Segment.js";
import { bodyToString } from "./utils/utils.node.js";
import { parseDateFromSegmentPath } from "./utils/utils.common.js";
import { tracingClient } from "./utils/tracing.js";
export class SegmentFactory {
    constructor(shardFactory) {
        this.shardFactory = shardFactory;
    }
    async create(containerClient, manifestPath, cursor, options = {}) {
        return tracingClient.withSpan("SegmentFactory-create", options, async (updatedOptions) => {
            const shards = [];
            const dateTime = parseDateFromSegmentPath(manifestPath);
            const blobClient = containerClient.getBlobClient(manifestPath);
            const blobDownloadRes = await blobClient.download(undefined, undefined, {
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            });
            const blobContent = await bodyToString(blobDownloadRes);
            const segmentManifest = JSON.parse(blobContent);
            const containerPrefixLength = CHANGE_FEED_CONTAINER_NAME.length + 1; // "$blobchangefeed/"
            for (const shardPath of segmentManifest.chunkFilePaths) {
                const shardPathSubStr = shardPath.substring(containerPrefixLength);
                const shardCursor = cursor === null || cursor === void 0 ? void 0 : cursor.ShardCursors.find((x) => x.CurrentChunkPath.startsWith(shardPathSubStr));
                const shard = await this.shardFactory.create(containerClient, shardPathSubStr, shardCursor, {
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                });
                if (shard.hasNext()) {
                    shards.push(shard);
                }
            }
            let shardIndex = 0;
            if (cursor === null || cursor === void 0 ? void 0 : cursor.CurrentShardPath) {
                shardIndex = shards.findIndex((s) => s.shardPath === (cursor === null || cursor === void 0 ? void 0 : cursor.CurrentShardPath));
                if (shardIndex === -1) {
                    shardIndex = 0;
                }
            }
            return new Segment(shards, shardIndex, dateTime, manifestPath);
        });
    }
}
//# sourceMappingURL=SegmentFactory.js.map