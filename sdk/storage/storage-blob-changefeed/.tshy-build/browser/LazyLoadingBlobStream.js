// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Readable } from "node:stream";
import { tracingClient } from "./utils/tracing.js";
/**
 * This class generates a readable stream from a blobClient's data.
 */
export class LazyLoadingBlobStream extends Readable {
    /**
     * Creates an instance of LazyLoadingBlobStream.
     *
     * @param byteLength - The total length of data contained in the buffers
     */
    constructor(blobClient, offset, blockSize, options) {
        super(options);
        this.blobClient = blobClient;
        this.offset = offset;
        this.blockSize = blockSize;
        this.lastDownloadBytes = -1;
        this.blobLength = -1;
        this.options = options;
    }
    async downloadBlock(options = {}) {
        return tracingClient.withSpan("LazyLoadingBlobStream-downloadBlock", options, async (updatedOptions) => {
            const properties = await this.blobClient.getProperties({
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            });
            this.blobLength = properties.contentLength;
            this.lastDownloadBytes = Math.min(this.blockSize, this.blobLength - this.offset);
            if (this.lastDownloadBytes === 0) {
                this.lastDownloadData = undefined;
                return;
            }
            this.lastDownloadData = await this.blobClient.downloadToBuffer(this.offset, this.lastDownloadBytes, {
                abortSignal: options.abortSignal,
                tracingOptions: updatedOptions.tracingOptions,
            });
            this.offset += this.lastDownloadBytes;
        });
    }
    /**
     * Internal _read() that will be called when the stream wants to pull more data in.
     *
     * @param size - Optional. The size of data to be read
     */
    async _read(size) {
        var _a;
        return tracingClient.withSpan("LazyLoadingBlobStream-read", (_a = this.options) !== null && _a !== void 0 ? _a : {}, async (updatedOptions) => {
            var _a, _b, _c, _d;
            if (!size) {
                size = this.readableHighWaterMark;
            }
            let count = 0;
            let chunkSize = 0;
            const chunksToPush = [];
            do {
                if (this.lastDownloadData === undefined || ((_a = this.lastDownloadData) === null || _a === void 0 ? void 0 : _a.byteLength) === 0) {
                    await this.downloadBlock({
                        abortSignal: (_b = this.options) === null || _b === void 0 ? void 0 : _b.abortSignal,
                        tracingOptions: updatedOptions === null || updatedOptions === void 0 ? void 0 : updatedOptions.tracingOptions,
                    });
                }
                if ((_c = this.lastDownloadData) === null || _c === void 0 ? void 0 : _c.byteLength) {
                    chunkSize = Math.min(size - count, (_d = this.lastDownloadData) === null || _d === void 0 ? void 0 : _d.byteLength);
                    chunksToPush.push(this.lastDownloadData.slice(0, chunkSize));
                    this.lastDownloadData = this.lastDownloadData.slice(chunkSize);
                    count += chunkSize;
                }
                else {
                    chunkSize = 0;
                }
            } while (chunkSize > 0 && count < size);
            this.push(Buffer.concat(chunksToPush));
            if (count < size) {
                this.push(null);
            }
        });
    }
}
//# sourceMappingURL=LazyLoadingBlobStream.js.map