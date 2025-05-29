// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Chunk } from "./Chunk.js";
import { streamToAvroReadable } from "./utils/utils.node.js";
import { CHANGE_FEED_CHUNK_BLOCK_DOWNLOAD_SIZE } from "./utils/constants.js";
export class ChunkFactory {
    constructor(avroReaderFactory, lazyLoadingBlobStreamFactory, maxTransferSize) {
        this.avroReaderFactory = avroReaderFactory;
        this.lazyLoadingBlobStreamFactory = lazyLoadingBlobStreamFactory;
        this.maxTransferSize = maxTransferSize;
    }
    async create(containerClient, chunkPath, blockOffset, eventIndex, options = {}) {
        const blobClient = containerClient.getBlobClient(chunkPath);
        blockOffset = blockOffset || 0;
        eventIndex = eventIndex || 0;
        const dataStream = streamToAvroReadable(this.lazyLoadingBlobStreamFactory.create(blobClient, blockOffset, this.maxTransferSize ? this.maxTransferSize : CHANGE_FEED_CHUNK_BLOCK_DOWNLOAD_SIZE, options));
        let avroReader;
        if (blockOffset !== 0) {
            const headerStream = streamToAvroReadable(this.lazyLoadingBlobStreamFactory.create(blobClient, 0, this.maxTransferSize ? this.maxTransferSize : CHANGE_FEED_CHUNK_BLOCK_DOWNLOAD_SIZE, options));
            avroReader = this.avroReaderFactory.create(dataStream, headerStream, blockOffset, eventIndex);
        }
        else {
            avroReader = this.avroReaderFactory.create(dataStream);
        }
        return new Chunk(avroReader, blockOffset, eventIndex, chunkPath, {
            abortSignal: options.abortSignal,
        });
    }
}
//# sourceMappingURL=ChunkFactory.js.map