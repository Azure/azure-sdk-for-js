"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvroReader = void 0;
const tslib_1 = require("tslib");
// TODO: Do a review of non-interfaces
/* eslint-disable @azure/azure-sdk/ts-use-interface-parameters */
const AvroConstants_js_1 = require("./AvroConstants.js");
const AvroParser_js_1 = require("./AvroParser.js");
const utils_common_js_1 = require("./utils/utils.common.js");
class AvroReader {
    get blockOffset() {
        return this._blockOffset;
    }
    get objectIndex() {
        return this._objectIndex;
    }
    constructor(dataStream, headerStream, currentBlockOffset, indexWithinCurrentBlock) {
        this._dataStream = dataStream;
        this._headerStream = headerStream || dataStream;
        this._initialized = false;
        this._blockOffset = currentBlockOffset || 0;
        this._objectIndex = indexWithinCurrentBlock || 0;
        this._initialBlockOffset = currentBlockOffset || 0;
    }
    async initialize(options = {}) {
        const header = await AvroParser_js_1.AvroParser.readFixedBytes(this._headerStream, AvroConstants_js_1.AVRO_INIT_BYTES.length, {
            abortSignal: options.abortSignal,
        });
        if (!(0, utils_common_js_1.arraysEqual)(header, AvroConstants_js_1.AVRO_INIT_BYTES)) {
            throw new Error("Stream is not an Avro file.");
        }
        // File metadata is written as if defined by the following map schema:
        // { "type": "map", "values": "bytes"}
        this._metadata = await AvroParser_js_1.AvroParser.readMap(this._headerStream, AvroParser_js_1.AvroParser.readString, {
            abortSignal: options.abortSignal,
        });
        // Validate codec
        const codec = this._metadata[AvroConstants_js_1.AVRO_CODEC_KEY];
        if (!(codec === undefined || codec === null || codec === "null")) {
            throw new Error("Codecs are not supported");
        }
        // The 16-byte, randomly-generated sync marker for this file.
        this._syncMarker = await AvroParser_js_1.AvroParser.readFixedBytes(this._headerStream, AvroConstants_js_1.AVRO_SYNC_MARKER_SIZE, {
            abortSignal: options.abortSignal,
        });
        // Parse the schema
        const schema = JSON.parse(this._metadata[AvroConstants_js_1.AVRO_SCHEMA_KEY]);
        this._itemType = AvroParser_js_1.AvroType.fromSchema(schema);
        if (this._blockOffset === 0) {
            this._blockOffset = this._initialBlockOffset + this._dataStream.position;
        }
        this._itemsRemainingInBlock = await AvroParser_js_1.AvroParser.readLong(this._dataStream, {
            abortSignal: options.abortSignal,
        });
        // skip block length
        await AvroParser_js_1.AvroParser.readLong(this._dataStream, { abortSignal: options.abortSignal });
        this._initialized = true;
        if (this._objectIndex && this._objectIndex > 0) {
            for (let i = 0; i < this._objectIndex; i++) {
                await this._itemType.read(this._dataStream, { abortSignal: options.abortSignal });
                this._itemsRemainingInBlock--;
            }
        }
    }
    hasNext() {
        return !this._initialized || this._itemsRemainingInBlock > 0;
    }
    parseObjects() {
        return tslib_1.__asyncGenerator(this, arguments, function* parseObjects_1(options = {}) {
            if (!this._initialized) {
                yield tslib_1.__await(this.initialize(options));
            }
            while (this.hasNext()) {
                const result = yield tslib_1.__await(this._itemType.read(this._dataStream, {
                    abortSignal: options.abortSignal,
                }));
                this._itemsRemainingInBlock--;
                this._objectIndex++;
                if (this._itemsRemainingInBlock === 0) {
                    const marker = yield tslib_1.__await(AvroParser_js_1.AvroParser.readFixedBytes(this._dataStream, AvroConstants_js_1.AVRO_SYNC_MARKER_SIZE, {
                        abortSignal: options.abortSignal,
                    }));
                    this._blockOffset = this._initialBlockOffset + this._dataStream.position;
                    this._objectIndex = 0;
                    if (!(0, utils_common_js_1.arraysEqual)(this._syncMarker, marker)) {
                        throw new Error("Stream is not a valid Avro file.");
                    }
                    try {
                        this._itemsRemainingInBlock = yield tslib_1.__await(AvroParser_js_1.AvroParser.readLong(this._dataStream, {
                            abortSignal: options.abortSignal,
                        }));
                    }
                    catch (_a) {
                        // We hit the end of the stream.
                        this._itemsRemainingInBlock = 0;
                    }
                    if (this._itemsRemainingInBlock > 0) {
                        // Ignore block size
                        yield tslib_1.__await(AvroParser_js_1.AvroParser.readLong(this._dataStream, { abortSignal: options.abortSignal }));
                    }
                }
                yield yield tslib_1.__await(result);
            }
        });
    }
}
exports.AvroReader = AvroReader;
//# sourceMappingURL=AvroReader.js.map