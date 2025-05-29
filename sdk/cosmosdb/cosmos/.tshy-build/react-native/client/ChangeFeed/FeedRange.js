// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ErrorResponse } from "../../request/index.js";
/**
 * Specifies a feed range for the changefeed.
 */
export class FeedRange {
    /**
     * @internal
     */
    constructor(minInclusive, maxExclusive) {
        // only way to explictly block users from creating FeedRange directly in JS
        if (new.target === FeedRange) {
            throw new ErrorResponse("Cannot instantiate abstract class FeedRange");
        }
        this.minInclusive = minInclusive;
        this.maxExclusive = maxExclusive;
    }
}
/**
 * @hidden
 * Specifies a feed range for the changefeed.
 */
export class FeedRangeInternal extends FeedRange {
    /* eslint-disable @typescript-eslint/no-useless-constructor */
    constructor(minInclusive, maxExclusive) {
        super(minInclusive, maxExclusive);
    }
}
//# sourceMappingURL=FeedRange.js.map