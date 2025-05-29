import type { ContainerClient, CommonOptions } from "@azure/storage-blob";
import type { Segment } from "./Segment.js";
import type { SegmentFactory } from "./SegmentFactory.js";
import type { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent.js";
import type { ChangeFeedCursor } from "./models/ChangeFeedCursor.js";
import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Options to configure {@link ChangeFeed.getChange} operation.
 */
export interface ChangeFeedGetChangeOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare class ChangeFeed {
    /**
     * BlobContainerClient for making List Blob requests and creating Segments.
     */
    private readonly containerClient?;
    private readonly segmentFactory?;
    private readonly years;
    private segments;
    private currentSegment?;
    private lastConsumable?;
    private startTime?;
    private endTime?;
    private end?;
    constructor();
    constructor(containerClient: ContainerClient, segmentFactory: SegmentFactory, years: number[], segments: string[], currentSegment: Segment, lastConsumable: Date, startTime?: Date, endTime?: Date);
    private advanceSegmentIfNecessary;
    hasNext(): boolean;
    getChange(options?: ChangeFeedGetChangeOptions): Promise<BlobChangeFeedEvent | undefined>;
    getCursor(): ChangeFeedCursor;
}
//# sourceMappingURL=ChangeFeed.d.ts.map