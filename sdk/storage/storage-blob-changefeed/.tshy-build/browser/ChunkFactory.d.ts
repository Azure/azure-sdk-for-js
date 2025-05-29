import type { AvroReaderFactory } from "./AvroReaderFactory.js";
import type { ContainerClient, CommonOptions } from "@azure/storage-blob";
import { Chunk } from "./Chunk.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { LazyLoadingBlobStreamFactory } from "./LazyLoadingBlobStreamFactory.js";
/**
 * Options to configure {@link ChunkFactory.create} operation.
 */
export interface CreateChunkOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare class ChunkFactory {
    private readonly avroReaderFactory;
    private readonly lazyLoadingBlobStreamFactory;
    private readonly maxTransferSize?;
    constructor(avroReaderFactory: AvroReaderFactory, lazyLoadingBlobStreamFactory: LazyLoadingBlobStreamFactory, maxTransferSize?: number);
    create(containerClient: ContainerClient, chunkPath: string, blockOffset?: number, eventIndex?: number, options?: CreateChunkOptions): Promise<Chunk>;
}
//# sourceMappingURL=ChunkFactory.d.ts.map