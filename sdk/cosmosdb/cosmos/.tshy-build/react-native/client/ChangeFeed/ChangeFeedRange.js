// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @internal
 * FeedRange for which change feed is being requested.
 */
export class ChangeFeedRange {
    constructor(minInclusive, maxExclusive, continuationToken, epkMinHeader, epkMaxHeader) {
        this.minInclusive = minInclusive;
        this.maxExclusive = maxExclusive;
        this.continuationToken = continuationToken;
        this.epkMinHeader = epkMinHeader;
        this.epkMaxHeader = epkMaxHeader;
    }
}
//# sourceMappingURL=ChangeFeedRange.js.map