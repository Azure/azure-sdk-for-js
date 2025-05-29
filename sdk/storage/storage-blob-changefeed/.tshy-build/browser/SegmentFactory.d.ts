import type { ShardFactory } from "./ShardFactory.js";
import type { ContainerClient, CommonOptions } from "@azure/storage-blob";
import { Segment } from "./Segment.js";
import type { SegmentCursor } from "./models/ChangeFeedCursor.js";
import type { AbortSignalLike } from "@azure/abort-controller";
export interface SegmentManifest {
    version?: number;
    begin?: Date;
    intervalSecs?: number;
    status: string;
    config?: any;
    chunkFilePaths: string[];
}
/**
 * Options to configure {@link SegmentFactory.create} operation.
 */
export interface CreateSegmentOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare class SegmentFactory {
    private readonly shardFactory;
    constructor(shardFactory: ShardFactory);
    create(containerClient: ContainerClient, manifestPath: string, cursor?: SegmentCursor, options?: CreateSegmentOptions): Promise<Segment>;
}
//# sourceMappingURL=SegmentFactory.d.ts.map