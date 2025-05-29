"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedFactory = void 0;
const ChangeFeed_js_1 = require("./ChangeFeed.js");
const constants_js_1 = require("./utils/constants.js");
const utils_common_js_1 = require("./utils/utils.common.js");
const utils_node_js_1 = require("./utils/utils.node.js");
const SegmentFactory_js_1 = require("./SegmentFactory.js");
const ShardFactory_js_1 = require("./ShardFactory.js");
const ChunkFactory_js_1 = require("./ChunkFactory.js");
const AvroReaderFactory_js_1 = require("./AvroReaderFactory.js");
const tracing_js_1 = require("./utils/tracing.js");
const LazyLoadingBlobStreamFactory_js_1 = require("./LazyLoadingBlobStreamFactory.js");
function isSegmentFactory(segmentFactoryOrMaxTransferSize) {
    return segmentFactoryOrMaxTransferSize.create !== undefined;
}
class ChangeFeedFactory {
    constructor(segmentFactoryOrMaxTransferSize) {
        let segmentFactory;
        if (segmentFactoryOrMaxTransferSize) {
            if (Number.isFinite(segmentFactoryOrMaxTransferSize)) {
                this.maxTransferSize = segmentFactoryOrMaxTransferSize;
            }
            else if (isSegmentFactory(segmentFactoryOrMaxTransferSize)) {
                segmentFactory = segmentFactoryOrMaxTransferSize;
            }
        }
        if (segmentFactory) {
            this.segmentFactory = segmentFactory;
        }
        else {
            this.segmentFactory = new SegmentFactory_js_1.SegmentFactory(new ShardFactory_js_1.ShardFactory(new ChunkFactory_js_1.ChunkFactory(new AvroReaderFactory_js_1.AvroReaderFactory(), new LazyLoadingBlobStreamFactory_js_1.LazyLoadingBlobStreamFactory(), this.maxTransferSize)));
        }
    }
    static validateCursor(containerClient, cursor) {
        if ((0, utils_common_js_1.getHost)(containerClient.url) !== cursor.UrlHost) {
            throw new Error("Cursor URL host does not match container URL host.");
        }
        if (cursor.CursorVersion !== 1) {
            throw new Error("Unsupported cursor version.");
        }
    }
    async create(blobServiceClient, continuationToken, options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChangeFeedFactory-create", options, async (updatedOptions) => {
            const containerClient = blobServiceClient.getContainerClient(constants_js_1.CHANGE_FEED_CONTAINER_NAME);
            let cursor = undefined;
            // Create cursor.
            if (continuationToken) {
                cursor = JSON.parse(continuationToken);
                ChangeFeedFactory.validateCursor(containerClient, cursor);
                options.start = (0, utils_common_js_1.parseDateFromSegmentPath)(cursor.CurrentSegmentCursor.SegmentPath);
                options.end = new Date(cursor.EndTime);
            }
            // Round start and end time if we are not using the cursor.
            else {
                options.start = (0, utils_common_js_1.floorToNearestHour)(options.start);
                options.end = (0, utils_common_js_1.ceilToNearestHour)(options.end);
            }
            // Check if Change Feed has been enabled for this account.
            const changeFeedContainerExists = await containerClient.exists({
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            });
            if (!changeFeedContainerExists) {
                throw new Error("Change Feed hasn't been enabled on this account, or is currently being enabled.");
            }
            if (options.start && options.end && options.start >= options.end) {
                return new ChangeFeed_js_1.ChangeFeed();
            }
            // Get last consumable.
            const blobClient = containerClient.getBlobClient(constants_js_1.CHANGE_FEED_META_SEGMENT_PATH);
            let blobDownloadRes;
            try {
                blobDownloadRes = await blobClient.download(undefined, undefined, {
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                });
            }
            catch (err) {
                if (err.statusCode === 404) {
                    return new ChangeFeed_js_1.ChangeFeed();
                }
                else {
                    throw err;
                }
            }
            const lastConsumable = new Date(JSON.parse(await (0, utils_node_js_1.bodyToString)(blobDownloadRes)).lastConsumable);
            // Get year paths
            const years = await (0, utils_common_js_1.getYearsPaths)(containerClient, {
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            });
            // Dequeue any years that occur before start time.
            if (options.start) {
                const startYear = options.start.getUTCFullYear();
                while (years.length > 0 && years[0] < startYear) {
                    years.shift();
                }
            }
            if (years.length === 0) {
                return new ChangeFeed_js_1.ChangeFeed();
            }
            let segments = [];
            while (segments.length === 0 && years.length !== 0) {
                segments = await (0, utils_common_js_1.getSegmentsInYear)(containerClient, years.shift(), options.start, (0, utils_common_js_1.minDate)(lastConsumable, options.end), {
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                });
            }
            if (segments.length === 0) {
                return new ChangeFeed_js_1.ChangeFeed();
            }
            const currentSegment = await this.segmentFactory.create(containerClient, segments.shift(), cursor === null || cursor === void 0 ? void 0 : cursor.CurrentSegmentCursor, {
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            });
            return new ChangeFeed_js_1.ChangeFeed(containerClient, this.segmentFactory, years, segments, currentSegment, lastConsumable, options.start, options.end);
        });
    }
}
exports.ChangeFeedFactory = ChangeFeedFactory;
//# sourceMappingURL=ChangeFeedFactory.js.map