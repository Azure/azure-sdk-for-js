"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlobQuickQueryStream = void 0;
const node_stream_1 = require("node:stream");
const storage_internal_avro_1 = require("@azure/storage-internal-avro");
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js BlobQuickQueryStream will internally parse avro data stream for blob query.
 */
class BlobQuickQueryStream extends node_stream_1.Readable {
    /**
     * Creates an instance of BlobQuickQueryStream.
     *
     * @param source - The current ReadableStream returned from getter
     * @param options -
     */
    constructor(source, options = {}) {
        super();
        this.avroPaused = true;
        this.source = source;
        this.onProgress = options.onProgress;
        this.onError = options.onError;
        this.avroReader = new storage_internal_avro_1.AvroReader(new storage_internal_avro_1.AvroReadableFromStream(this.source));
        this.avroIter = this.avroReader.parseObjects({ abortSignal: options.abortSignal });
    }
    _read() {
        if (this.avroPaused) {
            this.readInternal().catch((err) => {
                this.emit("error", err);
            });
        }
    }
    async readInternal() {
        this.avroPaused = false;
        let avroNext;
        do {
            avroNext = await this.avroIter.next();
            if (avroNext.done) {
                break;
            }
            const obj = avroNext.value;
            const schema = obj.$schema;
            if (typeof schema !== "string") {
                throw Error("Missing schema in avro record.");
            }
            switch (schema) {
                case "com.microsoft.azure.storage.queryBlobContents.resultData":
                    {
                        const data = obj.data;
                        if (data instanceof Uint8Array === false) {
                            throw Error("Invalid data in avro result record.");
                        }
                        if (!this.push(Buffer.from(data))) {
                            this.avroPaused = true;
                        }
                    }
                    break;
                case "com.microsoft.azure.storage.queryBlobContents.progress":
                    {
                        const bytesScanned = obj.bytesScanned;
                        if (typeof bytesScanned !== "number") {
                            throw Error("Invalid bytesScanned in avro progress record.");
                        }
                        if (this.onProgress) {
                            this.onProgress({ loadedBytes: bytesScanned });
                        }
                    }
                    break;
                case "com.microsoft.azure.storage.queryBlobContents.end":
                    if (this.onProgress) {
                        const totalBytes = obj.totalBytes;
                        if (typeof totalBytes !== "number") {
                            throw Error("Invalid totalBytes in avro end record.");
                        }
                        this.onProgress({ loadedBytes: totalBytes });
                    }
                    this.push(null);
                    break;
                case "com.microsoft.azure.storage.queryBlobContents.error":
                    if (this.onError) {
                        const fatal = obj.fatal;
                        if (typeof fatal !== "boolean") {
                            throw Error("Invalid fatal in avro error record.");
                        }
                        const name = obj.name;
                        if (typeof name !== "string") {
                            throw Error("Invalid name in avro error record.");
                        }
                        const description = obj.description;
                        if (typeof description !== "string") {
                            throw Error("Invalid description in avro error record.");
                        }
                        const position = obj.position;
                        if (typeof position !== "number") {
                            throw Error("Invalid position in avro error record.");
                        }
                        this.onError({
                            position,
                            name,
                            isFatal: fatal,
                            description,
                        });
                    }
                    break;
                default:
                    throw Error(`Unknown schema ${schema} in avro progress record.`);
            }
        } while (!avroNext.done && !this.avroPaused);
    }
}
exports.BlobQuickQueryStream = BlobQuickQueryStream;
//# sourceMappingURL=BlobQuickQueryStream.js.map