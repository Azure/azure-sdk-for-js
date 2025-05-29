import type { ContainerClient, CommonOptions } from "@azure/storage-blob";
import type { ChunkFactory } from "./ChunkFactory.js";
import type { Chunk } from "./Chunk.js";
import type { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent.js";
import type { ShardCursor } from "./models/ChangeFeedCursor.js";
import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Options to configure {@link Shard.getChange} operation.
 */
export interface ShardGetChangeOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare class Shard {
    readonly shardPath: string;
    private readonly containerClient;
    private readonly chunkFactory;
    private readonly chunks;
    private currentChunk;
    constructor(containerClient: ContainerClient, chunkFactory: ChunkFactory, chunks: string[], currentChunk: Chunk | undefined, shardPath: string);
    hasNext(): boolean;
    getChange(options?: ShardGetChangeOptions): Promise<BlobChangeFeedEvent | undefined>;
    getCursor(): ShardCursor | undefined;
}
//# sourceMappingURL=Shard.d.ts.map