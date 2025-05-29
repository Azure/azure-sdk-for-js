import type { AvroReader, AvroParseOptions } from "@azure/storage-internal-avro";
import type { BlobChangeFeedEvent } from "./models/BlobChangeFeedEvent.js";
import type { CommonOptions } from "@azure/storage-blob";
import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * Options to configure {@link Chunk.getChange} operation.
 */
export interface ChunkGetChangeOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
export declare class Chunk {
    readonly chunkPath: string;
    private readonly avroReader;
    private readonly iter;
    private _blockOffset;
    get blockOffset(): number;
    private _eventIndex;
    get eventIndex(): number;
    constructor(avroReader: AvroReader, blockOffset: number, eventIndex: number, chunkPath: string, avroOptions?: AvroParseOptions);
    hasNext(): boolean;
    getChange(): Promise<BlobChangeFeedEvent | undefined>;
}
//# sourceMappingURL=Chunk.d.ts.map