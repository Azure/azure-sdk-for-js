"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentFactory = void 0;
const constants_js_1 = require("./utils/constants.js");
const Segment_js_1 = require("./Segment.js");
const utils_node_js_1 = require("./utils/utils.node.js");
const utils_common_js_1 = require("./utils/utils.common.js");
const tracing_js_1 = require("./utils/tracing.js");
class SegmentFactory {
    constructor(shardFactory) {
        this.shardFactory = shardFactory;
    }
    async create(containerClient, manifestPath, cursor, options = {}) {
        return tracing_js_1.tracingClient.withSpan("SegmentFactory-create", options, async (updatedOptions) => {
            const shards = [];
            const dateTime = (0, utils_common_js_1.parseDateFromSegmentPath)(manifestPath);
            const blobClient = containerClient.getBlobClient(manifestPath);
            const blobDownloadRes = await blobClient.download(undefined, undefined, {
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            });
            const blobContent = await (0, utils_node_js_1.bodyToString)(blobDownloadRes);
            const segmentManifest = JSON.parse(blobContent);
            const containerPrefixLength = constants_js_1.CHANGE_FEED_CONTAINER_NAME.length + 1; // "$blobchangefeed/"
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
            return new Segment_js_1.Segment(shards, shardIndex, dateTime, manifestPath);
        });
    }
}
exports.SegmentFactory = SegmentFactory;
//# sourceMappingURL=SegmentFactory.js.map