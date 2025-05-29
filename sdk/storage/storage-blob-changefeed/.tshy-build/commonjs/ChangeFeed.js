"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeed = void 0;
const utils_common_js_1 = require("./utils/utils.common.js");
const tracing_js_1 = require("./utils/tracing.js");
class ChangeFeed {
    constructor(containerClient, segmentFactory, years, segments, currentSegment, lastConsumable, startTime, endTime) {
        this.containerClient = containerClient;
        this.segmentFactory = segmentFactory;
        this.years = years || [];
        this.segments = segments || [];
        this.currentSegment = currentSegment;
        this.lastConsumable = lastConsumable;
        this.startTime = startTime;
        this.endTime = endTime;
        if (this.lastConsumable) {
            this.end = (0, utils_common_js_1.minDate)(this.lastConsumable, this.endTime);
        }
    }
    async advanceSegmentIfNecessary(options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChangeFeed-advanceSegmentIfNecessary", options, async (updatedOptions) => {
            if (!this.currentSegment) {
                throw new Error("Empty Change Feed shouldn't call this function.");
            }
            // If the current segment has more Events, we don't need to do anything.
            if (this.currentSegment.hasNext()) {
                return;
            }
            // If the current segment is completed, remove it
            if (this.segments.length > 0) {
                this.currentSegment = await this.segmentFactory.create(this.containerClient, this.segments.shift(), undefined, {
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                });
            }
            // If segments is empty, refill it
            else if (this.segments.length === 0 && this.years.length > 0) {
                const year = this.years.shift();
                this.segments = await (0, utils_common_js_1.getSegmentsInYear)(this.containerClient, year, this.startTime, this.end, {
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                });
                if (this.segments.length > 0) {
                    this.currentSegment = await this.segmentFactory.create(this.containerClient, this.segments.shift(), undefined, {
                        abortSignal: options.abortSignal,
                        tracingOptions: updatedOptions.tracingOptions,
                    });
                }
                else {
                    this.currentSegment = undefined;
                }
            }
        });
    }
    hasNext() {
        // Empty ChangeFeed, using currentSegment as the indicator.
        if (!this.currentSegment) {
            return false;
        }
        if (this.segments.length === 0 && this.years.length === 0 && !this.currentSegment.hasNext()) {
            return false;
        }
        return this.currentSegment.dateTime < this.end;
    }
    async getChange(options = {}) {
        return tracing_js_1.tracingClient.withSpan("ChangeFeed-getChange", options, async (updatedOptions) => {
            let event = undefined;
            while (event === undefined && this.hasNext()) {
                event = await this.currentSegment.getChange({
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                });
                await this.advanceSegmentIfNecessary({
                    abortSignal: options.abortSignal,
                    tracingOptions: updatedOptions.tracingOptions,
                });
            }
            return event;
        });
    }
    getCursor() {
        var _a;
        if (!this.currentSegment) {
            throw new Error("Empty Change Feed shouldn't call this function.");
        }
        return {
            CursorVersion: 1,
            UrlHost: (0, utils_common_js_1.getHost)(this.containerClient.url),
            EndTime: (_a = this.endTime) === null || _a === void 0 ? void 0 : _a.toJSON(),
            CurrentSegmentCursor: this.currentSegment.getCursor(),
        };
    }
}
exports.ChangeFeed = ChangeFeed;
//# sourceMappingURL=ChangeFeed.js.map