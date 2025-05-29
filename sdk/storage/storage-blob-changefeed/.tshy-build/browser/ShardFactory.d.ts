import type { ChunkFactory } from "./ChunkFactory.js";
import type { ShardCursor } from "./models/ChangeFeedCursor.js";
import { Shard } from "./Shard.js";
import type { ContainerClient, CommonOptions } from "@azure/storage-blob";
import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Options to configure {@link ShardFactory.create} operation.
 */
export interface CreateShardOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare class ShardFactory {
    private readonly chunkFactory;
    constructor(chunkFactory: ChunkFactory);
    create(containerClient: ContainerClient, shardPath: string, shardCursor?: ShardCursor, options?: CreateShardOptions): Promise<Shard>;
}
//# sourceMappingURL=ShardFactory.d.ts.map