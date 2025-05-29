"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedRangeInternal = exports.FeedRange = void 0;
const index_js_1 = require("../../request/index.js");
/**
 * Specifies a feed range for the changefeed.
 */
class FeedRange {
    /**
     * @internal
     */
    constructor(minInclusive, maxExclusive) {
        // only way to explictly block users from creating FeedRange directly in JS
        if (new.target === FeedRange) {
            throw new index_js_1.ErrorResponse("Cannot instantiate abstract class FeedRange");
        }
        this.minInclusive = minInclusive;
        this.maxExclusive = maxExclusive;
    }
}
exports.FeedRange = FeedRange;
/**
 * @hidden
 * Specifies a feed range for the changefeed.
 */
class FeedRangeInternal extends FeedRange {
    /* eslint-disable @typescript-eslint/no-useless-constructor */
    constructor(minInclusive, maxExclusive) {
        super(minInclusive, maxExclusive);
    }
}
exports.FeedRangeInternal = FeedRangeInternal;
//# sourceMappingURL=FeedRange.js.map