import type { BlobClient } from "@azure/storage-blob";
import type { LazyLoadingBlobStreamOptions } from "./LazyLoadingBlobStream.js";
import { LazyLoadingBlobStream } from "./LazyLoadingBlobStream.js";
export declare class LazyLoadingBlobStreamFactory {
    create(blobClient: BlobClient, offset: number, blockSize: number, options?: LazyLoadingBlobStreamOptions): LazyLoadingBlobStream;
}
//# sourceMappingURL=LazyLoadingBlobStreamFactory.d.ts.map