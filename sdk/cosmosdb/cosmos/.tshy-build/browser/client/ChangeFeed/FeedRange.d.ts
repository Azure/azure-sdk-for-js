/**
 * Specifies a feed range for the changefeed.
 */
export declare abstract class FeedRange {
    /**
     * Min value for the feed range.
     */
    readonly minInclusive: string;
    /**
     * Max value for the feed range.
     */
    readonly maxExclusive: string;
}
/**
 * @hidden
 * Specifies a feed range for the changefeed.
 */
export declare class FeedRangeInternal extends FeedRange {
    constructor(minInclusive: string, maxExclusive: string);
}
//# sourceMappingURL=FeedRange.d.ts.map