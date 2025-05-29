import type { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent.js";
import type { Shard } from "./Shard.js";
import type { SegmentCursor } from "./models/ChangeFeedCursor.js";
import type { CommonOptions } from "@azure/storage-blob";
import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Options to configure {@link Segment.getChange} operation.
 */
export interface SegmentGetChangeOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare class Segment {
    private readonly manifestPath;
    private readonly shards;
    private shardDone;
    private shardDoneCount;
    private shardIndex;
    private _dateTime;
    get dateTime(): Date;
    constructor(shards: Shard[], shardIndex: number, dateTime: Date, manifestPath: string);
    hasNext(): boolean;
    getChange(options?: SegmentGetChangeOptions): Promise<BlobChangeFeedEvent | undefined>;
    getCursor(): SegmentCursor;
}
//# sourceMappingURL=Segment.d.ts.map