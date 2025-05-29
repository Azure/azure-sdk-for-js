"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeFeedRange = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @internal
 * FeedRange for which change feed is being requested.
 */
class ChangeFeedRange {
    constructor(minInclusive, maxExclusive, continuationToken, epkMinHeader, epkMaxHeader) {
        this.minInclusive = minInclusive;
        this.maxExclusive = maxExclusive;
        this.continuationToken = continuationToken;
        this.epkMinHeader = epkMinHeader;
        this.epkMaxHeader = epkMaxHeader;
    }
}
exports.ChangeFeedRange = ChangeFeedRange;
//# sourceMappingURL=ChangeFeedRange.js.map