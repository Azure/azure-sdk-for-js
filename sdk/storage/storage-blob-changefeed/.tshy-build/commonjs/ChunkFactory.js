"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkFactory = void 0;
const Chunk_js_1 = require("./Chunk.js");
const utils_node_js_1 = require("./utils/utils.node.js");
const constants_js_1 = require("./utils/constants.js");
class ChunkFactory {
    constructor(avroReaderFactory, lazyLoadingBlobStreamFactory, maxTransferSize) {
        this.avroReaderFactory = avroReaderFactory;
        this.lazyLoadingBlobStreamFactory = lazyLoadingBlobStreamFactory;
        this.maxTransferSize = maxTransferSize;
    }
    async create(containerClient, chunkPath, blockOffset, eventIndex, options = {}) {
        const blobClient = containerClient.getBlobClient(chunkPath);
        blockOffset = blockOffset || 0;
        eventIndex = eventIndex || 0;
        const dataStream = (0, utils_node_js_1.streamToAvroReadable)(this.lazyLoadingBlobStreamFactory.create(blobClient, blockOffset, this.maxTransferSize ? this.maxTransferSize : constants_js_1.CHANGE_FEED_CHUNK_BLOCK_DOWNLOAD_SIZE, options));
        let avroReader;
        if (blockOffset !== 0) {
            const headerStream = (0, utils_node_js_1.streamToAvroReadable)(this.lazyLoadingBlobStreamFactory.create(blobClient, 0, this.maxTransferSize ? this.maxTransferSize : constants_js_1.CHANGE_FEED_CHUNK_BLOCK_DOWNLOAD_SIZE, options));
            avroReader = this.avroReaderFactory.create(dataStream, headerStream, blockOffset, eventIndex);
        }
        else {
            avroReader = this.avroReaderFactory.create(dataStream);
        }
        return new Chunk_js_1.Chunk(avroReader, blockOffset, eventIndex, chunkPath, {
            abortSignal: options.abortSignal,
        });
    }
}
exports.ChunkFactory = ChunkFactory;
//# sourceMappingURL=ChunkFactory.js.map